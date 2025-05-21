import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Overviewcards } from "../../../components/common/Overviewcards/Overviewcards";
import {
  BuyPriceIcon,
  DeleteIcon,
  FilterIcon,
  LowStockIcon,
  OutOfStockIcon,
  SellPriceIcon,
  SortIcon,
  TotalInventoryIcon,
} from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { Doughtchart } from "../../../components/common/charts/Doughtchart";
import ProductImg1 from "../../../assets/images/ProductImg1.png";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

const saleData = [
  {
    name: "Beer",
    value: "2,344",
    color: "#13A34B",
  },
  {
    name: "Gin",
    value: "2,004",
    color: "#0052CC",
  },
  {
    name: "Whiskey",
    value: "1,988",
    color: "#420088",
  },
  {
    name: "Rum",
    value: "1,540",
    color: "#00C7E6",
  },
  {
    name: "Scotch",
    value: "1,340",
    color: "#F59E0B",
  },
  {
    name: "Wine",
    value: "840",
    color: "#FACC15",
  },
];

export const Inventory = () => {
  const [rowData, setRowData] = useState([
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      UpdateDate: "3 April 2025 7:40 PM",
      Stock: "230",
      Buy: "$1.80",
      Sell: "$2.20",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      UpdateDate: "3 April 2025 7:40 PM",
      Stock: "230",
      Buy: "$1.80",
      Sell: "$2.20",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      UpdateDate: "3 April 2025 7:40 PM",
      Stock: "230",
      Buy: "$1.80",
      Sell: "$2.20",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      UpdateDate: "3 April 2025 7:40 PM",
      Stock: "230",
      Buy: "$1.80",
      Sell: "$2.20",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      UpdateDate: "3 April 2025 7:40 PM",
      Stock: "230",
      Buy: "$1.80",
      Sell: "$2.20",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      UpdateDate: "3 April 2025 7:40 PM",
      Stock: "230",
      Buy: "$1.80",
      Sell: "$2.20",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      UpdateDate: "3 April 2025 7:40 PM",
      Stock: "230",
      Buy: "$1.80",
      Sell: "$2.20",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      UpdateDate: "3 April 2025 7:40 PM",
      Stock: "230",
      Buy: "$1.80",
      Sell: "$2.20",
      Action: "View",
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "Products" },
    { field: "Category" },
    { field: "UpdateDate" },
    { field: "Stock" },
    { field: "Buy" },
    { field: "Sell" },
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
      <div className="flex justify-center w-full gap-5">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Inventory
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full my-6">
            <Overviewcards
              cardTitle="Total Inventory"
              cardValue="12,500"
              percent="View"
              icon={<TotalInventoryIcon />}
            />
            <Overviewcards
              cardTitle="Buy Price"
              cardValue="$25,000"
              percent="View"
              icon={<BuyPriceIcon />}
            />
            <Overviewcards
              cardTitle="Sell Price"
              cardValue="$46,800"
              percent="View"
              icon={<SellPriceIcon />}
            />
          </div>

          <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[65dvh]">
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
        <div className="w-[26%] shrink-0">
          <div className="flex justify-between items-center">
            <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Stats
            </h3>
          </div>

          <div className="my-5 bg-white rounded-md p-3">
            <div className="flex justify-between items-center">
              <h3 className="text-[1dvw] font-[500]">Inventory Stats</h3>
              <button className="bg-[#333333] text-white px-3 text-[.9dvw] cursor-pointer py-1 rounded-full">
                See all
              </button>
            </div>
            <div className="p-3 my-3">
              <div>
                <Doughtchart aspectRatio={1.5} />
              </div>
              <div>
                <div className="flex-1 shrink-0 flex flex-col gap-3 justify-center items-start  rounded-md bg-[var(--primary-color)] py-6 px-2 ">
                  {saleData.map((cur, id) => (
                    <div
                      key={id}
                      className="flex  justify-between items-center w-[95%]"
                    >
                      <div className="flex justify-start gap-4 items-center">
                        <div
                          style={{
                            background: cur.color,
                          }}
                          className="w-[1dvw] h-[1dvw]  rounded-full"
                        />
                        <p className="font-semibold font-[var(--paraFont)] text-[1dvw] text-[var(--paraText-color)]">
                          {cur.name}
                        </p>
                      </div>
                      <h5 className="text-black font-medium text-[1dvw]">
                        ${cur.value}
                      </h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full my-4 p-1">
            <div className="flex justify-between items-center bg-[#E72C1B] p-2 rounded-md">
              <div className="px-1.5">
                <p className="text-white font-semibold text-[1dvw]">Out Of Stock</p>
                <h3 className="text-white font-semibold text-[2dvw]">01</h3>
              </div>
              <div>
                <OutOfStockIcon />
              </div>
            </div>

            <div className="flex justify-between items-center bg-[#fff] p-2 rounded-md">
              <div className="px-1.5">
                <p className="text-black font-semibold text-[1dvw]">Low Stock</p>
                <h3 className="text-black font-semibold text-[2dvw]">03</h3>
              </div>
              <div>
                <LowStockIcon />
              </div>
            </div>
          </div>

          <div className="border border-[#D4D4D4] rounded-md p-3 bg-white">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-[1.1dvw]">Low Stocks</h3>
              <button className="cursor-pointer bg-[var(--button-color2)] text-white px-4 py-1 rounded-full text-[1dvw] font-[var(--paraFont)] font-medium">
                See all
              </button>
            </div>

            <div className="flex flex-col gap-3 my-3">
              {[1, 2, 3].map((cur, id) => (
                <div
                  key={id}
                  className="w-full flex justify-start items-center gap-3"
                >
                  <div className="w-[3dvw] h-[3dvw]">
                    <img
                      className="w-full h-full object-cover"
                      src={ProductImg1}
                      alt="sellsync.com"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold font-[var(--paraFont)] text-[1dvw]">
                      Budwiser Magnum 750ML
                    </h4>
                    <p className="text-[.9dvw] font-medium text-[#333333] font-[var(--paraFont)]">
                      Out Of Stock
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
