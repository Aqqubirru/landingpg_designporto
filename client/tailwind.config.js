/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f2f2f2',
        surface: '#f5f5f5',
        border: '#e0e0e0',
        text: '#111111',
        muted: '#888888',
        accent: '#111111',
        'accent-light': '#444444',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}