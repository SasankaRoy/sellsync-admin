import React, { useMemo, useState } from "react";
import { DeleteIcon, FilterIcon, SortIcon } from "../../../assets/Svgs/AllSvgs";
import { Edit, Trash, Eye } from "lucide-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { POSEditModel } from "../../../components/common/Models/POSEditModel";
import { Layout } from "../../../components/common/Layout/Layout";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

const ActionBtns = (props) => {
  const { onEdit, onView, onDelete } = props;
  const { data } = props;

  const handleEdit = () => {
    onEdit(data);
  };

  const handleView = () => {
    if (onView) onView(data);
  };

  const handleDelete = () => {
    onDelete(data);
  };

  return (
    <div className="w-full flex gap-2 sm:gap-4 py-2 justify-center items-center">
      <button
        className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
        onClick={handleEdit}
      >
        <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>
      <button
        className="font-semibold font-[var(--paraFont)] bg-[var(--button-color5)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
        onClick={handleView}
      >
        <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>
      <button
        className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
        onClick={handleDelete}
      >
        <Trash size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>
    </div>
  );
};

export const Journal = () => {
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

  const onView = (products) => {
    console.log("View Button Clicked", products);
    // Add view functionality here
  };

  const onDelete = (products) => {
    console.log(products, "delete");
    setDeleteModel({
      state: true,
      productId: products.ID,
    });
  };

  // Toolbar edit function
  const handleToolbarEdit = () => {
    console.log("Toolbar edit clicked");
    // Add toolbar edit functionality here
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "ID", headerName: "ID", width: 100 },
    { field: "Ref", headerName: "Reference", width: 120 },
    { field: "User", headerName: "User", width: 120 },
    { field: "Device/Location", headerName: "Device/Location", width: 180 },
    { field: "Items", headerName: "Items", width: 100 },
    { field: "ProccessDt", headerName: "Process Date", width: 160 },
    { field: "Total", headerName: "Total", width: 120 },
    { field: "Status", headerName: "Status", width: 130 },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionBtns,
      cellRendererParams: {
        onEdit,
        onView,
        onDelete,
      },
      width: 200,
      sortable: false,
      filter: false,
    },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      sortable: true,
      resizable: true,
    };
  }, []);

  return (
    <>
      <Layout>
        <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
          <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
              <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                POS / Journal
              </h3>
            </div>
          </div>
          
          <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[75vh]">
            <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-full">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
                <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
                  <select className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-base">
                    <option>All Journal</option>
                    <option>Completed</option>
                    <option>Pending</option>
                  </select>
                  <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                    <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                      {rowData.length}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-4 justify-between items-center flex-wrap">
                  <button
                    onClick={handleToolbarEdit}
                    className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC] hover:bg-[#003d99] transition-all duration-300"
                  >
                    <Edit size={14} className="sm:w-4 sm:h-4" /> Edit
                  </button>
                  <button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                    Sort <SortIcon />
                  </button>
                  <button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                    Filter <FilterIcon />
                  </button>
                  <button>
                    <DeleteIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="h-full w-full overflow-x-scroll overflow-y-auto">
                <div className="min-w-[800px] h-full">
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
                    className="w-full h-full text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>

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
