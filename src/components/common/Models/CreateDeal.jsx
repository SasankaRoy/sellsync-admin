import { CircleX } from "lucide-react";
import React from "react";

export const CreateDeal = ({ setNewDeal }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
      <div className="bg-white w-[95%] sm:w-[80%] md:w-[70%] lg:w-[50%] p-4 sm:p-5 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center w-full p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.5dvw] font-semibold">
            Create a Deal
          </h3>
          <button
            onClick={() => {
              setNewDeal(false);
            }}
            className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
          >
            <CircleX size={30} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full my-4">
          <div className="w-full my-4 flex flex-col gap-2">
            <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
              Deal Name
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              placeholder="Enter Deal Name..."
              name="deal_name"
              required
            />
          </div>

          <div className="w-full my-4 flex flex-col gap-2">
            <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
              Deal Type
            </label>
            <select
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              name="deal_type"
              required
            >
              <option value="">Select Deal Type</option>
              <option value="buy_x_qty_at_y_price">Buy X Qty at $Y</option>
              <option value="buy_x_qty_and_get_y_percent_off">
                Buy X Qty and Get Y% Off
              </option>
            </select>
          </div>

          <div className="w-full my-4 flex flex-col gap-2">
            <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
              Start Date
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="date"
              name="start_date"
              max={new Date().toISOString().split("T")[0]}
              pattern="\d{4}-\d{2}-\d{2}"
              required
            />
          </div>
          <div className="w-full my-4 flex flex-col gap-2">
            <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
              End Date
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="date"
              name="end_date"
              max={new Date().toISOString().split("T")[0]}
              pattern="\d{4}-\d{2}-\d{2}"
              required
            />
          </div>
          <div className="w-full my-4 flex flex-col gap-2">
            <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
              Deal Quantity
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="number"
              placeholder="Enter Quantity"
              required
            />
          </div>
          <div className="w-full my-4 flex flex-col gap-2">
            <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
              Deal price
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="number"
              placeholder="Enter Price"
              required
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-end items-center my-4">
          <button
            type="button"
            onClick={() => {
              setNewDeal(false);
            }}
            className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300 disabled:opacity-80 disabled:pointer-events-none disabled:cursor-not-allowed"
            // disabled={isLoading}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
