import {
  PiFilmSlateDuotone,
  PiTrashDuotone,
  PiWifiHighDuotone,
  PiCardholderDuotone,
  PiFolderOpenDuotone,
  PiIdentificationBadgeDuotone,
  PiKeyDuotone,
} from "react-icons/pi";

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

  // Sort items by id
  const sortedItems = items.sort((a, b) => a.id - b.id);

  return (
    <div className="grid grid-cols-1 gap-6 p-6 rounded-[4px]">
      {sortedItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center justify-center gap-4 p-4 bg-  rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <div className="dark:text-alltext-dark text-alltext-light">{item.icon}</div>
          <h2 className="text-lg dark:text-title-dark text-title-light">{item.title}</h2>
        </div>

        
      ))}
    </div>
  );
}

export default SideBar;
