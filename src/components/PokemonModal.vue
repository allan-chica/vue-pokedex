<template>
	<Teleport to="body">
		<!-- Modal overlay -->
		<transition name="fade">
			<div
				v-if="show"
				class="modal-overlay"
				@click.self="closeModal"
				tabindex="0"
			>

				<!-- Content -->
				<div class="container">

					<div class="loading" v-if="!pokemon">
						<SpinnerLoader />
					</div>

					<div class="modal-content" v-else>

						<!-- Modal Header -->
						<div class="modal-header">

							<!-- Background image -->
							<img
								class="bg-img"
								src="../assets/images/pokemon_bg.jpg"
								alt=""
								:style="{
									transform: `translate(${mouseX}px, ${mouseY}px) scale(1.05)`,
									transition: 'transform 0.1s ease-out'
								}"
							/>

							<!-- Close button -->
							<button @click="closeModal"><CloseIcon/></button>

							<!-- Image -->
							<img
								:src="pokemon.sprites.other['official-artwork'].front_default"
								:alt="`${pokemon.name} image`"
								class="pokemon-image"
							/>
						</div>

						<!-- Modal Body -->
						<div class="modal-body">

							<StatItem label="Name" :stat="pokemon.name" capitalize />

							<StatItem label="Weight" :stat="pokemonWeight" />

							<StatItem label="Height" :stat="pokemonHeight" />

							<StatItem :label="typeLabel" :stat="pokemonTypes" capitalize />

							<div class="btn-group">
								<button class="btn-primary" @click="shareInfo">Share to my friends</button>
								<FavoriteToggle
									:isFavorite="isFavorite(pokemon)"
									@click="$emit('favorite', pokemonObj)"
								/>
							</div>
						</div>

					</div>
				</div>

			</div>
		</transition>
	</Teleport>
</template>

<script setup>
import { computed, watch, ref, onMounted, onUnmounted } from 'vue';
import { capitalize } from '@/utils';
import FavoriteToggle from './FavoriteToggle.vue';
import CloseIcon from './icons/CloseIcon.vue';
import SpinnerLoader from './SpinnerLoader.vue';
import StatItem from './StatItem.vue';

// Props
const props = defineProps({
	pokemon: {
		type: Object,
		default: null
	},
	show: {
		type: Boolean,
		default: false
	},
	isFavorite: Function,
})

// Data
const mouseX = ref(0)
const mouseY = ref(0)

// Emits
const emit = defineEmits(['close', 'favorite'])

// Methods
function closeModal() {
	emit('close')
}

function playPokemonCry() {
	if (props.pokemon?.cries?.latest) {
		const audio = new Audio(props.pokemon.cries.latest)
		audio.volume = 0.1
		audio.play()
			.catch(err => {
				console.error('Failed to play Pokémon cry:', err);
			})
	}
}

function handleMouseMove(e) {
	const { innerWidth, innerHeight } = window
	mouseX.value = (e.clientX / innerWidth - 0.5) * 10
	mouseY.value = (e.clientY / innerHeight - 0.5) * 10
}

function shareInfo() {
	const textToCopy = `Name: ${capitalize(props.pokemon.name)}, ` +
		`Weight: ${pokemonWeight.value}, ` +
		`Height: ${pokemonHeight.value}, ` +
		`${typeLabel.value}: ${pokemonTypes.value}`

	navigator.clipboard.writeText(textToCopy)
		.then(() => {
			alert('Pokémon info copied to clipboard!')
		})
		.catch(err => {
			console.error('Failed to copy text: ', err)
		});
}

// Computed properties
const pokemonWeight = computed(() => {
	if (!props.pokemon) return 0
	return (props.pokemon.weight / 10).toFixed(1) + ' kg'
})

const pokemonHeight = computed(() => {
	if (!props.pokemon) return 0
	return (props.pokemon.height / 10).toFixed(1) + ' m'
})

const pokemonTypes = computed(() => {
	if (!props.pokemon) return []
	const types = props.pokemon.types.map(type => type.type.name)
	return types.join(', ')
})

const typeLabel = computed(() => {
	return props.pokemon.types.length > 1 ? 'Types' : 'Type';
})

const pokemonObj = computed(() => {
	if (!props.pokemon) return null

	const poke = props.pokemon
	return { name: poke.name, url: `https://pokeapi.co/api/v2/pokemon/${poke.id}/` }
});

// Watchers
watch(() => props.pokemon, (newPokemon) => {
	if (newPokemon) {
		playPokemonCry();
	}
});

// Lifecycle hooks
onMounted(() => {
	window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
	window.removeEventListener('mousemove', handleMouseMove);
});

</script>

<style scoped>
/* Modal overlay */
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.modal-overlay .container {
	flex: 1;
}

/* Loading */
.loading {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}

/* Modal content */
.modal-content {
	background-color: white;
	width: 100%;
	border-radius: 0.3125rem;
	overflow: hidden;
}

/* Modal header */
.modal-header {
	height: 13.75rem;
	position: relative;

	display: flex;
	justify-content: center;
	overflow: hidden;
}

.modal-header .bg-img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: fill;
	z-index: 0;
}

.modal-header .pokemon-image {
	padding: 1.25rem 0;
	z-index: 1;
}

.modal-header button {
	position: absolute;
	top: 1rem;
	right: 1rem;
	background-color: transparent;
	border: none;
	cursor: pointer;
	padding: 0;
	display: flex;
}

.modal-header button svg {
	fill: var(--clr-white);
	transition: fill 150ms ease;
}

.modal-header button:hover svg { fill: var(--clr-border); }

/* Modal body */
.modal-body {
	padding: 20px 30px;
}

.modal-body .btn-group {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 1.25rem;
	gap: 1rem;
}

/* Modal transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.150s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .modal-content,
.fade-leave-active .modal-content {
  transition: transform 0.150s ease;
}

.fade-enter-from .modal-content,
.fade-leave-to .modal-content {
  transform: scale(0.95) translateY(-30px);
}
</style>