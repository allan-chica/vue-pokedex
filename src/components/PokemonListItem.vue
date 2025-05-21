<template>
	<div class="pokemon-list-item" @click="onClick">
		<!-- Pokémon name -->
		<p class="pokemon-name">{{ pokemon.name }}</p>

		<!-- Pokémon image -->
		<div class="favorite-icon" :class="{ 'isFavorite': isFavorite }" @click.stop="onFavorite">
			<StarIcon />
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import StarIcon from './icons/StarIcon.vue';

defineProps({
	pokemon: {
		type: Object,
		required: true,
	},

	onClick: Function,
	onFavorite: Function,
	isFavorite: Boolean,
});

computed(() => {
	const { name, image } = pokemon;
	return {
		name,
		image,
	};
});
</script>

<style scoped>
.pokemon-list-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: var(--clr-white);
	border-radius: 5px;
	padding: 8px 10px;
	transition: all 0.3s ease;
	cursor: pointer;
}

.pokemon-list-item:hover {
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
	transform: scale(1.02);
}

.pokemon-name {
	text-transform: capitalize;
}

.favorite-icon {
	background-color: var(--clr-light);
	border-radius: 10rem;
	padding: 0.5rem;
	display: flex;
	transition: 0.2s ease;
}

.favorite-icon svg {
	fill: var(--clr-muted);
	transition: fill 0.2s ease;
}

.favorite-icon:hover {
	background-color: var(--clr-border);
}

.favorite-icon.isFavorite svg {
	fill: var(--clr-accent-yellow);
}
</style>