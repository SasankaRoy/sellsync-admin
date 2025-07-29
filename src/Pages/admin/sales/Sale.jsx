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
      <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">

        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
            <h3 className="text-2xl sm:text-3xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Sales
            </h3>
            <div className="relative w-full sm:w-auto max-w-xs">
              <select className="appearance-none px-4 py-1 bg-[var(--button-color2)] text-[var(--primary-color)] rounded-full font-[var(--paraFont)] text-sm sm:text-base w-full pr-8 sm:pr-4">
                <option>Weekly</option>
                <option>1 week</option>
                <option>2 week</option>
                <option>3 week</option>
                <option>4 week</option>
              </select>
              <div className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--primary-color)]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full my-6">
          <Overviewcards
            cardTitle="Net Sales Amount"
            cardValue="$5,456"
            percent="+4"
            icon={<NetsaleAmountIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12" />}
          />
          <Overviewcards
            cardTitle="Items Sold"
            cardValue="59"
            percent="-2"
            icon={<ItemSoldIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12" />}
          />
          <Overviewcards
            cardTitle="Cost"
            cardValue="$4,216"
            percent="-4"
            icon={<CostIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12" />}
          />
          <Overviewcards
            cardTitle="Profit"
            cardValue="$1,240"
            percent="+14"
            icon={<ProfitIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12" />}
          />
        </div>

        <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[60dvh]">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
            <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
              <select className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-base">
                <option>All Products</option>
                <option>All Products</option>
                <option>All Products</option>
              </select>
              <p className="px-3 text-sm lg:text-[1dvw] py-1 bg-[#F8A61B] rounded-2xl font-[500] border-none text-white">
                242
              </p>
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
  );
};