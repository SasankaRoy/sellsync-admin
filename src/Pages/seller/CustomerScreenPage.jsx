import React, { useState } from "react";
import { X, Maximize2 } from "lucide-react";
import SellsyncLogo from "../../assets/images/SellsyncLogo.png";

const CustomerScreenPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Mock data - Replace with actual data from props or state
  const customer = {
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--button-color1)] to-[var(--button-color5)] rounded-t-xl p-4 sm:p-5 flex justify-between items-center">
        <h2 className="text-white font-semibold text-lg sm:text-xl">
          Customer Screen
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              window.resizeTo(screen.width, screen.height);
              window.moveTo(0, 0);
            }}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            title="Full Screen"
          >
            <Maximize2 size={20} className="text-white" />
          </button>
          <button
            onClick={() => window.close()}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
          >
            <X size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden">
        {/* Mobile Logo */}
        <div className="flex md:hidden justify-center items-center p-6 bg-gradient-to-b from-[#f8f8f8] to-[#f0f0f0]">
          <div className="w-full max-w-[200px]">
            <img
              src={SellsyncLogo}
              alt="Sellsync"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Desktop Logo */}
        <div className="hidden md:flex w-2/5 bg-gradient-to-b from-[#f8f8f8] to-[#f0f0f0] flex-col items-center justify-center p-6">
          <div className="w-full max-w-[220px]">
            <img
              src={SellsyncLogo}
              alt="Sellsync"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Side - Customer Details & Products */}
        <div className="w-full md:w-3/5 flex flex-col overflow-hidden">
          {/* Customer Info */}
          <div className="bg-white border-b border-gray-200 p-4 sm:p-5">
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--mainText-color)] mb-2">
              {customer.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-gray-600 text-xs font-semibold">EMAIL</p>
                <p className="text-[var(--mainText-color)] font-medium truncate">
                  {customer.email}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-xs font-semibold">PHONE</p>
                <p className="text-[var(--mainText-color)] font-medium">
                  {customer.phone}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-xs font-semibold">POINTS</p>
                <p className="text-[var(--button-color1)] font-bold">
                  {customer.points}
                </p>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            <h4 className="font-semibold text-[var(--mainText-color)] mb-4 text-base sm:text-lg">
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
                        Qty: {product.quantity} × ${product.price.toFixed(2)}
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
                <span className="font-bold text-[var(--button-color1)] text-lg sm:text-xl">
                  $
                  {(
                    parseFloat(calculateSubtotal()) + parseFloat(calculateTax())
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerScreenPage;
