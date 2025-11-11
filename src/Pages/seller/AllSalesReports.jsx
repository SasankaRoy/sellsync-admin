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
      <div className="w-full p-6 overflow-y-auto">
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
        <div className="flex justify-center items-center gap-4">
          <div className="bg-red-400 flex-1 p-2">Table wrapper</div>
          <div className=" flex-1 p-2">
            <div className="border-b flex justify-start items-center gap-4 border-(--border-color) p-3">
              <PiggyBank  size={40} />
              <h3 className="text-[1.7dvw] font-semibold">
                Cash Reconciliation
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
