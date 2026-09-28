/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xs': '320px',
        'xs': '360px',
      },
      colors: {
        lume: {
          950: '#0d0c0a',
          900: '#171513',
          850: '#211e1a',
          800: '#2b2722',
          700: '#423c34',
          600: '#5c5449',
          500: '#786e60',
          400: '#9e9282',
          300: '#c5baa9',
          200: '#ded7cc',
          100: '#f0ece3',
          50: '#fbf9f5',
          brown: {
            DEFAULT: '#8B5A2B',
            dark: '#5C3818',
            light: '#B27B42',
            bronze: '#A67C52',
            amber: '#966336'
          },
          gold: {
            DEFAULT: '#C5A880',
            light: '#E6D7C3',
            dark: '#9A7B56'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Cinzel', 'Playfair Display', 'serif']
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'super-wide': '0.35em'
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
        'luxury-hover': '0 25px 50px -12px rgba(139, 90, 43, 0.15)',
        'drawer': '-10px 0 30px rgba(0, 0, 0, 0.15)'
      }
    },
  },
  plugins: [],
}
