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
        hefo: {
          light: "#F7F9F9",
          dark: "#39434a",
        },
        sidebar: {
          light: "#e1e1e1",
          dark: "#2f343d",
        },
        vault: {
          light: "#d5d5d5",
          dark: "#1F242E",
        },
        display: {
          light: "#c4c4c4",
          dark: "#15181e",
        },
        title: {
          light: "#242F36",
          dark: "#DBE2EF",
        },
        alltext: {
          light: "#191919",
          dark: "#F7F9F9",
        },
        highlight: {
          light: "#420283",
          dark: "#FEECFE",
        },
        buttonbgc: {
          light: "#1F242E",
          dark: "#DBE2EF",
        },
        buttonti: {
          light: "#F6F6F6",
          dark: "#15181e",
        },
      },
    },
  },
  plugins: [],
};
