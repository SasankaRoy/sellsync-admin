import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { PluseIcon } from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { Edit, Trash, X } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);
const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const LoyaltyDeals = () => {
  const [rowData, setRowData] = useState([
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ItemName: "Marlboro",
      Promocode: "070137838401",
      From: "17.07.2025",
      To: "17.08.20025",
      AmountOff: "$5",
      MinimumQuantity: "2",
      MaximumQuanty: "10",
      Status: "Active",
      Action: ActionBtns,
    },
  ]);
  const [showModel, setShowModel] = useState({
    state: false,
    productData: null,
    actionType: "",
  });
  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
  });

  const onEdit = (product) => {
    console.log(product, "edit");
    if (product) {
      setShowModel({
        state: true,
        productData: product,
        actionType: "Edit",
      });
    }
  };
  const onView = (product) => {
    console.log(product, "view");
  };
  const onDelete = (product) => {
    console.log(product, "delete 201");
    setDeleteModel({
      state: true,
      productId: product.ID,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "ID" },
    { field: "ItemName" },
    { field: "Promocode" },
    { field: "From" },
    { field: "To" },
    { field: "AmountOff" },
    { field: "MinimumQuantity" },
    { field: "MaximumQuanty" },
    { field: "Status" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionBtns,
      cellRendererParams: {
        onEdit,
        onView,
        onDelete,
        skinSafe: true,
      },
    },
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
        <div className="flex justify-between items-center w-full">
          <h3 className="text-[1.5dvw] font-[500] mainFont">Loyalty Ddeals</h3>
          <button
            onClick={() =>
              setShowModel({
                state: true,
                actionType: "Add",
                productData: null,
              })
            }
            className="cursor-pointer px-5 py-2 bg-[var(--button-color1)] text-white mainFont rounded-full font-[500] flex justify-center items-center gap-3"
          >
            <PluseIcon /> Create New Deals
          </button>
        </div>

        <div className="bg-white border border-[var(--border-color)] mt-5 p-5 rounded-md">
          <h3 className="text-[1.3dvw] font-[600] ">Active Deals</h3>
          <div className="h-[70vh] w-full my-5">
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

        <div className="bg-white border border-[var(--border-color)] p-5 rounded-md">
          <h3 className="text-[1.3dvw] font-[600] ">Previous Deals</h3>
          <div className="h-[50vh] w-full mt-5">
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

      {showModel.state && showModel.actionType === "Add" && (
        <EditAndAddModel showModel={showModel} setShowModel={setShowModel} />
      )}
    </>
  );
};

const ActionBtns = (props) => {
  const { onEdit, onView, onDelete } = props;
  const { data } = props;

  const handleEdit = () => {
    onEdit(data);
  };

  const handleView = () => {
    onView(data);
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
          <Edit size={18} />
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

const EditAndAddModel = ({ showModel, setShowModel }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen z-50 bg-[#000]/20 backdrop-blur-xl flex justify-center items-center">
        <div className="w-[65%] bg-white rounded-md p-5">
          <div className="rounded-md p-2 bg-[var(--sideMenu-color)] flex justify-between items-center w-full text-white">
            <h2 className="font-[500] text-[1.5dvw] text-[var(--text-color)]">
              {showModel?.actionType} Deals
            </h2>
            <button
              className="cursor-pointer"
              onClick={() => {
                setShowModel({
                  actionType: "",
                  productData: null,
                  status: false,
                });
              }}
            >
              <X size={30} />
            </button>
          </div>

          <div className="my-8 flex flex-col gap-3">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="itemsDeal"
                  className="text-[1dvw] font-normal paraFont"
                >
                  Select Deal Item
                </label>
                <select
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  id="itemsDeal"
                >
                  <option>-- Select Item --</option>
                  <option>Deal Item 1</option>
                  <option>Deal Item 2</option>
                  <option>Deal Item 3</option>
                  <option>Deal Item 4</option>
                  <option>Deal Item 5</option>
                  <option>Deal Item 6</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="promoCode"
                  className="text-[1dvw] font-normal paraFont"
                >
                  Promocode
                </label>
                <input
                  id="promoCode"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  placeholder="Enter code..."
                />
              </div>

              <div className="flex justify-between items-center w-full gap-5">
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="offAmount"
                    className="text-[1dvw] font-normal paraFont"
                  >
                    Amount Off
                  </label>
                  <input
                    id="offAmount"
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    type="number"
                    placeholder="Enter off amount..."
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="minQty"
                    className="text-[1dvw] font-normal paraFont"
                  >
                    Min Quantity
                  </label>
                  <input
                    id="minQty"
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    type="number"
                    placeholder="Enter min quantity..."
                  />
                </div>
              </div>

              <div className="flex justify-between items-center w-full gap-5">
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="offAmount"
                    className="text-[1dvw] font-normal paraFont"
                  >
                    Max Quantity
                  </label>
                  <input
                    id="offAmount"
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    type="number"
                    placeholder="Enter max quantity..."
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="status"
                    className="text-[1dvw] font-normal paraFont"
                  >
                    Status
                  </label>
                  <select
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    id="status"
                  >
                    <option>-- Select Status --</option>
                    <option>Active</option>
                    <option>De-Active</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center w-full gap-5">
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="from"
                    className="text-[1dvw] font-normal paraFont"
                  >
                    From
                  </label>
                  <input
                    id="from"
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    type="date"
                    placeholder="Enter max quantity..."
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="to"
                    className="text-[1dvw] font-normal paraFont"
                  >
                    To
                  </label>
                  <input
                    id="to"
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    type="date"
                    placeholder="Enter max quantity..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-5 mt-5">
              <button className="px-4 py-1.5 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md">
                Add
              </button>
              <button className="px-4 py-1.5 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
