import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Download } from "lucide-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
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
      <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
          <h3 className="text-2xl sm:text-xl lg:text-[1.5dvw] font-[500] text-[var(--mainText-color)] w-full text-center sm:text-left sm:w-auto">
            Sales Reports
          </h3>
          <div className="w-full flex justify-center sm:block sm:w-auto">
            <button className="w-full sm:w-auto flex justify-center items-center gap-2 rounded-full bg-[var(--button-color5)] text-white mainFont px-6 py-3 sm:px-5 sm:py-2 cursor-pointer text-base sm:text-sm lg:text-base hover:opacity-90 transition-all duration-300">
              <Download size={20} className="w-5 h-5 sm:w-4 sm:h-4" />
              CSV
            </button>
          </div>
        </div>
        <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[60vh] sm:h-[70vh] lg:h-[85dvh]">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
            <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
              <select className="font-[500] mainFont px-3 sm:px-4 border-none outline-none appearance-none text-xs sm:text-sm lg:text-base">
                <option>All Lotteries</option>
              </select>
              <div className="h-6 w-6 sm:h-7 sm:w-7 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                  {rowData.length}
                </p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4 justify-between items-center flex-wrap">
              <button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                Sort <SortIcon className="w-4 h-4 sm:w-4 sm:h-4" />
              </button>
              <button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                Filter <FilterIcon className="w-4 h-4 sm:w-4 sm:h-4" />
              </button>
              <button aria-label="Delete selected entries">
                <DeleteIcon className="w-5 h-5" />
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