import React, { useMemo, useState } from "react";
import {
  DeleteIcon,
  FilterIcon,
  PluseIcon,
  SortIcon,
} from "../../../assets/Svgs/AllSvgs";
import { Edit, Trash, Download, Eye } from "lucide-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

import { Layout } from "../../../components/common/Layout/Layout";
import { CreateDeal } from "../../../components/common/Models/CreateDeal";
import { useQuery } from "@tanstack/react-query";
import { getAllDeals } from "../../../utils/apis/handleDeals";
import { Loading } from "../../../components/UI/Loading/Loading";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "none",
  headerCheckbox: false,
};

const ActionBtns = (props) => {
  const { onEdit, onDelete, data } = props;
  // const { data } = props;

  const handleEdit = () => {
    console.log(data);
    onEdit(data);
  };

  // const handleView = () => {
  //   onView(data);
  // };
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

export const Deals = () => {
  const [newDeal, setNewDeal] = useState(false);
  const [isDelete, setIsDelete] = useState({
    status: false,
    id: null,
  });

  const { data: rowData, isLoading } = useQuery({
    queryKey: ["getDeals_list"],
    queryFn: async () => {
      const res = await getAllDeals();
      return res.results || [];
    },
  });

  const checkStatus = (status) => {
    switch (status) {
      case "active":
        return {
          forDot: "bg-green-500",
          forText: "text-green-500",
        };

      case "inactive":
        return {
          forDot: "bg-red-500",
          forText: "text-red-500",
        };

      default:
        return {
          forDot: "bg-red-500",
          forText: "text-red-500",
        };
    }
  };

  const onEdit = () => {};
  const onDelete = (data) => {
    setIsDelete({
      status: true,
      id: data.id,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState([
    { field: "deal_name", headerName: "Deal Name", flex: 1 },
    { field: "deal_type", headerName: "Type", flex: 1 },
    {
      field: "deal_price",
      headerName: "Price",
      flex: 1,
      cellRenderer: (amount) => {
        return `$ ${amount.value.toFixed(2)}`;
      },
    },
    { field: "deal_quantity", headerName: "Quantity", flex: 1 },
    { field: "start_date", headerName: "Start Date", flex: 1 },
    { field: "end_date", headerName: "End Date", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (status) => {
        return (
          <>
            <div className=" px-3 flex justify-center items-center w-auto gap-3">
              <div
                className={`h-[.8dvw] w-[.8dvw] shrink-0 rounded-full ${checkStatus(status.value)?.forDot}`}
              ></div>
              <p
                className={`font-medium capitalize ${checkStatus(status.value)?.forText} text-[1dvw]`}
              >
                {status.value}
              </p>
            </div>
          </>
        );
      },
      flex: 1,
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionBtns,
      cellRendererParams: {
        onEdit,
        onDelete,
        skinSafe: true,
      },
      flex: 1,
    },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: false,
    };
  }, []);

  return (
    <>
      <Layout>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
            <div className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0 lg:flex-row lg:items-center lg:gap-0 lg:mb-0">
                <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                  POS / Deals
                </h3>
                <button
                  onClick={() => {
                    setNewDeal(true);
                  }}
                  className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                >
                  Create a Deal <PluseIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[80dvh]">
              <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 lg:px-2.5 lg:py-2 h-full">
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0 lg:flex-row lg:items-center lg:gap-0">
                  <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto lg:justify-center lg:w-auto">
                    <select className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-base">
                      <option>All Deals</option>
                      <option>All Deals</option>
                      <option>All Deals</option>
                    </select>
                    <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                      <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                        {rowData?.length || 0}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-4 justify-between items-center flex-wrap lg:justify-center lg:gap-4">
                    {/*<button className="flex justify-between lg:justify-center items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                        Sort <SortIcon />
                      </button>
                      <button className="flex justify-between lg:justify-center items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                        Filter <FilterIcon />
                      </button>*/}
                    <button className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
                      Export CSV <Download size={16} />
                    </button>
                    <button>
                      <DeleteIcon className="w-5 h-5 lg:w-auto lg:h-auto" />
                    </button>
                  </div>
                </div>
                <div className="h-full w-full overflow-x-scroll overflow-y-auto lg:overflow-visible">
                  <div className="min-w-[800px] lg:min-w-0 h-full">
                    <AgGridReact
                      rowData={rowData}
                      columnDefs={colDefs}
                      defaultColDef={defaultColDef}
                      pagination={true}
                      rowSelection={rowSelection}
                      className="w-full h-full text-sm lg:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
      {newDeal && <CreateDeal setNewDeal={setNewDeal} />}
      {isDelete.status && isDelete.id && (
        <DeleteModel
          path={`/api/v1/common/deal-delete/${isDelete.id}`}
          productId={isDelete.id}
          setDeleteModel={setIsDelete}
          querykey="getDeals_list"
        />
      )}
    </>
  );
};
