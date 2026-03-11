import axiosInstance from "../axios-interceptor";

export const getLowStockThreshold = async () => {
    try {
        const reqLowStockThreshold = await axiosInstance.get('/api/v1/setting/data-fetch');

        if (reqLowStockThreshold.status === 200 && reqLowStockThreshold.data) {
            console.log(reqLowStockThreshold.data)
            return reqLowStockThreshold.data || {
                low_stock_threshold: 0,
                minimum_points_required_for_redeem: 0,
                redeem_point: 0,
                redeem_point_cost: 0,
            };
        }
        return reqLowStockThreshold.data || {
            low_stock_threshold: 0,
            minimum_points_required_for_redeem: 0,
            redeem_point: 0,
            redeem_point_cost: 0,
        };
    } catch (error) {
        console.log(error);
        return error.message || error.response.data.message || 'Something went wrong will fetching the low stock threshold'
    }
}

export const updateLowStockThreshold = async (payload) => {
    try {
        const reqUpdateThreshold = await axiosInstance.post('/api/v1/setting/data-update', {
            low_stock_quantity: payload.low_stock_threshold,
            minimum_points_required_for_redeem: payload.minimum_points_required_for_redeem,
            redeem_point: payload.redeem_point,
            redeem_point_cost: payload.redeem_point_cost,
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