import React, { useEffect, useMemo, useState } from "react";
import { DeleteIcon, FilterIcon, SortIcon } from "../../../assets/Svgs/AllSvgs";
import { CircleX, Edit, Eye, Trash, X } from "lucide-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Plus } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axios-interceptor";
import { Loading } from "../../../components/UI/Loading/Loading";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
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
    <>
      <div className="w-full flex gap-2 sm:gap-4 lg:gap-4 py-2 justify-center items-center">
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1 sm:p-1.5 lg:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleEdit}
        >
          <Eye size={16} className="sm:w-[18px] sm:h-[18px] lg:w-[18px] lg:h-[18px]" />
        </button>

        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1 sm:p-1.5 lg:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleDelete}
        >
          <Trash size={16} className="sm:w-[18px] sm:h-[18px] lg:w-[18px] lg:h-[18px]" />
        </button>
      </div>
    </>
  );
};

export const DeviceAndLocation = () => {
  const [newDevice, setNewDevice] = useState(false);
  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
  });
  const [editModel, setEditModel] = useState({
    state: false,
    productData: null,
    actionType: null,
  });
  const [selectedRowData, setSelectedRowData] = useState([]);

  // get device and location list ...

  const {
    data: rowData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["device_and_location_list"],
    queryFn: async () => {
      try {
        const reqDeviceAndLocationList = await axiosInstance.post(
          "/api/v1/common/device-list",
          {
            page: 1,
            limit: 20,
          }
        );

        if (
          reqDeviceAndLocationList.status === 200 &&
          reqDeviceAndLocationList.data
        ) {
          return reqDeviceAndLocationList?.data?.results;
        }
      } catch (error) {
        console.log(error, "error");
        throw new Error(
          error?.response?.data?.error ||
            "Something went wrong! while fetching device and location list"
        );
      }
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(
        error?.message ||
          "Something went wrong! while fetching device and location list"
      );
    }
  }, [error]);
  // console.log(rowData, "rowData");

  const onEdit = (products) => {
    console.log("Edit Button Clicked");
    setEditModel({
      state: true,
      productData: products,
      actionType: "Edit",
    });
  };
  const onDelete = (products) => {
    console.log(products, "delete");
    setDeleteModel({
      state: true,
      productId: products.id,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "id" },
    { field: "business_id" },
    { field: "date" },
    { field: "time" },
    { field: "device_name" },
    { field: "location" },
    { field: "device_type" },
    { field: "status" },
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
      editable: true,
    };
  }, []);

  return (
    <>
      <Layout>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
              <div className="flex flex-col sm:flex-row lg:flex-row justify-between items-start sm:items-center lg:items-center gap-4 mb-6 sm:mb-0 lg:mb-0 p-2 lg:p-2">
                <h3 className="text-2xl md:text-xl lg:font-[500] lg:text-[1.5dvw] font-semibold text-[var(--mainText-color)]">
                  Device and Location
                </h3>
                <div className="w-full sm:w-auto flex justify-center">
                  <button
                    onClick={() =>
                      setEditModel({
                        state: true,
                        productData: null,
                        actionType: "Add",
                      })
                    }
                    className="w-full sm:w-auto flex justify-center items-center gap-2 rounded-full bg-[var(--button-color1)] text-white mainFont px-6 py-3 sm:px-4 sm:py-2 lg:px-5 lg:py-2 cursor-pointer text-base sm:text-sm hover:bg-[#F8A61B] transition-all duration-300"
                  >
                    <Plus size={20} className="sm:w-5 sm:h-5" /> New Device
                  </button>
                </div>
              </div>
              
              <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[80dvh]">
                <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 lg:px-2.5 lg:py-2 h-full">
                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0 lg:flex-row lg:items-center lg:gap-0">
                    <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto lg:justify-center lg:w-auto">
                      <select className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-base">
                        <option>All</option>
                      </select>
                      <div className="h-6 w-6 sm:h-7 sm:w-7 bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem]">
                        <p className="text-xs sm:text-xs font-[500] text-white">
                          {rowData.length}
                        </p>
                      </div>
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
                          const selectedNodes = event.api.getSelectedNodes();
                          const selectedData = selectedNodes.map(node => node.data);
                          setSelectedRowData(selectedData);
                          console.log("Selected data updated:", selectedData);
                        }}
                        onCellValueChanged={(event) =>
                          console.log(`New Cell Value: ${event.value}`)
                        }
                        className="w-full h-full text-sm lg:text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Layout>
      {editModel.state && editModel.actionType === "Add" && (
        <AddNewDevice setEditModel={setEditModel} editModel={editModel} />
      )}
      {editModel.state &&
        editModel.actionType === "Edit" &&
        editModel.productData && (
          <AddNewDevice setEditModel={setEditModel} editModel={editModel} />
        )}
      {deleteModel.state && deleteModel.productId && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          deleteModel={deleteModel}
        />
      )}
    </>
  );
};

