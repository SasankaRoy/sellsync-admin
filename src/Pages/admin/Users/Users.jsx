import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Overviewcards } from "../../../components/common/Overviewcards/Overviewcards";
import {
  BuyPriceIcon,
  CashierIcon,
  DeleteIcon,
  FilterIcon,
  InventoryManagerIcon,
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

export const Users = () => {
  const [editUserModel, setEditUserModel] = useState({
    state: false,
    userData: null,
  });
  const [deleteModel, setDeleteModel] = useState({
    state: false,
    userData: null,
  });
  const [rowData, setRowData] = useState([
    {
      ID: "1",
      Name: "John Doe",
      EmailID: "john@example.com",
      PhoneNumber: "1234567890",
      DOB: "09/17/1990",
      Zipcode: "09/17/1990",
      Points: "09/17/1990",
      OfSales: "0",
      SMSPromotions: "Disable",
      Actions: ActionBtns,
    },
  ]);

  const onEdit = (user) => {
    // edit user data
    console.log("edit user");

    setEditUserModel({
      state: true,
      userData: user,
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
    { field: "ID" },
    { field: "Name" },
    { field: "EmailID" },
    { field: "PhoneNumber" },
    { field: "DOB" },
    { field: "Zipcode" },
    { field: "Points" },
    { field: "OfSales" },
    { field: "SMSPromotions" },
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
                Users & Roles
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 w-full my-6">
            <Overviewcards
              cardTitle="Store Manager"
              cardValue="2"
              percent="View"
              icon={<StoreManagerIcon />}
            />
            <Overviewcards
              cardTitle="No.of Cashier"
              cardValue="8"
              percent="View"
              icon={<CashierIcon />}
            />
            <Overviewcards
              cardTitle="Inventory Manager"
              cardValue="4"
              percent="View"
              icon={<InventoryManagerIcon />}
            />
            <Overviewcards
              cardTitle="Registered Uses"
              cardValue="8,593"
              percent="View"
              icon={<UsersIcon2 />}
            />
          </div>

          <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[60dvh]">
            <div className="flex justify-between items-center py-1.5 shrink-0">
              <div className="flex justify-center items-center gap-3">
                <select className="font-[500] mainFont px-4 border-none outline-none">
                  <option>All Users</option>
                  <option>All Users</option>
                  <option>All Users</option>
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

      {editUserModel.state && editUserModel.userData && (
        <EditUserModel
          setEditUserModel={setEditUserModel}
          userData={editUserModel.userData}
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

const EditUserModel = ({ setEditUserModel, userData }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
        <div className="bg-white w-[50%] p-5 rounded-lg shadow-md">
          <div className="flex justify-between items-center w-full p-1">
            <h3 className="text-[1.5dvw] font-semibold">Edit User</h3>
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

          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">Name</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter Name..."
              />
            </div>
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">Mobile</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="number"
                placeholder="phone number..."
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">Email</label>
              <input
                className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="email"
                placeholder="Enter Email...."
              />
            </div>
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">DOB</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="date"
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
              />
            </div>
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">Points</label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="numver"
                placeholder="Enter Points..."
              />
            </div>
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">
                SMS & Email Promotions
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="type"
                placeholder="Enter Points..."
              />
            </div>
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">
                House Acc Eligible
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="type"
                placeholder="Enter House Acc
              Eligible..."
              />
            </div>
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">
                Max $ Amount of Balance
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="type"
                placeholder="Enter Balance..."
              />
            </div>
          </div>
          <div className="flex justify-end items-center gap-5 my-4">
            <button className="px-5 py-1 rounded-md cursor-pointer text-white font-semibold bg-[var(--button-color4)] text-[1.2dvw] ">
              Cancel
            </button>
            <button className="px-5 py-1 rounded-md cursor-pointer text-white font-semibold bg-[var(--button-color5)] text-[1.2dvw] ">
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
