import { toast } from "react-toastify";
import axiosInstance from "../axios-interceptor";

export const verifyAgeAndId = async (metaData) => {
    const { email, name, phone } = metaData;
    try {
        const reqVerify = await axiosInstance.post('/api/v1/verification/didit/session', {
            "customer_name": name || "",
            "customer_email": email, // Required
            "customer_phone": phone   // Required
        })
        if (reqVerify.status === 200 && reqVerify.data) {
            return reqVerify.data;
        }
        return reqVerify.data;
    } catch (error) {
        console.error(error);
        toast.error(error.message || error.response.data.message || 'Something went wrong while verifying.')
        return error.message || error.response.data.message || 'Something went wrong while verifying.'
    }
}

export const trackVerification = async (token) => {
    try {
        const checkVerification = await axiosInstance.get(`/api/v1/verification/didit/status/${token}`);

        if (checkVerification.data && checkVerification.status === 200) {
            return checkVerification.data;
        }
        return checkVerification.data;


    } catch (error) {
        console.error(error);
        toast.error(error.message || error.response.data.message || 'Something went wrong while verifying')
        return error.message || error.response.data.message || 'Something went wrong while verifying'
    }
}