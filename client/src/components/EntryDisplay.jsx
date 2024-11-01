import {
  PiCopyDuotone,
  PiPencilDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
} from "react-icons/pi";

function EntryDisplay() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <p>Coming soon…</p>
      <div className="flex gap-4 mt-4">
        <PiCopyDuotone size={30} />
        <PiPencilDuotone size={30} />
        <PiEyeDuotone size={30} />
        <PiEyeClosedDuotone size={30} />
      </div>
    </div>
  );
}

export default EntryDisplay;
