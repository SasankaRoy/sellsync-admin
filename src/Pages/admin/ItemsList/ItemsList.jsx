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
import { CircleX, Edit, Eye, Plus, Trash } from "lucide-react";
ModuleRegistry.registerModules([AllCommunityModule]);
const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const ItemsList = () => {
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [rowData, setRowData] = useState([
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      Category: "Beer",
      Stock: "-8",
      OfDaysSupply: "0",
      BuyPrice: "$1.52",
      SellPrice: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      SupplierID: "#202547",
      SupplierName: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      Category: "Beer",
      Stock: "-8",
      OfDaysSupply: "0",
      BuyPrice: "$1.52",
      SellPrice: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      SupplierID: "#202547",
      SupplierName: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      Category: "Beer",
      Stock: "-8",
      OfDaysSupply: "0",
      BuyPrice: "$1.52",
      SellPrice: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      SupplierID: "#202547",
      SupplierName: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      Category: "Beer",
      Stock: "-8",
      OfDaysSupply: "0",
      BuyPrice: "$1.52",
      SellPrice: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      SupplierID: "#202547",
      SupplierName: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      Category: "Beer",
      Stock: "-8",
      OfDaysSupply: "0",
      BuyPrice: "$1.52",
      SellPrice: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      SupplierID: "#202547",
      SupplierName: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      Category: "Beer",
      Stock: "-8",
      OfDaysSupply: "0",
      BuyPrice: "$1.52",
      SellPrice: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      SupplierID: "#202547",
      SupplierName: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      Category: "Beer",
      Stock: "-8",
      OfDaysSupply: "0",
      BuyPrice: "$1.52",
      SellPrice: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      SupplierID: "#202547",
      SupplierName: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      Category: "Beer",
      Stock: "-8",
      OfDaysSupply: "0",
      BuyPrice: "$1.52",
      SellPrice: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      SupplierID: "#202547",
      SupplierName: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      Category: "Beer",
      Stock: "-8",
      OfDaysSupply: "0",
      BuyPrice: "$1.52",
      SellPrice: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      SupplierID: "#202547",
      SupplierName: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      Category: "Beer",
      Stock: "-8",
      OfDaysSupply: "0",
      BuyPrice: "$1.52",
      SellPrice: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      SupplierID: "#202547",
      SupplierName: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      Category: "Beer",
      Stock: "-8",
      OfDaysSupply: "0",
      BuyPrice: "$1.52",
      SellPrice: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      SupplierID: "#202547",
      SupplierName: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      Category: "Beer",
      Stock: "-8",
      OfDaysSupply: "0",
      BuyPrice: "$1.52",
      SellPrice: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      SupplierID: "#202547",
      SupplierName: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      Category: "Beer",
      Stock: "-8",
      OfDaysSupply: "0",
      BuyPrice: "$1.52",
      SellPrice: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      SupplierID: "#202547",
      SupplierName: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      Category: "Beer",
      Stock: "-8",
      OfDaysSupply: "0",
      BuyPrice: "$1.52",
      SellPrice: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      SupplierID: "#202547",
      SupplierName: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1279",
      ProductName: "AW ROOR BEER 2LITER BTL",
      Rank: "C",
      Category: "Beer",
      Stock: "-8",
      OfDaysSupply: "0",
      BuyPrice: "$1.52",
      SellPrice: "$3.99",
      StockCode: "YELLOWSMALLPIPE",
      SupplierID: "#202547",
      SupplierName: "Rahul Doe",
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
  };
  const onDelete = (product) => {
    console.log(product, "delete 201");
    setDeleteModel({
      state: true,
      productId: product.ID,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "ID" },
    { field: "ProductName" },
    { field: "Rank" },
    { field: "Category" },
    { field: "Stock" },
    { field: "BuyPrice" },
    { field: "SellPrice" },
    { field: "StockCode" },
    { field: "SupplierID" },
    { field: "SupplierName" },
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
    },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: true,
    };
  }, []);
  return (
    <>
      <Layout>
        <div className="flex justify-between items-center">
          <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
            Item Lists
          </h3>
          <div className="flex justify-center items-center gap-5">
            <button className="px-5 py-1.5 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-4 text-white mainFont font-[500] cursor-pointer text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
              Add Items <PluseIcon />
            </button>
            <button className="px-5 py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-4 text-white mainFont font-[500] cursor-pointer text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
              import CVS <PluseIcon />
            </button>
          </div>
        </div>
        <div className="w-full h-[75vh] ">
          <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-full">
            <div className="flex justify-between items-center py-1.5 shrink-0">
              <div className="flex justify-center items-center gap-3">
                <select className="font-[500] mainFont px-4 border-none outline-none">
                  <option>All Products</option>
                  <option>All Products</option>
                  <option>All Products</option>
                </select>
                <p className="px-3 text-[1dvw] py-.5 bg-[#F8A61B] rounded-2xl font-[500] border-none text-white">
                  242
                </p>
              </div>
              <div className="flex gap-4 justify-center items-center">
                <button
                  onClick={() => {
                    setShowModel({
                      state: true,
                      productData: "product",
                      actionType: "Edit",
                    });
                  }}
                  className="flex justify-center items-center gap-2 px-4 py-1 text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]"
                >
                  <Edit size={16} /> Edit
                </button>
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
                onSelectionChanged={(event) => {
                  event.selectedNodes.forEach((item, id) => {
                    console.log("Row Selected!", event);
                    setSelectedRowData([item.data]);
                  });
                }}
                onCellValueChanged={(event) =>
                  console.log(`New Cell Value: ${event.value}`)
                }
              />
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
      <div className="w-full flex gap-4 py-2 justify-center items-center">
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleEdit}
        >
          <Edit size={18} />
        </button>
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color5)] text-white p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleView}
        >
          <Eye size={18} />
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
    setCurrentActiveTab(currentTab);
  };

  const handleRenderTab = (currentTab) => {
    switch (currentTab) {
      case "Dtails":
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
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
        <div className="bg-white rounded-md shadow p-5 w-[60%] max-h-[95%] overflow-auto">
          <div className="w-full bg-[var(--sideMenu-color)] flex justify-between items-center px-3 py-1.5 text-white rounded-md">
            <h3 className="font-semibold text-[1.8dvw]">
              {actionType} Product
            </h3>
            <button
              onClick={handleCloseModle}
              className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
            >
              <CircleX size={30} />
            </button>
          </div>

          <div className="bg-[#E6E6E6] p-2 rounded-full w-auto  my-5 inline-flex gap-3">
            <button
              onClick={() => handleChangeTab("Details")}
              className={` ${
                currentActiveTab === "Details"
                  ? "bg-[var(--sideMenu-color)] text-white"
                  : "bg-transparent text-[#333333]/70"
              } border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
            >
              Details
            </button>
            <button
              onClick={() => handleChangeTab("Options")}
              className={` ${
                currentActiveTab === "Options"
                  ? "bg-[var(--sideMenu-color)] text-white"
                  : "bg-transparent text-[#333333]/70"
              } border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
            >
              Options
            </button>
            <button
              onClick={() => handleChangeTab("Promotions")}
              className={` ${
                currentActiveTab === "Promotions"
                  ? "bg-[var(--sideMenu-color)] text-white"
                  : "bg-transparent text-[#333333]/70"
              } border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
            >
              Promotions
            </button>
          </div>

          <div className="w-full p-2 border border-[var(--border-color)] rounded-md">
            {handleRenderTab(currentActiveTab)}
            <div className="flex gap-4 justify-end items-center">
              <button className="px-4 py-1.5 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md">
                Update
              </button>
              <button className="px-4 py-1.5 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md">
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
      <div className="w-full p-2">
        <div className="grid grid-cols-3 gap-3 relative">
          <button
            onClick={() =>
              setAddStockData([...addStockData, addStockData.length + 1])
            }
            className="absolute -top-[0%] cursor-pointer -right-[0%] p-1 flex justify-center items-center bg-[var(--button-color1)] text-white rounded-full"
          >
            <Plus size={20} />
          </button>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[1dvw] font-normal paraFont">
              Stockcode
              <span className="text-[var(--Negative-color)] text-[.9dvw]">
                *
              </span>
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[1dvw] font-normal paraFont">
              Qty on Hand:
              <span className="text-[var(--Negative-color)] text-[.9dvw]">
                *
              </span>
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[1dvw] font-normal paraFont">
              Qty on Hand:
              <span className="text-[var(--Negative-color)] text-[.9dvw]">
                *
              </span>
            </label>
          </div>
          {addStockData.map((cur, id) => (
            <>
              <div className="flex flex-col gap-2 w-full">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="78440005246"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="Items"
                  type="number"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="Cases"
                  type="number"
                />
              </div>
            </>
          ))}
        </div>

        <div className="w-full my-4 flex flex-col gap-2">
          <label className="text-[1dvw] font-normal paraFont">
            Name
            <span className="text-[.9dvw] text-[var(--Negative-color)]">*</span>
          </label>
          <input
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="text"
            placeholder="Enter Product Name..."
          />
        </div>

        <div className="grid grid-cols-7 gap-2 my-4 relative">
          <button
            onClick={() =>
              setQuantityData([...addQuantityData, addQuantityData.length + 1])
            }
            className="absolute -top-[2%] cursor-pointer -right-[0%] p-1 flex justify-center items-center bg-[var(--button-color1)] text-white rounded-full"
          >
            <Plus size={20} />
          </button>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-[1dvw] font-normal paraFont">
              Qty
              <span className="text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-[1dvw] font-normal paraFont">
              Price
              <span className="text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-[1dvw] font-normal paraFont">
              Avg Cost
              <span className="text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
          </div>

          <div className="w-full flex flex-col gap-1.5">
            <label className="text-[1dvw] font-normal paraFont">Margin</label>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-[1dvw] font-normal paraFont">Markup</label>
          </div>

          <div className="w-full flex flex-col gap-1.5">
            <label className="text-[1dvw] font-normal paraFont">
              Latest Cost
            </label>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-[1dvw] font-normal paraFont">Qty</label>
          </div>

          {addQuantityData.map((cur, id) => (
            <>
              <div className="w-full flex flex-col gap-1.5">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                />
              </div>
              <div className="w-full flex flex-col gap-1.5">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                />
              </div>
              <div className="w-full flex flex-col gap-1.5">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                />
              </div>

              <div className="w-full flex flex-col gap-1.5">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                />
              </div>
              <div className="w-full flex flex-col gap-1.5">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                />
              </div>

              <div className="w-full flex flex-col gap-1.5">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                />
              </div>
              <div className="w-full flex flex-col gap-1.5">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                />
              </div>
            </>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">Size</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">
              Vendor Item No
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 my-4">
          <label className="text-[1dvw] font-normal paraFont">Category</label>
          <select className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3">
            <option>Select Category</option>
            <option>Select Category</option>
            <option>Select Category</option>
            <option>Select Category</option>
            <option>Select Category</option>
            <option>Select Category</option>
            <option>Select Category</option>
            <option>Select Category</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full my-4">
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">Supplier</label>
            <select className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3">
              <option>Select Supplier</option>
              <option>Select Supplier</option>
              <option>Select Supplier</option>
              <option>Select Supplier</option>
              <option>Select Supplier</option>
              <option>Select Supplier</option>
              <option>Select Supplier</option>
              <option>Select Supplier</option>
              <option>Select Supplier</option>
              <option>Select Supplier</option>
              <option>Select Supplier</option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">SKU</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full my-6">
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">
              Units Per Case
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">
              Case Cost Total
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">Tax</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">
              Reorder Point
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">
              Reorder Value
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">Rank</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
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
      <div className="w-full p-2">
        <div className="grid grid-cols-2 w-full gap-2">
          <div className="flex justify-start items-center gap-3">
            <input
              id="autoUpdate"
              type="checkbox"
              className="h-[1.2dvw] w-[1.2dvw]"
            />
            <label
              htmlFor="autoUpdate"
              className="text-[1.2dvw] font-semibold cursor-pointer"
            >
              Do Not Auto Update
            </label>
          </div>
          <div className="flex justify-start items-center gap-3">
            <input
              id="trackInventory"
              type="checkbox"
              className="h-[1.2dvw] w-[1.2dvw]"
            />
            <label
              htmlFor="trackInventory"
              className="text-[1.2dvw] font-semibold cursor-pointer"
            >
              Do Not Track Inventory
            </label>
          </div>
          <div className="flex justify-start items-center gap-3">
            <input
              id="shortcutKeys"
              type="checkbox"
              className="h-[1.2dvw] w-[1.2dvw]"
            />
            <label
              htmlFor="shortcutKeys"
              className="text-[1.2dvw] font-semibold cursor-pointer"
            >
              Add to Shortcut Keys
            </label>
          </div>
          <div className="flex justify-start items-center gap-3">
            <input
              id="outItem"
              type="checkbox"
              className="h-[1.2dvw] w-[1.2dvw]"
            />
            <label
              htmlFor="outItem"
              className="text-[1.2dvw] font-semibold cursor-pointer"
            >
              Close Out Item
            </label>
          </div>
          <div className="flex justify-start items-center gap-3">
            <input
              id="manualDiscount"
              type="checkbox"
              className="h-[1.2dvw] w-[1.2dvw]"
            />
            <label
              htmlFor="manualDiscount"
              className="text-[1.2dvw] font-semibold cursor-pointer"
            >
              Do Not Apply Manual Discount
            </label>
          </div>
          <div className="flex justify-start items-center gap-3">
            <input
              id="promotionsDiscount"
              type="checkbox"
              className="h-[1.2dvw] w-[1.2dvw]"
            />
            <label
              htmlFor="promotionsDiscount"
              className="text-[1.2dvw] font-semibold cursor-pointer"
            >
              Exclude from Promotions Discount
            </label>
          </div>
          <div className="flex justify-start items-center gap-3">
            <input
              id="showWebstore"
              type="checkbox"
              className="h-[1.2dvw] w-[1.2dvw]"
            />
            <label
              htmlFor="showWebstore"
              className="text-[1.2dvw] font-semibold cursor-pointer"
            >
              Do Not Show to Webstore
            </label>
          </div>
          <div className="flex justify-start items-center gap-3">
            <input
              id="hideInventory"
              type="checkbox"
              className="h-[1.2dvw] w-[1.2dvw]"
            />
            <label
              htmlFor="hideInventory"
              className="text-[1.2dvw] font-semibold cursor-pointer"
            >
              Hide Inventory
            </label>
          </div>
          <div className="flex justify-start items-center gap-3">
            <input
              id="EBTEligible"
              type="checkbox"
              className="h-[1.2dvw] w-[1.2dvw]"
            />
            <label
              htmlFor="EBTEligible"
              className="text-[1.2dvw] font-semibold cursor-pointer"
            >
              EBT Eligible
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="w-full my-4 flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">
              Default Qty
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              placeholder="Enter Quantity..."
            />
          </div>
          <div className="w-full my-4 flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">
              Min Price
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="number"
              placeholder="Min Price..."
            />
          </div>

          <div className="w-full my-4 flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">
              Remind Date
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="date"
            />
          </div>
          <div className="w-full my-4 flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">
              Vendor Item Name
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="type"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full my-4">
          <label className="text-[1dvw] font-normal paraFont">Notes</label>
          <textarea
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            rows={5}
            placeholder="Enter Notes..."
          ></textarea>
        </div>

        <div className="flex flex-col gap-2 w-full my-4">
          <label className="text-[1dvw] font-normal paraFont">Tags</label>
          <input
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="type"
            placeholder="Tags"
          />
        </div>

        <div className="grid grid-cols-2 w-full gap-4">
          <div className="flex flex-col gap-2 w-full my-4">
            <label className="text-[1dvw] font-normal paraFont">
              Points Multiplier
            </label>
            <select
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="type"
              placeholder="Tags"
            >
              <option>Select Multiplier</option>
              <option>1x</option>
              <option>2x</option>
              <option>3x</option>
              <option>4x</option>
              <option>5x</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full my-4">
            <label className="text-[1dvw] font-normal paraFont">
              Points Required
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="type"
              placeholder="Enter points"
            />
          </div>
          <div className="flex flex-col gap-2 w-full my-4">
            <label className="text-[1dvw] font-normal paraFont">
              Item Type
            </label>
            <select
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="type"
              placeholder="Tags"
            >
              <option>Select Item Type</option>
              <option>Inventory Item</option>
              <option>Free Item</option>
              <option>Negative Item</option>
              <option>Lotto Sale</option>
              <option>Lotto Payout</option>
              <option>Deposit Return</option>
              <option>Gift Item</option>
              <option>Online Lottery</option>
              <option>Online Payout</option>
              <option>Mannual Item</option>
              <option>House Pay</option>
              <option>Coupon ($)</option>
              <option>Coupon (%)</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
const PromotionsTab = () => {
  const [rowData, setRowData] = useState([
    {
      ID: "1",
      Name: "Beer",
      Status: "Enable",
    },
    {
      ID: "2",
      Name: "Beer",
      Status: "Enable",
    },
    {
      ID: "3",
      Name: "Beer",
      Status: "Enable",
    },
  ]);
  const [colDefs, setColDefs] = useState([
    { field: "ID" },
    { field: "Name" },
    { field: "Status" },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: true,
    };
  }, []);
  return (
    <>
      <div className="w-full p-2">
        <div className="flex flex-col gap-2 w-full my-4">
          <label className="text-[1dvw] font-normal paraFont" F>
            Search Items
          </label>
          <input
            placeholder="Enter items ..."
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="text"
          />
        </div>
        <div className="h-[40vh] w-full">
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
    </>
  );
};

const DeleteModel = ({ setDeleteModel, productId }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
        <div className="w-[50%] p-5 bg-white rounded-xl shadow-md flex flex-col gap-4">
          <div className="flex justify-between items-center w-full p-1">
            <h3 className="text-[1.5dvw] font-semibold">Delete Item</h3>
            <button
              onClick={() => {
                setDeleteModel({
                  state: false,
                  productId: null,
                });
              }}
              className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
            >
              <CircleX size={30} />
            </button>
          </div>
          <p className="text-[1.2dvw] font-semibold font-[var(--paraFont)]">
            Product Id <span className="italic">"{productId}"</span> will be{" "}
            <span className="text-[var(--Negative-color)] font-bold font-[var(--paraFont)] text-[1.3dvw]">
              Removed
            </span>{" "}
            from the Inventory.
          </p>
          <div className="flex justify-end items-center gap-4">
            <button
              onClick={() => {
                setDeleteModel({
                  showDeleteModel: false,
                  productId: null,
                });
              }}
              className="bg-[var(--button-color4)] text-white px-5 py-1.5 rounded-md flex justify-center items-center font-semibold text-[1.1dvw] cursor-pointer"
            >
              Cancel
            </button>
            <button className="bg-[var(--Negative-color)] text-white px-5 py-1.5 rounded-md flex justify-center items-center font-semibold text-[1.1dvw] cursor-pointer">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
