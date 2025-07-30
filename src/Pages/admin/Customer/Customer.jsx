import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Overviewcards } from "../../../components/common/Overviewcards/Overviewcards";
import {
  BuyPriceIcon,
  CashierIcon,
  DeleteIcon,
  FilterIcon,
  InventoryManagerIcon,
  PluseIcon,
  SellPriceIcon,
  SortIcon,
  StoreManagerIcon,
  TotalInventoryIcon,
  UsersIcon2,
} from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { CircleX, Edit, Trash } from "lucide-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axios-interceptor";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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

  const handleView = () => {
    onView(data);
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

export const Customer = () => {
  const [editUserModel, setEditUserModel] = useState({
    state: false,
    userData: null,
    forState: null,
  });
  const [deleteModel, setDeleteModel] = useState({
    state: false,
    userData: null,
  });

  // get all customer list...
  const {
    data: rowData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customer_list"],
    queryFn: async () => {
      try {
        const getAllCustomerList = await axiosInstance.post(
          "/api/v1/customer/list",
          {
            page: 1,
            limit: 20,
          }
        );
        if (getAllCustomerList.status === 200 && getAllCustomerList.data) {
          return getAllCustomerList?.data?.results;
        }
      } catch (error) {
        console.error(error);
        throw new error(error.response.data.error);
      }
    },
  });

  // error if error occurs
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  // const [rowData, setRowData] = useState([
  //   {
  //     ID: "1",
  //     Name: "John Doe",
  //     EmailID: "john@example.com",
  //     PhoneNumber: "1234567890",
  //     DOB: "09/17/1990",
  //     Zipcode: "09/17/1990",
  //     Points: "09/17/1990",
  //     OfSales: "0",
  //     SMSPromotions: "Disable",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "1",
  //     Name: "John Doe",
  //     EmailID: "john@example.com",
  //     PhoneNumber: "1234567890",
  //     DOB: "09/17/1990",
  //     Zipcode: "09/17/1990",
  //     Points: "09/17/1990",
  //     OfSales: "0",
  //     SMSPromotions: "Disable",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "1",
  //     Name: "John Doe",
  //     EmailID: "john@example.com",
  //     PhoneNumber: "1234567890",
  //     DOB: "09/17/1990",
  //     Zipcode: "09/17/1990",
  //     Points: "09/17/1990",
  //     OfSales: "0",
  //     SMSPromotions: "Disable",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "1",
  //     Name: "John Doe",
  //     EmailID: "john@example.com",
  //     PhoneNumber: "1234567890",
  //     DOB: "09/17/1990",
  //     Zipcode: "09/17/1990",
  //     Points: "09/17/1990",
  //     OfSales: "0",
  //     SMSPromotions: "Disable",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "1",
  //     Name: "John Doe",
  //     EmailID: "john@example.com",
  //     PhoneNumber: "1234567890",
  //     DOB: "09/17/1990",
  //     Zipcode: "09/17/1990",
  //     Points: "09/17/1990",
  //     OfSales: "0",
  //     SMSPromotions: "Disable",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "1",
  //     Name: "John Doe",
  //     EmailID: "john@example.com",
  //     PhoneNumber: "1234567890",
  //     DOB: "09/17/1990",
  //     Zipcode: "09/17/1990",
  //     Points: "09/17/1990",
  //     OfSales: "0",
  //     SMSPromotions: "Disable",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "1",
  //     Name: "John Doe",
  //     EmailID: "john@example.com",
  //     PhoneNumber: "1234567890",
  //     DOB: "09/17/1990",
  //     Zipcode: "09/17/1990",
  //     Points: "09/17/1990",
  //     OfSales: "0",
  //     SMSPromotions: "Disable",
  //     Actions: ActionBtns,
  //   },
  //   {
  //     ID: "1",
  //     Name: "John Doe",
  //     EmailID: "john@example.com",
  //     PhoneNumber: "1234567890",
  //     DOB: "09/17/1990",
  //     Zipcode: "09/17/1990",
  //     Points: "09/17/1990",
  //     OfSales: "0",
  //     SMSPromotions: "Disable",
  //     Actions: ActionBtns,
  //   },
  // ]);

  const onEdit = (user) => {
    // edit user data
    console.log("edit user");

    setEditUserModel({
      state: true,
      userData: user,
      forState: "Edit",
    });
  };
  const onDelete = (user) => {
    console.log("delete user");
    setDeleteModel({
      state: true,
      userData: user.ID,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "id" },
    { field: "name" },
    { field: "email" },
    { field: "mobile" },
    { field: "dob" },
    { field: "zipcode" },
    { field: "points" },
    { field: "address" },
    { field: "sms_email_promotions" },
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
      {isLoading ? (
        <Loading />
      ) : (
        <Layout>
          <div className="w-full gap-5">
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                  Customers
                </h3>
                <button
                  onClick={() => {
                    setEditUserModel({
                      state: true,
                      userData: "23",
                      forState: "Add",
                    });
                  }}
                  className="px-5 py-1.5 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-4 text-white mainFont font-[500] cursor-pointer text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                >
                  Add Customer <PluseIcon />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 w-full my-6">
              <Overviewcards
                cardTitle="Active Customers"
                cardValue="2"
                percent="View"
                icon={<StoreManagerIcon />}
              />
              <Overviewcards
                cardTitle="Inactive Customers"
                cardValue="8"
                percent="View"
                icon={<CashierIcon />}
              />
              <Overviewcards
                cardTitle="Customers with Promotions"
                cardValue="4"
                percent="View"
                icon={<InventoryManagerIcon />}
              />
              <Overviewcards
                cardTitle="Total Customers"
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
                    {rowData.length}
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
          </div>
        </Layout>
      )}

      {editUserModel.state &&
        editUserModel.userData &&
        editUserModel.forState && (
          <EditUserModel
            setEditUserModel={setEditUserModel}
            userData={editUserModel.userData}
            forState={editUserModel.forState}
          />
        )}

      {deleteModel.state && deleteModel.userData && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          productId={deleteModel.userData}
        />
      )}
    </>
  );
};

