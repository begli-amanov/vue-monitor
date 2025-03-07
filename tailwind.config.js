/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: [
				'Inter var, sans-serif',
				{
					fontFeatureSettings: '"cv11", "ss01"',
					fontVariationSettings: '"opsz" 32',
				},
			],
		},
		extend: {},
	},
	plugins: [require('tailwindcss-primeui')],
};
