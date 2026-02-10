import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleX } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getVendorList } from "../../../utils/apis/handleVendors";
import { handlePayout } from "../../../utils/apis/PurchaseAndExpense";
import { toast } from "react-toastify";

export const PurchaseAndExpence = ({ setIsPayout }) => {
  const [formData, setFormData] = useState({
    expenseName: "",
    vendorId: "",
    date: "",
    paymentMode: "",
    paymentAmount: "",
    InvoiceImage: "",
    payoutType: "purchase",
    expenseType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const queryClient = useQueryClient();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ============================
     FILE UPLOAD (UPDATED)
  ============================ */
  const handleFileUpload = (file) => {
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only Image, PDF, DOC, DOCX files are allowed");
      return;
    }

    handleInputChange("InvoiceImage", file.name);
    setUploadedFile(file);

    if (file.type.startsWith("image/")) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
    } else {
      setImagePreview(null);
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setUploadedFile(null);
    handleInputChange("InvoiceImage", "");
    document.getElementById("file-input").value = null;
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // get verdor list...
  const {
    data: vendorList = [],
    isLoading: isVendorListLoading,
    error: vendorListError,
  } = useQuery({
    queryKey: ["get_vendor_list"],
    queryFn: getVendorList,
  });

  const handleCloseModel = () => {
    setIsPayout(false);
    setFormData({
      expenseName: "",
      vendorId: "",
      date: "",
      paymentMode: "",
      paymentAmount: "",
      InvoiceImage: "",
      payoutType: "purchase",
      expenseType: "",
    });
    setUploadedFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let FormValues = new FormData();
    if (formData.payoutType === "purchase") {
      FormValues.append("purchase_name", formData.expenseName);
      FormValues.append("vendor_id", formData.vendorId);
      FormValues.append("due_date", formData.date);
      FormValues.append("payment_mode", formData.paymentMode);
      FormValues.append("purchase_pay_amount", formData.paymentAmount);
      FormValues.append("purchase_invoice_image", uploadedFile);
      FormValues.append("status", "active");
      FormValues.append("purchase_type", formData.expenseType);
    } else if (formData.payoutType === "expense") {
      FormValues.append("expense_name", formData.expenseName);
      FormValues.append("vendor_id", formData.vendorId);
      FormValues.append("due_date", formData.date);
      FormValues.append("payment_mode", formData.paymentMode);
      FormValues.append("expense_amount", formData.paymentAmount);
      FormValues.append("expense_invoice_image", uploadedFile);
      FormValues.append("status", "active");
      FormValues.append("expense_type", formData.expenseType);
    }

    const addPayout = await handlePayout({
      payoutType: formData.payoutType,
      FormValues,
    });
    if (addPayout.status) {
      toast.success(addPayout.resData.message);
      queryClient.invalidateQueries({ queryKey: ['get_total_payout'] });
      queryClient.invalidateQueries({ queryKey: ['get_all_transactions'] });
      setIsPayout(false);
      handleCloseModel();
    }
  };

  return (
    <div className="fixed top-0 left-0 z-40 w-full h-screen flex justify-center items-center bg-(--mainText-color)/20 backdrop-blur-md">
      <div className="bg-white w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] p-4 sm:p-5 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center w-full p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.5dvw] font-semibold">
            Payout Summary
          </h3>
          <button
            onClick={() => setIsPayout(false)}
            className="hover:text-[var(--Negative-color)] transition-all duration-300"
          >
            <CircleX size={30} />
          </button>
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full p-3">
          {/* Payout Type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Payout Type
            </label>
            <select
              value={formData.payoutType}
              onChange={handleOnchange}
              name="payoutType"
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            >
              <option value="purchase">Purchase</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Date
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="date"
              value={formData.date}
              onChange={handleOnchange}
              name="date"
            />
          </div>

          {/* Payment Mode */}
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Payment Mode
            </label>
            <select
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              value={formData.paymentMode}
              onChange={handleOnchange}
              name="paymentMode"
            >
              <option value="">Select Payment Mode</option>
              <option value="Cash">Cash</option>
              <option value="Check">Check</option>
              <option value="CreditCard">Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          {/* Payment Amount */}
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Payment Amount
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="number"
              placeholder="Enter amount..."
              value={formData.paymentAmount}
              onChange={handleOnchange}
              name="paymentAmount"
            />
          </div>

          {/* Expense Type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              {formData.payoutType === "expense" ? "Expense" : "Purchase"} Type
            </label>
            <select
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              value={formData.expenseType}
              onChange={handleOnchange}
              name="expenseType"
            >
              <option value="">Select {formData.payoutType} Type</option>
              <option value="personal">Personal {formData.payoutType}</option>
              <option value="business">Business {formData.payoutType}</option>
              <option value="office">Office {formData.payoutType}</option>
              <option value="other">Other {formData.payoutType}</option>
            </select>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Name
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              placeholder="Purchased goods..."
              value={formData.expenseName}
              onChange={handleOnchange}
              name="expenseName"
            />
          </div>

          {/* Vendor */}
          <div className="flex flex-col gap-2 col-span-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Vendor
            </label>
            <select
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              value={formData.vendorId}
              onChange={handleOnchange}
              name="vendorId"
            >
              <option value="">Select Vendor</option>
              {vendorListError ? (
                <>
                  <p className="text-gray-500 text-sm">{vendorListError}</p>
                  <div className="w-full h-[20px] bg-gray-200 rounded-md animate-pulse"></div>
                </>
              ) : (
                <>
                  {isVendorListLoading ? (
                    <>
                      <p className="text-gray-500 text-sm">
                        Loading vendors...
                      </p>
                      <div className="w-full h-[20px] bg-gray-200 rounded-md animate-pulse"></div>
                    </>
                  ) : (
                    <>
                      {vendorList?.map((vendor) => (
                        <option key={vendor.id} value={vendor.id}>
                          {vendor.vendor_name ||
                            vendor.name ||
                            vendor.full_name ||
                            "Unnamed Vendor"}
                        </option>
                      ))}
                    </>
                  )}
                </>
              )}
            </select>
          </div>
        </div>

        {/* FILE UPLOAD */}
        <div className="w-full flex flex-col gap-2 mt-4 px-3">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Upload Invoice
          </label>

          <div
            className={`w-full border-2 border-dashed rounded-lg h-[5dvw] p-4 cursor-pointer ${dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50 flex justify-center items-center gap-4"
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input").click()}
          >
            <div className="flex items-center justify-center gap-4">
              {!uploadedFile && (
                <p className="text-gray-500 text-sm">
                  Drag & drop or click to upload (Image / PDF / DOC)
                </p>
              )}

              {uploadedFile && (
                <div className="relative flex items-center gap-2">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="bg-gray-200 px-3 py-2 rounded text-sm font-medium">
                      {uploadedFile.name}
                    </div>
                  )}

                  <button
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    <CircleX size={14} />
                  </button>
                </div>
              )}
            </div>

            <input
              id="file-input"
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-end items-center mt-6">
          <button
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
          <button
            onClick={handleCloseModel}
            className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
