import React, { useState, useMemo } from "react";
import Layout from "../../../components/common/Layout/Layout";
import { DeleteIcon } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import moment from "moment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axios-interceptor";
import { Loading } from "../../../components/UI/Loading/Loading";
import PaginationTest from "../../../components/common/PaginationTest/PaginationTest";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { Trash } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "none",
  headerCheckbox: false,
};

export const GroupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(100);
  const [totalData, setTotalData] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [refetching, setRefetching] = useState(false);
  const queryClient = useQueryClient();

  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
    path: "",
  });

  const getGroupDetails = async () => {
    try {
      const reqGroupData = await axiosInstance.get(
        `api/v1/group/details/${id}?page=${currentPage}&limit=${pageLimit}`,
      );
      if (reqGroupData.status === 200 && reqGroupData.data) {
        setTotalData(reqGroupData?.data?.groupDetails?.total_products || 0);
        // Calculate total pages based on current total_products and pageLimit
        setTotalPages(
          Math.ceil(
            (reqGroupData?.data?.groupDetails?.total_products || 0) / pageLimit,
          ) || 0,
        );
        return reqGroupData?.data?.groupDetails?.products || [];
      }
      return [];
    } catch (error) {
      console.log(error?.response?.data);
      toast.error(
        error?.response?.data?.message || "Failed to Fetch Group details!",
      );
      return [];
    }
  };

  const {
    data: rowData,
    isLoading: lowStockLoading,
    isError,
  } = useQuery({
    queryKey: ["get_group_details", id, currentPage, pageLimit],
    queryFn: getGroupDetails,
    refetchInterval: 3000,
    placeholderData: (prev) => prev,
  });

  const handlePageChange = (newPage) => {
    // Prefetch the page after the one we're going to
    setRefetching(true);
    queryClient.prefetchQuery({
      queryKey: ["get_group_details", id, newPage + 1, pageLimit],
      queryFn: async () => {
        try {
          const reqGroupData = await axiosInstance.get(
            `api/v1/group/details/${id}?page=${newPage + 1}&limit=${pageLimit}`,
          );
          if (reqGroupData.status === 200 && reqGroupData.data) {
            return reqGroupData?.data?.groupDetails?.products || [];
          }
          return [];
        } catch (err) {
          return [];
        }
      },
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

  const checkStatus = (status) => {
    switch (status) {
      case "active":
        return {
          forDot: "bg-blue-500",
          forText: "text-blue-500",
        };

      case "inactive":
        return {
          forDot: "bg-green-500",
          forText: "text-green-500",
        };

      case "HOLD":
        return {
          forDot: "bg-yellow-500",
          forText: "text-yellow-500",
        };

      case "CANCELLED":
        return {
          forDot: "bg-red-500",
          forText: "text-red-500",
        };

      default:
        break;
    }
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState([
    {
      field: "name",
      headerName: "Product Name",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category Name",
      flex: 1,
    },
    { field: "in_stock", headerName: "Stock", flex: 1 },
    {
      field: "cost",
      headerName: "Cost",
      cellRenderer: (amount) => {
        return `$ ${amount?.value?.toFixed(2)}`;
      },
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      cellRenderer: (amount) => {
        return `$ ${amount?.value?.toFixed(2)}`;
      },
      flex: 1,
    },
    {
      field: "margin",
      headerName: "Margin",
      flex: 1,
    },

    { field: "supplier", headerName: "Supplier Name", flex: 1 },
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
    <>
      <Layout>
        {lowStockLoading ? (
          <Loading />
        ) : (
          <>
            <div className="pb-14 w-full px-4 sm:px-6 lg:px-0 h-[calc(100vh-5rem)]">
              <div className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
                  <h3 className="text-2xl sm:text-3xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                    Group Details
                  </h3>
                  <button
                    onClick={() => navigate("/admin/inventory/groups")}
                    className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color4)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                  >
                    Back Group List
                  </button>
                </div>
              </div>

              <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[80dvh]">
                <div className="h-full w-full overflow-x-scroll overflow-y-auto">
                  <div className="min-w-[800px] h-full">
                    <AgGridReact
                      rowData={rowData}
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
          </>
        )}
      </Layout>

      {deleteModel.state && deleteModel.productId && deleteModel.path && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          productId={deleteModel.productId}
          path={deleteModel.path}
          queryKey={["get_group_details", id, currentPage, pageLimit]}
        />
      )}
    </>
  );
};
