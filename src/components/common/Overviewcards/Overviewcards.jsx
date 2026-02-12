import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import React from "react";

export const Overviewcards = ({
  cardTitle,
  cardValue,
  percent,
  icon,
  bgColor,
  periodText = "This week",
  isPositive = true,
}) => {
  return (
    <div
      style={{
        background: bgColor ? bgColor : "",
      }}
      className="border border-[#D4D4D4] rounded-md p-4 shadow bg-[var(--primary-color)] flex justify-center gap-3"
    >
      <div className="flex-1 flex flex-col gap-1 sm:gap-2">
        <p className="font-[var(paraFont)] text-sm sm:text-[15px] md:text-[16px] text-[var(--paraText-color)] font-medium">
          {cardTitle}
        </p>
        <h2
          style={{
            color: bgColor ? "white" : "black",
          }}
          className="text-xl sm:text-2xl md:text-[26px] font-semibold leading-tight"
        >
          {cardValue}
        </h2>
        <div className="flex justify-start gap-1.5 sm:gap-2 w-full items-center">
          <p
            className={`flex items-center gap-1 text-xs sm:text-[13px] md:text-[14px] ${isPositive ? "bg-[var(--Positive-color)]" : "bg-[var(--Negative-color)]"} rounded-full text-white font-[var(--paraFont)] px-2 py-0.5 sm:py-1`}
          >
            {isPositive ? (
              <ArrowUpRight
                size={14}
                className="w-3 h-3 sm:w-[14px] sm:h-[14px]"
              />
            ) : (
              <ArrowDownRight
                size={14}
                className="w-3 h-3 sm:w-[14px] sm:h-[14px]"
              />
            )}{" "}
            {percent}%
          </p>
          <p className="font-[var(paraFont)] text-xs sm:text-[13px] md:text-[14px] text-[var(--paraText-color)] font-medium">
            {periodText}
          </p>
        </div>
      </div>
      <div className="w-[40%] flex justify-center ">{icon}</div>
    </div>
  );
};
