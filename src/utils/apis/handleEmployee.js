import axiosInstance from "../axios-interceptor";
import moment from "moment";

export const updateEmployeeShift = async (payload) => {
    try {
        const reqShiftUpdate = await axiosInstance.post('/api/v1/employee/manage-shift', {
            employee_id: payload.employeeId,
            shift_type: payload.shiftType,
            shift_date: moment(payload.shiftDate).format('YYYY-MM-DD'),
            start_time: payload.startTime,
            end_time: payload.endTime
        })
        if (reqShiftUpdate.status === 200 && reqShiftUpdate.data) {
            return reqShiftUpdate.data
        }
        return reqShiftUpdate.data
    } catch (error) {
        console.log(error);
        return error.message || error.response.data.message || "Something went wrong"
    }
}



export const getEmployeeSchedule = async (employeeId) => {
    try {
        const reqEmployeeShiftData = await axiosInstance.get(`api/v1/employee/check-employee-upcoming-shift/${employeeId}`)
        if(reqEmployeeShiftData.status === 200 && reqEmployeeShiftData.data){
            return reqEmployeeShiftData.data
        }
        return reqEmployeeShiftData.data
    } catch (error) {
        console.error(error);
        return error.message || error.response.data.message || 'Something went wrong'
    }
}