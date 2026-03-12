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
import { CircleX, Edit, Eye, Plus, Trash, Upload } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProductList } from "../../../utils/apis/handleProducts";
import { Loading } from "../../../components/UI/Loading/Loading";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { getAllCategoryList } from "../../../utils/apis/handleCategory";
import { AddProductModel } from "../../../components/common/AddProductModel/AddProductModel";
import { InventoryUploadModel } from "../../../components/common/InventoryUploadModel/InventoryUploadModel";

import { getLowSrockData, getOutOfStockData } from "../../../utils/apis/handleReports";
import PaginationTest from "../../../components/common/PaginationTest/PaginationTest";
import { Link } from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "none",
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
  const [currentActiveTab, setCurrentActiveTab] = useState('OUT_OF_STOCK')
  const [lowStockCurrentPage, setlowStockCurrentPage] = useState(1)
  const [lowStockPageLimit, setLowstockPageLimit] = useState(50)
  const [lowStockTotalData, setLowstockTotalData] = useState(0)
  const [lowstockTotalPages, setLowstockTotalPages] = useState(0)


  const [outOfStockCurrentPage, setOutOfStockCurrentPage] = useState(1)
  const [outOfStockPageLimit, setoutOfStockPageLimit] = useState(50)
  const [outOfStockTotalData, setOutOfStockTotalData] = useState(0)
  const [outOfStockTotalPages, setOutOfStockTotalPages] = useState(0)

  const [productListCurrentPage, setProductListCurrentPage] = useState(1);
  const [productListPageLimit, setProductListPageLimit] = useState(100)
  const [productListTotalData, setProductListTotalData] = useState(0)
  const [productListTotalPages, setProductListTotalPages] = useState(0)

  const [refetching, setRefetching] = useState(false)
  const queryClient = useQueryClient();
  const [activeFilter, setActiveFilter] = useState("");
  const [inventoryUpload, setInventoryUpload] = useState(false);
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
        return `$  ${amount.value ? amount.value.toFixed(2) : '00'}`;
      },
    },
    {
      field: "product_latest_cost",
      headerName: "Latest Cost",
      cellRenderer: (amount) => {
        return `$  ${amount.value ? amount.value.toFixed(2) : '00'}`;
      },
    },
    {
      field: "product_price",
      headerName: "Price",
      cellRenderer: (amount) => {
        return `$  ${amount.value ? amount.value.toFixed(2) : '00'}`;
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
    queryKey: ["get_all_products_lis", activeFilter],
    queryFn: async () => {
      const { page, limit, total_records, total_pages, results } = await getAllProductList({ search_text: activeFilter, page: productListCurrentPage, limit: productListPageLimit })
      if (results) {
        setProductListCurrentPage(page);
        setProductListPageLimit(limit);
        setProductListTotalData(total_records);
        setProductListTotalPages(total_pages)
        return results || []
      }
      return results || []
    },
    refetchInterval: 10000,
    // placeholderData: (prv) => prv
  });

  const handlePageChangeProductList = (newPage) => {
    // Prefetch the page after the one we're going to
    setRefetching(true)
    queryClient.prefetchQuery({
      queryKey: ["get_all_products_list", newPage + 1],
      queryFn: async () => await getAllProductList({ page: newPage + 1, limit: productListPageLimit,search_text:'' }),
    });
    setProductListCurrentPage(newPage);
    setRefetching(false)

  };


  const { data: categoryList, isLoading: CategoryLoading } = useQuery({
    queryKey: ["get_all_category_list"],
    queryFn: async () => await getAllCategoryList(),
  });

  // low-stock list....

  const { data: lowStock, isLoading: lowStockLoading, isError: lowStockError, } = useQuery({
    queryKey: ['get_low_stock'],
    queryFn: async () => {
      const { page, limit, total_records, total_pages, results } = await getLowSrockData({
        page: lowStockCurrentPage,
        limit: lowStockPageLimit
      });
      if (results) {
        setlowStockCurrentPage(page);
        setLowstockPageLimit(limit);
        setLowstockTotalData(total_records)
        setLowstockTotalPages(total_pages)
        return results || []
      }
      return results || []
    },
    refetchInterval: 3000,
    placeholderData: (prev) => prev,
  });

  const checkStatus = (status) => {
    switch (status) {
      case "active":
        return {
          forDot: "bg-blue-500",
          forText: "text-blue-500",
        };

      case "inactive":
        return {
          forDot: "bg-green-500",
          forText: "text-green-500",
        };

      case "HOLD":
        return {
          forDot: "bg-yellow-500",
          forText: "text-yellow-500",
        };

      case "CANCELLED":
        return {
          forDot: "bg-red-500",
          forText: "text-red-500",
        };


      default:
        break;
    }
  };

  const handlePageChange = (newPage) => {
    // Prefetch the page after the one we're going to
    setRefetching(true)
    queryClient.prefetchQuery({
      queryKey: ["get_low_stock", newPage + 1],
      queryFn: async () => await getLowSrockData({ page: newPage + 1, limit: lowStockPageLimit }),
    });
    setlowStockCurrentPage(newPage);
    setRefetching(false)

  };

  const [lowstockColDefs,] = useState([
    {
      field: 'product_sku',
      headerName: 'Product SKU'
    },
    {
      field: 'name',
      headerName: 'Product Name'
    },
    {
      field: "category_name",
      headerName: "Category Name",

    },
    { field: "product_size", headerName: "Product Size" },
    { field: "product_rank", headerName: "Product Rank" },
    {
      field: "product_price", headerName: "Product Price", cellRenderer: (amount) => {
        return `$ ${amount.value.toFixed(2)}`;
      },
    },
    {
      field: "product_latest_cost", headerName: "Product Cost", cellRenderer: (amount) => {
        return amount.value ? `$ ${amount.value.toFixed(2)}` : '$ 00';
      },
    },
    { field: "qty_on_hand", headerName: "In Stock" },
    { field: "tax_percentage", headerName: "Tax" },
    { field: "supplier_name", headerName: "Supplier Name" },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (status) => {
        return (
          <>
            <div className=" px-3 flex justify-center items-center w-auto gap-3">
              <div
                className={`h-[.8dvw] w-[.8dvw] rounded-full ${checkStatus(status.value).forDot}`}
              ></div>
              <p
                className={`font-medium ${checkStatus(status.value).forText} text-[1.2dvw]`}
              >
                {status.value}
              </p>
            </div>
          </>
        );
      },
    },

  ]);



  // out of stock...
  const { data: outOfStock, isLoading: outOfStockLoading, isError: outOfStockError, } = useQuery({
    queryKey: ['get_outOfStock_stock'],
    queryFn: async () => {
      const { page, limit, total_records, total_pages, results } = await getOutOfStockData({
        page: outOfStockCurrentPage,
        limit: outOfStockPageLimit
      });
      if (results) {
        setOutOfStockCurrentPage(page);
        setoutOfStockPageLimit(limit);
        setOutOfStockTotalData(total_records)
        setOutOfStockTotalPages(total_pages)
        return results || []
      }
      return results || []
    },
    refetchInterval: 3000,
    placeholderData: (prev) => prev,
  });



  const handlePageChangeOutOfStock = (newPage) => {
    // Prefetch the page after the one we're going to
    setRefetching(true)
    queryClient.prefetchQuery({
      queryKey: ["get_outOfStock_stock", newPage + 1],
      queryFn: async () => await getOutOfStockData({ page: newPage + 1, limit: outOfStockPageLimit }),
    });
    setOutOfStockCurrentPage(newPage);
    setRefetching(false)

  };

  const [outOfStockColDefs,] = useState([
    {
      field: 'product_sku',
      headerName: 'Product SKU'
    },
    {
      field: 'name',
      headerName: 'Product Name'
    },
    {
      field: "category_name",
      headerName: "Category Name",

    },
    { field: "product_size", headerName: "Product Size" },
    { field: "product_rank", headerName: "Product Rank" },
    {
      field: "product_price", headerName: "Product Price", cellRenderer: (amount) => {
        return `$ ${amount.value.toFixed(2)}`;
      },
    },
    {
      field: "product_latest_cost", headerName: "Product Cost", cellRenderer: (amount) => {
        return amount.value ? `$ ${amount.value.toFixed(2)}` : '$ 00';
      },
    },
    { field: "qty_on_hand", headerName: "In Stock" },
    { field: "tax_percentage", headerName: "Tax" },
    { field: "supplier_name", headerName: "Supplier Name" },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (status) => {
        return (
          <>
            <div className=" px-3 flex justify-center items-center w-auto gap-3">
              <div
                className={`h-[.8dvw] w-[.8dvw] rounded-full ${checkStatus(status.value).forDot}`}
              ></div>
              <p
                className={`font-medium ${checkStatus(status.value).forText} text-[1.2dvw]`}
              >
                {status.value}
              </p>
            </div>
          </>
        );
      },
    },

  ]);










  return (
    <>
      <Layout onAddProduct={onAddProduct}>
        {isLoading || CategoryLoading || lowStockLoading || outOfStockLoading || refetching ? (
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
                    <button
                      onClick={() => setInventoryUpload(true)}
                      className="addProduct__BTN bg-[#F8A61B] text-[var(--primary-color)] flex justify-center items-center gap-1 sm:gap-[5px] px-3 py-2 sm:px-[25px] sm:py-[10px] font-[var(--mainFont)] font-medium text-xs sm:text-sm lg:text-[1dvw] border-none outline-none rounded-full cursor-pointer"
                    >
                      <Upload /> Upload CSV
                    </button>
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
                            <div onClick={() => {
                              setCurrentActiveTab('OUT_OF_STOCK')
                            }} className={`flex cursor-pointer transition-all duration-300 ease-linear justify-between items-center ${currentActiveTab === 'OUT_OF_STOCK' ? "bg-[#E72C1B] text-white" : "bg-[#fff] text-black"} p-2 sm:p-3 rounded-md flex-1`}>
                              <div className="px-1.5">
                                <p className=" font-semibold text-xs sm:text-sm md:text-base lg:text-[0.9dvw] xl:text-[1dvw]">
                                  Out Of Stock
                                </p>
                                <h3 className=" font-semibold text-base sm:text-lg md:text-xl lg:text-[1.5dvw] xl:text-[2dvw]">
                                  {outOfStockTotalData}
                                </h3>
                              </div>
                              <div>
                                <OutOfStockIcon color={currentActiveTab === 'OUT_OF_STOCK' ? '#fff' : "#000"} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-12 xl:h-12" />
                              </div>
                            </div>

                            <div onClick={() => {
                              setCurrentActiveTab('LOW_STOCK')
                            }} className={`flex cursor-pointer transition-all duration-300 ease-linear justify-between items-center  p-2 sm:p-3 rounded-md flex-1 ${currentActiveTab === 'LOW_STOCK' ? "bg-[#E72C1B] text-white" : "bg-[#fff] text-black"}`}>
                              <div className="px-1.5">
                                <p className=" font-semibold text-xs sm:text-sm md:text-base lg:text-[0.9dvw] xl:text-[1dvw]">
                                  Low Stock
                                </p>
                                <h3 className=" font-semibold text-base sm:text-lg md:text-xl lg:text-[1.5dvw] xl:text-[2dvw]">
                                  {lowStockTotalData}
                                </h3>
                              </div>
                              <div>
                                <LowStockIcon color={currentActiveTab === 'LOW_STOCK' ? '#fff' : "#000"} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-12 xl:h-12" />
                              </div>
                            </div>
                          </div>

                          {/* Low Stocks List */}
                          <div className="border border-[#D4D4D4] h-[60vh] rounded-md p-2 sm:p-3 bg-white">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-[1dvw] xl:text-[1.1dvw]">
                                {currentActiveTab === 'LOW_STOCK' ? "Low Stocks" : 'Out of Stock'}
                              </h3>
                              <Link to={currentActiveTab === 'LOW_STOCK' ? '/admin/low-stock' : '/admin/out-of-stock-products'} className="cursor-pointer bg-[var(--button-color2)] text-white px-2 sm:px-3 md:px-4 py-1 rounded-full text-xs sm:text-sm md:text-base lg:text-[0.9dvw] xl:text-[1dvw] font-[var(--paraFont)] font-medium">
                                See all
                              </Link>
                            </div>

                            {
                              currentActiveTab === 'LOW_STOCK' ? (
                                <>
                                  <div className="h-[80%] w-full overflow-auto min-h-0">
                                    <div className="ag-theme-alpine h-full w-full min-w-[800px] xl:min-w-0">
                                      <AgGridReact
                                        rowData={lowStock || []}
                                        columnDefs={lowstockColDefs}
                                        defaultColDef={defaultColDef}
                                        pagination={false}
                                        suppressPaginationPanel={true}
                                        paginationPageSize={10}
                                        // onGridReady={onLowStockGridReady}
                                        rowSelection={rowSelection}
                                        suppressMenuHide={true}
                                        domLayout="normal"
                                      />
                                    </div>
                                  </div>
                                  <PaginationTest
                                    page={lowStockCurrentPage}
                                    limit={lowStockPageLimit}
                                    total_records={lowStockTotalData}
                                    total_pages={lowstockTotalPages}
                                    onPageChange={handlePageChange}
                                  />
                                </>
                              ) : (
                                <>
                                  <div className="h-[80%] w-full overflow-auto min-h-0">
                                    <div className="ag-theme-alpine h-full w-full min-w-[800px] xl:min-w-0">
                                      <AgGridReact
                                        rowData={outOfStock || []}
                                        columnDefs={outOfStockColDefs}
                                        defaultColDef={defaultColDef}
                                        pagination={false}
                                        suppressPaginationPanel={true}
                                        paginationPageSize={10}
                                        // onGridReady={onLowStockGridReady}
                                        rowSelection={rowSelection}
                                        suppressMenuHide={true}
                                        domLayout="normal"
                                      />
                                    </div>
                                  </div>
                                  <PaginationTest
                                    page={outOfStockCurrentPage}
                                    limit={outOfStockPageLimit}
                                    total_records={outOfStockTotalData}
                                    total_pages={outOfStockTotalPages}
                                    onPageChange={handlePageChangeOutOfStock}
                                  />
                                </>
                              )
                            }


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
                            <div className="flex justify-center items-center ">
                              <p className="text-xs sm:text-xs md:text-sm lg:text-[0.9dvw] xl:text-[1dvw] font-[500] text-black ">
                                {productListTotalData}
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

                        <div className="h-full w-full overflow-auto min-h-0 flex flex-col">
                          <div className="ag-theme-alpine flex-1 w-full min-w-[800px] xl:min-w-0">
                           
                            <AgGridReact
                              rowData={rowData || []}
                              columnDefs={colDefs}
                              defaultColDef={defaultColDef}
                              pagination={false}
                              suppressPaginationPanel={true}
                              paginationPageSize={10}
                              // onGridReady={onLowStockGridReady}
                              rowSelection={rowSelection}
                              suppressMenuHide={true}
                              domLayout="normal"
                            />
                          </div>
                          
                          <PaginationTest
                            page={productListCurrentPage}
                            limit={productListPageLimit}
                            total_records={productListTotalData}
                            total_pages={productListTotalPages}
                            onPageChange={handlePageChangeProductList}
                          />
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

      {inventoryUpload && (
        <InventoryUploadModel setInventoryUpload={setInventoryUpload} />
      )}

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
