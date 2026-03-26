import React, { useMemo, useState } from "react";
import Layout from "../../../components/common/Layout/Layout";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCustomerDetailsById,
  getCustomerPurchaseHistory,
} from "../../../utils/apis/handleCustomer";
import { Loading } from "../../../components/UI/Loading/Loading";
import moment from "moment";
import PaginationTest from "../../../components/common/PaginationTest/PaginationTest";
import axiosInstance from "../../../utils/axios-interceptor";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { Trash } from "lucide-react";
ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "none",
  headerCheckbox: false,
};

export const CustomerDetails = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(50);
  const [totalData, setTotalData] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [refetching, setRefetching] = useState(false);
  const queryClient = useQueryClient();

  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
    path: "",
  });

  //   const getGroupDetails = async () => {
  //     try {
  //       const reqGroupData = await axiosInstance.get(
  //         `api/v1/group/details/${id}?page=${currentPage}&limit=${pageLimit}`,
  //       );
  //       if (reqGroupData.status === 200 && reqGroupData.data) {
  //         setTotalData(reqGroupData?.data?.groupDetails?.total_products || 0);
  //         // Calculate total pages based on current total_products and pageLimit
  //         setTotalPages(
  //           Math.ceil(
  //             (reqGroupData?.data?.groupDetails?.total_products || 0) / pageLimit,
  //           ) || 0,
  //         );
  //         return reqGroupData?.data?.groupDetails?.products || [];
  //       }
  //       return [];
  //     } catch (error) {
  //       console.log(error?.response?.data);
  //       toast.error(
  //         error?.response?.data?.message || "Failed to Fetch Group details!",
  //       );
  //       return [];
  //     }
  //   };

  const {
    data: rowData,
    isLoading: TransactionLoading,
    isError: isErrorTransaction,
  } = useQuery({
    queryKey: ["get_group_details", id, currentPage, pageLimit],
    queryFn: async () => {
      const { transactions, pagination } = await getCustomerPurchaseHistory(
        id,
        { pageCount: currentPage, limit: pageLimit },
      );

      if (pagination) {
        const { totalTransactions, currentPage, totalPages } = pagination;
        setCurrentPage(currentPage);
        // setLowstockPageLimit(limit);
        setTotalData(totalTransactions);
        setTotalPages(totalPages);
      }
      return transactions || [];
    },
    refetchInterval: 3000,
    placeholderData: (prev) => prev,
  });

  const handlePageChange = (newPage) => {
    // Prefetch the page after the one we're going to
    setRefetching(true);
    queryClient.prefetchQuery({
      queryKey: ["get_group_details", id, newPage + 1, pageLimit],
      queryFn: async () =>
        await getCustomerPurchaseHistory(id, {
          pageCount: newPage + 1,
          limit: pageLimit,
        }),
    });
    setCurrentPage(newPage);
    setRefetching(false);
  };

  const onDelete = (product) => {
    setDeleteModel({
      state: true,
      productId: product.id,
      path: `api/v1/group/delete/item?groupId=${id}&productId=${product.id}`,
    });
  };

  const {
    data: customerDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get_customerDetails", id],
    queryFn: () => getCustomerDetailsById(id),
  });

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState([
    {
      field: "created_at",
      headerName: "Transaction Date",
      flex: 1,
      cellRenderer: (params) => {
        return moment(params?.value).format("DD-MM-YYYY");
      },
    },
    {
      field: "payment",
      headerName: "Method",
      cellRenderer: (payment) => {
        return payment?.data?.payment?.method;
      },
      flex: 1,
    },
    {
      field: "payment",
      headerName: "Grand Total",
      cellRenderer: (amount) => {
        return `$ ${amount?.data?.payment?.grandTotal?.toFixed(2)}`;
      },
      flex: 1,
    },
    {
      field: "payment",
      headerName: "Sub Total",
      cellRenderer: (amount) => {
        return `$ ${amount?.data?.payment?.subTotal?.toFixed(2)}`;
      },
      flex: 1,
    },

    {
      field: "payment",
      headerName: "Tax",
      cellRenderer: (amount) => {
        return `$ ${amount?.data?.payment?.taxTotal?.toFixed(2)}`;
      },
      flex: 1,
    },
    {
      field: "payment",
      headerName: "Items",
      cellRenderer: (amount) => {
        return amount?.data?.payment?.totalItems || 0;
      },
      flex: 1,
    },
    {
      field: "payment",
      headerName: "Tendered",
      cellRenderer: (amount) => {
        return `$ ${amount?.data?.payment?.tendered?.toFixed(2)}`;
      },
      flex: 1,
    },
    {
      field: "payment",
      headerName: "Discount Type",
      cellRenderer: (amount) => {
        return amount?.data?.payment?.discount?.type || "";
      },
      flex: 1,
    },
    {
      field: "redeem",
      headerName: "Redeem Points",
      cellRenderer: (amount) => {
        return amount?.data?.redeem?.points || 0;
      },
      flex: 1,
    },
    {
      field: "redeem",
      headerName: "Redeem amount",
      cellRenderer: (amount) => {
        return `$ ${amount?.data?.redeem?.amount?.toFixed(2)}`;
      },
      flex: 1,
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (props) => {
        return (
          <div className="w-full flex gap-2 sm:gap-4 py-2 justify-center items-center">
            <button
              className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
              onClick={() => onDelete(props.data)}
            >
              <Trash size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        );
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
    <Layout>
      {isLoading || TransactionLoading ? (
        <Loading />
      ) : (
        <>
          {isError || isErrorTransaction ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-red-500">Error fetching customer details.</p>
            </div>
          ) : (
            <div className="pb-14 w-full px-4 sm:px-6 lg:px-0 h-[calc(100vh-5rem)]">
              <div className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
                  <h3 className="text-2xl sm:text-3xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                    Customer Details and Purchase History
                  </h3>
                  <Link
                    to="/admin/customers"
                    className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color4)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                  >
                    Back Customer List
                  </Link>
                </div>
              </div>

              <div className="px-3 py-2 bg-white rounded-md my-5 border border-(--border-color)">
                <h4 className="mainFont text-[1.3dvw] font-semibold text-(--mainText-color)">
                  Customer Details
                </h4>
                <div className="grid grid-cols-3 gap-3 my-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                      Name
                    </label>
                    <input
                      readOnly
                      value={customerDetails?.customer_name}
                      className="w-full border border-(--border-color) rounded-md px-2 py-1 outline-none focus:outline-none focus:ring-0 bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                      Email
                    </label>
                    <input
                      readOnly
                      value={customerDetails?.customer_email}
                      className="w-full border border-(--border-color) rounded-md px-2 py-1 outline-none focus:outline-none focus:ring-0 bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                      Phone
                    </label>
                    <input
                      readOnly
                      value={customerDetails?.customer_mobile}
                      className="w-full border border-(--border-color) rounded-md px-2 py-1 outline-none focus:outline-none focus:ring-0 bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                      Points
                    </label>
                    <input
                      readOnly
                      value={customerDetails?.customer_points}
                      className="w-full border border-(--border-color) rounded-md px-2 py-1 outline-none focus:outline-none focus:ring-0 bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                      Zip Code
                    </label>
                    <input
                      readOnly
                      value={customerDetails?.customer_zipcode}
                      className="w-full border border-(--border-color) rounded-md px-2 py-1 outline-none focus:outline-none focus:ring-0 bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                      SMS Email Promotions
                    </label>
                    <input
                      readOnly
                      value={customerDetails?.sms_email_promotions}
                      className="w-full border border-(--border-color) rounded-md px-2 py-1 outline-none focus:outline-none focus:ring-0 bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                      Address
                    </label>
                    <input
                      readOnly
                      value={customerDetails?.customer_address}
                      className="w-full border border-(--border-color) rounded-md px-2 py-1 outline-none focus:outline-none focus:ring-0 bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                      Date of Birth
                    </label>
                    <input
                      readOnly
                      type="date"
                      value={moment(customerDetails?.date_of_birth).format(
                        "YYYY-MM-DD",
                      )}
                      className="w-full border border-(--border-color) rounded-md px-2 py-1 outline-none focus:outline-none focus:ring-0 bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                      Date of Birth
                    </label>
                    <select
                      readOnly
                      className="w-full border border-(--border-color) rounded-md px-2 py-1 outline-none focus:outline-none focus:ring-0 bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    >
                      <option value="">{customerDetails?.status}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="px-3 py-2 bg-white rounded-md my-5 border border-(--border-color)">
                <div className="flex justify-between items-center px-">
                  <h4 className="mainFont text-[1.3dvw] font-semibold text-(--mainText-color)">
                    Purchase History
                  </h4>
                  <div className="mainFont font-medium text-gray-400">
                    Total Transactions : <span className="text-[1.2dvw] text-black">{totalData}</span>
                  </div>
                </div>

                <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[80dvh]">
                  <div className="h-full w-full overflow-x-scroll overflow-y-auto">
                    <div className="min-w-[800px] h-full">
                      <AgGridReact
                        rowData={rowData || []}
                        columnDefs={colDefs}
                        // loading={loading}
                        defaultColDef={defaultColDef}
                        pagination={false}
                        rowSelection={rowSelection}
                        onSelectionChanged={() => console.log("Row Selected!")}
                        loading={refetching}
                        onCellValueChanged={(event) =>
                          console.log(`New Cell Value: ${event.value}`)
                        }
                        className="w-full h-full text-sm"
                      />
                    </div>
                  </div>

                  <PaginationTest
                    page={currentPage}
                    limit={pageLimit}
                    total_records={totalData}
                    total_pages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};
