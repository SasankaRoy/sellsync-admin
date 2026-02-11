import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Overviewcards } from "../../../components/common/Overviewcards/Overviewcards";
import {
  CostIcon,
  DeleteIcon,
  FilterIcon,
  ItemSoldIcon,
  NetsaleAmountIcon,
  ProfitIcon,
  SortIcon,
} from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { useQuery } from "@tanstack/react-query";
import { handleGetAllBills } from "../../../utils/apis/getBillDetails";
import moment from "moment";
import { Eye, Trash } from "lucide-react";
import { Loading } from "../../../components/UI/Loading/Loading";
import { ViewSales } from "../../../components/common/Models/ViewSales";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

const ActionBtns = (props) => {
  const { onEdit, onDelete, data } = props;
  // const { data } = props;

  const handleEdit = () => {
    console.log(data);
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

export const Sale = () => {
  const [filter, setFilter] = useState({
    byDate: "TODAY",
    byStatus: "",
    userType: "",
  });
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
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

  const checkStatus = (status) => {
    switch (status) {
      case "OPEN":
        return {
          forDot: "bg-blue-500",
          forText: "text-blue-500",
        };
        break;
      case "PAID":
        return {
          forDot: "bg-green-500",
          forText: "text-green-500",
        };
        break;
      case "HOLD":
        return {
          forDot: "bg-yellow-500",
          forText: "text-yellow-500",
        };
        break;
      case "CANCELLED":
        return {
          forDot: "bg-red-500",
          forText: "text-red-500",
        };
        break;

      default:
        break;
    }
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "_id", headerName: "ID" },
    {
      field: "MobileNumber",
      headerName: "Mobile Number",
      cellRenderer: (name) => {
        return name.value ? name.value : "Unknown Customer";
      },
    },
    { field: "device_location", headerName: "Device/Location" },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (status) => {
        return (
          <>
            <div className=" px-3 flex justify-center items-center w-auto gap-3">
              <div
                className={`h-[.8dvw] w-[.8dvw] rounded-full ${checkStatus(status.value).forDot}`}
              ></div>
              <p
                className={`font-medium ${checkStatus(status.value).forText} text-[1.2dvw]`}
              >
                {status.value}
              </p>
            </div>
          </>
        );
      },
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      cellRenderer: (amount) => {
        return `$ ${amount.value.toFixed(2)}`;
      },
    },
    { field: "total_items", headerName: "Total Items" },
    {
      field: "created_at",
      headerName: "Date and Time",
      cellRenderer: (time) => {
        return moment(time.value).format("lll");
      },
    },
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

  const {
    data: rowData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get_all_transactions", filter, currentPage, itemsPerPage],
    queryFn: () =>
      handleGetAllBills({
        byDate: filter.byDate,
        byStatus: filter.byStatus,
        page: currentPage,
        limit: itemsPerPage,
        search: "",
        userType: filter.userType,
      }),
  });

  const { totalSalesAmount, totalItemsSold } = useMemo(() => {
    if (!rowData || !Array.isArray(rowData)) {
      return { totalSalesAmount: 0, totalItemsSold: 0 };
    }
    return rowData.reduce(
      (acc, bill) => {
        acc.totalSalesAmount += Number(bill.total_amount) || 0;
        acc.totalItemsSold += Number(bill.total_items) || 0;
        return acc;
      },
      { totalSalesAmount: 0, totalItemsSold: 0 },
    );
  }, [rowData]);

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            className="pb-14 w-full px-4 sm:px-6 lg:px-0 h-[calc(100vh-5rem)]"
            style={{ marginTop: 0 }}
          >
            <div className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
                <h3 className="text-2xl sm:text-3xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                  Sales
                </h3>
                <div className="relative w-full sm:w-auto max-w-xs">
                  <select
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        byDate: e.target.value,
                      });
                    }}
                    value={filter.byDate}
                    className="appearance-none pl-4 pr-10 py-2 bg-[var(--button-color2)] text-[var(--primary-color)] rounded-full font-[var(--paraFont)] text-sm sm:text-base w-full"
                  >
                    <option value="TODAY">Today</option>
                    <option value="LAST_DAY">Last Day</option>
                    <option value="LAST_3_DAY">Last 3 Day</option>
                    <option value="LAST_7_DAY">Last 7 Day</option>
                    <option value="LAST_30_DAY">Last 30 Day</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--primary-color)]">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full my-4 lg:my-3">
              <Overviewcards
                cardTitle="Sales Amount"
                cardValue={`$ ${totalSalesAmount.toFixed(2)}`}
                percent="+4"
                className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
                icon={
                  <NetsaleAmountIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />
                }
              />
              <Overviewcards
                cardTitle="Total Items Sold"
                cardValue={totalItemsSold}
                percent="-2"
                className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
                icon={
                  <ItemSoldIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />
                }
              />
              <Overviewcards
                cardTitle="Cost"
                cardValue="$4,216"
                percent="-4"
                className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
                icon={
                  <CostIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />
                }
              />
              <Overviewcards
                cardTitle="Profit"
                cardValue="$1,240"
                percent="+14"
                className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
                icon={
                  <ProfitIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />
                }
              />
            </div>

            <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[60dvh]">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
                <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
                  <select
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        byStatus: e.target.value,
                      });
                    }}
                    value={filter.byStatus}
                    className="font-[500] border-b border-(--border-color) mainFont px-2 sm:px-4 py-1 sm:p-2 outline-none text-xs sm:text-sm lg:text-base"
                  >
                    <option value="">All</option>
                    <option value="OPEN">Open</option>
                    <option value="HOLD">Order</option>
                    <option value="PAID">Completed</option>
                    <option value="CANCELLED">Canceled</option>
                  </select>
                  <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                    <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                      {rowData?.length}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-4 justify-end items-center">
                  {/*<button className="flex justify-between items-center gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                Sort <SortIcon />
              </button>
              <button className="flex justify-between items-center gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                Filter <FilterIcon />
              </button>*/}
                  <button>
                    <DeleteIcon />
                  </button>
                </div>
              </div>
              <div className="h-full w-full overflow-x-scroll overflow-y-auto">
                <div className="min-w-[800px] h-full">
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
                    className="w-full h-full text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {viewSale.state && viewSale.billId && (
            <ViewSales setViewSale={setViewSale} billID={viewSale.billId} />
          )}
        </>
      )}
    </Layout>
  );
};
