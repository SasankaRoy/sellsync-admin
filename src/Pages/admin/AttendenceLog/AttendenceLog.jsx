import React, { useMemo, useState } from "react";
import Layout from "../../../components/common/Layout/Layout";
import { Link } from "react-router-dom";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import moment from "moment";
ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "none",
  headerCheckbox: false,
};

export const AttendenceLog = () => {
  const [rowData, setRowData] = useState([]);
  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState([
    {
      field: "employee_name",
      headerName: "Employee Name",
      flex: 1,
      cellRenderer: (params) => {
        return moment(params?.value).format("DD-MM-YYYY");
      },
    },
    {
      field: "email",
      headerName: "Email",
      cellRenderer: (payment) => {
        return payment?.data?.payment?.method;
      },
      flex: 1,
    },
    {
      field: "punch_in",
      headerName: "Log In Time",
      cellRenderer: (amount) => {
        return `$ ${amount?.data?.payment?.grandTotal?.toFixed(2)}`;
      },
      flex: 1,
    },
    {
      field: "break_time",
      headerName: "Break Time",
      cellRenderer: (amount) => {
        return `$ ${amount?.data?.payment?.taxTotal?.toFixed(2)}`;
      },
      flex: 1,
    },
    {
      field: "punch_out",
      headerName: "Log Out Time",
      cellRenderer: (amount) => {
        return `$ ${amount?.data?.payment?.subTotal?.toFixed(2)}`;
      },
      flex: 1,
    },

    {
      field: "total_working_hours",
      headerName: "Total Working Hours",
      cellRenderer: (amount) => {
        return amount?.data?.payment?.totalItems || 0;
      },
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      cellRenderer: (amount) => {
        return amount?.data?.payment?.totalItems || 0;
      },
      flex: 1,
    },

    // {
    //   headerName: "Actions",
    //   field: "actions",
    //   cellRenderer: (props) => {
    //     return (
    //       <div className="w-full flex gap-2 sm:gap-4 py-2 justify-center items-center">
    //         <button
    //           className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
    //           onClick={() => {
    //             onView(props.data);
    //           }}
    //         >
    //           <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
    //         </button>
    //       </div>
    //     );
    //   },
    // },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: false,
    };
  }, []);

  return (
    <>
      <Layout>
        <div className="pb-14 w-full px-4 sm:px-6 lg:px-0 h-[calc(100vh-5rem)]">
          <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
              <h3 className="text-2xl sm:text-3xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                Employee Attendance Logs
              </h3>
              <Link
                to="/admin/employees"
                className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color4)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
              >
                Back Employee List
              </Link>
            </div>
          </div>

          <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[80dvh]">
            <div className="h-full w-full overflow-x-scroll overflow-y-auto">
              <div className="min-w-[800px] h-full">
                <AgGridReact
                  rowData={rowData || []}
                  columnDefs={colDefs}
                  // loading={loading}
                  defaultColDef={defaultColDef}
                  pagination={false}
                  rowSelection={rowSelection}
                  onSelectionChanged={() => console.log("Row Selected!")}
                  //   loading={refetching}
                  onCellValueChanged={(event) =>
                    console.log(`New Cell Value: ${event.value}`)
                  }
                  className="w-full h-full text-sm"
                />
              </div>
            </div>

            {/* <PaginationTest
              page={currentPage}
              limit={pageLimit}
              total_records={totalData}
              total_pages={totalPages}
              onPageChange={handlePageChange}
            /> */}
          </div>
        </div>
      </Layout>
    </>
  );
};
