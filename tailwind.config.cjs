/** @type {import('tailwindcss').Config} */
module.exports = {
	plugins: [
		require('postcss-hover-media-feature')({
			fallback: true
		}),
		require('@tailwindcss/forms')
		// NOTE: Insert above the 'skeleton.cjs' plugin
	],
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms'),...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()],
}
