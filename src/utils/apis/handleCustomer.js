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
        toast.error(error.response.data.message || error.message || 'Failed to fetch customer details.')
        return error.message || error.response.data.message || 'Failed to fetch customer details.'
    }
}


export const getAllCustomerList = async (searchValue) => {
    try {
        const getAllCustomerList = await axiosInstance.post(
            "/api/v1/customer/list",
            {
                page: 1,
                limit: 20,
                searchText: searchValue,
            },
        );
        if (getAllCustomerList.status === 200 && getAllCustomerList.data) {
            return getAllCustomerList?.data?.results;
        }
        return getAllCustomerList?.data?.results;
    } catch (error) {
        console.error(error);
        throw new error(error.response.data.error);
    }
}