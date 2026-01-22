import React from "react";
import { X, Maximize2 } from "lucide-react";
import SellsyncLogo from "../../assets/images/SellsyncLogo.png";

const CustomerScreenPage = () => {
  // Read snapshot from localStorage so a new tab can render without Redux context
  const [snapshot, setSnapshot] = React.useState([]);
  const [discountData, setDiscountData] = React.useState({
    discount: 0,
    isPercentage: false,
    discountAmount: 0,
    tax: 0,
    subtotal: 0,
    total: 0,
  });
  const [customerDetails, setCustomerDetails] = React.useState({});

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("ringUpsSnapshot");
      console.log(raw);
      if (raw) {
        setSnapshot(JSON.parse(raw));
      }

      // Load discount data
      const discountRaw = localStorage.getItem("discountSnapshot");
      const customerData = localStorage.getItem("customerDetails");
      if (discountRaw) {
        setDiscountData(JSON.parse(discountRaw));
      }
      if (customerData) {
        setCustomerDetails(JSON.parse(customerData));
      }

      const onStorage = (e) => {
        if (e.key === "ringUpsSnapshot" && e.newValue) {
          try {
            setSnapshot(JSON.parse(e.newValue));
          } catch {}
        }
        if (e.key === "discountSnapshot" && e.newValue) {
          try {
            setDiscountData(JSON.parse(e.newValue));
          } catch {}
        }
        if (e.key === "customerDetails" && e.newValue) {
          try {
            setCustomerDetails(JSON.parse(e.newValue));
          } catch {}
        }
      };
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    } catch (e) {}
  }, []);

  // Mock data - Replace with actual data from props or state
  const customer = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "555-0123",
    points: 1250,
    totalSpent: "$2,450.00",
  };

  // Derive products from Redux ringUps
  const products = React.useMemo(() => {
    return (snapshot || []).map((item) => {
      const qty = Number(item?.qty || 0);
      const price = Number(item?.product_price || 0);
      return {
        id: item?.id ?? item?.name,
        name: item?.name || "Item",
        quantity: qty,
        price: price,
        total: qty * price,
      };
    });
  }, [snapshot]);

  const calculateTotal = () => {
    return products.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const calculateSubtotal = () => {
    return products.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const calculateTax = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return (subtotal * 0.1).toFixed(2); // 10% tax
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden max-w-full">
      {/* Content Area */}
      <div className="flex flex-col md:flex-row h-screen overflow-hidden overflow-x-hidden">
        {/* Mobile Logo */}
        <div className="flex md:hidden justify-center items-center p-6 bg-gradient-to-b from-[#f8f8f8] to-[#f0f0f0]">
          <div className="w-full max-w-[350px]">
            <img
              src={SellsyncLogo}
              alt="Sellsync"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Desktop Logo */}
        <div className="hidden md:flex w-2/5 bg-gradient-to-b from-[#f8f8f8] to-[#f0f0f0] flex-col items-center justify-center p-6">
          <div className="w-full max-w-[400px]">
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
              {customerDetails.customerName}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-gray-600 text-xs font-semibold">EMAIL</p>
                <p className="text-[var(--mainText-color)] font-medium truncate">
                  {customerDetails.customerEmail}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-xs font-semibold">PHONE</p>
                <p className="text-[var(--mainText-color)] font-medium">
                  {customerDetails.customerPhone}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-xs font-semibold">Address</p>
                <p className="text-[var(--button-color1)] font-bold">
                  {customerDetails.customerAddress}
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
              {products.length > 0 ? (
                products.map((product) => (
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
                  $
                  {(
                    discountData.subtotal || parseFloat(calculateSubtotal())
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Tax:</span>
                <span className="font-semibold text-[var(--mainText-color)]">
                  ${(discountData.tax || parseFloat(calculateTax())).toFixed(2)}
                </span>
              </div>
              {discountData.discountAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-700">
                    Discount (
                    {discountData.isPercentage
                      ? `${discountData.discount}%`
                      : `$${discountData.discount}`}
                    ):
                  </span>
                  <span className="font-semibold text-[var(--Negative-color)]">
                    -${discountData.discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="font-bold text-[var(--mainText-color)]">
                  Total:
                </span>
                <span className="font-bold text-[var(--button-color1)] text-lg sm:text-xl">
                  $
                  {(
                    discountData.total ||
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
