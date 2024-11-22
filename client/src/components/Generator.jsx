import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { PiCopyDuotone, PiArrowsClockwiseDuotone, PiSealCheckDuotone, PiXCircleDuotone } from "react-icons/pi";

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

  // Generate password when the component is mounted
  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  return (
    <div className="password-generator w-[80vw] max-w-[600px] h-auto max-h-[80vh] p-8 rounded-lg bg-hefo-light dark:bg-sidebar-dark">
      <h1 className="text-2xl font-bold text-center mb-6 dark:text-alltext-dark text-alltext-light">Password Generator</h1>

      {/* Password Length Slider */}
      <div className="flex justify-between mb-4 items-center dark:text-alltext-dark text-alltext-light">
        <span>Length:</span>
        <input
          type="range"
          min="14"
          max="35"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-3/4"
        />
        <span>{length}</span>
      </div>

      {/* Character Set Checkboxes */}
      <div className="mb-4">
        <label className="flex items-center mb-2 dark:text-alltext-dark text-alltext-light">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
            className="mr-2 "
          />
          A-Z (Uppercase)
        </label>

        <label className="flex items-center mb-2 dark:text-alltext-dark text-alltext-light">
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
            className="mr-2"
          />
          a-z (Lowercase)
        </label>

        <label className="flex items-center mb-2 dark:text-alltext-dark text-alltext-light">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="mr-2"
          />
          0-9 (Numbers)
        </label>

        <label className="flex items-center mb-2 dark:text-alltext-dark text-alltext-light">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
            className="mr-2"
          />
          !@#$%^&* (Symbols)
        </label>
      </div>

      {/* Generated Password */}
      <div className="mb-4 p-6 bg-title-dark rounded-[4px] shadow-xl flex items-center justify-between w-full max-w-[600px]">
  {/* Generated Password */}
  <h3 className="text-xl text-center truncate w-[80%]">{password}</h3>

  {/* Icons */}
  <div className="flex items-center gap-1">
    <PiArrowsClockwiseDuotone
      onClick={handleGenerate}
      className="cursor-pointer text-red-400 hover:text-highlight-light"
      size={20}
    />
    <PiCopyDuotone
      onClick={() => navigator.clipboard.writeText(password)}
      className="cursor-pointer text-yellow-700 hover:text-highlight-light"
      size={20}
    />
  </div>
</div>


      {/* Use Password Button */}
      <div className="flex justify-around mt-4">
        <Button
          onClick={handleUsePassword}
          label="Use Password"
          icon={PiSealCheckDuotone}
          size="lg"
        />

<Button
              icon={PiXCircleDuotone}
              onClick={onClose}
              label="Close"
              size="lg"
            />
      </div>
    </div>
  );
}

Generator.propTypes = {
  onSelectedPassword: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

export default Generator;