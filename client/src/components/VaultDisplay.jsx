import { useState } from "react";
import PropTypes from "prop-types";
import {
  PiCopyDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
  PiPencilDuotone,
  PiTrashDuotone,
  PiXCircleDuotone,
} from "react-icons/pi";
import Button from "./Button";
import EditEntry from "./EditEntry";
import Modal from "./Modal";

const apiURL = import.meta.env.VITE_API_URL;

const VaultDisplay = ({
  service,
  username,
  label,
  password,
  Icon,
  entryId,
  setEntries,
  setSelectedEntry,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        console.log("Password copied to clipboard");
      });
    }
  };

  const handleDelete = async () => {
    if (!entryId) {
      console.error("entryId is missing");
      return;
    }

    try {
      const response = await fetch(`${apiURL}/api/locker/${entryId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: "Deleted" }),
      });

      if (response.ok) {
        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry._id === entryId ? { ...entry, category: "Deleted" } : entry
          )
        );
        setSelectedEntry(null); // Clear the selected entry
        setShowDeleteModal(false); // Close the modal
      } else {
        alert("Failed to move password entry. Please try again.");
      }
    } catch (error) {
      console.error("Error moving password entry:", error);
      alert("An error occurred while trying to move the entry.");
    }
  };

  const handleEditSubmit = (updatedEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry._id === updatedEntry._id ? updatedEntry : entry
      )
    );
    setSelectedEntry(updatedEntry); // Update the selected entry
    setIsEditing(false); // Exit editing mode
  };

  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleEditClose = () => {
    setIsEditing(false); // Exit editing mode when form is closed
  };

  const isEmpty = !service && !username && !password;

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-full max-w-6xl h-[70vh] p-6">
        {isEmpty ? (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-3xl dark:text-alltext-dark text-alltext-light opacity-60">
              VaultGuard Password Locker
            </h1>
          </div>
        ) : isEditing ? (
          <EditEntry
            entryId={entryId}
            initialData={{ service, username, label, password }}
            onSubmit={handleEditSubmit}
            onClose={handleEditClose}
          />
        ) : (
          <>
            {/* Top Section */}
            <div className="flex justify-start items-center dark:bg-buttonbgc-dark bg-buttonbgc-light py-6 px-4 rounded-t-[4px] dark:text-alltext-dark text-alltext-light">
              <div className="flex items-center space-x-4">
                {Icon && (
                  <Icon
                    size={45}
                    className="dark:text-buttonti-dark text-buttonti-light"
                  />
                )}
                <div>
                  <h2 className="text-[34px] dark:text-buttonti-dark text-buttonti-light">
                    {service}
                  </h2>
                </div>
              </div>
            </div>

            {/* Main Content Section */}
            <div className="p-4 bg-hefo-light dark:bg-sidebar-dark rounded-b-[4px] space-y-4">
              {/* Service Name */}
              <div className="border-b pb-2">
                <h3 className="text-[18px] mb-4 text-title-light dark:text-title-dark">
                  Service Name
                </h3>
                <p className="text-[16px] dark:text-alltext-dark text-alltext-light">
                  {service}
                </p>
              </div>

              {/* Label */}
              <div className="border-b pb-2">
                <h3 className="text-[18px] mb-4 text-title-light dark:text-title-dark">
                  Label
                </h3>
                <p className="text-[16px] dark:text-alltext-dark text-alltext-light">
                  {label}
                </p>
              </div>

              {/* Username */}
              <div className="border-b pb-2">
                <h3 className="text-[18px] mb-4 text-title-light dark:text-title-dark">
                  Username
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-[16px] dark:text-alltext-dark text-alltext-light">
                    {username}
                  </p>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(username)}
                    className="text-title-light dark:text-title-dark hover:text-highlight-light dark:hover:text-highlight-dark"
                    aria-label="Copy username"
                  >
                    <PiCopyDuotone className="text-[25px]" />
                  </button>
                </div>
              </div>

              {/* Password */}
              <div className="border-b pb-2">
                <h3 className="text-[18px] mb-4 text-title-light dark:text-title-dark">
                  Password
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-[16px] dark:text-alltext-dark text-alltext-light">
                    {showPassword ? password : "••••••••••"}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-title-light dark:text-title-dark hover:text-highlight-light dark:hover:text-highlight-dark"
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
                      onClick={copyToClipboard}
                      className="text-title-light dark:text-title-dark hover:text-highlight-light dark:hover:text-highlight-dark"
                      aria-label="Copy password"
                    >
                      <PiCopyDuotone className="text-[25px]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-around space-x-4 mt-4 py-4">
                <Button
                  icon={PiPencilDuotone}
                  label="Edit"
                  type="button"
                  onClick={handleEditClick}
                  size="md"
                  className="flex items-center space-x-1 dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light rounded-[4px]"
                />
                <Button
                  icon={PiTrashDuotone}
                  type="button"
                  label="Delete"
                  onClick={() => setShowDeleteModal(true)} // Open delete confirmation modal
                  size="md"
                  className="flex items-center space-x-1 dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light rounded-[4px]"
                />
              </div>
            </div>
          </>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
  <Modal onClose={() => setShowDeleteModal(false)} showCloseButton={false}>
    <div className="p-9 text-center">
      <h2 className="text-lg mb-9 dark:text-alltext-dark text-alltext-light">
        Are you sure you want to delete this entry?
      </h2>
      <div className="flex justify-center space-x-5">

      <Button
        icon={PiTrashDuotone}
          label="Confirm"
          onClick={handleDelete}
          className="dark:text-buttonti-dark text-buttonti-light px-4 py-2 rounded-[4px]"
        />
        <Button
        icon={PiXCircleDuotone}
          label="Cancel"
          onClick={() => setShowDeleteModal(false)}
          className="dark:text-buttonti-dark text-buttonti-light px-4 py-2 rounded-[4px]"
        />
        
      </div>
    </div>
  </Modal>
)}

      </div>
    </div>
  );
};

VaultDisplay.propTypes = {
  service: PropTypes.string,
  label: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  Icon: PropTypes.elementType,
  entryId: PropTypes.string,
  setEntries: PropTypes.func.isRequired,
  setSelectedEntry: PropTypes.func.isRequired,
};

export default VaultDisplay;
