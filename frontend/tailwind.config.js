/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazir', 'sans-serif'],
      },
      transitionProperty: { height: 'height', width: 'width' },
    },
  },
  plugins: [],
};
export default config;
