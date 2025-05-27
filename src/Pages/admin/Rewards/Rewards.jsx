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
// Core CSS
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
      editable: true,
    };
  }, []);
  return (
    <Layout>
      <div className="w-full">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Rewards
            </h3>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <div>
            <div className="bg-[#E6E6E6]  p-2 rounded-full w-auto  my-5 inline-flex gap-3">
              <button
                // onClick={() => handleChangeTab("Genral")}
                className={` ${
                  currentActiveTab === "LoyaltyPrograms"
                    ? "bg-white text-black"
                    : "bg-transparent text-[#333333]/70"
                } border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
              >
                Loyalty Programs
              </button>

              <button
                // onClick={() => handleChangeTab("BusinessInfo")}
                className={` ${
                  currentActiveTab === "LotteryInventory"
                    ? "bg-white text-black"
                    : "bg-transparent text-[#333333]/70"
                }   border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold`}
              >
                Lottery Inventory
              </button>
              <button
                // onClick={() => handleChangeTab("ScanData")}
                className={` ${
                  currentActiveTab === "LotteryReport"
                    ? "bg-white text-black"
                    : "bg-transparent text-[#333333]/70"
                }   border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold`}
              >
                Lottery Report
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center gap-4">
            <p className="paraFont font-semibold">Inventory Time</p>
            <select className="px-3 py-1.5 text-white rounded-full bg-[#333333]">
              <option>10 Mar - 10 Apr</option>
              <option>10 Mar - 10 Apr</option>
              <option>10 Mar - 10 Apr</option>
              <option>10 Mar - 10 Apr</option>
              <option>10 Mar - 10 Apr</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 w-full">
          <Overviewcards
            cardTitle=""
            cardValue="Scan product"
            icon={<ScanIcon />}
            bgColor="#0052CC"
          />
          <Overviewcards
            cardTitle="Lottery Items"
            cardValue="121"
            icon={<TicketIcon />}
          />
          <Overviewcards
            cardTitle="Lottery Won"
            cardValue="23"
            icon={<LotteryWonIcon />}
          />
          <Overviewcards
            cardTitle="Lottery Profit"
            cardValue="$450"
            icon={<LotteryProfitIcon />}
          />
        </div>

        <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[60dvh]">
          <div className="flex justify-between items-center py-1.5 shrink-0">
            <div className="flex justify-center items-center gap-3">
              <select className="font-[500] mainFont px-4 border-none outline-none">
                <option>All Lottery</option>
                <option>All Lottery</option>
                <option>All Lottery</option>
              </select>
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
    </Layout>
  );
};
