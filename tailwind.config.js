/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Lexend', 'Helvetica', 'Arial', 'sans-serif'],
      serif: ['Abril Fatface', 'Georgia', 'serif'],
      monospace: ['IBM Plex Mono', 'monospace'],
      custom: ['YourCustomFont', 'sans-serif'], 
    },
  },
  plugins: [],
}

