import axiosInstance from "../axios-interceptor";

export const getVendorList = async () => {
    try {
        const getList = await axiosInstance.post('/api/v1/vendor/list', {
            "page": 1,
            "limit": 10,
            "search_text": ""
        });


        if (getList.status === 200 && getList.data) {
            return getList.data.results || [];
        }
        return getList.data.results || [];

    } catch (error) {
        console.error('Error in getVendorList', error);
        return error?.message || error?.response?.data?.message || 'Failed to fetch vendor list';
    }
}