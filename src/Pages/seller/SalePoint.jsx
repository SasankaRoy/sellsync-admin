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
  Logs,
} from "lucide-react";
import { Switch, Tooltip } from "@mui/material";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { AnimatePresence, motion } from "framer-motion";
import ProductImg1 from "../../assets/images/ProductImg1.png";
import { styled } from "@mui/material/styles";


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
            <div className="flex justify-between items-center w-full">
              <div className="w-[60%] flex-shrink-0 flex justify-center items-center gap-4 bg-(--secondary-color) p-2 rounded-full">
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
                  placeholder="Search items, categories,Stocks etc..."
                  className="w-full outline-none text-[1dvw] mainFont"
                />
              </div>
              <div className="flex justify-center items-center gap-3">
                <button className="flex cursor-pointer  justify-center items-center gap-1.5 mainFont font-semibold border border-(--border-color) rounded-full px-5 py-1.5">
                  <span className="p-1 flex justify-center bg-(--button-color1) items-center text-(--primary-color) rounded-full">
                    <Plus size={20} />
                  </span>
                  Add Item
                </button>
                <button className="flex cursor-pointer  justify-center items-center gap-1.5 mainFont font-semibold border border-(--border-color) rounded-full px-5 py-1.5">
                  <span className="p-1 flex justify-center bg-(--button-color1) items-center text-(--primary-color) rounded-full">
                    <Logs size={18} />
                  </span>
                  Shortcuts
                </button>
              </div>
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
              <div className="flex flex-col gap-2 scrollCustom h-[100%] overflow-y-auto justify-start items-center  mt-1.5">
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
        <div className="w-[33dvw] border-l border-(--border-color)/50 flex flex-col justify-between bg-(--secondary-color)/40 h-full p-4">
          <div>
            <div className="border-b flex justify-between items-center border-(--border-color) pb-4">
              <h3 className="text-[2dvw] font-semibold mainFont">
                Bill Details
              </h3>
              <div>
              <lable className='mainFont font-semibold text-[.9dvw]'>
                Discount Type - 
              </lable>
                <MaterialUISwitch />
              </div>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-[1.2dvw] mainFont font-semibold text-(--paraText-color)">
                  Total Items :
                </p>
                <strong className="text-[1.5dvw] paraFont font-semibold">
                  5
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[1.2dvw] mainFont font-semibold text-(--paraText-color)">
                  SubTotal :
                </p>
                <strong className="text-[1.5dvw] paraFont font-semibold">
                  $ 100
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[1.2dvw] mainFont font-semibold text-(--paraText-color)">
                  Tax :
                </p>
                <strong className="text-[1.5dvw] paraFont font-semibold text-(--Negative-color)">
                  $ 2.50
                </strong>
              </div>

              <div className="flex justify-between items-center  border-b border-(--border-color) pb-4">
                <p className="text-[1.2dvw] mainFont font-semibold text-(--paraText-color)">
                  Discount ($) :
                </p>
                {/* <strong className="text-[1.5dvw] paraFont font-semibold">
                  $ 2.50
                </strong> */}
                <input
                  type="text"
                  placeholder="$"
                  value={"$ 2.50"}
                  className="w-[20%] text-center outline-none text-[1.5dvw] mainFont font-semibold border-(--border-color) py-2 bg-transparent paraFont appearance-none border-b "
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[1.6dvw] mainFont font-semibold text-(--paraText-color)">
                  Total :
                </p>
                <strong className="text-[2dvw] paraFont font-semibold text-(--Positive-color)">
                  $ 100.00
                </strong>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center gap-3">
              <button className="w-1/2 py-4 text-[1.2dvw] mainFont font-semibold bg-(--button-color5) text-(--primary-color) rounded-md">
                Pay $ 100.00
              </button>
              <button className="w-1/2 py-4 text-[1.2dvw] mainFont font-semibold bg-(--Negative-color) text-(--primary-color) rounded-md">
                Cancel
              </button>
            </div>
            <div>
              <h3 className="font-medium mainFont text-(--button-color4) text-[1.2dvw]">
                Options
              </h3>
              <div className="my-2 grid grid-cols-3 gap-2">
                <button className="bg-(--button-color5) text-(--primary-color) py-3 mainFont font-semibold rounded-md">
                  Payout
                </button>
                <button className="bg-(--button-color2) cursor-pointer text-(--primary-color) py-3 mainFont font-semibold rounded-md">
                  Hold Order
                </button>
                <button className="bg-(--button-color1) cursor-pointer text-(--primary-color) py-3 mainFont font-semibold rounded-md">
                  Last Order
                </button>
                <button className="bg-(--button-color2) cursor-pointer text-(--primary-color) py-3 mainFont font-semibold rounded-md">
                  Reprint
                </button>
                <button className="bg-(--Negative-color) cursor-pointer text-(--primary-color) py-3 mainFont font-semibold rounded-md">
                  No Sale
                </button>
                <button className="bg-(--button-color3) cursor-pointer text-(--primary-color) py-3 mainFont font-semibold rounded-md">
                  Other
                </button>
              </div>
            </div>
          </div>
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
              layoutName="default"
              theme={"hg-theme-default myTheme1"}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        // backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        //   "#fff"
        // )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        // backgroundImage: `url('data:image/../../assets/images/PercentIcon.min.svg')`,
        content:`"%"`
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "'$'",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: '30%',
      top: '10%',
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      // backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
      //   "#fff"
      // )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#003892",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));
