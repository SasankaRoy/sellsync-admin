import React, { useState } from "react";
import { X, Maximize2 } from "lucide-react";
import SellsyncLogo from "../../assets/images/SellsyncLogo.png";
import WelcomeBg from '../../assets/images/WelcomeBg.webp'
import ThankyouBg from '../../assets/images/ThankyouBg.webp'
import { ItemsListHeader } from "../../components/Seller/MainPosScreen/ItemsLists/ItemsListHeader";
import { ItemList } from "../../components/Seller/MainPosScreen/ItemsLists/ItemList";
import { CircularProgress } from "@mui/material";

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
  const [paymentStatus, setPaymentStatus] = React.useState({})

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
      const payStatus = localStorage.getItem("processingPayment");
      if (discountRaw) {
        setDiscountData(JSON.parse(discountRaw));
      }
      if (customerData) {
        setCustomerDetails(JSON.parse(customerData));
      }
      if (payStatus) {
        console.log(payStatus, 'in the customer screen')
        setPaymentStatus({ ...JSON.parse(payStatus) });
      }

      const onStorage = (e) => {
        if (e.key === "ringUpsSnapshot" && e.newValue) {
          try {
            setSnapshot(JSON.parse(e.newValue));
          } catch { }
        }
        if (e.key === "discountSnapshot" && e.newValue) {
          try {
            setDiscountData(JSON.parse(e.newValue));
          } catch { }
        }
        if (e.key === "customerDetails" && e.newValue) {
          try {
            setCustomerDetails(JSON.parse(e.newValue));
          } catch { }
        }
        if (e.key === "processingPayment" && e.newValue) {
          try {
            setPaymentStatus({ ...JSON.parse(e.newValue) });
          } catch { }
        }
      };
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    } catch (e) { }
  }, []);




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
        product_image: item?.product_image
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
    <>
      {
        paymentStatus.status && (
          <>
            <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-sm z-50">
              <div className="flex flex-col gap-5 justify-center items-center">
                <CircularProgress size="8dvw" color="info" />
                <p className="mainFont font-semibold text-(--secondary-color) text-[1.5dvw] tracking-widest">
                  {
                    paymentStatus?.message
                  }
                </p>
              </div>
            </div>
          </>
        )
      }
      {
        paymentStatus?.message === 'Payment Done!' ? (
          <>
            <div className={`hidden md:flex w-full transition-all duration-300 ease-linear   flex-col items-center justify-center p-6 relative h-full`}>
              <div className="absolute  top-0 left-0 w-full h-full">
                <img src={ThankyouBg} className="w-full brightness-90 object-cover object-right h-full" alt="sell-sync" />
              </div>
              <h1 className="text-[2.5dvw] leading-[3.5dvw] relative mainFont font-bold my-5">Thank you from</h1>
              <div className="w-full max-w-[400px] relative">
                <img
                  src={SellsyncLogo}
                  alt="Sellsync"
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-[1.5dvw] leading-[3.5dvw] relative mainFont font-medium my-5">Please Visit Again ! 😊</p>
            </div>
          </>
        ) : (
          <>

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
                <div className={`hidden md:flex ${products.length > 0 ? 'w-2/5' : 'w-full'} transition-all duration-300 ease-linear   flex-col items-center justify-center p-6 relative`}>
                  <div className="absolute  top-0 left-0 w-full h-full">
                    <img src={WelcomeBg} className="w-full brightness-90 object-cover object-right h-full" alt="sell-sync" />
                  </div>
                  <h1 className="text-[2.5dvw] leading-[3.5dvw] relative mainFont font-bold my-5">Welcome to</h1>
                  <div className="w-full max-w-[400px] relative">
                    <img
                      src={SellsyncLogo}
                      alt="Sellsync"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* Right Side - Customer Details & Products */}
                <div className={`${products.length > 0 ? 'w-full md:w-3/5' : 'w-0'} flex flex-col overflow-hidden`}>
                  {/* Customer Info */}
                  <div className="bg-white border-b border-gray-200 p-4 sm:p-5">
                    <h3 className="text-[2dvw] mainFont font-extrabold text-[var(--mainText-color)] mb-2">
                      {customerDetails.customerName}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500 text-[1dvw] font-semibold mainFont decoration-1 underline underline-offset-4">EMAIL</p>
                        <p className="text-[var(--mainText-color)] text-[1.3dvw] font-medium truncate mainFont">
                          {customerDetails.customerEmail}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-[1dvw] font-semibold mainFont decoration-1 underline underline-offset-4">PHONE</p>
                        <p className="text-[var(--mainText-color)] text-[1.3dvw] font-medium mainFont">
                          {customerDetails.customerPhone}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-[1dvw] font-semibold mainFont decoration-1 underline underline-offset-4">Address</p>
                        <p className="text-[var(--mainText-color)] text-[1.3dvw] font-bold mainFont">
                          {customerDetails.customerAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Products List */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                    <h4 className="font-semibold text-[var(--mainText-color)]/70 mainFont mb-4 text-[1.5dvw]">
                      Order Items
                    </h4>
                    <div className="w-full">
                      <ItemsListHeader isCustomerScreen={true} />
                      <div className="flex flex-col gap-2 scrollCustom h-full overflow-y-auto justify-start items-center  mt-1.5">
                        {
                          products.map((cur, id) => (
                            <ItemList key={id}
                              id={id}
                              cur={cur} isCustomerScreen={true} />
                          ))
                        }
                      </div>
                    </div>

                  </div>

                  {/* Total Section */}
                  <div className="border-t border-gray-200 bg-gray-50 p-4 sm:p-5">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700 text-[1.2dvw] mainFont font-bold">Subtotal : -</span>
                        <span className="font-semibold text-[var(--mainText-color)] text-[1.2dvw] font-semibold mainFont">
                          $ {(
                            discountData.subtotal || parseFloat(calculateSubtotal())
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 text-[1.2dvw] mainFont font-bold">Tax:</span>
                        <span className="font-semibold text-[var(--mainText-color)] text-[1.2dvw] font-semibold mainFont">
                          $ {(discountData.tax || parseFloat(calculateTax())).toFixed(2)}
                        </span>
                      </div>
                      {discountData.discountAmount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-700 text-[1.2dvw] mainFont font-bold">
                            Discount (
                            {discountData.isPercentage
                              ? `${discountData.discount}%`
                              : `$${discountData.discount}`}
                            ):
                          </span>
                          <span className="font-semibold text-[var(--Negative-color)] text-[1.2dvw] font-semibold mainFont">
                            - $ {discountData.discountAmount.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between border-t pt-2 mt-2">
                        <span className="font-bold text-[var(--mainText-color)] text-[1.8dvw] font-semibold mainFont">
                          Total:
                        </span>
                        <span className="font-bold text-[var(--button-color1)] text-[1.8dvw] font-semibold mainFont">
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
          </>
        )
      }
    </>
  )




};

export default CustomerScreenPage;
