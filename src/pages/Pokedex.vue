<template>
	<div class="pokedex-container">

		<!-- Loading state -->
		<transition name="fade">
			<div v-if="isFetching" class="loading">

				<!-- PokéBall shake -->
				<div
					class="pokeball"
					:class="{ 'shake-animation': isShaking }"
					v-html="pokeballSvg"
				/>

				<!-- Stars (finish pokeball shake) -->
				<div v-if="showSuccessAnimation" class="stars-container">
					<div class="star star-left">★</div>
					<div class="star star-center">★</div>
					<div class="star star-right">★</div>
				</div>

				<p v-if="!showSuccessAnimation">Catching Pokémon...</p>
				<p v-else>Pokémon Caught!</p>
			</div>
		</transition>

		<!-- Pokemon list -->
		<transition name="fade">
			<div v-if="showPokemonList" class="content">

				<!-- Seach bar -->
				<div class="container search-bar-container">
					<div class="search-bar">
						<img src="../assets/icons/mag.svg" alt="Search icon">
						<input type="text" placeholder="Search" />
					</div>
				</div>

				<div class="container pokemon-lists-container">

					<!-- All pokémon list -->
					<div v-if="activeList === listTypes.all">
						<PokemonList
							:pokemon-list="pokemonList"
							:is-favorite="pokemon => favoritesStore.isFavorite(pokemon)"
							@pokemon-click="handlePokemonClick"
							@pokemon-favorite="handlePokemonFavorite"
						/>
					</div>

					<!-- Favorite pokémon list -->
					<div v-if="activeList === listTypes.favorites">
						<PokemonList
							:pokemon-list="favoritesStore.favorites"
							:is-favorite="pokemon => favoritesStore.isFavorite(pokemon)"
							@pokemon-click="handlePokemonClick"
							@pokemon-favorite="handlePokemonFavorite"
						/>
					</div>

					<!-- Search results list -->
					<div v-if="activeList === listTypes.search">
						<PokemonList
							:pokemon-list="pokemonList"
							:is-favorite="pokemon => favoritesStore.isFavorite(pokemon)"
							@pokemon-click="handlePokemonClick"
							@pokemon-favorite="handlePokemonFavorite"
						/>
					</div>

				</div>


				<!-- Bottom navigation -->
				 <div class="nav">
					<div class="container btn-group">
						<button :class="{ 'btn-primary': activeList === listTypes.all }" @click="activeList = listTypes.all">
							<ListIcon />
							<span>All</span>
						</button>

						<button :class="{ 'btn-primary': activeList === listTypes.favorites }" @click="activeList = listTypes.favorites">
							<StarIcon :size="22" />
							<span>Favorites</span>
						</button>
					</div>
				 </div>
			</div>
		</transition>

	</div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import PokemonList from '@/components/PokemonList.vue'
import ListIcon from '@/components/icons/ListIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import { wait, debounce } from '@/utils'

import { useFavoritesStore } from "@/stores/app"
const favoritesStore = useFavoritesStore()

import pokeballRaw from '../assets/images/loader.svg?raw' // Import the raw SVG as a string for faster rendering
const pokeballSvg = pokeballRaw

// UI State
const isFetching = ref(true)             // Flag to indicate loading state
const isShaking = ref(true)              // Controls the shaking animation
const shouldStopShaking = ref(false)     // Flag to stop shaking
const showSuccessAnimation = ref(false)  // Trigger stars animation
const showPokemonList = ref(false)       // Toggles the Pokémon list display

const listTypes = {
	all: 'All',
	favorites: 'Favorites',
	search: 'Search'
} // List types
const activeList = ref(listTypes.all) // Active list type

// Pokémon data
const pokemonList = ref([])

const searchResults = ref([]) // Search results
const searchQuery = ref('') // Search query

// Methods
async function fetchPokemon() {
	try {
		const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
		const data = await response.json()
		pokemonList.value = data.results
		shouldStopShaking.value = true
	} catch (error) {
		console.error('Error fetching Pokémon:', error)
		isFetching.value = false
	}
}

