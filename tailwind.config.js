/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#2ab2d6',
        'custom-gray': '#48607d',
      }
    },
  },
  plugins: [],
}
