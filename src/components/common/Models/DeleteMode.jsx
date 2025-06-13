import { CircleX } from "lucide-react";
import React from "react";

export const DeleteModel = ({ setDeleteModel, productId }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
        <div className="w-[50%] p-5 bg-white rounded-xl shadow-md flex flex-col gap-4">
          <div className="flex justify-between items-center w-full p-3 rounded-md text-white bg-[var(--sideMenu-color)]">
            <h3 className="text-[1.5dvw] font-semibold">Delete Item</h3>
            <button
              onClick={() => {
                setDeleteModel({
                  showDeleteModel: false,
                  productId: null,
                });
              }}
              className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
            >
              <CircleX size={30} />
            </button>
          </div>

          
          <p className="text-[1.2dvw] font-semibold font-[var(--paraFont)]">
            Product Id <span className="italic">"{productId}"</span> will be{" "}
            <span className="text-[var(--Negative-color)] font-bold font-[var(--paraFont)] text-[1.3dvw]">
              Removed
            </span>{" "}
            from the Inventory.
          </p>
          <div className="flex justify-end items-center gap-4">
            <button
              onClick={() => {
                setDeleteModel({
                  showDeleteModel: false,
                  productId: null,
                });
              }}
              className="bg-[var(--button-color4)] text-white px-5 py-1.5 rounded-md flex justify-center items-center font-semibold text-[1.1dvw] cursor-pointer"
            >
              Cancel
            </button>
            <button className="bg-[var(--Negative-color)] text-white px-5 py-1.5 rounded-md flex justify-center items-center font-semibold text-[1.1dvw] cursor-pointer">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
