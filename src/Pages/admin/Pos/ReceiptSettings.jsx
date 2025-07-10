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
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              POS / Receipt Settings
            </h3>
          </div>
        </div>
        <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-5  min-h-[60dvh] py-5">
          <div className="flex flex-col gap-4">
            {ReceiptData.map((cur, id) => (
              <div
                className="p-3 border-2 border-[#d4d4d4] rounded-xl flex justify-between items-center"
                key={id}
              >
                <div>
                  <h3 className="text-[2dvw] font-semibold">{cur.title}</h3>
                </div>
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
            ))}
          </div>
          <div className="my-4">
            <div className="flex flex-col gap-4">
              <label className="text-[1dvw] font-[700]">Footer Message</label>
              <input
                className="bg-[#F3F3F3] w-full font-medium paraFont  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                type="text"
                placeholder="Thank  you for shopping with us!..."
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
