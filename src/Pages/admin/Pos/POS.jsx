import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { DeleteIcon, FilterIcon, SortIcon } from "../../../assets/Svgs/AllSvgs";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const POS = () => {
  const [rowData, setRowData] = useState([
    {
      AllUser: "Michael Carter",
      'Date&Time': "5 April 2025 8:20 PM",
      Status: "Sale Complete",
      TransactionID: "#TXN-926585890000DRG",
      Amount: "$ 241.33",
      Actions: "View",     
    },    
    {
      AllUser: "Michael Carter",
      'Date&Time': "5 April 2025 8:20 PM",
      Status: "Sale Complete",
      TransactionID: "#TXN-926585890000DRG",
      Amount: "$ 241.33",
      Actions: "View",     
    },    
    {
      AllUser: "Michael Carter",
      'Date&Time': "5 April 2025 8:20 PM",
      Status: "Sale Complete",
      TransactionID: "#TXN-926585890000DRG",
      Amount: "$ 241.33",
      Actions: "View",     
    },    
    {
      AllUser: "Michael Carter",
      'Date&Time': "5 April 2025 8:20 PM",
      Status: "Sale Complete",
      TransactionID: "#TXN-926585890000DRG",
      Amount: "$ 241.33",
      Actions: "View",     
    },    
    {
      AllUser: "Michael Carter",
      'Date&Time': "5 April 2025 8:20 PM",
      Status: "Sale Complete",
      TransactionID: "#TXN-926585890000DRG",
      Amount: "$ 241.33",
      Actions: "View",     
    },    
    {
      AllUser: "Michael Carter",
      'Date&Time': "5 April 2025 8:20 PM",
      Status: "Sale Complete",
      TransactionID: "#TXN-926585890000DRG",
      Amount: "$ 241.33",
      Actions: "View",     
    },    
    {
      AllUser: "Michael Carter",
      'Date&Time': "5 April 2025 8:20 PM",
      Status: "Sale Complete",
      TransactionID: "#TXN-926585890000DRG",
      Amount: "$ 241.33",
      Actions: "View",     
    },    
    {
      AllUser: "Michael Carter",
      'Date&Time': "5 April 2025 8:20 PM",
      Status: "Sale Complete",
      TransactionID: "#TXN-926585890000DRG",
      Amount: "$ 241.33",
      Actions: "View",     
    },    
    {
      AllUser: "Michael Carter",
      'Date&Time': "5 April 2025 8:20 PM",
      Status: "Sale Complete",
      TransactionID: "#TXN-926585890000DRG",
      Amount: "$ 241.33",
      Actions: "View",     
    },    
    {
      AllUser: "Michael Carter",
      'Date&Time': "5 April 2025 8:20 PM",
      Status: "Sale Complete",
      TransactionID: "#TXN-926585890000DRG",
      Amount: "$ 241.33",
      Actions: "View",     
    },    
    {
      AllUser: "Michael Carter",
      'Date&Time': "5 April 2025 8:20 PM",
      Status: "Sale Complete",
      TransactionID: "#TXN-926585890000DRG",
      Amount: "$ 241.33",
      Actions: "View",     
    },    
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "AllUser" },
    { field: "Date&Time" },
    { field: "Status" },
    { field: "TransactionID" },
    { field: "Amount" },
    { field: "Actions" },
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
              POS
            </h3>
          </div>
        </div>

        <div className="bg-[#E6E6E6] p-2 rounded-full w-auto my-5 inline-flex gap-3">
          <button className="bg-white border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold">
            Journal
          </button>

          <button className="bg-transparent text-[#333333]/70 border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold">
            Deals
          </button>
          <button className="bg-transparent text-[#333333]/70 border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold">
            Receipt Settings
          </button>
          <button className="bg-transparent text-[#333333]/70 border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold">
            Customer Display Setting
          </button>
          <button className="bg-transparent text-[#333333]/70 border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold">
            EDI File
          </button>
          <button className="bg-transparent text-[#333333]/70 border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold">
            Categorries For The POS
          </button>
          <button className="bg-transparent text-[#333333]/70 border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold">
            Vendors
          </button>
        </div>

        <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[60dvh]">
          <div className="flex justify-between items-center py-1.5 shrink-0">
            <div className="flex justify-center items-center gap-3">
              <select className="font-[500] mainFont px-4 border-none outline-none">
                <option>All Journal</option>
                <option>All Journal</option>
                <option>All Journal</option>
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
