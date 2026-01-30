import axiosInstance from "../axios-interceptor";

const getFormattedDate = async (type) => {
    const date = new Date()
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    if (type === 'POST') {

        return `${year}-${month}-${day}`;
    } else if (type === 'GET') {
        return `${day}-${month}-${year}`;
    }
}

export const handleUpdateTax = async ({ taxValue }) => {
    console.log(taxValue)
    try {
        const updateTax = await axiosInstance.post('/api/v1/common/tax-add', {
            high_tax_amt: taxValue.high_tax,
            low_tax_amt: taxValue.low_tax,
            date: (await getFormattedDate('POST')).toString()
        })

        if (updateTax.status === 200 && updateTax.data) {
            console.log(updateTax.data)
            return updateTax.data;
        }
        return updateTax.data;
    } catch (error) {
        console.error(error)
        return error.message || error.response.data.message
    }
}

export const handleGetTaxValue = async () => {
    try {
        const getTaxData = await axiosInstance.post('/api/v1/common/tax-get', {
            date: (await getFormattedDate('GET')).toString()  // get latest date Tax value send input {}
            // get latest date Tax value send input {}
        });

        if (getTaxData.data || getTaxData.status) {
            console.log(getTaxData.data)
            return getTaxData.data;
        }
        return getTaxData.data;

    } catch (error) {
        console.error(error)
        return error.message || error.response.data.messsage;
    }
}

export const handleTaxUpateHistory = async (filter) => {
    try {
        const getTaxData = await axiosInstance.post('/api/v1/common/tax-list', {
            "page": 1,
            "limit": 10,
            "date": "" // Optional "27-01-2026"
        });

        if (getTaxData.data || getTaxData.status) {
            console.log(getTaxData.data)
            return getTaxData.data.results;
        }
        return getTaxData.data.results;

    } catch (error) {
        console.error(error)
        return error.message || error.response.data.messsage;
    }
}