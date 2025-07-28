import { ArrowUpRight } from "lucide-react";
import React from "react";

export const Overviewcards = ({ cardTitle, cardValue, percent, icon,bgColor }) => {
  return (
    <div
      style={{
        background: bgColor ? bgColor : "",
      }}
      className="border border-[#D4D4D4] rounded-md p-4 shadow bg-[var(--primary-color)] flex justify-center items-center gap-3"
    >
      <div className="flex-1 flex flex-col gap-1 sm:gap-2">
        <p className="font-[var(paraFont)] text-sm sm:text-base md:text-[1dvw] text-[var(--paraText-color)] font-medium">
          {cardTitle}
        </p>
        <h2 style={{
          color: bgColor ? 'white' : 'black'
        }} className="text-xl sm:text-2xl md:text-[1.6dvw] font-semibold leading-[normal]">
          {cardValue}
        </h2>
        <div className="flex justify-center items-center gap-1 sm:gap-2 w-full">
          <p className="flex justify-center items-center gap-0 text-xs sm:text-sm md:text-[.8dvw] bg-[var(--Positive-color)] rounded-full text-white font-[var(--paraFont)] px-2 py-0.5 sm:py-1">
            <ArrowUpRight size={12} className="w-3 h-3 sm:w-4 sm:h-4" /> {percent}%
          </p>
          <p className="font-[var(paraFont)] text-xs sm:text-sm md:text-[.8dvw] text-[var(--paraText-color)] font-medium">
            This week
          </p>
        </div>
      </div>
      <div className="w-[40%] flex justify-center items-center">{icon}</div>
    </div>
  );
};
