import React, { useMemo, useState } from "react";
import {
  Search,
  Bell,
  BarChart3,
  Package,
  TrendingUp,
  CreditCard,
  Camera,
  Eye,
  Edit,
  Home,
  PieChart,
  Users,
  Settings,
  Menu,
  Download,
  ArrowUpRight,
  DollarSign,
  ShoppingCart,
  Trash,
} from "lucide-react";

import {
  DeleteIcon,
  NetsaleAmountIcon,
  OverviewCardIcon1,
  RefundIcon,
} from "../../assets/Svgs/AllSvgs";
import { SellerNavbar } from "../../components/common/Navbars/SellerNavbar";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);
const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

const ActionBtns = (props) => {
  // const { onEdit, onDelete } = props;
  // const { data } = props;

  // const handleEdit = () => {
  //   onEdit(data);
  // };

  // const handleView = () => {
  //   onView(data);
  // };
  // const handleDelete = () => {
  //   onDelete(data);
  // };

  return (
    <>
      <div className="w-full flex gap-4 py-2 justify-center items-center">
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1.5 rounded-full border-none cursor-pointer"
          // onClick={handleEdit}
        >
          <Eye size={18} />
        </button>

        {/* <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1.5 rounded-full border-none cursor-pointer"
          // onClick={handleDelete}
        >
          <Trash size={18} />
        </button> */}
      </div>
    </>
  );
};

const Sales = () => {
  const [rowData, setRowData] = useState([
    {
      ID: "#1279gdgh5214tfew",
      Ref: "ft52",
      Device: "Device T25",
      CustomerName: "Sasanka",
      Mobile: "8957456325",
      Mobile: "8957456325",
      TotalItems: "5",
      TotalAmount: "50",
      date_time: "5.11.2025 - 15:20",
      status: "Completed",
    },
    {
      ID: "#1279gdgh5214tfew",
      Ref: "ft52",
      Device: "Device T25",
      CustomerName: "Sasanka",
      Mobile: "8957456325",
      Mobile: "8957456325",
      TotalItems: "5",
      TotalAmount: "50",
      date_time: "5.11.2025 - 15:20",
      status: "Completed",
    },
    {
      ID: "#1279gdgh5214tfew",
      Ref: "ft52",
      Device: "Device T25",
      CustomerName: "Sasanka",
      Mobile: "8957456325",
      Mobile: "8957456325",
      TotalItems: "5",
      TotalAmount: "50",
      date_time: "5.11.2025 - 15:20",
      status: "Completed",
    },
    {
      ID: "#1279gdgh5214tfew",
      Ref: "ft52",
      Device: "Device T25",
      CustomerName: "Sasanka",
      Mobile: "8957456325",
      Mobile: "8957456325",
      TotalItems: "5",
      TotalAmount: "50",
      date_time: "5.11.2025 - 15:20",
      status: "Completed",
    },
    {
      ID: "#1279gdgh5214tfew",
      Ref: "ft52",
      Device: "Device T25",
      CustomerName: "Sasanka",
      Mobile: "8957456325",
      Mobile: "8957456325",
      TotalItems: "5",
      TotalAmount: "50",
      date_time: "5.11.2025 - 15:20",
      status: "Completed",
    },
    {
      ID: "#1279gdgh5214tfew",
      Ref: "ft52",
      Device: "Device T25",
      CustomerName: "Sasanka",
      Mobile: "8957456325",
      Mobile: "8957456325",
      TotalItems: "5",
      TotalAmount: "50",
      date_time: "5.11.2025 - 15:20",
      status: "Completed",
    },
    {
      ID: "#1279gdgh5214tfew",
      Ref: "ft52",
      Device: "Device T25",
      CustomerName: "Sasanka",
      Mobile: "8957456325",
      Mobile: "8957456325",
      TotalItems: "5",
      TotalAmount: "50",
      date_time: "5.11.2025 - 15:20",
      status: "Completed",
    },
    {
      ID: "#1279gdgh5214tfew",
      Ref: "ft52",
      Device: "Device T25",
      CustomerName: "Sasanka",
      Mobile: "8957456325",
      Mobile: "8957456325",
      TotalItems: "5",
      TotalAmount: "50",
      date_time: "5.11.2025 - 15:20",
      status: "Completed",
    },
    {
      ID: "#1279gdgh5214tfew",
      Ref: "ft52",
      Device: "Device T25",
      CustomerName: "Sasanka",
      Mobile: "8957456325",
      Mobile: "8957456325",
      TotalItems: "5",
      TotalAmount: "50",
      date_time: "5.11.2025 - 15:20",
      status: "Completed",
    },
    {
      ID: "#1279gdgh5214tfew",
      Ref: "ft52",
      Device: "Device T25",
      CustomerName: "Sasanka",
      Mobile: "8957456325",
      Mobile: "8957456325",
      TotalItems: "5",
      TotalAmount: "50",
      date_time: "5.11.2025 - 15:20",
      status: "Completed",
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "ID" },
    { field: "Ref" },
    { field: "Device", headerName: "Device/Location" },
    { headerName: "Customer Name", field: "CustomerName" },
    { field: "Mobile", headerName: "Mobile Number" },
    { field: "TotalItems", headerName: "Total Items" },
    { headerName: "Total Amount", field: "TotalAmount" },
    { headerName: "Date and Time", field: "date_time" },
    { headerName: "Status", field: "status" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionBtns,
      cellRendererParams: {
        // onEdit,
        // onDelete,
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
      <SellerNavbar />
      <div className="w-full p-8">
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg sm:text-xl md:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Sales Reports
            </h3>
          </div>
        </div>

        <div className="border shadow-md border-(--border-color) rounded-md p-4">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
            <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
              <select className="font-[500] border-b border-(--border-color) mainFont px-4 p-2 outline-none text-sm lg:text-base">
                <option>All</option>
                <option>Order</option>
                <option>Completed</option>
                <option>Canceled</option>
                <option>Refunded</option>
                <option>No Sale</option>
              </select>
              <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                  2
                </p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4 justify-between items-center">
              {/*<button className="flex justify-between items-center gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                  Sort <SortIcon />
                </button>
                <button className="flex justify-between items-center gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                  Filter <FilterIcon />
                </button>*/}
              <select className="font-[500] border-b border-(--border-color) mainFont px-4 p-2 outline-none text-sm lg:text-base">
                <option>Today</option>
                <option>Last Day</option>
                <option>Last 3 Day</option>
                <option>Last 7 Day</option>
                <option>Last 30 Day</option>
              </select>
              <button className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
                Export CSV <Download size={16} />
              </button>
              <button className="cursor-pointer">
                <DeleteIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="w-full h-[60vh] mt-5 ">
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              // loading={loading}
              defaultColDef={defaultColDef}
              pagination={true}
              // rowSelection={rowSelection}
              onSelectionChanged={(event) => console.log("Row Selected!")}
              onCellValueChanged={(event) =>
                console.log(`New Cell Value: ${event.value}`)
              }
              className="w-full h-full text-sm"
            />
          </div>
        </div>
      </div>

      {/* <ViewSalesDetails /> */}
    </>
  );
};

export default Sales;

const ViewSalesDetails = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen flex justify-center z-50 bg-red-400 items-center backdrop-blur-sm">
        <div className="bg-(--primary-color) w-[50%] rounded-md p-5"></div>
      </div>
    </>
  );
};
