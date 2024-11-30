import { useState } from "react";
import PropTypes from "prop-types";
import {
  PiEyeDuotone,
  PiEyeClosedDuotone,
  PiArrowsClockwiseDuotone,
  PiSealCheckDuotone,
  PiXCircleDuotone,
} from "react-icons/pi";
import Button from "./Button.jsx";
import Modal from "./Modal.jsx";
import Generator from "./Generator.jsx";
import Dropdown from "./Dropdown.jsx";
import { serviceIcons, serviceNames } from "../utils/serviceIcons.js";

function EditEntry({ entryId, initialData, onSubmit, onClose = () => {} }) {
  const [username, setUsername] = useState(initialData?.username || "");
  const [password, setPassword] = useState(initialData?.password || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [label, setLabel] = useState(initialData?.label || "");
  const [serviceName, setServiceName] = useState(initialData?.serviceName || "");
  const [showPassword, setShowPassword] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  const apiURL = import.meta.env.VITE_API_URL;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleGeneratorModal = () => {
    setShowGenerator((prev) => !prev);
  };

  const closeGeneratorModal = () => {
    setShowGenerator(false);
  };

  const handleSelectPassword = (generatedPassword) => {
    setPassword(generatedPassword); // Update password field with generated password
    closeGeneratorModal(); // Close the generator modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceName || !password || !category) {
      alert("Service name, password, and category are required.");
      return;
    }

    try {
      const response = await fetch(`${apiURL}/api/locker/${entryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password, category, serviceName, label }),
      });

      if (response.ok) {
        const updatedEntry = await response.json();
        onSubmit(updatedEntry); // Notify the parent about the update
        alert("Password entry updated successfully!");
        onClose(); // Close the modal
      } else {
        alert("Failed to update password entry. Please try again.");
      }
    } catch (error) {
      console.error("Error updating password entry:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const categoryItems = [
    { id: 1, title: "Cards" },
    { id: 2, title: "Entertainment" },
    { id: 3, title: "Login" },
    { id: 4, title: "Wi-Fi" },
    { id: 5, title: "Identification" },
  ];

  const serviceItems = Object.entries(serviceNames).map(([key, name], index) => {
    const Icon = serviceIcons[key] || serviceIcons.default; // Retrieve the correct icon or default
    return {
      id: index + 1,
      title: name,
      icon: <Icon size={20} />, // Use the dynamic icon component properly
    };
  });

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-full max-w-6xl h-[70vh] p-6 bg-sidebar-light dark:bg-hefo-dark rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 dark:text-title-dark text-title-light">
          Edit Entry
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 dark:text-title-dark text-title-light">
              Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-[4px]"
              placeholder="e.g., Personal, Work, Family Account"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 dark:text-title-dark text-title-light">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-[4px]"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 dark:text-title-dark text-title-light"
            >
              Password
            </label>
            <div className="relative flex items-center border border-gray-300 rounded-[4px]">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 pr-16 rounded-[4px] focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-10  flex items-center justify-center dark:text-black dark:hover:text-highlight-dark hover:text-highlight-light"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <PiEyeClosedDuotone className="text-[25px]" />
                ) : (
                  <PiEyeDuotone className="text-[25px]" />
                )}
              </button>
              <button
                type="button"
                onClick={toggleGeneratorModal}
                className="absolute right-2 flex items-center justify-center dark:text-black dark:hover:text-highlight-dark hover:text-highlight-light"
                aria-label="Open Password Generator"
              >
                <PiArrowsClockwiseDuotone className="text-[25px]" />
              </button>
            </div>
          </div>

          {showGenerator && (
            <Modal onClose={toggleGeneratorModal}>
              <Generator
                onSelectedPassword={handleSelectPassword} // Pass selected password
                onClose={closeGeneratorModal} // Handle modal closure
              />
            </Modal>
          )}

          <div className="mb-4">
            <label className="block mb-1 dark:text-title-dark text-title-light">
              Service Name
            </label>
            <Dropdown
              items={serviceItems}
              onSelect={(item) => setServiceName(item.title)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 dark:text-title-dark text-title-light">
              Category
            </label>
            <Dropdown
              items={categoryItems}
              onSelect={(item) => setCategory(item.title)}
            />
          </div>

          <div className="flex justify-around space-x-4 mt-6">
            <Button
              icon={PiSealCheckDuotone}
              type="submit"
              label="Save"
              className="px-4 py-2 rounded-[4px] dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light"
            />
            <Button
              icon={PiXCircleDuotone}
              onClick={onClose}
              label="Close"
              className="px-4 py-2 rounded-[4px] dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

EditEntry.propTypes = {
  entryId: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    category: PropTypes.string,
    serviceName: PropTypes.string,
    label: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default EditEntry;
