// import Home from '@/views/Home.vue';
// import Now from '@/views/Now.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		// {
		// 	path: '/',
		// 	name: 'home',
		// 	component: Home,
		// },
		// {
		// 	path: '/now',
		// 	name: 'now',
		// 	component: Now,
		// },
	],
});

export default router;
