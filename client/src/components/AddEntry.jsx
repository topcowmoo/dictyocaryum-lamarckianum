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

function AddEntry({ onClose, onAddEntry }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
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
    setPassword(generatedPassword);
    closeGeneratorModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !username || !password || !category) {
      alert(
        "All fields are required: Name, Username, Password, and Category."
      );
      return;
    }
    try {
      const response = await fetch(`${apiURL}/api/locker`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          username,
          password,
          category,
        }),
      });

      if (response.ok) {
        const newEntry = await response.json();
        onAddEntry(newEntry); // Call parent callback
        setName("");
        setUsername("");
        setPassword("");
        setCategory("");
        onClose(); // Close form
      } else {
        alert("Failed to add password entry. Please try again.");
      }
    } catch (error) {
      console.error("Error adding password entry:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const categoryItems = [
    { id: 1, title: "Cards" },
    { id: 2, title: "Entertainment" },
    { id: 3, title: "Login" },
    { id: 4, title: "Identification" },
  ];

  return (
    <div className="h-full w-full flex flex-col">
      {/* Header Section */}
      <div className="dark:bg-vault-dark bg-vault-light p-6 flex items-center rounded-t-[4px]">
        <h2 className="text-[34px] dark:text-title-dark text-title-light">
          Add New Entry
        </h2>
      </div>

      {/* Main Form Section */}
      <div className="flex-1 p-6 bg-sidebar-light dark:bg-sidebar-dark rounded-b-[4px] overflow-y-auto">
        <form onSubmit={handleSubmit} className="h-full flex flex-col">
          <div className="mb-4">
            <label className="block mb-1 dark:text-title-dark text-title-light">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-[4px]"
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
                className="absolute right-10 flex items-center justify-center dark:text-black dark:hover:text-highlight-dark hover:text-highlight-light"
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
            <Modal onClose={toggleGeneratorModal} showCloseButton={false}>
              <Generator
                onSelectedPassword={handleSelectPassword}
                onClose={closeGeneratorModal}
              />
            </Modal>
          )}

          

          <div className="mb-4">
            <label className="block mb-1 dark:text-title-dark text-title-light">
              Category
            </label>
            <Dropdown
              items={categoryItems}
              onSelect={(item) => setCategory(item.title)}
            />
          </div>

          <div className="flex justify-around space-x-4 py-4">
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

AddEntry.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddEntry: PropTypes.func.isRequired,
};

export default AddEntry;
