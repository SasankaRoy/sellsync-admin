import axiosInstance from "../axios-interceptor";

export const GetStartingCash = async () => {
    try {
        const getCash = await axiosInstance.get('/api/v1/bills/start-cash/get');

        if (getCash.data || getCash.status === 200) {
            return getCash.data.data.amount
        }
        return getCash.data.data.amount
    } catch (error) {
        console.error(error);
        return error.message || error.response.data.message
    }
}