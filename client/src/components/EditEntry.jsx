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

function EditEntry({ entryId, initialData, onSubmit, onClose = () => {} }) {
  const [username, setUsername] = useState(initialData?.username || "");
  const [password, setPassword] = useState(initialData?.password || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [label, setLabel] = useState(initialData?.label || "");
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
  
    if (!password || !category) {
      alert("Password and category are required.");
      return;
    }
  
    try {
      const response = await fetch(`${apiURL}/api/locker/${entryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
          category,
          label,
        }),
      });
  
      if (response.ok) {
        const updatedEntry = await response.json();
        if (onSubmit) {
          onSubmit(updatedEntry); // ✅ Ensure onSubmit is called
        }
        alert("Password entry updated successfully!");
        onClose();
      } else {
        alert("Failed to update password entry. Please try again.");
      }
    } catch (error) {
      console.error("Error updating password entry:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  // List of category options
  const categoryItems = [
    { id: 1, title: "Cards" },
    { id: 2, title: "Entertainment" },
    { id: 3, title: "Login" },
    { id: 4, title: "Identification" },
  ];

  // Find the matching category item to preselect in the Dropdown
  const matchingCategoryItem = categoryItems.find((item) => item.title === category);

  return (
    <div className="h-full w-full flex flex-col">
      {/* Header Section */}
      <div className="dark:bg-vault-dark bg-vault-light p-6 flex items-center rounded-t-[4px]">
        <h2 className="text-[34px] dark:text-title-dark text-title-light">
          Edit Entry
        </h2>
      </div>

      {/* Main Form Section */}
      <div className="flex-1 p-6 bg-sidebar-light dark:bg-sidebar-dark rounded-b-[4px] overflow-y-auto">
        <form onSubmit={handleSubmit} className="h-full flex flex-col">
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
            <Modal
              onClose={toggleGeneratorModal}
              customClass="w-[1200px] h-[900px]"
              showCloseButton={false}
            >
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
              initialSelectedItem={matchingCategoryItem} // Pass the matching category
              onSelect={(item) => setCategory(item.title)} // Update category on selection
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

EditEntry.propTypes = {
  entryId: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    category: PropTypes.string,
    label: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default EditEntry;
