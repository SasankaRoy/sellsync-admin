import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Linechart } from "../../../components/common/charts/Linechart";
import {
  BuyPriceIcon,
  DeleteIcon,
  FilterIcon,
  NetsaleAmountIcon,
  OverviewCardIcon1,
  ProfitIcon,
  RefundIcon,
  SortIcon,
} from "../../../assets/Svgs/AllSvgs";
import { Overviewcards } from "../../../components/common/Overviewcards/Overviewcards";
import { Doughtchart } from "../../../components/common/charts/Doughtchart";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCardData,
  getReportsData,
  getRevenueReport,
} from "../../../utils/apis/handleReports";
import { Loading } from "../../../components/UI/Loading/Loading";
import { TopSellingItems } from "../../../components/common/TopSellingItems/TopSellingItems";
import moment from "moment";
import { getAllTransactions } from "../../../utils/apis/getAllTransaction";
import { ArrowRight, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "none",
  headerCheckbox: false,
};

const saleData = [
  {
    name: "Beer",
    value: "2,344",
    color: "#13A34B",
  },
  {
    name: "Gin",
    value: "2,004",
    color: "#0052CC",
  },
  {
    name: "Whiskey",
    value: "1,988",
    color: "#420088",
  },
  {
    name: "Rum",
    value: "1,540",
    color: "#00C7E6",
  },
  {
    name: "Scotch",
    value: "1,340",
    color: "#F59E0B",
  },
  {
    name: "Wine",
    value: "840",
    color: "#FACC15",
  },
];

