/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",              // si tienes index.html en la raíz (no obligatorio en React)
    "./src/**/*.{js,jsx,ts,tsx}", // todos los archivos dentro de src
    "./pages/**/*.{js,jsx,ts,tsx}", // Next.js
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
