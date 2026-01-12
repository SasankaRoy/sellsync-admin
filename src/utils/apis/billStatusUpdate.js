import { toast } from "react-toastify";
import axiosInstance from "../axios-interceptor";

export const handleBillStatusUpdate = async (billId, currentStatus) => {
  try {
    const reqUpdateBillStatus = await axiosInstance.put(
      `api/v1/bills/${billId}/status/${currentStatus}`
    );
    if (reqUpdateBillStatus.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("Error in handleBillStatusUpdate", error);
    toast.error(error.response.data.message || "Failed to update bill status");
    return false;
  }
};