function handlePokemonClick(pokemon) {
	// Handle Pokémon click event
	console.log('Clicked Pokémon:', pokemon)
}

function handlePokemonFavorite(pokemon) {
	// Handle Pokémon favorite event
	if (favoritesStore.isFavorite(pokemon)) {
		favoritesStore.removeFavorite(pokemon)
	} else {
		favoritesStore.addFavorite(pokemon)
	}
}

// #region Shake animation logic
// Loop shake animation until fetch is complete
async function startShakeLoop() {
	while (true) {
		isShaking.value = true
		await wait(1000) // Shake for 1 second
		isShaking.value = false

		if (shouldStopShaking.value) break

		await wait(100) // Pause between shakes
	}

	await wait(300) // Delay before showing stars
	playFinishedAnimation()
}

async function playFinishedAnimation() {
	showSuccessAnimation.value = true

	// Wait for a bit before showing the Pokémon list
	await wait(1500)

	showSuccessAnimation.value = false
	isFetching.value = false
	showPokemonList.value = true
}
// #endregion

onMounted(() => {
	fetchPokemon()
	startShakeLoop()
})
</script>

<style scoped>
.pokedex-container {
	height: 100%;
}

.content {
	padding-top: 35px;
	height: 100%;
}

.search-bar-container {
	position: sticky;
	top: 0;
}

.search-bar {
	background-color: white;
	border-radius: 5px;

	display: flex;
	align-items: center;
	padding: 0px 1rem;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
	margin-bottom: 2.5rem;
}

.search-bar img {
	width: 1.125rem;
	height: 1.125rem;
}

.search-bar input {
	flex: 1;
	padding: 1rem 0;
	border: none;
	outline: none;
	margin-left: 0.625rem;
	font-family: Lato, sans-serif;
	font-size: 1rem;
	color: var(--clr-text-heading);
}

.search-bar input::placeholder {
	color: var(--clr-muted);
}

.pokemon-lists-container {
	padding-bottom: 6.25rem;
}

.nav {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;

	box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
	background-color: var(--clr-white);
}

.nav .btn-group {
	width: 100%;
	display: flex;
	align-items: center;
	gap: 1rem;
}

@media (min-width: 36.625rem) {
	.nav .btn-group {
		gap: 1.25rem;
	}
}

.nav .btn-group button {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.625rem;
}

.nav .btn-group button span {	font-weight: bold; }

.nav .btn-group button img {
	width: 1.375rem;
	height: 1.375rem;
}

.nav .btn-group button svg {
	fill: var(--clr-white);
}

/* #region Loading styles */
.loading {
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	text-align: center;
	gap: 0.65rem;
}

@keyframes shake {
	0%   { transform: rotate(0deg); }
	20%  { transform: rotate(-15deg); }
	40%  { transform: rotate(15deg); }
	60%  { transform: rotate(-5deg); }
	80%  { transform: rotate(5deg); }
	100% { transform: rotate(0deg); }
}

.shake-animation {
	animation: shake 1s ease-in-out 3;
	transform-origin: center bottom;
}

.stars-container {
	position: absolute;
	top: calc(50% - 90px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	pointer-events: none;
}

.star {
	position: absolute;
	font-size: 1.5rem;
	color: var(--clr-accent-yellow);
	opacity: 0;
	animation: sparkle 1s ease-out forwards;
}

.star-center {
	animation-delay: 0s;
}

.star-left {
	top: -10px;
	left: -40px;
	animation-delay: 0.2s;
}

.star-right {
	top: -10px;
	right: -40px;
	animation-delay: 0.4s;
}

@keyframes sparkle {
	0% {
		transform: scale(0.5) translateY(0);
		opacity: 0;
	}
	50% {
		transform: scale(1.2) translateY(-10px);
		opacity: 1;
	}
	100% {
		transform: scale(0.5) translateY(-20px);
		opacity: 0;
	}
}
/* #endregion */

/* #region Transitions */
.fade-enter-active, .fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
	opacity: 0;
}
/* #endregion */
</style>