import React, { useMemo, useState, useEffect } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import {
  CashierIcon,
  DeleteIcon,
  FilterIcon,
  InventoryManagerIcon,
  PluseIcon,
  SortIcon,
  StoreManagerIcon,
  UsersIcon2,
} from "../../../assets/Svgs/AllSvgs";
import { Overviewcards } from "../../../components/common/Overviewcards/Overviewcards";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { CircleX, Edit, Trash } from "lucide-react";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axios-interceptor";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loading } from "../../../components/UI/Loading/Loading";
import { parse, format } from "date-fns";

ModuleRegistry.registerModules([AllCommunityModule]);
const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Employee = () => {
  const [deleteModel, setDeleteModel] = useState({
    status: false,
    productData: null,
  });
  const [editModel, setEditModel] = useState({
    status: false,
    productData: null,
    forStatus: null,
  });

  // get employee list...
  const getEmployeeList = async () => {
    try {
      const request = await axiosInstance.post("/api/v1/user/employee-list", {
        page: 1,
        limit: 20,
      });
      if (request.status === 200 && request.data) {
        return request?.data?.results;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  const {
    data: rowData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employee_list"],
    queryFn: getEmployeeList,
  });

  const onEdit = (product) => {
    console.log("Edit button clicked");
    setEditModel({
      status: true,
      productData: product,
      forStatus: "Edit",
    });
  };
  const onDelete = (model) => {
    setDeleteModel({
      status: true,
      productData: model.id,
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "Something went wrong! while fetch employee list"
      );
    }
  }, [error]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "id" },
    { field: "name" },
    { field: "email" },
    { field: "dob" },
    { field: "mobile" },
    {
      field: "address",
      headerName: "Address",
      valueGetter: (params) => {
        const { street, city, state, zip } = params.data.address || {};
        return [street, city, state, zip].filter(Boolean).join(", ");
      },
    },
    { field: "status" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionBtns,
      cellRendererParams: {
        onEdit,
        onDelete,
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Layout>
            <div className="pb-14 w-full px-4 sm:px-6 lg:px-0 h-[calc(100vh-5rem)]" style={{ marginTop: 0 }}>
              <div className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
                  <h3 className="text-2xl sm:text-3xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                    Employees
                  </h3>
                  <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                    <button
                      onClick={() => {
                        setEditModel({
                          status: true,
                          productData: null,
                          forStatus: "Add",
                        });
                      }}
                      className="w-full sm:w-auto px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                    >
                      Add Employee <PluseIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full my-4 lg:my-3">
                <Overviewcards
                  cardTitle="Active Employees"
                  cardValue="2"
                  percent="View"
                  className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
                  icon={<StoreManagerIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />}
                />
                <Overviewcards
                  cardTitle="Inactive Employees"
                  cardValue="8"
                  percent="View"
                  className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
                  icon={<CashierIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />}
                />
                <Overviewcards
                  cardTitle="Total Tasks"
                  cardValue="4"
                  percent="View"
                  className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
                  icon={<InventoryManagerIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />}
                />
                <Overviewcards
                  cardTitle="Total Employee"
                  cardValue="8,593"
                  percent="View"
                  className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
                  icon={<UsersIcon2 className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />}
                />
              </div>

              <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[60dvh]">
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
                  <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
                    <select className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-base">
                      <option>All Employees</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                    <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                      <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                        {rowData?.length}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-4 justify-between items-center">
                    <button className="flex justify-between items-center gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                      Sort <SortIcon />
                    </button>
                    <button className="flex justify-between items-center gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
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
                      onSelectionChanged={(event) => console.log("Row Selected!")}
                      onCellValueChanged={(event) =>
                        console.log(`New Cell Value: ${event.value}`)
                      }
                      className="w-full h-full text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Layout>
        </>
      )}

      {deleteModel.status && deleteModel.productData && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          productId={deleteModel.productData}
        />
      )}

      {editModel.status && editModel.forStatus && (
        <EditModel
          forState={editModel.forStatus}
          setEditUserModel={setEditModel}
          productData={editModel.productData}
        />
      )}
    </>
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
    <>
      <div className="w-full flex gap-4 py-2 justify-center items-center">
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleEdit}
        >
          <Edit size={18} />
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

