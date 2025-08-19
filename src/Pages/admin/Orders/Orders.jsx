import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { FilterIcon, PluseIcon, SortIcon } from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Download } from "lucide-react";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { Edit, Trash } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);
const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Orders = () => {
  const [rowData, setRowData] = useState([
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      OrderNumber:'521478542',
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      CustomerName: "John",
      Items: "500",
      OrderedDate: "12/05/2025",
      Total: "$5000",
      Status: "Received",
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
    { field: "ID", headerName: "ID", width: 80 },
    { field: "OrderNumber", headerName: "Order Number", width: 150 },
    { field: "CustomerName", headerName: "Customer Name", width: 150 },
    { field: "SupplierName", headerName: "Supplier Name", width: 250 },
    { field: "Items", headerName: "Items", width: 100 },
    { field: "OrderedDate", headerName: "Ordered Date", width: 150 },
    { field: "Total", headerName: "Total", width: 100 },
    { field: "Status", headerName: "Status", width: 120 },
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
      width: 150,
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
      editable: false,
    };
  }, []);

  
  return (
    <Layout>
      <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
            <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Orders
            </h3>
            <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
              <button className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
              Export CSV <Download size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[75vh]">
          <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-full">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
              <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
                <select className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-base">
                  <option>All</option>
                  <option>Older</option>
                  <option>Newest</option>
                </select>
                <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[var(--counterBg-color)] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                  <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                    42
                  </p>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-4 justify-between items-center flex-wrap">
                <button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600] hover:text-white hover:bg-[#0052CC] transition-all duration-300 ease-linear">
                  Sort <SortIcon />
                </button>
                <button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC] hover:text-[#0052CC] hover:bg-white transition-all duration-300 ease-linear">
                  Filter <FilterIcon />
                </button>
              </div>
            </div>
            <div className="h-full w-full overflow-x-scroll overflow-y-auto">
              <div className="min-w-[1200px] h-full">
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
                  getRowId={(params) => params.data.ID}
                  className="w-full h-full text-sm"
                />
              </div>
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