import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Plus, X } from "lucide-react";
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
      editable: true,
    };
  }, []);
  return (
    <>
      <Layout>
        <div className="flex justify-between items-center  w-full">
          <h3 className="text-[1.5dvw] font-[500]">Lottery Inventory</h3>
          <div className="flex justify-center items-center gap-5">
            <button
              onClick={() => setShowAddTicket(true)}
              className="flex justify-center items-center gap-3 bg-[var(--button-color1)] text-white mainFont px-5 py-1.5 rounded-full cursor-pointer"
            >
              <Plus /> Single Ticket
            </button>
            <button className="flex justify-center items-center gap-3 bg-[var(--button-color5)] text-white mainFont px-5 py-1.5 rounded-full cursor-pointer">
              <Plus /> import CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 w-full my-6">
          <Overviewcards
            cardTitle="Total Ticketies"
            cardValue="12,500"
            percent="View"
            icon={<TotalInventoryIcon />}
          />
          <Overviewcards
            cardTitle="Sold Ticketies"
            cardValue="6,000"
            percent="View"
            icon={<BuyPriceIcon />}
          />
          <Overviewcards
            cardTitle="Ticketies In Stock"
            cardValue="6,500"
            percent="View"
            icon={<SellPriceIcon />}
          />
        </div>

        <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[65dvh]">
          <div className="flex justify-between items-center py-1.5 shrink-0">
            <div className="flex justify-center items-center gap-3">
              <select className="font-[500] mainFont px-4 border-none outline-none appearance-none">
                <option>All Lotteries</option>
              </select>
              <p className="px-3 text-[1dvw] py-.5 bg-[#F8A61B] rounded-2xl font-[500] border-none text-white">
                {rowData.length}
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
      </Layout>
      {showAddTicket && <AddSignleTicket setShowAddTicket={setShowAddTicket} />}
    </>
  );
};

const AddSignleTicket = ({ setShowAddTicket }) => {
  return (
    <>
      <div className="flex justify-center items-center z-50 fixed top-0 left-0 w-full h-screen backdrop-blur-xl">
        <div className="w-[60%] bg-white p-5 rounded-md shadow">
          <div className="w-full bg-[var(--sideMenu-color)] rounded-md flex justify-between items-center  text-white p-2">
            <h3 className="text-[1.5dvw] font-[500] ">Add Single Ticket</h3>
            <button
              onClick={() => setShowAddTicket(false)}
              className="cursor-pointer"
            >
              <X size={30} />
            </button>
          </div>

          <div className="flex flex-col gap-4 my-8">
            <div className="flex justify-between items-center gap-5">
              <div className="flex flex-col gap-2 w-full ">
                <label className="text-[1dvw] font-normal paraFont">
                  Created By
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="text"
                  placeholder="Enter name.."
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-5">
              <div className="flex flex-col gap-2 w-full ">
                <label className="text-[1dvw] font-normal paraFont">
                  Items
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="text"
                  placeholder="Enter name.."
                />
              </div>
              <div className="flex flex-col gap-2 w-full ">
                <label className="text-[1dvw] font-normal paraFont">
                  Lotteries
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  placeholder="Enter items.."
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-5">
              <div className="flex flex-col gap-2 w-full ">
                <label className="text-[1dvw] font-normal paraFont">
                  Date & Time
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="datetime-local"
                  placeholder="Enter name.."
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-5">
            <button className="bg-[var(--button-color5)] cursor-pointer px-5 mainFont font-[500] py-1.5 rounded-md text-white">
              Save
            </button>
            <button className="bg-[var(--button-color3)] cursor-pointer px-5 mainFont font-[500] py-1.5 rounded-md text-white">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
