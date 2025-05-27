import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Overviewcards } from "../../../components/common/Overviewcards/Overviewcards";
import {
  DeleteIcon,
  FilterIcon,
  PendingPayoutsIcon,
  SortIcon,
  TimeIcon,
  TotalEmployeePaidIcon,
  TotalPayrollCostIcon,
} from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Payroll = () => {
  const [rowData, setRowData] = useState([
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
    {
        EmployeeName: "Michael Carter",
      Role: "Cashier",
      HoursWorked: "$500 Lucky Win",
      HourlyRate: "$17/hr",
      Status: "Pending",
      Payment: "$660",      
      Action: "View",
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "EmployeeName" },
    { field: "Role" },
    { field: "HoursWorked" },
    { field: "HourlyRate" },
    { field: "Status" },
    { field: "Payment" },
    { field: "Action" },
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
      <div className="w-full">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Payroll
            </h3>
            <select className="px-3 py-1.5 text-white rounded-full bg-[#333333]">
              <option>10 Mar - 10 Apr</option>
              <option>10 Mar - 10 Apr</option>
              <option>10 Mar - 10 Apr</option>
              <option>10 Mar - 10 Apr</option>
              <option>10 Mar - 10 Apr</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 w-full my-5">
          <Overviewcards
            cardTitle="Total Employees Paid"
            cardValue="12"
            icon={<TotalEmployeePaidIcon />}
          />
          <Overviewcards
            cardTitle=" Total Payroll Cost"
            cardValue="$8,450"
            icon={<TotalPayrollCostIcon />}
          />
          <Overviewcards
            cardTitle="Average Hours Worked"
            cardValue="36.5 hrs"
            icon={<TimeIcon />}
          />
          <Overviewcards
            cardTitle="Pending Payouts"
            cardValue="$1,200"
            icon={<PendingPayoutsIcon />}
          />
        </div>

        <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[60dvh]">
          <div className="flex justify-between items-center py-1.5 shrink-0">
            <div className="flex justify-center items-center gap-3">
              <select className="font-[500] mainFont px-4 border-none outline-none">
                <option>Payroll Table</option>
                <option>Payroll Table</option>
                <option>Payroll Table</option>
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
