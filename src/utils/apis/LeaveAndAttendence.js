import axiosInstance from "../axios-interceptor";

export const getAllAttendenceLog = async () => {
    try {
        const getLogs = await axiosInstance.get(`/api/v1/employee/attendance-log-list?filter_type=ALL`);

        if (getLogs.status === 200 && getLogs.data) {
            return getLogs.data
        }
        return getLogs.data
    } catch (error) {
        console.error(error);
        return error.message || error.response.data.message || 'Something went wrong';
    }
}