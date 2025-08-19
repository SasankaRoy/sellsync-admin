import React, { useMemo, useState } from "react";
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
      <div className="bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] p-4 sm:p-5 transition-all duration-300 ease-linear">
        <div className="w-full flex justify-between items-center border-b-2 border-[#d4d4d4]/50 px-2 sm:px-2.5 py-2 sm:py-3">
          <div>
            <h3 className="text-base sm:text-lg md:text-[1.1dvw] font-[600]">General</h3>
          </div>
          <button className="flex items-center gap-2 sm:gap-3 bg-[var(--button-color1)] text-white px-3 py-1 sm:px-5 sm:py-1.5 md:px-4 md:py-1 rounded-full cursor-pointer font-[500] text-sm sm:text-base md:text-sm">
            <EditIcon />
            Edit
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 my-3 sm:my-4 py-3 sm:py-4 border-b-2 border-[#d4d4d4]/50">
          <Avatar
            src={ProfileImg}
            alt="Profile"
            sx={{
              width: "80px",
              height: "80px",
              "@media (min-width: 640px)": { width: "100px", height: "100px" },
              "@media (min-width: 768px)": { width: "8dvw", height: "8dvw" },
              "@media (min-width: 768px) and (max-width: 991px)": { width: "100px", height: "100px" },
            }}
            className="border-2 p-1 border-[var(--button-color2)]/70"
          />
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h4 className="text-base sm:text-lg md:text-[1.2dvw] font-semibold">Profile Picture</h4>
            <p className="text-xs sm:text-sm md:text-[.9dvw] font-[var(--paraFont)] text-[#333333]/80">
              Change or remove Your profile Picture
            </p>
            <button className="text-sm sm:text-base  md:text-sm flex justify-center items-center gap-2 sm:gap-3 rounded-full font-semibold text-white bg-[var(--button-color2)] px-4 py-1.5 sm:px-8 sm:py-2 md:px-6 md:py-1.5 cursor-pointer border border-[var(--button-color2)] hover:text-[var(--button-color2)] hover:bg-white transition-all duration-300 ease-linear">
              <Camera size={16} className="sm:w-5 sm:h-5" />
              Change Picture
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 my-3 py-4 sm:py-5 px-1 border-b-2 border-[#d4d4d4]/50">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm sm:text-base md:text-sm font-[700]">Username</label>
            <input
              type="text"
              placeholder="Eve Lopez"
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-sm border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-1.5 sm:py-2 px-3"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm sm:text-base md:text-sm font-[700]">Phone Number</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-sm border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-1.5 sm:py-2 px-3"
              type="text"
              placeholder="+1 384-824-9822"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm sm:text-base md:text-sm font-[700]">Email ID</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-sm border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-1.5 sm:py-2 px-3"
              type="email"
              placeholder="Eveexample@gmail.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 my-3 py-4 sm:py-5 px-1 border-b-2 border-[#d4d4d4]/50">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm sm:text-base md:text-sm font-[700]">Password</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-sm border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-1.5 sm:py-2 px-3"
              type="password"
              placeholder="******"
            />
          </div>
          <div className="flex items-start sm:items-center justify-center">
            <button className="text-white flex justify-center items-center py-2 sm:py-3 md:py-2.5 bg-[var(--button-color2)] font-semibold font-[var(--paraFont)] w-full rounded-full cursor-pointer border border-[var(--button-color2)] hover:text-[var(--button-color2)] hover:bg-white transition-all duration-300 ease-linear text-sm sm:text-base md:text-sm">
              Change Password
            </button>
          </div>
        </div>

        <div className="my-3 sm:my-4 w-full border-b-2 border-[#d4d4d4]/50 p-2">
          <div className="w-full">
            <h3 className="text-base sm:text-lg md:text-base font-semibold text-[#595959]">
              Notification
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 my-3">
            <div className="w-full flex flex-col sm:flex-row gap-3 justify-start sm:justify-center items-center shrink-0 border border-[#B7B7B7] rounded-lg sm:rounded-full p-2">
              <div className="bg-[#D21B1B] w-10 h-10 sm:w-12 sm:h-12 md:w-10 md:h-10 shrink-0 flex justify-center items-center rounded-full">
                <LowStockIcon2 />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 w-full">
                <div>
                  <h4 className="font-semibold text-sm sm:text-base md:text-sm">
                    Low Stock Notifications
                  </h4>
                  <p className="text-xs sm:text-sm md:text-[.9dvw] font-[var(--paraFont)] text-[#333333]/70">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    aliquet id neque sit amet pretium.
                  </p>
                </div>
                <div>
                  <Switch
                    {...label}
                    defaultChecked
                    className="toggleSwitch"
                    sx={{ "& .MuiSwitch-thumb": { backgroundColor: "#00C7E6" } }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-3 justify-start sm:justify-center items-center shrink-0 border border-[#B7B7B7] rounded-lg sm:rounded-full p-2">
              <div className="bg-[#7F7F7F] w-10 h-10 sm:w-12 sm:h-12 md:w-10 md:h-10 shrink-0 flex justify-center items-center rounded-full">
                <ReportNoticationIcon />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 w-full">
                <div>
                  <h4 className="font-semibold text-sm sm:text-base md:text-sm">
                    Enable Report Notification
                  </h4>
                  <p className="text-xs sm:text-sm md:text-[.9dvw] font-[var(--paraFont)] text-[#333333]/70">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    aliquet id neque sit amet pretium.
                  </p>
                </div>
                <div>
                  <Switch
                    {...label}
                    defaultChecked
                    className="toggleSwitch"
                    sx={{ "& .MuiSwitch-thumb": { backgroundColor: "#fff" } }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-3 sm:my-4 w-full border-b-2 border-[#d4d4d4]/50 p-2">
          <div className="w-full">
            <h3 className="text-base sm:text-lg md:text-base font-semibold text-[#595959]">
              App Language & Currency
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row justify-start sm:justify-center items-center gap-3 sm:gap-4 my-3 sm:my-4">
            <div className="w-full">
              <CountrySelect
                placeHolder="English"
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-sm border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-1.5 sm:py-2 px-3"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-sm border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-1.5 sm:py-2 px-3"
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
      <div className="bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] p-4 sm:p-5 transition-all duration-300 ease-linear">
        <div className="w-full flex justify-between items-center border-b-2 border-[#d4d4d4]/50 px-2 sm:px-2.5 py-2 sm:py-3">
          <div>
            <h3 className="text-base sm:text-lg md:text-[1.1dvw] font-[600]">Business Info</h3>
          </div>
          <button className="flex items-center gap-2 sm:gap-3 bg-[var(--button-color1)] text-white px-3 py-1 sm:px-5 sm:py-1.5 md:px-4 md:py-1 rounded-full cursor-pointer font-[500] text-sm sm:text-base md:text-sm">
            <EditIcon />
            Edit
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 my-3 sm:my-4 py-3 sm:py-4 border-b-2 border-[#d4d4d4]/50">
          <Avatar
            src={BLogo}
            alt="business-logo"
            sx={{
              width: "80px",
              height: "80px",
              "@media (min-width: 640px)": { width: "100px", height: "100px" },
              "@media (min-width: 768px)": { width: "8dvw", height: "8dvw" },
              "@media (min-width: 768px) and (max-width: 991px)": { width: "100px", height: "100px" },
            }}
            className="border-2 p-1 border-[var(--button-color2)]/70"
          />
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h4 className="text-base sm:text-lg md:text-[1.2dvw] font-semibold">Business Logo</h4>
            <p className="text-xs sm:text-sm md:text-[.9dvw] font-[var(--paraFont)] text-[#333333]/80">
              Change or remove Your Business Logo
            </p>
            <button className="text-sm sm:text-base md:text-sm flex justify-center items-center gap-2 sm:gap-3 rounded-full font-semibold text-white bg-[var(--button-color2)] px-4 py-1.5 sm:px-8 sm:py-2 md:px-6 md:py-1.5 cursor-pointer border border-[var(--button-color2)] hover:text-[var(--button-color2)] hover:bg-white transition-all duration-300 ease-linear">
              <Camera size={16} className="sm:w-5 sm:h-5" />
              Change Logo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 my-3 py-4 sm:py-5 px-1 border-b-2 border-[#d4d4d4]/50">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm sm:text-base md:text-sm font-[700]">Business Name</label>
            <input
              type="text"
              placeholder="Pheonix pvt"
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-sm border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-1.5 sm:py-2 px-3"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm sm:text-base md:text-sm font-[700]">Contact Number</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-sm border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-1.5 sm:py-2 px-3"
              type="text"
              placeholder="+1 384-824-9822"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm sm:text-base md:text-sm font-[700]">Email ID</label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-sm border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-1.5 sm:py-2 px-3"
              type="email"
              placeholder="pheonixexample@gmail.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 my-3 py-4 sm:py-5 px-1 border-b-2 border-[#d4d4d4]/50">
          <div className="flex flex-col gap-2 w-full col-span-1 sm:col-span-2">
            <label className="text-sm sm:text-base md:text-sm font-[700] flex justify-start items-center gap-3 sm:gap-4">
              <LocateFixedIcon size={16} className="sm:w-5 sm:h-5" />
              Location
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-sm border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-1.5 sm:py-2 px-3"
              type="text"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          </div>
          <div className="flex items-start sm:items-center justify-center">
            <button className="text-white flex justify-center items-center py-2 sm:py-3 md:py-2.5 bg-[var(--button-color2)] font-semibold font-[var(--paraFont)] w-full rounded-full cursor-pointer border border-[var(--button-color2)] hover:text-[var(--button-color2)] hover:bg-white transition-all duration-300 ease-linear text-sm sm:text-base md:text-sm">
              Change Location
            </button>
          </div>
        </div>

        <div className="my-3 sm:my-4 w-full border-b-2 border-[#d4d4d4]/50 p-2">
          <div className="w-full">
            <h3 className="text-base sm:text-lg md:text-base font-semibold text-[#595959]">
              Notification
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 my-3">
            <div className="w-full flex flex-col sm:flex-row gap-3 justify-start sm:justify-center items-center shrink-0 border border-[#B7B7B7] rounded-lg sm:rounded-full p-2">
              <div className="bg-[#D21B1B] w-10 h-10 sm:w-12 sm:h-12 md:w-10 md:h-10 shrink-0 flex justify-center items-center rounded-full">
                <LowStockIcon2 />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 w-full">
                <div>
                  <h4 className="font-semibold text-sm sm:text-base md:text-sm">
                    Low Stock Notifications
                  </h4>
                  <p className="text-xs sm:text-sm md:text-[.9dvw] font-[var(--paraFont)] text-[#333333]/70">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    aliquet id neque sit amet pretium.
                  </p>
                </div>
                <div>
                  <Switch
                    {...label}
                    defaultChecked
                    className="toggleSwitch"
                    sx={{ "& .MuiSwitch-thumb": { backgroundColor: "#00C7E6" } }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-3 justify-start sm:justify-center items-center shrink-0 border border-[#B7B7B7] rounded-lg sm:rounded-full p-2">
              <div className="bg-[#7F7F7F] w-10 h-10 sm:w-12 sm:h-12 md:w-10 md:h-10 shrink-0 flex justify-center items-center rounded-full">
                <ReportNoticationIcon />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 w-full">
                <div>
                  <h4 className="font-semibold text-sm sm:text-base md:text-sm">
                    Enable Report Notification
                  </h4>
                  <p className="text-xs sm:text-sm md:text-[.9dvw] font-[var(--paraFont)] text-[#333333]/70">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    aliquet id neque sit amet pretium.
                  </p>
                </div>
                <div>
                  <Switch
                    {...label}
                    defaultChecked
                    className="toggleSwitch"
                    sx={{ "& .MuiSwitch-thumb": { backgroundColor: "#fff" } }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-3 sm:my-4 w-full border-b-2 border-[#d4d4d4]/50 p-2">
          <div className="w-full">
            <h3 className="text-base sm:text-lg md:text-base font-semibold text-[#595959]">
              App Language & Currency
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row justify-start sm:justify-center items-center gap-3 sm:gap-4 my-3 sm:my-4">
            <div className="w-full">
              <CountrySelect
                placeHolder="English"
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-sm border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-1.5 sm:py-2 px-3"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-sm border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-1.5 sm:py-2 px-3"
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
      editable: false,
    };
  }, []);

  return (
    <>
      <div className="transition-all duration-300 ease-linear">
        <div className="w-full flex-col flex gap-2 my-4 sm:my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2 sm:px-2.5 py-2 h-[60dvh] sm:h-[70dvh] overflow-x-hidden sm:overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1 sm:py-1.5 shrink-0 gap-2 sm:gap-0">
  <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
    <select className="font-[500] mainFont px-3 sm:px-4 border-none outline-none text-xs sm:text-sm md:text-sm lg:text-base">
      <option>All Data</option>
      <option>All Data</option>
      <option>All Data</option>
    </select>
    <div className="h-6 w-6 sm:h-7 sm:w-7 bg-[var(--counterBg-color)] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem]">
      <p className="text-xs font-medium text-white">
        {rowData.length}
      </p>
    </div>
  </div>
  <div className="flex gap-2 sm:gap-4 justify-between items-center flex-wrap">
    <button className="px-4 py-2 sm:px-4 sm:py-1 md:px-3 md:py-1 text-xs sm:text-sm md:text-sm border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC] mainFont font-[500] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
      Add New Data +
    </button>
    
      <DeleteIcon className="w-4 h-4 sm:w-5 sm:h-5" />
    
  </div>
</div>


          <div className="h-full w-full overflow-x-hidden sm:overflow-x-auto">
            <div className="min-w-[800px] h-full">
              <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
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
      </div>
    </>
  );
};

const BusinessDocumentsTab = () => {
  const [rowData, setRowData] = useState([
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
    },
    {
      DocumentName: "Tax Certificate 2025",
      Type: "License",
      UploadBy: "Admin",
      ExpiryDate: "15/09/2024",
      Status: "Active",
      Action: "View",
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
      editable: false,
    };
  }, []);

  return (
    <div className="transition-all duration-300 ease-linear">
      <div className="w-full flex-col flex gap-2 my-4 sm:my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2 sm:px-2.5 py-2 h-[60dvh] sm:h-[70dvh] overflow-x-hidden sm:overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-stretch sm:items-center py-1 sm:py-1.5 shrink-0 gap-2 sm:gap-0">
          <div className="flex justify-between sm:justify-center items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <select className="font-[500] mainFont px-3 sm:px-4 border-none outline-none text-xs sm:text-sm md:text-sm lg:text-base">
              <option>All Documents</option>
              <option>All Documents</option>
              <option>All Documents</option>
            </select>
            <div className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[var(--counterBg-color)] rounded-full flex justify-center items-center min-w-[1.25rem] min-h-[1.25rem] sm:min-w-[1.5rem] sm:min-h-[1.5rem] md:min-w-[1.75rem] md:min-h-[1.75rem]">
              <p className="text-[10px] sm:text-xs md:text-xs lg:text-[1dvw] font-[500] text-white">
                {rowData.length}
              </p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4 justify-between sm:justify-end items-center flex-wrap">
            <button className="px-2 py-2 sm:px-4 sm:py-1 md:px-3 md:py-1 text-xs sm:text-sm md:text-sm border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC] mainFont font-[500] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
              Add New Documents +
            </button>
            <button>
              <DeleteIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
        <div className="h-full w-full overflow-x-hidden sm:overflow-x-auto">
          <div className="min-w-[800px] h-full">
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
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
    </div>
  );
};

export const Settings = () => {
  const [currentActiveTab, setCurrentActiveTab] = useState("General");
  const handleChangeTab = (tabName) => {
    setCurrentActiveTab(tabName);
  };

  const handleCheckCurrentTabRender = () => {
    switch (currentActiveTab) {
      case "General":
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
            <h3 className="text-lg sm:text-xl md:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Settings
            </h3>
          </div>
        </div>

        <div className="bg-[#E6E6E6] p-1.5 sm:p-2 rounded-full w-full sm:w-auto my-4 sm:my-5 flex overflow-x-hidden sm:overflow-x-auto flex-shrink-0 justify-start sm:justify-center sm:inline-flex gap-1.5 sm:gap-3">
          <button
            onClick={() => handleChangeTab("General")}
            className={`${
              currentActiveTab === "General"
                ? "bg-white text-black"
                : "bg-transparent text-[#333333]/70"
            } border-none outline-none px-3 py-0.5 sm:px-8 sm:py-1 flex-shrink-0 md:px-6 md:py-1 text-xs sm:text-sm md:text-sm cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
          >
            General
          </button>

          <button
            onClick={() => handleChangeTab("BusinessInfo")}
            className={`${
              currentActiveTab === "BusinessInfo"
                ? "bg-white text-black"
                : "bg-transparent text-[#333333]/70"
            } border-none outline-none px-3 py-0.5 sm:px-8 sm:py-1 flex-shrink-0 md:px-6 md:py-1 text-xs sm:text-sm md:text-sm cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
          >
            Business Info
          </button>
          <button
            onClick={() => handleChangeTab("ScanData")}
            className={`${
              currentActiveTab === "ScanData"
                ? "bg-white text-black"
                : "bg-transparent text-[#333333]/70"
            } border-none outline-none px-3 py-0.5 sm:px-8 sm:py-1 flex-shrink-0 md:px-6 md:py-1 text-xs sm:text-sm md:text-sm cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
          >
            Scan Data
          </button>
          <button
            onClick={() => handleChangeTab("BusinessDocuments")}
            className={`${
              currentActiveTab === "BusinessDocuments"
                ? "bg-white text-black"
                : "bg-transparent text-[#333333]/70"
            } border-none outline-none px-3 py-0.5 sm:px-8 sm:py-1 flex-shrink-0 md:px-6 md:py-1 text-xs sm:text-sm md:text-sm cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
          >
            Business Documents
          </button>
        </div>

        {handleCheckCurrentTabRender()}
      </div>
    </Layout>
  );
};