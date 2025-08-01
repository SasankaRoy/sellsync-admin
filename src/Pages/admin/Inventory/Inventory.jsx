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
  const [rowData, setRowData] = useState([
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      QtyInHand: "-8",
      OfDaysSupply: "0",
      Cost: "$1.52",
      Price: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      ReorderPoint: "0",
      ReorderValue: "0",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      QtyInHand: "-8",
      OfDaysSupply: "0",
      Cost: "$1.52",
      Price: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      ReorderPoint: "0",
      ReorderValue: "0",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      QtyInHand: "-8",
      OfDaysSupply: "0",
      Cost: "$1.52",
      Price: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      ReorderPoint: "0",
      ReorderValue: "0",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      QtyInHand: "-8",
      OfDaysSupply: "0",
      Cost: "$1.52",
      Price: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      ReorderPoint: "0",
      ReorderValue: "0",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      QtyInHand: "-8",
      OfDaysSupply: "0",
      Cost: "$1.52",
      Price: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      ReorderPoint: "0",
      ReorderValue: "0",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      QtyInHand: "-8",
      OfDaysSupply: "0",
      Cost: "$1.52",
      Price: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      ReorderPoint: "0",
      ReorderValue: "0",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      QtyInHand: "-8",
      OfDaysSupply: "0",
      Cost: "$1.52",
      Price: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      ReorderPoint: "0",
      ReorderValue: "0",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      QtyInHand: "-8",
      OfDaysSupply: "0",
      Cost: "$1.52",
      Price: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      ReorderPoint: "0",
      ReorderValue: "0",
      Action: ActionBtns,
    },
  ]);
  const [showModel, setShowModel] = useState({
    state: false,
    productData: null,
    actionType: "",
  });
  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
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
    console.log(product, "edit");
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
    setShowModel({
      state: true,
      productData: product,
      actionType: "View",
    });
  };
  const onDelete = (product) => {
    console.log(product, "delete");
    setDeleteModel({
      state: true,
      productId: product.ID,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "ID", width: 100, minWidth: 80 },
    { field: "ProductName", minWidth: 150, flex: 1 },
    { field: "Rank", width: 100, minWidth: 80 },
    { field: "QtyInHand", width: 120, minWidth: 100 },
    { field: "OfDaysSupply", width: 120, minWidth: 100, hide: true },
    { field: "Cost", width: 120, minWidth: 100 },
    { field: "Price", width: 120, minWidth: 100 },
    { field: "StockCode", minWidth: 120, hide: true },
    { field: "ReorderPoint", width: 120, minWidth: 100, hide: true },
    { field: "ReorderValue", width: 120, minWidth: 100, hide: true },
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

  return (
    <>
      <Layout onAddProduct={onAddProduct}>
        <div className="w-full p-2 sm:p-4 lg:p-0">
          {/* Page Title */}
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Inventory
            </h3>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full mb-4 sm:mb-6">
            <Overviewcards
              cardTitle="Total Inventory"
              cardValue="12,500"
              percent="View"
              icon={<TotalInventoryIcon />}
            />
            <Overviewcards
              cardTitle="Buy Price"
              cardValue="$25,000"
              percent="View"
              icon={<BuyPriceIcon />}
            />
            <Overviewcards
              cardTitle="Sell Price"
              cardValue="$46,800"
              percent="View"
              icon={<SellPriceIcon />}
            />
          </div>

          {/* Main Layout Container */}
          <div className="flex flex-col xl:flex-row justify-center w-full gap-3 sm:gap-4 lg:gap-5">
            {/* Stats Section */}
            <div className="w-full xl:w-[26%] shrink-0 order-1 xl:order-2 mb-4 xl:mb-0">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                  Stats
                </h3>
              </div>

              {/* Inventory Stats Chart */}
              <div className="my-2 sm:my-4 xl:my-5 bg-white rounded-md p-2 sm:p-3">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-medium">
                    Inventory Stats
                  </h3>
                  <button className="bg-[#333333] text-white px-2 sm:px-3 text-xs sm:text-sm md:text-base lg:text-[.9dvw] cursor-pointer py-1 rounded-full">
                    See all
                  </button>
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

              {/* Stock Status Cards */}
              <div className="flex flex-col sm:flex-row xl:flex-col gap-2 sm:gap-3 xl:gap-4 w-full my-2 sm:my-3 xl:my-4 p-1">
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
              <div className="border border-[#D4D4D4] rounded-md p-2 sm:p-3 bg-white">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-[1dvw] xl:text-[1.1dvw]">
                    Low Stocks
                  </h3>
                  <button className="cursor-pointer bg-[var(--button-color2)] text-white px-2 sm:px-3 md:px-4 py-1 rounded-full text-xs sm:text-sm md:text-base lg:text-[0.9dvw] xl:text-[1dvw] font-[var(--paraFont)] font-medium">
                    See all
                  </button>
                </div>

                <div className="flex flex-col gap-2 sm:gap-3 my-3">
                  {[1, 2, 3].map((cur, id) => (
                    <div
                      key={id}
                      className="w-full flex justify-start items-center gap-2 sm:gap-3"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-[3dvw] xl:h-[3dvw] shrink-0">
                        <img
                          className="w-full h-full object-cover rounded"
                          src={ProductImg1}
                          alt="sellsync.com"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold font-[var(--paraFont)] text-xs sm:text-sm md:text-base lg:text-[0.9dvw] xl:text-[1dvw] truncate">
                          Budwiser Magnum 750ML
                        </h4>
                        <p className="text-xs sm:text-sm md:text-base lg:text-[0.8dvw] xl:text-[.9dvw] font-medium text-[#333333] font-[var(--paraFont)]">
                          Out Of Stock
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Data Grid Content */}
            <div className="flex-1 order-2 xl:order-1">
              {/* Data Grid Container */}
              <div className="w-full flex-col flex gap-2 my-2 sm:my-3 xl:my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-1.5 sm:px-2.5 py-2 h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] xl:h-[65dvh]">
                {/* Grid Header Controls */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 shrink-0 gap-2 sm:gap-3">
                  <div className="flex justify-between sm:justify-center items-center gap-2 sm:gap-3">
                    <select className="font-[500] mainFont px-2 sm:px-3 md:px-4 border-none outline-none text-xs sm:text-sm md:text-base lg:text-[0.9dvw] xl:text-base">
                      <option>All Products</option>
                      <option>Category 1</option>
                      <option>Category 2</option>
                      <option>Category 3</option>
                    </select>
                    <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.6dvw] xl:h-[1.8dvw] lg:w-[1.6dvw] xl:w-[1.8dvw] bg-[var(--counterBg-color)] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                      <p className="text-xs sm:text-xs md:text-sm lg:text-[0.9dvw] xl:text-[1dvw] font-[500] text-white">
                        {rowData.length}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 justify-between items-center flex-wrap">
                    <button className="flex justify-between items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm md:text-base lg:text-[0.9dvw] xl:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-semibold">
                      Sort <SortIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button className="flex justify-center items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm md:text-base lg:text-[0.9dvw] xl:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-semibold bg-[#0052CC]">
                      Filter <FilterIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button>
                      <DeleteIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </button>
                  </div>
                </div>

                {/* AG Grid */}
                <div className="h-full w-full overflow-auto min-h-0">
                  <div className="ag-theme-alpine h-full w-full">
                    <AgGridReact
                      rowData={rowData}
                      columnDefs={colDefs}
                      defaultColDef={defaultColDef}
                      pagination={true}
                      paginationPageSize={10}
                      paginationPageSizeSelector={[10, 20, 50, 100]}
                      rowSelection={rowSelection}
                      suppressMenuHide={true}
                      onSelectionChanged={(event) => console.log("Row Selected!")}
                      onCellValueChanged={(event) =>
                        console.log(`New Cell Value: ${event.value}`)
                      }
                      domLayout="normal"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      {showModel.state && showModel.productData && (
        <EditAndViewModel
          productData={showModel.productData}
          setShowModel={setShowModel}
          actionType={showModel.actionType}
        />
      )}
      {deleteModel.state && deleteModel.productId && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          productId={deleteModel.productId}
        />
      )}
    </>
  );
};

const EditAndViewModel = ({ productData, setShowModel, actionType }) => {
  const [currentActiveTab, setCurrentActiveTab] = useState("Details");
  const handleCloseModle = () => {
    setShowModel({
      state: false,
      productData: null,
      actionType: "",
    });
  };
  const handleChangeTab = (currentTab) => {
    if (actionType === "Add" && currentTab !== "Details") {
      return; // Prevent changing tabs when actionType is "Add"
    }
    setCurrentActiveTab(currentTab);
  };

  const handleRenderTab = (currentTab) => {
    switch (currentTab) {
      case "Details":
        return <DetailsTab />;
      case "Options":
        return <OptionsTab />;
      case "Promotions":
        return <PromotionsTab />;
      default:
        return <DetailsTab />;
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center p-2 sm:p-4">
        <div className="bg-white rounded-md shadow p-3 sm:p-5 w-full sm:w-[95%] md:w-[85%] lg:w-[75%] xl:w-[60%] max-h-[95%] overflow-auto">
          <div className="w-full bg-[var(--sideMenu-color)] flex justify-between items-center px-2 sm:px-3 py-1.5 text-white rounded-md">
            <h3 className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[1.8dvw]">
              {actionType} Product
            </h3>
            <button
              onClick={handleCloseModle}
              className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
            >
              <CircleX size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </button>
          </div>

          <div className="bg-[#E6E6E6] p-1.5 sm:p-2 rounded-full w-auto my-3 sm:my-5 inline-flex gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => handleChangeTab("Details")}
              className={` ${
                currentActiveTab === "Details"
                  ? "bg-[var(--sideMenu-color)] text-white"
                  : "bg-transparent text-[#333333]/70"
              } border-none outline-none px-4 sm:px-6 md:px-8 py-1 text-xs sm:text-sm md:text-base lg:text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
            >
              Details
            </button>
            {actionType !== "Add" && (
              <>
                <button
                  onClick={() => handleChangeTab("Options")}
                  className={` ${
                    currentActiveTab === "Options"
                      ? "bg-[var(--sideMenu-color)] text-white"
                      : "bg-transparent text-[#333333]/70"
                  } border-none outline-none px-4 sm:px-6 md:px-8 py-1 text-xs sm:text-sm md:text-base lg:text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
                >
                  Options
                </button>
                <button
                  onClick={() => handleChangeTab("Promotions")}
                  className={` ${
                    currentActiveTab === "Promotions"
                      ? "bg-[var(--sideMenu-color)] text-white"
                      : "bg-transparent text-[#333333]/70"
                  } border-none outline-none px-4 sm:px-6 md:px-8 py-1 text-xs sm:text-sm md:text-base lg:text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
                >
                  Promotions
                </button>
              </>
            )}
          </div>

          <div className="w-full p-1.5 sm:p-2 border border-[var(--border-color)] rounded-md">
            {handleRenderTab(currentActiveTab)}
            <div className="flex gap-2 sm:gap-4 justify-end items-center mt-4">
              <button className="px-3 sm:px-4 py-1.5 bg-[var(--button-color5)] cursor-pointer text-white font-[var(--paraFont)] rounded-md text-sm sm:text-base">
                Update
              </button>
              <button className="px-3 sm:px-4 py-1.5 bg-[var(--button-color4)] cursor-pointer text-white font-[var(--paraFont)] rounded-md text-sm sm:text-base">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DetailsTab = () => {
  const [addStockData, setAddStockData] = useState([1]);
  const [addQuantityData, setQuantityData] = useState([1]);
  return (
    <>
      <div className="w-full p-1 sm:p-2">
        {/* Stock Data Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 relative mb-4">
          <button
            onClick={() =>
              setAddStockData([...addStockData, addStockData.length + 1])
            }
            className="absolute -top-2 sm:-top-0 -right-0 sm:-right-0 p-1 flex justify-center items-center bg-[var(--button-color1)] text-white rounded-full z-10"
          >
            <Plus size={16} className="sm:w-5 sm:h-5" />
          </button>
          
          {/* Headers */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">
              Stockcode
              <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">*</span>
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">
              Qty on Hand:
              <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">*</span>
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">
              Qty on Hand:
              <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">*</span>
            </label>
          </div>
          
          {/* Dynamic Inputs */}
          {addStockData.map((cur, id) => (
            <React.Fragment key={id}>
              <div className="flex flex-col gap-2 w-full">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                  placeholder="78440005246"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                  placeholder="Items"
                  type="number"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                  placeholder="Cases"
                  type="number"
                />
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Product Name */}
        <div className="w-full my-4 flex flex-col gap-2">
          <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">
            Name
            <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">*</span>
          </label>
          <input
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
            type="text"
            placeholder="Enter Product Name..."
          />
        </div>

        {/* Quantity Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-1 sm:gap-2 my-4 relative">
          <button
            onClick={() =>
              setQuantityData([...addQuantityData, addQuantityData.length + 1])
            }
            className="absolute -top-2 sm:-top-0 -right-0 p-1 flex justify-center items-center bg-[var(--button-color1)] text-white rounded-full z-10"
          >
            <Plus size={16} className="sm:w-5 sm:h-5" />
          </button>
          
          {/* Quantity Headers */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">
              Qty<span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">*</span>
            </label>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">
              Price<span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">*</span>
            </label>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">
              Avg Cost<span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">*</span>
            </label>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Margin</label>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Markup</label>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Latest Cost</label>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Qty</label>
          </div>

          {/* Dynamic Quantity Inputs */}
          {addQuantityData.map((cur, id) => (
            <React.Fragment key={id}>
              {[...Array(7)].map((_, index) => (
                <div key={index} className="w-full flex flex-col gap-1.5">
                  <input
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-1 sm:px-2"
                    type="number"
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Size and Vendor Item No */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full my-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Size</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Vendor Item No</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="text"
            />
          </div>
        </div>

        {/* Category */}
        <div className="w-full flex flex-col gap-2 my-4">
          <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Category</label>
          <select className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3">
            <option>Select Category</option>
            <option>Category 1</option>
            <option>Category 2</option>
          </select>
        </div>

        {/* Supplier and SKU */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full my-4">
          <div className="w-full flex flex-col gap-2">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Supplier</label>
            <select className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3">
              <option>Select Supplier</option>
              <option>Supplier 1</option>
              <option>Supplier 2</option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">SKU</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="text"
            />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 w-full my-6">
          <div className="w-full flex flex-col gap-2">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Units Per Case</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="text"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Case Cost Total</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="text"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Tax</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="text"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Reorder Point</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="text"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Reorder Value</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="text"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Rank</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="text"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const OptionsTab = () => {
  return (
    <>
      <div className="w-full p-1 sm:p-2">
        {/* Checkboxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-3 sm:gap-4 mb-6">
          {[
            { id: "autoUpdate", label: "Do Not Auto Update" },
            { id: "trackInventory", label: "Do Not Track Inventory" },
            { id: "shortcutKeys", label: "Add to Shortcut Keys" },
            { id: "outItem", label: "Close Out Item" },
            { id: "manualDiscount", label: "Do Not Apply Manual Discount" },
            { id: "promotionsDiscount", label: "Exclude from Promotions Discount" },
            { id: "showWebstore", label: "Do Not Show to Webstore" },
            { id: "hideInventory", label: "Hide Inventory" },
            { id: "EBTEligible", label: "EBT Eligible" },
          ].map((item) => (
            <div key={item.id} className="flex justify-start items-center gap-2 sm:gap-3">
              <input
                id={item.id}
                type="checkbox"
                className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-[1.2dvw] lg:w-[1.2dvw]"
              />
              <label
                htmlFor={item.id}
                className="text-sm sm:text-base md:text-lg lg:text-[1.2dvw] font-semibold cursor-pointer"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full">
          <div className="w-full my-2 sm:my-4 flex flex-col gap-2">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Default Qty</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="text"
              placeholder="Enter Quantity..."
            />
          </div>
          <div className="w-full my-2 sm:my-4 flex flex-col gap-2">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Min Price</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="number"
              placeholder="Min Price..."
            />
          </div>
          <div className="w-full my-2 sm:my-4 flex flex-col gap-2">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Remind Date</label>
            <input
              className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="date"
            />
          </div>
          <div className="w-full my-2 sm:my-4 flex flex-col gap-2">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Vendor Item Name</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="text"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-2 w-full my-4">
          <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Notes</label>
          <textarea
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
            rows={4}
            placeholder="Enter Notes..."
          ></textarea>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2 w-full my-4">
          <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Tags</label>
          <input
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
            type="text"
            placeholder="Tags"
          />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-2 sm:gap-4">
          <div className="flex flex-col gap-2 w-full my-2 sm:my-4">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Points Multiplier</label>
            <select className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3">
              <option>Select Multiplier</option>
              <option>1x</option>
              <option>2x</option>
              <option>3x</option>
              <option>4x</option>
              <option>5x</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full my-2 sm:my-4">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Points Required</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
              type="text"
              placeholder="Enter points"
            />
          </div>
          <div className="flex flex-col gap-2 w-full my-2 sm:my-4">
            <label className="text-xs sm:text-sm md:text-base lg:text-[1dvw] font-normal font-[var(--paraFont)]">Item Type</label>
            <select className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-xs sm:text-sm md:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3">
              <option>Select Item Type</option>
              <option>Item Type 1</option>
              <option>Item Type 2</option>
              <option>Item Type 3</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

const PromotionsTab = () => {
  return (
    <>
      <div className="w-full p-1 sm:p-2">
        <p className="text-sm sm:text-base md:text-lg">Promotions content goes here</p>
      </div>
    </>
  );
};

const DeleteModel = ({ setDeleteModel, productId }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center p-2 sm:p-4">
        <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] p-3 sm:p-5 bg-white rounded-xl shadow-md flex flex-col gap-4">
          <div className="flex justify-between items-center w-full p-1">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.5dvw] font-semibold">Delete Item</h3>
            <button
              onClick={() => {
                setDeleteModel({
                  state: false,
                  productId: null,
                });
              }}
              className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
            >
              <CircleX size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </button>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-[1.2dvw] font-semibold font-[var(--paraFont)]">
            Product Id <span className="italic">"{productId}"</span> will be{" "}
            <span className="text-[var(--Negative-color)] font-bold">
              deleted permanently
            </span>
            , are you sure?
          </p>
          <div className="flex gap-2 sm:gap-4 justify-end items-center">
            <button className="px-3 sm:px-4 py-1.5 bg-[var(--Negative-color)] cursor-pointer text-white font-[var(--paraFont)] rounded-md text-sm sm:text-base">
              Delete
            </button>
            <button
              onClick={() => {
                setDeleteModel({
                  state: false,
                  productId: null,
                });
              }}
              className="px-3 sm:px-4 py-1.5 bg-[var(--button-color4)] cursor-pointer text-white font-[var(--paraFont)] rounded-md text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};