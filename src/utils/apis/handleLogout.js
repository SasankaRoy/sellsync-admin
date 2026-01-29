import { toast } from "react-toastify";
import axiosInstance from "../axios-interceptor";
import Cookies from "js-cookie";

export const handleLogOut = async (closeRegister) => {
    const { startingCash, employeeId, currency, totalTaking, totalNotationAmount, totalBalance, cashNotation } = closeRegister

    const dollerNotation = {
        100: cashNotation[100],
        50: cashNotation[50],
        20: cashNotation[20],
        10: cashNotation[10],
        5: cashNotation[5],
        2: cashNotation[2],
        1: cashNotation[1]
    }
    const centsNotation = {
        50: cashNotation[0.5],
        25: cashNotation[0.25],
        10: cashNotation[0.1],
        5: cashNotation[0.05],
        1: cashNotation[0.01]
    }

    const payload = {
        startingCash,
        employeeId,
        currency,
        totalBalance,
        totalTaking,
        totalNotationAmount,
        dollerNotation,
        centsNotation
    }
    try {
        const saveRegister = await axiosInstance.post('/api/v1/bills/cash-reconciliation/save', {
            ...payload
        });
        if (saveRegister.data || saveRegister.status === 200) {
            // Remove all auth cookies
            Cookies.remove("authToken", { path: "/" });
            Cookies.remove("u_id", { path: "/" });
            Cookies.remove("u_type", { path: "/" });

            toast.success("Logged out successfully");

            window.location.href = '/auth/login'

        }




    } catch (error) {
        console.error(error)
        return error.message || error.response.data.message;
    }
}