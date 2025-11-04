import { CircleX } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import ProductImg1 from "../../../assets/images/ProductImg1.png";

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
      className="absolute flex flex-col gap-5 top-1.5 p-4 right-2 w-full h-full bg-(--primary-color)"
    >
      <div className="flex justify-between shrink-0 w-full items-center border-b border-(--border-color) pb-2 px-3">
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
      <div className=" p-2 grid bg-red-00 scrollCustom grid-cols-4 gap-4 w-full max-h-full overflow-y-auto">
        {[1, 2, 3, 4, 5,3,9,6,5,].map((cur, id) => (
          <div className="bg-(--primary-color) cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 border border-(--border-color)/20 flex flex-col gap-3 shadow-sm rounded-md p-2">
            <div className="h-[20vh] rounded-md w-full bg-(--secondary-color) py-4">
              <img
                className="w-full h-full object-contain"
                src={ProductImg1}
                alt="product-image"
              />
            </div>
            <div className="flex flex-col gap-1 px-2 py-1">
              <div className="flex flex-col gap-.5">
                <h3 className="text-[1.2dvw] font-medium mainFont">Product Name ...</h3>
                <p className="paraFont text-[1dvw] text-(--button-color4)">Product small info</p>
              </div>
              <h3 className="font-semibold text-[1.3dvw]">$ 20.00</h3>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
