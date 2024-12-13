// @ts-nocheck

import Login from '@/components/Login.vue';
import Home from '@/views/Home.vue';
import TableVue from '@/views/TableVue.vue';
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
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/table',
			name: 'table',
			component: TableVue,
		},
	],
});

export default router;
