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

const VaultDisplay = ({ service, username, password, Icon }) => {
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

        <Button
        icon={PiPencilDuotone}
        label="Edit"
        iconSize={20}
        />

<Button
icon={PiTrashDuotone}
label="Delete"
iconSize={20}
/>

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
