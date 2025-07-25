import React, { useMemo, useState } from "react";
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
  const [rowData, setRowData] = useState([
    {
      ID: "665e9c1e9f4f123456789def",
      FullName: "Sohil Sen",
      Email: "sohil.sen@abc.com",
      Password: "pass@12345",
      Role: "Staff",
      business_id: "665e9c1e9f4f123456789def",
      PhoneNumber: "9990124321",
      Address: "123 Main St,Springfield,IL,62701",
      Status: "active",
      Action: ActionBtns,
    },
    {
      ID: "665e9c1e9f4f123456789def",
      FullName: "Sohil Sen",
      Email: "sohil.sen@abc.com",
      Password: "pass@12345",
      Role: "Staff",
      business_id: "665e9c1e9f4f123456789def",
      PhoneNumber: "9990124321",
      Address: "123 Main St,Springfield,IL,62701",
      Status: "active",
      Action: ActionBtns,
    },
    {
      ID: "665e9c1e9f4f123456789def",
      FullName: "Sohil Sen",
      Email: "sohil.sen@abc.com",
      Password: "pass@12345",
      Role: "Staff",
      business_id: "665e9c1e9f4f123456789def",
      PhoneNumber: "9990124321",
      Address: "123 Main St,Springfield,IL,62701",
      Status: "active",
      Action: ActionBtns,
    },
    {
      ID: "665e9c1e9f4f123456789def",
      FullName: "Sohil Sen",
      Email: "sohil.sen@abc.com",
      Password: "pass@12345",
      Role: "Staff",
      business_id: "665e9c1e9f4f123456789def",
      PhoneNumber: "9990124321",
      Address: "123 Main St,Springfield,IL,62701",
      Status: "active",
      Action: ActionBtns,
    },
    {
      ID: "665e9c1e9f4f123456789def",
      FullName: "Sohil Sen",
      Email: "sohil.sen@abc.com",
      Password: "pass@12345",
      Role: "Staff",
      business_id: "665e9c1e9f4f123456789def",
      PhoneNumber: "9990124321",
      Address: "123 Main St,Springfield,IL,62701",
      Status: "active",
      Action: ActionBtns,
    },
    {
      ID: "665e9c1e9f4f123456789def",
      FullName: "Sohil Sen",
      Email: "sohil.sen@abc.com",
      Password: "pass@12345",
      Role: "Staff",
      business_id: "665e9c1e9f4f123456789def",
      PhoneNumber: "9990124321",
      Address: "123 Main St,Springfield,IL,62701",
      Status: "active",
      Action: ActionBtns,
    },
    {
      ID: "665e9c1e9f4f123456789def",
      FullName: "Sohil Sen",
      Email: "sohil.sen@abc.com",
      Password: "pass@12345",
      Role: "Staff",
      business_id: "665e9c1e9f4f123456789def",
      PhoneNumber: "9990124321",
      Address: "123 Main St,Springfield,IL,62701",
      Status: "active",
      Action: ActionBtns,
    },
    {
      ID: "665e9c1e9f4f123456789def",
      FullName: "Sohil Sen",
      Email: "sohil.sen@abc.com",
      Password: "pass@12345",
      Role: "Staff",
      business_id: "665e9c1e9f4f123456789def",
      PhoneNumber: "9990124321",
      Address: "123 Main St,Springfield,IL,62701",
      Status: "active",
      Action: ActionBtns,
    },
    {
      ID: "665e9c1e9f4f123456789def",
      FullName: "Sohil Sen",
      Email: "sohil.sen@abc.com",
      Password: "pass@12345",
      Role: "Staff",
      business_id: "665e9c1e9f4f123456789def",
      PhoneNumber: "9990124321",
      Address: "123 Main St,Springfield,IL,62701",
      Status: "active",
      Action: ActionBtns,
    },
    {
      ID: "665e9c1e9f4f123456789def",
      FullName: "Sohil Sen",
      Email: "sohil.sen@abc.com",
      Password: "pass@12345",
      Role: "Staff",
      business_id: "665e9c1e9f4f123456789def",
      PhoneNumber: "9990124321",
      Address: "123 Main St,Springfield,IL,62701",
      Status: "active",
      Action: ActionBtns,
    },
  ]);

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
      productData: model.ID,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "ID" },
    { field: "FullName" },
    { field: "Email" },
    { field: "Password" },
    { field: "Role" },
    { field: "business_id" },
    { field: "PhoneNumber" },
    { field: "Address" },
    { field: "Status" },
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
                242
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
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    full_name: productData?.FullName || "",
    phone: productData?.PhoneNumber || "",
    email: productData?.Email || "",
    password: productData?.Password || "",
    street: productData?.Address?.split(",")[0] || "",
    zip: productData?.Address?.split(",")[2] || "",
    role: productData?.Role || "",
    status: productData?.Status || "",
    city: productData?.Address?.split(",")[1] || "",
    state: productData?.Address?.split(",")[2]?.split(",")[0] || "",
    staff_position: "",
    date_of_birth: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        toast.success(`${forState === "Add" ? "Employee Added" : "Employee Updated"} Successfully`);
        setEditUserModel({
          status: false,
          productData: null,
          forStatus: null,
        });
        // Optionally update rowData here if needed
      }
    } catch (error) {
      console.log(error.response);
      toast.error(
        error?.response?.data?.error?.password ||
          error?.response?.data?.error?.email ||
          error?.response?.data?.message ||
          `${forState === "Add" ? "Add Employee" : "Update Employee"} Failed!`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
        <div className="bg-white w-[40%] p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center w-full p-2 rounded-md bg-[var(--button-color1)] text-white">
            <h3 className="text-[1.2dvw] font-semibold">{forState === "Add" ? "Add Employee" : "Edit Employee"}</h3>
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

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-2 w-full p-2">
              <div className="w-full my-3 flex flex-col gap-1">
                <label className="text-[0.9dvw] font-normal paraFont">
                  Full Name
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1 px-2"
                  type="text"
                  placeholder="Enter Full Name..."
                  name="full_name"
                  value={userInfo.full_name}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="w-full my-3 flex flex-col gap-1">
                <label className="text-[0.9dvw] font-normal paraFont">Phone</label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1 px-2"
                  type="tel"
                  placeholder="Phone number..."
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="w-full my-3 flex flex-col gap-1">
                <label className="text-[0.9dvw] font-normal paraFont">Email</label>
                <input
                  className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1 px-2"
                  type="email"
                  placeholder="Enter Email..."
                  name="email"
                  value={userInfo.email}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="w-full my-3 flex flex-col gap-1">
                <label className="text-[0.9dvw] font-normal paraFont">
                  Password
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1 px-2"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="w-full my-3 flex flex-col gap-1">
                <label className="text-[0.9dvw] font-normal paraFont">
                  Street Address
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1 px-2"
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
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1 px-2"
                  type="text"
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
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1 px-2"
                  type="text"
                  placeholder="Enter City..."
                  name="city"
                  value={userInfo.city}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="w-full my-3 flex flex-col gap-1">
                <label className="text-[0.9dvw] font-normal paraFont">State</label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1 px-2"
                  type="text"
                  placeholder="Enter State..."
                  name="state"
                  value={userInfo.state}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="w-full my-3 flex flex-col gap-1">
                <label className="text-[0.9dvw] font-normal paraFont">Role</label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1 px-2"
                  type="text"
                  placeholder="Enter Role..."
                  name="role"
                  value={userInfo.role}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="w-full my-3 flex flex-col gap-1">
                <label className="text-[0.9dvw] font-normal paraFont">Status</label>
                <select
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1 px-2"
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

              <div className="w-full my-3 flex flex-col gap-1">
                <label className="text-[0.9dvw] font-normal paraFont">Staff Position</label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1 px-2"
                  type="text"
                  placeholder="Enter Staff Position..."
                  name="staff_position"
                  value={userInfo.staff_position}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="w-full my-3 flex flex-col gap-1">
                <label className="text-[0.9dvw] font-normal paraFont">Date of Birth</label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[0.9dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1 px-2"
                  type="date"
                  placeholder="Enter Date of Birth..."
                  name="date_of_birth"
                  value={userInfo.date_of_birth}
                  onChange={handleOnChange}
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
                type="submit"
                className="px-5 py-1 rounded-md cursor-pointer text-white font-semibold bg-[var(--button-color5)] text-[1.2dvw]"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : forState === "Add" ? "Add Employee" : "Update Employee"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};