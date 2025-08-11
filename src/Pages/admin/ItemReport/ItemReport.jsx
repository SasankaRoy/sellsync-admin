import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { FilterIcon, PluseIcon, SortIcon } from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { CircleX, Edit, Eye, Plus, Trash } from "lucide-react";
import { SalesLinechart } from "../../../components/common/charts/SalesLinechart";

ModuleRegistry.registerModules([AllCommunityModule]);
const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

const DetailsTab = () => {
  const [rowData, setRowData] = useState([
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      ItemType: "Free Item",
      ItemsSold: "250",
      TotalAmount: "$5000",
      InStock: "1000",
      Date: "12/05/2025",
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "ID" },
    { field: "ProductName" },
    { field: "ItemType" },
    { field: "ItemsSold" },
    { field: "TotalAmount" },
    { field: "InStock" },
    { field: "Date" },
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
      <div className="w-full h-[75vh] ">
        <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-full">
          <div className="flex justify-between items-center py-1.5 shrink-0">
            <div className="flex justify-center items-center gap-3">
              <select className="font-[500] mainFont px-4 border-none outline-none">
                <option>All </option>
                <option>Oldest</option>
                <option>Newest</option>
              </select>
              <p className="px-3 text-[1dvw] py-.5 bg-[#F8A61B] rounded-2xl font-[500] border-none text-white">
                422
              </p>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <button className="flex justify-center items-center gap-2 px-4 py-1 text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600] hover:text-white hover:bg-[#0052CC] transition-all duration-300 ease-linear">
                Sort <SortIcon />
              </button>
              <button className="flex justify-center items-center gap-2 px-4 py-1 text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC] hover:text-[#0052CC] hover:bg-white transition-all duration-300 ease-linear">
                Filter <FilterIcon />
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
    </>
  );
};

const StatsTab = () => {
  return (
    <>
      <div className="bg-white p-3 rounded-md">
        <SalesLinechart aspectRatio={5} />
      </div>
    </>
  );
};

export const ItemReport = () => {
  const [currentActiveTab, setCurrentActiveTab] = useState("Details");
  const handleTabChange = (tabName) => {
    setCurrentActiveTab(tabName);
  };

  const handleCheckRenderTab = (currentTab) => {
    switch (currentTab) {
      case "Details":
        return <DetailsTab />;
        break;
      case "Stats":
        return <StatsTab />;
        break;
      default:
        <DetailsTab />;
        break;
    }
  };
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
          Items Reports
        </h3>
        <div className="flex justify-center items-center gap-5">
          <button className="px-5 py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-4 text-white mainFont font-[500] cursor-pointer text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
            export CVS <PluseIcon />
          </button>
        </div>
      </div>

      <div className="bg-[#E6E6E6] p-2 rounded-full w-auto my-5 inline-flex gap-3">
        <button
          onClick={() => handleTabChange("Details")}
          className="bg-white border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold"
        >
          Details
        </button>

        <button
          onClick={() => handleTabChange("Stats")}
          className="bg-transparent text-[#333333]/70 border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold"
        >
          Stats
        </button>
        <button
          onClick={() => handleTabChange("Purchases")}
          className="bg-transparent text-[#333333]/70 border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold"
        >
          Purchases
        </button>
        <button
          onClick={() => handleTabChange("ItemsSale")}
          className="bg-transparent text-[#333333]/70 border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold"
        >
          Items Sale
        </button>
      </div>

      <div className="my-6 w-full">
        {handleCheckRenderTab(currentActiveTab)}
      </div>
    </Layout>
  );
};
