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
      <div className="w-full flex gap-2 sm:gap-4 py-2 justify-center items-center">
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleEdit}
        >
          <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>

        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleDelete}
        >
          <Trash size={16} className="sm:w-[18px] sm:h-[18px]" />
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
  const [selectedRowData, setSelectedRowData] = useState([]);
  
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
      editable: false,
    };
  }, []);

  return (
    <>
      <Layout>
        <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
          <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0 lg:flex-row lg:items-center lg:gap-0 lg:mb-0">
              <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                POS / EDI File
              </h3>
            </div>
          </div>
          
          <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[80dvh]">
            <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 lg:px-5 lg:py-5 h-full">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0 lg:flex-row lg:items-center lg:gap-0">
                <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto lg:justify-center lg:w-auto">
                  <select className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-base">
                    <option>All Files</option>
                    <option>Processed</option>
                    <option>Pending</option>
                  </select>
                  <div className="h-6 w-6 sm:h-7 sm:w-7 bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem]">
                    <p className="text-xs sm:text-xs font-[500] text-white">
                      {rowData.length}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-4 justify-between items-center flex-wrap lg:justify-center lg:gap-4">
                  <button className="flex justify-between lg:justify-center items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                    Sort <SortIcon />
                  </button>
                  <button className="flex justify-between lg:justify-center items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                    Filter <FilterIcon />
                  </button>
                  <button>
                    <DeleteIcon className="w-5 h-5 lg:w-auto lg:h-auto" />
                  </button>
                </div>
              </div>
              <div className="h-full w-full overflow-x-scroll overflow-y-auto lg:overflow-visible">
                <div className="min-w-[800px] lg:min-w-0 h-full">
                  <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    rowSelection={rowSelection}
                    onSelectionChanged={(event) => {
                      const selectedNodes = event.api.getSelectedNodes();
                      const selectedData = selectedNodes.map(node => node.data);
                      setSelectedRowData(selectedData);
                      console.log("Selected data updated:", selectedData);
                    }}
                    onCellValueChanged={(event) =>
                      console.log(`New Cell Value: ${event.value}`)
                    }
                    className="w-full h-full text-sm lg:text-base"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};