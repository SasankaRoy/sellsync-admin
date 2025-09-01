import React from 'react';
import { Layout } from "../../components/common/Layout/Layout";
import { Avatar, Switch } from "@mui/material";
import ProfileImg from "../../assets/images/ProfileImg.png";
import { Store, BarChart3, Package2, Bell, Moon } from 'lucide-react';
import {EditIcon} from '../../assets/Svgs/AllSvgs';

const SettingSeller = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <Layout>
      <div className="w-full">
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg sm:text-xl md:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Settings
            </h3>
          </div>
        </div>

        <div className="bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] p-4 sm:p-5 transition-all duration-300 ease-linear">
          {/* Profile Section */}
          <div className="w-full flex justify-between items-center border-b-2 border-[#d4d4d4]/50 px-2 sm:px-2.5 py-2 sm:py-3">
            <div>
              <h3 className="text-base sm:text-lg md:text-[1.1dvw] font-[600]">Profile</h3>
            </div>
            
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
              <h4 className="text-base sm:text-lg md:text-[1.2dvw] font-semibold">John Smith</h4>
              <p className="text-xs sm:text-sm md:text-[.9dvw] font-[var(--paraFont)] text-[#333333]/80">
                +1 323-234-5812
              </p>
              <button className="text-sm sm:text-base md:text-sm flex justify-center items-center gap-2 sm:gap-3 rounded-full font-semibold text-white bg-[var(--button-color2)] px-4 py-1.5 sm:px-8 sm:py-2 md:px-6 md:py-1.5 cursor-pointer border border-[var(--button-color2)] hover:text-[var(--button-color2)] hover:bg-white transition-all duration-300 ease-linear">
                View Profile
              </button>
            </div>
          </div>

          {/* Settings Options */}
          <div className="my-3 sm:my-4 w-full border-b-2 border-[#d4d4d4]/50 p-2">
            <div className="w-full mb-4">
              <h3 className="text-base sm:text-lg md:text-base font-semibold text-[#595959]">
                Settings
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              {/* Store Details */}
              <div className="w-full flex items-center gap-4 p-3 border border-[#B7B7B7] rounded-lg">
                <div className="bg-[#0052CC] w-12 h-12 shrink-0 flex justify-center items-center rounded-full">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm sm:text-base md:text-sm">
                    Store Details
                  </h4>
                </div>
              </div>

              {/* Sales Analytics */}
              <div className="w-full flex items-center gap-4 p-3 border border-[#B7B7B7] rounded-lg">
                <div className="bg-[#0052CC] w-12 h-12 shrink-0 flex justify-center items-center rounded-full">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm sm:text-base md:text-sm">
                    Sales Analytics
                  </h4>
                </div>
              </div>

              {/* Inventory Analytics */}
              <div className="w-full flex items-center gap-4 p-3 border border-[#B7B7B7] rounded-lg">
                <div className="bg-[#0052CC] w-12 h-12 shrink-0 flex justify-center items-center rounded-full">
                  <Package2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm sm:text-base md:text-sm">
                    Inventory Analytics
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Section */}
          <div className="my-3 sm:my-4 w-full border-b-2 border-[#d4d4d4]/50 p-2">
            <div className="w-full mb-4">
              <h3 className="text-base sm:text-lg md:text-base font-semibold text-[#595959]">
                Notifications
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              {/* Push Notifications */}
              <div className="w-full flex items-center gap-4 p-3 border border-[#B7B7B7] rounded-lg">
                <div className="bg-[#FF8A00] w-12 h-12 shrink-0 flex justify-center items-center rounded-full">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm sm:text-base md:text-sm">
                    Push Notifications
                  </h4>
                </div>
                <div>
                  <Switch
                    {...label}
                    defaultChecked={false}
                    className="toggleSwitch"
                    sx={{ 
                      "& .MuiSwitch-thumb": { backgroundColor: "#fff" },
                      "& .MuiSwitch-track": { backgroundColor: "#ccc" }
                    }}
                  />
                </div>
              </div>

              {/* Dark Mode */}
              <div className="w-full flex items-center gap-4 p-3 border border-[#B7B7B7] rounded-lg">
                <div className="bg-[#FF8A00] w-12 h-12 shrink-0 flex justify-center items-center rounded-full">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm sm:text-base md:text-sm">
                    Dark Mode
                  </h4>
                </div>
                <div>
                  <Switch
                    {...label}
                    defaultChecked={false}
                    className="toggleSwitch"
                    sx={{ 
                      "& .MuiSwitch-thumb": { backgroundColor: "#fff" },
                      "& .MuiSwitch-track": { backgroundColor: "#ccc" }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingSeller;