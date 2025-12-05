import React, { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleX, CreditCard, Smartphone, Wallet, QrCode } from "lucide-react";

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

export const CheckoutModal = ({
  open,
  onClose,
  onPay,
  customerInfo = {},
  summary = {},
}) => {
  const { subtotal = 0, tax = 0, discount = 0, total = 0, totalItems = 0 } = summary;
  const [tendered, setTendered] = useState("");
  const [emailReceipt, setEmailReceipt] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const tenderedAmount = parseFloat(tendered) || 0;
  const balance = Math.max(0, total - tenderedAmount);
  const change = tenderedAmount > total ? tenderedAmount - total : 0;

  const handleKeypadInput = (value) => {
    if (value === "C") {
      setTendered("");
      return;
    }
    if (value === "00") {
      setTendered((prev) => prev + "00");
      return;
    }
    setTendered((prev) => prev + value);
  };

  const handleQuickCash = (amount) => {
    setTendered(amount.toFixed(2));
  };

  const handlePay = (method) => {
    setSelectedPaymentMethod(method);
    if (method === "cash" && tenderedAmount < total) {
      // Don't proceed if cash tendered is less than total
      return;
    }
    onPay?.(method, {
      tendered: tenderedAmount,
      change,
      emailReceipt,
      customerInfo,
    });
  };

  // Calculate quick cash amounts - show closest payment amounts
  // This recalculates whenever total changes
  const quickCashAmounts = useMemo(() => {
    const amounts = [];
    const totalNum = parseFloat(total) || 0;
    
    // Always show exact total as first option
    amounts.push(parseFloat(totalNum.toFixed(2)));
    
    // Show rounded up to nearest dollar if different from total
    const roundedUp = Math.ceil(totalNum);
    if (roundedUp !== totalNum && !amounts.includes(roundedUp)) {
      amounts.push(roundedUp);
    }
    
    // Show common payment amounts that are >= total
    const commonAmounts = [10, 20, 50, 100];
    commonAmounts.forEach((amt) => {
      if (amt >= totalNum && amounts.length < 6 && !amounts.includes(amt)) {
        amounts.push(amt);
      }
    });
    
    // Fill remaining slots with higher amounts if needed
    const higherAmounts = [200, 500];
    let idx = 0;
    while (amounts.length < 6 && idx < higherAmounts.length) {
      const amt = higherAmounts[idx];
      if (!amounts.includes(amt)) {
        amounts.push(amt);
      }
      idx++;
    }
    
    // Sort amounts to show in ascending order
    return amounts.sort((a, b) => a - b).slice(0, 6);
  }, [total]);

  const keypadButtons = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["0", "00", "C"],
  ];

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-(--primary-color)/30 backdrop-blur-[2px] px-3 sm:px-5"
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
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl bg-(--primary-color) rounded-xl shadow-2xl border border-(--border-color)/60 p-4 sm:p-6 flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex items-center justify-center border-b border-(--border-color)/60 pb-3">
              <h3 className="text-2xl sm:text-3xl font-bold mainFont text-(--mainText-color)">
                Checkout
              </h3>
            </div>

            {/* Three Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Left Column - Payment Summary */}
              <div className="flex flex-col gap-4">
                {/* Order Summary */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-base sm:text-lg font-semibold mainFont text-(--mainText-color)">
                    Order Summary
                  </h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base paraFont text-(--paraText-color)">
                      # Items:
                    </span>
                    <span className="text-sm sm:text-base mainFont font-semibold text-(--mainText-color)">
                      {totalItems}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base paraFont text-(--paraText-color)">
                      Cash Total:
                    </span>
                    <span className="text-sm sm:text-base mainFont font-semibold text-(--mainText-color)">
                      $ {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Tendering Section */}
                <div className="flex flex-col gap-2 border-t border-(--border-color)/60 pt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm paraFont text-(--paraText-color)">
                      Tendered: $
                    </span>
                    <input
                      type="text"
                      value={tendered}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9.]/g, "");
                        setTendered(val);
                      }}
                      placeholder="0.00"
                      className="flex-1 border-b border-(--border-color) bg-transparent text-(--mainText-color) mainFont text-sm sm:text-base outline-none focus:border-(--button-color1)"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm paraFont text-(--paraText-color)">
                      Balance:
                    </span>
                    <span className="text-xs sm:text-sm mainFont font-semibold text-(--mainText-color)">
                      $ {balance.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm paraFont text-(--paraText-color)">
                      Change:
                    </span>
                    <span className={`text-xs sm:text-sm mainFont font-semibold ${
                      change > 0 ? "text-(--Positive-color)" : "text-(--mainText-color)"
                    }`}>
                      $ {change.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Quick Cash Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {quickCashAmounts.map((amount, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickCash(amount)}
                      className="px-3 py-2 rounded-md bg-(--button-color5) text-(--primary-color) mainFont text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      $ {amount.toFixed(2)}
                    </button>
                  ))}
                </div>

                {/* Email Receipt */}
                <div className="flex items-center gap-2 pt-2 border-t border-(--border-color)/60">
                  <input
                    type="checkbox"
                    id="emailReceipt"
                    checked={emailReceipt}
                    onChange={(e) => setEmailReceipt(e.target.checked)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label
                    htmlFor="emailReceipt"
                    className="text-xs sm:text-sm paraFont text-(--paraText-color) cursor-pointer"
                  >
                    Email Receipt
                  </label>
                </div>
              </div>

              {/* Middle Column - Numeric Keypad */}
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-3 gap-2">
                  {keypadButtons.map((row, rowIdx) =>
                    row.map((btn, colIdx) => (
                      <button
                        key={`${rowIdx}-${colIdx}`}
                        onClick={() => handleKeypadInput(btn)}
                        className="aspect-square rounded-md bg-(--button-color1) text-(--primary-color) mainFont text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity shadow-sm"
                      >
                        {btn}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Right Column - Payment Methods */}
              <div className="flex flex-col gap-3">
                <h4 className="text-sm sm:text-base font-semibold mainFont text-(--mainText-color)">
                  Payment Methods
                </h4>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handlePay("cash")}
                    className={`w-full px-4 py-3 rounded-md mainFont text-sm sm:text-base font-semibold transition-opacity ${
                      selectedPaymentMethod === "cash"
                        ? "bg-(--button-color1) text-(--primary-color)"
                        : "bg-(--button-color5) text-(--primary-color) hover:opacity-90"
                    }`}
                  >
                    Cash
                  </button>
                  <button
                    onClick={() => handlePay("card")}
                    className={`w-full px-4 py-3 rounded-md mainFont text-sm sm:text-base font-semibold transition-opacity ${
                      selectedPaymentMethod === "card"
                        ? "bg-(--button-color1) text-(--primary-color)"
                        : "bg-(--button-color5) text-(--primary-color) hover:opacity-90"
                    }`}
                  >
                    Card
                  </button>
                  <button
                    onClick={() => handlePay("online")}
                    className={`w-full px-4 py-3 rounded-md mainFont text-sm sm:text-base font-semibold transition-opacity ${
                      selectedPaymentMethod === "online"
                        ? "bg-(--button-color1) text-(--primary-color)"
                        : "bg-(--button-color5) text-(--primary-color) hover:opacity-90"
                    }`}
                  >
                    Online Payment
                  </button>
                  <button
                    onClick={() => handlePay("qr")}
                    className={`w-full px-4 py-3 rounded-md mainFont text-sm sm:text-base font-semibold transition-opacity ${
                      selectedPaymentMethod === "qr"
                        ? "bg-(--button-color1) text-(--primary-color)"
                        : "bg-(--button-color5) text-(--primary-color) hover:opacity-90"
                    }`}
                  >
                    QR Code
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2 border-t border-(--border-color)/60">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 rounded-md bg-(--Negative-color) text-(--primary-color) mainFont text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity"
                  >
                    Return
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 rounded-md bg-(--Negative-color)/70 text-(--primary-color) mainFont text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

