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

export const Layout = ({children}) => {
  return (
    <div className="layout__OuterMainWrapper">
      <div className="layout__sideMenuMainWrapper shrink-0">
        <div className="sideMenu__logoWrapper ">
          <img alt="sellsync.com" src={SellsyncLogo} />
        </div>
        <div className="sideMenu__wrapper w-full">
          <ul className="w-[80%] py-5 mx-auto">
            <li className="flex justify-start items-center gap-4 activeLink">
              <DashboardIcon />
              Dashboard
            </li>
            <li className="flex justify-start items-center gap-4">
              <SalesIcon />
              Sales
            </li>
            <li className="flex justify-start items-center gap-4">
              <InventoryIcon />
              Inventory
            </li>
            <li className="flex justify-start items-center gap-4">
              <ReportsIcon />
              Reports
            </li>
            <li className="flex justify-start items-center gap-4">
              <UsersIcon />
              Users
            </li>
            <li className="flex justify-start items-center gap-4">
              <POSIcon />
              POS
            </li>
            <li className="flex justify-start items-center gap-4">
              <RewardIcon />
              Reward
            </li>
            <li className="flex justify-start items-center gap-4">
              <SettingsIcon />
              Settings
            </li>
            <li className="flex justify-start items-center gap-4">
              <HelpIcon />
              Help
            </li>
            <li className="flex justify-start items-center gap-4">
              <PayrollIcon />
              Payroll
            </li>
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
          {
            children
          }
        </div>
      </div>
    </div>
  );
};
