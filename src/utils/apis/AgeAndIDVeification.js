import { toast } from "react-toastify";
import axiosInstance from "../axios-interceptor";

export const verifyAgeAndId = async () => {
    try {
        const reqVerify = await axiosInstance.post('https://verification.didit.me/v3/session', {
            workflow_id: import.meta.env.VITE_APP_WORKFLOWID,
            "metadata": {
                "test_user": ""
            }
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