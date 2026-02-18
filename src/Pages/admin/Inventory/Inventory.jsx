import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Overviewcards } from "../../../components/common/Overviewcards/Overviewcards";
import {
  BuyPriceIcon,
  DeleteIcon,
  FilterIcon,
  LowStockIcon,
  OutOfStockIcon,
  SellPriceIcon,
  SortIcon,
  TotalInventoryIcon,
} from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import ProductImg1 from "../../../assets/images/ProductImg1.png";
import { Doughtchart } from "../../../components/common/charts/Doughtchart";
import { CircleX, Edit, Eye, Plus, Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllProductList } from "../../../utils/apis/handleProducts";
import { Loading } from "../../../components/UI/Loading/Loading";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { getAllCategoryList } from "../../../utils/apis/handleCategory";
import { AddProductModel } from "../../../components/common/AddProductModel/AddProductModel";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

const saleData = [
  {
    name: "Beer",
    value: "2,344",
    color: "#13A34B",
  },
  {
    name: "Gin",
    value: "2,004",
    color: "#0052CC",
  },
  {
    name: "Whiskey",
    value: "1,988",
    color: "#420088",
  },
  {
    name: "Rum",
    value: "1,540",
    color: "#00C7E6",
  },
  {
    name: "Scotch",
    value: "1,340",
    color: "#F59E0B",
  },
  {
    name: "Wine",
    value: "840",
    color: "#FACC15",
  },
];

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
      <div className="w-full flex gap-2 sm:gap-3 md:gap-4 py-2 justify-center items-center">
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleEdit}
        >
          <Edit size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </button>
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color5)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleView}
        >
          <Eye size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </button>
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleDelete}
        >
          <Trash size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </>
  );
};

