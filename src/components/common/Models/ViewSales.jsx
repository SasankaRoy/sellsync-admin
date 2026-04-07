import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BadgeDollarSign,
  BaggageClaim,
  BanknoteArrowDown,
  Calendar,
  CircleX,
  CreditCard,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Loading } from "../../UI/Loading/Loading";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addNewItem, clearCart } from "../../../Redux/RingUpSlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  clearCurrentBill,
  setCurrentBill,
} from "../../../Redux/CurrentBillSlice";

import { handleBillStatusUpdate } from "../../../utils/apis/billStatusUpdate";
import { handleGetBillDetails } from "../../../utils/apis/getBillDetails";
import { getRefund } from "../../../utils/apis/getAllTransaction";
import { toast } from "react-toastify";

const tabPrefix = {
  amount: "AMOUNT",
  customer: "CUSTOMER",
  items: "ITEMS",
};

export const ViewSales = ({ setViewSale, billID, viewOnly = false }) => {
  const [currentActiveTab, setCurrentActiveTab] = useState(tabPrefix.amount);
  const [isOpenRefundModal, setIsOpenRefundModal] = useState(false);
  const dispatch = useDispatch();
  const currentBillId = useSelector((state) => state.currentBill.billId);
  const loggedUser = useSelector((state) => state.loggedUser);
  const router = useNavigate();
  const navigate = useLocation();
  const queryClient = useQueryClient();
  const userType = Cookies.get("u_type");
  const handleTabSwitch = (prefix) => {
    setCurrentActiveTab(prefix);
  };
  const handleTabRender = (currentPrefix, data) => {
    switch (currentPrefix) {
      case tabPrefix.amount:
        return <AmountTab billData={data} />;

      case tabPrefix.items:
        return <ItemsTab billData={data} />;

      case tabPrefix.customer:
        return <CustomerTab billData={data} />;

      default:
        return <AmountTab billData={data} />;
    }
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["get_bill_details", billID],
    queryFn: async () => await handleGetBillDetails(billID),
  });

  const handleCompleteTranscation = async () => {
    const reqUpdateBillStatus = await handleBillStatusUpdate(
      data._id || data.id,
      "OPEN",
    );

    if (reqUpdateBillStatus) {
      dispatch(clearCart());
      dispatch(clearCurrentBill());
      data.items.forEach((item) => {
        dispatch(
          addNewItem({
            id: item._id || item.productId._id || item.productId.id || item.id,
            name: item.productId.product_name,
            qty: item.qty,
            tax_percentage: item.taxRate,
            product_price: item.price,
            product_image: item.product_image,
            tax: item.taxAmount,
          }),
        );
      });

      dispatch(setCurrentBill({ billId: data._id || data.id }));
      router("/seller/dashboard");
      setViewSale({
        status: false,
        billId: null,
      });
      queryClient.invalidateQueries(["get_bill_details"]);
      localStorage.setItem(
        "processingPayment",
        JSON.stringify({
          state: false,
          message: "",
        }),
      );
      // toast.success("Transcation completed successfully");
    }
  };

  const handleCancelTranscation = async () => {
    const reqUpdateBillStatus = await handleBillStatusUpdate(
      billID,
      "CANCELLED",
    );
    if (reqUpdateBillStatus) {
      if (billID === currentBillId) dispatch(clearCurrentBill());
      dispatch(clearCart());
      setViewSale({
        status: false,
        billId: null,
      });
      queryClient.invalidateQueries(["get_bill_details"]);
    }
  };

  const handleStatusColor = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-(--button-color5)/20 text-(--button-color5)/90";
      case "HOLD":
        return "bg-(--button-color2)/20 text-(--button-color2)/90";
      case "REFUND":
        return "bg-(--Negative-color)/20 text-(--Negative-color)/90";
      case "CANCELLED":
        return "bg-(--Negative-color)/20 text-(--Negative-color)/90";
      default:
        return "bg-(--button-color5)/20 text-(--button-color5)/90";
    }
  };

  const handleRefundClick = () => {
    setIsOpenRefundModal(true);
  };

  const handleRefund = async (
    billId, //refundMode
  ) => {
    const reqRefund = await getRefund(billId);

    setIsOpenRefundModal(false);
    queryClient.invalidateQueries(["get_bill_details"]);
    queryClient.invalidateQueries(["get_all_transaction"]);

    toast.success("Refund request sent successfully");

    console.log(reqRefund);
  };

  return (
    <>
      {isLoading || isFetching ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
            <div className="w-full sm:min-w-[40%] sm:max-w-[70%] max-h-[90vh] sm:max-h-[95vh] overflow-y-auto scrollCustom bg-white sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 flex flex-col gap-6 relative">
              <div className="flex justify-between items-center w-full border-b border-gray-100 pb-4 mb-2">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 tracking-tight">
                  Bill Information
                </h3>
                <button
                  onClick={() => {
                    setViewSale({
                      status: false,
                      billId: null,
                    });
                  }}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 cursor-pointer"
                >
                  <CircleX size={26} />
                </button>
              </div>
              <div className="my-4">
                <div className="flex w-full mb-6 bg-gray-100 p-1 rounded-xl">
                  <button
                    onClick={() => handleTabSwitch(tabPrefix.amount)}
                    className={`flex-1 py-2.5 sm:py-3 px-4 font-semibold text-sm sm:text-base rounded-lg flex justify-center items-center gap-2 transition-all duration-300 cursor-pointer ${
                      currentActiveTab === tabPrefix.amount
                        ? "bg-white text-[var(--button-color1)] shadow-sm"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                    }`}
                  >
                    <BanknoteArrowDown size={18} />
                    <span className="hidden sm:inline">Amount & Payments</span>
                  </button>
                  <button
                    onClick={() => handleTabSwitch(tabPrefix.items)}
                    className={`flex-1 py-2.5 sm:py-3 px-4 font-semibold text-sm sm:text-base rounded-lg flex justify-center items-center gap-2 transition-all duration-300 cursor-pointer ${
                      currentActiveTab === tabPrefix.items
                        ? "bg-white text-[var(--button-color1)] shadow-sm"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                    }`}
                  >
                    <BaggageClaim size={18} />
                    <span className="hidden sm:inline">Products</span>
                  </button>
                  <button
                    onClick={() => handleTabSwitch(tabPrefix.customer)}
                    className={`flex-1 py-2.5 sm:py-3 px-4 font-semibold text-sm sm:text-base rounded-lg flex justify-center items-center gap-2 transition-all duration-300 cursor-pointer ${
                      currentActiveTab === tabPrefix.customer
                        ? "bg-white text-[var(--button-color1)] shadow-sm"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                    }`}
                  >
                    <Users size={18} />
                    <span className="hidden sm:inline">Customer</span>
                  </button>
                </div>
                <div className="transition-all duration-300 ease-linear">
                  {handleTabRender(currentActiveTab, data)}
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 p-4 sm:p-5 rounded-2xl">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wider">
                      Transaction Status
                    </span>
                    <h5
                      className={`text-sm sm:text-base font-bold inline-block w-max px-3 py-1 rounded-full ${handleStatusColor(
                        data.status,
                      )}`}
                    >
                      {data.status}
                    </h5>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wider">
                      Bill Date
                    </span>
                    <div className="flex items-center gap-2 text-gray-800">
                      <Calendar size={16} className="text-gray-400" />
                      <h5 className="text-sm sm:text-base font-bold line-clamp-1">
                        {moment(data.created_at).format("lll")}
                      </h5>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wider">
                      Biller Name
                    </span>
                    <h5 className="text-sm sm:text-base text-gray-800 font-bold line-clamp-1">
                      {data.created_by_user_name || "N/A"}
                    </h5>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wider">
                      Bill ID
                    </span>
                    <h5 className="text-sm sm:text-base text-gray-800 font-bold line-clamp-1">
                      {data._id || data.id}
                    </h5>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wider">
                      Device Name
                    </span>
                    <h5 className="text-sm sm:text-base text-gray-800 font-bold line-clamp-1">
                      {data.device_location || "N/A"}
                    </h5>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wider">
                      Location
                    </span>
                    <h5 className="text-sm sm:text-base text-gray-800 font-bold line-clamp-1">
                      {data.device_location || "N/A"}
                    </h5>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
                      Message / Note
                    </label>
                    <textarea
                      placeholder="Transcation Message...."
                      rows={3}
                      className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-200 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    ></textarea>
                    <button className="w-full py-3 font-semibold mainFont text-[1.1dvw] cursor-pointer bg-(--button-color1) text-white rounded-md">
                      Save Message
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center gap-4 my-3">
                {navigate.pathname !== "/seller/sales-report" &&
                  userType !== "admin" && (
                    <button
                      onClick={() => {
                        router(`/seller/sales-report`);
                      }}
                      className="w-full flex gap-4 justify-center items-center sm:w-auto px-6 py-2 bg-[var(--button-color1)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-200"
                    >
                      View Sales <BadgeDollarSign />
                    </button>
                  )}
                <button
                  onClick={() => {
                    setViewSale({
                      status: false,
                      billId: null,
                    });
                  }}
                  className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-200"
                >
                  Cancel
                </button>
                <button className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color2)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300">
                  {data.status === "PAID" ? "Reprint Bill" : "Print Bill"}
                </button>
                {data.status === "OPEN" && (
                  <button
                    disabled={
                      data.status === "PAID" ||
                      loggedUser?.id !== data?.created_by
                    }
                    onClick={handleCompleteTranscation}
                    className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Complete Transcation
                  </button>
                )}

                {data.status === "PAID" ? (
                  <>
                    {viewOnly ? (
                      ""
                    ) : (
                      <>
                        <button
                          onClick={handleRefundClick}
                          className="w-full sm:w-auto px-6 py-2 bg-[var(--Negative-color)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Refund
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {data.status === "OPEN" ||
                      (data.status === "HOLD" && (
                        <button
                          disabled={data.status === "PAID"}
                          onClick={handleCancelTranscation}
                          className="w-full sm:w-auto px-6 py-2 bg-[var(--Negative-color)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Cancel Transcation
                        </button>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {isOpenRefundModal && (
        <RefundModal
          setIsOpenRefundModal={setIsOpenRefundModal}
          onSelect={(mode) => {
            console.log("Selected Refund Mode:", mode);
            handleRefund(billID, mode);
            setIsOpenRefundModal(false);
          }}
        />
      )}
    </>
  );
};

const AmountTab = ({ billData }) => {
  const { summary } = billData;
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-2">
        <div className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-between">
          <span className="text-[0.8rem] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Sub-Total
          </span>
          <h5 className="text-lg sm:text-xl font-bold text-gray-800 mt-2">
            $ {summary?.subTotal.toFixed(2)}
          </h5>
        </div>
        <div className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-between">
          <span className="text-[0.8rem] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Discount
          </span>
          <h5 className="text-lg sm:text-xl font-bold text-[var(--button-color3)] mt-2">
            {summary?.discount.type === "FLAT" ? "$" : "%"}{" "}
            {summary?.discount.amount}.00
          </h5>
        </div>
        <div className="bg-[var(--button-color1)] border border-[var(--button-color1)] rounded-xl shadow-md p-4 flex flex-col justify-between text-white">
          <span className="text-[0.8rem] sm:text-xs font-semibold uppercase tracking-wider opacity-90">
            Total
          </span>
          <h5 className="text-xl sm:text-2xl font-bold mt-2">
            $ {summary?.grandTotal.toFixed(2)}
          </h5>
        </div>
      </div>
    </>
  );
};
const ItemsTab = ({ billData }) => {
  const { items } = billData;

  return (
    <>
      <div className="w-full border rounded-xl overflow-hidden shadow-sm bg-white">
        <div className="grid grid-cols-5 w-full bg-gray-50 border-b border-gray-200">
          <div className="flex justify-center items-center p-3 sm:py-4 border-r border-gray-200">
            <h5 className="font-semibold text-gray-500 text-xs sm:text-sm uppercase tracking-wider">QTY</h5>
          </div>
          <div className="flex justify-center items-center p-3 sm:py-4 border-r border-gray-200">
            <h5 className="font-semibold text-gray-500 text-xs sm:text-sm uppercase tracking-wider">Product</h5>
          </div>
          <div className="flex justify-center items-center p-3 sm:py-4 border-r border-gray-200">
            <h5 className="font-semibold text-gray-500 text-xs sm:text-sm uppercase tracking-wider">Tax</h5>
          </div>
          <div className="flex justify-center items-center p-3 sm:py-4 border-r border-gray-200">
            <h5 className="font-semibold text-gray-500 text-xs sm:text-sm uppercase tracking-wider">Price</h5>
          </div>
          <div className="flex justify-center items-center p-3 sm:py-4">
            <h5 className="font-semibold text-gray-500 text-xs sm:text-sm uppercase tracking-wider">Total</h5>
          </div>
        </div>
        <div className="w-full flex flex-col max-h-[30vh] md:max-h-[35vh] overflow-y-auto scrollCustom">
          {items.map((cur, id) => (
            <div
              key={id}
              className="grid grid-cols-5 w-full border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex justify-center items-center p-3 sm:py-4 border-r border-gray-100">
                <h5 className="font-semibold text-gray-800 text-sm sm:text-base">{cur.qty}</h5>
              </div>
              <div className="flex justify-center items-center p-3 sm:py-4 border-r border-gray-100 text-center">
                <h5 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2">
                  {cur.name || cur.productId?.name || cur.productId?.product_name || "Unknown Product"}
                </h5>
              </div>
              <div className="flex justify-center items-center p-3 sm:py-4 border-r border-gray-100">
                <h5 className="font-medium text-gray-600 text-sm sm:text-base">${cur.taxAmount}.00</h5>
              </div>
              <div className="flex justify-center items-center p-3 sm:py-4 border-r border-gray-100">
                <h5 className="font-medium text-gray-600 text-sm sm:text-base">${cur.price}.00</h5>
              </div>
              <div className="flex justify-center items-center p-3 sm:py-4">
                <h5 className="font-bold text-[var(--button-color1)] text-sm sm:text-base">${cur.total}.00</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
const CustomerTab = ({ billData }) => {
  const customerInfo = billData?.customerInfo;
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
        <div className="bg-white border rounded-xl p-4 flex flex-col gap-1 relative overflow-hidden group hover:border-[var(--button-color1)] transition-colors shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</span>
          <h3 className="text-base sm:text-lg font-bold text-gray-800">{customerInfo?.name || "N/A"}</h3>
        </div>
        <div className="bg-white border rounded-xl p-4 flex flex-col gap-1 relative overflow-hidden group hover:border-[var(--button-color1)] transition-colors shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</span>
          <h3 className="text-base sm:text-lg font-bold text-gray-800">{customerInfo?.phone || "N/A"}</h3>
        </div>
        <div className="bg-white border rounded-xl p-4 flex flex-col gap-1 relative overflow-hidden group hover:border-[var(--button-color1)] transition-colors shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</span>
          <h3 className="text-base sm:text-lg font-bold text-gray-800">{customerInfo?.email || "N/A"}</h3>
        </div>
        <div className="bg-white border rounded-xl p-4 flex flex-col gap-1 relative overflow-hidden group hover:border-[var(--button-color1)] transition-colors shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</span>
          <h3 className="text-base sm:text-lg font-bold text-gray-800">{customerInfo?.address || "N/A"}</h3>
        </div>
      </div>
    </>
  );
};

const RefundModal = ({ setIsOpenRefundModal, onSelect }) => {
  const refundOptions = [
    {
      id: 1,
      name: "Cash",
      icon: <BanknoteArrowDown size={50} />,
    },
    {
      id: 2,
      name: "Online or Bank Transfer",
      icon: <CreditCard size={50} />,
    },
  ];

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-screen flex justify-center items-center bg-(--mainText-color)/40 backdrop-blur-md">
      <div className="w-full sm:max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex justify-between items-center bg-(--sideMenu-color) text-white p-4">
          <h3 className="text-xl font-semibold text-white">
            Select Refund Option
          </h3>
          <button
            onClick={() => setIsOpenRefundModal(false)}
            className="hover:text-(--Negative-color) transition-colors cursor-pointer text-white"
          >
            <CircleX size={28} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4">
          {refundOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option.name)}
              className="group flex flex-col items-center justify-center gap-3 p-6 bg-(--border-color)/10 hover:bg-(--button-color1) rounded-xl hover:border-(--button-color1) transition-all duration-300 cursor-pointer border border-(--button-color3)"
            >
              <div className="text-(--button-color1) group-hover:text-white transition-colors">
                {option.icon}
              </div>
              <span className="text-[1.1dvw] mainFont font-bold text-(--mainText-color) group-hover:text-white transition-colors">
                {option.name}
              </span>
            </button>
          ))}
        </div>

        <div className="flex justify-end p-4 bg-gray-50 border-t">
          <button
            onClick={() => setIsOpenRefundModal(false)}
            className="px-6 py-2 bg-(--button-color4) text-white rounded-md font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
