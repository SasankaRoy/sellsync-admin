import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import {
  DeleteIcon,
  FilterIcon,
  PluseIcon,
  SortIcon,
} from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { CircleX, Edit, Eye, Plus, Trash } from "lucide-react";
ModuleRegistry.registerModules([AllCommunityModule]);
const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Category = () => {
  const [rowData, setRowData] = useState([
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
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
    { field: "CategoryName" },
    { field: "Group" },
    { field: "Stock" },
    { field: "Supplier" },
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
    <Layout>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
            Categories List
          </h3>
          <div className="flex justify-center items-center gap-5">
            <button className="px-5 py-1.5 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-4 text-white mainFont font-[500] cursor-pointer text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
              Create Category <PluseIcon />
            </button>
            <button className="px-5 py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-4 text-white mainFont font-[500] cursor-pointer text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
              import CVS <PluseIcon />
            </button>
          </div>
        </div>

        <div className="w-full h-[75vh] ">
          <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-full">
            <div className="flex justify-between items-center py-1.5 shrink-0">
              <div className="flex justify-center items-center gap-3">
                <select className="font-[500] mainFont px-4 border-none outline-none">
                  <option>All Category</option>
                  <option>All Category</option>
                  <option>All Category</option>
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
      </div>
    </Layout>
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
