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
      <div className="w-full flex justify-center  gap-5">
        <div className="flex-1 pb-16">
          <div className="flex justify-between items-center">
            <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Overview
            </h3>
            <select className="px-4 py-1 bg-[var(--button-color2)] text-[var(--primary-color)] rounded-full font-[var(--paraFont)]">
              <option>Weekly</option>
              <option>1 week</option>
              <option>2 week</option>
              <option>3 week</option>
              <option>4 week</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full my-6">
            <Overviewcards
              cardTitle="Sales"
              cardValue="32"
              percent="+14"
              icon={<OverviewCardIcon1 />}
            />
            <Overviewcards
              cardTitle="Refunds"
              cardValue="03"
              percent="-2"
              icon={<RefundIcon />}
            />
            <Overviewcards
              cardTitle="Net Sales Amount"
              cardValue="$5,456"
              percent="+4"
              icon={<NetsaleAmountIcon />}
            />
          </div>

          <div className="w-full h-[30dvh] flex justify-center items-center overflow-x-hidden">
            <Linechart aspectRatio={4} />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 w-full min-h-[25dvh] overflow-hidden my-2">
            <div className="flex justify-between items-center w-full p-3">
              <h3 className="text-[1.3dvw] font-[600]">Sales Stats</h3>
            </div>
            <div className="w-full h-full flex justify-center  gap-4">
              <div className="flex-1 shrink-0 flex flex-col gap-3 justify-center items-start  rounded-md bg-[var(--primary-color)] py-6 px-2 ">
                {saleData.map((cur, id) => (
                  <div
                    key={id}
                    className="flex  justify-between items-center w-[95%]"
                  >
                    <div className="flex justify-start gap-4 items-center">
                      <div
                        style={{
                          background: cur.color,
                        }}
                        className="w-[1dvw] h-[1dvw]  rounded-full"
                      />
                      <p className="font-semibold font-[var(--paraFont)] text-[1dvw] text-[var(--paraText-color)]">
                        {cur.name}
                      </p>
                    </div>
                    <h5 className="text-black font-medium text-[1dvw]">
                      ${cur.value}
                    </h5>
                  </div>
                ))}
              </div>
              <div className="flex-1 shrink-0 flex bg-[var(--primary-color)] rounded-md py-6 px-2 justify-center items-center h-full ">
                <Doughtchart aspectRatio={2} />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 w-full min-h-[25dvh] overflow-hidden my-2">
            <div className="flex justify-between items-center w-full p-3">
              <h3 className="text-[1.3dvw] font-[600]">Inventory Stats</h3>
            </div>
            <div className="w-full h-full flex justify-center  gap-4">
              <div className="flex-1 shrink-0 flex flex-col gap-3 justify-center items-start  rounded-md bg-[var(--primary-color)] py-6 px-2 ">
                {saleData.map((cur, id) => (
                  <div
                    key={id}
                    className="flex  justify-between items-center w-[95%]"
                  >
                    <div className="flex justify-start gap-4 items-center">
                      <div
                        style={{
                          background: cur.color,
                        }}
                        className="w-[1dvw] h-[1dvw]  rounded-full"
                      />
                      <p className="font-semibold font-[var(--paraFont)] text-[1dvw] text-[var(--paraText-color)]">
                        {cur.name}
                      </p>
                    </div>
                    <h5 className="text-black font-medium text-[1dvw]">
                      ${cur.value}
                    </h5>
                  </div>
                ))}
              </div>
              <div className="flex-1 shrink-0 flex bg-[var(--primary-color)] rounded-md py-6 px-2 justify-center items-center h-full ">
                <Doughtchart aspectRatio={2} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[27%] shrink-0">
        
          <div className="flex justify-between items-center">
            <h3 className="text-[1.1dvw] font-semibold text-[var(--mainText-color)]">
              Top Selling Items
            </h3>
            <button className="cursor-pointer bg-[var(--button-color2)] text-white px-4 py-1 rounded-full text-[1dvw] font-[var(--paraFont)] font-medium">
              See all
            </button>
          </div>

          <div className="w-full my-6 rounded-lg overflow-hidden border border-[#D4D4D4] bg-white">
            <div className="bg-[var(--button-color2)] text-white flex justify-center">
              <div className="flex-1 p-2 flex justify-start items-center ">
                <p>Product Name</p>
              </div>
              <div className="min-w-[20.5%] p-2 flex justify-center items-center border-r border-l border-[#D4D4D4]">
                <p>Quantity</p>
              </div>
              <div className="min-w-[20.5%] p-2 flex justify-center items-center">
                <p>Value</p>
              </div>
            </div>

            {[1, 2, 3, 4, 5].map((cur, id) => (
              <div
                key={id}
                className="w-full flex justify-center border-b border-[#D4D4D4]"
              >
                <div className="flex-1 p-2 flex justify-start items-center ">
                  <p className="text-[1.05dvw] line-clamp-2 text-[#7F7F7F] font-[var(--paraFont)]">
                    Budwiser Magnum 750ML
                  </p>
                </div>
                <div className="min-w-[25%]  flex justify-center items-center border-r border-l border-[#D4D4D4]">
                  <p className="font-semibold text-[#7F7F7F] font-[var(--paraFont)] text-[1.2dvw]">
                    12
                  </p>
                </div>
                <div className="min-w-[20%]  flex justify-center items-center">
                  <p className="font-semibold text-[#7F7F7F] font-[var(--paraFont)] text-[1.2dvw]">
                    $52
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-[#D4D4D4] rounded-md p-3 bg-white">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-[1.1dvw]">Low Stocks</h3>
              <button className="cursor-pointer bg-[var(--button-color2)] text-white px-4 py-1 rounded-full text-[1dvw] font-[var(--paraFont)] font-medium">
                See all
              </button>
            </div>

            <div className="flex flex-col gap-3 my-3">
              {[1, 2, 3].map((cur, id) => (
                <div
                  key={id}
                  className="w-full flex justify-start items-center gap-3"
                >
                  <div className="w-[3dvw] h-[3dvw]">
                    <img
                      className="w-full h-full object-cover"
                      src={ProductImg1}
                      alt="sellsync.com"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold font-[var(--paraFont)] text-[1dvw]">
                      Budwiser Magnum 750ML
                    </h4>
                    <p className="text-[.9dvw] font-medium text-[#333333] font-[var(--paraFont)]">
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
