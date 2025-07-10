import React, { useMemo, useState } from "react";
import { DeleteIcon, FilterIcon, SortIcon } from "../../../assets/Svgs/AllSvgs";
import { Edit, Trash } from "lucide-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

import { Layout } from "../../../components/common/Layout/Layout";

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

export const EDIFile = () => {
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
      FileName: "orders_0425.xml",
      UploadedBy: "John Doe",
      UploadDate: "19 April 2025",
      Status: "Processed",
      Actions: ActionBtns,
    },
    {
      FileName: "orders_0425.xml",
      UploadedBy: "John Doe",
      UploadDate: "19 April 2025",
      Status: "Processed",
      Actions: ActionBtns,
    },
    {
      FileName: "orders_0425.xml",
      UploadedBy: "John Doe",
      UploadDate: "19 April 2025",
      Status: "Processed",
      Actions: ActionBtns,
    },
    {
      FileName: "orders_0425.xml",
      UploadedBy: "John Doe",
      UploadDate: "19 April 2025",
      Status: "Processed",
      Actions: ActionBtns,
    },
    {
      FileName: "orders_0425.xml",
      UploadedBy: "John Doe",
      UploadDate: "19 April 2025",
      Status: "Processed",
      Actions: ActionBtns,
    },
    {
      FileName: "orders_0425.xml",
      UploadedBy: "John Doe",
      UploadDate: "19 April 2025",
      Status: "Processed",
      Actions: ActionBtns,
    },
    {
      FileName: "orders_0425.xml",
      UploadedBy: "John Doe",
      UploadDate: "19 April 2025",
      Status: "Processed",
      Actions: ActionBtns,
    },
    {
      FileName: "orders_0425.xml",
      UploadedBy: "John Doe",
      UploadDate: "19 April 2025",
      Status: "Processed",
      Actions: ActionBtns,
    },
    {
      FileName: "orders_0425.xml",
      UploadedBy: "John Doe",
      UploadDate: "19 April 2025",
      Status: "Processed",
      Actions: ActionBtns,
    },
    {
      FileName: "orders_0425.xml",
      UploadedBy: "John Doe",
      UploadDate: "19 April 2025",
      Status: "Processed",
      Actions: ActionBtns,
    },
    {
      FileName: "orders_0425.xml",
      UploadedBy: "John Doe",
      UploadDate: "19 April 2025",
      Status: "Processed",
      Actions: ActionBtns,
    },
    {
      FileName: "orders_0425.xml",
      UploadedBy: "John Doe",
      UploadDate: "19 April 2025",
      Status: "Processed",
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
    { field: "FileName" },
    { field: "UploadedBy" },
    { field: "UploadDate" },
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
      <Layout>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              POS / EDI File
            </h3>
          </div>
        </div>
        
        <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-5  h-[80dvh] py-5">
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
      </Layout>
    </>
  );
};
