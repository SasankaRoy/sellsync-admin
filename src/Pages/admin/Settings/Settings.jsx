import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import {
  DeleteIcon,
  EditIcon,
  LowStockIcon2,
  ReportNoticationIcon,
} from "../../../assets/Svgs/AllSvgs";
import { Avatar, Switch } from "@mui/material";
import ProfileImg from "../../../assets/images/ProfileImg.png";
import BLogo from "../../../assets/images/BLogo.png";
import { Camera, LocateFixedIcon } from "lucide-react";

import { CountrySelect } from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

const GeneralTab = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <>
      <div className="bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] p-5 transition-all duration-300 ease-linear">
        <div className="w-full flex justify-between items-center border-b-2 border-[#d4d4d4]/50 px-2.5 py-3">
          <div>
            <h3 className="text-[1.1dvw] font-[600]">General</h3>
          </div>
          <button className="flex items-center gap-3 bg-[var(--button-color1)] text-white px-5 py-1.5 rounded-full cursor-pointer font-[500] text-[1dvw]">
            <EditIcon />
            Edit
          </button>
        </div>

        <div className="flex items-center gap-3 my-4 py-4 border-b-2 border-[#d4d4d4]/50">
          <Avatar
            src={ProfileImg}
            alt="Profile"
            sx={{
              width: "8dvw",
              height: "8dvw",
            }}
            className="border-2 p-1 border-[var(--button-color2)]/70"
          />
          <div className="flex flex-col gap-2">
            <h4 className="text-[1.2dvw] font-semibold">Profile Picture</h4>
            <p className="text-[.9dvw] font-[var(--paraFont)] text-[#333333]/80">
              Change or remove Your profile Picture
            </p>
            <button className="text-[1dvw] flex justify-center items-center gap-3 rounded-full font-semibold text-white bg-[var(--button-color2)] px-8 py-2 cursor-pointer border border-[var(--button-color2)] hover:text-[var(--button-color2)] hover:bg-white transition-all duration-300 ease-linear">
              <Camera size={20} />
              Change Picture
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 my-3 py-5 px-1 border-b-2 border-[#d4d4d4]/50 ">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[1dvw] font-[700]">Username</label>
            <input
              type="text"
              placeholder="Eve Lopez"
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-[1dvw] font-[700]">Phone Number</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
              type="text"
              placeholder="+1 384-824-9822"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[1dvw] font-[700]">Email ID</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
              type="email"
              placeholder="Eveexample@gmail.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 my-3 py-5 px-1 border-b-2 border-[#d4d4d4]/50 ">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[1dvw] font-[700]">Password</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
              type="password"
              placeholder="******"
            />
          </div>
          <div className="flex items-center justify-center">
            <button className="text-white flex justify-center items-center py-3 bg-[var(--button-color2)] font-semibold font-[var(--paraFont)] w-full rounded-full cursor-pointer border border-[var(--button-color2)] hover:text-[var(--button-color2)] hover:bg-white transition-all duration-300 ease-linear">
              Change Password
            </button>
          </div>
        </div>

        <div className="my-4 w-full border-b-2 border-[#d4d4d4]/50 p-2">
          <div className="w-full">
            <h3 className="text-[1.3dvw] font-semibold text-[#595959]">
              Notification
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-5 my-3">
            <div className="w-full flex gap-3 justify-center items-center shrink-0 border border-[#B7B7B7] rounded-full p-2">
              <div className="bg-[#D21B1B] w-[3dvw] shrink-0 h-[3dvw] flex justify-center items-center rounded-full">
                <LowStockIcon2 />
              </div>
              <div className="flex justify-between items-center gap-3">
                <div>
                  <h4 className="font-semibold text-[1.1dvw]">
                    Low Stock Notifications
                  </h4>
                  <p className="text-[.9dvw] font-[var(--paraFont)] text-[#333333]/70">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    aliquet id neque sit amet pretium.
                  </p>
                </div>
                <div>
                  <Switch
                    {...label}
                    defaultChecked
                    className="toggleSwitch"
                    color="#00C7E6"
                    style={{
                      color: "#00C7E6",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex gap-3 justify-center items-center shrink-0 border border-[#B7B7B7] rounded-full p-2">
              <div className="bg-[#7F7F7F] w-[3dvw] shrink-0 h-[3dvw] flex justify-center items-center rounded-full">
                <ReportNoticationIcon />
              </div>
              <div className="flex justify-between items-center gap-3">
                <div>
                  <h4 className="font-semibold text-[1.1dvw]">
                    Enable Report Notification
                  </h4>
                  <p className="text-[.9dvw] font-[var(--paraFont)] text-[#333333]/70">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    aliquet id neque sit amet pretium.
                  </p>
                </div>
                <div>
                  <Switch
                    {...label}
                    defaultChecked
                    className="toggleSwitch"
                    color="#fff"
                    style={{
                      color: "#fff",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-4 w-full border-b-2 border-[#d4d4d4]/50 p-2">
          <div className="w-full">
            <h3 className="text-[1.3dvw] font-semibold text-[#595959]">
              App Language & Currency
            </h3>
          </div>

          <div className="flex justify-start items-center gap-4 my-4">
            <div>
              <CountrySelect
                placeHolder="English"
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
              />
            </div>
            <div>
              <input
                type="text"
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                placeholder=" $ US Dollar"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const BusinessInfoTab = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <>
      <div className="bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] p-5 transition-all duration-300 ease-linear">
        <div className="w-full flex justify-between items-center border-b-2 border-[#d4d4d4]/50 px-2.5 py-3">
          <div>
            <h3 className="text-[1.1dvw] font-[600]">Business Info</h3>
          </div>
          <button className="flex items-center gap-3 bg-[var(--button-color1)] text-white px-5 py-1.5 rounded-full cursor-pointer font-[500] text-[1dvw]">
            <EditIcon />
            Edit
          </button>
        </div>

        <div className="flex items-center gap-3 my-4 py-4 border-b-2 border-[#d4d4d4]/50">
          <Avatar
            src={BLogo}
            alt="business-logo"
            sx={{
              width: "8dvw",
              height: "8dvw",
            }}
            className="border-2 p-1 border-[var(--button-color2)]/70"
          />
          <div className="flex flex-col gap-2">
            <h4 className="text-[1.2dvw] font-semibold">Business Logo</h4>
            <p className="text-[.9dvw] font-[var(--paraFont)] text-[#333333]/80">
              Change or remove Your Business Logo
            </p>
            <button className="text-[1dvw] flex justify-center items-center gap-3 rounded-full font-semibold text-white bg-[var(--button-color2)] px-8 py-2 cursor-pointer border border-[var(--button-color2)] hover:text-[var(--button-color2)] hover:bg-white transition-all duration-300 ease-linear">
              <Camera size={20} />
              Change Logo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 my-3 py-5 px-1 border-b-2 border-[#d4d4d4]/50 ">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[1dvw] font-[700]">Business Name</label>
            <input
              type="text"
              placeholder="Pheonix pvt"
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-[1dvw] font-[700]">Contact Number</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
              type="text"
              placeholder="+1 384-824-9822"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[1dvw] font-[700]">Email ID</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
              type="email"
              placeholder="pheonixexample@gmail.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 my-3 py-5 px-1 border-b-2 border-[#d4d4d4]/50 ">
          <div className="flex flex-col gap-2 w-full col-span-2">
            <label className="text-[1dvw] font-[700] flex justify-start items-center gap-4">
              <LocateFixedIcon />
              Location
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
              type="text"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
            />
          </div>
          <div className="flex items-center justify-center">
            <button className="text-white flex justify-center items-center py-3 bg-[var(--button-color2)] font-semibold font-[var(--paraFont)] w-full rounded-full cursor-pointer border border-[var(--button-color2)] hover:text-[var(--button-color2)] hover:bg-white transition-all duration-300 ease-linear">
              Change Location
            </button>
          </div>
        </div>

        <div className="my-4 w-full border-b-2 border-[#d4d4d4]/50 p-2">
          <div className="w-full">
            <h3 className="text-[1.3dvw] font-semibold text-[#595959]">
              Notification
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-5 my-3">
            <div className="w-full flex gap-3 justify-center items-center shrink-0 border border-[#B7B7B7] rounded-full p-2">
              <div className="bg-[#D21B1B] w-[3dvw] shrink-0 h-[3dvw] flex justify-center items-center rounded-full">
                <LowStockIcon2 />
              </div>
              <div className="flex justify-between items-center gap-3">
                <div>
                  <h4 className="font-semibold text-[1.1dvw]">
                    Low Stock Notifications
                  </h4>
                  <p className="text-[.9dvw] font-[var(--paraFont)] text-[#333333]/70">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    aliquet id neque sit amet pretium.
                  </p>
                </div>
                <div>
                  <Switch
                    {...label}
                    defaultChecked
                    className="toggleSwitch"
                    color="#00C7E6"
                    style={{
                      color: "#00C7E6",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex gap-3 justify-center items-center shrink-0 border border-[#B7B7B7] rounded-full p-2">
              <div className="bg-[#7F7F7F] w-[3dvw] shrink-0 h-[3dvw] flex justify-center items-center rounded-full">
                <ReportNoticationIcon />
              </div>
              <div className="flex justify-between items-center gap-3">
                <div>
                  <h4 className="font-semibold text-[1.1dvw]">
                    Enable Report Notification
                  </h4>
                  <p className="text-[.9dvw] font-[var(--paraFont)] text-[#333333]/70">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    aliquet id neque sit amet pretium.
                  </p>
                </div>
                <div>
                  <Switch
                    {...label}
                    defaultChecked
                    className="toggleSwitch"
                    color="#fff"
                    style={{
                      color: "#fff",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-4 w-full border-b-2 border-[#d4d4d4]/50 p-2">
          <div className="w-full">
            <h3 className="text-[1.3dvw] font-semibold text-[#595959]">
              App Language & Currency
            </h3>
          </div>

          <div className="flex justify-start items-center gap-4 my-4">
            <div>
              <CountrySelect
                placeHolder="English"
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
              />
            </div>
            <div>
              <input
                type="text"
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                placeholder=" $ US Dollar"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const ScanDataTab = () => {
  const [rowData, setRowData] = useState([
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
    {
      ProductName: "CrystalIce Premium Vodka",
      "ScanDate&Time": "5 April 2025 8:20 AM",
      Barcode: "0123456789012",
      Qty: "03",
      UnitPrice: "$ 20",
      Total: "$ 60",
      POS: "POS - 02",
      Cashier: "John D.",
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "ProductName" },
    { field: "ScanDate&Time" },
    { field: "Barcode" },
    { field: "Qty" },
    { field: "UnitPrice" },
    { field: "Total" },
    { field: "POS" },
    { field: "Cashier" },
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
      <div className="transition-all duration-300 ease-linear">
        <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[70dvh]">
          <div className="flex justify-between items-center py-1.5 shrink-0">
            <div className="flex justify-center items-center gap-3">
              <select className="font-[500] mainFont px-4 border-none outline-none">
                <option>All Data</option>
                <option>All Data</option>
                <option>All Data</option>
              </select>
              <p className="px-3 text-[1dvw] py-.5 bg-[#333333]/70 rounded-2xl font-[500] border-none text-white">
                8,607
              </p>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <button className="flex justify-center items-center gap-2 px-4 py-1 text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                Add New Data +
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
    </>
  );
};
const BusinessDocumentsTab = () => {
    const [rowData, setRowData] = useState([
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
        {
            DocumentName:'Tax Certificate 2025',
            Type:'License',
            UploadBy:'Admin',
            ExpiryDate:'15/09/2024',
            Status:'Active',
            Action:"View"
        },
    ]);
    
      // Column Definitions: Defines & controls grid columns.
      const [colDefs, setColDefs] = useState([
        { field: "DocumentName" },
        { field: "Type" },
        { field: "UploadBy" },
        { field: "ExpiryDate" },
        { field: "Status" },
        { field: "Action" },
        
      ]);
    
      // Apply settings across all columns
      const defaultColDef = useMemo(() => {
        return {
          filter: true,
          editable: true,
        };
      }, []);
  return (
    <div className="transition-all duration-300 ease-linear">
        <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[70dvh]">
          <div className="flex justify-between items-center py-1.5 shrink-0">
            <div className="flex justify-center items-center gap-3">
              <select className="font-[500] mainFont px-4 border-none outline-none">
                <option>All Documents</option>
                <option>All Documents</option>
                <option>All Documents</option>
              </select>
              <p className="px-3 text-[1dvw] py-.5 bg-[#333333]/70 rounded-2xl font-[500] border-none text-white">
                8,607
              </p>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <button className="flex justify-center items-center gap-2 px-4 py-1 text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
              Add New Documents +
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
  );
};

export const Settings = () => {
  const [currentActiveTab, setCurrentActiveTab] = useState("Genral");
  const handleChangeTab = (tabName) => {
    setCurrentActiveTab(tabName);
  };

  const handleCheckCurrentTabRender = () => {
    switch (currentActiveTab) {
      case "Genral":
        return <GeneralTab />;
      case "BusinessInfo":
        return <BusinessInfoTab />;
      case "ScanData":
        return <ScanDataTab />;
      case "BusinessDocuments":
        return <BusinessDocumentsTab />;
      default:
        return <GeneralTab />;
    }
  };

  return (
    <Layout>
      <div className="w-full">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Settings
            </h3>
          </div>
        </div>

        <div className="bg-[#E6E6E6] p-2 rounded-full w-auto  my-5 inline-flex gap-3">
          <button
            onClick={() => handleChangeTab("Genral")}
            className={` ${
              currentActiveTab === "Genral"
                ? "bg-white text-black"
                : "bg-transparent text-[#333333]/70"
            } border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
          >
            General
          </button>

          <button
            onClick={() => handleChangeTab("BusinessInfo")}
            className={` ${
              currentActiveTab === "BusinessInfo"
                ? "bg-white text-black"
                : "bg-transparent text-[#333333]/70"
            }   border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold`}
          >
            Business Info
          </button>
          <button
            onClick={() => handleChangeTab("ScanData")}
            className={` ${
              currentActiveTab === "ScanData"
                ? "bg-white text-black"
                : "bg-transparent text-[#333333]/70"
            }   border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold`}
          >
            Scan Data
          </button>
          <button
            onClick={() => handleChangeTab("BusinessDocuments")}
            className={` ${
              currentActiveTab === "BusinessDocuments"
                ? "bg-white text-black"
                : "bg-transparent text-[#333333]/70"
            }   border-none outline-none px-8 py-1 text-[.9dvw] cursor-pointer rounded-full font-semibold`}
          >
            Business Documents
          </button>
        </div>

        {handleCheckCurrentTabRender()}
      </div>
    </Layout>
  );
};
