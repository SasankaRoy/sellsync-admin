import { useQuery } from "@tanstack/react-query";
import {
  BaggageClaim,
  BanknoteArrowDown,
  Calendar,
  CircleX,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import axiosInstance from "../../../utils/axios-interceptor";
import { Loading } from "../../UI/Loading/Loading";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addNewItem } from "../../../Redux/RingUpSlice";
import { useNavigate } from "react-router-dom";

const tabPrefix = {
  amount: "AMOUNT",
  customer: "CUSTOMER",
  items: "ITEMS",
};

export const ViewSales = ({ setViewSale, billID }) => {
  const [currentActiveTab, setCurrentActiveTab] = useState(tabPrefix.amount);
  const dispatch = useDispatch();
  const router = useNavigate();
  const handleTabSwitch = (prefix) => {
    setCurrentActiveTab(prefix);
  };
  const handleTabRender = (currentPrefix, data) => {
    switch (currentPrefix) {
      case tabPrefix.amount:
        return <AmountTab billData={data} />;
        break;
      case tabPrefix.items:
        return <ItemsTab billData={data} />;
        break;
      case tabPrefix.customer:
        return <CustomerTab billData={data} />;
        break;

      default:
        return <AmountTab billData={data} />;
        break;
    }
  };

  const handleGetBillDetails = async () => {
    try {
      const getBillDetails = await axiosInstance.get(`api/v1/bills/${billID}`);

      if (getBillDetails.status && getBillDetails.data) {
        return getBillDetails.data.bill;
      }
      return getBillDetails.data.bill || {};
    } catch (error) {
      console.log(error);
      return (
        error.message ||
        error.response.data.message ||
        "Failed to fetch bill details"
      );
    }
  };

  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["get_bill_details", billID],
    queryFn: handleGetBillDetails,
  });

  const handleCompleteTranscation = () => {
    dispatch(addNewItem({ ...data.items }));
    router("/seller/dashboard");
    setViewSale({
      status: false,
      billId: null,
    });
  };

  return (
    <>
      {isLoading || isFetching ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="fixed top-0 left-0 z-40 w-full h-screen flex justify-center items-center bg-(--mainText-color)/20 backdrop-blur-md">
            <div className="w-full sm:min-w-[25%] sm:max-w-[70%] max-h-[90vh] sm:max-h-[95%] overflow-y-auto scrollCustom bg-white rounded-md p-3 sm:p-4 lg:p-5 shadow-md">
              <div className="flex justify-between items-center w-full p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.5dvw] font-semibold">
                  View Bill Details
                </h3>
                <button
                  onClick={() => {
                    setViewSale({
                      status: false,
                      billId: null,
                    });
                  }}
                  className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
                >
                  <CircleX size={30} />
                </button>
              </div>
              <div className="my-4">
                <div className="grid grid-cols-3 w-full  ">
                  <button
                    onClick={() => {
                      handleTabSwitch(tabPrefix.amount);
                    }}
                    className={` p-3 font-semibold mainFont text-(--mainText-color)/70 cursor-pointer hover:bg-(--button-color1) hover:text-white   flex justify-center items-center ${
                      currentActiveTab === tabPrefix.amount &&
                      "bg-(--button-color1) text-white "
                    } gap-3 transition-all duration-300 ease-linear`}
                  >
                    <BanknoteArrowDown />
                    Amount and Payments
                  </button>
                  <button
                    onClick={() => {
                      handleTabSwitch(tabPrefix.items);
                    }}
                    className={` p-3 font-semibold mainFont text-(--mainText-color)/70 cursor-pointer hover:bg-(--button-color1) hover:text-white   flex justify-center ${
                      currentActiveTab === tabPrefix.items &&
                      "bg-(--button-color1) text-white "
                    } items-center gap-3 transition-all duration-300 ease-linear`}
                  >
                    <BaggageClaim />
                    Items/Products
                  </button>
                  <button
                    onClick={() => {
                      handleTabSwitch(tabPrefix.customer);
                    }}
                    className={` p-3 font-semibold mainFont text-(--mainText-color)/70 cursor-pointer hover:bg-(--button-color1) hover:text-white   flex justify-center ${
                      currentActiveTab === tabPrefix.customer &&
                      "bg-(--button-color1) text-white "
                    } items-center gap-3 transition-all duration-200 ease-linear`}
                  >
                    <Users />
                    Customer Info
                  </button>
                </div>
                <div className="transition-all duration-300 ease-linear">
                  {handleTabRender(currentActiveTab, data)}
                </div>
              </div>

              <div className=" border border-(--border-color) p-3 rounded-md">
                {/* <h3 className="font-semibold text-[1.3dvw]">OverViews : -</h3> */}
                <div className="grid grid-cols-3 my-3 border-b-2 border-(--border-color) pb-5">
                  <div className="flex justify-center items-center gap-5 border-r border-b border-(--border-color) p-4">
                    <span className="mainFont shrink-0 text-[.9dvw] text-(--mainText-color)/70 font-semibold">
                      Transcation Status :
                    </span>
                    <h5 className="text-[1dvw] shrink-0 font-bold text-(--button-color5)/90 bg-(--button-color5)/20 px-3 py-1 rounded">
                      {data.status}
                    </h5>
                  </div>
                  <div className="flex justify-center items-center gap-5 border-r border-b border-(--border-color) p-4">
                    <span className="mainFont shrink-0 text-[.9dvw] text-(--mainText-color)/70 font-semibold">
                      Bill Date :
                    </span>
                    <div className="flex shrink-0 justify-center items-center gap-2 overflow-hidden">
                      <Calendar />
                      <h5 className="text-[1dvw] font-bold line-clamp-1">
                        {moment(data.created_at).format("lll")}
                      </h5>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-5  border-b border-(--border-color) p-4">
                    <span className="mainFont shrink-0  text-[.9dvw] text-(--mainText-color)/70 font-semibold">
                      Biller Name:
                    </span>
                    <div className="flex shrink-0 justify-center items-center gap-2">
                      <h5 className="text-[1dvw] font-bold line-clamp-1">
                        Sasanka
                      </h5>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-5 border-r  border-(--border-color) p-4">
                    <span className="mainFont shrink-0 text-[.9dvw] text-(--mainText-color)/70 font-semibold">
                      Bill ID:
                    </span>
                    <div className="flex shrink-0 justify-center items-center gap-2 overflow-hidden">
                      <h5 className="text-[1dvw] font-bold line-clamp-1">
                        {data._id || data.id}
                      </h5>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-5 border-r  border-(--border-color) p-4">
                    <span className="mainFont text-[.9dvw] text-(--mainText-color)/70 font-semibold">
                      Device Name:
                    </span>
                    <div className="flex justify-center items-center gap-2">
                      <h5 className="text-[1dvw] font-bold ">
                        {data.device_location}
                      </h5>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-5   border-(--border-color) p-4">
                    <span className="mainFont text-[.9dvw] text-(--mainText-color)/70 font-semibold">
                      Address/Location:
                    </span>
                    <div className="flex justify-center items-center gap-2">
                      <h5 className="text-[1dvw] font-bold ">
                        {data.device_location}
                      </h5>
                    </div>
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
                  Print Bill
                </button>
                <button
                  onClick={handleCompleteTranscation}
                  className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
                >
                  Complete Transcation
                </button>
                <button className="w-full sm:w-auto px-6 py-2 bg-[var(--Negative-color)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300">
                  Remove Transcation
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const AmountTab = ({ billData }) => {
  const { summary } = billData;
  return (
    <>
      <div className="w-full grid grid-cols-3 border gap-2  border-(--button-color1)/90 p-5 rounded-b-md">
        <div className="bg-(--border-color)/30 rounded-sm shadow  py-3 border-(--border-color)">
          <div className="flex justify-around items-center gap-5 w-full overflow-hidden px-4 py-2">
            <span className="text-[1dvw] shrink-0 font-bold text-(--mainText-color)/70 mainFont tracking-wide">
              Sub-Total :-
            </span>
            <h5 className="text-[1dvw] shrink-0 font-semibold line-clamp-1">
              {" "}
              $ {summary.subTotal}.00
            </h5>
          </div>
        </div>
        <div className="bg-(--border-color)/30 rounded-sm shadow  py-3 border-(--border-color)">
          <div className="flex justify-around items-center gap-5 overflow-hidden px-4 py-2">
            <span className="text-[1dvw] shrink-0 font-bold text-(--mainText-color)/70 mainFont tracking-wide">
              Discount :-
            </span>
            <h5 className="text-[1dvw] shrink-0 line-clamp-1 font-semibold">
              {summary.discount.type === "FLAT" ? "$" : "%"}{" "}
              {summary.discount.amount}.00
            </h5>
          </div>
        </div>
        <div className=" bg-(--border-color)/30 rounded-sm shadow py-3 border-(--border-color)">
          <div className="flex justify-around items-center gap-5 overflow-hidden px-4 py-2">
            <span className="text-[1dvw] shrink-0 line-clamp-1 font-bold text-(--mainText-color)/70 mainFont tracking-wide">
              Total :-
            </span>
            <h5 className="text-[1dvw] shrink-0 line-clamp-1 font-semibold">
              {" "}
              $ {summary.grandTotal}.00
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};
const ItemsTab = ({ billData }) => {
  const { items } = billData;
  console.log(items);
  return (
    <>
      <div className="w-full border  border-(--button-color1)/90 p-1.5 rounded-md ">
        <div className="grid grid-cols-5 w-full border-b-2 border-(--button-color1)">
          <div className="flex justify-center items-center p-3 border-r border-(--border-color)">
            <h5 className="font-semibold text-(--mainText-color)/70 text-[1dvw]">
              QTY.
            </h5>
          </div>
          <div className="flex justify-center items-center p-3 border-r border-(--border-color)">
            <h5 className="font-semibold text-(--mainText-color)/70 text-[1dvw]">
              Product
            </h5>
          </div>
          <div className="flex justify-center items-center p-3 border-r border-(--border-color)">
            <h5 className="font-semibold text-(--mainText-color)/70 text-[1dvw]">
              Tax
            </h5>
          </div>
          <div className="flex justify-center items-center p-3 border-r border-(--border-color)">
            <h5 className="font-semibold text-(--mainText-color)/70 text-[1dvw]">
              Price
            </h5>
          </div>
          <div className="flex justify-center items-center p-3">
            <h5 className="font-semibold text-(--mainText-color)/70 text-[1dvw]">
              Total
            </h5>
          </div>
        </div>
        <div className="w-full flex flex-col">
          {items.map((cur, id) => (
            <div
              key={id}
              className="grid grid-cols-5 w-full border-b border-(--border-color)"
            >
              <div className="flex justify-center items-center p-3 border-r w-full border-(--border-color)">
                <h5 className="font-semibold text-(--mainText-color)/70 text-[1dvw]">
                  {cur.qty}
                </h5>
              </div>
              <div className="flex justify-center items-center p-3 border-r w-full border-(--border-color)">
                <h5 className="font-semibold text-(--mainText-color)/70 text-[1dvw] line-clamp-1">
                  {cur.name || cur.productId.name}
                </h5>
              </div>
              <div className="flex justify-center items-center p-3 border-r w-full border-(--border-color)">
                <h5 className="font-semibold text-(--mainText-color)/70 text-[1dvw]">
                  $ {cur.taxAmount}.00
                </h5>
              </div>
              <div className="flex justify-center items-center p-3 border-r w-full border-(--border-color)">
                <h5 className="font-semibold text-(--mainText-color)/70 text-[1dvw]">
                  $ {cur.price}.00
                </h5>
              </div>
              <div className="flex justify-center items-center p-3  w-full">
                <h5 className="font-semibold text-(--mainText-color)/70 text-[1dvw]">
                  $ {cur.total}.00
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
const CustomerTab = ({ data }) => {
  return (
    <>
      <div className="w-full grid grid-cols-2 gap-5 p-5 border border-(--button-color1) rounded-b-md">
        <div className="bg-(--border-color)/30 flex justify-start rounded-sm shadow gap-5 p-4 items-center">
          <span className="text-[1dvw] font-semibold mainFont text-(--mainText-color)/70">
            Name
          </span>
          <h3 className="font-semibold text-[1.2dvw] mainFont">Sasanka</h3>{" "}
        </div>
        <div className="bg-(--border-color)/30 flex justify-start rounded-sm shadow gap-5 p-4 items-center">
          <span className="text-[1dvw] font-semibold mainFont text-(--mainText-color)/70">
            Phone Number
          </span>
          <h3 className="font-semibold text-[1.2dvw] mainFont">9856325425</h3>{" "}
        </div>
        <div className="bg-(--border-color)/30 flex justify-start rounded-sm shadow gap-5 p-4 items-center">
          <span className="text-[1dvw] font-semibold mainFont text-(--mainText-color)/70">
            Email
          </span>
          <h3 className="font-semibold text-[1.2dvw] mainFont">
            sasanka.kyptronix@gmail.com
          </h3>{" "}
        </div>
        <div className="bg-(--border-color)/30 flex justify-start rounded-sm shadow gap-5 p-4 items-center">
          <span className="text-[1dvw] font-semibold mainFont text-(--mainText-color)/70">
            Address
          </span>
          <h3 className="font-semibold text-[1.2dvw] mainFont">Down town</h3>{" "}
        </div>
      </div>
    </>
  );
};
