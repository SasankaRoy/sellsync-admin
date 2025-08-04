import React, { useEffect, useMemo, useState } from "react";
import { DeleteIcon, FilterIcon, SortIcon } from "../../../assets/Svgs/AllSvgs";
import { CircleX, Edit, Eye, Trash, X } from "lucide-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { POSEditModel } from "../../../components/common/Models/POSEditModel";
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
      <div className="w-full flex gap-4 py-2 justify-center items-center">
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleEdit}
        >
          <Eye size={18} />
        </button>

        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleDelete}
        >
          <Trash size={18} />
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
  // const [rowData, setRowData] = useState([
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "#521478",
  //     DateOfReister: "20.02.2015",
  //     Name: "Admin dash",
  //     Location: "Admin dash",
  //     Type: "main",
  //     Status: "Active",
  //     Actions: ActionBtns,
  //   },
  // ]);

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
            <div className="flex justify-between items-center p-2">
              <h3 className="font-[500] text-[1.5dvw]">Device and Location</h3>
              <button
                onClick={() =>
                  setEditModel({
                    state: true,
                    productData: null,
                    actionType: "Add",
                  })
                }
                className="flex justify-center items-center gap-2 rounded-full bg-[var(--button-color1)] text-white mainFont px-5 py-2 cursor-pointer"
              >
                <Plus /> New Device
              </button>
            </div>
            <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[80dvh]">
              <div className="flex justify-between items-center py-1.5 shrink-0">
                <div className="flex justify-center items-center gap-3">
                  <select className="font-[500] mainFont px-4 border-none outline-none">
                    <option>All</option>
                  </select>
                  <p className="px-3 text-[1dvw] py-.5 bg-[#F8A61B] rounded-2xl font-[500] border-none text-white">
                    {rowData.length}
                  </p>
                </div>
                {/* <div className="flex gap-4 justify-center items-center">
            <button className="flex justify-center items-center gap-2 px-4 py-1 text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
              Sort <SortIcon />
            </button>
            <button className="flex justify-center items-center gap-2 px-4 py-1 text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
              Filter <FilterIcon />
            </button>
            <button>
              <DeleteIcon />
            </button>
          </div> */}
              </div>
              <div className="h-full w-full">
                <AgGridReact
                  rowData={rowData}
                  columnDefs={colDefs}
                  // loading={loading}
                  defaultColDef={defaultColDef}
                  pagination={true}
                  rowSelection={rowSelection}
                  onSelectionChanged={(event) => console.log("Row Selected!")}
                  onCellValueChanged={(event) =>
                    console.log(`New Cell Value: ${event.value}`)
                  }
                />
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
        <div className="bg-white rounded-lg p-5 w-[50%] shadow">
          <div className="flex justify-between items-center w-full bg-[var(--sideMenu-color)] text-white p-3 rounded-lg">
            <h3 className="text-[1.5dvw] font-[500]">
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
              <CircleX size={35} />
            </button>
          </div>

          <div className="my-10 flex flex-col gap-8">
            <div className="flex justify-between items-center gap-5 w-full">
              <div className="w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-[1dvw] font-normal paraFont"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="Enter name..."
                  name="device_name"
                  onChange={handleOnChange}
                  value={deviceData?.device_name}
                />
              </div>
              <div className="w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-[1dvw] font-normal paraFont"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="Enter location..."
                  name="location"
                  onChange={handleOnChange}
                  value={deviceData?.location}
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-5 w-full">
              <div className="w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-[1dvw] font-normal paraFont"
                  htmlFor="type"
                >
                  Type
                </label>
                <input
                  id="type"
                  type="text"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="Enter type..."
                  name="device_type"
                  onChange={handleOnChange}
                  value={deviceData?.device_type}
                />
              </div>
              <div className="w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-[1dvw] font-normal paraFont"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3 appearance-none"
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
              className="w-full py-2 rounded-lg mainFont font-[500] text-white bg-[var(--button-color1)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70 hover:bg-[var(--button-color5)] transition-all duration-300 ease-linear cursor-pointer"
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
