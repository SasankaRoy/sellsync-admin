import { CircleX } from "lucide-react";
import React, { useState } from "react";
import axiosInstance from "../../../utils/axios-interceptor";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export const DeleteModel = ({ setDeleteModel, productId, path }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const reqDelete = await axiosInstance.get(path);

      if (reqDelete.status === 200 && reqDelete.data) {
        toast.success(reqDelete.data.message || "Delete Successfully!");
        queryClient.invalidateQueries(["employee_list"]);
      }
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setDeleteModel(false);
      setIsDeleting(false);
    }
  };
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
            <button
              disabled={isDeleting}
              onClick={handleDelete}
              className="bg-[var(--Negative-color)] text-white px-5 py-1.5 rounded-md flex justify-center items-center font-semibold text-[1.1dvw] cursor-pointer disabled:pointer-events-none disabled:opacity-75"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
