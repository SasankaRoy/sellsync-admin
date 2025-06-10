import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { DeleteIcon, FilterIcon, SortIcon } from "../../../assets/Svgs/AllSvgs";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { Edit, Trash } from "lucide-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { POSEditModel } from "../../../components/common/Models/POSEditModel";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
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

const JournalTab = () => {
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
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
      Actions: ActionBtns,
    },
    {
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
      Actions: ActionBtns,
    },
    {
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
      Actions: ActionBtns,
    },
    {
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
      Actions: ActionBtns,
    },
    {
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
      Actions: ActionBtns,
    },
    {
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
      Actions: ActionBtns,
    },
    {
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
      Actions: ActionBtns,
    },
    {
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
      Actions: ActionBtns,
    },
    {
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
      Actions: ActionBtns,
    },
    {
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
      Actions: ActionBtns,
    },
    {
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
      Actions: ActionBtns,
    },
    {
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
      Actions: ActionBtns,
    },
    {
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
      Actions: ActionBtns,
    },
    {
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
      Actions: ActionBtns,
    },
    {
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
      Actions: ActionBtns,
    },
    {
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
      Actions: ActionBtns,
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
    { field: "ID" },
    { field: "Ref" },
    { field: "User" },
    { field: "Device/Location" },
    { field: "Items" },
    { field: "ProccessDt" },
    { field: "Total" },
    { field: "Status" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionBtns,
      cellRendererParams: {
        onEdit,
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

      {deleteModel.state && deleteModel.productId && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          productId={deleteModel.productId}
        />
      )}

      {editModel.state && editModel.productData && (
        <POSEditModel
          setEditModel={setEditModel}
          productData={editModel.productData}
        />
      )}
    </>
  );
};

const DealsTab = () => {
  const [rowData, setRowData] = useState([
    {
      DealName: "Buy 1 Get 1 Free",
      Type: "Buy X And Get Y",
      Discount: "$ 10",
      Validity: "5 April 2025 - 30 April 2025 11:59 PM",
      Amount: "$ 128.66",
      Status: "Active",
    },
    {
      DealName: "Buy 1 Get 1 Free",
      Type: "Buy X And Get Y",
      Discount: "$ 10",
      Validity: "5 April 2025 - 30 April 2025 11:59 PM",
      Amount: "$ 128.66",
      Status: "Active",
    },
    {
      DealName: "Buy 1 Get 1 Free",
      Type: "Buy X And Get Y",
      Discount: "$ 10",
      Validity: "5 April 2025 - 30 April 2025 11:59 PM",
      Amount: "$ 128.66",
      Status: "Active",
    },
    {
      DealName: "Buy 1 Get 1 Free",
      Type: "Buy X And Get Y",
      Discount: "$ 10",
      Validity: "5 April 2025 - 30 April 2025 11:59 PM",
      Amount: "$ 128.66",
      Status: "Active",
    },
    {
      DealName: "Buy 1 Get 1 Free",
      Type: "Buy X And Get Y",
      Discount: "$ 10",
      Validity: "5 April 2025 - 30 April 2025 11:59 PM",
      Amount: "$ 128.66",
      Status: "Active",
    },
    {
      DealName: "Buy 1 Get 1 Free",
      Type: "Buy X And Get Y",
      Discount: "$ 10",
      Validity: "5 April 2025 - 30 April 2025 11:59 PM",
      Amount: "$ 128.66",
      Status: "Active",
    },
    {
      DealName: "Buy 1 Get 1 Free",
      Type: "Buy X And Get Y",
      Discount: "$ 10",
      Validity: "5 April 2025 - 30 April 2025 11:59 PM",
      Amount: "$ 128.66",
      Status: "Active",
    },
    {
      DealName: "Buy 1 Get 1 Free",
      Type: "Buy X And Get Y",
      Discount: "$ 10",
      Validity: "5 April 2025 - 30 April 2025 11:59 PM",
      Amount: "$ 128.66",
      Status: "Active",
    },
    {
      DealName: "Buy 1 Get 1 Free",
      Type: "Buy X And Get Y",
      Discount: "$ 10",
      Validity: "5 April 2025 - 30 April 2025 11:59 PM",
      Amount: "$ 128.66",
      Status: "Active",
    },
    {
      DealName: "Buy 1 Get 1 Free",
      Type: "Buy X And Get Y",
      Discount: "$ 10",
      Validity: "5 April 2025 - 30 April 2025 11:59 PM",
      Amount: "$ 128.66",
      Status: "Active",
    },
    {
      DealName: "Buy 1 Get 1 Free",
      Type: "Buy X And Get Y",
      Discount: "$ 10",
      Validity: "5 April 2025 - 30 April 2025 11:59 PM",
      Amount: "$ 128.66",
      Status: "Active",
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "DealName" },
    { field: "Type" },
    { field: "Discount" },
    { field: "Validity" },
    { field: "Amount" },
    { field: "Status" },
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
      <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[60dvh]">
        <div className="flex justify-between items-center py-1.5 shrink-0">
          <div className="flex justify-center items-center gap-3">
            <select className="font-[500] mainFont px-4 border-none outline-none">
              <option>All Deals</option>
              <option>All Deals</option>
              <option>All Deals</option>
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
    </>
  );
};

export const POS = () => {
  const [currentActiveTab, setCurrentActiveTab] = useState("Journal");
  const handleTabChange = (tabName) => {
    setCurrentActiveTab(tabName);
  };

  const handleCheckRender = () => {
    switch (currentActiveTab) {
      case "Journal":
        return <JournalTab />;
        break;
      case "Deals":
        return <DealsTab />;
      default:
        return <JournalTab />;
        break;
    }
  };
  return (
    <>
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
            <button
              onClick={() => handleTabChange("Journal")}
              className="bg-white border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold"
            >
              Journal
            </button>

            <button
              onClick={() => handleTabChange("Deals")}
              className="bg-transparent text-[#333333]/70 border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold"
            >
              Deals
            </button>
            <button
              onClick={() => handleTabChange("ReceiptSettings")}
              className="bg-transparent text-[#333333]/70 border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold"
            >
              Receipt Settings
            </button>
            <button
              onClick={() => handleTabChange("CustomerDisplaySetting")}
              className="bg-transparent text-[#333333]/70 border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold"
            >
              Customer Display Setting
            </button>
            <button
              onClick={() => handleTabChange("EDIFile")}
              className="bg-transparent text-[#333333]/70 border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold"
            >
              EDI File
            </button>
            <button
              onClick={() => handleTabChange("CategorriesForThePOS")}
              className="bg-transparent text-[#333333]/70 border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold"
            >
              Categorries For The POS
            </button>
            <button
              onClick={() => handleTabChange("Vendors")}
              className="bg-transparent text-[#333333]/70 border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold"
            >
              Vendors
            </button>
          </div>

          {handleCheckRender()}
        </div>
      </Layout>
    </>
  );
};