export const Reports = () => {
  const [filter, setFilter] = useState({
    day: "TODAY",
    storeId: "",
    method: "",
    status: "",
    startDate: "",
    endDate: "",
    limit: 100,
    search: "",
  });
  const [tableFilters, setTableFilters] = useState({
    currentCategory: 'Expense',
    day: 'TODAY',
    customRange: '',
    from: '',
    to: ''
  })
  const [year, setYear] = useState(new Date().getFullYear());
  const queryClient = useQueryClient();
  const containerRef = useRef(null);
  const printReportFunc = useReactToPrint({ contentRef:containerRef })


  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "billId", headerName: "Bill Id" },
    { field: "method", headerName: "Payment Type" },
    { headerName: "Status", field: "status" },
    {
      field: "grandTotal",
      headerName: "Grand Total",
      cellRenderer: (amount) => {
        return `$ ${Math.round(Number(amount.value) * 100) / 100}`;
      },
    },
    {
      field: "subTotal",
      headerName: "Sub Total",
      cellRenderer: (amount) => {
        return `$ ${Math.round(Number(amount.value) * 100) / 100}`;
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
        return `$ ${Math.round(Number(amount.value) * 100) / 100}`;
      },
    },
    {
      headerName: "Change",
      field: "change",
      cellRenderer: (amount) => {
        return `$ ${Math.round(Number(amount.value) * 100) / 100}`;
      },
    },
    {
      field: "change",
      headerName: "Payout",
      cellRenderer: (amount) => {
        return `$ ${Math.round(Number(amount.value) * 100) / 100}`;
      },
    },
    {
      headerName: "Total Sale",
      field: "Sale",
      cellRenderer: (item) => {
        const { grandTotal, } = item.data;
        // console.log(amount.data.grandTotal amount.data.tendered)
        return `$ ${Math.round(Number(grandTotal) * 100) / 100}`;
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

  const { data: cardData, isLoading } = useQuery({
    queryKey: ["get_card_data", filter],
    queryFn: async () => await getCardData(filter.day),
  });

  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ["get_revenue_data", year],
    queryFn: async () => await getRevenueReport(year),
  });

  const { data: rowDatas, isLoading: transactionLoading } = useQuery({
    queryKey: ["get_transaction_data", filter],
    queryFn: async () => {
      const { transactions } = await getAllTransactions({
        storeId: "",
        method: filter.method,
        status: filter.status,
        page: 1,
        limit: 100,
        search: "",
        day: filter.day,
      });

      return transactions || [];
    },
  });



  const profitValue = cardData?.profit || 0;
  const netSalesValue = cardData?.net_sales_amount || 0;
  const buyPriceValue = cardData?.buy_price || 0;

  const profitColor = profitValue < 0 ? "Red" : "Green";

  const filterLabels = {
    TODAY: "Today",
    LAST_DAY: "Yesterday",
    LAST_3_DAY: "Last 3 days",
    LAST_7_DAY: "Last 7 days",
    LAST_30_DAY: "Last 30 days",
  };

  const currentPeriod = filterLabels[filter.day] || "This week";

  const calculatePercent = (value, total) => {
    if (!total || total === 0) return "0";
    return ((value / total) * 100).toFixed(1);
  };

  const profitPercent = calculatePercent(profitValue, netSalesValue);
  const buyPricePercent = calculatePercent(buyPriceValue, netSalesValue);

  const transformedRevenueData = useMemo(() => {
    if (!revenueData || !Array.isArray(revenueData)) return null;
    // Assuming revenueData is an array of objects with 'revenue' property in order of months
    return revenueData.map((item) => item.revenue || 0);
  }, [revenueData]);

  const { data: rowData, isLoading: reportsDataLoading } = useQuery({
    queryKey: ['get_report_data', tableFilters.currentCategory, tableFilters.day],
    queryFn: async () => {
      const resData = await getReportsData({
        currentReportCategory: tableFilters.currentCategory,
        customRang: {
          from: tableFilters.from,
          to: tableFilters.to
        },
        dayFilter: tableFilters.day,
      })

      const keys = Object.keys(resData.expenselist[0])
      if (keys.length > 0) {
        const columns = keys
          .filter((item) => item !== "vendor_details" && item !== "id") // 👈 skip this key
          .map((item) => ({
            field: item,
            headerName: item.toUpperCase(),
            width: 180,
          }));

        setColDefs(columns);
      }


      return resData
    }
  });












  const handleTableFilterSelectorOnChange = (e) => {
    if (e.target.value === 'Custom') {
      setTableFilters({
        ...tableFilters,
        customRange: e.target.value,
        day: ''
      });
      return;
    }
    setTableFilters({
      ...tableFilters,
      day: e.target.value,
      customRange: '',
      from: '',
      to: ''
    });

  }




  return (
    <Layout>
      {isLoading || revenueLoading || transactionLoading || reportsDataLoading ? (
        <Loading />
      ) : (
        <>
          {/* Desktop Layout */}
          <div className="flex flex-col gap-5 w-full">
            <div className="hidden xl:flex w-full justify-center gap-5">
              <div className="flex-1 shrink-0">
                <div className="flex justify-between items-center">
                  <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                    Reports & Analytics
                  </h3>
                  <div className="relative">
                    <select
                      onChange={(e) =>
                        setFilter({ ...filter, day: e.target.value })
                      }
                      value={filter.day}
                      className="appearance-none pl-4 pr-8 py-2 sm:py-1 bg-[var(--button-color2)] text-[var(--primary-color)] rounded-full font-[var(--paraFont)] text-sm sm:text-base w-full sm:w-auto cursor-pointer"
                    >
                      <option value={"TODAY"}>Today</option>
                      <option value={"LAST_DAY"}>Last day</option>
                      <option value={"LAST_3_DAY"}>Last 3 days</option>
                      <option value={"LAST_7_DAY"}>Last 7 days</option>
                      <option value={"LAST_30_DAY"}>Last 30 days</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--primary-color)]">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-2 w-full my-6">
                  <Overviewcards
                    cardTitle="Net Sales Amount"
                    cardValue={cardData?.net_sales_amount?.toFixed(2) || "0.00"}
                    percent="100"
                    isPositive={true}
                    periodText={currentPeriod}
                    icon={<NetsaleAmountIcon />}
                  />
                  <Overviewcards
                    cardTitle="Buy Price"
                    cardValue={cardData?.buy_price?.toFixed(2) || "0.00"}
                    percent={buyPricePercent}
                    isPositive={parseFloat(buyPricePercent) >= 0}
                    periodText={currentPeriod}
                    icon={<BuyPriceIcon />}
                  />
                  <Overviewcards
                    cardTitle="Profit"
                    cardValue={cardData?.profit?.toFixed(2) || "0.00"}
                    percent={profitPercent}
                    isPositive={parseFloat(profitPercent) >= 0}
                    periodText={currentPeriod}
                    icon={<ProfitIcon color={profitColor} />}
                  />
                </div>

                <div className="w-full bg-white p-2 h-[30dvh] flex justify-center items-center overflow-x-hidden">
                  <Linechart aspectRatio={4} chartData={transformedRevenueData} />
                </div>


              </div>

              <div className="w-[26%] shrink-0">
                <TopSellingItems />

                {/* <div className="my-5 bg-white rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[1dvw] font-[500]">Most Sold Category</h3>
                    <button className="bg-[#333333] text-white px-3 text-[.9dvw] cursor-pointer py-1 rounded-full">
                      See all
                    </button>
                  </div>
                  <div className="p-3 my-3">
                    <div>
                      <Doughtchart aspectRatio={1.5} />
                    </div>
                    <div>
                      <div className="flex-1 shrink-0 flex flex-col gap-3 justify-center items-start rounded-md bg-[var(--primary-color)] py-6 px-2">
                        {saleData.map((cur, id) => (
                          <div
                            key={id}
                            className="flex justify-between items-center w-[95%]"
                          >
                            <div className="flex justify-start gap-4 items-center">
                              <div
                                style={{
                                  background: cur.color,
                                }}
                                className="w-[1dvw] h-[1dvw] rounded-full"
                              />
                              <p className="font-semibold font-[var(--paraFont)] text-[1dvw] text-[var(--paraText-color)]">
                                {cur.name}
                              </p>
                            </div>
                            <h5 className="text-black font-medium text-[1dvw]">
                              ${cur.value}
                            </h5>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-end items-center mb-2.5">
                <button onClick={printReportFunc} className="px-5 py-2 bg-(--button-color1) flex justify-center items-center gap-4 cursor-pointer text-white mainFont font-semibold rounded-md">Print <Printer /></button>
              </div>

              <div ref={containerRef} id='print-section' className="w-full print-section flex-col flex gap-2  bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[75dvh]">
                <div className="flex justify-between items-center py-1.5 shrink-0">
                  <div className="flex justify-center items-center gap-3">
                    <select
                      onChange={(e) =>
                        setTableFilters({ ...tableFilters, currentCategory: e.target.value })
                      }
                      value={tableFilters.currentCategory}
                      className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-[1dvw]"
                    >
                      <option value="Expense">Expense</option>
                      <option value="Purchase">Purchase</option>
                      {/* <option value="REFUND">Refund</option>
                      <option value="VOID">Void</option> */}
                    </select>
                    <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                      <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                        {rowData?.expenselist?.length}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[1.3dvw] font-bold">Total Amount -  $ {rowData?.totalExpenseAmount}</h3>
                  </div>
                  <div className="flex gap-4 justify-center items-center">
                    <div className="flex justify-center items-center gap-5 transition-all duration-300 ease-linear">
                      <select
                        onChange={handleTableFilterSelectorOnChange}
                        value={tableFilters.day || tableFilters.customRange}
                        className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-[1dvw]"
                      >
                        <option value="TODAY">TODAY</option>
                        <option value="LAST_3_DAY">LAST 3 DAY</option>
                        <option value="LAST_7_DAY">LAST 7 DAY</option>
                        <option value="LAST_30_DAY">LAST 30 DAY</option>
                        <option value="Custom">Custom</option>
                      </select>

                      {
                        tableFilters.customRange && (
                          <div className="flex justify-center items-center gap-3 transition-all duration-300 ease-linear">
                            <div className="flex gap-3 justify-start items-center">
                              <label className="text-sm sm:text-base lg:text-[1dvw] shrink-0 font-normal paraFont">From : </label>
                              <input type="date" value={tableFilters.from} onChange={(e) => {
                                setTableFilters({
                                  ...tableFilters,
                                  from: moment(e.target.value).format('YYYY-MM-DD')
                                })
                              }} className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3" />
                            </div>
                            <div className="flex gap-3 justify-start items-center">
                              <label className="text-sm sm:text-base lg:text-[1dvw] shrink-0 font-normal paraFont">To : </label>
                              <input type="date" value={tableFilters.to} onChange={(e) => {
                                setTableFilters({
                                  ...tableFilters,
                                  to: moment(e.target.value).format('YYYY-MM-DD')
                                })
                              }} className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3" />
                            </div>
                            <button onClick={() => {
                              queryClient.invalidateQueries({
                                queryKey: ['get_report_data']
                              })
                            }} className="bg-(--button-color1) text-white h-[2dvw] w-[2dvw] rounded-full flex justify-center items-center cursor-pointer">
                              <ArrowRight size={20} />
                            </button>
                          </div>
                        )
                      }


                    </div>


                  </div>
                </div>
                <div className="h-full w-full">
                  <AgGridReact
                    rowData={rowData?.expenselist}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    rowSelection={rowSelection}
                    onSelectionChanged={() => console.log("Row Selected!")}
                    onCellValueChanged={(event) =>
                      console.log(`New Cell Value: ${event.value}`)
                    }
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Mobile and Tablet Layout */}
          <div className="block xl:hidden pb-14 w-full px-4 sm:px-6 lg:px-0">
            <div className="w-full">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
                <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                  Reports & Analytics
                </h3>
                <div className="relative w-full sm:w-auto">
                  <select className="appearance-none pl-4 pr-8 py-2 sm:py-1 bg-[var(--button-color2)] text-[var(--primary-color)] rounded-full font-[var(--paraFont)] text-sm sm:text-base w-full sm:w-auto cursor-pointer">
                    <option>Weekly</option>
                    <option>1 week</option>
                    <option>2 week</option>
                    <option>3 week</option>
                    <option>4 week</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--primary-color)]">
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

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Overviewcards
                cardTitle="Net Sales Amount"
                cardValue={cardData?.net_sales_amount?.toFixed(2) || "0.00"}
                percent="100"
                isPositive={true}
                periodText={currentPeriod}
                icon={<NetsaleAmountIcon />}
                className="w-full"
              />
              <Overviewcards
                cardTitle="Buy Price"
                cardValue={cardData?.buy_price?.toFixed(2) || "0.00"}
                percent={buyPricePercent}
                isPositive={parseFloat(buyPricePercent) >= 0}
                periodText={currentPeriod}
                icon={<BuyPriceIcon />}
                className="w-full"
              />
              <Overviewcards
                cardTitle="Profit"
                cardValue={cardData?.profit?.toFixed(2) || "0.00"}
                percent={profitPercent}
                isPositive={parseFloat(profitPercent) >= 0}
                periodText={currentPeriod}
                icon={<ProfitIcon color={profitColor} />}
                className="w-full"
              />
            </div>

            {/* Line Chart - Hidden on mobile */}
            <div className="hidden md:flex w-full h-64 justify-center items-center overflow-x-hidden mb-6">
              <Linechart aspectRatio={2.5} chartData={transformedRevenueData} />
            </div>

            {/* Top Selling Items */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
                <h3 className="text-lg font-semibold text-[var(--mainText-color)]">
                  Top Selling Items
                </h3>
                <button className="cursor-pointer bg-[var(--button-color2)] text-white px-3 py-2 rounded-full text-sm font-[var(--paraFont)] font-medium w-full sm:w-auto">
                  See all
                </button>
              </div>

              <div className="w-full rounded-lg overflow-hidden border border-[#D4D4D4] bg-white">
                <div className="bg-[var(--button-color2)] text-white flex">
                  <div className="flex-1 p-3 flex justify-start items-center">
                    <p className="text-sm font-medium">Product</p>
                  </div>
                  <div className="min-w-[20%] p-3 flex justify-center items-center border-l border-[#D4D4D4]">
                    <p className="text-sm font-medium">Qty</p>
                  </div>
                  <div className="min-w-[20%] p-3 flex justify-center items-center border-l border-[#D4D4D4]">
                    <p className="text-sm font-medium">Value</p>
                  </div>
                </div>

                {[1, 2, 3, 4, 5].map((cur, id) => (
                  <div
                    key={id}
                    className="w-full flex border-b border-[#D4D4D4]"
                  >
                    <div className="flex-1 p-3 flex justify-start items-center">
                      <p className="text-sm text-[#7F7F7F] font-[var(--paraFont)] line-clamp-2">
                        Budwiser Magnum 750ML
                      </p>
                    </div>
                    <div className="min-w-[20%] flex justify-center items-center border-l border-[#D4D4D4]">
                      <p className="font-semibold text-[#7F7F7F] font-[var(--paraFont)] text-sm">
                        12
                      </p>
                    </div>
                    <div className="min-w-[20%] flex justify-center items-center border-l border-[#D4D4D4]">
                      <p className="font-semibold text-[#7F7F7F] font-[var(--paraFont)] text-sm">
                        $52
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Sold Category */}
            <div className="bg-white rounded-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
                <h3 className="text-base font-medium">Most Sold Category</h3>
                <button className="bg-[#333333] text-white px-3 py-2 text-sm cursor-pointer rounded-full w-full sm:w-auto">
                  See all
                </button>
              </div>
              <div className="my-3">
                <div className="mb-4">
                  <Doughtchart aspectRatio={1.2} />
                </div>
                <div className="flex flex-col gap-3 justify-center items-start rounded-md bg-[var(--primary-color)] py-4 px-3">
                  {saleData.map((cur, id) => (
                    <div
                      key={id}
                      className="flex justify-between items-center w-full"
                    >
                      <div className="flex justify-start gap-3 items-center">
                        <div
                          style={{
                            background: cur.color,
                          }}
                          className="w-3 h-3 rounded-full flex-shrink-0"
                        />
                        <p className="font-semibold font-[var(--paraFont)] text-sm text-[var(--paraText-color)]">
                          {cur.name}
                        </p>
                      </div>
                      <h5 className="text-black font-medium text-sm">
                        ${cur.value}
                      </h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Refund Table */}
            <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[75vh]">
              <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-full">
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
                  <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
                    <h3 className="text-lg sm:text-base md:text-lg lg:text-[1.2dvw] font-[500]">
                      Refund
                    </h3>
                    <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                      <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                        242
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-4 justify-end items-center flex-wrap">
                    {/*<button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600] hover:text-white hover:bg-[#0052CC] transition-all duration-300 ease-linear">
                  Sort <SortIcon />
                </button>
                <button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC] hover:text-[#0052CC] hover:bg-white transition-all duration-300 ease-linear">
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
                      defaultColDef={defaultColDef}
                      pagination={true}
                      rowSelection={rowSelection}
                      onSelectionChanged={() => console.log("Row Selected!")}
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
        </>
      )}
    </Layout>
  );
};
