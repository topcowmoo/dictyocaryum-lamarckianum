import { Link } from "react-router-dom";
import Button from "../components/Button";
import { FaArrowLeftLong } from "react-icons/fa6";

function Error() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-[1980px] h-[1014px] bg-hefo-light rounded-[4px] grid grid-cols-2 gap-8">
          
          {/* Top Left Box */}
          <div className="bg-communityChest-faint h-[459px] rounded-[10px] flex items-center justify-center">
            <img
              src="https://vaultguardbucket2024.s3.amazonaws.com/faint.svg"
              alt="Man fainted"
              className="w-52 h-52 object-contain"
            />
          </div>

          {/* Top Right Box */}
          <div className="text-title-light h-[459px] rounded-[10px] flex items-center justify-center">
            <h1 className="text-2xl md:text-4xl font-libre text-center">
              We got lost and you fainted...
            </h1>
          </div>

          {/* Bottom Left Box */}
          <div className="text-title-light h-[459px] rounded-[10px] flex flex-col items-center justify-center space-y-16">
            <h1 className="text-2xl md:text-4xl font-libre text-center">
              ...Let&apos;s get you back home
            </h1>

            <Link to="/" className="inline-block">
              <Button
                icon={FaArrowLeftLong}
                label="Home"
                className="bg-buttonbgc-light text-buttonti-light hover:bg-communityChest-faint hover:text-title-light font-libre text-[22px]"
              />
            </Link>
          </div>

          {/* Bottom Right Box */}
          <div className="bg-communityChest-faint h-[459px] rounded-[10px] flex items-center justify-center">
            <img
              src="https://vaultguardbucket2024.s3.amazonaws.com/gohome.svg"
              alt="Go home to recover"
              className="w-56 h-56 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full text-center bg-hefo-light pb-4 text-title-light text-[14px] font-libre flex items-center justify-center gap-x-2">
  <h2 className="inline">Salvatore Mammoliti</h2>
  <span>&copy; {currentYear}</span>
</div>

    </div>
  );
}

export default Error;
