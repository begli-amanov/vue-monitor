import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/main.css';

// PrimeVue imports
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import Ripple from 'primevue/ripple';

// Variables and Function
const app = createApp(App);
const Noir = definePreset(Aura, {
	// components: {
	// 	button: {
	// 		colorScheme: {
	// 			dark: {
	// 				primaryBackground: '{surface.50}',
	// 			},
	// 		},
	// 	},

	// 	checkbox: {
	// 		colorScheme: {
	// 			dark: {
	// 				checkedBackground: '{surface.50}',
	// 				checkedHoverBackground: '{surface.50}',
	// 			},
	// 		},
	// 	},
	// },

	semantic: {
		colorScheme: {
			// for future light mode switcher
			light: {},

			dark: {
				primary: {
					0: '#ffffff',
					50: '#f4f4f4',
					100: '#e8e9e9',
					200: '#d2d2d4',
					300: '#bbbcbe',
					400: '#a5a5a9',
					500: '#8e8f93',
					600: '#77787d',
					700: '#616268',
					800: '#4a4b52',
					900: '#34343d',
					950: '#1d1e27',
				},
				surface: {
					0: '#ffffff',
					50: '#f4f4f4',
					100: '#e8e9e9',
					200: '#d2d2d4',
					300: '#bbbcbe',
					400: '#a5a5a9',
					500: '#8e8f93',
					600: '#77787d',
					700: '#616268',
					800: '#4a4b52',
					900: '#34343d',
					950: '#1d1e27',
				},
			},
		},
	},
});

app.use(PrimeVue, {
	theme: {
		preset: Noir,
		options: {
			prefix: 'p',
			darkModeSelector: '.my-app-dark',
		},
	},
	ripple: true,
});

app.directive('ripple', Ripple);
app.use(router);
app.mount('#app');
