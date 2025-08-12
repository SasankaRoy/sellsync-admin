import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Scan } from "lucide-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const ScanTickets = () => {
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
    <Layout>
      <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
            <h3 className="text-2xl md:text-xl lg:text-[1.5dvw] font-semibold text-[var(--mainText-color)]">
              Instant Scan Tickets
            </h3>
            <div className="w-full sm:w-auto flex justify-center sm:justify-end">
              <button className="w-full sm:w-auto flex justify-center items-center gap-2 rounded-full bg-[var(--button-color1)] text-white mainFont px-6 py-3 sm:px-5 sm:py-2 lg:py-2 cursor-pointer text-base sm:text-sm sm:text-base lg:text-base hover:bg-[#F8A61B] transition-all duration-300">
                <Scan className="w-5 h-5 sm:w-5 sm:h-5" />
                Scan Now
              </button>
            </div>
          </div>
        </div>

        <div className="w-full border border-[#d4d4d4] p-3 sm:p-4 lg:p-5 rounded-md my-4 sm:my-5 lg:my-6 bg-white">
          <h3 className="text-lg sm:text-xl md:text-xl lg:text-[1.3dvw] font-semibold mb-3 sm:mb-4">Current Scan Data</h3>
          <div className="w-full h-[40vh] sm:h-[45vh] lg:h-[50vh] my-2 sm:my-3 lg:my-4">
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

        <div className="w-full border border-[#d4d4d4] p-3 sm:p-4 lg:p-5 rounded-md my-4 sm:my-5 lg:my-6 bg-white">
          <h3 className="text-lg sm:text-xl md:text-xl lg:text-[1.3dvw] font-semibold mb-3 sm:mb-4">Previous Data</h3>
          <div className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] my-2 sm:my-3 lg:my-4">
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
      </div>
    </Layout>
  );
};