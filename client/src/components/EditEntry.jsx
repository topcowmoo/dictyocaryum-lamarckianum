import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  PiEyeDuotone,
  PiEyeClosedDuotone,
  PiSealCheckDuotone,
  PiArrowsClockwiseDuotone,
  PiXCircleDuotone,
} from 'react-icons/pi';
import Button from "./Button.jsx";
import Modal from "./Modal.jsx";
import Generator from "./Generator.jsx";
import Dropdown from "./Dropdown.jsx";
import serviceIcons from '../utils/serviceIcons';

function EditEntry({ entryId, onSubmit, onClose = () => {} }) {
  // Initialize the form fields as blank
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [label, setLabel] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  const apiURL = import.meta.env.VITE_API_URL;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleGeneratorModal = () => {
    setShowGenerator((prev) => !prev);
  };

  const handleSelectPassword = (generatedPassword) => {
    setPassword(generatedPassword);
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
        
        // Reset form fields after submission
        setUsername("");
        setPassword("");
        setCategory("");
        setLabel("");
        setServiceName("");
  
        // Close the form (optional, as the parent manages this)
        onClose();
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

  const serviceItems = Object.entries(serviceIcons).map(
    ([key, Icon], index) => ({
      id: index + 1,
      title: key.charAt(0).toUpperCase() + key.slice(1),
      icon: <Icon size={20} />,
    })
  );

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-full max-w-6xl h-[70vh] p-6 bg-hefo-light dark:bg-sidebar-dark rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 dark:text-alltext-dark text-alltext-light">
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
                className="absolute right-8 flex items-center justify-center text-gray-500"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <PiEyeClosedDuotone className="text-[20px]" />
                ) : (
                  <PiEyeDuotone className="text-[20px]" />
                )}
              </button>
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
              <Generator
                onSelectPassword={handleSelectPassword}
                onClose={toggleGeneratorModal}
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

          <div className="flex justify-start space-x-4 mt-6">
            <Button
              icon={PiSealCheckDuotone}
              type="submit"
              label="Save"
              className="px-4 py-2 rounded-[4px] dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light"
            />

<Button
              icon={PiXCircleDuotone}
              onClick={onClose} // Close the modal by setting isVisible to false
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
