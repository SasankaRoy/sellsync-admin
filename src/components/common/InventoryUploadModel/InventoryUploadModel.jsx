import { CircleX, Upload } from "lucide-react";
import React, { useState } from "react";
import axiosInstance from "../../../utils/axios-interceptor";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export const InventoryUploadModel = ({ setInventoryUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
    } else {
      toast.error("Please select a valid CSV file.");
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Endpoint is a placeholder, adjust if necessary
      const response = await axiosInstance.post(
        "api/v1/common/product-import-csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        toast.success(response.data.message || "File uploaded successfully!");
        queryClient.invalidateQueries(["get_all_products_list"]);
        setInventoryUpload(false);
      }
    } catch (error) {
      console.error("Upload error:", error.response.data);
      toast.error(error.response?.data?.message || "Failed to upload file.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-99 flex justify-center items-center p-4">
      <div className="bg-white rounded-md shadow p-4 sm:p-5 w-full sm:w-[80%] md:w-[60%] lg:w-[40%] max-h-[95%] overflow-auto flex flex-col gap-4">
        {/* Header */}
        <div className="w-full bg-(--sideMenu-color) flex justify-between items-center px-3 py-1.5 text-white rounded-md">
          <h3 className="font-semibold text-lg sm:text-xl lg:text-[1.5dvw]">
            Upload Inventory (CSV)
          </h3>
          <button
            onClick={() => setInventoryUpload(false)}
            className="hover:text-(--Negative-color) transition-all duration-300 ease-linear cursor-pointer"
          >
            <CircleX size={24} className="sm:w-[30px] sm:h-[30px]" />
          </button>
        </div>

        {/* Upload Body */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-(--button-color1) transition-colors cursor-pointer relative">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload size={48} className="text-gray-400 mb-2" />
          <p className="text-gray-600 font-medium">
            {selectedFile ? selectedFile.name : "Click or drag to select CSV file"}
          </p>
          <p className="text-gray-400 text-sm mt-1">Maximum file size: 10MB</p>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end items-center mt-2">
          <button
            onClick={() => setInventoryUpload(false)}
            className="w-full sm:w-auto px-6 py-2 bg-(--button-color4) cursor-pointer text-white rounded-md font-semibold hover:opacity-80 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            disabled={isUploading || !selectedFile}
            onClick={handleUpload}
            className="w-full sm:w-auto px-6 py-2 bg-(--button-color1) cursor-pointer text-white rounded-md font-semibold hover:opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};
