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
import EmployeeModal from "../../../components/common/Models/EmployeeModal";
import { CircleX, Edit, Trash, Download, PlusIcon } from "lucide-react";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axios-interceptor";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loading } from "../../../components/UI/Loading/Loading";
import { parse, format } from "date-fns";
import { useBulkDelete } from "../../../utils/apis/BulkDelete";

// updates
// create one field for pay rate
// create one field for pay type
// create one field for driv li/ PDF
// create one field for Social Security Number

ModuleRegistry.registerModules([AllCommunityModule]);
const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Employee = () => {
  const [bulkDeleteIds, setBulkDeleteIds] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModel, setDeleteModel] = useState({
    status: false,
    productData: null,
    path: null,
  });
  const [editModel, setEditModel] = useState({
    status: false,
    productData: null,
    forStatus: null,
  });
  const bulkDelete = useBulkDelete();

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
    isFetching,
  } = useQuery({
    queryKey: ["employee_list"],
    queryFn: getEmployeeList,
  });

  // console.log(isFetching,'isFetching',isLoading,'isLoading')

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
      path: `/api/v1/user/employee-delete/${model.id}`,
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
    //{ field: "id" },
    { field: "name" },
    { field: "email" },
    {
      field: "log_userId",
      headerName: "User ID",
      valueGetter: (params) => params.data.log_userId || "N/A",
    },
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
    { field: "staff_position", headerName: "Position" },
    { field: "pay_rate", headerName: "Pay Rate" },
    { field: "pay_type", headerName: "Pay Type" },
    { field: "social_security_number", headerName: "SSN" },
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

  const handleImportCSV = () => {
    console.log("Import CSV clicked");
    // Add your import CSV logic here
  };

  const handleExportCSV = () => {
    console.log("Export CSV clicked");
    // Add your export CSV logic here
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Layout>
            <div
              className="pb-14 w-full px-4 sm:px-6 lg:px-0 h-[calc(100vh-5rem)]"
              style={{ marginTop: 0 }}
            >
              <div className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
                  <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                    Employees
                  </h3>
                  <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto lg:flex-row lg:w-auto lg:gap-5">
                    <button
                      onClick={() => {
                        setEditModel({
                          status: true,
                          productData: null,
                          forStatus: "Add",
                        });
                      }}
                      className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                    >
                      Add Employee <PluseIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleImportCSV}
                      className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                    >
                      Import CSV <PluseIcon className="w-4 h-4" />
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
                  icon={
                    <StoreManagerIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />
                  }
                />
                <Overviewcards
                  cardTitle="Inactive Employees"
                  cardValue="8"
                  percent="View"
                  className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
                  icon={
                    <CashierIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />
                  }
                />
                <Overviewcards
                  cardTitle="Total Tasks"
                  cardValue="4"
                  percent="View"
                  className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
                  icon={
                    <InventoryManagerIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />
                  }
                />
                <Overviewcards
                  cardTitle="Total Employee"
                  cardValue="8,593"
                  percent="View"
                  className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
                  icon={
                    <UsersIcon2 className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />
                  }
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
                    {/*<button className="flex justify-between items-center gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                      Sort <SortIcon />
                    </button>
                    <button className="flex justify-between items-center gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                      Filter <FilterIcon />
                    </button>*/}
                    <button className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
                      Export CSV <Download size={16} />
                    </button>

                    <button
                      onClick={async () => {
                        setIsDeleting(true);
                        const result = bulkDelete.mutate({
                          path: "api/v1/user/bulk-employee-delete",
                          idList: {
                            employeeIds: bulkDeleteIds,
                          },
                          queryKey: "employee_list",
                          isDeleting: setIsDeleting,
                        });
                      }}
                      className="disabled:cursor-not-allowed  disabled:opacity-30 cursor-pointer disabled:pointer-events-none"
                      disabled={bulkDeleteIds.length === 0 ? true : false}
                    >
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
                      onSelectionChanged={(event) => {
                        let bulkIds = [];
                        event.selectedNodes.forEach((item) => {
                          bulkIds.push(item.data.id);
                        });
                        const uniqueSet = new Set(bulkIds);
                        setBulkDeleteIds([...uniqueSet]);
                      }}
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
          path={deleteModel.path}
        />
      )}

      {editModel.status && editModel.forStatus && (
        <EmployeeModal
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
