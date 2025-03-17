
import { FaPhoneVolume } from "react-icons/fa";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

// import Switcher from "../review/Switcher";

export default function Topbar() {
      
  return (
    <div className=" bg-[#000000] h-[70px] opacity-80 min-w-full z-50 pt-3 sm:pt-4 md:block relative ">
      <div className="container mx-auto px-4 w-full flex items-center justify-between ">
        {/* Contact Info */}
        <div className="flex flex-col space-y-1 sm:flex-row  sm:space-x-6 text-sm  w-fit">
          <div className="flex items-center space-x-2 text-primary-color1 ">
          <MdOutlineMarkEmailUnread />
            <span className="text-xs md:max-w-full  md:text-base">
            info@hivetech.space
            </span>
          </div>

          <div className="flex items-center space-x-2 text-primary-color1 ">
          <FaPhoneVolume className="-rotate-45" />
            <span className="text-xs md:max-w-full  md:text-base md:w-fit ">
            +963937954969 / +963 954 872 922
            </span>
          </div>
         
        </div>
        {/* <Switcher /> */}
      </div>
    </div>
  );
}
