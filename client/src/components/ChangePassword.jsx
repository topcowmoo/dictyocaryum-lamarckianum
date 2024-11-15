import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PiSealCheckDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
  PiCheckCircleDuotone,
  PiXCircleDuotone,
} from "react-icons/pi";

function ChangePassword() {
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
    <div className="p-4">
      <h2 className="text-lg dark:text-title-dark text-title-light mb-4">Change Password</h2>
      <form onSubmit={handleSubmit}>
        {/* Old Password Input */}
        <div className="mb-4">
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
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500"
            >
              {showOldPassword ? <PiEyeClosedDuotone /> : <PiEyeDuotone />}
            </button>
          </div>
        </div>

        {/* New Password Input */}
        <div className="mb-4">
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
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500"
            >
              {showNewPassword ? <PiEyeClosedDuotone /> : <PiEyeDuotone />}
            </button>
          </div>


          {/* Confirm New Password Input */}
        <div className="mt-4">
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
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500"
            >
              {showConfirmPassword ? <PiEyeClosedDuotone /> : <PiEyeDuotone />}
            </button>
          </div>
        </div>
          {/* Password Requirements */}
          <div className="mt-4 space-y-1">
            {Object.entries(requirements).map(([key, met]) => (
              <div key={key} className="flex items-center">
                {met ? (
                  <PiCheckCircleDuotone className="dark:text-highlight-dark text-highlight-light" />
                ) : (
                  <PiXCircleDuotone className="text-red-500" />
                )}
                <span className="ml-2 text-sm dark:text-title-dark text-title-light">{getRequirementText(key)}</span>
              </div>
            ))}
          </div>
        </div>

        

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center p-3 rounded-[4px] dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light">
          <PiSealCheckDuotone className="mr-2" />
          Save Changes
        </button>
      </form>
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

export default ChangePassword;
