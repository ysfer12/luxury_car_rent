/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        gold: {
          50: '#fbf7e9',
          100: '#f7efd3',
          200: '#f0dfa7',
          300: '#e9cf7b',
          400: '#e2bf4f',
          500: '#dcaf23',
          600: '#b08c1c',
          700: '#846915',
          800: '#58460e',
          900: '#2c2307',
        },
        charcoal: {
          50: '#f3f4f6',
          100: '#e7e9ed',
          200: '#c4c8d2',
          300: '#a0a7b7',
          400: '#7d8599',
          500: '#5a647b',
          600: '#485062',
          700: '#363c4a',
          800: '#242831',
          900: '#121419',
        },
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(to right, rgba(176, 140, 28, 0.8), rgba(220, 175, 35, 0.8))',
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(220, 175, 35, 0.3)',
      },
    },
  },
  plugins: [],
}