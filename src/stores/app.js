import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useAppStore = defineStore('app', {
	state: () => ({
		hasSeenWelcome: JSON.parse(localStorage.getItem('hasSeenWelcome')) || false,
	}),

	actions: {
		markWelcomeSeen() {
			this.hasSeenWelcome = true
			localStorage.setItem('hasSeenWelcome', JSON.stringify(this.hasSeenWelcome))
		}
	}
})

export const useFavoritesStore = defineStore('favorites', () => {
	const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])

	const addFavorite = pokemon => {
		if (!favorites.value.find(p => p.name === pokemon.name)) {
			favorites.value.push(pokemon)
		}
	}

	const removeFavorite = pokemon => {
		favorites.value = favorites.value.filter(p => p.name !== pokemon.name)
	}

	const isFavorite = pokemon => {
		return favorites.value.some(p => p.name === pokemon.name)
	}

	// Watch for changes in favorites and update localStorage
	watch(favorites, (newFavorites) => {
		localStorage.setItem('favorites', JSON.stringify(newFavorites))
	}, { deep: true })

	return { favorites, addFavorite, removeFavorite, isFavorite }
})