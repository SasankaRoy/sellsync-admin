import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Linechart } from "../../../components/common/charts/Linechart";
import {
  BuyPriceIcon,
  DeleteIcon,
  FilterIcon,
  NetsaleAmountIcon,
  OverviewCardIcon1,
  ProfitIcon,
  RefundIcon,
  SortIcon,
} from "../../../assets/Svgs/AllSvgs";
import { Overviewcards } from "../../../components/common/Overviewcards/Overviewcards";
import { Doughtchart } from "../../../components/common/charts/Doughtchart";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

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

export const Reports = () => {
  const [rowData, setRowData] = useState([
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Reason: "Expired Item",
      Date: "03-03-25",
      Status: "Completed",
      Amount: "$4.00",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Reason: "Expired Item",
      Date: "03-03-25",
      Status: "Completed",
      Amount: "$4.00",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Reason: "Expired Item",
      Date: "03-03-25",
      Status: "Completed",
      Amount: "$4.00",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Reason: "Expired Item",
      Date: "03-03-25",
      Status: "Completed",
      Amount: "$4.00",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Reason: "Expired Item",
      Date: "03-03-25",
      Status: "Completed",
      Amount: "$4.00",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Reason: "Expired Item",
      Date: "03-03-25",
      Status: "Completed",
      Amount: "$4.00",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Reason: "Expired Item",
      Date: "03-03-25",
      Status: "Completed",
      Amount: "$4.00",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Reason: "Expired Item",
      Date: "03-03-25",
      Status: "Completed",
      Amount: "$4.00",
      Action: "View",
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "Products" },
    { field: "Reason" },
    { field: "Date" },
    { field: "Status" },
    { field: "Amount" },
    { field: "Action" },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: true,
    };
  }, []);
  return (
    <Layout>
      <div className="w-full flex justify-center gap-5">
        <div className="flex-1 shrink-0">
          <div className="flex justify-between items-center">
            <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Reports & Analytics
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
              cardTitle="Net Sales Amount"
              cardValue="$35,456"
              percent="+14"
              icon={<NetsaleAmountIcon />}
            />
            <Overviewcards
              cardTitle="Buy Price"
              cardValue="$25,000"
              percent="-2"
              icon={<BuyPriceIcon />}
            />
            <Overviewcards
              cardTitle="Profit"
              cardValue="$8,240"
              percent="+4"
              icon={<ProfitIcon />}
            />
          </div>

          <div className="w-full h-[30dvh] flex justify-center items-center overflow-x-hidden">
            <Linechart aspectRatio={4} />
          </div>

          <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[65dvh]">
            <div className="flex justify-between items-center py-1.5 shrink-0">
              <div className="flex justify-center items-center gap-3">
                <h3 className="text-[1.2dvw] font-[500]">Refund</h3>
                <p className="px-3 text-[1dvw] py-.5 bg-[#F8A61B] rounded-2xl font-[500] border-none text-white">
                  242
                </p>
              </div>
              <div className="flex gap-4 justify-center items-center">
                <button className="flex justify-center items-center gap-2 px-4 py-1 text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                  Sort <SortIcon />
                </button>
                <button className="flex justify-center items-center gap-2 px-4 py-1 text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                  Filter <FilterIcon />
                </button>
                <button>
                  <DeleteIcon />
                </button>
              </div>
            </div>
            <div className="h-full w-full">
              <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                // loading={loading}
                defaultColDef={defaultColDef}
                pagination={true}
                rowSelection={rowSelection}
                onSelectionChanged={(event) => console.log("Row Selected!")}
                onCellValueChanged={(event) =>
                  console.log(`New Cell Value: ${event.value}`)
                }
              />
            </div>
          </div>
        </div>

        <div className="w-[26%] shrink-0">
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

          <div className="my-5 bg-white rounded-md p-3">
            <div className="flex justify-between items-center">
              <h3 className="text-[1dvw] font-[500]">Most Sold Category</h3>
              <button className="bg-[#333333] text-white px-3 text-[.9dvw] cursor-pointer py-1 rounded-full">
                See all
              </button>
            </div>
            <div className="p-3 my-3">
              <div>
                <Doughtchart aspectRatio={1.5} />
              </div>
              <div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
