<template>
	<div class="pokemon-list">
		<PokemonListItem
			v-for="pokemon in pokemonList"
			:key="pokemon.name"
			:pokemon="pokemon"
			:is-favorite="isFavorite(pokemon)"
			@click="$emit('pokemon-click', pokemon)"
			@favorite="$emit('pokemon-favorite', pokemon)"
		/>
	</div>
</template>

<script setup>
import PokemonListItem from './PokemonListItem.vue';

defineProps({
	pokemonList: {
		type: Array,
		required: true,
	},
	isFavorite: Function,
})

defineEmits(['pokemon-click', 'pokemon-favorite'])
</script>

<style scoped>
.pokemon-list {
	display: flex;
	flex-direction: column;
	gap: 0.625rem;
}
</style>