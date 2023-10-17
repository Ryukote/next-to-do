/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/**/*.{html, js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: ['flowbite/plugin'],
}

