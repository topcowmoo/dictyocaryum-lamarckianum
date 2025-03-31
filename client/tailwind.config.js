/** @type {import('tailwindcss').Config} */
// Exporting the Tailwind CSS configuration as a default export

export default {
  darkMode: "class", // Enabling dark mode support with the "class" strategy
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Specifying paths to all HTML and component files to scan for class usage

  theme: {
    extend: { // Extending the default Tailwind theme
      
      screens: {
        'landscape-sm': { raw: '(max-width: 768px) and (orientation: landscape)' },
      },

      fontFamily: {
        // Adding custom font families to the "sans" stack
        sans: ["Poppins", "Segoe UI", "Helvetica Neue"],
      },
      colors: { // Custom color palette for different components
        hefo: {
          light: "#f8f8fa", // Light color for header/footer
          dark: "#3c424e", // Dark color for header/footer
        },
        sidebar: {
          light: "#e5e6eb", // Light color for sidebar background
          dark: "#2f343d", // Dark color for sidebar background
        },
        vault: {
          light: "#d2d4dc", // Light color for vault background
          dark: "#24272e", // Dark color for vault background
        },
        display: {
          light: "#c0c2ce", // Light color for display area
          dark: "#15181e", // Dark color for display area
        },
        title: {
          light: "#034569", // Light color for titles
          dark: "#DCE6F9", // Dark color for titles
        },
        alltext: {
          light: "#000000", // Light color for general text
          dark: "#ffffff", // Dark color for general text
        },
        highlight: {
          light: "#823519", // Light color for text highlights
          dark: "#EFC471", // Dark color for text highlights
        },
        buttonbgc: {
          light: "#000000", // Light color for button background
          dark: "#ffffff", // Dark color for button background
        },
        buttonti: {
          light: "#ffffff", // Light color for button text
          dark: "#15181e", // Dark color for button text
        },
      },
    },
  },
  plugins: [], // Array for adding Tailwind CSS plugins (empty in this case)
};