import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from '@/stores/app'

describe('Favorites Store', () => {

	beforeEach(() => {
		setActivePinia(createPinia())

		// Mock the localStorage
		const localStorageMock = (() => {
			let store = {}
			return {
				getItem: (key) => store[key] || null,
				setItem: (key, value) => store[key] = value,
				removeItem: (key) => delete store[key],
				clear: () => { store = {}	}
			}
		})()

		Object.defineProperty(window, 'localStorage', { value: localStorageMock	})
	})

	const pikachu = { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/"	}

	it('should initialize with an empty favorites list', () => {
		const store = useFavoritesStore()
		expect(store.favorites).toEqual([])
	})

	it('adds a Pokemon to favorites', () => {
		const store = useFavoritesStore()
		store.addFavorite(pikachu)
		expect(store.favorites).toContainEqual(pikachu)
	})

	it('does not add a duplicate Pokemon to favorites', () => {
		const store = useFavoritesStore()
		store.addFavorite(pikachu)
		store.addFavorite(pikachu) // Attempt to add again
		expect(store.favorites).toHaveLength(1)
	})

	it('removes a Pokemon from favorites', () => {
		const store = useFavoritesStore()
		store.addFavorite(pikachu)
		store.removeFavorite(pikachu)
		expect(store.favorites).not.toContainEqual(pikachu)
	})

	it('correctly checks if a Pokemon is favorited', () => {
		const store = useFavoritesStore()
		expect(store.isFavorite(pikachu)).toBe(false)
		store.addFavorite(pikachu)
		expect(store.isFavorite(pikachu)).toBe(true)
	})
})