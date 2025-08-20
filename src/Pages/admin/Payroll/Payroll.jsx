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
      editable: false,
    };
  }, []);

  return (
    <Layout>
      <div className="pb-14 w-full px-4 sm:px-6 lg:px-0 h-[calc(100vh-5rem)]" style={{ marginTop: 0 }}>
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
            <h3 className="text-2xl sm:text-3xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Payroll
            </h3>
            <div className="relative w-full sm:w-auto">
              <select className="appearance-none pl-4 pr-8 py-2 sm:py-1 bg-[var(--button-color2)] text-[var(--primary-color)] rounded-full font-[var(--paraFont)] text-sm sm:text-base w-full sm:w-auto cursor-pointer">
                <option>10 Mar - 10 Apr</option>
                <option>10 Mar - 10 Apr</option>
                <option>10 Mar - 10 Apr</option>
                <option>10 Mar - 10 Apr</option>
                <option>10 Mar - 10 Apr</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--primary-color)]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full my-4 lg:my-5">
          <Overviewcards
            cardTitle="Total Employees Paid"
            cardValue="12"
            icon={<TotalEmployeePaidIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />}
            className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
          />
          <Overviewcards
            cardTitle="Total Payroll Cost"
            cardValue="$8,450"
            icon={<TotalPayrollCostIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />}
            className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
          />
          <Overviewcards
            cardTitle="Average Hours Worked"
            cardValue="36.5 hrs"
            icon={<TimeIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />}
            className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
          />
          <Overviewcards
            cardTitle="Pending Payouts"
            cardValue="$1,200"
            icon={<PendingPayoutsIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />}
            className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
          />
        </div>

        <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[60dvh]">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
            <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
              <select className="font-[500] mainFont px-4 border-none outline-none text-xs sm:text-sm lg:text-base">
                <option>Payroll Table</option>
                <option>Payroll Table</option>
                <option>Payroll Table</option>
              </select>
              <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                  242
                </p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4 justify-end items-center">
              {/*<button className="flex justify-between items-center gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                Sort <SortIcon />
              </button>
              <button className="flex justify-between items-center gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                Filter <FilterIcon />
              </button>*/}

              <button>
                <DeleteIcon />
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
  );
};