const EditModel = ({ forState, setEditUserModel, productData }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    full_name: productData?.name || "",
    phone: productData?.mobile || "",
    email: productData?.email || "",
    password: productData?.Password || "",
    street: productData?.address?.street || "",
    zip: productData?.address?.zip || "",
    role: productData?.role || "",
    status: productData?.status || "",
    city: productData?.address?.city || "",
    state: productData?.address?.state || "",
    staff_position: productData?.staff_position || "",
    date_of_birth: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/api/v1/user/employee-add", {
        full_name: userInfo.full_name,
        email: userInfo.email,
        password: userInfo.password,
        role: userInfo.role,
        staff_position: userInfo.staff_position,
        phone: userInfo.phone,
        date_of_birth: userInfo.date_of_birth,
        address: {
          street: userInfo.street,
          city: userInfo.city,
          state: userInfo.state,
          zip: userInfo.zip,
        },
        status: userInfo.status,
      });
      if (response.status === 200 && response.data) {
        toast.success("Employee Added Successfully");
        setEditUserModel({
          status: false,
          productData: null,
          forStatus: null,
        });

        queryClient.invalidateQueries({ queryKey: ["employee_list"] });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.password ||
          error?.response?.data?.error?.email ||
          error?.response?.data?.message ||
          "Add Employee Failed!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmployee = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        `/api/v1/user/employee-update/${productData.id}`,
        {
          full_name: userInfo.full_name,
          email: userInfo.email,
          role: "staff",
          staff_position: userInfo.staff_position,
          phone: userInfo.phone,
          date_of_birth: userInfo.date_of_birth,
          address: {
            street: userInfo.street,
            city: userInfo.city,
            state: userInfo.state,
            zip: userInfo.zip,
          },
        }
      );

      if (response.status === 200 && response.data) {
        toast.success(
          response?.data?.message || "Employee Updated Successfully"
        );
        setEditUserModel({
          status: false,
          productData: null,
          forStatus: null,
        });
        queryClient.invalidateQueries({ queryKey: ["employee_list"] });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.password ||
          error?.response?.data?.error?.email ||
          error?.response?.data?.message ||
          "Update Employee Failed!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
        <div className="bg-white w-[95%] sm:w-[80%] md:w-[70%] lg:w-[50%] p-4 sm:p-5 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center w-full p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.5dvw] font-semibold">{forState === "Add" ? "Add Employee" : "Edit Employee"}</h3>
            <button
              onClick={() => {
                setEditUserModel({
                  status: false,
                  productData: null,
                  forStatus: null,
                });
              }}
              className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
            >
              <CircleX size={30} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full p-3">
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">Full Name</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter Full Name..."
                name="full_name"
                value={userInfo.full_name}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">Phone</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="tel"
                placeholder="Phone number..."
                name="phone"
                value={userInfo.phone}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">Email</label>
              <input
                className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="email"
                placeholder="Enter Email..."
                name="email"
                value={userInfo.email}
                onChange={handleOnChange}
                required
              />
            </div>
            {forState === "Add" && (
              <div className="w-full my-4 flex flex-col gap-2">
                <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">Password</label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleOnChange}
                  required
                />
              </div>
            )}

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">Street Address</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter Street Address..."
                name="street"
                value={userInfo.street}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">Zip Code</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="number"
                placeholder="Enter Zip Code..."
                name="zip"
                value={userInfo.zip}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">City</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter City..."
                name="city"
                value={userInfo.city}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">State</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter State..."
                name="state"
                value={userInfo.state}
                onChange={handleOnChange}
                required
              />
            </div>

            {forState === "Add" && (
              <div className="w-full my-4 flex flex-col gap-2">
                <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">Role</label>
                <select
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  name="role"
                  value={userInfo.role}
                  onChange={handleOnChange}
                  required
                >
                  <option value="">Select Employee Role</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
            )}
            {forState === "Add" && (
              <div className="w-full my-4 flex flex-col gap-2">
                <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">Status</label>
                <select
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  name="status"
                  value={userInfo.status}
                  onChange={handleOnChange}
                  required
                >
                  <option value="">Select Employee Status</option>
                  <option value="active">Active</option>
                  <option value="in-active">Inactive</option>
                </select>
              </div>
            )}

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">Staff Position</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter Staff Position..."
                name="staff_position"
                value={userInfo.staff_position}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">Date of Birth</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="date"
                name="date_of_birth"
                value={userInfo.date_of_birth}
                onChange={handleOnChange}
                max={new Date().toISOString().split("T")[0]}
                pattern="\d{4}-\d{2}-\d{2}"
                required
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-end items-center my-4">
            <button
              type="button"
              onClick={() => {
                setEditUserModel({
                  status: false,
                  productData: null,
                  forStatus: null,
                });
              }}
              className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() =>
                forState === "Add" ? handleSubmit() : handleEmployee()
              }
              className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300 disabled:opacity-80 disabled:pointer-events-none disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading
                ? "Saving..."
                : forState === "Add"
                ? "Add Employee"
                : "Update Employee"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};