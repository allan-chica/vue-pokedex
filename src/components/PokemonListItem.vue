<template>
	<div class="pokemon-list-item" @click="$emit('click', pokemon)">
		<!-- Pokémon name -->
		<p class="pokemon-name">{{ pokemon.name }}</p>

		<FavoriteToggle
			:isFavorite="isFavorite"
			@click.stop="$emit('favorite', pokemon)"
		/>
	</div>
</template>

<script setup>
import FavoriteToggle from './FavoriteToggle.vue';

defineProps({
	pokemon: {
		type: Object,
		required: true,
	},
	isFavorite: Boolean,
});

defineEmits(['click', 'favorite'])
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
	font-size: 1.375rem;
	margin-left: 0.625rem;
}
</style>