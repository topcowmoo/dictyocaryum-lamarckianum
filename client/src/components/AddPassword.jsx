import { useState } from "react";
import {
  PiEyeDuotone,
  PiEyeClosedDuotone,
  PiArrowsClockwiseDuotone,
  PiSealCheckDuotone,
} from "react-icons/pi";
import Button from "./Button.jsx";
import Modal from "./Modal.jsx";
import Generator from "./Generator.jsx";
import Dropdown from "./Dropdown.jsx";
import serviceIcons from "../utils/serviceIcons.js";

function AddPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleGeneratorModal = () => {
    setShowGenerator((prev) => !prev);
  };

  const handleSelectPassword = (generatedPassword) => {
    setPassword(generatedPassword); // Set the generated password as the new password
  };

  // Category items for the dropdown
  const categoryItems = [
    { id: 1, title: "All" },
    { id: 2, title: "Cards" },
    { id: 3, title: "Entertainment" },
    { id: 4, title: "Login" },
    { id: 5, title: "Wi-Fi" },
    { id: 6, title: "Identification" },
    { id: 7, title: "Deleted" },
  ];

  const serviceItems = Object.entries(serviceIcons).map(([key, Icon], index) => ({
    id: index + 1,
    title: key.charAt(0).toUpperCase() + key.slice(1),
    icon: <Icon size={20} />,
  }));

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Add New Entry</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-1 dark:text-title-dark text-title-light">Username</label>
          <input type="text" className="w-full border border-gray-300 p-2 rounded-[4px]" />
        </div>

        <div className="mb-4">
  <label htmlFor="password" className="block mb-1 dark:text-title-dark text-title-light">Password</label> {/* Positioned on top */}
  <div className="relative flex items-center border border-gray-300 rounded-[4px]">
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-2 pr-16 rounded-[4px] focus:outline-none"
    />

    {/* Show/Hide Password Icon */}
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="absolute right-8 flex items-center justify-center text-gray-500"
      aria-label="Toggle password visibility"
    >
      {showPassword ? (
        <PiEyeClosedDuotone className="text-[20px]" />
      ) : (
        <PiEyeDuotone className="text-[20px]" />
      )}
    </button>

    {/* Copy Password Icon */}
    <button
      type="button"
      onClick={toggleGeneratorModal}
      className="absolute right-2 flex items-center justify-center text-gray-500"
      aria-label="Open Password Generator"
    >
      <PiArrowsClockwiseDuotone className="text-[20px]" />
    </button>
  </div>
</div>




        {showGenerator && (
          <Modal onClose={toggleGeneratorModal}>
            <Generator onSelectPassword={handleSelectPassword} onClose={toggleGeneratorModal} />
          </Modal>
        )}

        <div className="mb-4">
          <label className="block mb-1 dark:text-title-dark text-title-light">Website Address</label>
          <input type="text" className="w-full border border-gray-300 p-2 rounded-[4px]" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 dark:text-title-dark text-title-light">Service Name</label>
          <Dropdown items={serviceItems} />
        </div>

        <div className="mb-4">
          <label className="block mb-1 dark:text-title-dark text-title-light">Category</label>
          <Dropdown items={categoryItems} />
        </div>

        <div className="flex flex-col gap-4">
          <Button
          icon={PiSealCheckDuotone}
          type="submit" 
          label="Save" 
          className="px-4 py-2 rounded-[4px] dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light" />
        </div>
      </form>
    </div>
  );
}

export default AddPassword;
