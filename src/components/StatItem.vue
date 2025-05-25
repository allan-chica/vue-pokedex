<template>
	<div class="stat">
		<span class="stat-title">{{ label }}: </span>
		<span :class="{ 'capitalize': capitalize }">{{ stat }}</span>
	</div>
</template>

<script setup>
defineProps({
	label: String,
	stat: [String, Number],
	capitalize: {
		type: Boolean,
		default: false
	}
})
</script>

<style scoped>
.stat {
	border-bottom: 1px solid var(--clr-border);
	padding: 0.625rem 0;
}

.stat-title {
	font-weight: bold;
}

.capitalize {
	text-transform: capitalize;
}
</style>