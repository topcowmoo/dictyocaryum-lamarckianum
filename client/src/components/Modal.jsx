import PropTypes from "prop-types";
import {
  PiCopyDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
  PiPencilDuotone,
  PiTrashDuotone,
} from "react-icons/pi";
import Button from "./Button";
import { useState } from "react";
import Modal from "./Modal";

const VaultDisplay = ({ service, username, password, Icon }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to manage edited values
  const [editedService, setEditedService] = useState(service);
  const [editedUsername, setEditedUsername] = useState(username);
  const [editedPassword, setEditedPassword] = useState(password);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        console.log("Password copied to clipboard");
      });
    }
  };

  const handleEditSave = () => {
    // Logic to save the updated values, e.g., send to server or update state
    console.log("Updated values:", editedService, editedUsername, editedPassword);
    setIsModalOpen(false); // Close the modal after saving
  };

  // Only render the display content if service, username, or password is present
  if (!service && !username && !password) {
    return null; // Renders nothing if no entry is selected
  }

  return (
    <div className="p-4 h-full flex flex-col justify-center dark:text-alltext-dark text-alltext-light">
      <div className="flex items-center space-x-4">
        {Icon && <Icon size={32} />} {/* Render the Icon if it's provided */}
        <div>
          <h2 className="text-xl font-bold">{service}</h2>
          <p className="text-sm">{username}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Password:</h3>
        <p>{showPassword ? password : "••••••••••"}</p>
      </div>
      <div className="flex space-x-4 mt-4">
        {/* Toggle Password Visibility */}
        <Button
          icon={showPassword ? PiEyeClosedDuotone : PiEyeDuotone}
          label={showPassword ? "Hide" : "Show"}
          onClick={togglePasswordVisibility}
          iconSize={20}
        />

        {/* Copy Password */}
        <Button
          icon={PiCopyDuotone}
          label="Copy"
          onClick={copyToClipboard}
          iconSize={20}
        />

        {/* Edit Button */}
        <Button
          icon={PiPencilDuotone}
          label="Edit"
          onClick={() => setIsModalOpen(true)} // Open the modal on click
          iconSize={20}
        />

        {/* Delete Button */}
        <Button
          icon={PiTrashDuotone}
          label="Delete"
          iconSize={20}
        />

        {/* Modal for Editing */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Edit Vault Entry"
          onConfirm={handleEditSave} // Save changes when confirmed
          confirmText="Save"
          cancelText="Cancel"
        >
          {/* Form Fields for Editing */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Service</label>
              <input
                type="text"
                value={editedService}
                onChange={(e) => setEditedService(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                value={editedPassword}
                onChange={(e) => setEditedPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

VaultDisplay.propTypes = {
  service: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  Icon: PropTypes.elementType,
};

export default VaultDisplay;
