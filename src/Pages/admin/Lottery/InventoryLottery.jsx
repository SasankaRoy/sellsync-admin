import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
//import { Plus, PlusIcon, X } from "lucide-react";
import {PluseIcon} from "../../../assets/Svgs/AllSvgs";
import { Overviewcards } from "../../../components/common/Overviewcards/Overviewcards";

import {
  BuyPriceIcon,
  DeleteIcon,
  FilterIcon,
  SellPriceIcon,
  SortIcon,
  TotalInventoryIcon,
} from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const InventoryLottery = () => {
  const [showAddTicket, setShowAddTicket] = useState(false);
  const [rowData, setRowData] = useState([
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "ID" },
    { field: "CreatedBy" },
    { field: "DateAndTime" },
    { field: "Items" },
    { field: "Lotteries" },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: false,
    };
  }, []);
  return (
    <>
      <Layout>
        <div className="pb-14 w-full px-4 sm:px-6 lg:px-0 h-[calc(100vh-5rem)]" style={{ marginTop: 0 }}>
          <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
              <h3 className="text-2xl sm:text-3xl lg:text-[1.5dvw] font-semibold text-[var(--mainText-color)]">
                Lottery Inventory
              </h3>
              <div className="w-full sm:w-auto flex flex-col sm:flex-row justify-center sm:justify-end gap-2 sm:gap-5">
                <button
                  onClick={() => setShowAddTicket(true)}
                  className="w-full sm:w-auto px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-2 sm:gap-3 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                >
                  <PluseIcon /> Single Ticket
                </button>
                <button className="w-full sm:w-auto px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-3 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:opacity-80 transition-all duration-300 ease-linear">
                  <PluseIcon /> Import CSV
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full my-4 lg:my-6">
            <Overviewcards
              cardTitle="Total Ticketies"
              cardValue="12,500"
              percent="View"
              className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
              icon={<TotalInventoryIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />}
            />
            <Overviewcards
              cardTitle="Sold Ticketies"
              cardValue="6,000"
              percent="View"
              className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
              icon={<BuyPriceIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />}
            />
            <Overviewcards
              cardTitle="Ticketies In Stock"
              cardValue="6,500"
              percent="View"
              className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
              icon={<SellPriceIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />}
            />
          </div>

          <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[60dvh]">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
              <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
                <select className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-base">
                  <option>All Lotteries</option>
                </select>
                <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                  <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                    {rowData.length}
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
                  <DeleteIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="h-full w-full overflow-x-scroll overflow-y-auto">
              <div className="min-w-[800px] h-full">
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
                  className="w-full h-full text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
      {showAddTicket && <AddSignleTicket setShowAddTicket={setShowAddTicket} />}
    </>
  );
};

const AddSignleTicket = ({ setShowAddTicket }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
        <div className="bg-white w-[95%] sm:w-[80%] md:w-[90%] lg:w-[60%] p-4 sm:p-5 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center w-full p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.5dvw] font-semibold">Add Single Ticket</h3>
            <button
              onClick={() => setShowAddTicket(false)}
              className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
            >
              <X size={30} />
            </button>
          </div>

          <div className="flex flex-col gap-4 my-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-5">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                  Created By
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="text"
                  placeholder="Enter name.."
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-5">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                  Items
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="text"
                  placeholder="Enter name.."
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                  Lotteries
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  placeholder="Enter items.."
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-5">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                  Date & Time
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="datetime-local"
                  placeholder="Enter name.."
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-end items-center my-4">
            <button className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300">
              Save
            </button>
            <button className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color3)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};