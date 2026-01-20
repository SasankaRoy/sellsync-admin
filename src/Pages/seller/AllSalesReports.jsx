import React, { useMemo, useState } from "react";
import { SellerNavbar } from "../../components/common/Navbars/SellerNavbar";
import {
  ArrowLeft,
  BadgeDollarSign,
  ChartBarStacked,
  CircleOff,
  PiggyBank,
  TicketX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Overviewcards } from "../../components/common/Overviewcards/Overviewcards";
import moment from "moment";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "../../utils/apis/getAllTransaction";
import { Loading } from "../../components/UI/Loading/Loading";

ModuleRegistry.registerModules([AllCommunityModule]);
const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const AllSalesReports = () => {
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [refunds, setRefunds] = useState([]);
  const [totalTaking, setTotalTaking] = useState(0);
  const {
    data: rowData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get_all_transaction"],
    queryFn: async () => {
      const { pagination, transactions } = await getAllTransactions({
        storeId: "",
        method: "",
        status: "",
        page: 1,
        limit: 50,
        search: "",
      });

      if (pagination) {
        console.log(pagination.total);
        setTotalTransaction(pagination.total);
      }
      if (transactions) {
        setRefunds(transactions.filter((item) => item.status === "REFUND"));
        const total = transactions.reduce((acc, cur) => {
          if (cur.status === "PAID") {
            return acc + cur.grandTotal;
          }
        }, 0);

        setTotalTaking(total.toFixed(2));
      }

      return transactions || [];
    },
  });

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "billId", headerName: "Bill Id" },
    { field: "method", headerName: "Payment Type" },
    { headerName: "Status", field: "status" },
    {
      field: "grandTotal",
      headerName: "Grand Total",
      cellRenderer: (amount) => {
        return Math.round(Number(amount.value) * 100) / 100;
      },
    },
    {
      field: "subTotal",
      headerName: "Sub Total",
      cellRenderer: (amount) => {
        return Math.round(Number(amount.value) * 100) / 100;
      },
    },
    {
      headerName: "Transaction Date",
      field: "created_at",
      cellRenderer: (time) => {
        return moment(time.value).format("lll");
      },
    },
    {
      field: "tendered",
      headerName: "Tendered",
      cellRenderer: (amount) => {
        return Math.round(Number(amount.value) * 100) / 100;
      },
    },
    {
      headerName: "Change",
      field: "change",
      cellRenderer: (amount) => {
        return Math.round(Number(amount.value) * 100) / 100;
      },
    },
    {
      field: "change",
      headerName: "Payout",
      cellRenderer: (amount) => {
        return Math.round(Number(amount.value) * 100) / 100;
      },
    },
    {
      headerName: "Total Sale",
      field: "Sale",
      cellRenderer: (item) => {
        const { grandTotal, tendered } = item.data;
        // console.log(amount.data.grandTotal amount.data.tendered)
        return Math.round(Number(grandTotal) * 100) / 100;
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

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <SellerNavbar />
          <div className="w-full max-w-full p-3 sm:p-4 lg:p-6 overflow-y-auto overflow-x-hidden h-[calc(100vh-70px)] sm:h-[calc(100vh-80px)]">
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4">
              <button
                onClick={handleGoBack}
                className="flex items-center mainFont font-semibold border border-(--border-color) px-3 sm:px-4 py-1.5 rounded-full gap-2 text-xs sm:text-sm lg:text-[1dvw] text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <span className="p-1.5 flex justify-center items-center bg-(--button-color1) text-white rounded-full shrink-0">
                  <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                </span>
                <span className="hidden sm:inline">Back to Tasks</span>
              </button>
              <h3 className="text-sm sm:text-base lg:text-[1.3dvw] font-[500]">
                Reports
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
              <Overviewcards
                cardTitle="Total Sale"
                cardValue={totalTransaction}
                percent="Up"
                className="text-xs sm:text-sm lg:text-base"
                icon={<BadgeDollarSign size={40} color="green" />}
              />
              <Overviewcards
                cardTitle="Refunded"
                cardValue={refunds.length}
                percent="Down"
                className="text-xs sm:text-sm lg:text-base"
                icon={<TicketX size={40} color="red" />}
              />

              <Overviewcards
                cardTitle="Taking"
                cardValue={totalTaking}
                percent="Up"
                className="text-xs sm:text-sm lg:text-base"
                icon={<ChartBarStacked size={40} color="blue" />}
              />
            </div>

            <div className="flex flex-col justify-center gap-5">
              <div className="flex-1 min-h-[250px] lg:min-h-[250px]">
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
              <div className="w-full  lg:flex-shrink-0 p-2 sm:p-3 lg:p-0">
                <div className="border-b flex justify-start items-center gap-2 sm:gap-4 border-(--border-color) p-2 sm:p-3">
                  <PiggyBank size={28} className="sm:w-10 sm:h-10" />
                  <h3 className="text-sm sm:text-base lg:text-[1.7dvw] font-semibold">
                    Cash Reconciliation
                  </h3>
                </div>

                <div className="flex justify-start items-center my-2 sm:my-4 gap-3 sm:gap-5 px-3 sm:px-6">
                  <p className="text-xs sm:text-sm lg:text-[1.1dvw] font-semibold paraFont whitespace-nowrap">
                    Starting Cash:
                  </p>
                  <input
                    className="bg-(--secondary-color) text-xs sm:text-sm lg:text-[1.3dvw] px-2 sm:px-3 py-1 sm:py-1.5 outline-none border-none w-24 sm:w-32"
                    placeholder="1000"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6 border-b border-(--border-color) px-2 sm:px-3 py-3 sm:py-5  ">
                  {[
                    { label: "$100" },
                    { label: "$50" },
                    { label: "$20" },
                    { label: "$10" },
                    { label: "$5" },
                    { label: "$2" },
                    { label: "$1" },
                    { label: "50¢" },
                    { label: "25¢" },
                    { label: "10¢" },
                    { label: "5¢" },
                    { label: "1¢" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-1.5 sm:p-2 bg-(--secondary-color) flex justify-start items-center gap-2 border border-(--border-color)/40 rounded"
                    >
                      <h3 className="mainFont font-semibold text-xs sm:text-sm lg:text-[1.2dvw]">
                        {item.label}:
                      </h3>
                      <input
                        className="bg-(--secondary-color) border border-transparent w-full px-1.5 sm:px-2 py-2 sm:py-2 rounded text-[1.2dvw] active:border-(--button-color1) focus:border-(--button-color1) focus:ring-(--button-color1) focus:outline-(--button-color1) active:outline-(--button-color1) transition-all ease-linear duration-200  mainFont focus:shadow-(--button-color1) active:shadow-(--button-color1)"
                        placeholder="00"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center w-full my-2 sm:my-4 gap-2">
                  <div className="flex justify-start items-center gap-2 sm:gap-5 px-2 sm:px-6 w-full sm:w-auto">
                    <p className="text-xs sm:text-sm lg:text-[1.1dvw] font-semibold paraFont whitespace-nowrap">
                      Total:
                    </p>
                    <input
                      className="bg-(--secondary-color) text-xs sm:text-sm lg:text-[1.3dvw] px-2 sm:px-3 py-1 sm:py-1.5 outline-none border-none w-24 sm:w-32"
                      placeholder="1000"
                    />
                  </div>
                  <div className="flex justify-start items-center gap-2 sm:gap-5 px-2 sm:px-6 w-full sm:w-auto">
                    <p className="text-xs sm:text-sm lg:text-[1.1dvw] font-semibold paraFont whitespace-nowrap">
                      Sale:
                    </p>
                    <input
                      className="bg-(--secondary-color) text-xs sm:text-sm lg:text-[1.3dvw] px-2 sm:px-3 py-1 sm:py-1.5 outline-none border-none w-24 sm:w-32"
                      placeholder="1000"
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center mt-2 sm:mt-3">
                  <button className="bg-(--button-color1) text-(--primary-color) mainFont font-semibold w-[85%] text-xs sm:text-sm lg:text-[1.3dvw] py-2 sm:py-3 rounded-md cursor-pointer">
                    Log Off
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
