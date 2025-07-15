import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { POSEditModel } from "../../../components/common/Models/POSEditModel";

import { EditIcon } from "../../../assets/Svgs/AllSvgs";
import { Download, Trash } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "none",
  headerCheckbox: false,
};

const ActionBtns = (props) => {
  const { onEdit, onDelete } = props;
  const { data } = props;

  const handleEdit = () => {
    onEdit(data);
  };

  const handleDelete = () => {
    onDelete(data);
  };

  return (
    <>
      <div className="w-full flex gap-4 py-2 justify-center items-center">
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleEdit}
        >
          <EditIcon size={18} />
        </button>

        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleDelete}
        >
          <Trash size={18} />
        </button>
      </div>
    </>
  );
};

export const Fule = () => {
  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
  });
  const [editModel, setEditModel] = useState({
    state: false,
    productData: null,
  });
  const [rowData, setRowData] = useState([
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
    {
      Date: "20.05.2025",
      Time: "10.00 PM",
      REGULAR: "3.5",
      PLUS: "5",
      PREMIUM: "7.5",
      DIESEL: "6.5",
    },
  ]);
  const onEdit = (products) => {
    console.log("Edit Button Clicked");
    setEditModel({
      state: true,
      productData: products,
    });
  };
  const onDelete = (products) => {
    console.log(products, "delete");
    setDeleteModel({
      state: true,
      productId: products.ID,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "Date" },
    { field: "Time" },
    { field: "REGULAR" },
    { field: "PLUS" },
    { field: "PREMIUM" },
    { field: "DIESEL" },
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
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              POS / Fuels
            </h3>
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full my-8 bg-white rounded-md border border-[#d4d4d4] p-5">
          <div className="">
            <h3 className="font-semibold text-[1.3dvw]">Current Fule Price</h3>
            <div className="flex justify-between items-center w-full gap-5">
              <div className="my-4 border-b px-2 py-4 border-[#d4d4d4] w-1/2">
                <div className="flex justify-start items-center gap-3 mb-4">
                  <h4 className="text-[1.2dvw] font-semibold">REG</h4>
                  <p className="text-[1dvw] font-medium text-gray-600">
                    Regular
                  </p>
                </div>
                <div className="flex justify-start items-center gap-4 w-full">
                  <div className="flex flex-col gap-3 flex-1">
                    <label className="text-[1dvw] font-[700]">Cash</label>
                    <input
                      className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                      type="number"
                      placeholder="price.."
                    />
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <label className="text-[1dvw] font-[700]">Credit</label>
                    <input
                      className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                      type="number"
                      placeholder="price.."
                    />
                  </div>
                </div>
              </div>

              <div className="my-4 border-b px-2 py-4 border-[#d4d4d4] w-1/2">
                <div className="flex justify-start items-center gap-3 mb-4">
                  <h4 className="text-[1.2dvw] font-semibold">MID</h4>
                  <p className="text-[1dvw] font-medium text-gray-600">Plus</p>
                </div>
                <div className="flex justify-start items-center gap-4 w-full">
                  <div className="flex flex-col gap-3 flex-1">
                    <label className="text-[1dvw] font-[700]">Cash</label>
                    <input
                      className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                      type="number"
                      placeholder="price.."
                    />
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <label className="text-[1dvw] font-[700]">Credit</label>
                    <input
                      className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                      type="number"
                      placeholder="price.."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center gap-5 w-full">
              <div className="my-4 border-b px-2 py-4 border-[#d4d4d4] w-1/2">
                <div className="flex justify-start items-center gap-3 mb-4">
                  <h4 className="text-[1.2dvw] font-semibold">PRE</h4>
                  <p className="text-[1dvw] font-medium text-gray-600">
                    PREMIUM
                  </p>
                </div>
                <div className="flex justify-start items-center gap-4 w-full">
                  <div className="flex flex-col gap-3 flex-1">
                    <label className="text-[1dvw] font-[700]">Cash</label>
                    <input
                      className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                      type="number"
                      placeholder="price.."
                    />
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <label className="text-[1dvw] font-[700]">Credit</label>
                    <input
                      className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                      type="number"
                      placeholder="price.."
                    />
                  </div>
                </div>
              </div>
              <div className="my-4 border-b px-2 py-4 border-[#d4d4d4] w-1/2">
                <div className="flex justify-start items-center gap-3 mb-4">
                  <h4 className="text-[1.2dvw] font-semibold">DSL</h4>
                  <p className="text-[1dvw] font-medium text-gray-600">
                    DIESEL
                  </p>
                </div>
                <div className="flex justify-start items-center gap-4 w-full">
                  <div className="flex flex-col gap-3 flex-1">
                    <label className="text-[1dvw] font-[700]">Cash</label>
                    <input
                      className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                      type="number"
                      placeholder="price.."
                    />
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <label className="text-[1dvw] font-[700]">Credit</label>
                    <input
                      className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                      type="number"
                      placeholder="price.."
                    />
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full py-5 bg-[var(--button-color1)] text-white mainFont font-[600] rounded-xl cursor-pointer">
              Update Price
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-white rounded-md border border-[#d4d4d4] px-5 py-2">
          <div className="flex justify-between items-center w-full">
            <h3 className="font-[500] text-[1.5vw]">Price Update History</h3>
            <button className="bg-[var(--button-color1)] flex justify-center items-center text-[1dvw] gap-2 px-5 py-2 rounded-full mainFont font-[500] cursor-pointer text-white">
              <Download /> Download CSV
            </button>
          </div>
          <div className=" h-[60vh]">
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
    </>
  );
};
