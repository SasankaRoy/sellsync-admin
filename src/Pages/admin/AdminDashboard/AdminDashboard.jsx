import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Overviewcards } from "../../../components/common/Overviewcards/Overviewcards";
import {
  NetsaleAmountIcon,
  OverviewCardIcon1,
  RefundIcon,
} from "../../../assets/Svgs/AllSvgs";
import ProductImg1 from "../../../assets/images/ProductImg1.png";
import { Linechart } from "../../../components/common/charts/Linechart";
import { Doughtchart } from "../../../components/common/charts/Doughtchart";
import { TopSellingItems } from "../../../components/common/TopSellingItems/TopSellingItems";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../../components/UI/Loading/Loading";
import {
  getDashboardSalesReport,
  getLowSrockData,
  getRevenueReport,
} from "../../../utils/apis/handleReports";
import { Link } from "react-router-dom";
import { getSalesReportByCategory } from "../../../utils/apis/handleReports";
import randomColor from "randomcolor";



export const AdminDashboard = () => {
  const [dayFilter, setDayFilter] = useState("TODAY");
  const [year, setYear] = useState(new Date().getFullYear());

  const {
    data: lowStock,
    isLoading: lowStockLoading,
    // isError,
  } = useQuery({
    queryKey: ["get_low_stock_data"],
    queryFn: async () => {
      const { results } = await getLowSrockData({
        page: 1,
        limit: 5,
      });
      if (results) {
        return results;
      }
      return [];
    },
    refetchInterval: 3000,
  });

  const {
    data: salesData,
    isLoading: saleDataLoading,
    // isError: saleDataError,
  } = useQuery({
    queryKey: ["get_sales_data", dayFilter],
    queryFn: async () => await getDashboardSalesReport(dayFilter),
  });
  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ["get_revenue_data", year],
    queryFn: async () => await getRevenueReport(year),
  });

  const transformedRevenueData = useMemo(() => {
    if (!revenueData || !Array.isArray(revenueData)) return null;
    // Assuming revenueData is an array of objects with 'revenue' property in order of months
    return revenueData.map((item) => item.revenue || 0);
  }, [revenueData]);

  const { data: categorySaleData, isLoading: categorySaleLoading } = useQuery({
    queryKey: ["get_category_saledata"],
    queryFn: async () => getSalesReportByCategory(),
    refetchInterval: 1000,
  });
  const RColors = useMemo(
    () =>
      randomColor({
        count: categorySaleData?.data.length,
        luminosity: "bright",
      }),
    [categorySaleData?.data],
  );

  return (
    <Layout>
      {lowStockLoading &&
      saleDataLoading &&
      revenueLoading &&
      categorySaleLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="w-full flex flex-col lg:flex-row justify-center gap-3 sm:gap-4 md:gap-4 lg:gap-5 px-2 sm:px-4 md:px-3 lg:px-0">
            <div className="flex-1 pb-8 sm:pb-12 md:pb-14 lg:pb-16">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6 md:mb-5">
                <h3 className="text-lg sm:text-xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                  Overview
                </h3>
                <div className="relative w-full sm:w-auto">
                  <select
                    value={dayFilter}
                    onChange={(e) => {
                      setDayFilter(e.target.value);
                    }}
                    className="appearance-none pl-4 pr-8 py-2 sm:py-1 md:py-1.5 bg-[var(--button-color2)] text-[var(--primary-color)] rounded-full font-[var(--paraFont)] text-sm sm:text-base md:text-base w-full sm:w-auto cursor-pointer"
                  >
                    <option value="TODAY">Today</option>
                    <option value="LAST_DAY">Last Day</option>
                    <option value="LAST_3_DAY">Last 3 Days</option>
                    <option value="LAST_7_DAY">Last 7 Days</option>
                    <option value="LAST_30_DAY">Last 30 Days</option>
                  </select>
                  <div className="pointer-events-none   absolute inset-y-0 right-0 flex items-center px-2 text-[var(--primary-color)]">
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

              {/* Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-3 lg:gap-2 w-full my-4 sm:my-6 md:my-5">
                <Overviewcards
                  cardTitle="Sales"
                  cardValue={salesData?.sales.count}
                  percent={salesData?.sales.percentage}
                  icon={<OverviewCardIcon1 />}
                  periodText={dayFilter}
                  isPositive={salesData?.sales.percentage > 0}
                />
                <Overviewcards
                  cardTitle="Refunds"
                  cardValue={salesData?.refunds.count}
                  percent={salesData?.refunds.percent}
                  icon={<RefundIcon />}
                  periodText={dayFilter}
                  isPositive={salesData?.refunds.percent > 0}
                />
                <div className="sm:col-span-2 md:col-span-1 lg:col-span-1">
                  <Overviewcards
                    cardTitle="Net Sales Amount"
                    cardValue={salesData?.net_sales_amount.amount.toFixed(0)}
                    percent={salesData?.net_sales_amount.percentage.toFixed(2)}
                    icon={<NetsaleAmountIcon />}
                    periodText={dayFilter}
                    isPositive={salesData?.net_sales_amount.percentage > 0}
                  />
                </div>
              </div>

              <div className="w-full bg-white p-2 h-[30dvh] flex justify-center items-center overflow-x-hidden">
                <Linechart
                  aspectRatio={
                    window.innerWidth < 640
                      ? 2
                      : window.innerWidth < 1024
                        ? 2.5
                        : 4
                  }
                  chartData={transformedRevenueData}
                />
              </div>

              {/* Sales Stats */}
              <div className="flex flex-col justify-center items-center gap-2 w-full min-h-[20vh] sm:min-h-[22vh] md:min-h-[22vh] lg:min-h-[25dvh] overflow-hidden my-4 sm:my-6 md:my-5">
                <div className="flex justify-between items-center w-full p-2 sm:p-3 md:p-2.5">
                  <h3 className="text-lg sm:text-xl md:text-xl lg:text-[1.3dvw] font-[600]">
                    Sales Stats
                  </h3>
                </div>
                <div className="w-full h-full flex flex-col  lg:flex-row justify-between gap-3 sm:gap-4 md:gap-3">
                  {/* Sales Data List */}
                  <div className="flex-1 shrink-0 flex flex-col gap-2 sm:gap-3 md:gap-2.5 justify-center items-start rounded-md bg-[var(--primary-color)] py-4 sm:py-6 md:py-5 px-2">
                    {categorySaleData?.data.slice(0, 10).map((cur, id) => (
                      <div
                        key={id}
                        className="flex justify-between items-center w-[95%]"
                      >
                        <div className="flex justify-start gap-2 sm:gap-3 md:gap-3 lg:gap-4 items-center">
                          <div
                            style={{
                              background: RColors[id],
                            }}
                            className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-[1dvw] lg:h-[1dvw] rounded-full"
                          />
                          <p className="font-semibold font-[var(--paraFont)] text-sm sm:text-base md:text-base lg:text-[1dvw] text-[var(--paraText-color)]">
                            {cur.category_name}
                          </p>
                        </div>
                        <h5 className="text-black font-medium text-sm sm:text-base md:text-base lg:text-[1dvw]">
                          $ {cur.total_amount.toFixed(2)}
                        </h5>
                      </div>
                    ))}
                  </div>
                  {/* Doughnut Chart */}
                  <div className="flex-1 shrink-0 flex bg-[var(--primary-color)] rounded-md py-4 sm:py-6 md:py-5 px-2 justify-center items-center h-full">
                    <Doughtchart
                      // aspectRatio={
                      //   window.innerWidth < 640
                      //     ? 1.5
                      //     : window.innerWidth < 1024
                      //       ? 1.8
                      //       : 2
                      // }
                      saleData={categorySaleData?.data}
                      RColors={RColors.slice(0, 10)}
                    />
                  </div>
                </div>
              </div>

              {/* Inventory Stats */}
              {/* <div className="flex flex-col justify-center items-center gap-2 w-full min-h-[20vh] sm:min-h-[22vh] md:min-h-[22vh] lg:min-h-[25dvh] overflow-hidden my-4 sm:my-6 md:my-5">
                <div className="flex justify-between items-center w-full p-2 sm:p-3 md:p-2.5">
                  <h3 className="text-lg sm:text-xl md:text-xl lg:text-[1.3dvw] font-[600]">
                    Inventory Stats
                  </h3>
                </div>
                <div className="w-full h-full flex flex-col lg:flex-row justify-center gap-3 sm:gap-4 md:gap-3">
                  
                  <div className="flex-1 shrink-0 flex flex-col gap-2 sm:gap-3 md:gap-2.5 justify-center items-start rounded-md bg-[var(--primary-color)] py-4 sm:py-6 md:py-5 px-2">
                    {saleData.map((cur, id) => (
                      <div
                        key={id}
                        className="flex justify-between items-center w-[95%]"
                      >
                        <div className="flex justify-start gap-2 sm:gap-3 md:gap-3 lg:gap-4 items-center">
                          <div
                            style={{
                              background: cur.color,
                            }}
                            className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-[1dvw] lg:h-[1dvw] rounded-full"
                          />
                          <p className="font-semibold font-[var(--paraFont)] text-sm sm:text-base md:text-base lg:text-[1dvw] text-[var(--paraText-color)]">
                            {cur.name}
                          </p>
                        </div>
                        <h5 className="text-black font-medium text-sm sm:text-base md:text-base lg:text-[1dvw]">
                          ${cur.value}
                        </h5>
                      </div>
                    ))}
                  </div>
                 
                  <div className="flex-1 shrink-0 flex bg-[var(--primary-color)] rounded-md py-4 sm:py-6 md:py-5 px-2 justify-center items-center h-[200px] sm:h-[250px] md:h-[220px] lg:h-full">
                    <Doughtchart
                      aspectRatio={
                        window.innerWidth < 640
                          ? 1.5
                          : window.innerWidth < 1024
                            ? 1.8
                            : 2
                      }
                    />
                  </div>
                </div>
              </div> */}
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-[27%] shrink-0 mt-6 lg:mt-0">
              <TopSellingItems />

              {/* Low Stocks */}
              <div className="border border-[#D4D4D4] rounded-md p-3 sm:p-4 md:p-3.5 bg-white">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-3 sm:mb-4 md:mb-3.5">
                  <h3 className="font-semibold text-lg sm:text-xl md:text-xl lg:text-[1.1dvw]">
                    Low Stocks
                  </h3>
                  <Link
                    to="/admin/low-stock"
                    className="cursor-pointer bg-[var(--button-color2)] text-white px-3 sm:px-4 md:px-3.5 py-2 sm:py-1 md:py-1.5 rounded-full text-sm sm:text-base md:text-base lg:text-[1dvw] font-[var(--paraFont)] font-medium w-full sm:w-auto"
                  >
                    See all
                  </Link>
                </div>

                <div className="flex flex-col gap-3 md:gap-2.5 my-3 md:my-2.5">
                  {lowStock?.length === 0 ? (
                    <>
                      <p className="text-[1dvw] text-center my-3 font-semibold mainFont text-gray-500">
                        No Low stock items found
                      </p>
                    </>
                  ) : (
                    <>
                      {lowStock?.slice(0, 5).map((cur, id) => (
                        <div
                          key={id}
                          className="w-full flex justify-start items-center gap-3 md:gap-2.5"
                        >
                          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-[3dvw] lg:h-[3dvw] flex-shrink-0">
                            <img
                              className="w-full h-full object-cover rounded"
                              src={ProductImg1}
                              alt="sellsync.com"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold font-[var(--paraFont)] text-sm sm:text-base md:text-base lg:text-[1dvw] truncate">
                              {cur.name}
                            </h4>
                            <p className="text-xs sm:text-sm md:text-sm lg:text-[.9dvw] font-medium text-[#333333] font-[var(--paraFont)]">
                              In Stock - {cur.qty_on_hand}
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};