const AddNewDevice = ({ setEditModel, editModel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [deviceData, setDeviceData] = useState({
    device_name: editModel?.productData?.device_name || "",
    location: editModel?.productData?.location || "",
    device_type: editModel?.productData?.device_type || "",
    status: editModel?.productData?.status || "",
  });
  const queryClient = useQueryClient();

  // handle onChnage function...
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDeviceData({
      ...deviceData,
      [name]: value,
    });
  };

  // handle submit function...
  const handleOnSubmit = async () => {
    setIsLoading(true);
    try {
      const reqAddNewDevice = await axiosInstance.post(
        `/api/v1/common/device-add`,
        {
          ...deviceData,
        }
      );

      if (reqAddNewDevice.status === 200 && reqAddNewDevice.data) {
        toast.success("New device added successfully");
        queryClient.invalidateQueries({
          queryKey: ["device_and_location_list"],
        });
      }
    } catch (error) {
      console.error(error?.response?.data?.error);
      toast.error(
        error?.response?.data?.error ||
          "Something went wrong! while adding new device"
      );
    } finally {
      setEditModel({
        state: false,
        productData: null,
        actionType: null,
      });
      setIsLoading(false);
      setDeviceData({
        device_name: "",
        location: "",
        device_type: "",
        status: "",
      });
    }
  };

  // handle update function...
  const handleOnUpdate = async () => {
    setIsLoading(true);
    try {
      const reqUpdateDevice = await axiosInstance.post(
        `/api/v1/common/device-update`,
        {
          ...deviceData,
        }
      );

      if (reqUpdateDevice.status === 200 && reqUpdateDevice.data) {
        toast.success("Device updated successfully");
        queryClient.invalidateQueries({
          queryKey: ["device_and_location_list"],
        });
      }
    } catch (error) {
      console.error(error?.response?.data?.error);
      toast.error(
        error?.response?.data?.error ||
          "Something went wrong! while updating device"
      );
    } finally {
      setIsLoading(false);
      setEditModel({
        state: false,
        productData: null,
        actionType: null,
      });
      setDeviceData({
        device_name: "",
        location: "",
        device_type: "",
        status: "",
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[#000]/20 backdrop-blur-xl z-50">
        <div className="bg-white rounded-lg p-3 sm:p-5 w-[95%] sm:w-[80%] lg:w-[50%] shadow mx-4">
          <div className="flex justify-between items-center w-full bg-[var(--sideMenu-color)] text-white p-2 sm:p-3 rounded-lg">
            <h3 className="text-lg sm:text-xl lg:text-[1.5dvw] font-[500]">
              {editModel?.actionType === "Add" ? "Add New" : "Edit"} Device
            </h3>
            <button
              onClick={() =>
                setEditModel({
                  state: false,
                  productData: null,
                  actionType: null,
                })
              }
              className="cursor-pointer"
            >
              <CircleX size={24} className="sm:w-8 sm:h-8 lg:w-[35px] lg:h-[35px]" />
            </button>
          </div>

          <div className="my-6 sm:my-8 lg:my-10 flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-5 w-full">
              <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="Enter name..."
                  name="device_name"
                  onChange={handleOnChange}
                  value={deviceData?.device_name}
                />
              </div>
              <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="Enter location..."
                  name="location"
                  onChange={handleOnChange}
                  value={deviceData?.location}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-5 w-full">
              <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                  htmlFor="type"
                >
                  Type
                </label>
                <input
                  id="type"
                  type="text"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="Enter type..."
                  name="device_type"
                  onChange={handleOnChange}
                  value={deviceData?.device_type}
                />
              </div>
              <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3 appearance-none"
                  id="status"
                  name="status"
                  onChange={handleOnChange}
                  value={deviceData?.status}
                >
                  <option>-- Select Status --</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <button
              disabled={
                isLoading ||
                !Object.keys(deviceData).every((key) => deviceData[key])
              }
              onClick={
                editModel?.actionType === "Add"
                  ? handleOnSubmit
                  : handleOnUpdate
              }
              className="w-full py-2 rounded-lg mainFont font-[500] text-white bg-[var(--button-color1)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70 hover:bg-[var(--button-color5)] transition-all duration-300 ease-linear cursor-pointer text-sm sm:text-base"
            >
              {isLoading ? (
                "Saving..."
              ) : (
                <>{editModel?.actionType === "Add" ? "Save" : "Update"}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Responsive DeleteModel Component
const DeleteModel = ({ setDeleteModel, deleteModel }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const reqDelete = await axiosInstance.post(
        `/api/v1/common/device-delete`,
        {
          id: deleteModel.productId,
        }
      );

      if (reqDelete.status === 200 && reqDelete.data) {
        toast.success(reqDelete.data.message || "Device deleted successfully!");
        queryClient.invalidateQueries({
          queryKey: ["device_and_location_list"],
        });
      }
    } catch (error) {
      console.error(error?.response?.data?.error);
      toast.error(
        error?.response?.data?.error ||
          "Something went wrong! while deleting device"
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
            <h3 className="text-base sm:text-lg lg:text-[1.5dvw] font-semibold">Delete Device</h3>
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
            Device with ID{" "}
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