import React from "react";
import { Switch } from "@mui/material";
import { Layout } from "../../../components/common/Layout/Layout";

export const CustomerDisplaySetting = () => {
  const CustomerData = [
    {
      title: "Enable Customer Display",
    },
  ];
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <>
      <Layout>
        <div className="w-full px-4 sm:px-6 lg:px-0">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl md:text-3xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              POS / Customer Display Setting
            </h3>
          </div>
        </div>
        <div className="w-full flex-col flex gap-4 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-4 sm:px-5 min-h-[60dvh] py-5">
          {CustomerData.map((cur, id) => (
            <div
              className="p-3 sm:p-4 border-2 border-[#d4d4d4] rounded-xl flex justify-between items-center w-full"
              key={id}
            >
              <div>
                <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-[1.2dvw] font-semibold">
                  {cur.title}
                </h3>
              </div>
              <Switch
                {...label}
                defaultChecked
                className="toggleSwitch scale-110 sm:scale-100"
                color="#00C7E6"
                style={{
                  color: "#00C7E6",
                  transform: 'scale(1.2)'
                }}
              />
            </div>
          ))}

          <div className="my-5">
            <div className="py-4 sm:py-5 px-3 sm:px-4 border-b border-[#d4d4d4]">
              <p className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-[1.2dvw] text-gray-600">
                Layout To Show
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 sm:py-5">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="itemName1" className="w-5 h-5 sm:w-6 sm:h-6" />
                <label
                  htmlFor="itemName1"
                  className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-[1.1dvw] cursor-pointer"
                >
                  Item Name + Prices
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="itemName2" className="w-5 h-5 sm:w-6 sm:h-6" />
                <label
                  htmlFor="itemName2"
                  className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-[1.1dvw] cursor-pointer"
                >
                  Item Name + Prices
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="itemName3" className="w-5 h-5 sm:w-6 sm:h-6" />
                <label
                  htmlFor="itemName3"
                  className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-[1.1dvw] cursor-pointer"
                >
                  Item Name + Prices
                </label>
              </div>
            </div>
          </div>
          <div className="my-4">
            <div className="flex flex-col gap-3 sm:gap-4">
              <label className="text-xl sm:text-2xl md:text-3xl lg:text-[1.2dvw] font-[700]">
                File Upload
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-medium paraFont placeholder:text-[#333333]/40 text-lg sm:text-xl md:text-2xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 sm:py-3 px-4 sm:px-5"
                type="file"
                placeholder="Choose File..."
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
