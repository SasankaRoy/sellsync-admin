import React from "react";
import { Layout } from "../../../components/common/Layout/Layout";

export const Fule = () => {
  return (
    <>
      <Layout>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              POS / Fules
            </h3>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full my-8 bg-white rounded-md border border-[#d4d4d4] p-5">
          <div className="">
            <h3 className="font-semibold text-[1.3dvw]">Current Fule Price</h3>
            <div className="my-4 border-b p-4 border-[#d4d4d4]">
              <div className="flex justify-start items-center gap-3 mb-4">
                <h4 className="text-[1.2dvw] font-semibold">REG</h4>
                <p className="text-[1dvw] font-medium text-gray-600">Regular</p>
              </div>
              <div className="flex justify-start items-center gap-4 w-[60%]">
                <div className="flex flex-col gap-3 flex-1">
                  <label className="text-[1dvw] font-[700]">Cash</label>
                  <input
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                    type="number" placeholder="price.."
                  />
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <label className="text-[1dvw] font-[700]">Credit</label>
                  <input
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                    type="number" placeholder="price.."
                  />
                </div>
              </div>
            </div>

            <div className="my-4 border-b p-4 border-[#d4d4d4]">
              <div className="flex justify-start items-center gap-3 mb-4">
                <h4 className="text-[1.2dvw] font-semibold">MID</h4>
                <p className="text-[1dvw] font-medium text-gray-600">Plus</p>
              </div>
              <div className="flex justify-start items-center gap-4 w-[60%]">
                <div className="flex flex-col gap-3 flex-1">
                  <label className="text-[1dvw] font-[700]">Cash</label>
                  <input
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                    type="number" placeholder="price.."
                  />
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <label className="text-[1dvw] font-[700]">Credit</label>
                  <input
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                    type="number" placeholder="price.."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
