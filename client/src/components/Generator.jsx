import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import {
  PiCopyDuotone,
  PiArrowsClockwiseDuotone,
  PiSealCheckDuotone,
  PiXCircleDuotone,
} from "react-icons/pi";

// Helper function to generate a secure password
function generatePassword(
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
  minNumbers = 0,
  minSpecial = 0
) {
  const charset = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*",
  };

  let password = "";
  let allCharacters = "";

  if (includeLowercase) allCharacters += charset.lowercase;
  if (includeUppercase) allCharacters += charset.uppercase;
  if (includeNumbers) allCharacters += charset.numbers;
  if (includeSymbols) allCharacters += charset.symbols;

  if (includeNumbers) {
    for (let i = 0; i < minNumbers; i++) {
      password += charset.numbers[Math.floor(Math.random() * charset.numbers.length)];
    }
  }

  if (includeSymbols) {
    for (let i = 0; i < minSpecial; i++) {
      password += charset.symbols[Math.floor(Math.random() * charset.symbols.length)];
    }
  }

  while (password.length < length) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }

  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
}

function Generator({ onSelectedPassword, onClose }) {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(14);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const handleGenerate = useCallback(() => {
    const newPassword = generatePassword(
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
      includeNumbers,
      includeSymbols
    );
    setPassword(newPassword);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const handleUsePassword = () => {
    onSelectedPassword(password);
    onClose();
  };

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  return (
    <div className="w-[600px] h-[500px] bg-sidebar-light dark:bg-sidebar-dark rounded-[8px] shadow-lg">
      {/* Header Section */}
      <div className="dark:bg-vault-dark bg-vault-light py-6 px-4 flex items-center justify-center rounded-t-[4px]">
        <h2 className="text-[34px] dark:text-title-dark text-title-light">
          Password Generator
        </h2>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="dark:text-title-dark text-title-light">Length:</span>
          <input
            type="range"
            min="14"
            max="35"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-2/3"
          />
          <span className="dark:text-title-dark text-title-light">{length}</span>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <label className="flex items-center dark:text-alltext-dark text-alltext-light">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
              className="mr-2"
            />
            A-Z (Uppercase)
          </label>
          <label className="flex items-center dark:text-alltext-dark text-alltext-light">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
              className="mr-2"
            />
            a-z (Lowercase)
          </label>
          <label className="flex items-center dark:text-alltext-dark text-alltext-light">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="mr-2"
            />
            0-9 (Numbers)
          </label>
          <label className="flex items-start dark:text-alltext-dark text-alltext-light">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
              className="mr-2"
            />
            !@#$%^&* (Symbols)
          </label>
        </div>

        <div className="mb-4 p-4 bg-alltext-dark rounded-[4px] shadow-md flex items-center justify-between">
          <h3 className="text-lg text-center truncate w-[75%]">{password}</h3>
          <div className="flex items-center gap-4">
            <PiArrowsClockwiseDuotone
              onClick={handleGenerate}
              className="cursor-pointer dark:text-black dark:hover:text-highlight-dark hover:text-highlight-light"
              size={25}
            />
            <PiCopyDuotone
              onClick={() => navigator.clipboard.writeText(password)}
              className="cursor-pointer dark:text-black dark:hover:text-highlight-dark hover:text-highlight-light"
              size={25}
            />
          </div>
        </div>

        <div className="flex justify-around mt-6">
          <Button
            onClick={handleUsePassword}
            label="Done"
            icon={PiSealCheckDuotone}
            size="md"
          />
          <Button
            onClick={onClose}
            label="Close"
            icon={PiXCircleDuotone}
            size="md"
          />
        </div>
      </div>
    </div>
  );
}

Generator.propTypes = {
  onSelectedPassword: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

export default Generator;
