import { CircleX } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

export const Shortcuts = ({
  itemListVarient,
  showShortcuts,
  setShowShortcuts,
}) => {
  return (
    <motion.div
      variants={itemListVarient}
      initial="initial"
      animate={showShortcuts}
      key={showShortcuts}
      className="absolute top-1.5 p-4 right-2 w-full h-full bg-(--primary-color)"
    >
      <div className="flex justify-between items-center border-b border-(--border-color) pb-2 px-3">
        <h3 className="text-[1.5dvw] font-semibold text-(--button-color3)">
          Shortcuts Items
        </h3>
        <div className="flex justify-center items-center gap-5">
          <button className="text-[1dvw] py-2.5 bg-(--button-color1) text-(--primary-color) px-5 rounded-md mainFont cursor-pointer font-semibold">
            Shortcuts
          </button>
          <button
            onClick={() => {
              setShowShortcuts(itemListVarient.exit);
            }}
            className="cursor-pointer"
          >
            <CircleX size={30} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
