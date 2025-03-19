/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"], 
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '5rem',
        },
      },
      colors: {
        textColor: 'rgb(80, 35, 20)', 
        textColorHover: 'rgb(80, 35, 20, 0.85)',
      },
      fontFamily: {
        balsamiq: ["Balsamiq Sans", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
