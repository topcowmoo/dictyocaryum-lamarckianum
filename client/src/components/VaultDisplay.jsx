import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  PiCopyDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
  PiPencilDuotone,
  PiTrashDuotone,
  PiSealCheckDuotone,
  PiXCircleDuotone,
  PiTrashSimpleDuotone,
} from "react-icons/pi";
import Button from "./Button";
import EditEntry from "./EditEntry";
import Modal from "./Modal";

const apiURL = import.meta.env.VITE_API_URL;

const VaultDisplay = ({

  name,
  username,
  password,
  entryId,
  setEntries,
  setSelectedEntry,
  category,
  entries,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
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
        body: JSON.stringify({
          category: "Deleted",
          previousCategory: category, // 🔥 Store previous category before deletion
        }),
      });
  
      if (response.ok) {
        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry._id === entryId ? { ...entry, category: "Deleted", previousCategory: category } : entry
          )
        );
        setSelectedEntry(null);
        setShowDeleteModal(false);
      } else {
        alert("Failed to move password entry. Please try again.");
      }
    } catch (error) {
      console.error("Error moving password entry:", error);
      alert("An error occurred while trying to move the entry.");
    }
  };
  

  const handleRestore = async (id) => {
    try {
      const response = await fetch(`${apiURL}/api/locker/${id}/restore`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: entries.find((entry) => entry._id === id)?.previousCategory || "All",
        }),
      });
  
      if (response.ok) {
        const updatedEntry = await response.json();
        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry._id === updatedEntry._id ? updatedEntry : entry
          )
        );
        setSelectedEntry(null);
      } else {
        alert("Failed to restore entry.");
      }
    } catch (error) {
      console.error("Error restoring entry:", error);
      alert("An error occurred while trying to restore the entry.");
    }
  };
  

  const handlePermanentDelete = async (id) => {
    try {
      const response = await fetch(`${apiURL}/api/locker/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (response.ok) {
        setEntries((prevEntries) =>
          prevEntries.filter((entry) => entry._id !== id)
        );
        setSelectedEntry(null);
        setShowDeleteModal(false);
      } else {
        alert("Failed to delete entry.");
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
      alert("An error occurred while trying to delete the entry.");
    }
  }
  

  const handleEditSubmit = (updatedEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry._id === updatedEntry._id ? updatedEntry : entry
      )
    );
    setSelectedEntry(updatedEntry);
    setIsEditing(false);
  };

  useEffect(() => {
    if (entryId) {
      setIsEditing(false); // Close edit mode when entryId changes
    }
  }, [entryId]);

  const handleEditClick = () => setIsEditing(true);
  const handleEditClose = () => setIsEditing(false);

  const isEmpty = !username && !password;


  return (
    <div className="h-full w-full flex">
      <div className="w-full h-full flex flex-col">
        {isEmpty ? (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-3xl dark:text-alltext-dark text-alltext-light">
              VaultGuard Password Locker
            </h1>
          </div>
        ) : isEditing ? (
          <EditEntry
          entryId={entryId}
          initialData={{
            name: name,
            username: username,
            password: password,
            category: category,
          }}
          onSubmit={handleEditSubmit}
          onClose={handleEditClose}
        />
        ) : (
          <>
            <div className="flex items-center dark:bg-sidebar-dark bg-sidebar-light rounded-t-[4px] pt-1 px-4 dark:text-alltext-dark text-alltext-light shadow-lg">
             
            </div>
            <div className="flex-1 p-4 dark:bg-sidebar-dark bg-sidebar-light rounded-b-[4px] space-y-3 overflow-y-auto">
              <div className=" border-alltext-light dark:border-alltext-dark pb-2">
             
              </div>
              <div className="border-b border-alltext-light dark:border-alltext-dark pb-2">
                <h3 className="text-[18px] mb-4 text-title-light dark:text-title-dark">
                  Name
                </h3>
                <p className="text-[16px] dark:text-alltext-dark text-alltext-light">
                  {name}
                </p>
              </div>
              <div className="border-b border-alltext-light dark:border-alltext-dark pb-2">
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
                    className="dark:text-alltext-dark text-alltext-light hover:text-highlight-light dark:hover:text-highlight-dark"
                    aria-label="Copy username"
                  >
                    <PiCopyDuotone className="text-[25px]" />
                  </button>
                </div>
              </div>
              <div className="border-b border-alltext-light dark:border-alltext-dark pb-2">
  <h3 className="text-[18px] mb-4 text-title-light dark:text-title-dark">
    Password
  </h3>
  <div className="flex justify-between items-center">
    {/* Display password or dots based on showPassword */}
    <p className="text-[16px] dark:text-alltext-dark text-alltext-light">
      {showPassword ? password || "No password set" : "••••••••••"}
    </p>
    <div className="flex space-x-2">
      {/* Toggle visibility button */}
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="dark:text-alltext-dark text-alltext-light hover:text-highlight-light dark:hover:text-highlight-dark"
        aria-label="Toggle password visibility"
      >
        {showPassword ? (
          <PiEyeClosedDuotone className="text-[25px]" />
        ) : (
          <PiEyeDuotone className="text-[25px]" />
        )}
      </button>

      {/* Copy password button */}
      <button
        type="button"
        onClick={copyToClipboard}
        className="dark:text-alltext-dark text-alltext-light hover:text-highlight-light dark:hover:text-highlight-dark"
        aria-label="Copy password"
      >
        <PiCopyDuotone className="text-[25px]" />
      </button>
    </div>
  </div>
</div>
<div className="flex justify-around space-x-4 mt-4 py-4">
  {category === "Deleted" ? (
    <>
      <Button
        icon={PiSealCheckDuotone}
        label="Restore"
        type="button"
        onClick={() => handleRestore(entryId)}
        size="md"
        className="flex items-center space-x-1 dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light rounded-[4px]"
      />
      <Button
        icon={PiTrashSimpleDuotone}
        label="Remove"
        type="button"
        onClick={() => handlePermanentDelete(entryId)}
        size="md"
        className="flex items-center space-x-1 dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light rounded-[4px]"
      />
    </>
  ) : (
    <>
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
        onClick={() => setShowDeleteModal(true)}
        size="md"
        className="flex items-center space-x-1 dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light rounded-[4px]"
      />
    </>
  )}
</div>

            </div>
          </>
        )}
        
        {showDeleteModal && (
          <Modal onClose={() => setShowDeleteModal(false)} showCloseButton={false}>
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="p-9 text-center bg-hefo-light dark:bg-hefo-dark rounded-[4px]">
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
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

VaultDisplay.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  entries: PropTypes.arrayOf(PropTypes.object),
  entryId: PropTypes.string,
  setEntries: PropTypes.func.isRequired,
  setSelectedEntry: PropTypes.func.isRequired,
  category: PropTypes.string,
};

export default VaultDisplay;
