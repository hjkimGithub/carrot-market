module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}",  
  ],
  theme: {
    extend: {},
  },
  // darkMode: "class",
  darkMode: "media",
  plugins: [require("@tailwindcss/forms")],
}
