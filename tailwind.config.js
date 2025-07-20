/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A0E2A",       
        secondary: "#1F233F",     
        accent: "#5B61FF",        
        textLight: "#F1F5F9",     
        muted: "#94A3B8",         
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}
