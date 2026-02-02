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
import { AddProductModel } from "../../common/AddProductModel/AddProductModel";
import Notifications from "../Notification/Notifications";

export const Layout = ({ children }) => {
  const clientData = useSelector((state) => state.loggedUser);
  const [subMenuStateInventory, setSubMenuStateInventory] = useState(false);
  const [subMenuStateUser, setSubMenuStateUser] = useState(false);
  const [subMenuStatePos, setSunMenuStatePos] = useState(false);
  const [subMenuStateLottery, setSubMenuStateLottery] = useState(false);
  const [subMenuStateLoyalty, setSubMenuStateLoyalty] = useState(false);
  const [subMenuStateDaily, setSubMenuStateDaily] = useState(false);
  const [showProductModel, setShowProductModel] = useState({
    state: false,
    productData: null,
    actionType: "",
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const navigate = useNavigate();

  // Check if device is mobile or tablet
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
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
    setShowProductModel({
      state: true,
      productData: null,
      actionType: "Add",
    });
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
            <div className="flex flex-col gap-2 w-full">
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                placeholder="Enter the code"
                type="text"
                onChange={(e) =>
                  handleStockFieldChange(0, "stockCode", e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm lg:text-[1dvw] font-normal paraFont">
              Qty on Hand:
              <span className="text-xs lg:text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
            <div className="flex flex-col gap-2 w-full">
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                placeholder="Enter Qty"
                type="text"
                onChange={(e) =>
                  handleStockFieldChange(0, "qtyItems", e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm lg:text-[1dvw] font-normal paraFont">
              Qty Cases:
              <span className="text-xs lg:text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
            <div className="flex flex-col gap-2 w-full">
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                placeholder="Enter Cases"
                type="text"
                onChange={(e) =>
                  handleStockFieldChange(0, "qtyCases", e.target.value)
                }
              />
            </div>
          </div>
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

  // Sidebar Navigation Component with Enhanced Font Sizes
  const SidebarNavigation = ({ className = "" }) => (
    <div className={`sideMenu__wrapper w-full ${className}`}>
      <ul className="w-[80%] py-5 mx-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
              : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
              }`
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
              ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
              : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
              }`
          }
          onClick={() => handleNavigation("/admin/sale")}
        >
          <div>
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
            className={`flex py-2 px-5 rounded-full cursor-pointer font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
              }`}
          >
            <Calendar style={isMobile ? { color: "white" } : {}} />
            Daily
            <ChevronDown
              style={isMobile ? { color: "white" } : {}}
              className={`ml-auto ${subMenuStateDaily ? "rotate-180" : "rotate-0"
                } transition-all duration-300 ease-linear`}
            />
          </div>
          <div
            className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${subMenuStateDaily ? "h-auto opacity-100 p-2" : "h-0 opacity-0"
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
                  }`;
              }}
            >
              Expense
            </NavLink>
            <NavLink
              onClick={(e) => {
                e.stopPropagation();
                handleNavigation("/admin/daily/taxes");
              }}
              to="/admin/daily/taxes"
              className={({ isActive }) => {
                isActive && setSubMenuStateDaily(true);
                return isActive
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
                  }`;
              }}
            >
              Taxes
            </NavLink>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSubMenuStateInventory(!subMenuStateInventory);
            }}
            className={`flex py-2 px-5 rounded-full cursor-pointer font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
              }`}
          >
            <div style={isMobile ? { filter: "brightness(0) invert(1)" } : {}}>
              <InventoryIcon />
            </div>
            Inventory
            <ChevronDown
              style={isMobile ? { color: "white" } : {}}
              className={`ml-auto ${subMenuStateInventory ? "rotate-180" : "rotate-0"
                } transition-all duration-300 ease-linear`}
            />
          </div>
          <div
            className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${subMenuStateInventory ? "h-auto opacity-100 p-2" : "h-0 opacity-0"
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
                  }`;
              }}
              onClick={() => handleNavigation("/admin/inventory/category")}
            >
              Category
            </NavLink>
            <NavLink
              to="/admin/inventory/groups"
              className={({ isActive }) => {
                isActive && setSubMenuStateInventory(true);
                return isActive
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
                  }`;
              }}
              onClick={() => handleNavigation("/admin/inventory/groups")}
            >
              Groups
            </NavLink>

            <NavLink
              to="/admin/inventory/suppliers"
              className={({ isActive }) => {
                isActive && setSubMenuStateInventory(true);
                return isActive
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
              ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
              : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
            className={`flex py-2 px-5 rounded-full cursor-pointer font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
              }`}
          >
            <div style={isMobile ? { filter: "brightness(0) invert(1)" } : {}}>
              <UsersIcon />
            </div>
            Users
            <ChevronDown
              style={isMobile ? { color: "white" } : {}}
              className={`ml-auto ${subMenuStateUser ? "rotate-180" : "rotate-0"
                } transition-all duration-300 ease-linear`}
            />
          </div>
          <div
            className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${subMenuStateUser ? "h-auto opacity-100 p-2" : "h-0 opacity-0"
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
            className={`flex py-2 px-5 rounded-full cursor-pointer font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
              }`}
          >
            <div style={isMobile ? { filter: "brightness(0) invert(1)" } : {}}>
              <POSIcon />
            </div>
            POS
            <ChevronDown
              style={isMobile ? { color: "white" } : {}}
              className={`ml-auto ${subMenuStatePos ? "rotate-180" : "rotate-0"
                } transition-all duration-300 ease-linear`}
            />
          </div>
          <div
            className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${subMenuStatePos ? "h-auto opacity-100 p-2 " : "h-0 opacity-0"
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink line-clamp-1`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink line-clamp-1`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink line-clamp-1`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink line-clamp-1`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink line-clamp-1`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink line-clamp-1`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink line-clamp-1`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink line-clamp-1`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink line-clamp-1`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink line-clamp-1 ${isMobile ? "text-white" : ""
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
            className={`flex py-2 px-5 rounded-full cursor-pointer font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
              }`}
          >
            <Amphora style={isMobile ? { color: "white" } : {}} />
            Lottery
            <ChevronDown
              style={isMobile ? { color: "white" } : {}}
              className={`ml-auto ${subMenuStateLottery ? "rotate-180" : "rotate-0"
                } transition-all duration-300 ease-linear`}
            />
          </div>
          <div
            className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${subMenuStateLottery ? "h-auto opacity-100 p-2" : "h-0 opacity-0"
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
            className={`flex py-2 px-5 rounded-full cursor-pointer font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
              }`}
          >
            <BadgeDollarSign style={isMobile ? { color: "white" } : {}} />
            Loyalty
            <ChevronDown
              style={isMobile ? { color: "white" } : {}}
              className={`ml-auto ${subMenuStateLoyalty ? "rotate-180" : "rotate-0"
                } transition-all duration-300 ease-linear`}
            />
          </div>
          <div
            className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${subMenuStateLoyalty ? "h-auto opacity-100 p-2" : "h-0 opacity-0"
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
                  ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
                  : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                    ? "text-[25px]"
                    : isMobile
                      ? "text-[16px]"
                      : "text-xs lg:text-[1dvw]"
                  } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
              ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
              : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
              ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
              : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
              ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
              : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
              ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
              : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
              ? `flex py-2 px-5 rounded-full font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 text-[var(--button-color1)] bg-white activeLink`
              : `flex py-2 px-5 rounded-full font-[600] ${isTablet
                ? "text-[30px]"
                : isMobile
                  ? "text-[20px]"
                  : "text-sm lg:text-[1.2dvw]"
              } paraFont justify-start items-center gap-4 deActiveLink ${isMobile ? "text-white" : ""
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
              className={`flex py-3 px-5 rounded-full font-[600] ${isTablet ? "text-[30px]" : "text-[20px]"
                } paraFont justify-start items-center gap-4 bg-[var(--button-color1)] text-[var(--primary-color)] my-2 mx-2 hover:opacity-90 transition-all duration-300`}
              onClick={handleAddProduct}
            >
              <div style={{ filter: "brightness(0) invert(1)" }}>
                <PluseIcon size={30} />
              </div>
              Add Product
            </button>
            <div
              className={`flex py-3 px-5 rounded-full font-[600] ${isTablet ? "text-[30px]" : "text-[20px]"
                } paraFont justify-start items-center gap-4 deActiveLink my-2 text-white`}
            >
              <Avatar style={{ filter: "brightness(0) invert(1)" }} />
              Profile
            </div>
          </>
        )}

        <button
          className={`bg-[#E74C3C] py-3 px-6 gap-4 font-[var(--paraFont)] cursor-pointer text-[var(--primary-color)] rounded-full flex justify-start items-center mt-[10%] ${isTablet
              ? "text-[30px]"
              : isMobile
                ? "text-[20px]"
                : "text-sm lg:text-[1.1dvw]"
            } ${isMobile ? "text-white" : ""}`}
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
          className={`layout__sideMenuMainWrapper shrink-0 ${isMobile ? "hidden" : "flex"
            }`}
        >
          <div className="sideMenu__logoWrapper flex justify-center items-center">
            <img
              alt="sellsync.com"
              src={SellsyncLogo}
              className="w-[85%] h-auto"
            />
          </div>
          <SidebarNavigation />
        </div>

        {/* Mobile Sidebar Overlay with Enhanced Padding */}
        {isMobile && (
          <div
            className={`fixed inset-0 z-50 ${isMobileMenuOpen ? "block" : "hidden"
              }`}
          >
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            <div className="mobile-sidebar fixed left-0 top-0 h-full w-full bg-[var(--sideMenu-color)] transform transition-transform duration-300 ease-in-out flex flex-col">
              {/* Mobile Logo Header with Enhanced Padding */}
              <div
                className={`flex items-center justify-between h-16 w-full ${isTablet ? "px-8 py-22" : "px-4 py-10"
                  }`}
              >
                <div className="flex items-center justify-center flex-1">
                  <img
                    alt="sellsync.com"
                    src={SellsyncLogo}
                    className={`${isTablet ? "h-25 w-auto mt-4" : "h-15 w-auto mt-4"
                      }`}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-center ${isTablet ? "w-12 h-12" : "w-10 h-10"
                      } rounded-full hover:bg-white/10 transition-colors`}
                  >
                    <X size={isTablet ? 28 : 24} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Mobile Navigation with Enhanced Spacing */}
              <div
                className={`flex-1 overflow-y-auto ${isTablet ? "pt-6" : "pt-4"
                  }`}
              >
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
                  Good Morning, {clientData?.name?.split(" ")[0] || "User"}
                </h2>
                <p className="text-sm sm:text-base lg:text-[1.1dvw] font-[var(--paraFont)] text-[var(--paraText-color)]">
                  Here is your daily preview
                </p>
              </div>
              <div className="topNav__rightWrapper">
                <button className="p-1 sm:p-[5px] border border-[#7f7f7f] rounded-full">
                  <SearchIcon />
                </button>
                <button
                  className="p-1 sm:p-[5px] border border-[#7f7f7f] rounded-full relative"
                  onClick={() => setIsNotificationOpen(true)}
                >
                  <NotificationIcon />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {notificationCount}
                    </span>
                  )}
                </button>
                <button
                  className="addProduct__BTN bg-[var(--button-color1)] text-[var(--primary-color)] flex justify-center items-center gap-1 sm:gap-[5px] px-3 py-2 sm:px-[25px] sm:py-[10px] font-[var(--mainFont)] font-medium text-xs sm:text-sm lg:text-[1dvw] border-none outline-none rounded-full cursor-pointer"
                  onClick={handleAddProduct}
                >
                  Add Product
                  <PluseIcon />
                </button>
                <button
                  className="addProduct__BTN bg-[#F8A61B] text-[var(--primary-color)] flex justify-center items-center gap-1 sm:gap-[5px] px-3 py-2 sm:px-[25px] sm:py-[10px] font-[var(--mainFont)] font-medium text-xs sm:text-sm lg:text-[1dvw] border-none outline-none rounded-full cursor-pointer"
                // onClick={handleAddProduct}
                >
                  Upload Invoice
                  {/* <PluseIcon /> */}
                </button>
                <button className="p-1 sm:p-[5px] border border-[#7f7f7f] rounded-full">
                  <Avatar
                    src={`${import.meta.env.VITE_APP_BASE_URL}/public/${clientData?.profile_image || ""
                      }`}
                  />
                </button>
              </div>
            </nav>
          )}
          <Notifications
            isOpen={isNotificationOpen}
            onClose={() => setIsNotificationOpen(false)}
            onNotificationCountChange={setNotificationCount}
          />

          {/* Mobile Header with Hamburger */}
          {isMobile && (
            <div className="flex items-center justify-between p-4 bg-[var(--primary-color)]">
              <button
                className="hamburger-btn p-2"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu
                  size={isTablet ? 32 : 24}
                  className="text-[var(--mainText-color)]"
                />
              </button>
              <div className="flex-1 text-center">
                <h2 className="text-lg font-[var(--mainFont)] font-medium text-[var(--mainText-color)]">
                  Dashboard
                </h2>
              </div>
              <div className="w-8 flex justify-end">
                <button
                  className="relative p-1"
                  onClick={() => setIsNotificationOpen(true)}
                >
                  <NotificationIcon className="text-[var(--mainText-color)]" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {notificationCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

          <div
            className={`w-full p-2 sm:p-4 ${isMobile ? "h-[calc(100%-80px)]" : "h-[87%]"
              } overflow-y-auto overflow-x-hidden`}
          >
            {children}
          </div>
        </div>
      </div>
      {showProductModel.state && showProductModel.actionType === "Add" && (
        <AddProductModel
          productData={showProductModel.productData}
          setShowModel={setShowProductModel}
          actionType={showProductModel.actionType}
        />
      )}
    </>
  );
};

export default Layout;
