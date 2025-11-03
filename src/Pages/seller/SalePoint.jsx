import React, { useEffect, useState } from "react";
import SellsyncLogo from "../../assets/images/SellsyncLogo.png";
import {
  Airplay,
  CalendarClock,
  ClipboardList,
  Minus,
  Plus,
  Search,
  ShieldUser,
  Tags,
} from "lucide-react";
import { Tooltip } from "@mui/material";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { AnimatePresence, motion } from "framer-motion";
import ProductImg1 from "../../assets/images/ProductImg1.png";

export const SalePoint = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [layoutName, setLayoutName] = useState("default");
  const [input, setInput] = useState("");
  const onChange = (input) => {
    console.log("Input changed", input);
    setInput(input);
  };
  const handleLayoutName = () => {
    if (layoutName === "default") {
      setLayoutName("shift");
      return "shift";
    } else {
      setLayoutName("default");
      return "default";
    }
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);
  };

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      // touchscreen
      console.log("touchscreen");
      setIsKeyboardOpen(false);
    }
  }, [isKeyboardOpen]);

  return (
    <>
      <header className="flex justify-center items-center py-3 bg-[#f8f8f8]/70 shadow-sm">
        <div className="w-[95%] flex justify-between items-center">
          <div>
            <div className=" flex justify-center items-center w-[14dvw] h-auto">
              <img
                alt="sellsync.com"
                src={SellsyncLogo}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-6">
            <button className="flex justify-center items-center gap-3 border border-(--border-color) rounded-full px-4 py-2 cursor-pointer">
              <span className="bg-(--button-color5) text-(--primary-color) rounded-full p-2 flex justify-center items-center">
                <ClipboardList size={20} />
              </span>
              <p className="text-[.9dvw] font-semibold mainFont">My Tasks</p>
            </button>
            <button className="flex justify-center items-center gap-3 border border-(--border-color) rounded-full px-4 py-2 cursor-pointer">
              <span className="bg-(--button-color1) text-(--primary-color) rounded-full p-2 flex justify-center items-center">
                <CalendarClock size={20} />
              </span>
              <p className="text-[.9dvw] font-semibold mainFont">16:30</p>
            </button>
            <button className="flex justify-center items-center gap-3 border border-(--border-color) rounded-full px-4 py-2 cursor-pointer">
              <span className="bg-(--button-color4) text-(--primary-color) rounded-full p-2 flex justify-center items-center">
                <Airplay size={20} />
              </span>
              <p className="text-[.9dvw] font-semibold mainFont">
                Customer Screen
              </p>
            </button>
            <button className="flex justify-center items-center gap-3 border border-(--border-color) rounded-full px-4 py-2 cursor-pointer">
              <span className="bg-(--button-color1) text-(--primary-color) rounded-full p-2 flex justify-center items-center">
                <Tags size={20} />
              </span>
              <p className="text-[.9dvw] font-semibold mainFont">Get labels</p>
            </button>
            <button className="flex justify-center items-center gap-3 border border-(--border-color) rounded-full px-4 py-2 cursor-pointer">
              <span className="bg-(--Negative-color) text-(--primary-color) rounded-full p-2 flex justify-center items-center">
                <ShieldUser size={20} />
              </span>
              <p className="text-[.9dvw] font-semibold mainFont">Logout</p>
            </button>
          </div>
        </div>
      </header>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsKeyboardOpen(false);
        }}
        className="flex justify-center items-center gap-4 h-[88vh]"
      >
        <div className="flex-1  h-full">
          <div className=" flex flex-col h-full gap-5 justify-center items-center w-full  p-4">
            <div className="w-[70%] flex-shrink-0 flex justify-center items-center gap-4 bg-(--secondary-color) p-2 rounded-full">
              <button className="p-2 flex justify-center items-center cursor-pointer">
                <Search size={20} />
              </button>
              <input
                type="text"
                onFocus={(e) => {
                  setIsKeyboardOpen(true);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                // onBlur={() => setIsKeyboardOpen(false)}
                value={input}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search items, categories, etc..."
                className="w-full outline-none text-[1dvw] mainFont"
              />
            </div>
            <div className="w-full h-full overflow-y-hidden flex flex-col">
              {/* list header start */}
              <div className="flex justify-center items-center  bg-(--secondary-color) ">
                <div className="border-r border-(--border-color) py-3  min-w-[5dvw] flex justify-center items-center">
                  <p className="text-[1dvw] font-semibold mainFont">Qty.</p>
                </div>
                <div className="border-r border-(--border-color) py-3 w-full flex justify-center items-center">
                  <p className="text-[1dvw] font-semibold mainFont">
                    Item Name
                  </p>
                </div>
                <div className="border-r border-(--border-color) py-3  min-w-[8dvw] shrink-0 flex justify-center items-center">
                  <p className="text-[1dvw] font-semibold mainFont">Price</p>
                </div>
                <div className="border-r border-(--border-color) py-3  min-w-[8dvw] shrink-0 flex justify-center items-center">
                  <p className="text-[1dvw] font-semibold mainFont">Tax Type</p>
                </div>
                <div className="border-r border-(--border-color) py-3  min-w-[8dvw] shrink-0 flex justify-center items-center">
                  <p className="text-[1dvw] font-semibold mainFont">Total</p>
                </div>
                <div className="py-3  min-w-[8dvw] flex justify-center items-center shrink-0">
                  <p className="text-[1dvw] font-semibold mainFont">Actions</p>
                </div>
              </div>
              {/* list header end */}

              {/* item list start */}
              <div className="flex flex-col gap-2  h-[100%] overflow-y-auto justify-start items-center  mt-1.5">
                {[1, 2, 3, 4, 5, 52, 5, 5].map((cur, id) => (
                  <div
                    key={id}
                    className={`flex justify-center items-center w-full ${
                      id % 2 === 0
                        ? "bg-(--secondary-color)/70"
                        : "bg-transparent"
                    }`}
                  >
                    <div className="border-r border-(--border-color) py-3 px-1  min-w-[5dvw] flex justify-center items-center">
                      <p className="text-[1dvw] font-semibold mainFont">
                        {cur}
                      </p>
                    </div>
                    <div className="border-r  border-(--border-color) py-3 w-full flex justify-between gap-3 px-1 items-center">
                      <div className="flex justify-start items-center gap-3">
                        <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden">
                          <img
                            src={ProductImg1}
                            alt="product"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-[1dvw] font-semibold mainFont line-clamp-1">
                          Budwiser Magnum 750ML
                        </p>
                      </div>
                      <div className="shrink-0">
                        <p className="text-[.9dvw] text-(--button-color2) paraFont font-medium">
                          Add ons
                        </p>
                      </div>
                    </div>
                    <div className="border-r border-(--border-color) py-3  min-w-[8dvw] w-[8dvw] shrink-0 flex justify-center items-center px-2">
                      <input
                        type="text"
                        placeholder="0.00"
                        value={cur * 3}
                        className="w-full text-center outline-none text-[1dvw] mainFont font-semibold border-(--border-color) py-2 bg-(--secondary-color)/50 appearance-none"
                      />
                    </div>
                    <div className="border-r border-(--border-color) py-3  min-w-[8dvw] w-[8dvw] shrink-0 flex justify-center items-center px-2">
                      <select className="w-full text-center outline-none text-[1dvw] font-semibold mainFont  border-(--border-color) py-2 bg-(--secondary-color)/50 rounded-md appearance-none">
                        <option>No Tax</option>
                        <option>Low Tax</option>
                        <option>High Tax</option>
                      </select>
                    </div>
                    <div className="border-r border-(--border-color) py-3  min-w-[8dvw] shrink-0 flex justify-center items-center">
                      <p className="text-[1dvw] font-semibold mainFont">
                        {cur * 5}
                      </p>
                    </div>
                    <div className="py-3  min-w-[8dvw] flex justify-center gap-3 items-center shrink-0">
                      <button className="bg-(--button-color1) text-(--primary-color) rounded-full p-2 flex justify-center items-center cursor-pointer">
                        <Plus />
                      </button>
                      <button className="bg-(--Negative-color) text-(--primary-color) rounded-full p-2 flex justify-center items-center cursor-pointer">
                        <Minus />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* item list end */}
            </div>
          </div>
        </div>
        <div className="w-[33dvw] bg-green-200 h-full">
          the categorries selector and other filters screen
        </div>
      </div>
      {isKeyboardOpen && (
        <AnimatePresence mode="popLayout">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: "easeInOut", type: "tween" }}
            className="fixed bottom-0 left-0 w-full p-4 bg-(--secondary-color) backdrop-blur-3xl z-50"
          >
            <Keyboard
              onChange={onChange}
              layoutName='default'
              theme={"hg-theme-default myTheme1"}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};
