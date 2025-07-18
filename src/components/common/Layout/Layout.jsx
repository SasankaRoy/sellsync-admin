import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Layout.scss";
import SellsyncLogo from "../../../assets/images/SellsyncLogo.png";
import {
  DashboardIcon,
  HelpIcon,
  InventoryIcon,
  LogooutIcon,
  NotificationIcon,
  PayrollIcon,
  PluseIcon,
  POSIcon,
  ReportsIcon,
  RewardIcon,
  SalesIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "../../../assets/Svgs/AllSvgs";
import { Avatar } from "@mui/material";
import { Amphora, BadgeDollarSign, ChevronDown, CircleX, Network, Plus } from "lucide-react";

export const Layout = ({ children }) => {
  const [subMenuStateInventory, setSubMenuStateInventory] = useState(false);
  const [subMenuStateUser, setSubMenuStateUser] = useState(false);
  const [subMenuStatePos, setSunMenuStatePos] = useState(false);
  const [subMenuStateLottery, setSubMenuStateLottery] = useState(false);
  const [subMenuStateLoyalty, setSubMenuStateLoyalty] = useState(false);
  const [showProductModel, setShowProductModel] = useState(false);
  const navigate = useNavigate();

  // Handle navigation programmatically if needed
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleAddProduct = () => {
    console.log("Add Product clicked from Layout");
    setShowProductModel(true);
  };

  // Error boundary component to catch rendering issues
  const ErrorBoundary = ({ children }) => {
    try {
      return children;
    } catch (error) {
      console.error("Error in component:", error);
      return <div>Something went wrong. Please try again.</div>;
    }
  };

  const DetailsTab = ({ stockFields, setStockFields, quantityFields, setQuantityFields, productDetails, setProductDetails }) => {
    const handleAddStockField = () => {
      setStockFields([...stockFields, { id: stockFields.length + 1, stockCode: "", qtyItems: "", qtyCases: "" }]);
    };

    const handleAddQuantityField = () => {
      setQuantityFields([...quantityFields, { id: quantityFields.length + 1, qty: "", price: "", avgCost: "", margin: "", markup: "", latestCost: "", qty2: "" }]);
    };

    const handleStockFieldChange = (index, field, value) => {
      const updatedFields = stockFields.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      setStockFields(updatedFields);
    };

    const handleQuantityFieldChange = (index, field, value) => {
      const updatedFields = quantityFields.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      setQuantityFields(updatedFields);
    };

    const handleProductDetailChange = (field, value) => {
      setProductDetails(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div className="w-full p-2">
        <div className="grid grid-cols-3 gap-3 relative">
          <button
            onClick={handleAddStockField}
            className="absolute -top-[0%] cursor-pointer -right-[0%] p-1 flex justify-center items-center bg-[var(--button-color1)] text-white rounded-full"
          >
            <Plus size={20} />
          </button>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[1dvw] font-normal paraFont">
              Stockcode
              <span className="text-[.9dvw] text-[var(--Negative-color)]">*</span>
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[1dvw] font-normal paraFont">
              Qty on Hand:
              <span className="text-[.9dvw] text-[var(--Negative-color)]">*</span>
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[1dvw] font-normal paraFont">
              Qty on Hand:
              <span className="text-[.9dvw] text-[var(--Negative-color)]">*</span>
            </label>
          </div>
          {stockFields.map((field, index) => (
            <React.Fragment key={field.id}>
              <div className="flex flex-col gap-2 w-full">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="78440005246"
                  type="text"
                  value={field.stockCode}
                  onChange={(e) => handleStockFieldChange(index, 'stockCode', e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="Items"
                  type="number"
                  value={field.qtyItems}
                  onChange={(e) => handleStockFieldChange(index, 'qtyItems', e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="Cases"
                  type="number"
                  value={field.qtyCases}
                  onChange={(e) => handleStockFieldChange(index, 'qtyCases', e.target.value)}
                />
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="w-full my-4 flex flex-col gap-2">
          <label className="text-[1dvw] font-normal paraFont">
            Name
            <span className="text-[.9dvw] text-[var(--Negative-color)]">*</span>
          </label>
          <input
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="text"
            placeholder="Enter Product Name..."
            value={productDetails.name}
            onChange={(e) => handleProductDetailChange('name', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-7 gap-2 my-4 relative">
          <button
            onClick={handleAddQuantityField}
            className="absolute -top-[2%] cursor-pointer -right-[0%] p-1 flex justify-center items-center bg-[var(--button-color1)] text-white rounded-full"
          >
            <Plus size={20} />
          </button>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-[1dvw] font-normal paraFont">
              Qty
              <span className="text-[.9dvw] text-[var(--Negative-color)]">*</span>
            </label>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-[1dvw] font-normal paraFont">
              Price
              <span className="text-[.9dvw] text-[var(--Negative-color)]">*</span>
            </label>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-[1dvw] font-normal paraFont">
              Avg Cost
              <span className="text-[.9dvw] text-[var(--Negative-color)]">*</span>
            </label>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-[1dvw] font-normal paraFont">Margin</label>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-[1dvw] font-normal paraFont">Markup</label>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-[1dvw] font-normal paraFont">Latest Cost</label>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-[1dvw] font-normal paraFont">Qty</label>
          </div>
          {quantityFields.map((field, index) => (
            <React.Fragment key={field.id}>
              <div className="w-full flex flex-col gap-1.5">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  value={field.qty}
                  onChange={(e) => handleQuantityFieldChange(index, 'qty', e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col gap-1.5">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  value={field.price}
                  onChange={(e) => handleQuantityFieldChange(index, 'price', e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col gap-1.5">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  value={field.avgCost}
                  onChange={(e) => handleQuantityFieldChange(index, 'avgCost', e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col gap-1.5">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  value={field.margin}
                  onChange={(e) => handleQuantityFieldChange(index, 'margin', e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col gap-1.5">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  value={field.markup}
                  onChange={(e) => handleQuantityFieldChange(index, 'markup', e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col gap-1.5">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  value={field.latestCost}
                  onChange={(e) => handleQuantityFieldChange(index, 'latestCost', e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col gap-1.5">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  value={field.qty2}
                  onChange={(e) => handleQuantityFieldChange(index, 'qty2', e.target.value)}
                />
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">Size</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.size}
              onChange={(e) => handleProductDetailChange('size', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">
              Vendor Item No
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.vendorItemNo}
              onChange={(e) => handleProductDetailChange('vendorItemNo', e.target.value)}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 my-4">
          <label className="text-[1dvw] font-normal paraFont">Category</label>
          <select
            className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            value={productDetails.category}
            onChange={(e) => handleProductDetailChange('category', e.target.value)}
          >
            <option>Select Category</option>
            <option>Beer</option>
            <option>Wine</option>
            <option>Spirits</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full my-4">
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">Supplier</label>
            <select
              className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              value={productDetails.supplier}
              onChange={(e) => handleProductDetailChange('supplier', e.target.value)}
            >
              <option>Select Supplier</option>
              <option>Rahul Doe</option>
              <option>John Smith</option>
              <option>Mike Johnson</option>
              <option>Sarah Wilson</option>
              <option>David Brown</option>
              <option>Lisa Davis</option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">SKU</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.sku}
              onChange={(e) => handleProductDetailChange('sku', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full my-6">
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">
              Units Per Case
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.unitsPerCase}
              onChange={(e) => handleProductDetailChange('unitsPerCase', e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">
              Case Cost Total
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.caseCostTotal}
              onChange={(e) => handleProductDetailChange('caseCostTotal', e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">Tax</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.tax}
              onChange={(e) => handleProductDetailChange('tax', e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">
              Reorder Point
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.reorderPoint}
              onChange={(e) => handleProductDetailChange('reorderPoint', e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">
              Reorder Value
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.reorderValue}
              onChange={(e) => handleProductDetailChange('reorderValue', e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1dvw] font-normal paraFont">Rank</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.rank}
              onChange={(e) => handleProductDetailChange('rank', e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  const AddProductModel = () => {
    const [stockFields, setStockFields] = useState([{ id: 1, stockCode: "", qtyItems: "", qtyCases: "" }]);
    const [quantityFields, setQuantityFields] = useState([{ id: 1, qty: "", price: "", avgCost: "", margin: "", markup: "", latestCost: "", qty2: "" }]);
    const [productDetails, setProductDetails] = useState({
      name: "",
      size: "",
      vendorItemNo: "",
      category: "",
      supplier: "",
      sku: "",
      unitsPerCase: "",
      caseCostTotal: "",
      tax: "",
      reorderPoint: "",
      reorderValue: "",
      rank: ""
    });

    const handleCloseModel = () => {
      setShowProductModel(false);
      // Reset state to avoid stale data
      setStockFields([{ id: 1, stockCode: "", qtyItems: "", qtyCases: "" }]);
      setQuantityFields([{ id: 1, qty: "", price: "", avgCost: "", margin: "", markup: "", latestCost: "", qty2: "" }]);
      setProductDetails({
        name: "",
        size: "",
        vendorItemNo: "",
        category: "",
        supplier: "",
        sku: "",
        unitsPerCase: "",
        caseCostTotal: "",
        tax: "",
        reorderPoint: "",
        reorderValue: "",
        rank: ""
      });
    };

    const handleSubmit = () => {
      console.log("Product Data:", { stockFields, quantityFields, productDetails });
      handleCloseModel();
      // Optionally navigate to refresh the page
      navigate(window.location.pathname);
    };

    return (
      <ErrorBoundary>
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
          <div className="bg-white w-[70%] max-h-[90vh] overflow-y-auto p-5 rounded-lg shadow-md">
            <div className="flex justify-between items-center w-full p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
              <h3 className="text-[1.5dvw] font-semibold">Add Product</h3>
              <button
                onClick={handleCloseModel}
                className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
              >
                <CircleX size={30} />
              </button>
            </div>

            <DetailsTab
              stockFields={stockFields}
              setStockFields={setStockFields}
              quantityFields={quantityFields}
              setQuantityFields={setQuantityFields}
              productDetails={productDetails}
              setProductDetails={setProductDetails}
            />

            <div className="flex justify-end items-center gap-5 my-4">
              <button
                className="px-5 py-1 rounded-md cursor-pointer text-white font-semibold bg-[var(--button-color4)] text-[1.2dvw] hover:opacity-80 transition-all duration-300"
                onClick={handleCloseModel}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-1 rounded-md cursor-pointer text-white font-semibold bg-[var(--button-color5)] text-[1.2dvw] hover:opacity-80 transition-all duration-300"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  };

  return (
    <div className="layout__OuterMainWrapper">
      <div className="layout__sideMenuMainWrapper shrink-0">
        <div className="sideMenu__logoWrapper">
          <img alt="sellsync.com" src={SellsyncLogo} />
        </div>
        <div className="sideMenu__wrapper w-full">
          <ul className="w-[80%] py-5 mx-auto">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink"
                  : "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              }
              onClick={() => handleNavigation("/")}
            >
              <DashboardIcon />
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/sale"
              className={({ isActive }) =>
                isActive
                  ? "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink"
                  : "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              }
              onClick={() => handleNavigation("/admin/sale")}
            >
              <SalesIcon />
              Sales
            </NavLink>
            <div className="w-full flex flex-col gap-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSubMenuStateInventory(!subMenuStateInventory);
                }}
                className="flex py-2 px-5 rounded-full cursor-pointer font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              >
                <InventoryIcon />
                Inventory
                <ChevronDown
                  className={`ml-auto ${subMenuStateInventory ? "rotate-180" : "rotate-0"} transition-all duration-300 ease-linear`}
                />
              </div>
              <div
                className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${
                  subMenuStateInventory ? "h-[40vh] opacity-100 p-2" : "h-[0vh] opacity-0 p-0"
                } transition-all duration-300 ease-linear overflow-hidden`}
              >
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/inventory/overview");
                  }}
                  to="/admin/inventory/overview"
                  className={({ isActive }) => {
                    isActive && setSubMenuStateInventory(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                >
                  Inventory
                </NavLink>
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/inventory/item-lists");
                  }}
                  to="/admin/inventory/item-lists"
                  className={({ isActive }) => {
                    isActive && setSubMenuStateInventory(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                >
                  Items List
                </NavLink>
                <NavLink
                  to="/admin/inventory/category"
                  className={({ isActive }) => {
                    isActive && setSubMenuStateInventory(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                  onClick={() => handleNavigation("/admin/inventory/category")}
                >
                  Category
                </NavLink>
                <NavLink
                  to="/admin/inventory/suppliers"
                  className={({ isActive }) => {
                    isActive && setSubMenuStateInventory(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                  onClick={() => handleNavigation("/admin/inventory/suppliers")}
                >
                  Suppliers
                </NavLink>
                <NavLink
                  to="/admin/inventory/receive"
                  className={({ isActive }) => {
                    isActive && setSubMenuStateInventory(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                  onClick={() => handleNavigation("/admin/inventory/receive")}
                >
                  Receive
                </NavLink>
                <NavLink
                  to="/admin/inventory/order"
                  className={({ isActive }) => {
                    isActive && setSubMenuStateInventory(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                  onClick={() => handleNavigation("/admin/inventory/order")}
                >
                  Orders
                </NavLink>
              </div>
            </div>
            <NavLink
              to="/admin/reports"
              className={({ isActive }) =>
                isActive
                  ? "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink"
                  : "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              }
              onClick={() => handleNavigation("/admin/reports")}
            >
              <ReportsIcon />
              Reports
            </NavLink>
            <div className="w-full flex flex-col gap-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSubMenuStateUser(!subMenuStateUser);
                }}
                className="flex py-2 px-5 rounded-full cursor-pointer font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              >
                <UsersIcon />
                Users
                <ChevronDown
                  className={`ml-auto ${subMenuStateUser ? "rotate-180" : "rotate-0"} transition-all duration-300 ease-linear`}
                />
              </div>
              <div
                className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${
                  subMenuStateUser ? "h-[15vh] opacity-100 p-2" : "h-[0vh] opacity-0 p-0"
                } transition-all duration-300 ease-linear overflow-hidden`}
              >
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/customers");
                  }}
                  to="/admin/customers"
                  className={({ isActive }) => {
                    isActive && setSubMenuStateUser(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                >
                  Customers
                </NavLink>
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/employees");
                  }}
                  to="/admin/employees"
                  className={({ isActive }) => {
                    isActive && setSubMenuStateUser(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                >
                  Employees
                </NavLink>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSunMenuStatePos(!subMenuStatePos);
                }}
                className="flex py-2 px-5 rounded-full cursor-pointer font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              >
                <POSIcon />
                POS
                <ChevronDown
                  className={`ml-auto ${subMenuStatePos ? "rotate-180" : "rotate-0"} transition-all duration-300 ease-linear`}
                />
              </div>
              <div
                className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${
                  subMenuStatePos ? "h-[55vh] opacity-100 p-2" : "h-[0vh] opacity-0 p-0"
                } transition-all duration-300 ease-linear overflow-hidden`}
              >
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/pos/journals");
                  }}
                  to="/admin/pos/journals"
                  className={({ isActive }) => {
                    isActive && setSunMenuStatePos(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1";
                  }}
                >
                  Journal
                </NavLink>
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/pos/deals");
                  }}
                  to="/admin/pos/deals"
                  className={({ isActive }) => {
                    isActive && setSunMenuStatePos(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1";
                  }}
                >
                  Deals
                </NavLink>
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/pos/receipt-settings");
                  }}
                  to="/admin/pos/receipt-settings"
                  className={({ isActive }) => {
                    isActive && setSunMenuStatePos(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1";
                  }}
                >
                  Receipt Settings
                </NavLink>
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/pos/customer-display-setting");
                  }}
                  to="/admin/pos/customer-display-setting"
                  className={({ isActive }) => {
                    isActive && setSunMenuStatePos(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1";
                  }}
                >
                  Customer Display
                </NavLink>
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/pos/edi-file");
                  }}
                  to="/admin/pos/edi-file"
                  className={({ isActive }) => {
                    isActive && setSunMenuStatePos(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1";
                  }}
                >
                  EDI File
                </NavLink>
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/pos/pos-categorries");
                  }}
                  to="/admin/pos/pos-categorries"
                  className={({ isActive }) => {
                    isActive && setSunMenuStatePos(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1";
                  }}
                >
                  POS Categorries
                </NavLink>
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/pos/vendors");
                  }}
                  to="/admin/pos/vendors"
                  className={({ isActive }) => {
                    isActive && setSunMenuStatePos(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1";
                  }}
                >
                  Vendors
                </NavLink>
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/pos/fuels");
                  }}
                  to="/admin/pos/fuels"
                  className={({ isActive }) => {
                    isActive && setSunMenuStatePos(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1";
                  }}
                >
                  Fuels
                </NavLink>
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/pos/device-and-location");
                  }}
                  to="/admin/pos/device-and-location"
                  className={({ isActive }) => {
                    isActive && setSunMenuStatePos(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1";
                  }}
                >
                  Device & Location
                </NavLink>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSubMenuStateLottery(!subMenuStateLottery);
                }}
                className="flex py-2 px-5 rounded-full cursor-pointer font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              >
                <Amphora />
                Lottery
                <ChevronDown
                  className={`ml-auto ${subMenuStateLottery ? "rotate-180" : "rotate-0"} transition-all duration-300 ease-linear`}
                />
              </div>
              <div
                className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${
                  subMenuStateLottery ? "h-[20vh] opacity-100 p-2" : "h-[0vh] opacity-0 p-0"
                } transition-all duration-300 ease-linear overflow-hidden`}
              >
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/lottery/inventory");
                  }}
                  to="/admin/lottery/inventory"
                  className={({ isActive }) => {
                    isActive && setSubMenuStateLottery(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                >
                  Inventory
                </NavLink>
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/lottery/instant-scan-tickets");
                  }}
                  to="/admin/lottery/instant-scan-tickets"
                  className={({ isActive }) => {
                    isActive && setSubMenuStateLottery(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                >
                  Ticket Scan
                </NavLink>
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/lottery/sale-report");
                  }}
                  to="/admin/lottery/sale-report"
                  className={({ isActive }) => {
                    isActive && setSubMenuStateLottery(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                >
                  Sales Reports
                </NavLink>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSubMenuStateLoyalty(!subMenuStateLoyalty);
                }}
                className="flex py-2 px-5 rounded-full cursor-pointer font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              >
                <BadgeDollarSign />
                Loyalty
                <ChevronDown
                  className={`ml-auto ${subMenuStateLoyalty ? "rotate-180" : "rotate-0"} transition-all duration-300 ease-linear`}
                />
              </div>
              <div
                className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${
                  subMenuStateLoyalty ? "h-[15vh] opacity-100 p-2" : "h-[0vh] opacity-0 p-0"
                } transition-all duration-300 ease-linear overflow-hidden`}
              >
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/loyalty/reports");
                  }}
                  to="/admin/loyalty/reports"
                  className={({ isActive }) => {
                    isActive && setSubMenuStateLoyalty(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                >
                  Reports
                </NavLink>
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation("/admin/loyalty/deals");
                  }}
                  to="/admin/loyalty/deals"
                  className={({ isActive }) => {
                    isActive && setSubMenuStateLoyalty(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                >
                  Loyalty Deals
                </NavLink>
              </div>
            </div>
            <NavLink
              to="/admin/rewards"
              className={({ isActive }) =>
                isActive
                  ? "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink"
                  : "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              }
              onClick={() => handleNavigation("/admin/rewards")}
            >
              <RewardIcon />
              Reward
            </NavLink>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                isActive
                  ? "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink"
                  : "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              }
              onClick={() => handleNavigation("/admin/settings")}
            >
              <SettingsIcon />
              Settings
            </NavLink>
            <NavLink
              to="/admin/help"
              className={({ isActive }) =>
                isActive
                  ? "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink"
                  : "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              }
              onClick={() => handleNavigation("/admin/help")}
            >
              <HelpIcon />
              Help
            </NavLink>
            <NavLink
              to="/admin/payroll"
              className={({ isActive }) =>
                isActive
                  ? "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink"
                  : "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              }
              onClick={() => handleNavigation("/admin/payroll")}
            >
              <PayrollIcon />
              Payroll
            </NavLink>
            <NavLink
              to="/admin/tasks"
              className={({ isActive }) =>
                isActive
                  ? "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink"
                  : "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              }
              onClick={() => handleNavigation("/admin/tasks")}
            >
              <Network />
              Tasks
            </NavLink>
            <button
              className="bg-[#E74C3C] py-2 px-6 gap-4 font-[var(--paraFont)] cursor-pointer text-[var(--primary-color)] rounded-full flex justify-start items-center mt-[10%] text-[1.1dvw]"
              onClick={() => handleNavigation("/logout")} // Assuming a logout route
            >
              <LogooutIcon />
              Logout
            </button>
          </ul>
        </div>
      </div>
      <div className="layout__mainContentWrapper flex flex-col shrink-0 flex-1 w-full overflow-x-hidden">
        <nav className="topNavbar__mainWrapper">
          <div className="topNav__leftWrapper px-3">
            <h2>Good Morning, Eve</h2>
            <p>Here is your daily preview</p>
          </div>
          <div className="topNav__rightWrapper">
            <button>
              <SearchIcon />
            </button>
            <button>
              <NotificationIcon />
            </button>
            <button className="addProduct__BTN" onClick={handleAddProduct}>
              Add Product <PluseIcon />
            </button>
            <button>
              <Avatar />
            </button>
          </div>
        </nav>
        <div className="w-full p-4 h-[87%] overflow-y-auto overflow-x-hidden">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </div>
      {showProductModel && <AddProductModel />}
    </div>
  );
};