const EditUserModel = ({ setEditUserModel, userData, forState }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    customer_name: userData?.name || "",
    customer_email: userData?.email || "",
    customer_mobile: userData?.mobile || "",
    date_of_birth: userData?.dob || "",
    customer_address: userData?.address || "",
    customer_zipcode: userData?.zipcode || "",
    customer_points: userData?.points || "",
    sms_email_promotions: userData?.sms_email_promotions || "",
    status: userData?.status || "",
  });
  const queryClient = useQueryClient();

  // handle onChange function...
  const handleOnChanges = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  // handle onSubmit function add/create new customer..
  const handleOnsubmit = async () => {
    setIsSaving(true);

    try {
      const reqSaveCustomer = await axiosInstance.post("api/v1/customer/add", {
        ...customerInfo,
      });

      if (reqSaveCustomer.status === 200 && reqSaveCustomer.data) {
        queryClient.invalidateQueries({
          queryKey: ["customer_list"],
        });
        setEditUserModel({
          state: false,
          userData: null,
          forState: null,
        });
        toast.success(
          reqSaveCustomer.data.message || "Customer Added Successfully!"
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to save customer");
      console.error(error?.response?.data?.error);
    } finally {
      setIsSaving(false);
    }
  };

  // handle onEdit function edit/update existing customer...
  const handleCustomerUpdate = async () => {
    try {
      const reqUpdateCustomer = await axiosInstance.post(``, {});
    } catch (error) {
      console.log(error?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
        <div className="bg-white w-[50%] p-5 rounded-lg shadow-md">
          <div className="flex justify-between items-center w-full p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
            <h3 className="text-[1.5dvw] font-semibold">{forState} User</h3>
            <button
              onClick={() => {
                setEditUserModel({
                  state: false,
                  userData: null,
                });
              }}
              className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
            >
              <CircleX size={30} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full p-3">
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">Name</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter Name..."
                name="customer_name"
                value={customerInfo.customer_name}
                onChange={handleOnChanges}
              />
            </div>
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">Mobile</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="number"
                placeholder="phone number..."
                value={customerInfo.customer_mobile}
                name="customer_mobile"
                onChange={handleOnChanges}
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">Email</label>
              <input
                className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="email"
                placeholder="Enter Email...."
                value={customerInfo.customer_email}
                name="customer_email"
                onChange={handleOnChanges}
              />
            </div>
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">DOB</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="date"
                name="date_of_birth"
                value={customerInfo.date_of_birth}
                onChange={handleOnChanges}
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">
                Address
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="type"
                placeholder="Enter Address..."
                name="customer_address"
                value={customerInfo.customer_address}
                onChange={handleOnChanges}
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">
                Zipcode
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="type"
                placeholder="Enter Zipcode..."
                name="customer_zipcode"
                value={customerInfo.customer_zipcode}
                onChange={handleOnChanges}
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">Points</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="number"
                placeholder="Enter Points..."
                name="customer_points"
                value={customerInfo.customer_points}
                onChange={handleOnChanges}
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">
                SMS & Email Promotions
              </label>

              <select
                name="sms_email_promotions"
                value={customerInfo.sms_email_promotions}
                onChange={handleOnChanges}
                className="bg-[#F3F3F3] appearance-none w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              >
                <option value="">Select for Promotions</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full col-span-2 my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">Status</label>

              <select
                name="status"
                value={customerInfo.status}
                onChange={handleOnChanges}
                className="bg-[#F3F3F3] appearance-none w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="in-active">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end items-center gap-5 my-4">
            <button
              onClick={() => {
                setEditUserModel({
                  state: false,
                  userData: null,
                });
              }}
              className="px-5 py-1 rounded-md cursor-pointer text-white font-semibold bg-[var(--button-color4)] text-[1.2dvw] "
            >
              Cancel
            </button>
            <button
              onClick={handleOnsubmit}
              disabled={
                isSaving ||
                !Object.keys(customerInfo).every((item) => customerInfo[item])
              }
              className="px-5 py-1 rounded-md cursor-pointer text-white font-semibold bg-[var(--button-color5)] text-[1.2dvw]  disabled:opacity-80 disabled:pointer-events-none disabled:cursor-not-allowed"
            >
              {isSaving ? (
                "Saving..."
              ) : (
                <>{forState === "Add" ? "Save" : "Update"}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
