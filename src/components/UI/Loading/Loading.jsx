import React from "react";
import SellsyncLogo from "../../../assets/images/SellsyncLogo.png";

export const Loading = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-full overflow-hidden backdrop-blur-md bg-[#000]/40 flex justify-center items-center z-50">
      <div className="bg-white flex justify-center items-center flex-col gap-3 sm:gap-4 lg:gap-5 p-4 sm:p-5 rounded-md mx-4 sm:mx-0">
        <div className="w-[50vw] sm:w-[40vw] md:w-[30vw] lg:w-[20dvw] h-auto animate-pulse">
          <img
            className="w-full object-contain h-full"
            src={SellsyncLogo}
            alt="sellsync.com"
          />
        </div>
        <div className="animate-pulse duration-500 ease-linear">
          <p className="mainFont font-[600] text-[4vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[1.1dvw]">
            Loading ....
          </p>
        </div>
      </div>
    </div>
  );
};