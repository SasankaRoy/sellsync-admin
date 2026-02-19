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


export const getTopSellingItems = async () => {
    try {
        const getData = await axiosInstance.post('/api/v1/report/top-selling-products', {
            "limit": 10
        })

        if (getData.data || getData.status === 200) {
            return getData.data.products
        }
        return getData.data.products
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

            default:
                getData = await axiosInstance.get(`/api/v1/report/expense-report?page=1&limit=100&startDate=${customRang?.from}&endDate=${customRang?.to}&day=${dayFilter}`);
                break;
        }


        if (getData.status === 200 && getData.data) {

            return {
                expenselist: currentReportCategory === 'Purchase' ? getData.data.purchases : getData.data.expenses || [],
                totalExpenseAmount: getData.data.total_amount || '',
                pagination: getData.data.pagination
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