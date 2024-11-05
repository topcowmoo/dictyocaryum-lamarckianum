import PropTypes from "prop-types";
import {
  PiCopyDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
} from "react-icons/pi";
import Button from "./Button";
import { useState } from "react";

const VaultDisplay = ({ service, username, password, Icon }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      console.log("Password copied to clipboard");
    });
  };

  return (
    <div className="p-4 bg-gray-100 border border-gray-300 rounded-md shadow-md">
      <div className="flex items-center space-x-4">
        {Icon && <Icon size={32} />} {/* Render the Icon if it's provided */}
        <div>
          <h2 className="text-xl font-bold">{service || "No Service"}</h2>
          <p className="text-sm text-gray-600">{username || "No Username"}</p>
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
      </div>
    </div>
  );
};

VaultDisplay.propTypes = {
  service: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
};

export default VaultDisplay;
