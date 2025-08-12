import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Overviewcards } from "../../../components/common/Overviewcards/Overviewcards";
import {
  DeleteIcon,
  FilterIcon,
  LotteryProfitIcon,
  LotteryWonIcon,
  ScanIcon,
  SortIcon,
  TicketIcon,
} from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Rewards = () => {
  const [currentActiveTab, setCurrentActiveTab] = useState("LotteryInventory");
  const [rowData, setRowData] = useState([
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
    {
      LotteryID: "#5465D2",
      Product: "Lorem ipsum dolor sit consectetur.",
      Description: "$500 Lucky Win",
      Date: "5 April 2025 7:40 PM",
      Tickets: "300",
      FirstTicket: "0",
      LastTicket: "80",
      Inventory: "60",
      Action: "View",
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "LotteryID" },
    { field: "Product" },
    { field: "Description" },
    { field: "Date" },
    { field: "Tickets" },
    { field: "FirstTicket" },
    { field: "LastTicket" },
    { field: "Inventory" },
    { field: "Action" },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: false,
    };
  }, []);

  return (
    <Layout>
      <div className="pb-14 w-full px-4 sm:px-6 lg:px-0 h-[calc(100vh-5rem)]" style={{ marginTop: 0 }}>
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
            <h3 className="text-2xl sm:text-3xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Rewards
            </h3>
            <div className="relative w-full sm:w-auto">
              <select className="appearance-none pl-4 pr-8 py-2 sm:py-1 bg-[var(--button-color2)] text-[var(--primary-color)] rounded-full font-[var(--paraFont)] text-sm sm:text-base w-full sm:w-auto cursor-pointer">
                <option>10 Mar - 10 Apr</option>
                <option>10 Mar - 10 Apr</option>
                <option>10 Mar - 10 Apr</option>
                <option>10 Mar - 10 Apr</option>
                <option>10 Mar - 10 Apr</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--primary-color)]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 mb-6 sm:mb-0">
          <div>
            <div className="bg-[#E6E6E6] p-2 rounded-full w-auto my-4 lg:my-5 inline-flex gap-3">
              <button
                // onClick={() => handleChangeTab("LoyaltyPrograms")}
                className={`${
                  currentActiveTab === "LoyaltyPrograms"
                    ? "bg-white text-black"
                    : "bg-transparent text-[#333333]/70"
                } border-none outline-none px-4 sm:px-6 lg:px-8 py-1 text-xs sm:text-sm lg:text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
              >
                Loyalty Programs
              </button>
              <button
                // onClick={() => handleChangeTab("LotteryInventory")}
                className={`${
                  currentActiveTab === "LotteryInventory"
                    ? "bg-white text-black"
                    : "bg-transparent text-[#333333]/70"
                } border-none outline-none px-4 sm:px-6 lg:px-8 py-1 text-xs sm:text-sm lg:text-[.9dvw] cursor-pointer rounded-full font-semibold`}
              >
                Lottery Inventory
              </button>
              <button
                // onClick={() => handleChangeTab("LotteryReport")}
                className={`${
                  currentActiveTab === "LotteryReport"
                    ? "bg-white text-black"
                    : "bg-transparent text-[#333333]/70"
                } border-none outline-none px-4 sm:px-6 lg:px-8 py-1 text-xs sm:text-sm lg:text-[.9dvw] cursor-pointer rounded-full font-semibold`}
              >
                Lottery Report
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full my-4 lg:my-3">
          <Overviewcards
            cardTitle=""
            cardValue="Scan product"
            icon={<ScanIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />}
            bgColor="#0052CC"
            className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
          />
          <Overviewcards
            cardTitle="Lottery Items"
            cardValue="121"
            icon={<TicketIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />}
            className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
          />
          <Overviewcards
            cardTitle="Lottery Won"
            cardValue="23"
            icon={<LotteryWonIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />}
            className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
          />
          <Overviewcards
            cardTitle="Lottery Profit"
            cardValue="$450"
            icon={<LotteryProfitIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />}
            className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
          />
        </div>

        <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[60dvh]">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
            <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
              <select className="font-[500] mainFont px-4 border-none outline-none text-xs sm:text-sm lg:text-base">
                <option>All Lottery</option>
                <option>All Lottery</option>
                <option>All Lottery</option>
              </select>
              <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                  242
                </p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4 justify-between items-center">
              <button className="flex justify-between items-center gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                Sort <SortIcon />
              </button>
              <button className="flex justify-between items-center gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
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
    </Layout>
  );
};