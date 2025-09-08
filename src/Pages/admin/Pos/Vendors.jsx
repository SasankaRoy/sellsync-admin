import React, { useMemo, useState, useEffect } from "react";
import {
  DeleteIcon,
  FilterIcon,
  SortIcon,
  PluseIcon,
} from "../../../assets/Svgs/AllSvgs";
import { Edit, Eye, Trash, Download, CircleX } from "lucide-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { Layout } from "../../../components/common/Layout/Layout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axios-interceptor";
import { Loading } from "../../../components/UI/Loading/Loading";
import { useDeboune } from "../../../hooks/useDebounce";
import { useBulkDelete } from "../../../utils/apis/BulkDelete";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: true,
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
      <div className="w-full flex gap-2 sm:gap-4 lg:gap-4 py-2 justify-center items-center">
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1 sm:p-1.5 lg:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleEdit}
        >
          <Edit
            size={16}
            className="sm:w-[18px] sm:h-[18px] lg:w-[18px] lg:h-[18px]"
          />
        </button>
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color5)] text-white p-1 sm:p-1.5 lg:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleView}
        >
          <Eye
            size={16}
            className="sm:w-[18px] sm:h-[18px] lg:w-[18px] lg:h-[18px]"
          />
        </button>
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1 sm:p-1.5 lg:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleDelete}
        >
          <Trash
            size={16}
            className="sm:w-[18px] sm:h-[18px] lg:w-[18px] lg:h-[18px]"
          />
        </button>
      </div>
    </>
  );
};

export const Vendors = () => {
  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
    path: null,
  });
  const [editModel, setEditModel] = useState({
    state: false,
    productData: null,
    forStatus: null,
  });
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [bulkDeleteIds, setBulkDeleteIds] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const bulkDelete = useBulkDelete();

  // Fetch vendors data using React Query
  const {
    data: rowData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["get_vendors_list", searchText, currentPage, limit],
    queryFn: async () => {
      try {
        const reqVendorList = await axiosInstance.post("/api/v1/vendor/list", {
          page: currentPage,
          limit: limit,
          search_text: searchText,
        });
        if (reqVendorList.status === 200 && reqVendorList.data) {
          return (
            reqVendorList?.data?.results || reqVendorList?.data?.data || []
          );
        }
        return [];
      } catch (error) {
        throw new Error(
          error?.response?.data?.message || "Failed to fetch vendors"
        );
      }
    },
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [error]);

  // Debounced search function
  const debounceCallback = useDeboune((searchValue) => {
    setSearchText(searchValue);
    setCurrentPage(1); // Reset to first page when searching
  }, 800);

  const onEdit = (vendor) => {
    setEditModel({
      state: true,
      productData: vendor,
      forStatus: "Edit",
    });
  };

  const onView = (vendor) => {
    console.log("View Button Clicked", vendor);
    setEditModel({
      state: true,
      productData: vendor,
      forStatus: "View",
    });
  };

  const onDelete = (vendor) => {
    console.log(vendor, "delete");
    setDeleteModel({
      state: true,
      path: `api/v1/vendor/delete/${vendor.id}`,
      productId: vendor.id,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    {
      field: "name",
      headerName: "Vendor Name",
      valueGetter: (params) =>
        params.data?.name || params.data?.VendorName || "",
    },
    {
      field: "email",
      headerName: "Email",
      valueGetter: (params) => params.data?.email || params.data?.Email || "",
    },
    {
      field: "phone",
      headerName: "Contact Number",
      valueGetter: (params) =>
        params.data?.mobile || params.data?.ContactNumber || "",
    },
    {
      field: "address",
      headerName: "Address",
      valueGetter: (params) => {
        const data = params.data;
        if (data?.address) {
          if (typeof data.address === "string") return data.address;
          if (typeof data.address === "object") {
            const addr = data.address;
            return `${addr.street || ""} ${addr.city || ""} ${
              addr.state || ""
            } ${addr.zip || ""}`.trim();
          }
        }
        return "";
      },
    },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (params) => {
        const status = params.data?.status || params.data?.Status || "";
        return <span>{status}</span>;
      },
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      valueGetter: (params) => {
        const date = params.data?.createdAt || params.data?.LastOrderDate;
        if (date) {
          return new Date(date).toLocaleDateString();
        }
        return "";
      },
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionBtns,
      cellRendererParams: {
        onEdit,
        onView,
        onDelete,
      },
      sortable: false,
      filter: false,
      width: 150,
    },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: false,
      resizable: true,
    };
  }, []);

  const handleImportCSV = () => {
    console.log("Import CSV clicked");
    // Add your import CSV logic here
    toast.info("Import CSV functionality will be implemented soon!");
  };

  const handleExportCSV = () => {
    console.log("Export CSV clicked");
    // Add your export CSV logic here
    toast.info("Export CSV functionality will be implemented soon!");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    debounceCallback(value);
  };

  return (
    <>
      <Layout>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
            <div className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0 lg:flex-row lg:items-center lg:gap-0">
                <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                  POS / Vendors
                </h3>
                <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto lg:flex-row lg:w-auto lg:gap-5">
                  <button
                    onClick={() => {
                      setEditModel({
                        state: true,
                        productData: null,
                        forStatus: "Add",
                      });
                    }}
                    className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                  >
                    Add Vendor <PluseIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleImportCSV}
                    className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                  >
                    Import CSV <PluseIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[75vh]">
              <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-full">
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
                  <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
                    <select className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-base">
                      <option>All Vendors</option>
                      <option>Active Vendors</option>
                      <option>Inactive Vendors</option>
                    </select>
                    <div className="h-6 w-6 sm:h-7 sm:w-7 bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem]">
                      <p className="text-xs sm:text-xs font-[500] text-white">
                        {rowData?.length || 0}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-4 justify-between items-center flex-wrap lg:justify-center lg:gap-4">
                    <button
                      onClick={handleExportCSV}
                      className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                    >
                      Export CSV <Download size={16} />
                    </button>
                    <button
                    onClick={async () => {
                        setIsDeleting(true);
                        const result = bulkDelete.mutate({
                          path: "api/v1/vendor/bulk-delete",
                          idList: {
                            vendorIds: bulkDeleteIds,
                          },
                          queryKey: "get_vendors_list",
                          isDeleting:setIsDeleting
                        });
                       
                      }}
                      className="disabled:cursor-not-allowed  disabled:opacity-30 cursor-pointer disabled:pointer-events-none"
                      disabled={bulkDeleteIds.length === 0 ? true : false}
                    >
                      <DeleteIcon className="w-5 h-5 lg:w-auto lg:h-auto" />
                    </button>
                  </div>
                </div>
                <div className="h-full w-full overflow-x-scroll overflow-y-auto lg:overflow-visible">
                  <div className="min-w-[800px] lg:min-w-0 h-full">
                    <AgGridReact
                      rowData={rowData}
                      columnDefs={colDefs}
                      defaultColDef={defaultColDef}
                      pagination={true}
                      rowSelection={rowSelection}
                      onSelectionChanged={(event) => {
                        let bulkIds = [];
                        event.selectedNodes.forEach((item) => {
                          bulkIds.push(item.data.id);
                        });
                        const uniqueSet = new Set(bulkIds);
                        setBulkDeleteIds([...uniqueSet]);
                      }}
                      onCellValueChanged={(event) =>
                        console.log(`New Cell Value: ${event.value}`)
                      }
                      getRowId={(params) =>
                        params.data.id?.toString() || Math.random().toString()
                      }
                      className="w-full h-full text-sm lg:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>

      {deleteModel.state && deleteModel.productId && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          path={deleteModel.path}
          productId={deleteModel.productId}
          // refetchQuery='get_vendors_list'
        />
      )}

      {editModel.state && editModel.forStatus && (
        <VendorEditModel
          forState={editModel.forStatus}
          setEditVendorModel={setEditModel}
          productData={editModel.productData}
          rowData={rowData}
          refetch={refetch}
        />
      )}
    </>
  );
};

