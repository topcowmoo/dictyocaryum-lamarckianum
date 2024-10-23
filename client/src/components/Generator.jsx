import { useState } from "react";
import Button from "./Button";
import { PiCopyDuotone, PiArrowClockwiseDuotone } from "react-icons/pi";

// Helper function to generate a secure password
function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, minNumbers, minSpecial) {
  const charset = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()",
  };

  let password = "";
  let allCharacters = "";

  // Add character sets based on user selection
  if (includeLowercase) allCharacters += charset.lowercase;
  if (includeUppercase) allCharacters += charset.uppercase;
  if (includeNumbers) allCharacters += charset.numbers;
  if (includeSymbols) allCharacters += charset.symbols;

  // Ensure minimum numbers and symbols only if their checkboxes are selected
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

  // Fill the rest of the password with random characters from the selected character sets
  while (password.length < length) {
    const randomByte = crypto.getRandomValues(new Uint8Array(1))[0];
    password += allCharacters[randomByte % allCharacters.length];
  }

  // Shuffle the password for randomness
  return password.split('').sort(() => 0.5 - Math.random()).join('');
}

function Generator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(14);
  const [minNumbers, setMinNumbers] = useState(1);
  const [minSpecial, setMinSpecial] = useState(1);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const handleGenerate = () => {
    const newPassword = generatePassword(
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
      includeNumbers ? minNumbers : 0, // Respect the checkbox for numbers
      includeSymbols ? minSpecial : 0  // Respect the checkbox for symbols
    );
    setPassword(newPassword);
  };

  return (
    <div className="password-generator p-4 bg-[#f2f2d0] rounded-lg">
      <h1 className="text-xl text-center mb-4">Password Generator</h1>

      {/* Password Length Slider */}
      <div className="flex justify-between mb-4 items-center">
        <span>Length</span>
        <input
          type="range"
          min="14"
          max="128"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-3/4"
        />
        <span>{length}</span>
      </div>

      {/* Character Set Checkboxes */}
      <div className="mb-4">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
            className="mr-2"
          />
          A-Z (Uppercase)
        </label>

        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
            className="mr-2"
          />
          a-z (Lowercase)
        </label>

        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="mr-2"
          />
          0-9 (Numbers)
        </label>

        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
            className="mr-2"
          />
          !@#$%^&* (Symbols)
        </label>
      </div>

      {/* Minimum Numbers and Special Characters */}
      <div className="flex justify-between mb-4 items-center">
        <span>Minimum numbers</span>
        <input
          type="number"
          value={minNumbers}
          onChange={(e) => setMinNumbers(Number(e.target.value))}
          min="1"
          disabled={!includeNumbers} // Disable if numbers are not included
          className="w-16 p-1 border rounded"
        />
      </div>

      <div className="flex justify-between mb-4 items-center">
        <span>Minimum special characters</span>
        <input
          type="number"
          value={minSpecial}
          onChange={(e) => setMinSpecial(Number(e.target.value))}
          min="1"
          disabled={!includeSymbols} // Disable if symbols are not included
          className="w-16 p-1 border rounded"
        />
      </div>

      {/* Generated Password */}
      <div className="mb-4 p-2 bg-white rounded shadow">
        <h3 className="text-center text-xl">{password || "Password will appear here"}</h3>
      </div>

      {/* Generate and Copy Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleGenerate}
          label="Refresh"
          icon={PiArrowClockwiseDuotone}
        >
          Refresh
        </Button>

        <Button
          onClick={() => navigator.clipboard.writeText(password)}
          label="Copy"
          icon={PiCopyDuotone}
        >
          Copy
        </Button>
      </div>
    </div>
  );
}

export default Generator;
