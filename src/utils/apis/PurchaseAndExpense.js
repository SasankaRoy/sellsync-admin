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

export const getAllExpenceList = async () => {
    try {
        const getExpenceList = await axiosInstance.post('/api/v1/daily/expense-list',
            {
                "page": 1,
                "limit": 100
            }
        );

        if (getExpenceList.status === 200 && getExpenceList.data) {
            return getExpenceList.data.results;
        }

        return getExpenceList.data.results;
    } catch (error) {
        console.error(error);
        return error.message || error.response.data.message || 'Failed to get all expence list';
    }
}

export const getAllPurchaseList = async () => {
    try {
        const getPurchaseList = await axiosInstance.post('/api/v1/daily/purchase-list',
            {
                "page": 1,
                "limit": 100
            }
        );

        if (getPurchaseList.status === 200 && getPurchaseList.data) {
            return getPurchaseList.data.results;
        }

        return getPurchaseList.data.results;
    } catch (error) {
        console.error(error);
        return error.message || error.response.data.message || 'Failed to get all expence list';
    }
}


export const exportPurchaseList = async (filters) => {
    try {
        const { day, page, items } = filters
        const exportPurchaseList = await axiosInstance.get(`/api/v1/daily/purchase/export/csv?day=${day}&page=${page}&limit=${items}`
        );

        if (exportPurchaseList.status === 200 && exportPurchaseList.data) {
            const blob = new Blob([exportPurchaseList.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "purchase_list.csv";
            a.click();
            window.URL.revokeObjectURL(url);
        }


    } catch (error) {
        console.error(error);
        return error.message || error.response.data.message || 'Failed to export purchase list';
    }
}
export const exportExpenseList = async (filters) => {
    try {
        const { day, page, items } = filters
        const exportPurchaseList = await axiosInstance.get(`/api/v1/daily/expense/export/csv?day=${day}&page=${page}&limit=${items}`
        );

        if (exportPurchaseList.status === 200 && exportPurchaseList.data) {
            const blob = new Blob([exportPurchaseList.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "expense_list.csv";
            a.click();
            window.URL.revokeObjectURL(url);
        }


    } catch (error) {
        console.error(error);
        return error.message || error.response.data.message || 'Failed to export purchase list';
    }
}