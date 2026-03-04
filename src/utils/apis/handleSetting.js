import axiosInstance from "../axios-interceptor";

export const getLowStockThreshold = async () => {
    try {
        const reqLowStockThreshold = await axiosInstance.get('/api/v1/setting/data-fetch');

        if (reqLowStockThreshold.status === 200 && reqLowStockThreshold.data) {
            console.log(reqLowStockThreshold.data.low_stock_quantity)
            return reqLowStockThreshold.data.low_stock_quantity || 0;
        }
        return reqLowStockThreshold.data.low_stock_quantity || 0;
    } catch (error) {
        console.log(error);
        return error.message || error.response.data.message || 'Something went wrong will fetching the low stock threshold'
    }
}

export const updateLowStockThreshold = async (payload) => {
    try {
        const reqUpdateThreshold = await axiosInstance.post('/api/v1/setting/data-update', {
            low_stock_quantity: payload,
        })
        if (reqUpdateThreshold.status === 200 && reqUpdateThreshold.data) {
            return reqUpdateThreshold.data || 'Low stock threshold updated successfully';
        }
        return reqUpdateThreshold.data || 'Low stock threshold updated successfully';
    } catch (error) {
        console.error(error);
        return error.message || error.response.data.message || 'Something went wrong will updating the low stock threshold';
    }
}