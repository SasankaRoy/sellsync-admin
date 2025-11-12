import React from "react";
import { motion } from "framer-motion";
import { CircleX, LogIn, LogOut, UtensilsCrossed } from "lucide-react";

export const ClockInOut = ({
  clockInVarient,
  time,
  setCurrentStateOutter,
  setCurrentStateInner,
  currentStateOutter,
  currentStateInner,
}) => {
  return (
    <>
      <motion.div
        variants={clockInVarient.OutterWrapper}
        initial="initial"
        animate={currentStateOutter}
        onClick={(e) => {
          e.stopPropagation();
          setCurrentStateOutter(clockInVarient.OutterWrapper.exit);
          setCurrentStateInner(clockInVarient.exit);
        }}
        key={currentStateOutter}
        className="absolute h-screen bg-transparent flex justify-center items-center backdrop-blur-[1px] w-full top-0 z-50"
      >
        <motion.div
          variants={clockInVarient}
          initial="initial"
          animate={currentStateInner}
          className="w-[30%] bg-(--primary-color) py-4 px-6 rounded-md"
        >
          <div className="flex justify-between items-center border-b border-(--border-color) py-2.5 px-3">
            <h3 className="text-[1.5dvw] text-(--button-color2) font-semibold">
              Clock In
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentStateOutter(clockInVarient.OutterWrapper.exit);
                setCurrentStateInner(clockInVarient.exit);
              }}
              className="cursor-pointer"
            >
              <CircleX size={30} />
            </button>
          </div>
          <div className="my-5 flex flex-col gap-4">
            <div className="flex justify-start items-center gap-4">
              <p className="text-[1.2dvw] paraFont capitalize font-normal text-(--button-color4)">
                Start Working{" "}
              </p>
              <p className="text-[1.2dvw] paraFont capitalize font-normal text-(--button-color4)">
                |
              </p>
              <h3 className="text-[1.5dvw] font-semibold">
                {time.hours}:{time.minutes}:{time.seconds}
              </h3>
            </div>
            <div className="flex justify-start items-center gap-4 border border-(--border-color) rounded-md px-2 py-2">
              <p className="text-[1dvw] paraFont font-normal text-(--button-color4)">
                Break timer
              </p>
              <p className="text-[1dvw] paraFont font-normal text-(--button-color4)">
                |
              </p>
              <h5 className="font-semibold text-[1.2dvw]">
                {time.hours}:{time.minutes}:{time.seconds}
              </h5>
            </div>
            <div className="flex justify-center items-center gap-5">
              {/* <button className="w-full py-2 rounded-md text-[1.2dvw] cursor-pointer bg-(--button-color1) text-(--primary-color) font-semibold mainFont flex justify-center items-center gap-5">
                <span
                  className="p-1.5 bg-(--primary-color) flex justify-center items-center rounded-full text-(--mainText-color)"
                  size={15}
                >
                  <LogIn />
                </span>
                Clock In
              </button> */}
              <button className="w-full py-2 rounded-md text-[1.2dvw] cursor-pointer bg-(--button-color3) text-(--primary-color) font-semibold mainFont flex justify-center items-center gap-5">
                <span
                  className="p-1.5 bg-(--primary-color) flex justify-center items-center rounded-full text-(--mainText-color)"
                  size={15}
                >
                  <UtensilsCrossed />
                </span>
                Break
              </button>
              <button className="w-full py-2 rounded-md text-[1.2dvw] cursor-pointer bg-(--Negative-color) text-(--primary-color) font-semibold mainFont flex justify-center items-center gap-5">
                <span
                  className="p-1.5 bg-(--primary-color) flex justify-center items-center rounded-full text-(--mainText-color)"
                  size={15}
                >
                  <LogOut />
                </span>
                Clock Out
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
