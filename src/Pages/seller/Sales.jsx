import React, { useMemo, useState } from "react";
import { Eye, Download, Trash } from "lucide-react";

import { DeleteIcon } from "../../assets/Svgs/AllSvgs";
import { SellerNavbar } from "../../components/common/Navbars/SellerNavbar";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios-interceptor";
import moment from "moment";
import { Loading } from "../../components/UI/Loading/Loading";
import { ViewSales } from "../../components/common/Models/ViewSales";

ModuleRegistry.registerModules([AllCommunityModule]);
const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

const ActionBtns = (props) => {
  const { onEdit, onDelete, data } = props;
  // const { data } = props;

  const handleEdit = () => {
    onEdit(data);
  };

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
          onClick={handleEdit}
        >
          <Eye size={18} />
        </button>

        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1.5 rounded-full border-none cursor-pointer"
          // onClick={handleDelete}
        >
          <Trash size={18} />
        </button>
      </div>
    </>
  );
};

const Sales = () => {
  const [viewSale, setViewSale] = useState({
    state: false,
    billId: null,
  });

  const onEdit = (currentBillData) => {
    setViewSale({
      state: true,
      billId: currentBillData._id,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "_id", headerName: "ID" },
    // { field: "Ref" },
    { field: "device_location", headerName: "Device/Location" },
    { headerName: "Customer Name", field: "CustomerName" },
    { field: "mobile_number", headerName: "Mobile Number" },
    { field: "total_items", headerName: "Total Items" },
    { headerName: "Total Amount", field: "total_amount" },
    {
      headerName: "Date and Time",
      field: "created_at",
      cellRenderer: (time) => {
        return moment(time.value).format("lll");
      },
    },
    { headerName: "Status", field: "status" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionBtns,
      cellRendererParams: {
        onEdit,
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

  const handleGetSalesData = async () => {
    try {
      const getSalesData = await axiosInstance.get("/api/v1/bills");
      if (getSalesData.data && getSalesData.status === 200) {
        return getSalesData.data.bills;
      }

      return getSalesData.data.bills;
    } catch (error) {
      console.log("🚀 ~ handleGetSalesData ~ error:", error);
      return (
        error.message ||
        error.response.data.message ||
        "Failed to fetch sales data"
      );
    }
  };
  const {
    data: rowData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get_sales"],
    queryFn: handleGetSalesData,
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <SellerNavbar />
          <div className="w-full max-w-full p-3 sm:p-4 lg:p-8 overflow-y-auto overflow-x-hidden h-[calc(100vh-70px)] sm:h-[calc(100vh-80px)]">
            <div className="w-full mb-4 sm:mb-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                  Sales Reports
                </h3>
              </div>
            </div>

            <div className="border shadow-md border-(--border-color) rounded-md p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-2 sm:py-1.5 shrink-0 gap-3 sm:gap-0 flex-wrap">
                <div className="flex justify-between sm:justify-center items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <select className="font-[500] border-b border-(--border-color) mainFont px-2 sm:px-4 py-1 sm:p-2 outline-none text-xs sm:text-sm lg:text-base">
                    <option>All</option>
                    <option>Order</option>
                    <option>Completed</option>
                    <option>Canceled</option>
                    <option>Refunded</option>
                    <option>No Sale</option>
                  </select>
                  <div className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.25rem] min-h-[1.25rem] sm:min-w-[1.5rem] sm:min-h-[1.5rem]">
                    <p className="text-xs sm:text-xs md:text-sm lg:text-[0.8dvw] font-[500] text-white">
                      2
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3 lg:gap-4 justify-between items-center flex-wrap w-full sm:w-auto">
                  <select className="font-[500] border-b border-(--border-color) mainFont px-2 sm:px-4 py-1 sm:p-2 outline-none text-xs sm:text-sm lg:text-base flex-1 sm:flex-none">
                    <option>Today</option>
                    <option>Last Day</option>
                    <option>Last 3 Day</option>
                    <option>Last 7 Day</option>
                    <option>Last 30 Day</option>
                  </select>
                  <button className="px-3 sm:px-4 lg:px-5 py-1.5 sm:py-1 lg:py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-1 sm:gap-2 lg:gap-4 text-white mainFont font-[500] cursor-pointer text-xs sm:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear whitespace-nowrap">
                    Export CSV <Download size={14} className="sm:w-4 sm:h-4" />
                  </button>
                  <button className="cursor-pointer p-1.5 sm:p-2">
                    <DeleteIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Table Container with responsive height */}
              <div className="w-full max-w-full mt-4 sm:mt-5 max-h-[50vh] sm:max-h-[60vh] overflow-x-auto">
                <AgGridReact
                  rowData={rowData}
                  columnDefs={colDefs}
                  defaultColDef={defaultColDef}
                  pagination={true}
                  paginationPageSize={5}
                  onSelectionChanged={(event) => console.log("Row Selected!")}
                  onCellValueChanged={(event) =>
                    console.log(`New Cell Value: ${event.value}`)
                  }
                  className="w-full h-full text-xs sm:text-sm ag-theme-quartz"
                  domLayout="autoHeight"
                />
              </div>
            </div>
          </div>

          {viewSale.state && viewSale.billId && (
            <ViewSales setViewSale={setViewSale} billID={viewSale.billId} />
          )}
        </>
      )}
    </>
  );
};

export default Sales;
