import { useState } from "react";
import PropTypes from "prop-types";
import {
  PiCopyDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
  PiPencilDuotone,
  PiTrashDuotone,
  PiArrowClockwiseDuotone,
} from "react-icons/pi";
import Button from "./Button";
import Generator from "./Generator"; // Import the Password Generator component

const VaultDisplay = ({ service, username, password, Icon, onDelete, onEdit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false); // State to control the Password Generator

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleGenerator = () => {
    setShowGenerator((prev) => !prev); // Toggle the Password Generator visibility
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        console.log("Password copied to clipboard");
      });
    }
  };

  // Check if the VaultDisplay is empty
  const isEmpty = !service && !username && !password;

  return (
    <div className="h-full flex flex-col justify-center items-center dark:text-alltext-dark text-alltext-light xl:text-[30px]">
      {isEmpty ? (
        // Render the logo when the VaultDisplay is empty
        <div className="flex justify-center items-center h-full">
          <h1 className="mix-blend-overlay">
  VaultGuard Password Locker
</h1>

        </div>
      ) : (
        // Render the content if service, username, or password is present
        <>
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
              onClick={onEdit}
              iconSize={20}
            />

            {/* Delete Button */}
            <Button
              icon={PiTrashDuotone}
              label="Delete"
              onClick={onDelete}
              iconSize={20}
            />

            {/* Password Generator Icon */}
            <button
              type="button"
              onClick={toggleGenerator}
              className="flex items-center dark:text-alltext-light text-alltext-light"
            >
              <PiArrowClockwiseDuotone size={20} />
            </button>
          </div>

          {/* Password Generator Modal */}
          {showGenerator && (
            <Generator onClose={toggleGenerator} /> // Close the generator when done
          )}
        </>
      )}
    </div>
  );
};

VaultDisplay.propTypes = {
  service: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  Icon: PropTypes.elementType,
  onDelete: PropTypes.func.isRequired, // Function to handle deleting the entry
  onEdit: PropTypes.func.isRequired, // Function to handle editing the entry
};

export default VaultDisplay;
