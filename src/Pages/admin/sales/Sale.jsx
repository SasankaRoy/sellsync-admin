import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Overviewcards } from "../../../components/common/Overviewcards/Overviewcards";
import {
  CostIcon,
  DeleteIcon,
  FilterIcon,
  ItemSoldIcon,
  NetsaleAmountIcon,
  ProfitIcon,
  SortIcon,
} from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Sale = () => {
  const [rowData, setRowData] = useState([
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      Customer: "Jack Smith",
      PaymentStatus: "Complete",
      Items: "12",
      Date: "5 April 2025 8:20 PM",
      Total: "$50",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      Customer: "Jack Smith",
      PaymentStatus: "Complete",
      Items: "12",
      Date: "5 April 2025 8:20 PM",
      Total: "$50",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      Customer: "Jack Smith",
      PaymentStatus: "Complete",
      Items: "12",
      Date: "5 April 2025 8:20 PM",
      Total: "$50",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      Customer: "Jack Smith",
      PaymentStatus: "Complete",
      Items: "12",
      Date: "5 April 2025 8:20 PM",
      Total: "$50",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      Customer: "Jack Smith",
      PaymentStatus: "Complete",
      Items: "12",
      Date: "5 April 2025 8:20 PM",
      Total: "$50",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      Customer: "Jack Smith",
      PaymentStatus: "Complete",
      Items: "12",
      Date: "5 April 2025 8:20 PM",
      Total: "$50",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      Customer: "Jack Smith",
      PaymentStatus: "Complete",
      Items: "12",
      Date: "5 April 2025 8:20 PM",
      Total: "$50",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      Customer: "Jack Smith",
      PaymentStatus: "Complete",
      Items: "12",
      Date: "5 April 2025 8:20 PM",
      Total: "$50",
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "Products" },
    { field: "Category" },
    { field: "Customer" },
    { field: "PaymentStatus" },
    { field: "Items" },
    { field: "Date" },
    { field: "Total" },
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
      <div className="pb-14 w-full">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Sales
            </h3>
            <select className="px-4 py-1 bg-[var(--button-color2)] text-[var(--primary-color)] rounded-full font-[var(--paraFont)]">
              <option>Weekly</option>
              <option>1 week</option>
              <option>2 week</option>
              <option>3 week</option>
              <option>4 week</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 w-full my-6">
          <Overviewcards
            cardTitle="Net Sales Amount"
            cardValue="$5,456"
            percent="+4"
            icon={<NetsaleAmountIcon />}
          />
          <Overviewcards
            cardTitle="Items Sold"
            cardValue="59"
            percent="-2"
            icon={<ItemSoldIcon />}
          />
          <Overviewcards
            cardTitle="Cost"
            cardValue="$4,216"
            percent="-4"
            icon={<CostIcon />}
          />
          <Overviewcards
            cardTitle="Profit"
            cardValue="$1,240"
            percent="+14"
            icon={<ProfitIcon />}
          />
        </div>

        <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[60dvh]">
          <div className="flex justify-between items-center py-1.5 shrink-0">
            <div className="flex justify-center items-center gap-3">
              <select className="font-[500] mainFont px-4 border-none outline-none">
                <option>All Products</option>
                <option>All Products</option>
                <option>All Products</option>
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
