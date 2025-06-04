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
// Core CSS
import ProductImg1 from "../../../assets/images/ProductImg1.png";
import { AgGridReact } from "ag-grid-react";
import { Doughtchart } from "../../../components/common/charts/Doughtchart";
import { CircleX, Edit, Eye, Plus, PlusCircle, Trash } from "lucide-react";

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

export const Inventory = () => {
  const [rowData, setRowData] = useState([
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      UpdateDate: "3 April 2025 7:40 PM",
      Stock: "230",
      Buy: "$1.80",
      Sell: "$2.20",
      Action: ActionBtns,
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      UpdateDate: "3 April 2025 7:40 PM",
      Stock: "230",
      Buy: "$1.80",
      Sell: "$2.20",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      UpdateDate: "3 April 2025 7:40 PM",
      Stock: "230",
      Buy: "$1.80",
      Sell: "$2.20",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      UpdateDate: "3 April 2025 7:40 PM",
      Stock: "230",
      Buy: "$1.80",
      Sell: "$2.20",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      UpdateDate: "3 April 2025 7:40 PM",
      Stock: "230",
      Buy: "$1.80",
      Sell: "$2.20",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      UpdateDate: "3 April 2025 7:40 PM",
      Stock: "230",
      Buy: "$1.80",
      Sell: "$2.20",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      UpdateDate: "3 April 2025 7:40 PM",
      Stock: "230",
      Buy: "$1.80",
      Sell: "$2.20",
      Action: "View",
    },
    {
      Products: "Lorem ipsum dolor sit consectetur.",
      Category: "Beer",
      UpdateDate: "3 April 2025 7:40 PM",
      Stock: "230",
      Buy: "$1.80",
      Sell: "$2.20",
      Action: "View",
    },
  ]);
  const [showModel, setShowModel] = useState({
    state: false,
    productData: null,
    actionType: "",
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
    console.log(product, "delete");
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "Products" },
    { field: "Category" },
    { field: "UpdateDate" },
    { field: "Stock" },
    { field: "Buy" },
    { field: "Sell" },
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
        <div className="flex justify-center w-full gap-5">
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                Inventory
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full my-6">
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

            <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[65dvh]">
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
                  onSelectionChanged={(event) => console.log("Row Selected!")}
                  onCellValueChanged={(event) =>
                    console.log(`New Cell Value: ${event.value}`)
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-[26%] shrink-0">
            <div className="flex justify-between items-center">
              <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                Stats
              </h3>
            </div>

            <div className="my-5 bg-white rounded-md p-3">
              <div className="flex justify-between items-center">
                <h3 className="text-[1dvw] font-[500]">Inventory Stats</h3>
                <button className="bg-[#333333] text-white px-3 text-[.9dvw] cursor-pointer py-1 rounded-full">
                  See all
                </button>
              </div>
              <div className="p-3 my-3">
                <div>
                  <Doughtchart aspectRatio={1.5} />
                </div>
                <div>
                  <div className="flex-1 shrink-0 flex flex-col gap-3 justify-center items-start  rounded-md bg-[var(--primary-color)] py-6 px-2 ">
                    {saleData.map((cur, id) => (
                      <div
                        key={id}
                        className="flex  justify-between items-center w-[95%]"
                      >
                        <div className="flex justify-start gap-4 items-center">
                          <div
                            style={{
                              background: cur.color,
                            }}
                            className="w-[1dvw] h-[1dvw]  rounded-full"
                          />
                          <p className="font-semibold font-[var(--paraFont)] text-[1dvw] text-[var(--paraText-color)]">
                            {cur.name}
                          </p>
                        </div>
                        <h5 className="text-black font-medium text-[1dvw]">
                          ${cur.value}
                        </h5>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full my-4 p-1">
              <div className="flex justify-between items-center bg-[#E72C1B] p-2 rounded-md">
                <div className="px-1.5">
                  <p className="text-white font-semibold text-[1dvw]">
                    Out Of Stock
                  </p>
                  <h3 className="text-white font-semibold text-[2dvw]">01</h3>
                </div>
                <div>
                  <OutOfStockIcon />
                </div>
              </div>

              <div className="flex justify-between items-center bg-[#fff] p-2 rounded-md">
                <div className="px-1.5">
                  <p className="text-black font-semibold text-[1dvw]">
                    Low Stock
                  </p>
                  <h3 className="text-black font-semibold text-[2dvw]">03</h3>
                </div>
                <div>
                  <LowStockIcon />
                </div>
              </div>
            </div>

            <div className="border border-[#D4D4D4] rounded-md p-3 bg-white">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-[1.1dvw]">Low Stocks</h3>
                <button className="cursor-pointer bg-[var(--button-color2)] text-white px-4 py-1 rounded-full text-[1dvw] font-[var(--paraFont)] font-medium">
                  See all
                </button>
              </div>

              <div className="flex flex-col gap-3 my-3">
                {[1, 2, 3].map((cur, id) => (
                  <div
                    key={id}
                    className="w-full flex justify-start items-center gap-3"
                  >
                    <div className="w-[3dvw] h-[3dvw]">
                      <img
                        className="w-full h-full object-cover"
                        src={ProductImg1}
                        alt="sellsync.com"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold font-[var(--paraFont)] text-[1dvw]">
                        Budwiser Magnum 750ML
                      </h4>
                      <p className="text-[.9dvw] font-medium text-[#333333] font-[var(--paraFont)]">
                        Out Of Stock
                      </p>
                    </div>
                  </div>
                ))}
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
          <div className="w-full flex justify-between items-center p-1">
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
                  ? "bg-white text-black"
                  : "bg-transparent text-[#333333]/70"
              } border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
            >
              Details
            </button>
            <button
              onClick={() => handleChangeTab("Options")}
              className={` ${
                currentActiveTab === "Options"
                  ? "bg-white text-black"
                  : "bg-transparent text-[#333333]/70"
              } border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
            >
              Options
            </button>
            <button
              onClick={() => handleChangeTab("Promotions")}
              className={` ${
                currentActiveTab === "Promotions"
                  ? "bg-white text-black"
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
      </div>
    </>
  );
};
const PromotionsTab = () => {
  return (
    <>
      <div>the Promotions tab</div>
    </>
  );
};
