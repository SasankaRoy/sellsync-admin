import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleX, ScanFace } from "lucide-react";
import { useSelector } from "react-redux";
import { verifyAgeAndId } from "../../../utils/apis/AgeAndIDVeification";
import { CircularProgress } from "@mui/material";

const modalVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  inView: {
    opacity: 1,
    y: -90,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut", type: "tween" },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeIn", type: "tween" },
  },
};

const overlayVariants = {
  initial: { opacity: 0 },
  inView: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const CustomerDetailsModal = ({
  open,
  onClose,
  onSubmit,
  // defaultValues = {},
  setIsKeyboardOpen,
  setActiveInputField,
  keyboardInput,
  activeInputField,
  onchange,
}) => {
  const fullNameRef = useRef(null);
  const [isAgeVerifying, setIsAgeVerifying] = useState(false)
  const currentCustomerDetails = useSelector(
    (state) => state.currentBill.currentCustomerDetails,
  );



  const handleChange = (e) => {
    const { name, value } = e.target;
    // setForm((prev) => ({ ...prev, [name]: value }));

    // Call parent's onChange to update keyboardInput (same pattern as SearchItemsInput)
    if (onchange) {
      onchange(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(currentCustomerDetails);
    onClose?.();
  };

  useEffect(() => {
    if (fullNameRef.current) {
      fullNameRef.current.focus();
    }
  }, []);


  const getVerified = async () => {
    setIsAgeVerifying(true)
    const resVerifyAge = await verifyAgeAndId()
    if (resVerifyAge.session_id || resVerifyAge.session_token || resVerifyAge.url) {
      localStorage.setItem('v_session_id', resVerifyAge.session_id)
      localStorage.setItem('v_session_token', resVerifyAge.session_token)
      localStorage.setItem('v_url', resVerifyAge.url)
    } else {
      // setIsAgeVerifying(false)
    }

  }



  return (
    <>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center bg-(--primary-color)/30 backdrop-blur-[2px] px-3 sm:px-5"
            variants={overlayVariants}
            initial="initial"
            animate="inView"
            exit="exit"
            onClick={onClose}
          >
            <motion.div
              variants={modalVariants}
              initial="initial"
              animate="inView"
              exit="exit"
              onClick={(e) => {
                e.stopPropagation();
                setIsKeyboardOpen(false);
              }}
              className="w-full max-w-[60%] bg-(--primary-color) rounded-xl shadow-2xl border border-(--border-color)/60 p-2 sm:p-5 flex flex-col gap-4"
            >
              <div className="flex bg-(--button-color1) p-3 rounded-md items-center justify-between border-b border-(--border-color)/60 pb-3 ">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mainFont text-(--primary-color)">
                    Customer Details
                  </h3>
                  <p className="text-xs sm:text-sm paraFont text-(--primary-color)/70">
                    Capture customer info before payment
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-(--secondary-color)/80 transition-colors cursor-pointer text-(--primary-color)"
                >
                  <CircleX />
                </button>
              </div>


              {/* only for Age restricted product */}

              <div className="text-(--Negative-color) flex justify-between items-center gap-5">
                <div className="flex justify-start items-center gap-3">
                  <ScanFace size={30} />
                  <p className="text-[1.1dvw] mainFont  font-semibold">
                    Age Verification required for the products.
                  </p>
                </div>
                <button onClick={getVerified} className="bg-(--button-color1) text-white px-4 py-1.5 rounded-md mainFont font-semibold cursor-pointer hover:text-(--button-color1) hover:bg-white hover:border-(--button-color1) border transition-all duration-200 ease-linear">
                  Verify
                </button>
              </div>





              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1">
                    <span className="text-[1dvw] paraFont text-(--paraText-color)">
                      Full Name
                    </span>
                    <input
                      type="text"
                      name="name"
                      ref={fullNameRef}
                      autoFocus
                      value={currentCustomerDetails.customerName}
                      onChange={handleChange}
                      onFocus={(e) => {
                        e.stopPropagation();
                        if (setIsKeyboardOpen && setActiveInputField) {
                          setIsKeyboardOpen(true);
                          setActiveInputField({
                            type: "customerName",
                            itemId: null,
                          });
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (setIsKeyboardOpen && setActiveInputField) {
                          setIsKeyboardOpen(true);
                          setActiveInputField({
                            type: "customerName",
                            itemId: null,
                          });
                        }
                      }}
                      placeholder="Enter customer name"
                      className="w-full border border-(--border-color) rounded-md bg-(--secondary-color) text-(--mainText-color) mainFont text-sm sm:text-base px-3 py-2 outline-none focus:border-(--button-color1)"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-[1dvw] paraFont text-(--paraText-color)">
                      Phone
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={currentCustomerDetails.customerPhone}
                      onChange={handleChange}
                      onFocus={(e) => {
                        e.stopPropagation();
                        if (setIsKeyboardOpen && setActiveInputField) {
                          setIsKeyboardOpen(true);
                          setActiveInputField({
                            type: "customerPhone",
                            itemId: null,
                          });
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (setIsKeyboardOpen && setActiveInputField) {
                          setIsKeyboardOpen(true);
                          setActiveInputField({
                            type: "customerPhone",
                            itemId: null,
                          });
                        }
                      }}
                      placeholder="e.g. +1 555 123 4567"
                      className="w-full border border-(--border-color) rounded-md bg-(--secondary-color) text-(--mainText-color) mainFont text-sm sm:text-base px-3 py-2 outline-none focus:border-(--button-color1)"
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1">
                    <span className="text-[1dvw] paraFont text-(--paraText-color)">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={currentCustomerDetails.customerEmail}
                      onChange={handleChange}
                      onFocus={(e) => {
                        e.stopPropagation();
                        if (setIsKeyboardOpen && setActiveInputField) {
                          setIsKeyboardOpen(true);
                          setActiveInputField({
                            type: "customerEmail",
                            itemId: null,
                          });
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (setIsKeyboardOpen && setActiveInputField) {
                          setIsKeyboardOpen(true);
                          setActiveInputField({
                            type: "customerEmail",
                            itemId: null,
                          });
                        }
                      }}
                      placeholder="customer@email.com"
                      className="w-full border border-(--border-color) rounded-md bg-(--secondary-color) text-(--mainText-color) mainFont text-sm sm:text-base px-3 py-2 outline-none focus:border-(--button-color1)"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-[1dvw] paraFont text-(--paraText-color)">
                      Address
                    </span>
                    <input
                      type="text"
                      name="address"
                      value={currentCustomerDetails.customerAddress}
                      onChange={handleChange}
                      onFocus={(e) => {
                        e.stopPropagation();
                        if (setIsKeyboardOpen && setActiveInputField) {
                          setIsKeyboardOpen(true);
                          setActiveInputField({
                            type: "customerAddress",
                            itemId: null,
                          });
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (setIsKeyboardOpen && setActiveInputField) {
                          setIsKeyboardOpen(true);
                          setActiveInputField({
                            type: "customerAddress",
                            itemId: null,
                          });
                        }
                      }}
                      placeholder="Street, City"
                      className="w-full border border-(--border-color) rounded-md bg-(--secondary-color) text-(--mainText-color) mainFont text-sm sm:text-base px-3 py-2 outline-none focus:border-(--button-color1)"
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-1">
                  <span className="text-[1dvw] paraFont text-(--paraText-color)">
                    Notes
                  </span>
                  <textarea
                    name="notes"
                    value={currentCustomerDetails.customerNotes}
                    onChange={handleChange}
                    onFocus={(e) => {
                      e.stopPropagation();
                      if (setIsKeyboardOpen && setActiveInputField) {
                        setIsKeyboardOpen(true);
                        setActiveInputField({
                          type: "customerNotes",
                          itemId: null,
                        });
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (setIsKeyboardOpen && setActiveInputField) {
                        setIsKeyboardOpen(true);
                        setActiveInputField({
                          type: "customerNotes",
                          itemId: null,
                        });
                      }
                    }}
                    rows={5}
                    placeholder="Order notes, preferences, delivery instructions..."
                    className="w-full border border-(--border-color) rounded-md bg-(--secondary-color) text-(--mainText-color) mainFont text-sm sm:text-base px-3 py-2 outline-none focus:border-(--button-color1) resize-none"
                  />
                </label>

                <div className="flex justify-end gap-2 pt-4 border-t border-(--border-color)/60">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-md border border-(--border-color) text-(--mainText-color) mainFont text-sm sm:text-base bg-(--secondary-color) hover:bg-(--secondary-color)/80 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-(--button-color1) text-(--primary-color) mainFont text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity shadow-md cursor-pointer"
                  >
                    Save & Continue
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {
        isAgeVerifying && (
          <AgeVerification setIsAgeVerifying={setIsAgeVerifying} />
        )
      }
    </>
  );
};

const AgeVerification = ({ setIsAgeVerifying }) => {
  useEffect(() => {

    const onStorage = (e) => {
      console.log(e.key)
    }



    window.addEventListener("storage", onStorage);
  }, [])


  const handleClose = () => {
    setIsAgeVerifying(false)
  }
  return (
    <>
      <div className="fixed h-screen w-screen bg-black/20 top-0 left-0 backdrop-blur-md z-[999] flex justify-center items-center">
        <div className="bg-white p-5 shadow rounded-lg ">
          {/* <div className="flex justify-center items-center gap-6">
            <CircularProgress />
            <p className="mainFont font-semibold text-[1.5dvw]">Generating Verification URL .</p>
          </div> */}

          <p>
            Dummy Scan data
          </p>

          <div className="h-[70vh] min-w-[50dvw]">
            <iframe
              src="https://verify.didit.me/session/SdzT2DBXTYtl"
              title="Didit Verification"
              className="w-full h-full border-0"
              allow="camera; microphone; fullscreen"
            />
          </div>
          <div className="w-full flex justify-end items-center gap-6 mt-5">
            <button onClick={handleClose} className="bg-(--button-color3) cursor-pointer text-white text-[1.2dvw] mainFont px-5 py-1.5 rounded-lg">
              Canlce
            </button>
            <button className="bg-(--button-color1) cursor-pointer text-white text-[1.2dvw] mainFont px-5 py-1.5 rounded-lg">
              Check
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
