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
        error.message || "Somethig went wrong! while fetch employee list"
      );
    }
  }, [error]);

  //micro change
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
        // skinSafe: true,
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Layout>
            <div className="w-full gap-5">
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                    Employees
                  </h3>
                  <button
                    onClick={() => {
                      setEditModel({
                        status: true,
                        productData: null,
                        forStatus: "Add",
                      });
                    }}
                    className="px-5 py-1.5 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-4 text-white mainFont font-[500] cursor-pointer text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                  >
                    Add Employee <PluseIcon />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 w-full my-6">
              <Overviewcards
                cardTitle="Active Employees"
                cardValue="2"
                percent="View"
                icon={<StoreManagerIcon />}
              />
              <Overviewcards
                cardTitle="Inactive Employees"
                cardValue="8"
                percent="View"
                icon={<CashierIcon />}
              />
              <Overviewcards
                cardTitle="Total Tasks"
                cardValue="4"
                percent="View"
                icon={<InventoryManagerIcon />}
              />
              <Overviewcards
                cardTitle="Total Employee"
                cardValue="8,593"
                percent="View"
                icon={<UsersIcon2 />}
              />
            </div>

            <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[60dvh]">
              <div className="flex justify-between items-center py-1.5 shrink-0">
                <div className="flex justify-center items-center gap-3">
                  <select className="font-[500] mainFont px-4 border-none outline-none">
                    <option>All Customers</option>
                    <option>All Customer</option>
                    <option>All Customer</option>
                  </select>
                  <p className="px-3 text-[1dvw] py-.5 bg-[#F8A61B] rounded-2xl font-[500] border-none text-white">
                    {rowData?.length}
                  </p>
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <button className="flex justify-center items-center gap-2 px-4 py-1 text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                    Sort <SortIcon />
                  </button>
                  <button className="flex justify-center items-center gap-2 px-4 py-1 text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                    Filter <FilterIcon />
                  </button>
                  <button>
                    <DeleteIcon />
                  </button>
                </div>
              </div>
              <div className="h-full w-full">
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
                />
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
      console.log(response.data);
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
      console.log(error.response);
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
      console.log(error.response);
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
        <div className="bg-white w-[60%] max-h-[95%] overflow-y-auto p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center w-full px-2 py-2 rounded-md bg-[var(--button-color1)] text-white">
            <h3 className="text-[1.6dvw] font-semibold">
              {forState === "Add" ? "Add Employee" : "Edit Employee"}
            </h3>
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
              <CircleX size={24} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full p-2">
            <div className="w-full my-3 flex flex-col gap-1">
              <label className="text-[0.9dvw] font-normal paraFont">
                Full Name
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 px-2"
                type="text"
                placeholder="Enter Full Name..."
                name="full_name"
                value={userInfo.full_name}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="w-full my-3 flex flex-col gap-1">
              <label className="text-[0.9dvw] font-normal paraFont">
                Phone
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 px-2"
                type="tel"
                placeholder="Phone number..."
                name="phone"
                value={userInfo.phone}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="w-full my-3 flex flex-col gap-1">
              <label className="text-[0.9dvw] font-normal paraFont">
                Email
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 px-2"
                type="email"
                placeholder="Enter Email..."
                name="email"
                value={userInfo.email}
                onChange={handleOnChange}
                required
              />
            </div>
            {forState === "Add" && (
              <div className="w-full my-3 flex flex-col gap-1">
                <label className="text-[0.9dvw] font-normal paraFont">
                  Password
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 px-2"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleOnChange}
                  required
                />
              </div>
            )}

            <div className="w-full my-3 flex flex-col gap-1">
              <label className="text-[0.9dvw] font-normal paraFont">
                Street Address
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 px-2"
                type="text"
                placeholder="Enter Street Address..."
                name="street"
                value={userInfo.street}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="w-full my-3 flex flex-col gap-1">
              <label className="text-[0.9dvw] font-normal paraFont">
                Zip Code
              </label>
              <input
                className="bg-[#F3F3F3]  w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 px-2"
                type="number"
                placeholder="Enter Zip Code..."
                name="zip"
                value={userInfo.zip}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="w-full my-3 flex flex-col gap-1">
              <label className="text-[0.9dvw] font-normal paraFont">City</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 px-2"
                type="text"
                placeholder="Enter City..."
                name="city"
                value={userInfo.city}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="w-full my-3 flex flex-col gap-1">
              <label className="text-[0.9dvw] font-normal paraFont">
                State
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 px-2"
                type="text"
                placeholder="Enter State..."
                name="state"
                value={userInfo.state}
                onChange={handleOnChange}
                required
              />
            </div>

            {forState === "Add" && (
              <div className="w-full my-3 flex flex-col gap-1">
                <label className="text-[0.9dvw] font-normal paraFont">
                  Role
                </label>
                <select
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 px-2"
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
              <div className="w-full my-3 flex flex-col gap-1">
                <label className="text-[0.9dvw] font-normal paraFont">
                  Status
                </label>
                <select
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 px-2"
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

            <div className="w-full my-3 flex flex-col gap-1">
              <label className="text-[0.9dvw] font-normal paraFont">
                Staff Position
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 px-2"
                type="text"
                placeholder="Enter Staff Position..."
                name="staff_position"
                value={userInfo.staff_position}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="w-full my-3 flex flex-col gap-1">
              <label className="text-[0.9dvw] font-normal paraFont">
                Date of Birth
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-2 px-2"
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
          <div className="flex justify-end items-center gap-5 my-4">
            <button
              type="button"
              onClick={() => {
                setEditUserModel({
                  status: false,
                  productData: null,
                  forStatus: null,
                });
              }}
              className="px-5 py-1 rounded-md cursor-pointer text-white font-semibold bg-[var(--button-color4)] text-[1.2dvw]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() =>
                forState === "Add" ? handleSubmit() : handleEmployee()
              }
              className="px-5 py-1 rounded-md cursor-pointer text-white font-semibold bg-[var(--button-color5)] text-[1.2dvw]"
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
