import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleX } from "lucide-react";

const modalVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  inView: {
    opacity: 1,
    y: 0,
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
  defaultValues = {},
  setIsKeyboardOpen,
  setActiveInputField,
  keyboardInput,
  activeInputField,
}) => {
  const [form, setForm] = useState({
    name: defaultValues.name || "",
    phone: defaultValues.phone || "",
    email: defaultValues.email || "",
    address: defaultValues.address || "",
    notes: defaultValues.notes || "",
  });

  // Sync keyboard input to form state
  useEffect(() => {
    if (activeInputField?.type === "customerName") {
      setForm((prev) => ({ ...prev, name: keyboardInput }));
    } else if (activeInputField?.type === "customerPhone") {
      setForm((prev) => ({ ...prev, phone: keyboardInput }));
    } else if (activeInputField?.type === "customerEmail") {
      setForm((prev) => ({ ...prev, email: keyboardInput }));
    } else if (activeInputField?.type === "customerAddress") {
      setForm((prev) => ({ ...prev, address: keyboardInput }));
    } else if (activeInputField?.type === "customerNotes") {
      setForm((prev) => ({ ...prev, notes: keyboardInput }));
    }
  }, [keyboardInput, activeInputField]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
    onClose?.();
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-(--primary-color)/30 backdrop-blur-[2px] px-3 sm:px-5"
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
            className="w-full max-w-lg bg-(--primary-color) rounded-xl shadow-2xl border border-(--border-color)/60 p-4 sm:p-6 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between border-b border-(--border-color)/60 pb-3">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mainFont text-(--mainText-color)">
                  Customer Details
                </h3>
                <p className="text-xs sm:text-sm paraFont text-(--paraText-color)">
                  Capture customer info before payment
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-(--secondary-color)/80 transition-colors cursor-pointer text-(--mainText-color)"
              >
                <CircleX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-xs sm:text-sm paraFont text-(--paraText-color)">
                    Full Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={
                      activeInputField?.type === "customerName"
                        ? keyboardInput
                        : form.name
                    }
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
                  <span className="text-xs sm:text-sm paraFont text-(--paraText-color)">
                    Phone
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={
                      activeInputField?.type === "customerPhone"
                        ? keyboardInput
                        : form.phone
                    }
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
                  <span className="text-xs sm:text-sm paraFont text-(--paraText-color)">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={
                      activeInputField?.type === "customerEmail"
                        ? keyboardInput
                        : form.email
                    }
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
                  <span className="text-xs sm:text-sm paraFont text-(--paraText-color)">
                    Address
                  </span>
                  <input
                    type="text"
                    name="address"
                    value={
                      activeInputField?.type === "customerAddress"
                        ? keyboardInput
                        : form.address
                    }
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
                <span className="text-xs sm:text-sm paraFont text-(--paraText-color)">
                  Notes
                </span>
                <textarea
                  name="notes"
                  value={
                    activeInputField?.type === "customerNotes"
                      ? keyboardInput
                      : form.notes
                  }
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
                  rows={3}
                  placeholder="Order notes, preferences, delivery instructions..."
                  className="w-full border border-(--border-color) rounded-md bg-(--secondary-color) text-(--mainText-color) mainFont text-sm sm:text-base px-3 py-2 outline-none focus:border-(--button-color1) resize-none"
                />
              </label>

              <div className="flex justify-end gap-2 pt-2 border-t border-(--border-color)/60">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md border border-(--border-color) text-(--mainText-color) mainFont text-sm sm:text-base bg-(--secondary-color) hover:bg-(--secondary-color)/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-(--button-color1) text-(--primary-color) mainFont text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity shadow-md"
                >
                  Save & Continue
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
