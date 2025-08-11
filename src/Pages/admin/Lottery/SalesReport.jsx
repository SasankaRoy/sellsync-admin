import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Download } from "lucide-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { DeleteIcon, FilterIcon, SortIcon } from "../../../assets/Svgs/AllSvgs";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const SalesReport = () => {
  const [rowData, setRowData] = useState([
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
      CustomerName: "John",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
      CustomerName: "John",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
      CustomerName: "John",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
      CustomerName: "John",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
      CustomerName: "John",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
      CustomerName: "John",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
      CustomerName: "John",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
      CustomerName: "John",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
      CustomerName: "John",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
      CustomerName: "John",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
      CustomerName: "John",
    },
    {
      ID: "#1279",
      CreatedBy: "John Doe",
      DateAndTime: "20.02.2024 @ 15:25",
      Items: "1",
      Lotteries: "150",
      CustomerName: "John",
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "ID" },
    { field: "CreatedBy" },
    { field: "CustomerName" },
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
    <Layout>
      <div className="flex justify-between items-center w-full">
        <h3 className="text-[1.5dvw] font-[500]">Sales Reports</h3>
        <button className="bg-[var(--button-color5)] text-white px-5 py-2 mainFont rounded-full font-[500] flex justify-center items-center gap-3 cursor-pointer">
          <Download />
          CSV
        </button>
      </div>
      <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[85dvh]">
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
  );
};
