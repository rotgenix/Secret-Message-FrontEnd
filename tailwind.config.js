/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'formHeight': '480px',
      },
      width: {
        'cardWidth': '300px'
      },
      borderWidth: {
        'cardBorder': '1px'
      },
      colors: {
        'cardBackground': '#e0e0e0',
        'cardShadow': '#bebebe',
        'messagePage': '#e8e8e8'
      },
      boxShadow: {
        'cardShadowOne': '10px 10px 30px rgba(190, 190, 190, 1)',
        'cardShadow': '20px 20px 60px rgba(190, 190, 190, 1)',
      }

    },

    screens: {
      'lgs': { 'max': '1535px' },
      // => @media (max-width: 1535px) { ... }

      'bigDesktop': { 'max': '1279px' },
      // => @media (max-width: 1279px) { ... }

      'desktop': { 'max': '1023px' },
      // => @media (max-width: 1023px) { ... }

      'tablets': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }

      'mobile': { 'max': '500px' },
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
}

