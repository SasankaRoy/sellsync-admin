import React, { useMemo, useState } from "react";
import { DeleteIcon, FilterIcon, SortIcon } from "../../../assets/Svgs/AllSvgs";
import { Edit, Trash, Eye, CircleX } from "lucide-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Layout } from "../../../components/common/Layout/Layout";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axios-interceptor";
import { useQueryClient } from "@tanstack/react-query";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

const ActionBtns = (props) => {
  const { onEdit, onView, onDelete } = props;
  const { data } = props;

  const handleEdit = () => {
    onEdit(data);
  };

  const handleView = () => {
    if (onView) onView(data);
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
        className="font-semibold font-[var(--paraFont)] bg-[var(--button-color5)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
        onClick={handleView}
      >
        <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
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

// Responsive DeleteModel Component for Journals
const DeleteModel = ({ setDeleteModel, deleteModel }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Update this API endpoint according to your journal deletion endpoint
      const reqDelete = await axiosInstance.post(
        `/api/v1/journal/delete`,
        {
          id: deleteModel.productId,
        }
      );

      if (reqDelete.status === 200 && reqDelete.data) {
        toast.success(reqDelete.data.message || "Journal entry deleted successfully!");
        // Update this query key according to your journal list query key
        queryClient.invalidateQueries({
          queryKey: ["journal_list"],
        });
      }
    } catch (error) {
      console.error(error?.response?.data?.error);
      toast.error(
        error?.response?.data?.error ||
          "Something went wrong! while deleting journal entry"
      );
    } finally {
      setDeleteModel({
        state: false,
        productId: null,
      });
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center px-4 sm:px-6 lg:px-0">
        <div className="w-full sm:w-[80%] lg:w-[50%] max-w-lg sm:max-w-2xl lg:max-w-none p-4 sm:p-5 lg:p-5 bg-white rounded-xl shadow-md flex flex-col gap-4">
          <div className="flex justify-between items-center w-full p-2 sm:p-3 lg:p-3 rounded-md text-white bg-[var(--sideMenu-color)]">
            <h3 className="text-base sm:text-lg lg:text-[1.5dvw] font-semibold">Delete Journal Entry</h3>
            <button
              onClick={() => {
                setDeleteModel({
                  state: false,
                  productId: null,
                });
              }}
              className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
            >
              <CircleX size={24} className="sm:w-7 sm:h-7 lg:w-[30px] lg:h-[30px]" />
            </button>
          </div>

          <p className="text-sm sm:text-base lg:text-[1.2dvw] font-semibold font-[var(--paraFont)] text-center sm:text-left">
            Journal entry with ID{" "}
            <span className="italic font-bold">"{deleteModel.productId}"</span>{" "}
            will be{" "}
            <span className="text-[var(--Negative-color)] font-bold font-[var(--paraFont)] text-sm sm:text-base lg:text-[1.3dvw]">
              Permanently Deleted
            </span>{" "}
            from the system.
          </p>

          <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                setDeleteModel({
                  state: false,
                  productId: null,
                });
              }}
              className="w-full sm:w-auto bg-[var(--button-color4)] text-white px-4 sm:px-5 py-2 sm:py-1.5 rounded-md flex justify-center items-center font-semibold text-sm sm:text-base lg:text-[1.1dvw] cursor-pointer hover:opacity-80 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full sm:w-auto bg-[var(--Negative-color)] text-white px-4 sm:px-5 py-2 sm:py-1.5 rounded-md flex justify-center items-center font-semibold text-sm sm:text-base lg:text-[1.1dvw] cursor-pointer hover:opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Responsive POSEditModel Component
const POSEditModel = ({ setEditModel, productData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [journalData, setJournalData] = useState({
    ref: productData?.Ref || "",
    user: productData?.User || "",
    deviceLocation: productData?.["Device/Location"] || "",
    items: productData?.Items || "",
    processDate: productData?.ProccessDt || "",
    total: productData?.Total || "",
    status: productData?.Status || "",
  });
  const queryClient = useQueryClient();

  // handle onChange function...
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setJournalData({
      ...journalData,
      [name]: value,
    });
  };

  // handle update function...
  const handleOnUpdate = async () => {
    setIsLoading(true);
    try {
      // Update this API endpoint according to your journal update endpoint
      const reqUpdateJournal = await axiosInstance.post(
        `/api/v1/journal/update`,
        {
          id: productData?.ID,
          ...journalData,
        }
      );

      if (reqUpdateJournal.status === 200 && reqUpdateJournal.data) {
        toast.success("Journal entry updated successfully");
        queryClient.invalidateQueries({
          queryKey: ["journal_list"],
        });
      }
    } catch (error) {
      console.error(error?.response?.data?.error);
      toast.error(
        error?.response?.data?.error ||
          "Something went wrong! while updating journal entry"
      );
    } finally {
      setIsLoading(false);
      setEditModel({
        state: false,
        productData: null,
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[#000]/20 backdrop-blur-xl z-50 px-4 sm:px-6 lg:px-0">
        <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 w-full sm:w-[90%] lg:w-[60%] max-w-sm sm:max-w-4xl lg:max-w-none shadow mx-2 sm:mx-4 lg:mx-0 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center w-full bg-[var(--sideMenu-color)] text-white p-2 sm:p-3 lg:p-3 rounded-lg">
            <h3 className="text-base sm:text-lg lg:text-[1.5dvw] font-[500]">
              Edit Journal Entry
            </h3>
            <button
              onClick={() =>
                setEditModel({
                  state: false,
                  productData: null,
                })
              }
              className="cursor-pointer"
            >
              <CircleX size={20} className="sm:w-6 sm:h-6 lg:w-[35px] lg:h-[35px]" />
            </button>
          </div>

          <div className="my-4 sm:my-6 lg:my-10 flex flex-col gap-4 sm:gap-5 lg:gap-8">
            {/* Row 1 */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-5 w-full">
              <div className="w-full lg:w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                  htmlFor="ref"
                >
                  Reference
                </label>
                <input
                  id="ref"
                  type="text"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 sm:py-2.5 lg:py-1.5 px-3"
                  placeholder="Enter reference..."
                  name="ref"
                  onChange={handleOnChange}
                  value={journalData?.ref}
                />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                  htmlFor="user"
                >
                  User
                </label>
                <input
                  id="user"
                  type="text"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 sm:py-2.5 lg:py-1.5 px-3"
                  placeholder="Enter user..."
                  name="user"
                  onChange={handleOnChange}
                  value={journalData?.user}
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-5 w-full">
              <div className="w-full lg:w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                  htmlFor="deviceLocation"
                >
                  Device/Location
                </label>
                <input
                  id="deviceLocation"
                  type="text"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 sm:py-2.5 lg:py-1.5 px-3"
                  placeholder="Enter device/location..."
                  name="deviceLocation"
                  onChange={handleOnChange}
                  value={journalData?.deviceLocation}
                />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                  htmlFor="items"
                >
                  Items
                </label>
                <input
                  id="items"
                  type="number"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 sm:py-2.5 lg:py-1.5 px-3"
                  placeholder="Enter items count..."
                  name="items"
                  onChange={handleOnChange}
                  value={journalData?.items}
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-5 w-full">
              <div className="w-full lg:w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                  htmlFor="processDate"
                >
                  Process Date
                </label>
                <input
                  id="processDate"
                  type="datetime-local"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 sm:py-2.5 lg:py-1.5 px-3"
                  name="processDate"
                  onChange={handleOnChange}
                  value={journalData?.processDate}
                />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                  htmlFor="total"
                >
                  Total
                </label>
                <input
                  id="total"
                  type="text"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 sm:py-2.5 lg:py-1.5 px-3"
                  placeholder="Enter total amount..."
                  name="total"
                  onChange={handleOnChange}
                  value={journalData?.total}
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-5 w-full">
              <div className="w-full lg:w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 sm:py-2.5 lg:py-1.5 px-3 appearance-none"
                  id="status"
                  name="status"
                  onChange={handleOnChange}
                  value={journalData?.status}
                >
                  <option>-- Select Status --</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="w-full lg:w-1/2"></div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() =>
                  setEditModel({
                    state: false,
                    productData: null,
                  })
                }
                className="w-full sm:w-auto bg-[var(--button-color4)] text-white px-4 sm:px-6 lg:px-5 py-2 sm:py-2 lg:py-2 rounded-lg flex justify-center items-center font-semibold text-sm sm:text-base lg:text-base cursor-pointer hover:opacity-80 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                onClick={handleOnUpdate}
                className="w-full sm:w-auto py-2 sm:py-2 lg:py-2 px-4 sm:px-6 lg:px-5 rounded-lg mainFont font-[500] text-white bg-[var(--button-color1)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70 hover:bg-[var(--button-color5)] transition-all duration-300 ease-linear cursor-pointer text-sm sm:text-base lg:text-base"
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Journal = () => {
  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
  });
  const [editModel, setEditModel] = useState({
    state: false,
    productData: null,
  });
  
  const [selectedRowData, setSelectedRowData] = useState([]);
  
  const [rowData, setRowData] = useState([
    {
      ID: "1",
      Ref: "779",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "2",
      Ref: "780",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "3",
      Ref: "781",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "4",
      Ref: "782",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "5",
      Ref: "783",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "6",
      Ref: "784",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "7",
      Ref: "785",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "8",
      Ref: "786",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "9",
      Ref: "787",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "10",
      Ref: "788",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "11",
      Ref: "789",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "12",
      Ref: "790",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "13",
      Ref: "791",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "14",
      Ref: "792",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "15",
      Ref: "793",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "16",
      Ref: "794",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "17",
      Ref: "795",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
    {
      ID: "18",
      Ref: "796",
      User: "Malay",
      "Device/Location": "Register1 / Inventory",
      Items: "1",
      ProccessDt: "2025-05-27 07:32:15",
      Total: "$6.89",
      Status: "Completed",
    },
  ]);

  const onEdit = (products) => {
    console.log("Edit Button Clicked");
    setEditModel({
      state: true,
      productData: products,
    });
  };

  const onView = (products) => {
    console.log("View Button Clicked", products);
    // Add view functionality here
  };

  const onDelete = (products) => {
    console.log(products, "delete");
    setDeleteModel({
      state: true,
      productId: products.ID,
    });
  };

  // Toolbar edit function
  const handleToolbarEdit = () => {
    console.log("Toolbar edit clicked");
    // Add toolbar edit functionality here
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "ID", headerName: "ID", width: 100 },
    { field: "Ref", headerName: "Reference", width: 120 },
    { field: "User", headerName: "User", width: 120 },
    { field: "Device/Location", headerName: "Device/Location", width: 180 },
    { field: "Items", headerName: "Items", width: 100 },
    { field: "ProccessDt", headerName: "Process Date", width: 160 },
    { field: "Total", headerName: "Total", width: 120 },
    { field: "Status", headerName: "Status", width: 130 },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionBtns,
      cellRendererParams: {
        onEdit,
        onView,
        onDelete,
      },
      width: 200,
      sortable: false,
      filter: false,
    },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      sortable: true,
      resizable: true,
      editable: false,
    };
  }, []);

  return (
    <>
      <Layout>
        <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
          <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
              <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                POS / Journal
              </h3>
            </div>
          </div>
          
          <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[75vh]">
            <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-full">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
                <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
                  <select className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-base">
                    <option>All Journal</option>
                    <option>Completed</option>
                    <option>Pending</option>
                  </select>
                  <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                    <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                      {rowData.length}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-4 justify-between items-center flex-wrap">
                  <button
                    onClick={handleToolbarEdit}
                    className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC] hover:bg-[#003d99] transition-all duration-300"
                  >
                    <Edit size={14} className="sm:w-4 sm:h-4" /> Edit
                  </button>
                  <button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                    Sort <SortIcon />
                  </button>
                  <button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                    Filter <FilterIcon />
                  </button>
                  <button>
                    <DeleteIcon className="w-5 h-5" />
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
                      const selectedNodes = event.api.getSelectedNodes();
                      const selectedData = selectedNodes.map(node => node.data);
                      setSelectedRowData(selectedData);
                      console.log("Selected data updated:", selectedData);
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
        </div>
      </Layout>

      {deleteModel.state && deleteModel.productId && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          deleteModel={deleteModel}
        />
      )}

      {editModel.state && editModel.productData && (
        <POSEditModel
          setEditModel={setEditModel}
          productData={editModel.productData}
        />
      )}
    </>
  );
};