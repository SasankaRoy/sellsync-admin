import React, { useEffect, useState } from "react";
import { Minus, Plus, Search, Logs } from "lucide-react";
import { Switch, Tooltip } from "@mui/material";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { AnimatePresence, motion } from "framer-motion";
import ProductImg1 from "../../assets/images/ProductImg1.png";
import { styled } from "@mui/material/styles";
import { Shortcuts } from "../../components/common/Models/Shortcuts";
import { SellerNavbar } from "../../components/common/Navbars/SellerNavbar";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQyt, increaseQyt } from "../../Redux/RingUpSlice";

const itemListVarient = {
  initial: {
    x: "100%",
    opacity: 0,
    width: "70%",
  },
  inView: {
    x: "0%",
    opacity: 1,
    width: "100%",
    transition: {
      duration: 0.8,
      ease: "circInOut",
      type: "tween",
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    width: "70%",
    transition: {
      duration: 0.8,
      ease: "circInOut",
      type: "tween",
    },
  },
};

export const SalePoint = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(itemListVarient.initial);
  const [showPunchInModal, setShowPunchInModal] = useState(false);
  const currentRingUpData = useSelector((state) => state.ringUps);
  const dispatch = useDispatch();

  console.log(currentRingUpData, "in the ");

  const [cart, setCart] = useState([
    {
      name: "Budwiser Magnum 750ML",
      qty: 1,
      price: 5,
      tax: "No Tax",
      addons: "Add ons",
    },
    { name: "Item 2", qty: 2, price: 5, tax: "Low Tax", addons: "" },
    { name: "Item 3", qty: 3, price: 5, tax: "High Tax", addons: "" },
    { name: "Item 4", qty: 4, price: 5, tax: "No Tax", addons: "" },
  ]);

  const [discount, setDiscount] = useState(2.5);
  const [isPercentage, setIsPercentage] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const tax = 2.5;
  const discountAmount = isPercentage ? subtotal * (discount / 100) : discount;
  const total = subtotal + tax - discountAmount;

  const [layoutName, setLayoutName] = useState("default");
  const [input, setInput] = useState("");

  // Show punch in modal on first page load
  useEffect(() => {
    // Check if user has already punched in today
    const hasPunchedIn = sessionStorage.getItem("hasPunchedIn");
    if (!hasPunchedIn) {
      setShowPunchInModal(true);
      sessionStorage.setItem("hasPunchedIn", "true");
    }
  }, []);

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

  const handleIncreaseQty = (id, action) => {
    if (action === "increase") {
      dispatch(increaseQyt(id));
    } else if (action === "decrease") {
      dispatch(decreaseQyt(id));
    }
  };

  return (
    // <div className="h-screen w-full max-w-full overflow-hidden fixed inset-0">
    //   <SellerNavbar
    //     showPunchInModal={showPunchInModal}
    //     setShowPunchInModal={setShowPunchInModal}
    //   />
    //   <div
    //     onClick={(e) => {
    //       e.stopPropagation();
    //       setIsKeyboardOpen(false);
    //     }}
    //     className="flex flex-col lg:flex-row justify-start items-stretch lg:items-start gap-0 lg:gap-4 h-[calc(100vh-70px)] sm:h-[calc(100vh-80px)] overflow-hidden overflow-x-hidden w-full max-w-full"
    //   >
    //     <div className="flex-1 flex flex-col relative overflow-hidden overflow-x-hidden w-full max-w-full">
    //       <div className="flex flex-col gap-1 lg:gap-2 justify-start items-center w-full p-2 sm:p-4">
    //         <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center w-full gap-3 sm:gap-4">
    //           <div className="flex-1 sm:flex-shrink-0 w-full sm:w-[50%] flex justify-center items-center gap-2 sm:gap-4 bg-(--secondary-color) p-2 rounded-full">
    //             <button className="p-1.5 sm:p-2 flex justify-center items-center cursor-pointer shrink-0">
    //               <Search size={18} className="sm:w-5 sm:h-5" />
    //             </button>
    //             <input
    //               type="text"
    //               onFocus={(e) => {
    //                 setIsKeyboardOpen(true);
    //               }}
    //               onClick={(e) => {
    //                 e.stopPropagation();
    //               }}
    //               value={input}
    //               onChange={(e) => onChange(e.target.value)}
    //               placeholder="Search items..."
    //               className="w-full outline-none text-xs sm:text-sm lg:text-[1dvw] mainFont"
    //             />
    //           </div>
    //           <div className="flex justify-center items-center gap-2 sm:gap-3 w-full sm:w-auto flex-wrap">
    //             <button className="flex flex-1 sm:flex-none cursor-pointer justify-center items-center gap-1 mainFont font-semibold text-xs sm:text-sm border border-(--border-color) rounded-full px-3 sm:px-5 py-1.5">
    //               <span className="p-1 flex justify-center bg-(--button-color1) items-center text-(--primary-color) rounded-full shrink-0">
    //                 <Plus size={16} className="sm:w-5 sm:h-5" />
    //               </span>
    //               <span className="hidden sm:inline">Add Item</span>
    //             </button>
    //             <button
    //               onClick={() => {
    //                 setShowShortcuts(itemListVarient.inView);
    //               }}
    //               className="flex flex-1 sm:flex-none cursor-pointer justify-center items-center gap-1 mainFont font-semibold text-xs sm:text-sm border border-(--border-color) rounded-full px-3 sm:px-5 py-1.5"
    //             >
    //               <span className="p-1 flex justify-center bg-(--button-color1) items-center text-(--primary-color) rounded-full shrink-0">
    //                 <Logs size={16} className="sm:w-4.5 sm:h-4.5" />
    //               </span>
    //               <span className="hidden sm:inline">Shortcuts</span>
    //             </button>
    //           </div>
    //         </div>
    //         <div className="w-full flex-1  h-full overflow-y-hidden flex flex-col gap-0">

    //           <div className="hidden lg:flex justify-center items-center bg-(--secondary-color) ">
    //             <div className="border-r border-(--border-color) py-3 min-w-[5dvw] flex justify-center items-center">
    //               <p className="text-[1dvw] font-semibold mainFont">Qty.</p>
    //             </div>
    //             <div className="border-r border-(--border-color) py-3 w-full flex justify-center items-center">
    //               <p className="text-[1dvw] font-semibold mainFont">
    //                 Item Name
    //               </p>
    //             </div>
    //             <div className="border-r border-(--border-color) py-3 min-w-[8dvw] shrink-0 flex justify-center items-center">
    //               <p className="text-[1dvw] font-semibold mainFont">Price</p>
    //             </div>
    //             <div className="border-r border-(--border-color) py-3 min-w-[8dvw] shrink-0 flex justify-center items-center">
    //               <p className="text-[1dvw] font-semibold mainFont">Tax Type</p>
    //             </div>
    //             <div className="border-r border-(--border-color) py-3 min-w-[8dvw] shrink-0 flex justify-center items-center">
    //               <p className="text-[1dvw] font-semibold mainFont">Total</p>
    //             </div>
    //             <div className="py-3 min-w-[8dvw] flex justify-center items-center shrink-0">
    //               <p className="text-[1dvw] font-semibold mainFont">Actions</p>
    //             </div>
    //           </div>

    //           <div className="flex flex-col gap-2 relative scrollCustom h-full overflow-y-auto justify-start items-center px-2 sm:px-0">
    //             {cart.length === 0 ? (
    //               <>
    //                 <h2 className="text-(--mainText-color)/40 mt-[25vh] text-[3dvw] font-semibold">No Product Added</h2>
    //               </>
    //             ) : (
    //               <>
    //                 {cart.map((item, index) => (
    //                   <div
    //                     key={index}
    //                     className={`flex flex-col lg:flex-row justify-center items-start lg:items-center w-full rounded-lg lg:rounded-none ${
    //                       index % 2 === 0
    //                         ? "bg-(--secondary-color)/70"
    //                         : "bg-transparent"
    //                     } p-3 lg:p-0`}
    //                   >
    //                     {/* Mobile Card Layout */}
    //                     <div className="lg:hidden w-full space-y-3">
    //                       <div className="flex justify-between items-start gap-3">
    //                         <div className="flex justify-start items-center gap-2 flex-1">
    //                           <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden">
    //                             <img
    //                               src={ProductImg1}
    //                               alt="product"
    //                               className="w-full h-full object-cover"
    //                             />
    //                           </div>
    //                           <div className="flex-1 min-w-0">
    //                             <p className="text-xs sm:text-sm font-semibold mainFont line-clamp-2">
    //                               {item.name}
    //                             </p>
    //                             <p className="text-xs text-(--button-color2) paraFont font-medium">
    //                               {item.addons}
    //                             </p>
    //                           </div>
    //                         </div>
    //                         <input
    //                           type="text"
    //                           value={item.qty}
    //                           onChange={(e) => {
    //                             const newQty = parseInt(e.target.value) || 0;
    //                             setCart((prev) =>
    //                               prev.map((i, idx) =>
    //                                 idx === index ? { ...i, qty: newQty } : i
    //                               )
    //                             );
    //                           }}
    //                           className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded whitespace-nowrap outline-none text-center"
    //                           placeholder="Qty"
    //                         />
    //                       </div>
    //                       <div className="grid grid-cols-2 gap-2">
    //                         <div>
    //                           <p className="text-xs text-gray-500 mb-1">
    //                             Price
    //                           </p>
    //                           <p className="text-sm font-semibold flex items-center gap-1">
    //                             <span>$</span>
    //                             <input
    //                               type="number"
    //                               placeholder="0.00"
    //                               value={item.price === 0 ? "" : item.price}
    //                               onChange={(e) =>
    //                                 setCart((prev) =>
    //                                   prev.map((i, idx) =>
    //                                     idx === index
    //                                       ? {
    //                                           ...i,
    //                                           price:
    //                                             parseFloat(e.target.value) || 0,
    //                                         }
    //                                       : i
    //                                   )
    //                                 )
    //                               }
    //                               step="0.01"
    //                               min="0"
    //                               className="w-24 outline-none text-center font-semibold border border-(--border-color) py-1 px-1 bg-(--secondary-color)/50 rounded appearance-none"
    //                             />
    //                           </p>
    //                         </div>
    //                         <div>
    //                           <p className="text-xs text-gray-500 mb-1">Tax</p>
    //                           <select
    //                             value={item.tax}
    //                             onChange={(e) =>
    //                               setCart((prev) =>
    //                                 prev.map((i, idx) =>
    //                                   idx === index
    //                                     ? { ...i, tax: e.target.value }
    //                                     : i
    //                                 )
    //                               )
    //                             }
    //                             className="w-full text-xs outline-none text-center font-semibold border border-(--border-color) py-1.5 px-2 bg-(--secondary-color)/50 rounded appearance-none"
    //                           >
    //                             <option>No Tax</option>
    //                             <option>Low Tax</option>
    //                             <option>High Tax</option>
    //                           </select>
    //                         </div>
    //                       </div>
    //                       <div className="flex justify-between items-center pt-2 border-t border-(--border-color)/30">
    //                         <div>
    //                           <p className="text-xs text-gray-500">Total</p>
    //                           <p className="text-sm font-semibold">
    //                             $ {(item.qty * item.price).toFixed(2)}
    //                           </p>
    //                         </div>
    //                         <div className="flex gap-2">
    //                           <button
    //                             onClick={() =>
    //                               setCart((prev) =>
    //                                 prev.map((i, idx) =>
    //                                   idx === index
    //                                     ? { ...i, qty: i.qty + 1 }
    //                                     : i
    //                                 )
    //                               )
    //                             }
    //                             className="bg-(--button-color1) text-(--primary-color) rounded-full p-1.5 flex justify-center items-center cursor-pointer"
    //                           >
    //                             <Plus size={16} />
    //                           </button>
    //                           <button
    //                             onClick={() =>
    //                               setCart((prev) =>
    //                                 prev
    //                                   .map((i, idx) =>
    //                                     idx === index
    //                                       ? { ...i, qty: i.qty - 1 }
    //                                       : i
    //                                   )
    //                                   .filter((i) => i.qty > 0)
    //                               )
    //                             }
    //                             className="bg-(--Negative-color) text-(--primary-color) rounded-full p-1.5 flex justify-center items-center cursor-pointer"
    //                           >
    //                             <Minus size={16} />
    //                           </button>
    //                         </div>
    //                       </div>
    //                     </div>

    //                     {/* Desktop Table Layout */}
    //                     <div className="hidden lg:flex justify-center items-center w-full">
    //                       <div className="border-r border-(--border-color) py-3 px-1 min-w-[5dvw] flex justify-center items-center">
    //                         <input
    //                           type="text"
    //                           value={item.qty}
    //                           onChange={(e) => {
    //                             const newQty = parseInt(e.target.value) || 0;
    //                             setCart((prev) =>
    //                               prev.map((i, idx) =>
    //                                 idx === index ? { ...i, qty: newQty } : i
    //                               )
    //                             );
    //                           }}
    //                           className="text-[1dvw] font-semibold mainFont outline-none text-center bg-transparent w-full max-w-[3rem]"
    //                         />
    //                       </div>
    //                       <div className="border-r border-(--border-color) py-3 w-full flex justify-between gap-3 px-1 items-center">
    //                         <div className="flex justify-start items-center gap-3">
    //                           <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden">
    //                             <img
    //                               src={ProductImg1}
    //                               alt="product"
    //                               className="w-full h-full object-cover"
    //                             />
    //                           </div>
    //                           <p className="text-[1dvw] font-semibold mainFont line-clamp-1">
    //                             {item.name}
    //                           </p>
    //                         </div>
    //                         <div className="shrink-0">
    //                           <p className="text-[.9dvw] text-(--button-color2) paraFont font-medium">
    //                             {item.addons}
    //                           </p>
    //                         </div>
    //                       </div>
    //                       <div className="border-r border-(--border-color) py-3 min-w-[8dvw] w-[8dvw] shrink-0 flex justify-center items-center px-2">
    //                         <p className="text-[1dvw] font-semibold mainFont flex items-center gap-1">
    //                           <span>$</span>
    //                           <input
    //                             type="number"
    //                             placeholder="0.00"
    //                             value={item.price === 0 ? "" : item.price}
    //                             onChange={(e) =>
    //                               setCart((prev) =>
    //                                 prev.map((i, idx) =>
    //                                   idx === index
    //                                     ? {
    //                                         ...i,
    //                                         price:
    //                                           parseFloat(e.target.value) || 0,
    //                                       }
    //                                     : i
    //                                 )
    //                               )
    //                             }
    //                             step="0.01"
    //                             min="0"
    //                             className="w-16 outline-none text-center font-semibold border-(--border-color) py-1 px-1 bg-(--secondary-color)/50 appearance-none"
    //                           />
    //                         </p>
    //                       </div>
    //                       <div className="border-r border-(--border-color) py-3 min-w-[8dvw] w-[8dvw] shrink-0 flex justify-center items-center px-2">
    //                         <select
    //                           value={item.tax}
    //                           onChange={(e) =>
    //                             setCart((prev) =>
    //                               prev.map((i, idx) =>
    //                                 idx === index
    //                                   ? { ...i, tax: e.target.value }
    //                                   : i
    //                               )
    //                             )
    //                           }
    //                           className="w-full text-center outline-none text-[1dvw] font-semibold mainFont border-(--border-color) py-2 bg-(--secondary-color)/50 rounded-md appearance-none"
    //                         >
    //                           <option>No Tax</option>
    //                           <option>Low Tax</option>
    //                           <option>High Tax</option>
    //                         </select>
    //                       </div>
    //                       <div className="border-r border-(--border-color) py-3 min-w-[8dvw] shrink-0 flex justify-center items-center">
    //                         <p className="text-[1dvw] font-semibold mainFont">
    //                           $ {(item.qty * item.price).toFixed(2)}
    //                         </p>
    //                       </div>
    //                       <div className="py-3 min-w-[8dvw] flex justify-center gap-3 items-center shrink-0">
    //                         <button
    //                           onClick={() =>
    //                             setCart((prev) =>
    //                               prev.map((i, idx) =>
    //                                 idx === index ? { ...i, qty: i.qty + 1 } : i
    //                               )
    //                             )
    //                           }
    //                           className="bg-(--button-color1) text-(--primary-color) rounded-full p-2 flex justify-center items-center cursor-pointer"
    //                         >
    //                           <Plus />
    //                         </button>
    //                         <button
    //                           onClick={() =>
    //                             setCart((prev) =>
    //                               prev
    //                                 .map((i, idx) =>
    //                                   idx === index
    //                                     ? { ...i, qty: i.qty - 1 }
    //                                     : i
    //                                 )
    //                                 .filter((i) => i.qty > 0)
    //                             )
    //                           }
    //                           className="bg-(--Negative-color) text-(--primary-color) rounded-full p-2 flex justify-center items-center cursor-pointer"
    //                         >
    //                           <Minus />
    //                         </button>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 ))}
    //               </>
    //             )}
    //           </div>

    //         </div>
    //       </div>
    //       <AnimatePresence mode="popLayout">
    //         <Shortcuts
    //           itemListVarient={itemListVarient}
    //           showShortcuts={showShortcuts}
    //           setShowShortcuts={setShowShortcuts}
    //         />
    //       </AnimatePresence>
    //     </div>
    //     <div className="w-full lg:w-[33dvw] border-t lg:border-t-0 lg:border-l border-(--border-color)/50 flex flex-col justify-between bg-(--secondary-color)/40 p-3 sm:p-4 max-h-[50vh] lg:max-h-full lg:h-full">
    //       <div>
    //         <div className="border-b flex justify-between items-center border-(--border-color) pb-4">
    //           <h3 className="text-lg sm:text-xl lg:text-[2dvw] font-semibold mainFont">
    //             Bill Details
    //           </h3>
    //           <div className="flex items-center gap-2">
    //             <lable className="mainFont font-semibold text-xs sm:text-sm lg:text-[.9dvw] whitespace-nowrap">
    //               Discount ({isPercentage ? "%" : "$"}) -
    //             </lable>
    //             <MaterialUISwitch
    //               checked={isPercentage}
    //               onChange={(e) => setIsPercentage(e.target.checked)}
    //             />
    //           </div>
    //         </div>
    //         <div className="p-3 sm:p-5 flex flex-col gap-3 sm:gap-4">
    //           <div className="flex justify-between items-center">
    //             <p className="text-xs sm:text-sm lg:text-[1.2dvw] mainFont font-semibold text-(--paraText-color)">
    //               Total Items :
    //             </p>
    //             <strong className="text-sm sm:text-base lg:text-[1.5dvw] paraFont font-semibold">
    //               {totalItems}
    //             </strong>
    //           </div>
    //           <div className="flex justify-between items-center">
    //             <p className="text-xs sm:text-sm lg:text-[1.2dvw] mainFont font-semibold text-(--paraText-color)">
    //               SubTotal :
    //             </p>
    //             <strong className="text-sm sm:text-base lg:text-[1.5dvw] paraFont font-semibold">
    //               $ {subtotal.toFixed(2)}
    //             </strong>
    //           </div>
    //           <div className="flex justify-between items-center">
    //             <p className="text-xs sm:text-sm lg:text-[1.2dvw] mainFont font-semibold text-(--paraText-color)">
    //               Tax :
    //             </p>
    //             <strong className="text-sm sm:text-base lg:text-[1.5dvw] paraFont font-semibold text-(--Negative-color)">
    //               $ {tax.toFixed(2)}
    //             </strong>
    //           </div>

    //           <div className="flex justify-between items-center border-b border-(--border-color) pb-4">
    //             <p className="text-xs sm:text-sm lg:text-[1.2dvw] mainFont font-semibold text-(--paraText-color)">
    //               Discount ($) :
    //             </p>
    //             <input
    //               type="text"
    //               placeholder={isPercentage ? "%" : "$"}
    //               value={
    //                 isPercentage ? `${discount}%` : `$ ${discount.toFixed(2)}`
    //               }
    //               onChange={(e) =>
    //                 setDiscount(
    //                   parseFloat(
    //                     e.target.value.replace(isPercentage ? "%" : "$ ", "")
    //                   ) || 0
    //                 )
    //               }
    //               className="w-[40%] sm:w-[30%] text-center outline-none text-xs sm:text-sm lg:text-[1.5dvw] mainFont font-semibold border-(--border-color) py-1 sm:py-2 bg-transparent paraFont appearance-none border-b "
    //             />
    //           </div>
    //           <div className="flex justify-between items-center">
    //             <p className="text-sm sm:text-base lg:text-[1.6dvw] mainFont font-semibold text-(--paraText-color)">
    //               Total :
    //             </p>
    //             <strong className="text-base sm:text-lg lg:text-[2dvw] paraFont font-semibold text-(--Positive-color)">
    //               $ {total.toFixed(2)}
    //             </strong>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="flex flex-col gap-2 sm:gap-3">
    //         <div className="flex justify-between items-center gap-2 sm:gap-3">
    //           <button className="flex-1 py-2 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-[1.2dvw] mainFont font-semibold bg-(--button-color5) text-(--primary-color) rounded-md">
    //             Pay
    //           </button>
    //           <button className="flex-1 py-2 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-[1.2dvw] mainFont font-semibold bg-(--Negative-color) text-(--primary-color) rounded-md">
    //             Void
    //           </button>
    //         </div>
    //         {/* Mobile Options - Collapsible */}
    //         <div className="lg:hidden">
    //           <details className="group">
    //             <summary className="flex items-center justify-between cursor-pointer py-2 border-t border-(--border-color)/30">
    //               <h3 className="font-medium mainFont text-(--button-color4) text-sm">
    //                 More Options
    //               </h3>
    //               <span className="transition-transform group-open:rotate-180">
    //                 <svg
    //                   className="w-4 h-4"
    //                   fill="none"
    //                   stroke="currentColor"
    //                   viewBox="0 0 24 24"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth={2}
    //                     d="M19 9l-7 7-7-7"
    //                   />
    //                 </svg>
    //               </span>
    //             </summary>
    //             <div className="grid grid-cols-3 gap-2 pt-2">
    //               <button className="py-2 text-xs mainFont font-semibold bg-(--button-color5) text-(--primary-color) rounded-md">
    //                 Payout
    //               </button>
    //               <button className="py-2 text-xs mainFont font-semibold bg-(--button-color2) text-(--primary-color) rounded-md">
    //                 Suspend
    //               </button>
    //               <button className="py-2 text-xs mainFont font-semibold bg-(--button-color1) text-(--primary-color) rounded-md">
    //                 Recall
    //               </button>
    //               <button className="py-2 text-xs mainFont font-semibold bg-(--button-color2) text-(--primary-color) rounded-md">
    //                 Reprint
    //               </button>
    //               <button className="py-2 text-xs mainFont font-semibold bg-(--Negative-color) text-(--primary-color) rounded-md">
    //                 No Sale
    //               </button>
    //               <button className="py-2 text-xs mainFont font-semibold bg-(--button-color3) text-(--primary-color) rounded-md">
    //                 Cancel
    //               </button>
    //             </div>
    //           </details>
    //         </div>
    //         <div className="hidden lg:block">
    //           <h3 className="font-medium mainFont text-(--button-color4) text-[1.2dvw] mb-2">
    //             Options
    //           </h3>
    //           <div className="grid grid-cols-3 gap-2">
    //             <button className="py-2 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-[1.2dvw] mainFont font-semibold bg-(--button-color5) text-(--primary-color) rounded-md">
    //               Payout
    //             </button>
    //             <button className="py-2 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-[1.2dvw] mainFont font-semibold bg-(--button-color2) text-(--primary-color) rounded-md">
    //               Suspend
    //             </button>
    //             <button className="py-2 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-[1.2dvw] mainFont font-semibold bg-(--button-color1) text-(--primary-color) rounded-md">
    //               Recall
    //             </button>
    //             <button className="py-2 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-[1.2dvw] mainFont font-semibold bg-(--button-color2) text-(--primary-color) rounded-md">
    //               Reprint
    //             </button>
    //             <button className="py-2 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-[1.2dvw] mainFont font-semibold bg-(--Negative-color) text-(--primary-color) rounded-md">
    //               No Sale
    //             </button>
    //             <button className="py-2 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-[1.2dvw] mainFont font-semibold bg-(--button-color3) text-(--primary-color) rounded-md">
    //               Cancel
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {isKeyboardOpen && (
    //     <AnimatePresence mode="popLayout">
    //       <motion.div
    //         initial={{ opacity: 0, y: 100 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         exit={{ opacity: 0, y: 100 }}
    //         transition={{ duration: 0.3, ease: "easeInOut", type: "tween" }}
    //         className="fixed bottom-0 left-0 w-full p-4 bg-(--secondary-color) backdrop-blur-3xl z-50"
    //       >
    //         <Keyboard
    //           onChange={onChange}
    //           layoutName="default"
    //           theme={"hg-theme-default myTheme1"}
    //         />
    //       </motion.div>
    //     </AnimatePresence>
    //   )}
    // </div>

    <>
      <SellerNavbar />
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsKeyboardOpen(false);
        }}
        className="flex justify-center items-center gap-4 h-[88vh]"
      >
        <div className="flex-1  h-full relative overflow-hidden">
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
                <button
                  onClick={() => {
                    setShowShortcuts(itemListVarient.inView);
                  }}
                  className="flex cursor-pointer  justify-center items-center gap-1.5 mainFont font-semibold border border-(--border-color) rounded-full px-5 py-1.5"
                >
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
                {currentRingUpData?.map((cur, id) => (
                  <div
                    key={id}
                    className={`flex justify-center items-center w-full ${
                      id % 2 === 0
                        ? "bg-(--secondary-color)/70"
                        : "bg-transparent"
                    }`}
                  >
                    <div className="border-r border-(--border-color) py-3 px-1  min-w-[5dvw] max-w-[5dvw] flex justify-center items-center">
                      {/* <p className="text-[1dvw] font-semibold mainFont">
                        {cur.qty}
                      </p> */}
                      <input value={cur.qty} type="text" className="w-full border-none active:border-none outline-none mainFont text-[1dvw] font-semibold text-center"/>
                    </div>
                    <div className="border-r  border-(--border-color) py-3 w-full flex justify-between gap-3 px-1 items-center">
                      <div className="flex justify-start items-center gap-3">
                        <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden">
                          <img
                            src={cur.product_image}
                            alt="product"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-[1dvw] font-semibold mainFont line-clamp-1">
                          {cur.name}
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
                        value={`$ ${cur.product_price}.00`}
                        className="w-full text-center outline-none text-[1dvw] mainFont font-semibold border-(--border-color) py-2 bg-(--secondary-color)/50 appearance-none"
                      />
                    </div>
                    <div className="border-r border-(--border-color) py-3  min-w-[8dvw] w-[8dvw] shrink-0 flex justify-center items-center px-2">
                      <select
                        value={cur.tax_percentage}
                        className="w-full text-center outline-none text-[1dvw] font-semibold mainFont  border-(--border-color) py-2 bg-(--secondary-color)/50 rounded-md appearance-none"
                      >
                        <option>No Tax</option>
                        <option>Low Tax</option>
                        <option>High Tax</option>
                      </select>
                    </div>
                    <div className="border-r border-(--border-color) py-3  min-w-[8dvw] shrink-0 flex justify-center items-center">
                      <p className="text-[1dvw] font-semibold mainFont">
                        $ {cur.product_price * cur.qty}.00
                      </p>
                    </div>
                    <div className="py-3  min-w-[8dvw] flex justify-center gap-3 items-center shrink-0">
                      <button
                        onClick={() => {
                          handleIncreaseQty(cur.id, "increase");
                        }}
                        className="bg-(--button-color1) text-(--primary-color) rounded-full p-2 flex justify-center items-center cursor-pointer"
                      >
                        <Plus />
                      </button>
                      <button
                        onClick={() => {
                          handleIncreaseQty(cur.id, "decrease");
                        }}
                        className="bg-(--Negative-color) text-(--primary-color) rounded-full p-2 flex justify-center items-center cursor-pointer"
                      >
                        <Minus />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* item list end */}
            </div>
          </div>
          <AnimatePresence mode="popLayout">
            <Shortcuts
              itemListVarient={itemListVarient}
              showShortcuts={showShortcuts}
              setShowShortcuts={setShowShortcuts}
            />
          </AnimatePresence>
        </div>
        <div className="w-[33dvw] border-l border-(--border-color)/50 flex flex-col justify-between bg-(--secondary-color)/40 h-full p-4">
          <div>
            <div className="border-b flex justify-between items-center border-(--border-color) pb-4">
              <h3 className="text-[2dvw] font-semibold mainFont">
                Bill Details
              </h3>
              <div>
                <lable className="mainFont font-semibold text-[.9dvw]">
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
        content: `"%"`,
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
      left: "30%",
      top: "10%",
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
