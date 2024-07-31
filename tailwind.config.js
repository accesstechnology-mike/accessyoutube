/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        dark: '#2e1433',
        light: '#f7f5f8',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}