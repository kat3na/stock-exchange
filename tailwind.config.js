/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './public/icons/**/*.{webp}',
    ],
    
  theme: {
    extend: {
      screens: {
        '2xl': '1536px',
      },
      colors: {
        expertBlue: '#1b1f3b',
        expertDark: '#0d1024',
        expertButton: '#2997ff',
      },
    },
  },
  plugins: [],
}
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#00c6ff',
        background: '#0d0d26',
        text: '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
