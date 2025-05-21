import { createRouter, createWebHistory } from "vue-router";
import { useAppStore } from "@/stores/app";
import Welcome from "@/pages/Welcome.vue";
import Pokedex from '../pages/Pokedex.vue'

const routes = [
	{
		path: '/welcome',
		name: 'Welcome',
		component: Welcome,
		meta: { title: 'Pokédex - Welcome' }
	},
	{
		path: '/',
		name: 'Pokedex',
		component: Pokedex,
		meta: { title: 'Pokédex' }
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	const store = useAppStore()

	if (!store.hasSeenWelcome && to.path !== '/welcome') {
		next('/welcome')
	} else if (store.hasSeenWelcome && to.path === '/welcome') {
		next('/')
	} else {
		next()
	}
})

router.afterEach((to) => {
	const defaultTitle = 'Pokedex'
	document.title = to.meta.title || defaultTitle
})

export default router