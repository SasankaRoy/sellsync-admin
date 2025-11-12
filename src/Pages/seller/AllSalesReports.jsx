import React from "react";
import { SellerNavbar } from "../../components/common/Navbars/SellerNavbar";
import { ArrowLeft, BadgeDollarSign, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Overviewcards } from "../../components/common/Overviewcards/Overviewcards";

export const AllSalesReports = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <SellerNavbar />
      <div className="w-full p-6 overflow-y-auto h-[88vh]">
        <div className="w-full flex items-center gap-4">
          <button
            onClick={handleGoBack}
            className="flex items-center mainFont font-semibold border border-(--border-color) px-4 py-1.5 rounded-full gap-2 text-[1dvw] text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            <span className="p-1.5 flex justify-center items-center bg-(--button-color1) text-white rounded-full">
              <ArrowLeft size={20} />
            </span>
            Back to Tasks
          </button>
          <h3 className="text-[1.3dvw] font-[500]">Reports</h3>
        </div>
        <div className=" my-4 grid grid-cols-4 gap-4">
          <Overviewcards
            cardTitle="Total Sale"
            cardValue="20"
            percent="Up"
            className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
            icon={<BadgeDollarSign size={80} color="green" />}
          />
          <Overviewcards
            cardTitle="Refunded"
            cardValue="4"
            percent="Down"
            className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
            icon={<BadgeDollarSign size={80} color="green" />}
          />
          <Overviewcards
            cardTitle="Canceled"
            cardValue="2"
            percent="Up"
            className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
            icon={<BadgeDollarSign size={80} color="green" />}
          />
          <Overviewcards
            cardTitle="Tacking"
            cardValue="20"
            percent="Up"
            className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
            icon={<BadgeDollarSign size={80} color="green" />}
          />
        </div>
        <div className="flex justify-center gap-4">
          <div className="bg-red-400 flex-1 p-2">Table wrapper</div>
          <div className=" flex-1 p-2">
            <div className="border-b flex justify-start items-center gap-4 border-(--border-color) p-3">
              <PiggyBank size={40} />
              <h3 className="text-[1.7dvw] font-semibold">
                Cash Reconciliation
              </h3>
            </div>

            <div className="flex justify-start items-center my-4 gap-5 px-6">
              <p className="text-[1.1dvw] font-semibold paraFont">
                Starting Cash:
              </p>
              <input
                className="bg-(--secondary-color) text-[1.3dvw] px-3 py-1.5 outline-none border-none"
                placeholder="1000"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 border-b border-(--border-color) px-3 py-5">
              <div className="p-2 flex justify-start items-center gap-4 border border-(--border-color)/40 rounded">
                <h3 className="mainFont font-semibold text-[1.2dvw]">$100 :</h3>
                <input className="bg-(--secondary-color) px-3 py-1.5 rounded-sm" />
              </div>
              <div className="p-2 flex justify-start items-center gap-4 border border-(--border-color)/40 rounded">
                <h3 className="mainFont font-semibold text-[1.2dvw]">$50 :</h3>
                <input className="bg-(--secondary-color) px-3 py-1.5 rounded-sm" />
              </div>
              <div className="p-2 flex justify-start items-center gap-4 border border-(--border-color)/40 rounded">
                <h3 className="mainFont font-semibold text-[1.2dvw]">$20 :</h3>
                <input className="bg-(--secondary-color) px-3 py-1.5 rounded-sm" />
              </div>
              <div className="p-2 flex justify-start items-center gap-4 border border-(--border-color)/40 rounded">
                <h3 className="mainFont font-semibold text-[1.2dvw]">$10 :</h3>
                <input className="bg-(--secondary-color) px-3 py-1.5 rounded-sm" />
              </div>
              <div className="p-2 flex justify-start items-center gap-4 border border-(--border-color)/40 rounded">
                <h3 className="mainFont font-semibold text-[1.2dvw]">$5 :</h3>
                <input className="bg-(--secondary-color) px-3 py-1.5 rounded-sm" />
              </div>
              <div className="p-2 flex justify-start items-center gap-4 border border-(--border-color)/40 rounded">
                <h3 className="mainFont font-semibold text-[1.2dvw]">$2 :</h3>
                <input className="bg-(--secondary-color) px-3 py-1.5 rounded-sm" />
              </div>
              <div className="p-2 flex justify-start items-center gap-4 border border-(--border-color)/40 rounded">
                <h3 className="mainFont font-semibold text-[1.2dvw]">$1 :</h3>
                <input className="bg-(--secondary-color) px-3 py-1.5 rounded-sm" />
              </div>
              <div className="p-2 flex justify-start items-center gap-4 border border-(--border-color)/40 rounded">
                <h3 className="mainFont font-semibold text-[1.2dvw]">50c :</h3>
                <input className="bg-(--secondary-color) px-3 py-1.5 rounded-sm" />
              </div>
              <div className="p-2 flex justify-start items-center gap-4 border border-(--border-color)/40 rounded">
                <h3 className="mainFont font-semibold text-[1.2dvw]">25c :</h3>
                <input className="bg-(--secondary-color) px-3 py-1.5 rounded-sm" />
              </div>
              <div className="p-2 flex justify-start items-center gap-4 border border-(--border-color)/40 rounded">
                <h3 className="mainFont font-semibold text-[1.2dvw]">10c :</h3>
                <input className="bg-(--secondary-color) px-3 py-1.5 rounded-sm" />
              </div>
              <div className="p-2 flex justify-start items-center gap-4 border border-(--border-color)/40 rounded">
                <h3 className="mainFont font-semibold text-[1.2dvw]">5c :</h3>
                <input className="bg-(--secondary-color) px-3 py-1.5 rounded-sm" />
              </div>
              <div className="p-2 flex justify-start items-center gap-4 border border-(--border-color)/40 rounded">
                <h3 className="mainFont font-semibold text-[1.2dvw]">1c :</h3>
                <input className="bg-(--secondary-color) px-3 py-1.5 rounded-sm" />
              </div>
            </div>

            <div className="flex justify-start items-center my-4 gap-5 px-6">
              <p className="text-[1.1dvw] font-semibold paraFont">Total:</p>
              <input
                className="bg-(--secondary-color) text-[1.3dvw] px-3 py-1.5 outline-none border-none"
                placeholder="1000"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
