import React from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Overviewcards } from "../../../components/common/Overviewcards/Overviewcards";
import {
  NetsaleAmountIcon,
  OverviewCardIcon1,
  RefundIcon,
} from "../../../assets/Svgs/AllSvgs";
import ProductImg1 from "../../../assets/images/ProductImg1.png";
import { Linechart } from "../../../components/common/charts/Linechart";
import { Doughtchart } from "../../../components/common/charts/Doughtchart";

const saleData = [
  {
    name: "Beer",
    value: "2,344",
    color: "#13A34B",
  },
  {
    name: "Gin",
    value: "2,004",
    color: "#0052CC",
  },
  {
    name: "Whiskey",
    value: "1,988",
    color: "#420088",
  },
  {
    name: "Rum",
    value: "1,540",
    color: "#00C7E6",
  },
  {
    name: "Scotch",
    value: "1,340",
    color: "#F59E0B",
  },
  {
    name: "Wine",
    value: "840",
    color: "#FACC15",
  },
];

export const AdminDashboard = () => {
  return (
    <Layout>
      <div className="w-full flex flex-col lg:flex-row justify-center gap-3 sm:gap-4 lg:gap-5 px-2 sm:px-4 md:px-6 lg:px-0">
        <div className="flex-1 pb-8 sm:pb-12 lg:pb-16">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Overview
            </h3>
            <select className="px-3 sm:px-4 md:px-5 py-2 sm:py-1 md:py-2 bg-[var(--button-color2)] text-[var(--primary-color)] rounded-full font-[var(--paraFont)] text-sm sm:text-base md:text-lg w-full sm:w-auto appearance-none bg-[right_0.5rem_center] bg-no-repeat pr-8 sm:pr-0 sm:appearance-auto">
              <option>Weekly</option>
              <option>1 week</option>
              <option>2 week</option>
              <option>3 week</option>
              <option>4 week</option>
            </select>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-2 w-full my-4 sm:my-6 lg:my-2">
            <Overviewcards
              cardTitle="Sales"
              cardValue="32"
              percent="+14"
              icon={<OverviewCardIcon1 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />}
              className="text-xl sm:text-base md:text-lg lg:text-[1.4dvw]"
            />
            <Overviewcards
              cardTitle="Refunds"
              cardValue="03"
              percent="-2"
              icon={<RefundIcon />}
              className="text-xl sm:text-base md:text-lg lg:text-[1.4dvw]"
            />
            <Overviewcards
              cardTitle="Net Sales Amount"
              cardValue="$5,456"
              percent="+4"
              icon={<NetsaleAmountIcon />}
              className="text-xl sm:text-base md:text-lg lg:text-[1.4dvw]"
            />
          </div>

          {/* Line Chart */}
          <div className="hidden sm:block w-full h-[25vh] sm:h-[28vh] md:h-[32vh] lg:h-[30dvh] flex justify-center items-center overflow-x-hidden mb-4 sm:mb-6 md:mb-8">
            <Linechart aspectRatio={window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 2.5 : 4} />
          </div>

          {/* Sales Stats */}
          <div className="flex flex-col justify-center items-center gap-2 w-full min-h-[20vh] sm:min-h-[22vh] md:min-h-[24vh] lg:min-h-[25dvh] overflow-hidden my-4 sm:my-6 md:my-8">
            <div className="flex justify-between items-center w-full p-2 sm:p-3 md:p-4">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3dvw] font-[600]">Sales Stats</h3>
            </div>
            <div className="w-full h-full flex flex-col md:flex-row lg:flex-row justify-center gap-3 sm:gap-4 md:gap-5">
              {/* Sales Data List */}
              <div className="flex-1 shrink-0 flex flex-col gap-2 sm:gap-3 md:gap-4 justify-center items-start rounded-md bg-[var(--primary-color)] py-4 sm:py-6 md:py-8 px-2 md:px-4">
                {saleData.map((cur, id) => (
                  <div
                    key={id}
                    className="flex justify-between items-center w-[95%]"
                  >
                    <div className="flex justify-start gap-2 sm:gap-3 md:gap-4 lg:gap-4 items-center">
                      <div
                        style={{
                          background: cur.color,
                        }}
                        className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-[1dvw] lg:h-[1dvw] rounded-full"
                      />
                      <p className="font-semibold font-[var(--paraFont)] text-base sm:text-base md:text-lg lg:text-[1dvw] text-[var(--paraText-color)]">
                        {cur.name}
                      </p>
                    </div>
                    <h5 className="text-black font-medium text-base sm:text-base md:text-lg lg:text-[1dvw]">
                      ${cur.value}
                    </h5>
                  </div>
                ))}
              </div>
              {/* Doughnut Chart */}
              <div className="flex-1 shrink-0 flex bg-[var(--primary-color)] rounded-md py-4 sm:py-6 md:py-8 px-2 md:px-4 justify-center items-center h-[200x] sm:h-[250px] md:h-[300px] lg:h-full">
                <Doughtchart aspectRatio={window.innerWidth < 640 ? 1.5 : window.innerWidth < 1024 ? 1.8 : 2} />
              </div>
            </div>
          </div>

          {/* Inventory Stats */}
          <div className="flex flex-col justify-center items-center gap-2 w-full min-h-[20vh] sm:min-h-[22vh] md:min-h-[24vh] lg:min-h-[25dvh] overflow-hidden my-4 sm:my-6 md:my-8">
            <div className="flex justify-between items-center w-full p-2 sm:p-3 md:p-4">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3dvw] font-[600]">Inventory Stats</h3>
            </div>
            <div className="w-full h-full flex flex-col md:flex-row lg:flex-row justify-center gap-3 sm:gap-4 md:gap-5">
              {/* Inventory Data List */}
              <div className="flex-1 shrink-0 flex flex-col gap-2 sm:gap-3 md:gap-4 justify-center items-start rounded-md bg-[var(--primary-color)] py-4 sm:py-6 md:py-8 px-2 md:px-4">
                {saleData.map((cur, id) => (
                  <div
                    key={id}
                    className="flex justify-between items-center w-[95%]"
                  >
                    <div className="flex justify-start gap-2 sm:gap-3 md:gap-4 lg:gap-4 items-center">
                      <div
                        style={{
                          background: cur.color,
                        }}
                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-[1dvw] lg:h-[1dvw] rounded-full"
                      />
                      <p className="font-semibold font-[var(--paraFont)] text-sm sm:text-base md:text-lg lg:text-[1dvw] text-[var(--paraText-color)]">
                        {cur.name}
                      </p>
                    </div>
                    <h5 className="text-black font-medium text-sm sm:text-base md:text-lg lg:text-[1dvw]">
                      ${cur.value}
                    </h5>
                  </div>
                ))}
              </div>
              {/* Doughnut Chart */}
              <div className="flex-1 shrink-0 flex bg-[var(--primary-color)] rounded-md py-4 sm:py-6 md:py-8 px-2 md:px-4 justify-center items-center h-[200px] sm:h-[250px] md:h-[300px] lg:h-full">
                <Doughtchart aspectRatio={window.innerWidth < 640 ? 1.5 : window.innerWidth < 1024 ? 1.8 : 2} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[27%] shrink-0 mt-6 lg:mt-0">
          {/* Top Selling Items */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6 md:mb-8">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.1dvw] font-semibold text-[var(--mainText-color)]">
              Top Selling Items
            </h3>
            <button className="cursor-pointer bg-[var(--button-color2)] text-white px-3 sm:px-4 md:px-5 py-2 sm:py-1 md:py-2 rounded-full text-sm sm:text-base md:text-lg lg:text-[1dvw] font-[var(--paraFont)] font-medium w-full sm:w-auto">
              See all
            </button>
          </div>

          {/* Top Selling Items Table */}
          <div className="w-full my-4 sm:my-6 md:my-8 rounded-lg overflow-hidden border border-[#D4D4D4] bg-white">
            <div className="bg-[var(--button-color2)] text-white flex justify-center">
              <div className="flex-1 p-2 sm:p-3 md:p-4 flex justify-start items-center">
                <p className="text-sm sm:text-base md:text-lg">Product Name</p>
              </div>
              <div className="min-w-[25%] sm:min-w-[20.5%] md:min-w-[22%] p-2 sm:p-3 md:p-4 flex justify-center items-center border-r border-l border-[#D4D4D4]">
                <p className="text-sm sm:text-base md:text-lg">Quantity</p>
              </div>
              <div className="min-w-[20%] sm:min-w-[20.5%] md:min-w-[22%] p-2 sm:p-3 md:p-4 flex justify-center items-center">
                <p className="text-sm sm:text-base md:text-lg">Value</p>
              </div>
            </div>

            {[1, 2, 3, 4, 5].map((cur, id) => (
              <div
                key={id}
                className="w-full flex justify-center border-b border-[#D4D4D4]"
              >
                <div className="flex-1 p-2 sm:p-3 md:p-4 flex justify-start items-center">
                  <p className="text-xs sm:text-sm md:text-base lg:text-[1.05dvw] line-clamp-2 text-[#7F7F7F] font-[var(--paraFont)]">
                    Budwiser Magnum 750ML
                  </p>
                </div>
                <div className="min-w-[25%] sm:min-w-[25%] md:min-w-[22%] flex justify-center items-center border-r border-l border-[#D4D4D4] p-2 sm:p-3 md:p-4">
                  <p className="font-semibold text-[#7F7F7F] font-[var(--paraFont)] text-sm sm:text-base md:text-lg lg:text-[1.2dvw]">
                    12
                  </p>
                </div>
                <div className="min-w-[20%] flex justify-center items-center p-2 sm:p-3 md:p-4">
                  <p className="font-semibold text-[#7F7F7F] font-[var(--paraFont)] text-sm sm:text-base md:text-lg lg:text-[1.2dvw]">
                    $52
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Low Stocks */}
          <div className="border border-[#D4D4D4] rounded-md p-3 sm:p-4 md:p-5 bg-white">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-3 sm:mb-4 md:mb-5">
              <h3 className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-[1.1dvw]">Low Stocks</h3>
              <button className="cursor-pointer bg-[var(--button-color2)] text-white px-3 sm:px-4 md:px-5 py-2 sm:py-1 md:py-2 rounded-full text-sm sm:text-base md:text-lg lg:text-[1dvw] font-[var(--paraFont)] font-medium w-full sm:w-auto">
                See all
              </button>
            </div>

            <div className="flex flex-col gap-3 md:gap-4 my-3 md:my-4">
              {[1, 2, 3].map((cur, id) => (
                <div
                  key={id}
                  className="w-full flex justify-start items-center gap-3 md:gap-4"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[3dvw] lg:h-[3dvw] flex-shrink-0">
                    <img
                      className="w-full h-full object-cover rounded"
                      src={ProductImg1}
                      alt="sellsync.com"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold font-[var(--paraFont)] text-sm sm:text-base md:text-lg lg:text-[1dvw] truncate">
                      Budwiser Magnum 750ML
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base lg:text-[.9dvw] font-medium text-[#333333] font-[var(--paraFont)]">
                      Out Of Stock
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};