export const Inventory = () => {
  const [activeFilter, setActiveFilter] = useState("");
  const [showModel, setShowModel] = useState({
    state: false,
    productData: null,
    actionType: "",
  });
  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
    path: "",
    querykey: "",
  });

  const onAddProduct = () => {
    setShowModel({
      state: true,
      productData: {
        ID: "",
        ProductName: "",
        Rank: "",
        QtyInHand: "",
        OfDaysSupply: "",
        Cost: "",
        Price: "",
        StockCode: "",
        ReorderPoint: "",
        ReorderValue: "",
      },
      actionType: "Add",
    });
  };

  const onEdit = (product) => {
    if (product) {
      setShowModel({
        state: true,
        productData: { ...product },
        actionType: "Edit",
      });
    }
  };
  const onView = (product) => {
    setShowModel({
      state: true,
      productData: product,
      actionType: "View",
    });
  };
  const onDelete = (product) => {
    setDeleteModel({
      state: true,
      productId: product.id,
      path: `api/v1/product/delete/${product.id}`,
      querykey: "get_all_products_list",
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState([
    { field: "name", headerName: "Product Name" },
    { field: "category_name", headerName: "Category Name" },
    { field: "product_rank", headerName: "Rank" },
    { field: "qty_on_hand", headerName: "Stock" },
    {
      field: "product_avg_price",
      headerName: "Avrage Cost",
      cellRenderer: (amount) => {
        return `$ ${amount.value.toFixed(2)}`;
      },
    },
    {
      field: "product_latest_cost",
      headerName: "Latest Cost",
      cellRenderer: (amount) => {
        return `$ ${amount.value.toFixed(2)}`;
      },
    },
    {
      field: "product_price",
      headerName: "Price",
      cellRenderer: (amount) => {
        return `$ ${amount.value.toFixed(2)}`;
      },
    },
    {
      field: "product_size",
      headerName: "Size",
    },
    { field: "product_sku", headerName: "Code" },
    { field: "tax_percentage", headerName: "Tax" },
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
      width: 150,
      minWidth: 120,
    },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: true,
      resizable: true,
    };
  }, []);

  const {
    data: rowData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get_all_products_list", activeFilter],
    queryFn: async () => await getAllProductList({ search_text: activeFilter }),
  });

  const { data: categoryList, isLoading: CategoryLoading } = useQuery({
    queryKey: ["get_all_category_list"],
    queryFn: async () => await getAllCategoryList(),
  });

  return (
    <>
      <Layout onAddProduct={onAddProduct}>
        {isLoading || CategoryLoading ? (
          <Loading />
        ) : (
          <>
            {isError ? (
              <>
                <div className="flex justify-center items-center h-full">
                  <p className="text-red-500">Error fetching products</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-full p-2 sm:p-4 lg:p-0">
                  {/* Page Title */}
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                      Inventory
                    </h3>
                  </div>

                  {/* Main Layout Container */}
                  <div className="flex flex-col justify-center w-full gap-3 sm:gap-4 lg:gap-0">
                    {/* Stats Section */}
                    <div className="w-full  shrink-0 order-1 xl:order-2 mb-4 xl:mb-0">
                      <div className="flex justify-between items-center mb-4 sm:mb-3">
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                          Stats
                        </h3>
                      </div>

                      <div className="flex justify-between w-full gap-3">
                        {/* Inventory Stats Chart */}
                        <div className="my-2 sm:my-4 xl:my-2 bg-white rounded-md p-2 sm:p-3">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-medium">
                              Inventory Stats
                            </h3>
                          </div>
                          <div className="p-1 sm:p-2 xl:p-3 my-2 xl:my-3">
                            <div className="mb-3 xl:mb-4 flex justify-center items-center">
                              <div className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] xl:w-full xl:h-auto">
                                <Doughtchart aspectRatio={1.5} />
                              </div>
                            </div>
                            <div>
                              <div className="flex-1 shrink-0 flex flex-col gap-1.5 sm:gap-2 md:gap-3 justify-center items-start rounded-md bg-[var(--primary-color)] py-2 sm:py-3 md:py-4 xl:py-6 px-2">
                                {saleData.map((cur, id) => (
                                  <div
                                    key={id}
                                    className="flex justify-between items-center w-full"
                                  >
                                    <div className="flex justify-start gap-2 sm:gap-3 md:gap-4 items-center">
                                      <div
                                        style={{
                                          background: cur.color,
                                        }}
                                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-[1dvw] xl:h-[1dvw] rounded-full"
                                      />
                                      <p className="font-semibold font-[var(--paraFont)] text-xs sm:text-sm md:text-base lg:text-[0.9dvw] xl:text-[1dvw] text-[var(--paraText-color)]">
                                        {cur.name}
                                      </p>
                                    </div>
                                    <h5 className="text-black font-medium text-xs sm:text-sm md:text-base lg:text-[0.9dvw] xl:text-[1dvw]">
                                      ${cur.value}
                                    </h5>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full">
                          {/* Stock Status Cards */}
                          <div className="flex  gap-2 sm:gap-3 xl:gap-4 w-full my-2 sm:my-3 xl:my-4 p-1">
                            <div className="flex justify-between items-center bg-[#E72C1B] p-2 sm:p-3 rounded-md flex-1">
                              <div className="px-1.5">
                                <p className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-[0.9dvw] xl:text-[1dvw]">
                                  Out Of Stock
                                </p>
                                <h3 className="text-white font-semibold text-base sm:text-lg md:text-xl lg:text-[1.5dvw] xl:text-[2dvw]">
                                  01
                                </h3>
                              </div>
                              <div>
                                <OutOfStockIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-12 xl:h-12" />
                              </div>
                            </div>

                            <div className="flex justify-between items-center bg-[#fff] p-2 sm:p-3 rounded-md flex-1">
                              <div className="px-1.5">
                                <p className="text-black font-semibold text-xs sm:text-sm md:text-base lg:text-[0.9dvw] xl:text-[1dvw]">
                                  Low Stock
                                </p>
                                <h3 className="text-black font-semibold text-base sm:text-lg md:text-xl lg:text-[1.5dvw] xl:text-[2dvw]">
                                  03
                                </h3>
                              </div>
                              <div>
                                <LowStockIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-12 xl:h-12" />
                              </div>
                            </div>
                          </div>

                          {/* Low Stocks List */}
                          <div className="border border-[#D4D4D4] h-[58vh] rounded-md p-2 sm:p-3 bg-white">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-[1dvw] xl:text-[1.1dvw]">
                                Low Stocks
                              </h3>
                              <button className="cursor-pointer bg-[var(--button-color2)] text-white px-2 sm:px-3 md:px-4 py-1 rounded-full text-xs sm:text-sm md:text-base lg:text-[0.9dvw] xl:text-[1dvw] font-[var(--paraFont)] font-medium">
                                See all
                              </button>
                            </div>

                            <div className="h-[85%] w-full overflow-auto min-h-0">
                              <div className="ag-theme-alpine h-full w-full min-w-[800px] xl:min-w-0">
                                <AgGridReact
                                  rowData={rowData}
                                  columnDefs={colDefs}
                                  defaultColDef={defaultColDef}
                                  pagination={true}
                                  paginationPageSize={10}
                                  paginationPageSizeSelector={[10, 20, 50, 100]}
                                  rowSelection={rowSelection}
                                  suppressMenuHide={true}
                                  domLayout="normal"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Main Data Grid Content */}
                    <div className="flex-1 order-2 xl:order-1">
                      {/* Data Grid Container */}
                      <div className="w-full flex-col flex gap-2 my-2 sm:my-3 xl:my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-1.5 sm:px-2.5 py-2 h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] xl:h-[85dvh]">
                        {/* Grid Header Controls */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 shrink-0 gap-2 sm:gap-3">
                          <div className="flex justify-between sm:justify-center items-center gap-2 sm:gap-3">
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
                            <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.6dvw] xl:h-[1.8dvw] lg:w-[1.6dvw] xl:w-[1.8dvw] bg-[var(--counterBg-color)] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                              <p className="text-xs sm:text-xs md:text-sm lg:text-[0.9dvw] xl:text-[1dvw] font-[500] text-white">
                                {rowData.length}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 justify-end items-center flex-wrap">
                            {/*<button className="flex justify-between items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm md:text-base lg:text-[0.9dvw] xl:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-semibold">
                          Sort <SortIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button className="flex justify-center items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm md:text-base lg:text-[0.9dvw] xl:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-semibold bg-[#0052CC]">
                          Filter <FilterIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>*/}
                            <button>
                              <DeleteIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                            </button>
                          </div>
                        </div>

                        {/* AG Grid */}
                        <div className="h-full w-full overflow-auto min-h-0">
                          <div className="ag-theme-alpine h-full w-full min-w-[800px] xl:min-w-0">
                            <AgGridReact
                              rowData={rowData}
                              columnDefs={colDefs}
                              defaultColDef={defaultColDef}
                              pagination={true}
                              paginationPageSize={10}
                              paginationPageSizeSelector={[10, 20, 50, 100]}
                              rowSelection={rowSelection}
                              suppressMenuHide={true}
                              domLayout="normal"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </Layout>

      {showModel.state && showModel.productData && (
        <>
          <AddProductModel
            productData={showModel.productData}
            setShowModel={setShowModel}
            actionType={showModel.actionType}
          />
        </>
      )}
      {deleteModel.state && deleteModel.productId && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          productId={deleteModel.productId}
          path={deleteModel.path}
          querykey={deleteModel.querykey}
        />
      )}
    </>
  );
};