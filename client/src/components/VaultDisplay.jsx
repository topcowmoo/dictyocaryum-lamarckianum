import { useState } from "react";
import PropTypes from "prop-types";
import {
  PiCopyDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
} from "react-icons/pi";
import Button from "./Button";

const VaultDisplay = ({ password }) => {
  // Function to copy the password to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        console.log("Password copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy password: ", err);
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full p-4 text-center relative">
        <div className="flex-1 bg-vault-light border-2 border-vault-dark p-6 rounded-md shadow-md">
          <h2 className="text-lg font-bold">Section 1</h2>
          <p className="text-sm mt-2">
            Content for the first section goes here.
          </p>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="flex-1 bg-vault-light border-2 border-vault-dark p-6 rounded-md shadow-md">
            <p className="text-sm mt-2">Service Name</p>

            <p className="text-sm mt-2">Username</p>

            <p className="text-sm mt-2">Password</p>

            <Button
              icon={PiCopyDuotone}
              label="Copy"
              onClick={copyToClipboard}
              className="dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light dark:hover:bg-highlight-dark hover:bg-highlight-light"
            />

            <Button
              icon={showPassword ? PiEyeDuotone : PiEyeClosedDuotone}
              label={showPassword ? "Visibility On" : "Visibility Off"}
              onClick={togglePasswordVisibility}
              className="dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light dark:hover:bg-highlight-dark hover:bg-highlight-light"
            />
          </div>
        </div>
      </div>
    </>
  );
};

VaultDisplay.propTypes = {
  password: PropTypes.string.isRequired,
};

export default VaultDisplay;