const VendorEditModel = ({
  forState,
  setEditVendorModel,
  productData,
  rowData,
  refetch,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  console.log(productData);
  const [vendorInfo, setVendorInfo] = useState({
    full_name: productData?.name || productData?.VendorName || "",
    phone: productData?.mobile || productData?.ContactNumber || "",
    email: productData?.email || productData?.Email || "",
    street: productData?.address?.street || "",
    zip: productData?.address?.zip || "",
    role: productData?.role || "vendor",
    status: productData?.status || productData?.Status || "active",
    city: productData?.address?.city || "",
    state: productData?.address?.state || "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setVendorInfo({
      ...vendorInfo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Validate required fields
      if (!vendorInfo.full_name || !vendorInfo.email || !vendorInfo.phone) {
        toast.error("Please fill all required fields (Name, Email, Phone)!");
        setIsLoading(false);
        return;
      }

      const vendorPayload = {
        full_name: vendorInfo.full_name,
        email: vendorInfo.email,
        phone: vendorInfo.phone,
        address: {
          street: vendorInfo.street,
          city: vendorInfo.city,
          state: vendorInfo.state,
          zip: vendorInfo.zip,
        },
        role: vendorInfo.role,
        status: vendorInfo.status,
      };

      console.log("Sending Vendor Payload:", vendorPayload); // Debug payload
      const reqAddVendor = await axiosInstance.post(
        "/api/v1/vendor/add",
        vendorPayload
      ); // Updated endpoint

      if (reqAddVendor.status === 200 || reqAddVendor.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["get_vendors_list"],
        });
        toast.success(
          reqAddVendor?.data?.message || "Vendor added successfully!"
        );
        setEditVendorModel({
          state: false,
          productData: null,
          forStatus: null,
        });
        refetch();
      }
    } catch (error) {
      console.error("Add vendor error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to add vendor. Please check the endpoint or payload."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVendorUpdate = async () => {
    setIsLoading(true);
    try {
      // Validate required fields
      if (!vendorInfo.full_name || !vendorInfo.email || !vendorInfo.phone) {
        toast.error("Please fill all required fields (Name, Email, Phone)!");
        setIsLoading(false);
        return;
      }

      const vendorPayload = {
        full_name: vendorInfo.full_name,
        email: vendorInfo.email,
        phone: vendorInfo.phone,
        address: {
          street: vendorInfo.street,
          city: vendorInfo.city,
          state: vendorInfo.state,
          zip: vendorInfo.zip,
        },
        role: vendorInfo.role,
        status: vendorInfo.status,
      };

      console.log("Sending Vendor Payload:", vendorPayload); // Debug payload
      const reqUpdateVendor = await axiosInstance.post(
        `/api/v1/vendor/update/${productData.id}`,
        vendorPayload
      ); // Updated endpoint

      if (reqUpdateVendor.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["get_vendors_list"],
        });
        toast.success(
          reqUpdateVendor?.data?.message || "Vendor updated successfully!"
        );
        setEditVendorModel({
          state: false,
          productData: null,
          forStatus: null,
        });
        refetch();
      }
    } catch (error) {
      console.error(
        "Update vendor error:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to update vendor. Please check the endpoint or payload."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center px-2 sm:px-4">
        <div className="bg-white w-full sm:w-[90%] md:w-[70%] lg:w-[50%] p-3 sm:p-4 lg:p-5 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center w-full p-2 sm:p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-[1.5dvw] font-semibold">
              {forState === "Add"
                ? "Add Vendor"
                : forState === "View"
                ? "View Vendor"
                : "Edit Vendor"}
            </h3>
            <button
              onClick={() => {
                setEditVendorModel({
                  state: false,
                  productData: null,
                  forStatus: null,
                });
              }}
              className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
            >
              <CircleX size={24} className="sm:w-[30px] sm:h-[30px]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full p-3 sm:p-4">
            <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                Full Name
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                type="text"
                placeholder="Enter Full Name..."
                name="full_name"
                value={vendorInfo.full_name}
                onChange={handleOnChange}
                required
                disabled={forState === "View"}
              />
            </div>
            <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                Phone
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                type="tel"
                placeholder="Phone number..."
                name="phone"
                value={vendorInfo.phone}
                onChange={handleOnChange}
                required
                disabled={forState === "View"}
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
                <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                  Email
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                  type="email"
                  placeholder="Enter Email..."
                  name="email"
                  value={vendorInfo.email}
                  onChange={handleOnChange}
                  required
                  disabled={forState === "View"}
                />
              </div>
              {(forState === "Add" || forState === "Edit") && (
                <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2"></div>
              )}
            </div>

            <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                Street Address
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                type="text"
                placeholder="Enter Street Address..."
                name="street"
                value={vendorInfo.street}
                onChange={handleOnChange}
                disabled={forState === "View"}
              />
            </div>
            <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                Zip Code
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                type="text"
                placeholder="Enter Zip Code..."
                name="zip"
                value={vendorInfo.zip}
                onChange={handleOnChange}
                disabled={forState === "View"}
              />
            </div>
            <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                City
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                type="text"
                placeholder="Enter City..."
                name="city"
                value={vendorInfo.city}
                onChange={handleOnChange}
                disabled={forState === "View"}
              />
            </div>
            <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                State
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                type="text"
                placeholder="Enter State..."
                name="state"
                value={vendorInfo.state}
                onChange={handleOnChange}
                disabled={forState === "View"}
              />
            </div>

            <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                Role
              </label>
              <select
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                name="role"
                value={vendorInfo.role}
                onChange={handleOnChange}
                required
                disabled={forState === "View"}
              >
                <option value="">Select Vendor Role</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>
            <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                Status
              </label>
              <select
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                name="status"
                value={vendorInfo.status}
                onChange={handleOnChange}
                required
                disabled={forState === "View"}
              >
                <option value="">Select Vendor Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end items-center my-3 sm:my-4">
            <button
              type="button"
              onClick={() => {
                setEditVendorModel({
                  state: false,
                  productData: null,
                  forStatus: null,
                });
              }}
              className="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold text-sm sm:text-base hover:opacity-80 transition-all duration-300"
            >
              {forState === "View" ? "Close" : "Cancel"}
            </button>
            {forState !== "View" && (
              <button
                type="button"
                onClick={() =>
                  forState === "Add" ? handleSubmit() : handleVendorUpdate()
                }
                className="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold text-sm sm:text-base hover:opacity-80 transition-all duration-300 disabled:opacity-80 disabled:pointer-events-none disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading
                  ? "Saving..."
                  : forState === "Add"
                  ? "Add Vendor"
                  : "Update Vendor"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
