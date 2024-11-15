// Importing necessary hooks, context, and components
import { useContext, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext"; // Context for dark mode functionality
import { useNavigate } from "react-router-dom"; // For navigation between routes
import {
  PiSunDuotone,
  PiMoonDuotone,
  PiSignOutDuotone,
  PiSealCheckDuotone,
  PiArrowCircleLeftDuotone,
} from "react-icons/pi"; // Importing icons from react-icons
import Button from "../components/Button"; // Custom Button component
import Modal from "../components/Modal"; // Modal component for displaying change password form
import ChangePassword from "../components/ChangePassword"; // ChangePassword form component

function Profile() {
  // Accessing dark mode context and state
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  // Hook for navigation
  const navigate = useNavigate();

  // State to manage the visibility of the change password modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle user logout
  const handleLogout = () => {
    console.log("User logged out"); // Placeholder for actual logout logic
    navigate("/login-page"); // Navigate to the login page after logout
  };

  // Function to handle opening the change password modal
  const handleChangePassword = () => {
    setIsModalOpen(true); // Set modal visibility to true
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Set modal visibility to false
  };

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen">
      {/* Dark Mode Toggle Icon in the Top-Left Corner */}
      <div className="absolute top-4 left-4 cursor-pointer">
        {isDarkMode ? (
          <PiSunDuotone size={30} onClick={toggleDarkMode} className="dark:text-alltext-dark" /> // Sun icon for toggling to light mode
        ) : (
          <PiMoonDuotone size={30} onClick={toggleDarkMode} className="text-alltext-light" /> // Moon icon for toggling to dark mode
        )}
      </div>

      {/* Left Pane for Account Management */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-hefo-light dark:bg-hefo-dark p-8 md:p-16">
        {/* App Logo */}
        <img
          src="https://vaultguardbucket2024.s3.us-east-1.amazonaws.com/vplogo.svg"
          alt="App logo"
          className="h-20 w-auto mb-4 md:h-24"
        />
        {/* Account Management Title */}
        <h1 className="text-center text-xl md:text-2xl font-bold dark:text-title-dark text-title-light mb-4 md:mb-6">
          Account Management
        </h1>

        {/* Buttons for Account Actions */}
        <div className="flex flex-col space-y-4 md:space-y-6 text-center">
          {/* Button to open Change Password modal */}
          <Button
            icon={PiSealCheckDuotone}
            iconSize={20}
            label="Change Password"
            onClick={handleChangePassword}
            className="dark:text-alltext-dark text-alltext-light w-32 md:w-36 text-sm"
          />

          {/* Logout Button */}
          <Button
            icon={PiSignOutDuotone}
            iconSize={20}
            label="Logout"
            onClick={handleLogout}
            className="dark:text-alltext-dark text-alltext-light w-32 md:w-36 text-sm"
          />

          {/* Button to navigate back to the dashboard */}
          <Button
            icon={PiArrowCircleLeftDuotone}
            iconSize={20}
            label="Go Back"
            onClick={() => navigate("/dashboard")}
            className="dark:text-alltext-dark text-alltext-light w-32 md:w-36 text-sm"
          />
        </div>
      </div>

      {/* Right Section with Background Image (visible only on large screens) */}
      <div className="hidden lg:block w-1/2 h-screen overflow-hidden">
        <img
          src="https://vaultguardbucket2024.s3.us-east-1.amazonaws.com/pexels-francis-desjardins-1613813-3314113.webp"
          alt="Image of bank exterior"
          className="h-full w-full object-cover object-bottom"
        />
      </div>

      {/* Modal for Changing Password */}
      {isModalOpen && (
        <Modal onClose={closeModal} showCloseButton={true}>
          <ChangePassword /> {/* Render the ChangePassword form within the Modal */}
        </Modal>
      )}
    </div>
  );
}

export default Profile;
