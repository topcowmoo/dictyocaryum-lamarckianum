// DarkModeContext.jsx

// Importing necessary hooks and PropTypes
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Creating a context for dark mode
export const DarkModeContext = createContext();

// DarkModeProvider component to manage and provide dark mode state
export const DarkModeProvider = ({ children }) => {
  // Initializing the dark mode state based on the saved theme in localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme'); // Retrieve saved theme from localStorage
    return savedTheme ? savedTheme === 'dark' : true; // Default to dark mode if no theme is saved
  });

  // useEffect to add or remove the 'dark' class on the document element based on dark mode state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark'); // Enable dark mode by adding 'dark' class
    } else {
      document.documentElement.classList.remove('dark'); // Disable dark mode by removing 'dark' class
    }
  }, [isDarkMode]); // Runs every time isDarkMode changes

  // Function to toggle dark mode on and off
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode; // Toggle the dark mode state
      localStorage.setItem('theme', newMode ? 'dark' : 'light'); // Save the new theme in localStorage
      return newMode;
    });
  };

  // Providing dark mode state and toggle function to children components
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children} {/* Rendering the child components */}
    </DarkModeContext.Provider>
  );
};

// PropTypes validation to ensure 'children' prop is passed and is a React node
DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
