import React, { useState } from "react";
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
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Contact } from "lucide-react";

export const Layout = ({ children }) => {
  const [subMenuState, setSubMenuState] = useState(false);
  return (
    <div className="layout__OuterMainWrapper">
      <div className="layout__sideMenuMainWrapper shrink-0">
        <div className="sideMenu__logoWrapper ">
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
            >
              <SalesIcon />
              Sales
            </NavLink>
            <div className="w-full flex flex-col gap-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSubMenuState(!subMenuState);
                }}
                className={
                  "flex py-2 px-5 rounded-full cursor-pointer font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
                }
              >
                <InventoryIcon />
                Inventory
                <ChevronDown
                  className={`ml-auto ${
                    subMenuState ? "rotate-180" : "rotate-0"
                  } transition-all duration-300 ease-linear`}
                />
              </div>

              <div
                className={`bg-[#0052cc]/50 w-[80%] mx-auto  rounded-md flex flex-col gap-2 ${
                  subMenuState
                    ? "h-[32vh] opacity-100 p-2"
                    : "h-[0vh] opacity-0 p-0 "
                } transition-all duration-300 ease-linear  overflow-hidden`}
              >
              <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  to="/admin/inventory/overview"
                  className={({ isActive }) => {
                    isActive && setSubMenuState(true);
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
                  }}
                  to="/admin/inventory/item-lists"
                  className={({ isActive }) => {
                    isActive && setSubMenuState(true);
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
                    isActive && setSubMenuState(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                >
                  Category
                </NavLink>
                <NavLink
                  to="/admin/inventory/suppliers"
                  className={({ isActive }) => {
                    isActive && setSubMenuState(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                >
                  Suppliers
                </NavLink>
                <NavLink
                  to="/admin/inventory/recieve"
                  className={({ isActive }) => {
                    isActive && setSubMenuState(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                >
                  Recieve
                </NavLink>
                <NavLink
                  to="/admin/inventory/orders"
                  className={({ isActive }) => {
                    isActive && setSubMenuState(true);
                    return isActive
                      ? "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 activeLink"
                      : "flex py-2 px-5 rounded-full font-[600] text-[1dvw] paraFont justify-start items-center gap-4 deActiveLink";
                  }}
                >
                  Order
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
            >
              <ReportsIcon />
              Reports
            </NavLink>
            <NavLink
              to="/admin/customers"
              className={({ isActive }) =>
                isActive
                  ? "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink"
                  : "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              }
            >
              <Contact />
              Customer
            </NavLink>
            <NavLink
              to="/admin/employees"
              className={({ isActive }) =>
                isActive
                  ? "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink"
                  : "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              }
            >
              <UsersIcon />
              Employee
            </NavLink>
            <NavLink
              to="/admin/pos"
              className={({ isActive }) =>
                isActive
                  ? "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink"
                  : "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              }
            >
              <POSIcon />
              POS
            </NavLink>
            <NavLink
              to="/admin/rewards"
              className={({ isActive }) =>
                isActive
                  ? "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink"
                  : "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              }
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
            >
              <PayrollIcon />
              Payroll
            </NavLink>
            <button className="bg-[#E74C3C] py-2 px-6 gap-4 font-[var(--paraFont)] cursor-pointer text-[var(--primary-color)] rounded-full flex justify-start items-center mt-[10%] text-[1.1dvw]">
              <LogooutIcon />
              Logout
            </button>
          </ul>
        </div>
      </div>
      <div className="layout__mainContentWrapper flex flex-col jus  shrink-0 flex-1 w-full  overflow-x-hidden">
        <nav className="topNavbar__mainWrapper ">
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
            <button className="addProduct__BTN">
              Add Product <PluseIcon />
            </button>
            <button>
              <Avatar />
            </button>
          </div>
        </nav>
        <div className="w-full p-4 h-[87%] overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};
