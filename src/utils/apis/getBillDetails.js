import { toast } from "react-toastify";
import axiosInstance from "../axios-interceptor";

export const handleGetAllBills = async (filters) => {
  const {byDate,byStatus} = filters
  try {
    const getSalesData = await axiosInstance.get(`/api/v1/bills?day=${byDate}&status=${byStatus}&userTyp=emp&page=1&limit=10`);
    if (getSalesData.data && getSalesData.status === 200) {
      return getSalesData.data.bills;
    }

    return getSalesData.data.bills;
  } catch (error) {
    console.log("🚀 ~ handleGetSalesData ~ error:", error);
    return (
      error.message ||
      error.response.data.message ||
      "Failed to fetch sales data"
    );
  }
};

export const handleGetBillDetails = async (billID) => {
  try {
    const getBillDetails = await axiosInstance.get(`api/v1/bills/${billID}`);

    if (getBillDetails.status && getBillDetails.data) {
      return getBillDetails.data.bill;
    }
    return getBillDetails.data.bill || {};
  } catch (error) {
    console.log(error);
    toast.error("Faild to fetch transaction detials !");
    return (
      error.message ||
      error.response.data.message ||
      "Failed to fetch bill details"
    );
  }
};
