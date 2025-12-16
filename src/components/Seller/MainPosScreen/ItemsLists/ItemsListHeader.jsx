import React from "react";

export const ItemsListHeader = () => {
  return (
    <>
      <div className="flex justify-center items-center  bg-(--secondary-color) ">
        <div className="border-r border-(--border-color) py-3  min-w-[5dvw] flex justify-center items-center">
          <p className="text-[1dvw] font-semibold mainFont">Qty.</p>
        </div>
        <div className="border-r border-(--border-color) py-3 w-full flex justify-center items-center">
          <p className="text-[1dvw] font-semibold mainFont">Item Name</p>
        </div>
        <div className="border-r border-(--border-color) py-3  min-w-[8dvw] shrink-0 flex justify-center items-center">
          <p className="text-[1dvw] font-semibold mainFont">Price</p>
        </div>
        <div className="border-r border-(--border-color) py-3  min-w-[8dvw] shrink-0 flex justify-center items-center">
          <p className="text-[1dvw] font-semibold mainFont">Tax Type</p>
        </div>
        <div className="border-r border-(--border-color) py-3  min-w-[8dvw] shrink-0 flex justify-center items-center">
          <p className="text-[1dvw] font-semibold mainFont">Total</p>
        </div>
        <div className="py-3  min-w-[8dvw] flex justify-center items-center shrink-0">
          <p className="text-[1dvw] font-semibold mainFont">Actions</p>
        </div>
      </div>
    </>
  );
};
