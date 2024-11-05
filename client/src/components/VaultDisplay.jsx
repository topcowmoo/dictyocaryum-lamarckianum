import { useState } from "react";
import PropTypes from "prop-types";
import {
  PiCopyDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
} from "react-icons/pi";
import Button from "./Button";

const VaultDisplay = ({ service, username, password, Icon }) => {
  const [showPassword, setShowPassword] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text:", err);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-md shadow-md p-4 space-y-4 max-w-md mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-gray-200 p-4 rounded-md">
        <div className="flex items-center space-x-4">
        {Icon && <Icon size={32} />} {/* Render the dynamically passed icon */}
            <h2 className="text-xl font-semibold">{service}</h2>
            
            
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-gray-200 p-4 rounded-md space-y-4">
       
      

        {/* Row 1: Username */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-2">
          <p className="font-semibold">Username</p>
          <div className="flex items-center space-x-2">
            <p className="text-gray-700">{username}</p>
          </div>
        </div>

        {/* Row 2: Password with Visibility and Copy Buttons */}
        <div className="flex justify-between items-center">
          <p className="font-semibold">Password</p>
          <div className="flex items-center space-x-2">
            <p className="text-gray-700">{showPassword ? password : "••••••••••••••"}</p>
            <Button
              icon={showPassword ? PiEyeClosedDuotone : PiEyeDuotone}
              label={showPassword}
              onClick={togglePasswordVisibility}
              className="bg-teal-300 text-black p-2 rounded-md"
            />
            <Button
              icon={PiCopyDuotone}
              label={copyToClipboard}
              onClick={() => copyToClipboard(password)}
              className="bg-teal-300 text-black p-2 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

VaultDisplay.propTypes = {
  service: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  Icon: PropTypes.elementType
};

export default VaultDisplay;
