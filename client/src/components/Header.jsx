import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { PiUserCircleDuotone } from "react-icons/pi";

function Header() {
  const navigate = useNavigate();
  return (

    <div className="flex justify-between items-center w-full max-full dark:bg-secondarybgc-dark bg-secondarybgc-light border-b-2 p-6">
 
     {/* Logo as a button that navigates to home */}
     <button
        onClick={() => navigate('/')} // Navigate to Home page
        className="flex-shrink-0 hidden md:block cursor-pointer focus:outline-none"
        aria-label="Navigate to Home" // For accessibility
      >
        <img
          src="https://vaultguardbucket2024.s3.amazonaws.com/lightlogo.webp"
          alt="Personal logo"
          className="w-[40px] h-[42px] object-contain"
        />
      </button>
    <Button
          icon={PiUserCircleDuotone}
          label="Account"
          onClick={() => navigate('/profile')}
        />
    </div>
  );
}

export default Header;
