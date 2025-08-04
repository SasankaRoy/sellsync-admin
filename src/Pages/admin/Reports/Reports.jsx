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
      {/* Desktop Layout */}
      <div className="hidden xl:flex w-full justify-center gap-5">
        <div className="flex-1 shrink-0">
          <div className="flex justify-between items-center">
            <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Reports & Analytics
            </h3>
            <div className="relative">
              <select className="appearance-none pl-4 pr-8 py-1 bg-[var(--button-color2)] text-[var(--primary-color)] rounded-full font-[var(--paraFont)] cursor-pointer">
                <option>Weekly</option>
                <option>1 week</option>
                <option>2 week</option>
                <option>3 week</option>
                <option>4 week</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--primary-color)]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-2 w-full my-6">
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
                <select className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-[1dvw]">
                  <option>Refund</option>
                </select>
                <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                  <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                    242
                  </p>
                </div>
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
                <div className="min-w-[25%] flex justify-center items-center border-r border-l border-[#D4D4D4]">
                  <p className="font-semibold text-[#7F7F7F] font-[var(--paraFont)] text-[1.2dvw]">
                    12
                  </p>
                </div>
                <div className="min-w-[20%] flex justify-center items-center">
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
                <div className="flex-1 shrink-0 flex flex-col gap-3 justify-center items-start rounded-md bg-[var(--primary-color)] py-6 px-2">
                  {saleData.map((cur, id) => (
                    <div
                      key={id}
                      className="flex justify-between items-center w-[95%]"
                    >
                      <div className="flex justify-start gap-4 items-center">
                        <div
                          style={{
                            background: cur.color,
                          }}
                          className="w-[1dvw] h-[1dvw] rounded-full"
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

      {/* Mobile and Tablet Layout */}
      <div className="block xl:hidden pb-14 w-full px-4 sm:px-6 lg:px-0">
        <div className="w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
            <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Reports & Analytics
            </h3>
            <div className="relative w-full sm:w-auto">
              <select className="appearance-none pl-4 pr-8 py-1 bg-[var(--button-color2)] text-[var(--primary-color)] rounded-full font-[var(--paraFont)] w-full sm:w-auto cursor-pointer">
                <option>Weekly</option>
                <option>1 week</option>
                <option>2 week</option>
                <option>3 week</option>
                <option>4 week</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--primary-color)]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Overviewcards
            cardTitle="Net Sales Amount"
            cardValue="$35,456"
            percent="+14"
            icon={<NetsaleAmountIcon />}
            className="w-full"
          />
          <Overviewcards
            cardTitle="Buy Price"
            cardValue="$25,000"
            percent="-2"
            icon={<BuyPriceIcon />}
            className="w-full"
          />
          <Overviewcards
            cardTitle="Profit"
            cardValue="$8,240"
            percent="+4"
            icon={<ProfitIcon />}
            className="w-full"
          />
        </div>

        {/* Line Chart - Hidden on mobile */}
        <div className="hidden md:flex w-full h-64 justify-center items-center overflow-x-hidden mb-6">
          <Linechart aspectRatio={2.5} />
        </div>

        {/* Top Selling Items */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
            <h3 className="text-lg font-semibold text-[var(--mainText-color)]">
              Top Selling Items
            </h3>
            <button className="cursor-pointer bg-[var(--button-color2)] text-white px-3 py-2 rounded-full text-sm font-[var(--paraFont)] font-medium w-full sm:w-auto">
              See all
            </button>
          </div>

          <div className="w-full rounded-lg overflow-hidden border border-[#D4D4D4] bg-white">
            <div className="bg-[var(--button-color2)] text-white flex">
              <div className="flex-1 p-3 flex justify-start items-center">
                <p className="text-sm font-medium">Product</p>
              </div>
              <div className="min-w-[20%] p-3 flex justify-center items-center border-l border-[#D4D4D4]">
                <p className="text-sm font-medium">Qty</p>
              </div>
              <div className="min-w-[20%] p-3 flex justify-center items-center border-l border-[#D4D4D4]">
                <p className="text-sm font-medium">Value</p>
              </div>
            </div>

            {[1, 2, 3, 4, 5].map((cur, id) => (
              <div
                key={id}
                className="w-full flex border-b border-[#D4D4D4]"
              >
                <div className="flex-1 p-3 flex justify-start items-center">
                  <p className="text-sm text-[#7F7F7F] font-[var(--paraFont)] line-clamp-2">
                    Budwiser Magnum 750ML
                  </p>
                </div>
                <div className="min-w-[20%] flex justify-center items-center border-l border-[#D4D4D4]">
                  <p className="font-semibold text-[#7F7F7F] font-[var(--paraFont)] text-sm">
                    12
                  </p>
                </div>
                <div className="min-w-[20%] flex justify-center items-center border-l border-[#D4D4D4]">
                  <p className="font-semibold text-[#7F7F7F] font-[var(--paraFont)] text-sm">
                    $52
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Sold Category */}
        <div className="bg-white rounded-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
            <h3 className="text-base font-medium">Most Sold Category</h3>
            <button className="bg-[#333333] text-white px-3 py-2 text-sm cursor-pointer rounded-full w-full sm:w-auto">
              See all
            </button>
          </div>
          <div className="my-3">
            <div className="mb-4">
              <Doughtchart aspectRatio={1.2} />
            </div>
            <div className="flex flex-col gap-3 justify-center items-start rounded-md bg-[var(--primary-color)] py-4 px-3">
              {saleData.map((cur, id) => (
                <div
                  key={id}
                  className="flex justify-between items-center w-full"
                >
                  <div className="flex justify-start gap-3 items-center">
                    <div
                      style={{
                        background: cur.color,
                      }}
                      className="w-3 h-3 rounded-full flex-shrink-0"
                    />
                    <p className="font-semibold font-[var(--paraFont)] text-sm text-[var(--paraText-color)]">
                      {cur.name}
                    </p>
                  </div>
                  <h5 className="text-black font-medium text-sm">
                    ${cur.value}
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Refund Table */}
        <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[75vh]">
          <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-full">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
              <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
                <h3 className="text-lg sm:text-base md:text-lg lg:text-[1.2dvw] font-[500]">Refund</h3>
                <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                  <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                    242
                  </p>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-4 justify-between items-center flex-wrap">
                <button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600] hover:text-white hover:bg-[#0052CC] transition-all duration-300 ease-linear">
                  Sort <SortIcon />
                </button>
                <button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC] hover:text-[#0052CC] hover:bg-white transition-all duration-300 ease-linear">
                  Filter <FilterIcon />
                </button>
                <button>
                  <DeleteIcon />
                </button>
              </div>
            </div>
            <div className="h-full w-full overflow-x-scroll overflow-y-auto">
              <div className="min-w-[800px] h-full">
                <AgGridReact
                  rowData={rowData}
                  columnDefs={colDefs}
                  defaultColDef={defaultColDef}
                  pagination={true}
                  rowSelection={rowSelection}
                  onSelectionChanged={(event) => console.log("Row Selected!")}
                  onCellValueChanged={(event) =>
                    console.log(`New Cell Value: ${event.value}`)
                  }
                  className="w-full h-full text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};