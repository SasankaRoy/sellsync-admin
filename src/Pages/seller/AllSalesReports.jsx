import React, { useEffect, useMemo, useState } from "react";
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
import { getAllTransactions } from "../../utils/apis/getAllTransaction";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetStartingCash } from "../../utils/apis/getStartingCash";
import { handleLogOut } from "../../utils/apis/handleLogout";
import { useSelector } from "react-redux";
// import { Loading } from "../../components/UI/Loading/Loading";

ModuleRegistry.registerModules([AllCommunityModule]);
const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const AllSalesReports = () => {
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [transactions, setTransactions] = useState([]);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [dayFilter, setDayFilter] = useState('TODAY');
  const queryClient = useQueryClient();
  const [gridApi, setGridApi] = useState(null);
  const [cashNotation, setCashNotation] = useState({
    100: '',
    50: '',
    20: '',
    10: '',
    5: '',
    2: '',
    1: '',
    0.50: '',
    0.25: '',
    0.10: '',
    0.05: '',
    0.01: ''
  });
  const [totalNotationAmount, setTotalNotationAmount] = useState(0);
  const loggedUser = useSelector(state => state.loggedUser)


  const onGridReady = (params) => {
    setGridApi(params.api);

    const dataSource = {
      rowCount: undefined,
      getRows: async (params) => {
        const { startRow, endRow } = params;
        const page = Math.floor(startRow / itemsPerPage) + 1;

        try {
          const response = await queryClient.fetchQuery({
            queryKey: ["get_all_transactions", page, itemsPerPage, dayFilter],
            queryFn: () => getAllTransactions({
              storeId: "",
              method: "",
              status: "",
              page: page,
              limit: itemsPerPage,
              search: "",
              day: dayFilter
            })
          });

          if (response && response.transactions) {
            setTransactions(response.transactions);
            setTotalTransaction(response.pagination?.total || 0);
            params.successCallback(response.transactions, response.pagination?.total);
          } else {
            params.successCallback([], 0);
          }
        } catch (e) {
          console.error("Error fetching data", e);
          params.failCallback();
        }
      },
    };
    params.api.setGridOption("datasource", dataSource);
  };

  useEffect(() => {
    if (gridApi) {
      gridApi.refreshInfiniteCache();
    }
  }, [dayFilter, itemsPerPage, gridApi]);

  const refunds = useMemo(() => {
    return transactions.filter((item) => item.status === "REFUND");
  }, [transactions]);

  const totalTaking = useMemo(() => {
    const total = transactions.reduce((acc, cur) => {
      if (cur.status === "PAID") {
        return acc + cur.grandTotal;
      }
      return acc;
    }, 0);

    return total.toFixed(2);
  }, [transactions]);

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

  // get starting cash...
  const { data: startingCash, isLoading, isError } = useQuery({
    queryKey: ['get_starting_cash'],
    queryFn: GetStartingCash
  });



  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCashNotation({
      ...cashNotation, [name]: value
    })
  }

  useEffect(() => {
    const calculateNotationAmount = () => {
      const amount = Object.entries(cashNotation).reduce(
        (sum, [note, count]) => sum + Number(note) * count,
        0
      )

      setTotalNotationAmount(amount)
    }

    calculateNotationAmount()
  }, [cashNotation])












  return (
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
              columnDefs={colDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={itemsPerPage}
              cacheBlockSize={itemsPerPage}
              rowModelType="infinite"
              onGridReady={onGridReady}
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
                placeholder={startingCash}
                readOnly
                value={startingCash}
              />
            </div>
            <div className="grid grid-cols-2 gap-6 border-b border-(--border-color) px-2 sm:px-3 py-3 sm:py-5  ">
              {[
                { label: "$100", name: '100' },
                { label: "$50", name: '50' },
                { label: "$20", name: '20' },
                { label: "$10", name: '10' },
                { label: "$5", name: '5' },
                { label: "$2", name: '2' },
                { label: "$1", name: '1' },
                { label: "50¢", name: '0.5' },
                { label: "25¢", name: '0.25' },
                { label: "10¢", name: '0.1' },
                { label: "5¢", name: '0.05' },
                { label: "1¢", name: '0.01' },
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
                    placeholder="00" name={item.name} value={cashNotation[item.name]} onChange={handleOnChange} min='0'
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
                  className={`bg-(--secondary-color) text-xs sm:text-sm lg:text-[1.3dvw] px-2 sm:px-3 py-1 sm:py-1.5 outline-none border-none font-semibold w-24 sm:w-32 ${(parseFloat(totalTaking) + parseFloat(startingCash)) === totalNotationAmount ? 'text-(--button-color5)' : 'text-(--Negative-color)'}`}
                  placeholder="00" value={totalNotationAmount}
                />
              </div>
              <div className="flex justify-start items-center gap-2 sm:gap-5 px-2 sm:px-6 w-full sm:w-auto">
                <p className="text-xs sm:text-sm lg:text-[1.1dvw] font-semibold paraFont whitespace-nowrap">
                  Sale:
                </p>
                <input
                  className={`bg-(--secondary-color) text-xs sm:text-sm lg:text-[1.3dvw] px-2 sm:px-3 py-1 sm:py-1.5 outline-none border-none font-semibold w-24 sm:w-32 `} readOnly
                  placeholder="1000"
                  value={parseFloat(startingCash) + parseFloat(totalTaking)}
                />
              </div>
            </div>
            <div className="flex justify-center items-center mt-2 sm:mt-3">
              <button onClick={() => {
                handleLogOut({
                  startingCash: startingCash,
                  employeeId: loggedUser.id,
                  currency: '$',
                  totalTaking: totalTaking,
                  totalNotationAmount: totalNotationAmount,
                  totalBalance: parseFloat(startingCash) + parseFloat(totalTaking),
                  cashNotation
                })
              }} disabled={(parseFloat(totalTaking) + parseFloat(startingCash)) !== totalNotationAmount} className="bg-(--Negative-color) text-(--primary-color) mainFont font-semibold w-[85%] text-xs sm:text-sm lg:text-[1.3dvw] py-2 sm:py-3 rounded-md cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70">
                Log Off / Close Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



// import React, { useMemo, useState, useEffect } from "react";
// import { SellerNavbar } from "../../components/common/Navbars/SellerNavbar";
// import {
//   ArrowLeft,
//   BadgeDollarSign,
//   ChartBarStacked,
//   CircleOff,
//   PiggyBank,
//   TicketX,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { Overviewcards } from "../../components/common/Overviewcards/Overviewcards";
// import moment from "moment";

// import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// // Core CSS
// import { AgGridReact } from "ag-grid-react";
// import { getAllTransactions } from "../../utils/apis/getAllTransaction";
// import { useQueryClient } from "@tanstack/react-query";
// // import { Loading } from "../../components/UI/Loading/Loading";

// ModuleRegistry.registerModules([AllCommunityModule]);
// const rowSelection = {
//   mode: "multiRow",
//   headerCheckbox: false,
// };

// export const AllSalesReports = () => {
//   const [itemsPerPage, setItemsPerPage] = useState(50);
//   const [transactions, setTransactions] = useState([]);
//   const [totalTransaction, setTotalTransaction] = useState(0);
//   const [dayFilter,setDayFilter] = useState('TODAY');
//   const [gridApi, setGridApi] = useState(null);
//   const queryClient = useQueryClient();

//   const onGridReady = (params) => {
//     setGridApi(params.api);
//     const dataSource = {
//       rowCount: undefined,
//       getRows: async (params) => {
//         const { startRow, endRow } = params;
//         const page = Math.floor(startRow / itemsPerPage) + 1;

//         try {
//           const response = await queryClient.fetchQuery({
//             queryKey: ['allTransactions', page, itemsPerPage, dayFilter],
//             queryFn: async () => {
//               return getAllTransactions({
//                 storeId: "",
//                 method: "",
//                 status: "",
//                 page: page,
//                 limit: itemsPerPage,
//                 search: "",
//                 day: dayFilter
//               });
//             },
//             staleTime: 5 * 60 * 1000, // 5 minutes stale time for caching
//           });

//           if (response && response.transactions) {
//             setTransactions(response.transactions);
//             setTotalTransaction(response.pagination?.total || 0);
//             params.successCallback(response.transactions, response.pagination?.total);
//           } else {
//             params.successCallback([], 0);
//           }
//         } catch (e) {
//           console.error("Error fetching data", e);
//           params.failCallback();
//         }
//       },
//     };
//     params.api.setGridOption("datasource", dataSource);
//   };

//   useEffect(() => {
//     if (gridApi) {
//       gridApi.refreshInfiniteCache();
//     }
//   }, [dayFilter, itemsPerPage, gridApi]);

//   const refunds = useMemo(() => {
//     return transactions.filter((item) => item.status === "REFUND");
//   }, [transactions]);

//   const totalTaking = useMemo(() => {
//     const total = transactions.reduce((acc, cur) => {
//       if (cur.status === "PAID") {
//         return acc + cur.grandTotal;
//       }
//       return acc;
//     }, 0);

//     return total.toFixed(2);
//   }, [transactions]);

//   // Column Definitions: Defines & controls grid columns.
//   const [colDefs, setColDefs] = useState([
//     { field: "billId", headerName: "Bill Id" },
//     { field: "method", headerName: "Payment Type" },
//     { headerName: "Status", field: "status" },
//     {
//       field: "grandTotal",
//       headerName: "Grand Total",
//       cellRenderer: (amount) => {
//         return Math.round(Number(amount.value) * 100) / 100;
//       },
//     },
//     {
//       field: "subTotal",
//       headerName: "Sub Total",
//       cellRenderer: (amount) => {
//         return Math.round(Number(amount.value) * 100) / 100;
//       },
//     },
//     {
//       headerName: "Transaction Date",
//       field: "created_at",
//       cellRenderer: (time) => {
//         return moment(time.value).format("lll");
//       },
//     },
//     {
//       field: "tendered",
//       headerName: "Tendered",
//       cellRenderer: (amount) => {
//         return Math.round(Number(amount.value) * 100) / 100;
//       },
//     },
//     {
//       headerName: "Change",
//       field: "change",
//       cellRenderer: (amount) => {
//         return Math.round(Number(amount.value) * 100) / 100;
//       },
//     },
//     {
//       field: "change",
//       headerName: "Payout",
//       cellRenderer: (amount) => {
//         return Math.round(Number(amount.value) * 100) / 100;
//       },
//     },
//     {
//       headerName: "Total Sale",
//       field: "Sale",
//       cellRenderer: (item) => {
//         const { grandTotal, tendered } = item.data;
//         // console.log(amount.data.grandTotal amount.data.tendered)
//         return Math.round(Number(grandTotal) * 100) / 100;
//       },
//     },
//   ]);

//   // Apply settings across all columns
//   const defaultColDef = useMemo(() => {
//     return {
//       filter: true,
//       editable: false,
//     };
//   }, []);

//   const navigate = useNavigate();
//   const handleGoBack = () => {
//     navigate(-1);
//   };
//   return (
//     <>
//       <SellerNavbar />
//       <div className="w-full max-w-full p-3 sm:p-4 lg:p-6 overflow-y-auto overflow-x-hidden h-[calc(100vh-70px)] sm:h-[calc(100vh-80px)]">
//         <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4">
//           <button
//             onClick={handleGoBack}
//             className="flex items-center mainFont font-semibold border border-(--border-color) px-3 sm:px-4 py-1.5 rounded-full gap-2 text-xs sm:text-sm lg:text-[1dvw] text-blue-600 hover:text-blue-800 cursor-pointer"
//           >
//             <span className="p-1.5 flex justify-center items-center bg-(--button-color1) text-white rounded-full shrink-0">
//               <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
//             </span>
//             <span className="hidden sm:inline">Back to Tasks</span>
//           </button>
//           <h3 className="text-sm sm:text-base lg:text-[1.3dvw] font-[500]">
//             Reports
//           </h3>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
//           <Overviewcards
//             cardTitle="Total Sale"
//             cardValue={totalTransaction}
//             percent="Up"
//             className="text-xs sm:text-sm lg:text-base"
//             icon={<BadgeDollarSign size={40} color="green" />}
//           />
//           <Overviewcards
//             cardTitle="Refunded"
//             cardValue={refunds.length}
//             percent="Down"
//             className="text-xs sm:text-sm lg:text-base"
//             icon={<TicketX size={40} color="red" />}
//           />

//           <Overviewcards
//             cardTitle="Taking"
//             cardValue={totalTaking}
//             percent="Up"
//             className="text-xs sm:text-sm lg:text-base"
//             icon={<ChartBarStacked size={40} color="blue" />}
//           />
//         </div>

//         <div className="flex flex-col justify-center gap-5">
//           <div className="flex-1 min-h-[250px] lg:min-h-[250px]">
//             <AgGridReact
//               columnDefs={colDefs}
//               defaultColDef={defaultColDef}
//               pagination={true}
//               paginationPageSize={itemsPerPage}
//               cacheBlockSize={itemsPerPage}
//               rowModelType="infinite"
//               onGridReady={onGridReady}
//               onSelectionChanged={(event) => console.log("Row Selected!")}
//               onCellValueChanged={(event) =>
//                 console.log(`New Cell Value: ${event.value}`)
//               }
//               className="w-full h-full text-xs sm:text-sm ag-theme-quartz"
//               domLayout="autoHeight"
//             />
//           </div>
//           <div className="w-full  lg:flex-shrink-0 p-2 sm:p-3 lg:p-0">
//             <div className="border-b flex justify-start items-center gap-2 sm:gap-4 border-(--border-color) p-2 sm:p-3">
//               <PiggyBank size={28} className="sm:w-10 sm:h-10" />
//               <h3 className="text-sm sm:text-base lg:text-[1.7dvw] font-semibold">
//                 Cash Reconciliation
//               </h3>
//             </div>

//             <div className="flex justify-start items-center my-2 sm:my-4 gap-3 sm:gap-5 px-3 sm:px-6">
//               <p className="text-xs sm:text-sm lg:text-[1.1dvw] font-semibold paraFont whitespace-nowrap">
//                 Starting Cash:
//               </p>
//               <input
//                 className="bg-(--secondary-color) text-xs sm:text-sm lg:text-[1.3dvw] px-2 sm:px-3 py-1 sm:py-1.5 outline-none border-none w-24 sm:w-32"
//                 placeholder="1000"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-6 border-b border-(--border-color) px-2 sm:px-3 py-3 sm:py-5  ">
//               {[
//                 { label: "$100" },
//                 { label: "$50" },
//                 { label: "$20" },
//                 { label: "$10" },
//                 { label: "$5" },
//                 { label: "$2" },
//                 { label: "$1" },
//                 { label: "50¢" },
//                 { label: "25¢" },
//                 { label: "10¢" },
//                 { label: "5¢" },
//                 { label: "1¢" },
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className="p-1.5 sm:p-2 bg-(--secondary-color) flex justify-start items-center gap-2 border border-(--border-color)/40 rounded"
//                 >
//                   <h3 className="mainFont font-semibold text-xs sm:text-sm lg:text-[1.2dvw]">
//                     {item.label}:
//                   </h3>
//                   <input
//                     className="bg-(--secondary-color) border border-transparent w-full px-1.5 sm:px-2 py-2 sm:py-2 rounded text-[1.2dvw] active:border-(--button-color1) focus:border-(--button-color1) focus:ring-(--button-color1) focus:outline-(--button-color1) active:outline-(--button-color1) transition-all ease-linear duration-200  mainFont focus:shadow-(--button-color1) active:shadow-(--button-color1)"
//                     placeholder="00"
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="flex flex-col sm:flex-row justify-between items-center w-full my-2 sm:my-4 gap-2">
//               <div className="flex justify-start items-center gap-2 sm:gap-5 px-2 sm:px-6 w-full sm:w-auto">
//                 <p className="text-xs sm:text-sm lg:text-[1.1dvw] font-semibold paraFont whitespace-nowrap">
//                   Total:
//                 </p>
//                 <input
//                   className="bg-(--secondary-color) text-xs sm:text-sm lg:text-[1.3dvw] px-2 sm:px-3 py-1 sm:py-1.5 outline-none border-none w-24 sm:w-32"
//                   placeholder="1000"
//                 />
//               </div>
//               <div className="flex justify-start items-center gap-2 sm:gap-5 px-2 sm:px-6 w-full sm:w-auto">
//                 <p className="text-xs sm:text-sm lg:text-[1.1dvw] font-semibold paraFont whitespace-nowrap">
//                   Sale:
//                 </p>
//                 <input
//                   className="bg-(--secondary-color) text-xs sm:text-sm lg:text-[1.3dvw] px-2 sm:px-3 py-1 sm:py-1.5 outline-none border-none w-24 sm:w-32"
//                   placeholder="1000"
//                 />
//               </div>
//             </div>
//             <div className="flex justify-center items-center mt-2 sm:mt-3">
//               <button className="bg-(--Negative-color) text-(--primary-color) mainFont font-semibold w-[85%] text-xs sm:text-sm lg:text-[1.3dvw] py-2 sm:py-3 rounded-md cursor-pointer">
//                 Log Off / Close Register
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
