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

export const getCustomerDetailsById = async (customerId) => {
    try {
        const getCustomerData = await axiosInstance.get(`/api/v1/customer/details/${customerId}`);
        if (getCustomerData.status === 200 && getCustomerData.data) {
            return getCustomerData.data?.product || {};
        }
        return getCustomerData.data?.product || {};
    } catch (error) {
        console.error(error);
        toast.error(error.response.data.message || error.message || 'Failed to fetch customer details.')
        return error.message || error.response.data.message || 'Failed to fetch customer details.'
    }
}


export const getAllCustomerList = async (searchValue, statusFilter) => {
    try {
        const getAllCustomerList = await axiosInstance.post(
            "/api/v1/customer/list",
            {
                page: 1,
                limit: 100,
                searchText: searchValue,
                status: statusFilter
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

export const customersOverviewData = async (filters) => {
    try {
        const customersOverviewData = await axiosInstance.get(filters.default === "CUSTOM" ?
            `/api/v1/customer/dashboard?filter_type=${filters?.default}&from_date=${filters?.from_date}&to_date=${filters?.to_date}` :
            `/api/v1/customer/dashboard?filter_type=${filters?.default}`,
        );
        if (customersOverviewData.status === 200 && customersOverviewData.data) {
            return customersOverviewData?.data;
        }
        return customersOverviewData?.data;
    } catch (error) {
        console.error(error);
        throw new error(error.response.data.error);
    }
}

export const getCustomerPurchaseHistory = async (customerId, pagination) => {
    try {
        const getCustomerPurchaseHistory = await axiosInstance.get(`/api/v1/customer/transaction-details/${customerId}?page=${pagination.pageCount}&limit=${pagination.limit}`);
        if (getCustomerPurchaseHistory.status === 200 && getCustomerPurchaseHistory.data) {
            return getCustomerPurchaseHistory.data || {};
        }
        return getCustomerPurchaseHistory.data || {};
    } catch (error) {
        console.error(error);
        toast.error(error.response.data.message || error.message || 'Failed to fetch customer purchase history.')
        return error.message || error.response.data.message || 'Failed to fetch customer purchase history.'
    }
}