import { toast } from "react-toastify";
import axiosInstance from "../axios-interceptor";

export const getAllDeals = async () => {
    try {
        const response = await axiosInstance.post("/api/v1/common/deal-list", {
            page: 1,
            limit: 100,
        });
        if (response.data || response.status === 200) {
            return response.data;
        }

        return response.data || [];
    } catch (error) {
        console.log(error.message || error.responsive.data.message || "Error fetching deals");
        return error.message || error.responsive.data.message || "Error fetching deals";
    }
}


export const createDeal = async (dealData) => {
    try {
        const response = await axiosInstance.post('/api/v1/common/deal-add', { ...dealData })

        if (response.status === 200 || response.data) {
            toast.success(response.data.message || "deal created successfully")
            return response.data.message;
        }
        return response.data.message || 'Error creating deal';


    } catch (error) {
        console.log(error.message || error.responsive.data.message || "Error creating deal");
        toast.error(error.message || error.responsive.data.message || "Error creating deal");
        return error.message || error.responsive.data.message || "Error creating deal";
    }
}