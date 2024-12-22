import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PiSealCheckDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
  PiCheckCircleDuotone,
  PiXCircleDuotone,
} from "react-icons/pi";
import PropTypes from "prop-types";
import Button from "./Button";

function ChangePassword({ onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [requirements, setRequirements] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    setRequirements({
      minLength: value.length >= 14,
      hasUppercase: /[A-Z]/.test(value),
      hasLowercase: /[a-z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecialChar: /[@$!%*?&]/.test(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { minLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar } = requirements;
    if (!minLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      setError("Password does not meet the requirements.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
        credentials: "include",
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(message || "Error changing password. Please try again.");
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const toggleOldPasswordVisibility = () => setShowOldPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  return (
    <div className="w-[650px] h-[650px] bg-sidebar-light dark:bg-hefo-dark flex flex-col rounded-[4px]">
      {/* Header Section */}
      <div className="dark:bg-sidebar-dark bg-vault-light p-6 flex items-center justify-start rounded-t-[4px]">
        <h2 className="text-[34px] dark:text-title-dark text-title-light">Change Password</h2>
      </div>

      {/* Main Form Section */}
      <div className="flex-1 p-6 overflow-y-auto">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Old Password Input */}
          <div>
            <label className="block mb-1 dark:text-title-dark text-title-light">Old Password</label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-[4px]"
              />
              <button
                type="button"
                onClick={toggleOldPasswordVisibility}
                className="absolute text-[20px] right-2 top-1/2 transform -translate-y-1/2 dark:text-alltext-dark text-alltext-light dark:hover:text-highlight-dark hover:text-highlight-light"
              >
                {showOldPassword ? <PiEyeClosedDuotone /> : <PiEyeDuotone />}
              </button>
            </div>
          </div>

          {/* New Password Input */}
          <div>
            <label className="block mb-1 dark:text-title-dark text-title-light">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="w-full border border-gray-300 p-2 rounded-[4px]"
              />
              <button
                type="button"
                onClick={toggleNewPasswordVisibility}
                className="absolute right-2 text-[20px] top-1/2 transform -translate-y-1/2 dark:text-alltext-dark text-alltext-light dark:hover:text-highlight-dark hover:text-highlight-light"
              >
                {showNewPassword ? <PiEyeClosedDuotone /> : <PiEyeDuotone />}
              </button>
            </div>
          </div>

          {/* Confirm New Password Input */}
          <div>
            <label className="block mb-1 dark:text-title-dark text-title-light">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-[4px]"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 text-[20px] top-1/2 transform -translate-y-1/2 dark:text-alltext-dark text-alltext-light dark:hover:text-highlight-dark hover:text-highlight-light"
              >
                {showConfirmPassword ? <PiEyeClosedDuotone /> : <PiEyeDuotone />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="space-y-1">
            {Object.entries(requirements).map(([key, met]) => (
              <div key={key} className="flex items-center">
                {met ? (
                  <PiCheckCircleDuotone className="dark:text-highlight-dark text-highlight-light" />
                ) : (
                  <PiXCircleDuotone className="text-red-500" />
                )}
                <span className="ml-2 text-sm dark:text-title-dark text-title-light">
                  {getRequirementText(key)}
                </span>
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && <p className="dark:text-alltext-dark text-red-600 text-sm underline text-transform: uppercase">{error}</p>}

          {/* Action Buttons */}
          <div className="flex justify-around mt-6">
            <Button
              type="submit"
              label="Save"
              icon={PiSealCheckDuotone}
              size="md"
              className="dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light mt-11"
            />
            <Button
              onClick={onClose}
              label="Close"
              icon={PiXCircleDuotone}
              size="md"
              className="dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light mt-11"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

// Helper function to get text for each requirement
const getRequirementText = (key) => {
  switch (key) {
    case "minLength":
      return "At least 14 characters";
    case "hasUppercase":
      return "One uppercase letter";
    case "hasLowercase":
      return "One lowercase letter";
    case "hasNumber":
      return "One number";
    case "hasSpecialChar":
      return "One special character (@, $, !, %, *, ?, &)";
    default:
      return "";
  }
};

ChangePassword.propTypes = {
  onClose: PropTypes.string,
};

export default ChangePassword;
