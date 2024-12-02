import Login from '@/components/Login.vue';
import Home from '@/views/Home.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login,
		},
		{
			path: '/home',
			name: 'home',
			component: Home,
		},
	],
});

export default router;
