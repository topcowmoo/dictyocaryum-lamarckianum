import { useState } from "react";
import PropTypes from "prop-types";
import {
  PiCopyDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
  PiPencilDuotone,
  PiTrashDuotone,
} from "react-icons/pi";
import Button from "./Button";

const VaultDisplay = ({ service, username, password, Icon, onDelete, onEdit }) => {
  const [showPassword, setShowPassword] = useState(false);

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

  // Check if the VaultDisplay is empty
  const isEmpty = !service && !username && !password;

  return (
    <div className="h-full flex flex-col justify-start items-center dark:text-alltext-dark text-alltext-light xl:text-[30px]">
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
            {Icon && <Icon size={35} />} {/* Render the Icon if it's provided */}
            <div>
              <h2 className="text-[30px] dark:text-title-dark text-title-light">{service}</h2>
              <p className="text-[25px] dark:text-alltext-dark text-alltext-light">{username}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-[30px] dark:text-title-dark text-title-light">Password:</h3>
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

          
          </div>
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
