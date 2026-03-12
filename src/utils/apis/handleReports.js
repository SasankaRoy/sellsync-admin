import axiosInstance from "../axios-interceptor";

export const getCardData = async (filter = "TODAY") => {
    try {
        const getData = await axiosInstance.post('/api/v1/report/sales-report', {
            "filter": filter // or "TODAY", "LAST_DAY", "LAST_3_DAY", "LAST_7_DAY", "LAST_30_DAY"
        })

        if (getData.data || getData.status === 200) {
            return getData.data
        }
        return getData.data
    } catch (error) {
        return error.response.data.message || error.message || 'Something went wrong';
    }
}

export const getRevenueReport = async (year) => {
    try {
        const getData = await axiosInstance.post('/api/v1/report/monthly-revenue', {
            "year": year || ''  // Optional, defaults to current year
        })

        if (getData.data || getData.status === 200) {
            return getData.data.data
        }
        return getData.data.data
    } catch (error) {
        return error.response.data.message || error.message || 'Something went wrong';
    }
}


export const getTopSellingItems = async (filter) => {
    try {
        const { page, limit } = filter;
        const getData = await axiosInstance.post('/api/v1/report/top-selling-products', {
            limit: limit || 10,
            page: page || 1
        })

        console.log(getData.data)

        if (getData.data || getData.status === 200) {
            return getData.data
        }
        return getData.data
    } catch (error) {
        return error.response.data.message || error.message || 'Something went wrong';
    }
}

export const getReportsData = async (filters) => {
    const { currentReportCategory, customRang, dayFilter, } = filters;
    let getData;

    console.log(currentReportCategory)

    try {
        switch (currentReportCategory) {
            case 'Expense':
                getData = await axiosInstance.get(`/api/v1/report/expense-report?page=1&limit=100&startDate=${customRang?.from}&endDate=${customRang?.to}&day=${dayFilter}`);
                break;

            case 'Purchase':
                getData = await axiosInstance.get(`/api/v1/report/purchase-report?page=1&limit=100&startDate=${customRang?.from}&endDate=${customRang?.to}&day=${dayFilter}`);
                break;
            case 'Sale':
                getData = await axiosInstance.get(`/api/v1/bills/transaction/list?storeId=&userType=&method=&day=${dayFilter}&status=&search=&page=1&limit=100`);
                break;

            default:
                getData = await axiosInstance.get(`/api/v1/report/expense-report?page=1&limit=100&startDate=${customRang?.from}&endDate=${customRang?.to}&day=${dayFilter}`);
                break;
        }


        if (getData.status === 200 && getData.data) {
            if (currentReportCategory === 'Purchase') {
                return {
                    expenselist: getData.data.purchases || [],
                    totalExpenseAmount: getData.data.total_amount || '',
                    pagination: getData.data.pagination
                }
            } else if (currentReportCategory === 'Expense') {
                return {
                    expenselist: getData.data.expenses || [],
                    totalExpenseAmount: getData.data.total_amount || '',
                    pagination: getData.data.pagination
                }
            } else if (currentReportCategory === 'Sale') {
                console.log(getData.data)
                const totalsaleAmount = getData.data.transactions.reduce((acc, cur) => {
                    return acc + Number(cur.grandTotal)
                }, 0);
                return {
                    expenselist: getData.data.transactions || [],
                    totalExpenseAmount: totalsaleAmount.toFixed(2) || '',
                    pagination: getData.data.pagination
                }
            }

        }
        return {
            expenselist: currentReportCategory === 'Purchase' ? getData.data.purchases : getData.data.expenses || [],
            totalExpenseAmount: getData.data.total_amount || '',
            pagination: getData.data.pagination
        }

    } catch (error) {
        console.error(error);
        return error.message || error.response.data.message || 'Something went wrong while fetch the expense report'
    }
}

export const getLowSrockData = async (pagination) => {
    try {
        const { page, limit } = pagination;
        const resLowStockData = await axiosInstance.post('/api/v1/product/low-stock-product-list', {
            "page": page || 1,
            "limit": limit || 500,
            "selected_category_id": "",
            "search_text": ""
        })

        // console.log(resLowStockData.data)
        if (resLowStockData.data || resLowStockData.status === 200) {
            return resLowStockData.data || []
        }
        return resLowStockData.data || []
    } catch (error) {
        console.log(error);
        return error.message || error.response.data.message || 'Something went wrong will fetching the low-stock data.'
    }
}

export const getOutOfStockData = async (pagination) => {
    try {
        const { page, limit } = pagination;
        const resLowStockData = await axiosInstance.post('/api/v1/product/out-of-stock-product-list', {
            "page": page || 1,
            "limit": limit || 500,
            "selected_category_id": "",
            "search_text": ""
        })

      
        if (resLowStockData.data || resLowStockData.status === 200) {
            return resLowStockData.data || []
        }
        return resLowStockData.data || []
    } catch (error) {
        console.log(error);
        return error.message || error.response.data.message || 'Something went wrong will fetching the low-stock data.'
    }
}

export const getDashboardSalesReport = async (filter) => {
    try {
        const reqSalesReport = await axiosInstance.post('/api/v1/report/admin-dashboard-card', {
            filter: filter
        })

        if (reqSalesReport.status === 200 && reqSalesReport.data) {
            return reqSalesReport.data
        }
        return reqSalesReport.data
    } catch (error) {
        console.log(error);
        return error.message || error.response.data.message || 'Failed to fetch sales data'
    }
}