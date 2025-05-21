<template>
	<div class="container welcome-container">
		<img src="../assets/images/pikachu.svg" alt="Pikachu" />

		<h4>Welcome to Pokédex</h4>

		<p>The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>

		<button class="btn-primary" @click="goToPokedex">Get started</button>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const appStore = useAppStore()

function goToPokedex() {
	appStore.markWelcomeSeen()
	router.push('/')
}
</script>

<style scoped>
.welcome-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	text-align: center;
}

img {
	margin-bottom: 3.75rem;
}

h4 {
	margin-bottom: 1.875rem;
}

p {
	line-height: 150%;
	margin-bottom: 3.125rem;
	max-width: 35rem;
}
</style>