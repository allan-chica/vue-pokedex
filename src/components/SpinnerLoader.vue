<template>
	<div class="spinner-loader" :style="{ width: `${size}px`, height: `${size}px` }">
		<img src="../assets/images/loader.svg" alt="Loading..." />
	</div>
</template>

<script setup>
defineProps({
	size: {
		type: Number,
		default: 64
	}
})
</script>

<style scoped>
.spinner-loader {
	display: inline-block;
}

.spinner-loader img {
	animation: spin 1s linear infinite;
	width: 100%;
	height: auto;
}

@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
</style>