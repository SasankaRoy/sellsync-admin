import React from "react";
import { Switch } from "@mui/material";
import { Layout } from "../../../components/common/Layout/Layout";

export const ReceiptSettings = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const ReceiptData = [
    {
      title: "Show Business Logo",
    },
    {
      title: "Show Tax Breakdown",
    },
    {
      title: "Include Item Images",
    },
    {
      title: "Print Customer Copy",
    },
    {
      title: "Digital Receipt Delivery",
    },
  ];
  return (
    <>
      <Layout>
        <div className="w-full px-4 sm:px-6 lg:px-0">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              POS / Receipt Settings
            </h3>
          </div>
        </div>
        <div className="w-full flex-col flex gap-4 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-4 sm:px-5 min-h-[60dvh] py-5">
          <div className="flex flex-col gap-4 w-full">
            {ReceiptData.map((cur, id) => (
              <div
                className="p-3 sm:p-4 border-2 border-[#d4d4d4] rounded-xl flex justify-between items-center w-full"
                key={id}
              >
                <div>
                  <h3 className="text-lg sm:text-xl md:text-[1.8dvw] lg:text-[1.2dvw] font-semibold">
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
                  }}
                />
              </div>
            ))}
          </div>
          <div className="my-4 mt-6">
            <div className="flex flex-col gap-3 sm:gap-4 w-full">
              <label className="text-lg sm:text-xl md:text-[1.8dvw] lg:text-[1.2dvw] font-[700]">
                Footer Message
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-medium paraFont placeholder:text-[#333333]/40 text-base sm:text-lg md:text-[1.4dvw] lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 sm:py-2.5 px-4 sm:px-5"
                type="text"
                placeholder="Thank you for shopping with us!..."
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
