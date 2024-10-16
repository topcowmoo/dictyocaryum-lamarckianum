/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Segoe UI", "Helvetica Neue"],
      },
      colors: {
        title: {
          light: "#1D3B77",
          dark: "#DBE2EF",
        },
        bgc: {
          light: "#F7F9F9",
          dark: "#112D4E",
        },
        alltext: {
          light: "#112D4E",
          dark: "#DEDEDE",
        },
        highlight: {
          light: "#FED7FE",
          dark: "#910693",
        },
        focusRing: {
          light: "#000000",
          dark: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
