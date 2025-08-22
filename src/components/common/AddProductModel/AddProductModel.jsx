import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircleX, Plus } from "lucide-react";

const DetailsTab = ({ productData, setProductData, actionType }) => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setImages((prevImages) => [
      ...prevImages,
      ...files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setImages((prevImages) => [
      ...prevImages,
      ...files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      return updatedImages;
    });
  };

  // Clean up preview URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full p-2">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Stockcode
            <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">
              *
            </span>
          </label>
          <input
            name="stockCode"
            value={productData.stockCode || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="text"
          
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Qty on Hand (Items)
            <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">
              *
            </span>
          </label>
          <input
            name="qtyItems"
            value={productData.qtyItems || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
            
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Qty on Hand (Cases)
            <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">
              *
            </span>
          </label>
          <input
            name="qtyCases"
            value={productData.qtyCases || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
            
          />
        </div>
      </div>

      <div className="w-full my-4 flex flex-col gap-2">
        <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
          Name
          <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">*</span>
        </label>
        <input
          name="name"
          value={productData.name || ""}
          onChange={handleInputChange}
          className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
          type="text"
          
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
        <div className="w-full flex flex-col gap-1.5">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Qty
            <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">
              *
            </span>
          </label>
          <input
            name="qty"
            value={productData.qty || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
          />
        </div>
        <div className="w-full flex flex-col gap-1.5">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Qty Extra
          </label>
          <input
            name="qtyExtra"
            value={productData.qtyExtra || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
          />
        </div>
        <div className="w-full flex flex-col gap-1.5">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Price
            <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">
              *
            </span>
          </label>
          <input
            name="price"
            value={productData.price || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
          />
        </div>
        <div className="w-full flex flex-col gap-1.5">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Price Extra
          </label>
          <input
            name="priceExtra"
            value={productData.priceExtra || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-4">
        <div className="w-full flex flex-col gap-1.5">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Avg Cost
            <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">
              *
            </span>
          </label>
          <input
            name="avgCost"
            value={productData.avgCost || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
          />
        </div>
        <div className="w-full flex flex-col gap-1.5">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">Margin</label>
          <input
            name="margin"
            value={productData.margin || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
          />
        </div>
        <div className="w-full flex flex-col gap-1.5">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">Markup</label>
          <input
            name="markup"
            value={productData.markup || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
          />
        </div>
        <div className="w-full flex flex-col gap-1.5">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Latest Cost
          </label>
          <input
            name="latestCost"
            value={productData.latestCost || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
          />
        </div>
        <div className="w-full flex flex-col gap-1.5">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">Qty</label>
          <input
            name="qty2"
            value={productData.qty2 || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-2">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">Size</label>
          <input
            name="size"
            value={productData.size || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Vendor Item No
          </label>
          <input
            name="vendorItemNo"
            value={productData.vendorItemNo || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="text"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 my-4">
        <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">Category</label>
        <select
          name="category"
          value={productData.category || ""}
          onChange={handleInputChange}
          className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
        >
          <option value="">Select Category</option>
          <option>Beer</option>
          <option>Wine</option>
          <option>Spirits</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full my-4">
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">Supplier</label>
          <select
            name="supplier"
            value={productData.supplier || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
          >
            <option value="">Select Supplier</option>
            <option>Rahul Doe</option>
            <option>John Smith</option>
            <option>Mike Johnson</option>
            <option>Sarah Wilson</option>
            <option>David Brown</option>
            <option>Lisa Davis</option>
          </select>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">SKU</label>
          <input
            name="sku"
            value={productData.sku || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="text"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full my-6">
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Units Per Case
          </label>
          <input
            name="unitsPerCase"
            value={productData.unitsPerCase || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Case Cost Total
          </label>
          <input
            name="caseCostTotal"
            value={productData.caseCostTotal || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">Tax</label>
          <input
            name="tax"
            value={productData.tax || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Reorder Point
          </label>
          <input
            name="reorderPoint"
            value={productData.reorderPoint || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Reorder Value
          </label>
          <input
            name="reorderValue"
            value={productData.reorderValue || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">Rank</label>
          <input
            name="rank"
            value={productData.rank || ""}
            onChange={handleInputChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="number"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 mt-4">
        <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
          Upload Images
        </label>
        <div
          className={`w-full border-2 border-dashed rounded-lg p-4 transition-colors duration-300 cursor-pointer ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          } ${actionType === "View" ? "opacity-50 pointer-events-none" : ""}`}
          onDragEnter={actionType !== "View" ? handleDragOver : undefined}
          onDragLeave={actionType !== "View" ? handleDragLeave : undefined}
          onDragOver={actionType !== "View" ? handleDragOver : undefined}
          onDrop={actionType !== "View" ? handleDrop : undefined}
          onClick={
            actionType !== "View"
              ? () => document.getElementById("file-input").click()
              : undefined
          }
        >
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm sm:text-base">
                  {isDragging ? "Drop files here" : "Upload images"}
                </p>
              </div>
            </div>
            {images.length > 0 && (
              <div className="relative flex items-center space-x-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.preview}
                      alt={`Uploaded ${index}`}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
                    />
                    {actionType !== "View" && (
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-[var(--Negative-color)] text-white rounded-full p-1 hover:bg-red-700 transition-all duration-300"
                        title="Remove image"
                      >
                        <CircleX size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {actionType !== "View" && (
            <input
              id="file-input"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileInput}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const AddProductModel = ({ onClose }) => {
  const [productData, setProductData] = useState({
    stockCode: "",
    qtyItems: "",
    qtyCases: "",
    name: "",
    qty: "",
    qtyExtra: "",
    price: "",
    priceExtra: "",
    avgCost: "",
    margin: "",
    markup: "",
    latestCost: "",
    qty2: "",
    size: "",
    vendorItemNo: "",
    category: "",
    supplier: "",
    sku: "",
    unitsPerCase: "",
    caseCostTotal: "",
    tax: "",
    reorderPoint: "",
    reorderValue: "",
    rank: "",
  });

  const navigate = useNavigate();

  const handleCloseModel = () => {
    onClose();
    setProductData({
      stockCode: "",
      qtyItems: "",
      qtyCases: "",
      name: "",
      qty: "",
      qtyExtra: "",
      price: "",
      priceExtra: "",
      avgCost: "",
      margin: "",
      markup: "",
      latestCost: "",
      qty2: "",
      size: "",
      vendorItemNo: "",
      category: "",
      supplier: "",
      sku: "",
      unitsPerCase: "",
      caseCostTotal: "",
      tax: "",
      reorderPoint: "",
      reorderValue: "",
      rank: "",
    });
  };

  const handleSubmit = () => {
    console.log("Product Data:", productData);
    handleCloseModel();
    navigate(window.location.pathname);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-md shadow p-4 sm:p-5 w-full sm:w-[90%] md:w-[80%] lg:w-[60%] max-h-[95%] overflow-auto">
        <div className="w-full bg-[var(--sideMenu-color)] flex justify-between items-center px-3 py-1.5 text-white rounded-md">
          <h3 className="font-semibold text-lg sm:text-xl lg:text-[1.8dvw]">
            Add Product
          </h3>
          <button
            onClick={handleCloseModel}
            className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
          >
            <CircleX size={24} className="sm:w-[30px] sm:h-[30px]" />
          </button>
        </div>

        

        <div className="w-full p-2 border border-[var(--border-color)] rounded-md">
          <DetailsTab
            productData={productData}
            setProductData={setProductData}
            actionType="Add"
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-end items-center mt-6">
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
            >
              Update
            </button>
            <button
              onClick={handleCloseModel}
              className="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModel;