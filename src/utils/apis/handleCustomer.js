import { toast } from "react-toastify";
import axiosInstance from "../axios-interceptor"

export const getCustomerDetails = async (number) => {
    try {
        const getCustomerData = await axiosInstance.get(`/api/v1/customer/details/mobile/${number}`);

        if (getCustomerData.status === 200 && getCustomerData.data) {
            console.log(getCustomerData.data)
            return getCustomerData.data;
        }
        return getCustomerData.data;



    } catch (error) {
        console.log(error)
        toast.error(error.message || error.response.data.message || 'Failed to fetch customer details.')
        return error.message || error.response.data.message || 'Failed to fetch customer details.'
    }
}