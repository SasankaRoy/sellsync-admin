import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import {
  DeleteIcon,
  FilterIcon,
  PluseIcon,
  SortIcon,
} from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { CircleX, Edit, Plus, Trash, Download } from "lucide-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode"; // Corrected to match Category.jsx
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios-interceptor";
import { Loading } from "../../../components/UI/Loading/Loading";
import { toast } from "react-toastify";
import moment from "moment";
import { useBulkDelete } from "../../../utils/apis/BulkDelete";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Supplier = () => {
  const [bulkDeleteIds, setBulkDeleteIds] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const bulkDelete = useBulkDelete();
  const {
    data: rowData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get_suppliers_list"],
    queryFn: async () => {
      try {
        const getSupplierList = await axiosInstance.post(
          "api/v1/supplier/list",
          {
            page: 1,
            limit: 10,
            // search_text: "one",
          }
        );
        if (getSupplierList.status === 200 && getSupplierList.data) {
          return getSupplierList?.data?.results || getSupplierList?.data || [];
        }
        return [];
      } catch (error) {
        throw new Error(
          error?.response?.data?.error || "Failed to fetch Suppliers"
        );
      }
    },
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error.message || "Failed to fetch suppliers");
    }
  }, [error]);

  const [showModel, setShowModel] = useState({
    state: false,
    productData: null,
    actionType: "",
  });

  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
    path: "",
  });

  const onAddSupplier = () => {
    console.log("Add Supplier button clicked");
    const newState = {
      state: true,
      productData: {
        ID: "",
        SupplierName: "",
        Category: "",
        Items: "",
        Date: "",
      },
      actionType: "Add",
    };
    setShowModel(newState);
    console.log("New showModel state:", newState);
  };

  const onEdit = (product) => {
    console.log(product, "edit");
    if (product) {
      setShowModel({
        state: true,
        productData: product,
        actionType: "Edit",
      });
    }
  };

  const onDelete = (product) => {
    console.log(product, "delete");
    setDeleteModel({
      state: true,
      productId: product.id,
      path: `api/v1/supplier/delete/${product.id}`,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    // { field: "ID" },
    { field: "name", headerName: "Supplier Name" },
    { field: "email", headerName: "Email" },
    { field: "mobile", headerName: "Mobile" },
    // { field: "Date" },
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
      field: "createdAt",
      headerName: "Created Date",
      cellRenderer: (time) => {
        return moment(time.value).format("lll");
      },
    },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (data) => {
        return (
          <>
            <div
              className={`capitalize font-semibold  flex justify-center items-center gap-3`}
            >
              <div
                className={`h-2 w-2 ${
                  data.value === "active"
                    ? "bg-[var(--Positive-color)]"
                    : "bg-[var(--Negative-color)]"
                } rounded-full`}
              ></div>
              <p>{data.value}</p>
            </div>
          </>
        );
      },
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionBtns,
      cellRendererParams: {
        onEdit,
        onDelete,
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
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
          <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
              <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                Suppliers List
              </h3>
              <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
                <button
                  onClick={onAddSupplier}
                  className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                >
                  Add Supplier <PluseIcon />
                </button>
                {/*<button className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
                Export CSV <Download size={16} />
              </button>*/}
              </div>
            </div>
          </div>

          <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[75vh]">
            <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-full">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
                <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
                  <select className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-base">
                    <option>All Categories</option>
                    <option>Beer</option>
                    <option>Wine</option>
                    <option>Spirits</option>
                  </select>
                  <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[var(--counterBg-color)] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                    <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                      {rowData.length}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-4 justify-between items-center flex-wrap">
                  {/*<button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                  Sort <SortIcon />
                </button>
                <button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                  Filter <FilterIcon />
                </button>*/}
                  <button className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
                    Export CSV <Download size={16} />
                  </button>
                  <button
                    onClick={async () => {
                      setIsDeleting(true);
                      const result = bulkDelete.mutate({
                        path: "api/v1/supplier/bulk-delete",
                        idList: {
                          supplierIds: bulkDeleteIds,
                        },
                        queryKey: "get_suppliers_list",
                        isDeleting: setIsDeleting,
                      });
                    }}
                    className="disabled:cursor-not-allowed  disabled:opacity-30 cursor-pointer disabled:pointer-events-none"
                    disabled={bulkDeleteIds.length === 0 ? true : false}
                  >
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
                    className="w-full h-full text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {showModel.state && (
            <EditAndAddModel
              productData={showModel.productData || {}}
              setShowModel={setShowModel}
              actionType={showModel.actionType}
            />
          )}
          {deleteModel.state && deleteModel.productId && deleteModel.path && (
            <DeleteModel
              setDeleteModel={setDeleteModel}
              productId={deleteModel.productId}
              path={deleteModel.path}
            />
          )}
        </div>
      )}
    </Layout>
  );
};

const ActionBtns = (props) => {
  const { onEdit, onDelete } = props;
  const { data } = props;

  const handleEdit = () => {
    onEdit(data);
  };

  const handleDelete = () => {
    onDelete(data);
  };

  return (
    <div className="w-full flex gap-2 sm:gap-4 py-2 justify-center items-center">
      <button
        className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
        onClick={handleEdit}
      >
        <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>
      <button
        className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
        onClick={handleDelete}
      >
        <Trash size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>
    </div>
  );
};

