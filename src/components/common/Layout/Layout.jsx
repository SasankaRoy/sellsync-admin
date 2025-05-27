import React from "react";
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

export const Layout = ({ children }) => {
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
              
              className={({isActive})=>isActive?"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink":"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"}
            >
              <DashboardIcon />
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/sale"
              className={({isActive})=>isActive ? "flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink":"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"}
            >
              <SalesIcon />
              Sales
            </NavLink>
            <NavLink
              to="/admin/inventory"
              className={({isActive})=>isActive?"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink":"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"}
            >
              <InventoryIcon />
              Inventory
            </NavLink>
            <NavLink
              to="/admin/reports"
              className={({isActive})=>isActive?"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink":"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"}
            >
              <ReportsIcon />
              Reports
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({isActive})=>isActive?"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink":"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"}
            >
              <UsersIcon />
              Users
            </NavLink>
            <NavLink
              to="/admin/pos"
              className={({isActive})=>isActive?"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink":"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"}
            >
              <POSIcon />
              POS
            </NavLink>
            <NavLink
              to="/admin/rewards"
              className={({isActive})=>isActive?"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink":"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"}
            >
              <RewardIcon />
              Reward
            </NavLink>
            <NavLink
              to="/admin/settings"
              className={({isActive})=>isActive?"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink":"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"}
            >
              <SettingsIcon />
              Settings
            </NavLink>
            <NavLink
              to="/admin/help"
              className={({isActive})=>isActive?"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink":"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"}
            >
              <HelpIcon />
              Help
            </NavLink>
            <NavLink
              to="/admin/payroll"
              className={({isActive})=>isActive?"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 activeLink":"flex py-2 px-5 rounded-full font-[600] text-[1.2dvw] paraFont justify-start items-center gap-4 deActiveLink"}
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
