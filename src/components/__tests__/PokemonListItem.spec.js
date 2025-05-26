import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PokemonListItem from '../PokemonListItem.vue'

const pikachu = { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/"	}

describe('PokemonListItem', () => {

	it('renders the Pokemon name', () => {
		const wrapper = mount(PokemonListItem, {
			props: { pokemon: pikachu }
		})
		expect(wrapper.text()).toContain('pikachu')
	})

	it('emits a click when the card is clicked', async () => {
		const wrapper = mount(PokemonListItem, {
			props: { pokemon: pikachu }
		})
		await wrapper.trigger('click')

		expect(wrapper.emitted('click')).toBeTruthy()
		expect(wrapper.emitted('click')[0]).toEqual([pikachu])
	})

	it('emits "favorite" event when favorite button is clicked', async () => {
		const wrapper = mount(PokemonListItem, {
			props: { pokemon: pikachu, isFavorite: false },
			global: {
				stubs: {
					FavoriteToggle: {
						template: `<button data-test="favorite-button" @click="$emit('favorite')">★</button>`
					}
				}
			}
		})

		await wrapper.find('[data-test="favorite-button"]').trigger('click')

		expect(wrapper.emitted('favorite')).toBeTruthy()
		expect(wrapper.emitted('favorite')[0]).toEqual([pikachu])
	})

})