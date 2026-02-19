/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#070B14',
        graphite: '#121826',
        platinum: '#E5E7EB',
        gold: '#D6B36A',
        sapphire: '#3B82F6',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(to bottom right, #070B14, #121826)',
      }
    },
  },
  plugins: [],
}
