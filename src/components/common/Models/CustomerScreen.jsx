import React, { useState } from "react";
import { ChevronDown, X, Maximize2, Minimize2 } from "lucide-react";
import SellsyncLogo from "../../../assets/images/SellsyncLogo.png";
import { motion, AnimatePresence } from "framer-motion";

const CustomerScreenVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    x: 0,
    y: 100,
  },
  inView: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    y: 100,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  backdrop: {
    initial: {
      opacity: 0,
    },
    inView: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  },
};

export const CustomerScreen = ({
  setShowCustomerScreen,
  showCustomerScreen,
  selectedCustomer = null,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Mock data - Replace with actual data from props or state
  const customer = selectedCustomer || {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "555-0123",
    points: 1250,
    totalSpent: "$2,450.00",
  };

  // Mock cart items - Replace with actual products
  const mockProducts = [
    {
      id: 1,
      name: "Corona Extra Beer",
      quantity: 2,
      price: 5.99,
      total: 11.98,
    },
    {
      id: 2,
      name: "Heineken 6-Pack",
      quantity: 1,
      price: 12.99,
      total: 12.99,
    },
    {
      id: 3,
      name: "Red Wine Bottle",
      quantity: 3,
      price: 15.99,
      total: 47.97,
    },
  ];

  const calculateTotal = () => {
    return mockProducts.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const calculateSubtotal = () => {
    return mockProducts.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const calculateTax = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return (subtotal * 0.1).toFixed(2); // 10% tax
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  return (
    <AnimatePresence mode="popLayout">
      {showCustomerScreen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={CustomerScreenVariants.backdrop}
            initial="initial"
            animate="inView"
            exit="exit"
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
            onClick={() => setShowCustomerScreen(false)}
          />

          {/* Main Window */}
          <motion.div
            variants={CustomerScreenVariants}
            initial="initial"
            animate="inView"
            exit="exit"
            className={`fixed z-40 bg-white rounded-xl shadow-2xl transition-all duration-300 ease-in-out ${
              isMaximized
                ? "inset-0 m-4"
                : "bottom-6 right-6 w-[90dvw] h-[85dvh] sm:w-[600px] sm:h-[700px] lg:w-[900px] lg:h-[750px]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--button-color1)] to-[var(--button-color5)] rounded-t-xl p-4 sm:p-5 flex justify-between items-center">
              <h2 className="text-white font-semibold text-lg sm:text-xl">
                Customer Screen
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                  title={isMaximized ? "Minimize" : "Maximize"}
                >
                  {isMaximized ? (
                    <Minimize2 size={20} className="text-white" />
                  ) : (
                    <Maximize2 size={20} className="text-white" />
                  )}
                </button>
                <button
                  onClick={() => setShowCustomerScreen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex h-[calc(100%-60px)] overflow-hidden">
              {/* Left Side - Logo */}
              <div className="hidden sm:flex w-2/5 bg-gradient-to-b from-[#f8f8f8] to-[#f0f0f0] flex-col items-center justify-center p-6">
                <div className="w-full max-w-[220px]">
                  <img
                    src={SellsyncLogo}
                    alt="Sellsync"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Right Side - Customer Details & Products */}
              <div className="w-full sm:w-3/5 flex flex-col overflow-hidden">
                {/* Customer Info */}
                <div className="bg-white border-b border-gray-200 p-4 sm:p-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--mainText-color)] mb-2">
                    {customer.name}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600 text-xs font-semibold">
                        EMAIL
                      </p>
                      <p className="text-[var(--mainText-color)] font-medium truncate">
                        {customer.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-semibold">
                        PHONE
                      </p>
                      <p className="text-[var(--mainText-color)] font-medium">
                        {customer.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-semibold">
                        POINTS
                      </p>
                      <p className="text-[var(--button-color1)] font-bold">
                        {customer.points}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Products List */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                  <h4 className="font-semibold text-[var(--mainText-color)] mb-4">
                    Products in Cart
                  </h4>
                  <div className="space-y-3">
                    {mockProducts.length > 0 ? (
                      mockProducts.map((product) => (
                        <div
                          key={product.id}
                          className="bg-gray-50 rounded-lg p-3 flex justify-between items-center hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-sm sm:text-base text-[var(--mainText-color)]">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              Qty: {product.quantity} × $
                              {product.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="font-bold text-[var(--button-color1)] text-sm sm:text-base">
                            ${product.total.toFixed(2)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        No products added
                      </p>
                    )}
                  </div>
                </div>

                {/* Total Section */}
                <div className="border-t border-gray-200 bg-gray-50 p-4 sm:p-5">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Subtotal:</span>
                      <span className="font-semibold text-[var(--mainText-color)]">
                        ${calculateSubtotal()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Tax (10%):</span>
                      <span className="font-semibold text-[var(--mainText-color)]">
                        ${calculateTax()}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="font-bold text-[var(--mainText-color)]">
                        Total:
                      </span>
                      <span className="font-bold text-[var(--button-color1)] text-lg">
                        $
                        {(
                          parseFloat(calculateSubtotal()) +
                          parseFloat(calculateTax())
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
