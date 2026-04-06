import { SellerNavbar } from "../../components/common/Navbars/SellerNavbar";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { ArrowBigLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule]);

export const LeaveManagement = () => {
  const [rowData] = useState([
    {
      leave_type: "Sick Leave",
      from: "2026-04-06",
      to: "2026-04-06",
      day_type: "Full Day",
      reason: "Sick",
    },
    {
      leave_type: "Sick Leave",
      from: "2026-04-06",
      to: "2026-04-06",
      day_type: "Full Day",
      reason: "Sick",
    },
    {
      leave_type: "Sick Leave",
      from: "2026-04-06",
      to: "2026-04-06",
      day_type: "Full Day",
      reason: "Sick",
    },
    {
      leave_type: "Sick Leave",
      from: "2026-04-06",
      to: "2026-04-06",
      day_type: "Full Day",
      reason: "Sick",
    },
    {
      leave_type: "Sick Leave",
      from: "2026-04-06",
      to: "2026-04-06",
      day_type: "Full Day",
      reason: "Sick",
    },
    {
      leave_type: "Sick Leave",
      from: "2026-04-06",
      to: "2026-04-06",
      day_type: "Full Day",
      reason: "Sick",
    },
    {
      leave_type: "Sick Leave",
      from: "2026-04-06",
      to: "2026-04-06",
      day_type: "Full Day",
      reason: "Sick",
    },
    {
      leave_type: "Sick Leave",
      from: "2026-04-06",
      to: "2026-04-06",
      day_type: "Full Day",
      reason: "Sick",
    },
    {
      leave_type: "Sick Leave",
      from: "2026-04-06",
      to: "2026-04-06",
      day_type: "Full Day",
      reason: "Sick",
    },
    {
      leave_type: "Sick Leave",
      from: "2026-04-06",
      to: "2026-04-06",
      day_type: "Full Day",
      reason: "Sick",
    },
    {
      leave_type: "Sick Leave",
      from: "2026-04-06",
      to: "2026-04-06",
      day_type: "Full Day",
      reason: "Sick",
    },
    {
      leave_type: "Sick Leave",
      from: "2026-04-06",
      to: "2026-04-06",
      day_type: "Full Day",
      reason: "Sick",
    },
    {
      leave_type: "Sick Leave",
      from: "2026-04-06",
      to: "2026-04-06",
      day_type: "Full Day",
      reason: "Sick",
    },
    {
      leave_type: "Sick Leave",
      from: "2026-04-06",
      to: "2026-04-06",
      day_type: "Full Day",
      reason: "Sick",
    },
  ]);
  const [colDefs] = useState([
    { field: "from", headerName: "From", flex: 1 },
    {
      headerName: "To",
      field: "to",
      cellRenderer: (name) => {
        return name.value ? name.value : "";
      },
      flex: 1,
    },
    {
      headerName: "Off Type",
      field: "day_type",
      cellRenderer: (name) => {
        return name.value ? name.value : "";
      },
      flex: 1,
    },
    {
      headerName: "Reason",
      field: "reason",
      cellRenderer: (name) => {
        return name.value ? name.value : "";
      },
      flex: 1,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: false,
    };
  }, []);
  return (
    <>
      <SellerNavbar />
      <div className="w-full max-w-full p-3 sm:p-4 lg:p-8 overflow-y-auto overflow-x-hidden h-[calc(100vh-70px)] sm:h-[calc(100vh-80px)]">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-[1.4dvw] font-semibold mainFont text-(--button-color1) ">
            Leave Management
          </h3>
          <Link
            to={"/seller/dashboard"}
            className="bg-(--button-color2) text-(--primary-color) mainFont text-[1.1dvw] px-6 py-1 rounded-full cursor-pointer flex justify-center items-center gap-3"
          >
            <ArrowBigLeft size={20} />
            Go Back
          </Link>
        </div>
        <div className="flex  gap-5 w-full">
          <div className="w-[60%] shadow-sm border border-(--border-color) rounded-md">
            <div className="flex flex-col  w-full gap-10 p-3">
              <div className="flex w-full flex-col justify-evenly items-start flex-1 gap-5">
                <label className="text-lg font-semibold mainFont px-3 text-(--button-color3) ">
                 Select Leave Type
                </label>
                <div className="flex justify-around items-center w-full border-t border-(--border-color) pt-3">
                  <div className="flex justify-center items-center gap-2 bg-(--border-color)/30 py-2 px-5 rounded-full">
                    <input
                      id="sick"
                      type="radio"
                      name="leaveType"
                      value="sick"
                      className="h-4 w-4"
                    />
                    <label
                      className="text-md font-semibold mainFont"
                      htmlFor="sick"
                    >
                      Sick Leave
                    </label>
                  </div>
                  <div className="flex justify-center items-center gap-2 bg-(--border-color)/30 py-2 px-5 rounded-full">
                    <input
                      id="casual"
                      type="radio"
                      name="leaveType"
                      value="casual"
                      className="h-4 w-4"
                    />
                    <label
                      className="text-md font-semibold mainFont"
                      htmlFor="casual"
                    >
                      Casual Leave
                    </label>
                  </div>
                  <div className="flex justify-center items-center gap-2 bg-(--border-color)/30 py-2 px-5 rounded-full">
                    <input
                      id="personal"
                      type="radio"
                      name="leaveType"
                      value="personal"
                      className="h-4 w-4"
                    />
                    <label
                      className="text-md font-semibold mainFont"
                      htmlFor="personal"
                    >
                      Personal Leave
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col justify-evenly items-start flex-1 gap-5">
                <label className="text-lg px-3 font-semibold mainFont text-(--button-color3)">
                  Select Off Type
                </label>
                <div className="flex justify-around items-center w-full border-t border-(--border-color) pt-3">
                  <div className="flex justify-center items-center gap-2 bg-(--border-color)/30 py-2 px-5 rounded-full">
                    <input
                      id="fullDay"
                      type="radio"
                      name="dayType"
                      value="fullDay"
                      className="h-4 w-4"
                    />
                    <label
                      className="text-md font-semibold mainFont"
                      htmlFor="fullDay"
                    >
                      Full Day Off
                    </label>
                  </div>
                  <div className="flex justify-center items-center gap-2 bg-(--border-color)/30 py-2 px-5 rounded-full">
                    <input
                      id="halfDay"
                      type="radio"
                      name="dayType"
                      value="halfDay"
                      className="h-4 w-4"
                    />
                    <label
                      className="text-md font-semibold mainFont"
                      htmlFor="halfDay"
                    >
                      Half Day Off
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center w-full p-3 gap-4 mt-5">
              <div className="flex flex-col gap-3 w-full">
                <label
                  className="text-lg font-semibold mainFont px-3 text-(--button-color3) "
                  htmlFor="fromDate"
                >
                  From Date
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3 mainFont"
                  type="date"
                  name=""
                  id="fromDate"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label
                  className="text-lg font-semibold mainFont px-3 text-(--button-color3) "
                  htmlFor="toDate"
                >
                  To Date
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3 mainFont"
                  type="date"
                  name=""
                  id="toDate"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full p-3">
              <label
                className="text-lg font-semibold mainFont px-3 text-(--button-color3) "
                htmlFor="reason"
              >
                Reason
              </label>
              <textarea
                placeholder="your reason for the leave..."
                className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3 mainFont"
                name=""
                id="reason"
                cols="30"
                rows="8"
              ></textarea>
            </div>

            <div className="flex justify-center items-center w-full p-3">
              <button className="bg-(--button-color1) text-white px-5 py-2 rounded-md w-full font-semibold text-[1.2dvw] hover:bg-(--button-color2) transition-all duration-300 ease-linear mainFont">
                Apply
              </button>
            </div>
          </div>
          <div className="w-[40%]  p-2 border border-(--border-color) rounded-lg">
            <h3 className="text-[1.4dvw] mb-3 font-semibold mainFont px-3 text-(--button-color3) ">
              Leave History
            </h3>
            <div className="w-full max-w-full  h-[85vh] overflow-y-auto">
              <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                // paginationPageSize={100}
                className="w-full h-full  text-xs sm:text-sm ag-theme-quartz"
                domLayout="autoHeight"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
