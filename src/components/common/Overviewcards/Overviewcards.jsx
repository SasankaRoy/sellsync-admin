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
      <div className="flex-1 flex flex-col gap-2">
        <p className="font-[var(paraFont)] text-[1dvw] text-[var(--paraText-color)] font-medium">
          {cardTitle}
        </p>
        <h2 style={{
          color:bgColor?'white':'black'
        }} className="text-[1.6dvw] font-semibold leading-[normal]">
          {cardValue}
        </h2>
        <div className="flex justify-center items-center gap-2 w-full">
          <p className="flex justify-center items-center gap-0 text-[.8dvw] bg-[var(--Positive-color)] rounded-full text-white font-[var(--paraFont)] px-2">
            <ArrowUpRight size={15} /> {percent}%
          </p>
          <p className="font-[var(paraFont)] text-[.8dvw] text-[var(--paraText-color)] font-medium">
            This week
          </p>
        </div>
      </div>
      <div className="w-[40%] flex justify-center items-center">{icon}</div>
    </div>
  );
};
