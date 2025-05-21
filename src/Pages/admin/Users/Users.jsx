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

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Users = () => {
  const [rowData, setRowData] = useState([
    {
      Name: "John Doe",
      Role: "Admin",
      PhoneNumber: "1234567890",
      EmailID: "john@example.com",
      Status: "Active",
      LastOnline: "2023-01-01 12:00:00",
      Actions: "Edit",
    },
    {
      Name: "Jane Smith",
      Role: "User",
      PhoneNumber: "0987654321",
      EmailID: "jane@example.com",
      Status: "Active",
      LastOnline: "2023-01-01 12:00:00",
      Actions: "Edit",
    },
    {
      Name: "John Doe",
      Role: "Admin",
      PhoneNumber: "1234567890",
      EmailID: "john@example.com",
      Status: "Active",
      LastOnline: "2023-01-01 12:00:00",
      Actions: "Edit",
    },
    {
      Name: "John Doe",
      Role: "Admin",
      PhoneNumber: "1234567890",
      EmailID: "john@example.com",
      Status: "Active",
      LastOnline: "2023-01-01 12:00:00",
      Actions: "Edit",
    },
    {
      Name: "John Doe",
      Role: "Admin",
      PhoneNumber: "1234567890",
      EmailID: "john@example.com",
      Status: "Active",
      LastOnline: "2023-01-01 12:00:00",
      Actions: "Edit",
    },
    {
      Name: "John Doe",
      Role: "Admin",
      PhoneNumber: "1234567890",
      EmailID: "john@example.com",
      Status: "Active",
      LastOnline: "2023-01-01 12:00:00",
      Actions: "Edit",
    },
    {
      Name: "John Doe",
      Role: "Admin",
      PhoneNumber: "1234567890",
      EmailID: "john@example.com",
      Status: "Active",
      LastOnline: "2023-01-01 12:00:00",
      Actions: "Edit",
    },
    {
      Name: "John Doe",
      Role: "Admin",
      PhoneNumber: "1234567890",
      EmailID: "john@example.com",
      Status: "Active",
      LastOnline: "2023-01-01 12:00:00",
      Actions: "Edit",
    },
    {
      Name: "John Doe",
      Role: "Admin",
      PhoneNumber: "1234567890",
      EmailID: "john@example.com",
      Status: "Active",
      LastOnline: "2023-01-01 12:00:00",
      Actions: "Edit",
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "Name" },
    { field: "Role" },
    { field: "PhoneNumber" },
    { field: "EmailID" },
    { field: "Status" },
    { field: "LastOnline" },
    { field: "Actions" },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: true,
    };
  }, []);
  return (
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
  );
};
