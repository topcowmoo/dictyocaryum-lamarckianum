import { useContext, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { useNavigate } from "react-router-dom";
import {
  PiSunDuotone,
  PiMoonDuotone,
  PiSignOutDuotone,
  PiSealCheckDuotone,
  PiArrowCircleLeftDuotone,
} from "react-icons/pi";
import Button from "../components/Button";
import Modal from "../components/Modal"; // Import Modal component
import ChangePassword from "../components/ChangePassword"; // Import ChangePassword component

function Profile() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  // Handle Logout Function
  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login-page");
  };

  // Handle Change Password
  const handleChangePassword = () => {
    setIsModalOpen(true); // Open the modal
  };

  // Close Modal Function
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen">
      {/* Dark Mode Toggle Icon in Top-Left */}
      <div className="absolute top-4 left-4 cursor-pointer">
        {isDarkMode ? (
          <PiSunDuotone size={30} onClick={toggleDarkMode} className="dark:text-alltext-dark" />
        ) : (
          <PiMoonDuotone size={30} onClick={toggleDarkMode} className="text-alltext-light" />
        )}
      </div>

      {/* Left Pane */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-hefo-light dark:bg-hefo-dark p-8 md:p-16">
        <img
          src="https://vaultguardbucket2024.s3.amazonaws.com/logo.svg"
          alt="App logo"
          className="h-20 w-auto mb-4 md:h-24"
        />
        <h1 className="text-center text-xl md:text-2xl font-bold dark:text-title-dark text-title-light mb-4 md:mb-6">
          Account Management
        </h1>
        <div className="flex flex-col space-y-4 md:space-y-6 text-center">
          <Button
            icon={PiSealCheckDuotone}
            iconSize={20}
            label="Change Password"
            onClick={handleChangePassword} // Open the modal on click
            className="dark:text-alltext-dark text-alltext-light w-32 md:w-36 text-sm"
          />
          <Button
            icon={PiSignOutDuotone}
            iconSize={20}
            label="Logout"
            onClick={handleLogout}
            className="dark:text-alltext-dark text-alltext-light w-32 md:w-36 text-sm"
          />
          <Button
            icon={PiArrowCircleLeftDuotone}
            iconSize={20}
            label="Go Back"
            onClick={() => navigate("/dashboard")}
            className="dark:text-alltext-dark text-alltext-light w-32 md:w-36 text-sm"
          />
        </div>
      </div>

      {/* Right Section with Image */}
      <div className="hidden lg:block w-1/2 h-screen overflow-hidden">
        <img
          src="https://vaultguardbucket2024.s3.us-east-1.amazonaws.com/pexels-francis-desjardins-1613813-3314113.webp"
          alt="Image of bank exterior"
          className="h-full w-full object-cover object-bottom"
        />
      </div>

      {/* Modal for Change Password */}
      {isModalOpen && (
        <Modal onClose={closeModal} showCloseButton={false}>
          <ChangePassword /> {/* Only the ChangePassword form is rendered */}
        </Modal>
      )}
    </div>
  );
}

export default Profile;
