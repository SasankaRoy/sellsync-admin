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
import {
  Amphora,
  BadgeDollarSign,
  ChevronDown,
  CircleX,
  Network,
  Plus,
  Calendar,
  Menu,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";

export const Layout = ({ children }) => {
  const clientData = useSelector((state) => state.loggedUser);
  const [subMenuStateInventory, setSubMenuStateInventory] = useState(false);
  const [subMenuStateUser, setSubMenuStateUser] = useState(false);
  const [subMenuStatePos, setSunMenuStatePos] = useState(false);
  const [subMenuStateLottery, setSubMenuStateLottery] = useState(false);
  const [subMenuStateLoyalty, setSubMenuStateLoyalty] = useState(false);
  const [subMenuStateDaily, setSubMenuStateDaily] = useState(false);
  const [showProductModel, setShowProductModel] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        !event.target.closest(".mobile-sidebar") &&
        !event.target.closest(".hamburger-btn")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Handle navigation programmatically if needed
  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleAddProduct = () => {
    console.log("Add Product clicked from Layout");
    setShowProductModel(true);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
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

  const DetailsTab = ({
    stockFields,
    setStockFields,
    quantityFields,
    setQuantityFields,
    productDetails,
    setProductDetails,
  }) => {
    const handleAddStockField = () => {
      setStockFields([
        ...stockFields,
        {
          id: stockFields.length + 1,
          stockCode: "",
          qtyItems: "",
          qtyCases: "",
        },
      ]);
    };

    const handleAddQuantityField = () => {
      setQuantityFields([
        ...quantityFields,
        {
          id: quantityFields.length + 1,
          qty: "",
          price: "",
          avgCost: "",
          margin: "",
          markup: "",
          latestCost: "",
          qty2: "",
        },
      ]);
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
      setProductDetails((prev) => ({ ...prev, [field]: value }));
    };

    return (
      <div className="w-full p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative">
          <button
            onClick={handleAddStockField}
            className="absolute -top-[0%] cursor-pointer -right-[0%] p-1 flex justify-center items-center bg-[var(--button-color1)] text-white rounded-full"
          >
            <Plus size={20} />
          </button>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm lg:text-[1dvw] font-normal paraFont">
              Stockcode
              <span className="text-xs lg:text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm lg:text-[1dvw] font-normal paraFont">
              Qty on Hand:
              <span className="text-xs lg:text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm lg:text-[1dvw] font-normal paraFont">
              Qty on Hand:
              <span className="text-xs lg:text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
          </div>
          {stockFields.map((field, index) => (
            <React.Fragment key={field.id}>
              <div className="flex flex-col gap-2 w-full">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="78440005246"
                  type="text"
                  value={field.stockCode}
                  onChange={(e) =>
                    handleStockFieldChange(index, "stockCode", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="Items"
                  type="number"
                  value={field.qtyItems}
                  onChange={(e) =>
                    handleStockFieldChange(index, "qtyItems", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="Cases"
                  type="number"
                  value={field.qtyCases}
                  onChange={(e) =>
                    handleStockFieldChange(index, "qtyCases", e.target.value)
                  }
                />
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="w-full my-4 flex flex-col gap-2">
          <label className="text-sm lg:text-[1dvw] font-normal paraFont">
            Name
            <span className="text-xs lg:text-[.9dvw] text-[var(--Negative-color)]">
              *
            </span>
          </label>
          <input
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="text"
            placeholder="Enter Product Name..."
            value={productDetails.name}
            onChange={(e) => handleProductDetailChange("name", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 my-4 relative">
          <button
            onClick={handleAddQuantityField}
            className="absolute -top-[2%] cursor-pointer -right-[0%] p-1 flex justify-center items-center bg-[var(--button-color1)] text-white rounded-full z-10"
          >
            <Plus size={20} />
          </button>
          <div className="w-full flex flex-col gap-1.5 min-w-[120px]">
            <label className="text-xs sm:text-sm lg:text-[1dvw] font-normal paraFont">
              Qty
              <span className="text-xs lg:text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
          </div>
          <div className="w-full flex flex-col gap-1.5 min-w-[120px]">
            <label className="text-xs sm:text-sm lg:text-[1dvw] font-normal paraFont">
              Price
              <span className="text-xs lg:text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
          </div>
          <div className="w-full flex flex-col gap-1.5 min-w-[120px]">
            <label className="text-xs sm:text-sm lg:text-[1dvw] font-normal paraFont">
              Avg Cost
              <span className="text-xs lg:text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
          </div>
          <div className="w-full flex flex-col gap-1.5 min-w-[120px]">
            <label className="text-xs sm:text-sm lg:text-[1dvw] font-normal paraFont">
              Margin
            </label>
          </div>
          <div className="w-full flex flex-col gap-1.5 min-w-[120px]">
            <label className="text-xs sm:text-sm lg:text-[1dvw] font-normal paraFont">
              Markup
            </label>
          </div>
          <div className="w-full flex flex-col gap-1.5 min-w-[120px]">
            <label className="text-xs sm:text-sm lg:text-[1dvw] font-normal paraFont">
              Latest Cost
            </label>
          </div>
          <div className="w-full flex flex-col gap-1.5 min-w-[120px]">
            <label className="text-xs sm:text-sm lg:text-[1dvw] font-normal paraFont">
              Qty
            </label>
          </div>
          {quantityFields.map((field, index) => (
            <React.Fragment key={field.id}>
              <div className="w-full flex flex-col gap-1.5 min-w-[120px]">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  value={field.qty}
                  onChange={(e) =>
                    handleQuantityFieldChange(index, "qty", e.target.value)
                  }
                />
              </div>
              <div className="w-full flex flex-col gap-1.5 min-w-[120px]">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  value={field.price}
                  onChange={(e) =>
                    handleQuantityFieldChange(index, "price", e.target.value)
                  }
                />
              </div>
              <div className="w-full flex flex-col gap-1.5 min-w-[120px]">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  value={field.avgCost}
                  onChange={(e) =>
                    handleQuantityFieldChange(index, "avgCost", e.target.value)
                  }
                />
              </div>
              <div className="w-full flex flex-col gap-1.5 min-w-[120px]">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  value={field.margin}
                  onChange={(e) =>
                    handleQuantityFieldChange(index, "margin", e.target.value)
                  }
                />
              </div>
              <div className="w-full flex flex-col gap-1.5 min-w-[120px]">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  value={field.markup}
                  onChange={(e) =>
                    handleQuantityFieldChange(index, "markup", e.target.value)
                  }
                />
              </div>
              <div className="w-full flex flex-col gap-1.5 min-w-[120px]">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  value={field.latestCost}
                  onChange={(e) =>
                    handleQuantityFieldChange(
                      index,
                      "latestCost",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="w-full flex flex-col gap-1.5 min-w-[120px]">
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  value={field.qty2}
                  onChange={(e) =>
                    handleQuantityFieldChange(index, "qty2", e.target.value)
                  }
                />
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-sm lg:text-[1dvw] font-normal paraFont">
              Size
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.size}
              onChange={(e) =>
                handleProductDetailChange("size", e.target.value)
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm lg:text-[1dvw] font-normal paraFont">
              Vendor Item No
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.vendorItemNo}
              onChange={(e) =>
                handleProductDetailChange("vendorItemNo", e.target.value)
              }
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 my-4">
          <label className="text-sm lg:text-[1dvw] font-normal paraFont">
            Category
          </label>
          <select
            className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            value={productDetails.category}
            onChange={(e) =>
              handleProductDetailChange("category", e.target.value)
            }
          >
            <option>Select Category</option>
            <option>Beer</option>
            <option>Wine</option>
            <option>Spirits</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full my-4">
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm lg:text-[1dvw] font-normal paraFont">
              Supplier
            </label>
            <select
              className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              value={productDetails.supplier}
              onChange={(e) =>
                handleProductDetailChange("supplier", e.target.value)
              }
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
            <label className="text-sm lg:text-[1dvw] font-normal paraFont">
              SKU
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.sku}
              onChange={(e) => handleProductDetailChange("sku", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full my-6">
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm lg:text-[1dvw] font-normal paraFont">
              Units Per Case
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.unitsPerCase}
              onChange={(e) =>
                handleProductDetailChange("unitsPerCase", e.target.value)
              }
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm lg:text-[1dvw] font-normal paraFont">
              Case Cost Total
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.caseCostTotal}
              onChange={(e) =>
                handleProductDetailChange("caseCostTotal", e.target.value)
              }
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm lg:text-[1dvw] font-normal paraFont">
              Tax
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.tax}
              onChange={(e) => handleProductDetailChange("tax", e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm lg:text-[1dvw] font-normal paraFont">
              Reorder Point
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.reorderPoint}
              onChange={(e) =>
                handleProductDetailChange("reorderPoint", e.target.value)
              }
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm lg:text-[1dvw] font-normal paraFont">
              Reorder Value
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.reorderValue}
              onChange={(e) =>
                handleProductDetailChange("reorderValue", e.target.value)
              }
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm lg:text-[1dvw] font-normal paraFont">
              Rank
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              value={productDetails.rank}
              onChange={(e) =>
                handleProductDetailChange("rank", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    );
  };

  const AddProductModel = () => {
    const [stockFields, setStockFields] = useState([
      { id: 1, stockCode: "", qtyItems: "", qtyCases: "" },
    ]);
    const [quantityFields, setQuantityFields] = useState([
      {
        id: 1,
        qty: "",
        price: "",
        avgCost: "",
        margin: "",
        markup: "",
        latestCost: "",
        qty2: "",
      },
    ]);
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
      rank: "",
    });

    const handleCloseModel = () => {
      setShowProductModel(false);
      // Reset state to avoid stale data
      setStockFields([{ id: 1, stockCode: "", qtyItems: "", qtyCases: "" }]);
      setQuantityFields([
        {
          id: 1,
          qty: "",
          price: "",
          avgCost: "",
          margin: "",
          markup: "",
          latestCost: "",
          qty2: "",
        },
      ]);
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
        rank: "",
      });
    };

    const handleSubmit = () => {
      console.log("Product Data:", {
        stockFields,
        quantityFields,
        productDetails,
      });
      handleCloseModel();
      // Optionally navigate to refresh the page
      navigate(window.location.pathname);
    };

    return (
      <ErrorBoundary>
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-4xl lg:w-[70%] max-h-[90vh] overflow-y-auto p-3 sm:p-5 rounded-lg shadow-md">
            <div className="flex justify-between items-center w-full p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
              <h3 className="text-lg sm:text-xl lg:text-[1.5dvw] font-semibold">
                Add Product
              </h3>
              <button
                onClick={handleCloseModel}
                className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
              >
                <CircleX size={24} className="sm:w-[30px] sm:h-[30px]" />
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

            <div className="flex flex-col sm:flex-row justify-end items-center gap-3 sm:gap-5 my-4">
              <button
                className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-1 rounded-md cursor-pointer text-white font-semibold bg-[var(--button-color4)] text-sm sm:text-base lg:text-[1.2dvw] hover:opacity-80 transition-all duration-300"
                onClick={handleCloseModel}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-1 rounded-md cursor-pointer text-white font-semibold bg-[var(--button-color5)] text-sm sm:text-base lg:text-[1.2dvw] hover:opacity-80 transition-all duration-300"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  };

  // Sidebar Navigation Component
  const SidebarNavigation = ({ className = "" }) => (
    <div className={`sideMenu__wrapper w-full ${className}`}>
      <ul className="w-[80%] py-5 mx-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `flex py-2 px-5 rounded-full font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink ${
                  isMobile ? "text-white" : ""
                }`
              : `flex py-2 px-5 rounded-full font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                  isMobile ? "text-white" : ""
                }`
          }
          onClick={() => handleNavigation("/")}
        >
          <div style={isMobile ? { filter: "brightness(0) invert(1)" } : {}}>
            <DashboardIcon />
          </div>
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/sale"
          className={({ isActive }) =>
            isActive
              ? `flex py-2 px-5 rounded-full font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink ${
                  isMobile ? "text-white" : ""
                }`
              : `flex py-2 px-5 rounded-full font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                  isMobile ? "text-white" : ""
                }`
          }
          onClick={() => handleNavigation("/admin/sale")}
        >
          <div style={isMobile ? { filter: "brightness(0) invert(1)" } : {}}>
            <SalesIcon />
          </div>
          Sales
        </NavLink>
        <div className="w-full flex flex-col gap-2">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSubMenuStateDaily(!subMenuStateDaily);
            }}
            className={`flex py-2 px-5 rounded-full cursor-pointer font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink ${
              isMobile ? "text-white" : ""
            }`}
          >
            <Calendar style={isMobile ? { color: "white" } : {}} />
            Daily
            <ChevronDown
              style={isMobile ? { color: "white" } : {}}
              className={`ml-auto ${
                subMenuStateDaily ? "rotate-180" : "rotate-0"
              } transition-all duration-300 ease-linear`}
            />
          </div>
          <div
            className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${
              subMenuStateDaily
                ? "h-[15vh] opacity-100 p-2"
                : "h-[0vh] opacity-0 p-0"
            } transition-all duration-300 ease-linear overflow-hidden`}
          >
            <NavLink
              onClick={(e) => {
                e.stopPropagation();
                handleNavigation("/admin/daily/purchase");
              }}
              to="/admin/daily/purchase"
              className={({ isActive }) => {
                isActive && setSubMenuStateDaily(true);
                return isActive
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                      isMobile ? "text-white" : ""
                    }`;
              }}
            >
              Purchase
            </NavLink>
            <NavLink
              onClick={(e) => {
                e.stopPropagation();
                handleNavigation("/admin/daily/expense");
              }}
              to="/admin/daily/expense"
              className={({ isActive }) => {
                isActive && setSubMenuStateDaily(true);
                return isActive
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                      isMobile ? "text-white" : ""
                    }`;
              }}
            >
              Expense
            </NavLink>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSubMenuStateInventory(!subMenuStateInventory);
            }}
            className={`flex py-2 px-5 rounded-full cursor-pointer font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink ${
              isMobile ? "text-white" : ""
            }`}
          >
            <div style={isMobile ? { filter: "brightness(0) invert(1)" } : {}}>
              <InventoryIcon />
            </div>
            Inventory
            <ChevronDown
              style={isMobile ? { color: "white" } : {}}
              className={`ml-auto ${
                subMenuStateInventory ? "rotate-180" : "rotate-0"
              } transition-all duration-300 ease-linear`}
            />
          </div>
          <div
            className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${
              subMenuStateInventory
                ? "h-[40vh] opacity-100 p-2"
                : "h-[0vh] opacity-0 p-0"
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                      isMobile ? "text-white" : ""
                    }`;
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                      isMobile ? "text-white" : ""
                    }`;
              }}
            >
              Items List
            </NavLink>
            <NavLink
              to="/admin/inventory/category"
              className={({ isActive }) => {
                isActive && setSubMenuStateInventory(true);
                return isActive
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                      isMobile ? "text-white" : ""
                    }`;
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                      isMobile ? "text-white" : ""
                    }`;
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                      isMobile ? "text-white" : ""
                    }`;
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                      isMobile ? "text-white" : ""
                    }`;
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
              ? `flex py-2 px-5 rounded-full font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink ${
                  isMobile ? "text-white" : ""
                }`
              : `flex py-2 px-5 rounded-full font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                  isMobile ? "text-white" : ""
                }`
          }
          onClick={() => handleNavigation("/admin/reports")}
        >
          <div style={isMobile ? { filter: "brightness(0) invert(1)" } : {}}>
            <ReportsIcon />
          </div>
          Reports
        </NavLink>
        <div className="w-full flex flex-col gap-2">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSubMenuStateUser(!subMenuStateUser);
            }}
            className={`flex py-2 px-5 rounded-full cursor-pointer font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink ${
              isMobile ? "text-white" : ""
            }`}
          >
            <div style={isMobile ? { filter: "brightness(0) invert(1)" } : {}}>
              <UsersIcon />
            </div>
            Users
            <ChevronDown
              style={isMobile ? { color: "white" } : {}}
              className={`ml-auto ${
                subMenuStateUser ? "rotate-180" : "rotate-0"
              } transition-all duration-300 ease-linear`}
            />
          </div>
          <div
            className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${
              subMenuStateUser
                ? "h-[15vh] opacity-100 p-2"
                : "h-[0vh] opacity-0 p-0"
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                      isMobile ? "text-white" : ""
                    }`;
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                      isMobile ? "text-white" : ""
                    }`;
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
            className={`flex py-2 px-5 rounded-full cursor-pointer font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink ${
              isMobile ? "text-white" : ""
            }`}
          >
            <div style={isMobile ? { filter: "brightness(0) invert(1)" } : {}}>
              <POSIcon />
            </div>
            POS
            <ChevronDown
              style={isMobile ? { color: "white" } : {}}
              className={`ml-auto ${
                subMenuStatePos ? "rotate-180" : "rotate-0"
              } transition-all duration-300 ease-linear`}
            />
          </div>
          <div
            className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${
              subMenuStatePos
                ? "h-[55vh] opacity-100 p-2"
                : "h-[0vh] opacity-0 p-0"
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`;
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`;
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`;
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`;
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`;
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`;
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`;
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`;
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${
                      isMobile ? "text-white" : ""
                    }`;
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
            className={`flex py-2 px-5 rounded-full cursor-pointer font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink ${
              isMobile ? "text-white" : ""
            }`}
          >
            <Amphora style={isMobile ? { color: "white" } : {}} />
            Lottery
            <ChevronDown
              style={isMobile ? { color: "white" } : {}}
              className={`ml-auto ${
                subMenuStateLottery ? "rotate-180" : "rotate-0"
              } transition-all duration-300 ease-linear`}
            />
          </div>
          <div
            className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${
              subMenuStateLottery
                ? "h-[20vh] opacity-100 p-2"
                : "h-[0vh] opacity-0 p-0"
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                      isMobile ? "text-white" : ""
                    }`;
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                      isMobile ? "text-white" : ""
                    }`;
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                      isMobile ? "text-white" : ""
                    }`;
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
            className={`flex py-2 px-5 rounded-full cursor-pointer font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink ${
              isMobile ? "text-white" : ""
            }`}
          >
            <BadgeDollarSign style={isMobile ? { color: "white" } : {}} />
            Loyalty
            <ChevronDown
              style={isMobile ? { color: "white" } : {}}
              className={`ml-auto ${
                subMenuStateLoyalty ? "rotate-180" : "rotate-0"
              } transition-all duration-300 ease-linear`}
            />
          </div>
          <div
            className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${
              subMenuStateLoyalty
                ? "h-[15vh] opacity-100 p-2"
                : "h-[0vh] opacity-0 p-0"
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                      isMobile ? "text-white" : ""
                    }`;
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
                  ? `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 activeLink ${
                      isMobile ? "text-white" : ""
                    }`
                  : `flex py-2 px-5 rounded-full font-[600] text-xs lg:text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                      isMobile ? "text-white" : ""
                    }`;
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
              ? `flex py-2 px-5 rounded-full font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink ${
                  isMobile ? "text-white" : ""
                }`
              : `flex py-2 px-5 rounded-full font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                  isMobile ? "text-white" : ""
                }`
          }
          onClick={() => handleNavigation("/admin/rewards")}
        >
          <div style={isMobile ? { filter: "brightness(0) invert(1)" } : {}}>
            <RewardIcon />
          </div>
          Reward
        </NavLink>
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            isActive
              ? `flex py-2 px-5 rounded-full font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink ${
                  isMobile ? "text-white" : ""
                }`
              : `flex py-2 px-5 rounded-full font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                  isMobile ? "text-white" : ""
                }`
          }
          onClick={() => handleNavigation("/admin/settings")}
        >
          <div style={isMobile ? { filter: "brightness(0) invert(1)" } : {}}>
            <SettingsIcon />
          </div>
          Settings
        </NavLink>
        <NavLink
          to="/admin/help"
          className={({ isActive }) =>
            isActive
              ? `flex py-2 px-5 rounded-full font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink ${
                  isMobile ? "text-white" : ""
                }`
              : `flex py-2 px-5 rounded-full font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                  isMobile ? "text-white" : ""
                }`
          }
          onClick={() => handleNavigation("/admin/help")}
        >
          <div style={isMobile ? { filter: "brightness(0) invert(1)" } : {}}>
            <HelpIcon />
          </div>
          Help
        </NavLink>
        <NavLink
          to="/admin/payroll"
          className={({ isActive }) =>
            isActive
              ? `flex py-2 px-5 rounded-full font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink ${
                  isMobile ? "text-white" : ""
                }`
              : `flex py-2 px-5 rounded-full font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                  isMobile ? "text-white" : ""
                }`
          }
          onClick={() => handleNavigation("/admin/payroll")}
        >
          <div style={isMobile ? { filter: "brightness(0) invert(1)" } : {}}>
            <PayrollIcon />
          </div>
          Payroll
        </NavLink>
        <NavLink
          to="/admin/tasks"
          className={({ isActive }) =>
            isActive
              ? `flex py-2 px-5 rounded-full font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink ${
                  isMobile ? "text-white" : ""
                }`
              : `flex py-2 px-5 rounded-full font-[600] text-sm lg:text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink ${
                  isMobile ? "text-white" : ""
                }`
          }
          onClick={() => handleNavigation("/admin/tasks")}
        >
          <Network style={isMobile ? { color: "white" } : {}} />
          Tasks
        </NavLink>

        {/* Mobile-only Add Product and Profile buttons */}
        {isMobile && (
          <>
            <button
              className="flex py-2 px-5 rounded-full font-[600] text-sm paraFont justify-start items-center gap-4 bg-[var(--button-color1)] text-[var(--primary-color)] my-2 mx-2 hover:opacity-90 transition-all duration-300"
              onClick={handleAddProduct}
            >
              <div style={{ filter: "brightness(0) invert(1)" }}>
                <PluseIcon />
              </div>
              Add Product
            </button>
            <div className="flex py-2 px-5 rounded-full font-[600] text-sm paraFont justify-start items-center gap-4 deActiveLink my-2 text-white">
              <Avatar style={{ filter: "brightness(0) invert(1)" }} />
              Profile
            </div>
          </>
        )}

        <button
          className={`bg-[#E74C3C] py-2 px-6 gap-4 font-[var(--paraFont)] cursor-pointer text-[var(--primary-color)] rounded-full flex justify-start items-center mt-[10%] text-sm lg:text-[1.1dvw] ${
            isMobile ? "text-white" : ""
          }`}
          onClick={() => handleNavigation("/logout")}
        >
          <div style={isMobile ? { filter: "brightness(0) invert(1)" } : {}}>
            <LogooutIcon />
          </div>
          Logout
        </button>
      </ul>
    </div>
  );

  return (
    <>
      <div className="layout__OuterMainWrapper overflow-y-hidden">
        {/* Desktop Sidebar - Hidden on Mobile */}
        <div
          className={`layout__sideMenuMainWrapper shrink-0 ${
            isMobile ? "hidden" : "flex"
          }`}
        >
          <div className="sideMenu__logoWrapper">
            <img alt="sellsync.com" src={SellsyncLogo} />
          </div>
          <SidebarNavigation />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobile && (
          <div
            className={`fixed inset-0 z-50 ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
          >
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            <div className="mobile-sidebar fixed left-0 top-0 h-full w-full bg-[var(--sideMenu-color)] transform transition-transform duration-300 ease-in-out flex flex-col">
              {/* Mobile Logo Header */}
              <div className="sideMenu__logoWrapper relative flex items-center justify-center h-16 w-full">
                <img
                  alt="sellsync.com"
                  src={SellsyncLogo}
                  className="h-15 w-auto"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobileMenuOpen(false);
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 overflow-y-auto">
                <SidebarNavigation />
              </div>
            </div>
          </div>
        )}

        <div className="layout__mainContentWrapper flex flex-col shrink-0 flex-1 w-full overflow-x-hidden">
          {/* Desktop Navbar - Hidden on Mobile */}
          {!isMobile && (
            <nav className="topNavbar__mainWrapper">
              <div className="topNav__leftWrapper px-3">
                <h2 className="text-lg sm:text-xl lg:text-[1.65dvw] font-[var(--mainFont)] font-medium text-[var(--mainText-color)] line-height-normal">
                  Good Morning, {clientData?.name.split(" ")[0]}
                </h2>
                <p className="text-sm sm:text-base lg:text-[1.1dvw] font-[var(--paraFont)] text-[var(--paraText-color)]">
                  Here is your daily preview
                </p>
              </div>
              <div className="topNav__rightWrapper">
                <button className="p-1 sm:p-[5px] border border-[#7f7f7f] rounded-full">
                  <SearchIcon />
                </button>
                <button className="p-1 sm:p-[5px] border border-[#7f7f7f] rounded-full">
                  <NotificationIcon />
                </button>
                <button
                  className="addProduct__BTN bg-[var(--button-color1)] text-[var(--primary-color)] flex justify-center items-center gap-1 sm:gap-[5px] px-3 py-2 sm:px-[25px] sm:py-[10px] font-[var(--mainFont)] font-medium text-xs sm:text-sm lg:text-[1dvw] border-none outline-none rounded-full cursor-pointer"
                  onClick={handleAddProduct}
                >
                  Add Product
                  <PluseIcon />
                </button>
                <button className="p-1 sm:p-[5px] border border-[#7f7f7f] rounded-full">
                  <Avatar
                    src={`${import.meta.env.VITE_APP_BASE_URL}/public/${
                      clientData?.profile_image
                    }`}
                  />
                </button>
              </div>
            </nav>
          )}

          {/* Mobile Header with Hamburger */}
          {isMobile && (
            <div className="flex items-center justify-between p-4 bg-[var(--primary-color)]">
              <button
                className="hamburger-btn p-2"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} className="text-[var(--mainText-color)]" />
              </button>
              <div className="flex-1 text-center">
                <h2 className="text-lg font-[var(--mainFont)] font-medium text-[var(--mainText-color)]">
                  Dashboard
                </h2>
              </div>
              <div className="w-8"></div> {/* Spacer for centering */}
            </div>
          )}

          <div
            className={`w-full p-2 sm:p-4 ${
              isMobile ? "h-[calc(100%-80px)]" : "h-[87%]"
            } overflow-y-auto overflow-x-hidden`}
          >
            <ErrorBoundary>{children}</ErrorBoundary>
          </div>
        </div>
      </div>
      {showProductModel && <AddProductModel />}
    </>
  );
};
