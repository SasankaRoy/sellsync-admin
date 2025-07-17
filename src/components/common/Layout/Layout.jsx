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
import { Amphora, BadgeDollarSign, ChevronDown, Contact, Network } from "lucide-react";

export const Layout = ({ children, onAddProduct }) => {
  const [subMenuStateInventory, setSubMenuStateInventory] = useState(false);
  const [subMenuStateUser, setSubMenuStateUser] = useState(false);
  const [subMenuStatePos, setSunMenuStatePos] = useState(false);
  const [subMenuStateLottery,setSubMenuStateLottery] = useState(false);
  const [subMenuStateLoyalty,setSubMenuStateLoyalty] = useState(false);


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
                  setSubMenuStateInventory(!subMenuStateInventory);
                }}
                className={
                  "flex py-2 px-5 rounded-full cursor-pointer font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
                }
              >
                <InventoryIcon />
                Inventory
                <ChevronDown
                  className={`ml-auto ${
                    subMenuStateInventory ? "rotate-180" : "rotate-0"
                  } transition-all duration-300 ease-linear`}
                />
              </div>

              <div
                className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${
                  subMenuStateInventory
                    ? "h-[40vh] opacity-100 p-2"
                    : "h-[0vh] opacity-0 p-0 "
                } transition-all duration-300 ease-linear overflow-hidden`}
              >
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
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
                className={
                  "flex py-2 px-5 rounded-full cursor-pointer font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
                }
              >
                <UsersIcon />
                Users
                <ChevronDown
                  className={`ml-auto ${
                    subMenuStateUser ? "rotate-180" : "rotate-0"
                  } transition-all duration-300 ease-linear`}
                />
              </div>
              <div
                className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${
                  subMenuStateUser
                    ? "h-[15vh] opacity-100 p-2"
                    : "h-[0vh] opacity-0 p-0 "
                } transition-all duration-300 ease-linear overflow-hidden`}
              >
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
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
                className={
                  "flex py-2 px-5 rounded-full cursor-pointer font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
                }
              >
                <POSIcon />
                POS
                <ChevronDown
                  className={`ml-auto ${
                    subMenuStatePos ? "rotate-180" : "rotate-0"
                  } transition-all duration-300 ease-linear`}
                />
              </div>
              <div
                className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${
                  subMenuStatePos
                    ? "h-[55vh] opacity-100 p-2"
                    : "h-[0vh] opacity-0 p-0 "
                } transition-all duration-300 ease-linear overflow-hidden`}
              >
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
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
                className={
                  "flex py-2 px-5 rounded-full cursor-pointer font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
                }
              >
                <Amphora />
                Lottery
                <ChevronDown
                  className={`ml-auto ${
                    subMenuStateLottery ? "rotate-180" : "rotate-0"
                  } transition-all duration-300 ease-linear`}
                />
              </div>
              <div
                className={`bg-[#0052cc]/50 w-[80%] mx-auto rounded-md flex flex-col gap-2 ${
                  subMenuStateLottery
                    ? "h-[20vh] opacity-100 p-2"
                    : "h-[0vh] opacity-0 p-0 "
                } transition-all duration-300 ease-linear overflow-hidden`}
              >
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
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
                className={
                  "flex py-2 px-5 rounded-full cursor-pointer font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
                }
              >
                <BadgeDollarSign  />
                Loyalty
                <ChevronDown
                  className={`ml-auto ${
                    subMenuStateLoyalty ? "rotate-180" : "rotate-0"
                  } transition-all duration-300 ease-linear`}
                />
              </div>

              <div
                className={`bg-[#0052cc]/50 w-[80%] mx-auto  rounded-md flex flex-col gap-2 ${
                  subMenuStateLoyalty
                    ? "h-[15vh] opacity-100 p-2"
                    : "h-[0vh] opacity-0 p-0 "
                } transition-all duration-300 ease-linear  overflow-hidden`}
              >
                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  to="/admin/lottery/inventory"
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
            <NavLink
              to="/admin/tasks"
              className={({ isActive }) =>
                isActive
                  ? "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink"
                  : "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"
              }
            >
              <Network />
              Tasks
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
            <button className="addProduct__BTN" onClick={onAddProduct}>
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