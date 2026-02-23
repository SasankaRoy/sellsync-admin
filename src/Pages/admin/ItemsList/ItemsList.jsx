import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import {
  DeleteIcon,
  FilterIcon,
  PluseIcon,
  SortIcon,
} from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { CircleX, Edit, Eye, Plus, Trash, Download } from "lucide-react";
import { AddProductModel } from "../../../components/common/AddProductModel/AddProductModel";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../../components/UI/Loading/Loading";
import { getAllProductList } from "../../../utils/apis/handleProducts";
import { getAllCategoryList } from "../../../utils/apis/handleCategory";
ModuleRegistry.registerModules([AllCommunityModule]);
const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const ItemsList = () => {
  const [activeFilter, setActiveFilter] = useState("");

  const { data: rowData = [], isLoading } = useQuery({
    queryKey: ["get_all_products_list", activeFilter],
    queryFn: async () => await getAllProductList({ search_text: activeFilter }),
  });

  const { data: categoryList, isLoading: CategoryLoading } = useQuery({
    queryKey: ["get_all_category_list"],
    queryFn: async () => await getAllCategoryList(),
  });

  const [showModel, setShowModel] = useState({
    state: false,
    productData: null,
    actionType: "",
  });
  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
    path: "",
  });

  const onAddItem = () => {
    setShowModel({
      state: true,
      productData: {},
      actionType: "Add",
    });
  };

  const onEdit = (product) => {
    
    if (product) {
      setShowModel({
        state: true,
        productData: product,
        actionType: "Edit",
      });
    }
  };
  const onView = (product) => {
    console.log(product, "view");
    if (product) {
      setShowModel({
        state: true,
        productData: product,
        actionType: "View",
      });
    }
  };
  const onDelete = (product) => {
    console.log(product, "delete 201");
    setDeleteModel({
      state: true,
      productId: product.id,
      path: `api/v1/product/delete/${product.id}`,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState([
    { field: "stock_code", headerName: "Stock Code", width: 200 },
    { field: "name", headerName: "Product Name", width: 200 },
    { field: "product_rank", headerName: "Rank", width: 150 },
    { field: "category_name", headerName: "Category", width: 150 },
    { field: "qty_on_hand", headerName: "Stock", width: 150 },
    {
      field: "product_price", headerName: "Price", width: 100, cellRenderer: (amount) => {
        return `$ ${amount.value.toFixed(2)}`;
      },
    },

    { field: "vendor_name", headerName: "Vendor Name", width: 150 },
    { field: "supplier_name", headerName: "Supplier Name", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionBtns,
      cellRendererParams: {
        onEdit,
        onView,
        onDelete,
        skinSafe: true,
      },
      width: 200,
      sortable: false,
      filter: false,
    },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      sortable: true,
      resizable: true,
    };
  }, []);
  return (
    <>
      <Layout>
        {isLoading || CategoryLoading ? (
          <Loading />
        ) : (
          <>
            <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
              <div className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
                  <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                    Item Lists
                  </h3>
                  <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
                    <button
                      onClick={onAddItem}
                      className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                    >
                      Add Items <PluseIcon />
                    </button>
                    <button className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
                      Import CSV <PluseIcon />
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[75vh]">
                <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-full">
                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
                    <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
                      <select
                        onChange={(e) => {
                          setActiveFilter(e.target.value);
                        }}
                        value={activeFilter}
                        className="font-[500] mainFont px-2 sm:px-3 md:px-4 border-none outline-none text-xs sm:text-sm md:text-base lg:text-[0.9dvw] xl:text-base"
                      >
                        <option value="">All</option>
                        {categoryList?.map((cur, key) => (
                          <option value={cur.category_name} key={key}>
                            {cur.category_name}
                          </option>
                        ))}
                      </select>
                      <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[var(--counterBg-color)] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                        <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                          {rowData.length}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 sm:gap-4 justify-between items-center flex-wrap">
                      <button className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
                        Export CSV <Download size={16} />
                      </button>
                      <button>
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-scroll overflow-y-auto">
                    <div className="min-w-[1200px] h-full">
                      <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        pagination={true}
                        rowSelection={rowSelection}
                        // onSelectionChanged={(event) => {
                        //   const selectedNodes = event.api.getSelectedNodes();
                        //   const selectedData = selectedNodes.map(
                        //     (node) => node.data,
                        //   );

                        //   console.log("Selected data updated:", selectedData);
                        // }}
                        // onCellValueChanged={(event) =>
                        //   console.log(`New Cell Value: ${event.value}`)
                        // }
                        // getRowId={(params) => params.data.ID}
                        className="w-full h-full text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Layout>

      {showModel.state && showModel.productData && (
        <AddProductModel
          productData={showModel.productData}
          setShowModel={setShowModel}
          actionType={showModel.actionType}
        />
      )}
      {deleteModel.state && deleteModel.productId && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          productId={deleteModel.productId}
          path={deleteModel.path}
        />
      )}
    </>
  );
};

const ActionBtns = (props) => {
  const { onEdit, onView, onDelete } = props;
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
      <div className="w-full flex gap-2 sm:gap-4 py-2 justify-center items-center">
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleEdit}
        >
          <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color5)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleView}
        >
          <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleDelete}
        >
          <Trash size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
      </div>
    </>
  );
};
