// Importing necessary hooks, context, and components
import { useContext, useState } from "react"
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
          <PiSunDuotone size={30} onClick={toggleDarkMode} className="dark:text-alltext-dark text-alltext-light dark:hover:text-highlight-dark hover:text-highlight-light cursor-pointer" /> // Sun icon for toggling to light mode
        ) : (
          <PiMoonDuotone size={30} onClick={toggleDarkMode} className="dark:text-alltext-dark text-alltext-light dark:hover:text-highlight-dark hover:text-highlight-light cursor-pointer" /> // Moon icon for toggling to dark mode
        )}
      </div>

{/* Left Pane for Account Management */}
<div className="w-full lg:w-1/2 flex flex-col items-center justify-center min-h-screen lg:min-h-0 bg-hefo-light dark:bg-hefo-dark">
  {/* App Logo */}
  <img
    src="https://vaultguardbucket2024.s3.us-east-1.amazonaws.com/vplogo.svg"
    alt="App logo"
    className="h-20 w-auto mb-3 md:h-21"
  />

  {/* Account Management Title */}
  <h1 className="text-center text-xl md:text-2xl dark:text-title-dark text-title-light mb-4">
    Account Management
  </h1>

  {/* Card Container */}
  <div className="flex flex-col items-center justify-center min-h-[50%] w-full max-w-lg">
    {/* Card 1: Change Password */}
    <div className="p-4 dark:bg-display-dark bg-sidebar-light rounded-[4px] shadow-lg w-full max-w-sm mb-5">
      <h2 className="text-lg dark:text-title-dark text-title-light mb-3">Change Your Password</h2>
      <p className="text-sm dark:text-alltext-dark text-alltext-light mb-4">
        Update your master password to keep your account secure.
      </p>
      <Button
        icon={PiSealCheckDuotone}
        iconSize={20}
        label="Change Password"
        onClick={handleChangePassword}
        className="dark:text-alltext-dark text-alltext-light w-full text-sm"
        size="md"
      />
    </div>

    {/* Card 2: Logout */}
    <div className="p-4 dark:bg-display-dark bg-sidebar-light rounded-[4px] shadow-lg w-full max-w-sm mb-5">
      <h2 className="text-lg dark:text-title-dark text-title-light mb-3">Logout</h2>
      <p className="text-sm dark:text-alltext-dark text-alltext-light mb-4">
        Log out of your account securely when you are done.
      </p>
      <Button
        icon={PiSignOutDuotone}
        iconSize={20}
        label="Logout"
        onClick={handleLogout}
        className="dark:text-alltext-dark text-alltext-light w-full text-sm"
        size="md"
      />
    </div>

    {/* Card 3: Go Back */}
    <div className="p-4 dark:bg-display-dark bg-sidebar-light rounded-[4px] shadow-lg w-full max-w-sm">
      <h2 className="text-lg dark:text-title-dark text-title-light mb-3">Back to Dashboard</h2>
      <p className="text-sm dark:text-alltext-dark text-alltext-light mb-4">
        Return to your main dashboard and view your information.
      </p>
      <Button
        icon={PiArrowCircleLeftDuotone}
        iconSize={20}
        label="Go Back"
        onClick={() => navigate("/dashboard")}
        className="dark:text-alltext-dark text-alltext-light w-full text-sm"
        size="md"
      />
    </div>
  </div>
</div>


      {/* Right Section with Background Image (visible only on large screens) */}
      <div className="hidden lg:block w-1/2 min-h-screen overflow-hidden">

        <img
          src="https://vaultguardbucket2024.s3.us-east-1.amazonaws.com/pexels-francis-desjardins-1613813-3314113.webp"
          alt="Image of bank exterior"
          className="h-full w-full object-cover object-bottom"
        />
      </div>

      {/* Modal for Changing Password */}
      {isModalOpen && (
        <Modal onClose={closeModal} showCloseButton={false}>
          <ChangePassword onClose={closeModal} /> {/* Render the ChangePassword form within the Modal */}
        </Modal>
      )}
    </div>
  );
}

export default Profile;
