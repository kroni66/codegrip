/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af', // blue
        secondary: '#6b7280', // grey
        background: '#000000', // black
        text: '#ffffff', // white
      },
    },
  },
  plugins: [],
}
