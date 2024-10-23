import {
  PiFilmSlateDuotone,
  PiTrashDuotone,
  PiWifiHighDuotone,
  PiCardholderDuotone,
  PiFolderOpenDuotone,
  PiIdentificationBadgeDuotone,
  PiKeyDuotone,
  PiUserCircleDuotone
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function SideBar() {
  const items = [
    { id: 6, title: "Entertainment", icon: <PiFilmSlateDuotone size={30} /> },
    { id: 7, title: "Deleted", icon: <PiTrashDuotone size={30} /> },
    { id: 5, title: "Wi-Fi", icon: <PiWifiHighDuotone size={30} /> },
    { id: 3, title: "Cards", icon: <PiCardholderDuotone size={30} /> },
    { id: 1, title: "All", icon: <PiFolderOpenDuotone size={30} /> },
    { id: 2, title: "Identification", icon: <PiIdentificationBadgeDuotone size={30} /> },
    { id: 4, title: "Login", icon: <PiKeyDuotone size={30} /> },
  ];

  const navigate = useNavigate();

  // Sort items by id
  const sortedItems = items.sort((a, b) => a.id - b.id);

  return (
    <>
    <div className="grid grid-cols-1 gap-6 p-6 rounded-[4px]">
      {sortedItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <div className="text-orange-300">{item.icon}</div>
          <h2 className="text-lg font-semibold text-green-600">{item.title}</h2>
        </div>

        
      ))}
    </div>
    <Button
    icon={PiUserCircleDuotone}
    label="Account"
    onClick={() => navigate('/profile')}
  />
  </>
  );
}

export default SideBar;
