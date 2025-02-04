import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Cairo', sans-serif",
      },
      colors: {
        "neutral-800-90": "rgba(39, 39, 42, 0.8)",
      }
    },
  },
  plugins: [],
}