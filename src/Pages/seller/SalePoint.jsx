import React, { useEffect, useState } from "react";
import { Minus, Plus, Search, Logs } from "lucide-react";
import { Switch, Tooltip } from "@mui/material";
// import Keyboard from "react-simple-keyboard";
// import "react-simple-keyboard/build/css/index.css";
import { AnimatePresence, motion } from "framer-motion";
import ProductImg1 from "../../assets/images/ProductImg1.png";
import { styled } from "@mui/material/styles";
import { Shortcuts } from "../../components/common/Models/Shortcuts";
import { CustomerDetailsModal } from "../../components/common/Models/CustomerDetailsModal";
import { CheckoutModal } from "../../components/common/Models/CheckoutModal";
import { SellerNavbar } from "../../components/common/Navbars/SellerNavbar";
import { useSelector } from "react-redux";

import { buildReceiptRequest } from "../../utils/receiptHelpers";
import { OnScreenKeyboard } from "../../components/UI/OnScreenKeyboard/OnScreenKeyboard";
import { SearchItemsInput } from "../../components/Seller/MainPosScreen/SearchItemsInput/SearchItemsInput";
import { ItemsListHeader } from "../../components/Seller/MainPosScreen/ItemsLists/ItemsListHeader";
import { ItemList } from "../../components/Seller/MainPosScreen/ItemsLists/ItemList";
import { useDeboune } from "../../hooks/useDebounce";
import {
  addNewItem,
  updateQty,
  updatePrice,
  clearCart,
} from "../../Redux/RingUpSlice";
import { useDispatch } from "react-redux";
import { PaymentOptions } from "../../components/common/Models/PaymentOptions";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios-interceptor";
import { toast } from "react-toastify";
import { ViewSales } from "../../components/common/Models/ViewSales";
import { clearCurrentBill } from "../../Redux/CurrentBillSlice";
import { handleBillStatusUpdate } from "../../utils/apis/billStatusUpdate";

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
  const [isOpenPaymentModel, setIsOpenPaymentModel] = useState(false);
  const currentRingUpData = useSelector((state) => state.ringUps);
  const currentBillId = useSelector((state) => state.currentBill.billId);
  const employeeDetails = useSelector((state) => state.loggedUser);
  const [viewBillDetails, setViewBillDetails] = useState({
    state: false,
    billId: null,
  });
  const dispatch = useDispatch();

  // Search states
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Keyboard input tracking
  const [activeInputField, setActiveInputField] = useState(null); // { type: 'search' | 'quantity' | 'price', itemId: null | id }
  const [keyboardInput, setKeyboardInput] = useState("");

  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [customerInfo, setCustomerInfo] = useState({});
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const hasItems = (currentRingUpData?.length || 0) > 0;

  const [discount, setDiscount] = useState(2.5);
  const [isPercentage, setIsPercentage] = useState(false);

  // Calculate values from currentRingUpData
  const subtotal =
    currentRingUpData?.reduce(
      (sum, item) => sum + item.qty * item.product_price,
      0
    ) || 0;
  const totalItems =
    currentRingUpData?.reduce((sum, item) => sum + item.qty, 0) || 0;
  const tax = 2.5; // You can calculate this from tax_percentage if needed
  const discountAmount = isPercentage ? subtotal * (discount / 100) : discount;
  const total = subtotal + tax - discountAmount;

  // Sync discount and tax data to localStorage for customer screen
  useEffect(() => {
    const discountData = {
      discount,
      isPercentage,
      discountAmount,
      tax,
      subtotal,
      total,
    };
    localStorage.setItem("discountSnapshot", JSON.stringify(discountData));
  }, [discount, isPercentage, discountAmount, tax, subtotal, total]);

  // const [layoutName, setLayoutName] = useState("default");
  const [input, setInput] = useState("");

  // Debounce callback for search
  const debounceCallback = useDeboune((results, error) => {
    if (error) {
      setSearchResults([]);
      setSearchError(error);
      setIsSearching(false);
    } else {
      setSearchResults(results || []);
      setSearchError("");
      setIsSearching(false);
    }
  }, 500);

  // Show punch in modal on first page load
  useEffect(() => {
    // Check if user has already punched in today
    const hasPunchedIn = sessionStorage.getItem("hasPunchedIn");
    if (!hasPunchedIn) {
      setShowPunchInModal(true);
      sessionStorage.setItem("hasPunchedIn", "true");
    }
  }, []);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      // touchscreen
      console.log("touchscreen");
      setIsKeyboardOpen(false);
    }
  }, [isKeyboardOpen]);

  // Sync keyboard input when active field changes
  useEffect(() => {
    if (activeInputField?.type === "search") {
      setKeyboardInput(input);
    } else if (activeInputField?.type === "quantity") {
      const item = currentRingUpData?.find(
        (item) => item.id === activeInputField.itemId
      );
      if (item) {
        setKeyboardInput(String(item.qty || ""));
      }
    } else if (activeInputField?.type === "price") {
      const item = currentRingUpData?.find(
        (item) => item.id === activeInputField.itemId
      );
      if (item) {
        setKeyboardInput(String(item.product_price || ""));
      }
    } else if (activeInputField?.type === "discount") {
      setKeyboardInput(String(discount || ""));
    } else if (activeInputField?.type === "customerName") {
      setKeyboardInput(String(customerInfo.name || ""));
    } else if (activeInputField?.type === "customerPhone") {
      setKeyboardInput(String(customerInfo.phone || ""));
    } else if (activeInputField?.type === "customerEmail") {
      setKeyboardInput(String(customerInfo.email || ""));
    } else if (activeInputField?.type === "customerAddress") {
      setKeyboardInput(String(customerInfo.address || ""));
    } else if (activeInputField?.type === "customerNotes") {
      setKeyboardInput(String(customerInfo.notes || ""));
    }
  }, [activeInputField, input, currentRingUpData, discount, customerInfo]);

  const onChange = (input) => {
    console.log("Input changed", input);
    setKeyboardInput(input);

    // Handle different input types based on active field
    if (!activeInputField) {
      setInput(input);
      // Trigger search with debounce
      if (input && input.trim().length > 0) {
        setIsSearching(true);
        setShowSearchResults(true);
        debounceCallback(input, "api/v1/product/shortcut-product-list");
      } else {
        setSearchResults([]);
        setIsSearching(false);
        setShowSearchResults(false);
        setSearchError("");
      }
    } else if (activeInputField.type === "search") {
      setInput(input);
      // Trigger search with debounce
      if (input && input.trim().length > 0) {
        setIsSearching(true);
        setShowSearchResults(true);
        debounceCallback(input, "api/v1/product/shortcut-product-list");
      } else {
        setSearchResults([]);
        setIsSearching(false);
        setShowSearchResults(false);
        setSearchError("");
      }
    } else if (activeInputField.type === "quantity") {
      // Handle quantity input - only allow digits
      if (!/^\d*$/.test(input) && input !== "") return;
      const parsed = parseInt(input, 10);
      if (!isNaN(parsed) && activeInputField.itemId) {
        dispatch(
          updateQty({
            id: activeInputField.itemId,
            qty: parsed,
          })
        );
      }
    } else if (activeInputField.type === "price") {
      // Handle price input - allow digits and decimal point
      if (!/^\d*\.?\d*$/.test(input) && input !== "") return;
      const parsed = parseFloat(input);
      if (!isNaN(parsed) && activeInputField.itemId) {
        dispatch(
          updatePrice({
            id: activeInputField.itemId,
            price: parsed,
          })
        );
      }
    } else if (activeInputField.type === "discount") {
      // Handle discount input - allow digits and decimal point
      if (!/^\d*\.?\d*$/.test(input) && input !== "") return;
      const parsed = parseFloat(input);
      if (!isNaN(parsed)) {
        setDiscount(Math.max(0, parsed));
      } else if (input === "") {
        setDiscount(0);
      }
    } else if (
      activeInputField.type === "customerName" ||
      activeInputField.type === "customerPhone" ||
      activeInputField.type === "customerEmail" ||
      activeInputField.type === "customerAddress" ||
      activeInputField.type === "customerNotes"
    ) {
      // Handle customer modal inputs - allow all characters
      // The actual form state is managed in CustomerDetailsModal
      // Keyboard just provides input display
    }
  };

  // Handle adding product to ring up
  const handleAddToRingUp = (product) => {
    console.log("Adding product to ring up:", product);
    dispatch(
      addNewItem({
        id: product.id || product._id,
        name: product.name || product.product_name,
        product_price: parseFloat(
          product.sale_price || product.price || product.product_avg_price || 0
        ),
        product_image: product.image || product.product_image || "",
        qty: 1,
        tax_percentage: product.tax_percentage || 0,
      })
    );
    // Clear search and keyboard state
    setInput("");
    setKeyboardInput("");
    setSearchResults([]);
    setShowSearchResults(false);
    setActiveInputField(null);
  };

  const handleCustomerSubmit = (data) => {
    setCustomerInfo(data);
    setShowCustomerModal(false);
    setIsOpenPaymentModel(true);
    // setShowCheckoutModal(true);
    // Place any payment trigger here if needed, keeping existing flow unchanged
  };

  const handlePaymentMethod = (method) => {
    if (!method) return toast.error("Please select a payment method");

    switch (method) {
      case "Cash":
        setSelectedPaymentMethod(method);
        setShowCheckoutModal(true);
        setIsOpenPaymentModel(false);

        break;

      default:
        break;
    }
  };

  // hold order all functions

  const createPayload = (state = []) => {
    const payload = [];
    state.forEach((item) => {
      payload.push({
        productId: item.id,
        name: item.name,
        qty: item.qty,
        price: item.product_price,
        taxRate: 5,
        taxAmount: 12,
        total: item.qty * item.product_price,
      });
    });

    return payload;
  };

  const handleHoldOrder = async (payload) => {
    try {
      const holdOrder = await axiosInstance.post("/api/v1/bills/create", {
        ...payload,
      });
      if (holdOrder.data || holdOrder.status === 200) {
        dispatch(clearCart());
        localStorage.setItem(
          "pre_or_id",
          holdOrder.data.bill._id || holdOrder.data.bill.id
        );
        toast.success("Order On Hold");
      }
    } catch (error) {
      console.log("🚀 ~ handleHoldOrder ~ error:", error);
      return error.message || error.response.data.message;
    }
  };
  const { mutate, isError, isPending } = useMutation({
    mutationFn: handleHoldOrder,
  });

  const getPreviousOrder = async () => {
    const previousOrderId = localStorage.getItem("pre_or_id");

    if (!previousOrderId) return toast.error("No Orders Found !");

    setViewBillDetails({
      state: true,
      billId: previousOrderId,
    });
  };

  const handleCheckout = async (method, checkoutData) => {
    const checkoutPayload = {
      timestamp: new Date().toISOString(),
      metadata: {
        storeId: "Store T25",
        posTerminalId: "POS Terminal T25",
        employeeId: employeeDetails?.id,
        employeeName: employeeDetails?.name,
        business_id: employeeDetails?.business_id,
      },
      status: "PAID",
      items: createPayload(currentRingUpData),
      customerInfo: {
        name: checkoutData.customerInfo.name,
        phone: checkoutData.customerInfo.phone,
        email: checkoutData.customerInfo.email,
        address: checkoutData.customerInfo.address,
        notes: checkoutData.customerInfo.notes,
      },
      payment: {
        totalItems: totalItems,
        subTotal: subtotal,
        taxTotal: tax,
        discount: discountAmount,
        grandTotal: total,
        discount: {
          type: isPercentage ? "PERCENT" : "FLAT",
          value: isPercentage && discount,
          amount: discountAmount,
        },
        method: method,
        tendered: checkoutData.tendered,
        change: checkoutData.change,
        emailReceipt: checkoutData.emailReceipt,
        cardLast4: method === "card" ? checkoutData.cardLast4 : "",
        cardBrand: method === "card" ? checkoutData.cardBrand : "",
        transactionReference:
          method === "card" ? checkoutData.transactionReference : undefined,
      },
      receipt: {
        emailReceipt: checkoutData.emailReceipt,
        printReceipt: false,
        format: "pdf",
      },
    };
    console.log("handleCheckout", checkoutPayload);
  };

  return (
    <>
      <SellerNavbar />
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsKeyboardOpen(false);
          setShowSearchResults(false);
          setActiveInputField(null);
          setKeyboardInput("");
        }}
        className="flex justify-center items-center gap-4 h-[88vh]"
      >
        <div className="flex-1  h-full relative overflow-hidden">
          <div className=" flex flex-col h-full gap-5 justify-center items-center w-full  p-4">
            <div className="flex justify-between items-center w-full">
              <SearchItemsInput
                input={input}
                onchange={onChange}
                setIsKeyboardOpen={setIsKeyboardOpen}
                searchResults={searchResults}
                isSearching={isSearching}
                searchError={searchError}
                showSearchResults={showSearchResults}
                onSelectProduct={handleAddToRingUp}
                setActiveInputField={setActiveInputField}
              />
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
              <ItemsListHeader />
              {/* list header end */}

              {/* item list start */}
              <div className="flex flex-col gap-2 scrollCustom h-[100%] overflow-y-auto justify-start items-center  mt-1.5">
                {currentRingUpData?.map((cur, id) => (
                  <>
                    <ItemList
                      key={id}
                      id={id}
                      cur={cur}
                      setIsKeyboardOpen={setIsKeyboardOpen}
                      setActiveInputField={setActiveInputField}
                      keyboardInput={keyboardInput}
                      activeInputField={activeInputField}
                    />
                  </>
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
                  Discount Type ({isPercentage ? "%" : "$"}) -
                </lable>
                <MaterialUISwitch
                  checked={isPercentage}
                  onChange={(e) => setIsPercentage(e.target.checked)}
                />
              </div>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-[1.2dvw] mainFont font-semibold text-(--paraText-color)">
                  Total Items :
                </p>
                <strong className="text-[1.5dvw] paraFont font-semibold">
                  {totalItems}
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[1.2dvw] mainFont font-semibold text-(--paraText-color)">
                  SubTotal :
                </p>
                <strong className="text-[1.5dvw] paraFont font-semibold">
                  $ {subtotal.toFixed(2)}
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[1.2dvw] mainFont font-semibold text-(--paraText-color)">
                  Tax :
                </p>
                <strong className="text-[1.5dvw] paraFont font-semibold text-(--Negative-color)">
                  $ {tax.toFixed(2)}
                </strong>
              </div>

              <div className="flex justify-between items-center  border-b border-(--border-color) pb-4">
                <p className="text-[1.2dvw] mainFont font-semibold text-(--paraText-color)">
                  Discount ({isPercentage ? "%" : "$"}) :
                </p>
                <input
                  type="text"
                  placeholder={isPercentage ? "%" : "$"}
                  value={
                    activeInputField?.type === "discount"
                      ? keyboardInput
                      : isPercentage
                      ? `${discount}%`
                      : `$ ${discount.toFixed(2)}`
                  }
                  onFocus={(e) => {
                    e.stopPropagation();
                    setIsKeyboardOpen(true);
                    setActiveInputField({ type: "discount", itemId: null });
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Ensure active field is set even if keyboard is already open
                    setIsKeyboardOpen(true);
                    setActiveInputField({ type: "discount", itemId: null });
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Remove currency/percentage symbols and spaces, then parse the number
                    const cleanedValue = value
                      .replace(/[%$]/g, "")
                      .replace(/\s/g, "")
                      .trim();
                    const numericValue = parseFloat(cleanedValue) || 0;
                    // Ensure non-negative values
                    setDiscount(Math.max(0, numericValue));
                  }}
                  className="w-[20%] text-center outline-none text-[1.5dvw] mainFont font-semibold border-(--border-color) py-2 bg-transparent paraFont appearance-none border-b "
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[1.6dvw] mainFont font-semibold text-(--paraText-color)">
                  Total :
                </p>
                <strong className="text-[2dvw] paraFont font-semibold text-(--Positive-color)">
                  $ {total.toFixed(2)}
                </strong>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center gap-3">
              <button
                className={`w-1/2 py-4 text-[1.2dvw] mainFont font-semibold rounded-md ${
                  hasItems
                    ? "bg-(--button-color5) text-(--primary-color)"
                    : "bg-(--button-color5)/40 text-(--primary-color)/60 cursor-not-allowed"
                }`}
                disabled={!hasItems}
                onClick={() => {
                  if (!hasItems) return;
                  setShowCustomerModal(true);
                }}
              >
                Pay $ {total.toFixed(2)}
              </button>
              <button
                onClick={() => {
                  dispatch(clearCart());
                  dispatch(clearCurrentBill());
                }}
                className="w-1/2 py-4 text-[1.2dvw] mainFont font-semibold bg-(--Negative-color) text-(--primary-color) rounded-md"
              >
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
                <button
                  disabled={currentRingUpData.length === 0}
                  onClick={async () => {
                    if (currentRingUpData.length === 0) {
                      return toast.warn("No checkout products/tems found");
                    }
                    if (currentBillId) {
                      await handleBillStatusUpdate(currentBillId, "HOLD");
                      return dispatch(clearCart());
                    }
                    mutate({
                      status: "HOLD",
                      device_location: "Device T25",
                      items: createPayload(currentRingUpData),
                      summary: {
                        totalItems: totalItems,
                        subTotal: subtotal,
                        taxTotal: tax,
                        discount: {
                          type: isPercentage ? "PERCENT" : "FLAT",
                          value: isPercentage && discount,
                          amount: discountAmount,
                        },
                        grandTotal: total,
                      },
                      business_id: employeeDetails?.business_id,
                      created_by: employeeDetails?.id,
                    });
                  }}
                  className="bg-(--button-color2) cursor-pointer text-(--primary-color) py-3 mainFont font-semibold rounded-md disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-80"
                >
                  Hold Order
                </button>
                <button
                  onClick={getPreviousOrder}
                  className="bg-(--button-color1) cursor-pointer text-(--primary-color) py-3 mainFont font-semibold rounded-md"
                >
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
          <OnScreenKeyboard
            Change={onChange}
            inputValue={keyboardInput}
            layoutName={
              activeInputField?.type === "quantity" ||
              activeInputField?.type === "price" ||
              activeInputField?.type === "discount"
                ? "numeric"
                : "default"
            }
          />
        </AnimatePresence>
      )}
      <CustomerDetailsModal
        open={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        onSubmit={handleCustomerSubmit}
        defaultValues={customerInfo}
        setIsKeyboardOpen={setIsKeyboardOpen}
        setActiveInputField={setActiveInputField}
        keyboardInput={keyboardInput}
        activeInputField={activeInputField}
        onchange={onChange}
      />
      {isOpenPaymentModel && (
        <PaymentOptions
          setIsOpenPaymentModel={setIsOpenPaymentModel}
          onSelecte={handlePaymentMethod}
        />
      )}
      <CheckoutModal
        open={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        customerInfo={customerInfo}
        summary={{
          subtotal,
          tax,
          discount: discountAmount,
          total,
          totalItems,
        }}
        onPay={(method, checkoutData) => {
          // hook for payment handling; keeping flow unchanged
          console.log("Pay via:", {
            method,
            customerInfo,
            currentRingUpData,
            checkoutData,
          });

          handleCheckout(method, checkoutData);

          // Generate and log sample receipt request object
          // const receiptRequest = buildReceiptRequest(
          //   currentRingUpData,
          //   customerInfo,
          //   {
          //     subtotal,
          //     tax,
          //     discount: discountAmount,
          //     total,
          //     totalItems,
          //   },
          //   method
          // );

          // console.log("📧 Receipt Request Object:", receiptRequest);
          // console.log(
          //   "📧 Receipt Request JSON:",
          //   JSON.stringify(receiptRequest, null, 2)
          // );

          // setShowCheckoutModal(false);
        }}
      />
      {viewBillDetails.state && viewBillDetails.billId && (
        <ViewSales
          billID={viewBillDetails.billId}
          setViewSale={setViewBillDetails}
        />
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