const EditAndAddModel = ({ productData = {}, setShowModel, actionType }) => {
  console.log(productData);
  const [supplierInfo, setSupplierInfo] = useState({
    supplierName: productData?.name || "",
    phoneNumber: productData?.mobile || "",
    email: productData?.email || "",
    city: productData?.address?.city || "",
    zipCode: productData?.address?.zip || "",
    state: productData?.address?.state || "",
    street: productData?.address?.street || "",
    status: productData?.status || "",
    role: productData?.role || "supplier",
  });
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSupplierInfo({
      ...supplierInfo,
      [name]: value,
    });
  };

  const handleSubmitInfo = async () => {
    setIsSaving(true);
    try {
      const reqSupplierUpdate = await axiosInstance.post(
        actionType === "Add"
          ? "api/v1/supplier/add"
          : `api/v1/supplier/update/${productData.id}`,
        {
          full_name: supplierInfo?.supplierName,
          email: supplierInfo?.email,
          role: supplierInfo?.role,
          phone: supplierInfo?.phoneNumber,
          status: supplierInfo?.status,
          address: {
            street: supplierInfo?.street,
            city: supplierInfo?.city,
            state: supplierInfo?.state,
            zip: supplierInfo?.zipCode,
          },
        }
      );

      if (reqSupplierUpdate.status === 200 && reqSupplierUpdate.data) {
        console.log(reqSupplierUpdate.data);
        setIsSaving(false);
        toast.success(reqSupplierUpdate?.data?.message || "Supplier added");
        queryClient.invalidateQueries({
          queryKey: ["get_suppliers_list"],
        });
      }
    } catch (error) {
      console.error(error || "somethink went wrong");
      setIsSaving(false);
    } finally {
      handleCloseModel();
    }
  };

  const handleCloseModel = () => {
    setShowModel({
      state: false,
      productData: null,
      actionType: "",
    });
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-md shadow p-4 sm:p-5 w-full sm:w-[90%] md:w-[80%] lg:w-[55%] max-h-[95%] overflow-auto">
        <div className="flex justify-between items-center w-full p-2 sm:p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
          <h3 className="text-lg sm:text-xl lg:text-[1.5dvw] font-semibold">
            {actionType === "Add" ? "Add Suppliers" : `${actionType} Supplier`}
          </h3>
          <button
            onClick={handleCloseModel}
            className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
          >
            <CircleX size={24} className="sm:w-[30px] sm:h-[30px]" />
          </button>
        </div>

        <div className="w-full grid grid-cols-2 gap-5 my-4">
          <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
            <label
              className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont"
              htmlFor="supplierName"
            >
              Supplier Name
            </label>
            <input
              id="supplierName"
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              placeholder="Enter supplier name..."
              name="supplierName"
              value={supplierInfo.supplierName}
              onChange={handleOnChange}
            />
          </div>
          <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
            <label
              htmlFor="phoneNumber"
              className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont"
            >
              Phone
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="tel"
              placeholder="Phone number..."
              name="phoneNumber"
              required
              id="phoneNumber"
              value={supplierInfo.phoneNumber}
              onChange={handleOnChange}
            />
          </div>

          <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2 col-span-2">
            <label
              htmlFor="email"
              className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont"
            >
              Email
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="email"
              placeholder="Enter email..."
              name="email"
              required
              id="email"
              value={supplierInfo.email}
              onChange={handleOnChange}
            />
          </div>

          <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
            <label
              htmlFor="street"
              className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont"
            >
              Street Address
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="text"
              placeholder="Enter Street Address..."
              name="street"
              id="street"
              value={supplierInfo.street}
              onChange={handleOnChange}
            />
          </div>
          <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
            <label
              htmlFor="zip"
              className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont"
            >
              Zip Code
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="text"
              placeholder="Enter Zip Code..."
              name="zipCode"
              id="zip"
              value={supplierInfo.zipCode}
              onChange={handleOnChange}
            />
          </div>
          <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
            <label
              htmlFor="city"
              className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont"
            >
              City
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="text"
              placeholder="Enter City..."
              name="city"
              id="city"
              value={supplierInfo.city}
              onChange={handleOnChange}
            />
          </div>
          <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
            <label
              id="state"
              className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont"
            >
              State
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="text"
              placeholder="Enter State..."
              name="state"
              id="state"
              value={supplierInfo.state}
              onChange={handleOnChange}
            />
          </div>

          <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
            <label
              htmlFor="role"
              className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont"
            >
              Role
            </label>
            <select
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              name="role"
              id="role"
              value={supplierInfo.role}
              onChange={handleOnChange}
            >
              <option value="">Select Role</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>
          <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
            <label
              htmlFor="status"
              className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont"
            >
              Status
            </label>
            <select
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              name="status"
              id="status"
              value={supplierInfo.status}
              onChange={handleOnChange}
            >
              <option value="">Select Vendor Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-6">
          <button
            className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
            onClick={handleCloseModel}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitInfo}
            className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
          >
            {isSaving ? (
              "Saving ...."
            ) : (
              <>{actionType === "Add" ? "Create" : "Update"}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
