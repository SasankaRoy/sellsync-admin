import axiosInstance from "../axios-interceptor";

export const handlePayout = async (payoutPayload) => {
    const { payoutType, FormValues } = payoutPayload;
    try {
        if (payoutType === 'purchase') {
            const addPurchase = await axiosInstance.post('/api/v1/daily/purchase-add',
                FormValues
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
            if (addPurchase.status === 200 && addPurchase.data) {
                return { resData: addPurchase.data, status: true };
            }
        } else if (payoutType === 'expense') {
            const addExpense = await axiosInstance.post('/api/v1/daily/expense-add',
                FormValues
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
            if (addExpense.status === 200 && addExpense.data) {
                return { resData: addExpense.data, status: true };
            }
        }
    } catch (error) {
        console.error(error);
        return error.message || error.response.data.message || 'Failed to add payout';
    }
}

export const getTotalPayout = async () => {
    try {
        const getPayout = await axiosInstance.get('/api/v1/daily/today-totals');

        if (getPayout.status === 200 && getPayout.data) {
            return getPayout.data;
        }

        return getPayout.data;
    } catch (error) {
        console.error(error);
        return error.message || error.response.data.message || 'Failed to get total payout';
    }
}