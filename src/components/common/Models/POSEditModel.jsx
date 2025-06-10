import { CircleX } from "lucide-react";
import React, { useMemo, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const POSEditModel = ({ setEditModel, porductData }) => {
  const [currentActiveTab, setCurrentActiveTab] = useState("Details");

  const handleChangeTab = (tabName) => {
    setCurrentActiveTab(tabName);
  };

  const checkRenderTabs = (currentTab) => {
    switch (currentTab) {
      case "Dtails":
        return <DetailsTab />;
        break;
      case "Items":
        return <ItemsTab />;
        break;

      default:
        return <DetailsTab />;
        break;
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
      <div className="w-[50%] max-h-[90%] overflow-y-auto p-5 bg-white rounded-xl shadow-md flex flex-col gap-4">
        <div className="flex justify-between items-center w-full p-1">
          <h3 className="text-[1.5dvw] font-semibold">Transaction Details</h3>
          <button
            onClick={() => {
              setEditModel({
                showDeleteModel: false,
                productId: null,
              });
            }}
            className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
          >
            <CircleX size={30} />
          </button>
        </div>

        <div className="grid grid-cols-2 w-full gap-4">
          <div className="flex justify-start items-center">
            <p className="text-[1.1dvw] font-normal text-gray-500">Status :</p>
            <p className="mx-auto text-[1.2dvw] text-[var(--Negative-color)] font-semibold">
              No orders
            </p>
          </div>

          <div className="flex justify-start items-center">
            <p className="text-[1.1dvw] font-normal text-gray-500">
              Process DT :
            </p>
            <p className="mx-auto text-[1.2dvw]  font-semibold">
              2025-06-09 23:12:26
            </p>
          </div>
          <div className="flex justify-start items-center">
            <p className="text-[1.1dvw] font-normal text-gray-500">ID :</p>
            <p className="mx-auto text-[1.2dvw]  font-semibold">127620</p>
          </div>
          <div className="flex justify-start items-center">
            <p className="text-[1.1dvw] font-normal text-gray-500">User :</p>
            <p className="mx-auto text-[1.2dvw]  font-semibold">Malay</p>
          </div>
          <div className="flex justify-start items-center">
            <p className="text-[1.1dvw] font-normal text-gray-500">Ref :</p>
            <p className="mx-auto text-[1.2dvw]  font-semibold">
              1749525146740-1-
            </p>
          </div>
          <div className="flex justify-start items-center">
            <p className="text-[1.1dvw] font-normal text-gray-500">Device :</p>
            <p className="mx-auto text-[1.2dvw]  font-semibold">
              Register17332
            </p>
          </div>
          <div className="flex justify-start items-center">
            <p className="text-[1.1dvw] font-normal text-gray-500">
              Location :
            </p>
            <p className="mx-auto text-[1.2dvw]  font-semibold">Inventory</p>
          </div>
          <div className="flex justify-start items-center">
            <p className="text-[1.1dvw] font-normal text-gray-500">
              Trans DT :
            </p>
            <p className="mx-auto text-[1.2dvw]  font-semibold">
              6/9/25 23:12:26
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full ">
          <label className="text-[1dvw] font-normal paraFont">Notes</label>
          <textarea
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            rows={5}
            placeholder="Enter notes..."
          ></textarea>
        </div>
        <div className="flex justify-end items-center w-full my-2">
          <button className="px-5 py-1 text-white bg-[var(--activeTab-color)] rounded-md text-[1.1dvw] font-semibold cursor-pointer">
            Save
          </button>
        </div>

        <div className="w-full border-t-2 border-[var(--border-color)] p-2 ">
          <div className="bg-[#E6E6E6] p-2 rounded-full w-auto  my-5 inline-flex gap-3">
            <button
              onClick={() => handleChangeTab("Details")}
              className={` ${
                currentActiveTab === "Details"
                  ? "bg-white text-black"
                  : "bg-transparent text-[#333333]/70"
              } border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
            >
              Details
            </button>
            <button
              onClick={() => handleChangeTab("Items")}
              className={` ${
                currentActiveTab === "Items"
                  ? "bg-white text-black"
                  : "bg-transparent text-[#333333]/70"
              } border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
            >
              Items
            </button>
            <button
              onClick={() => handleChangeTab("Payments")}
              className={` ${
                currentActiveTab === "Payments"
                  ? "bg-white text-black"
                  : "bg-transparent text-[#333333]/70"
              } border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
            >
              Payments
            </button>
            <button
              onClick={() => handleChangeTab("Options")}
              className={` ${
                currentActiveTab === "Options"
                  ? "bg-white text-black"
                  : "bg-transparent text-[#333333]/70"
              } border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
            >
              Options
            </button>
          </div>

          <div className="w-full p-4 border border-[var(--border-color)] rounded-md">
            {checkRenderTabs(currentActiveTab)}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailsTab = () => {
  return (
    <>
      <div className="w-full ">
        <h3 className="text-[1.2dvw] font-semibold my-2">Total Sale : </h3>
        <div className="flex justify-start items-center gap-5 my-2 px-3">
          <p className="text-[1dvw] font-normal text-gray-500">Subtotal : </p>
          <p className="text-[1.1dvw] font-semibold">$0.00</p>
        </div>
        <h3 className="text-[1.2dvw] font-semibold my-2">Service Charges</h3>
        <div className="flex justify-start items-center gap-5 my-2 px-3">
          <p className="text-[1dvw] font-normal text-gray-500">Total :</p>
          <p className="text-[1.1dvw] font-semibold">$0.00</p>
        </div>
      </div>
    </>
  );
};

const ItemsTab = () => {
  const [rowData, setRowData] = useState([
    {
      Qty: "NA",
      Name: "NA",
      Price: "NA",
      Tax: "NA",
      Total: "NA",
    },
  ]);
  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "Qty" },
    { field: "Name" },
    { field: "Price" },
    { field: "Tax" },
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
    <>
      <div className="w-full ">
        <h3 className="text-[1.3dvw] font-semibold">Items :</h3>
        <div className="h-[40vh] w-full">
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
    </>
  );
};
