import React from "react";
import { UserGuideIcon } from "../../../assets/Svgs/AllSvgs";

export const HelpOverviewCard = ({
  cardTitle,
  cardIcon,
  cardBgColor,
  viewPath, // redirection path or url....
}) => {
  return (
    <div
      style={{
        backgroundColor: cardBgColor,
      }}
      className={`bg-[${cardBgColor}] flex justify-between items-center w-full rounded-xl p-3`}
    >
      <div className="flex-1 shrink-0">
        <h2 className="text-white font-semibold xl:text-[1.6dvw] sm:text-[2.4dvw] md:text-[1.4dvw] leading-[2dvw]">
          {cardTitle}
        </h2>
        <button
          style={{
            color: cardBgColor,
          }}
          className="bg-white px-6 font-semibold font-[var(--paraFont)] mt-5 py-1 rounded-full"
        >
          View
        </button>
      </div>
      <div className="flex-1 shrink-0 flex justify-end">{cardIcon}</div>
    </div>
  );
};
