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

export const addRedeemRates = async (point, point_cost) => {
    try {
        const reqAddRedeemRates = await axiosInstance.post('/api/v1/setting/redeem-add', {
            point: point.toString(),
            point_cost: point_cost.toString()
        });

        if (reqAddRedeemRates.status === 200 && reqAddRedeemRates.data) {
            return reqAddRedeemRates.data || 'Redeem rates added successfully';
        }
        return reqAddRedeemRates.data || 'Redeem rates added successfully';
    } catch (error) {
        console.log(error);
        return error.message || error.response.data.message || 'Failed to add redeem values'
    }
}

export const getRedeemRateList = async () => {
    try {
        const reqRedeemRateList = await axiosInstance.post('api/v1/setting/redeem-list', {
            "page": "1",
            "limit": "100"
        });
        if (reqRedeemRateList.status === 200 && reqRedeemRateList.data) {
            return reqRedeemRateList.data.redeemPoints || [];
        }
    } catch (error) {
        console.error(error);
        return error.message || error.response.data.message || 'Failed to fetch redeem rate list';
    }
}

export const updateRedeemRate = async (id, payload) => {
    try {
        const reqUpdateRedeemRate = await axiosInstance.post(`api/v1/setting/redeem-update/${id}`, {
            point: payload.point,
            point_cost: payload.point_cost
        });
        if (reqUpdateRedeemRate.status === 200 && reqUpdateRedeemRate.data) {
            return reqUpdateRedeemRate.data || 'Redeem rate updated successfully';
        }
        return reqUpdateRedeemRate.data || 'Redeem rate updated successfully';
    } catch (error) {
        console.error(error);
        return error.message || error.response?.data?.message || 'Failed to update redeem rate';
    }
}

export const deleteRedeemRate = async (id) => {
    try {
        const reqDeleteRedeemRate = await axiosInstance.delete(`api/v1/setting/redeem-delete/${id}`);
        if (reqDeleteRedeemRate.status === 200 && reqDeleteRedeemRate.data) {
            return reqDeleteRedeemRate.data || 'Redeem rate deleted successfully';
        }
        return reqDeleteRedeemRate.data || 'Redeem rate deleted successfully';
    } catch (error) {
        console.error(error);
        return error.message || error.response?.data?.message || 'Failed to delete redeem rate';
    }
}