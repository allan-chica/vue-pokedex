<template>
	<div class="favorite-icon" :class="{ 'isFavorite': isFavorite }">
		<StarIcon />
	</div>
</template>

<script setup>
import StarIcon from './icons/StarIcon.vue';

defineProps({
	isFavorite: Boolean,
})
</script>

<style scoped>
.favorite-icon {
	background-color: var(--clr-light);
	border-radius: 10rem;
	padding: 0.5rem;
	display: flex;
	transition: 0.2s ease;
	cursor: pointer;
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