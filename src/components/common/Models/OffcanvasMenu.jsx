import React from "react";
import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  CircleX,
  ClipboardMinus,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export const OffcanvasMenu = ({
  varient,
  setShowOffcanvasMenu,
  showOffcanvasMenu,
}) => {
  return (
    <>
      <motion.div
        initial="initial"
        variants={varient}
        key={showOffcanvasMenu}
        animate={showOffcanvasMenu}
        className="absolute z-50 min-w-[35%] p-5 right-0 top-0 h-screen bg-(--primary-color) border-l border-(--border-color)/30 shadow"
      >
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            type: "tween",
            ease: "anticipate",
            delay: 0.3,
          }}
          className=" flex justify-between items-center px-2 border-b border-(--border-color) p-4"
        >
          <h3 className="text-[1.7dvw] font-semibold">Offcanvas Menu</h3>
          <button
            onClick={() => {
              setShowOffcanvasMenu(varient.exit);
            }}
            className="cursor-pointer"
          >
            <CircleX size={30} />
          </button>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            type: "tween",
            ease: "anticipate",
            delay: 0.3,
          }}
          className="flex flex-col gap-5 my-5"
        >
          <NavLink
            onClick={() => setShowOffcanvasMenu(varient.exit)}
            to="/seller/sales-report"
            className="flex justify-start px-5 py-2.5 mainFont font-semibold tracking-wider text-[1.8dvw] items-center gap-6 border-b hover:bg-(--button-color2) hover:text-(--primary-color) hover:rounded-md transition-all duration-300 ease-linear cursor-pointer border-(--border-color) text-(--button-color2)"
          >
            <span>
              <BadgeDollarSign size={40} />
            </span>
            Sales
          </NavLink>
          <NavLink
            onClick={() => setShowOffcanvasMenu(varient.exit)}
            to="/seller/reports"
            className="flex justify-start px-5 py-2.5 mainFont font-semibold tracking-wider text-[1.8dvw] items-center gap-6 border-b hover:bg-(--button-color2) hover:text-(--primary-color) hover:rounded-md transition-all duration-300 ease-linear cursor-pointer border-(--border-color) text-(--button-color2)"
          >
            <span>
              <ClipboardMinus size={40} />
            </span>
            Reports
          </NavLink>
          <button className="flex justify-start px-5 py-2.5 mainFont font-semibold tracking-wider text-[1.8dvw] items-center gap-6 border-b hover:bg-(--button-color2) hover:text-(--primary-color) hover:rounded-md transition-all duration-300 ease-linear cursor-pointer border-(--border-color) text-(--button-color2)">
            <span>
              <Settings size={40} />
            </span>
            Settings
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};
