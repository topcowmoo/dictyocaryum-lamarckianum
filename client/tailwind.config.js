/** @type {import('tailwindcss').Config} */
// Exporting the Tailwind CSS configuration as a default export

export default {
  darkMode: "class", // Enabling dark mode support with the "class" strategy
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Specifying paths to all HTML and component files to scan for class usage

  theme: {
    extend: { // Extending the default Tailwind theme
      fontFamily: {
        // Adding custom font families to the "sans" stack
        sans: ["Poppins", "Segoe UI", "Helvetica Neue"],
      },
      colors: { // Custom color palette for different components
        hefo: {
          light: "#F7F9F9", // Light color for header/footer
          dark: "#39434a", // Dark color for header/footer
        },
        sidebar: {
          light: "#e1e1e1", // Light color for sidebar background
          dark: "#2f343d", // Dark color for sidebar background
        },
        vault: {
          light: "#d5d5d5", // Light color for vault background
          dark: "#1F242E", // Dark color for vault background
        },
        display: {
          light: "#c4c4c4", // Light color for display area
          dark: "#15181e", // Dark color for display area
        },
        title: {
          light: "#242F36", // Light color for titles
          dark: "#DBE2EF", // Dark color for titles
        },
        alltext: {
          light: "#191919", // Light color for general text
          dark: "#F7F9F9", // Dark color for general text
        },
        highlight: {
          light: "#420283", // Light color for text highlights
          dark: "#FEECFE", // Dark color for text highlights
        },
        buttonbgc: {
          light: "#1F242E", // Light color for button background
          dark: "#DBE2EF", // Dark color for button background
        },
        buttonti: {
          light: "#F6F6F6", // Light color for button text
          dark: "#15181e", // Dark color for button text
        },
      },
    },
  },
  plugins: [], // Array for adding Tailwind CSS plugins (empty in this case)
};
