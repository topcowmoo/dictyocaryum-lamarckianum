import { useState } from "react";
import {
  PiEyeDuotone,
  PiEyeClosedDuotone,
  PiArrowClockwiseDuotone,
} from "react-icons/pi";
import Button from "./Button.jsx";
import Modal from "./Modal.jsx";
import Generator from "./Generator.jsx";
import Dropdown from "./Dropdown.jsx";
import serviceIcons from "../utils/serviceIcons.js";

function AddPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleGeneratorModal = () => {
    setShowGenerator((prev) => !prev);
  };

  const handleSelectPassword = (generatedPassword) => {
    setPassword(generatedPassword); // Set the generated password as the new password
  };

  // Category items for the dropdown
  const categoryItems = [
    { id: 1, title: "All" },
    { id: 2, title: "Cards" },
    { id: 3, title: "Entertainment" },
    { id: 4, title: "Login" },
    { id: 5, title: "Wi-Fi" },
    { id: 6, title: "Identification" },
    { id: 7, title: "Deleted" },
  ];

  const serviceItems = Object.entries(serviceIcons).map(([key, Icon], index) => ({
    id: index + 1,
    title: key.charAt(0).toUpperCase() + key.slice(1),
    icon: <Icon size={20} />,
  }));

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Add New Entry</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-1">Service Name</label>
          <Dropdown items={serviceItems} />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Category</label>
          <Dropdown items={categoryItems} />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input type="text" className="w-full border border-gray-300 p-2 rounded" />
        </div>

        <div className="mb-4 relative">
          <label className="block mb-1">Password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-8 flex items-center"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <PiEyeClosedDuotone className="text-[20px]" /> : <PiEyeDuotone className="text-[20px]" />}
          </button>
          <button
            type="button"
            onClick={toggleGeneratorModal}
            className="absolute inset-y-0 right-0 flex items-center"
            aria-label="Open Password Generator"
          >
            <PiArrowClockwiseDuotone className="text-[20px]" />
          </button>
        </div>

        {showGenerator && (
          <Modal onClose={toggleGeneratorModal}>
            <Generator onSelectPassword={handleSelectPassword} onClose={toggleGeneratorModal} />
          </Modal>
        )}

        <div className="mb-4">
          <label className="block mb-1">Website Address</label>
          <input type="text" className="w-full border border-gray-300 p-2 rounded" />
        </div>

        <div className="flex flex-col gap-4">
          <Button type="submit" label="Save" className="px-4 py-2 rounded text-white bg-blue-500" />
        </div>
      </form>
    </div>
  );
}

export default AddPassword;
