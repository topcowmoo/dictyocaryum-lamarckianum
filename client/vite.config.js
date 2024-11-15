// Importing the defineConfig function from Vite
import { defineConfig } from "vite";
// Importing the React plugin for Vite
import react from "@vitejs/plugin-react";

// Exporting the Vite configuration as the default export
// Documentation: https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Using the React plugin to enable React support in the project
  server: {
    port: 8000, // Setting the port for the Vite development server to 8000
    open: true, // Automatically opening the app in the browser when the server starts
    proxy: {
      '/api': { // Defining a proxy for API requests to avoid CORS issues
        target: 'http://localhost:8001', // Target server for API requests
        changeOrigin: true, // Changes the origin of the request to match the target
        secure: false, // Disables SSL verification for the proxy
      },
    },
  },
});
