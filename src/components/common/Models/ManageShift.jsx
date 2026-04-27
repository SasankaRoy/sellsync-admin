import { CircleX } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  getEmployeeSchedule,
  updateEmployeeShift,
} from "../../../utils/apis/handleEmployee";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loading } from "../../UI/Loading/Loading";
import moment from "moment";

export const ManageShift = ({ setScheduleModel, scheduleModel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    shiftType: "",
    shiftDate: "",
    startTime: "",
    endTime: "",
  });
  const queryClient = useQueryClient();

  const {
    data: shiftData,
    isLoading: shiftLoading,
    // isError: shiftError,
  } = useQuery({
    queryKey: ["get_employee_schedule", scheduleModel.employeeId],
    queryFn: async () => {
      const data = await getEmployeeSchedule(scheduleModel.employeeId);
      if (data) {
        setScheduleData({
          shiftType: data.upcomingShift.shift_type,
          shiftDate: moment(data.upcomingShift.shift_date).format("YYYY-MM-DD"),
          startTime: data.upcomingShift.start_time,
          endTime: data.upcomingShift.end_time,
        });
      }
      return data;
    },
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setScheduleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const payload = {
        employeeId: scheduleModel.employeeId,
        shiftType: scheduleData.shiftType,
        shiftDate: scheduleData.shiftDate,
        startTime: scheduleData.startTime,
        endTime: scheduleData.endTime,
      };
      const response = await updateEmployeeShift(payload);

      if (response) {
        toast.success(response.message);
        queryClient.invalidateQueries({ queryKey: ["employee_list"] });
        setScheduleModel({
          status: false,
          employeeId: null,
          path: null,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(
        error.message || error.response.data.message || "Something went wrong",
      );
    }
  };

  return (
    <>
      {shiftLoading ? (
        <Loading />
      ) : (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
            <div className="bg-white w-[95%] sm:w-[80%] md:w-[70%] lg:w-[50%] p-4 sm:p-5 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center w-full p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.5dvw] font-semibold">
                  Manage Shift
                </h3>
                <button
                  onClick={() => {
                    setScheduleModel({
                      status: false,
                      employeeId: null,
                      path: null,
                    });
                  }}
                  className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
                >
                  <CircleX size={30} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-5 my-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
                    Shift Type
                  </label>
                  <select
                    name="shiftType"
                    value={scheduleData.shiftType}
                    onChange={handleOnchange}
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  >
                    <option value="">Select Shift</option>
                    <option value="morning">Morning</option>
                    <option value="evening">Evening</option>
                    <option value="night">Night</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
                    Start Date
                  </label>
                  <input
                    value={scheduleData.shiftDate}
                    onChange={handleOnchange}
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    type="date"
                    name="shiftDate"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
                    Punch In Time
                  </label>
                  <input
                    value={scheduleData.startTime}
                    onChange={handleOnchange}
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    type="time"
                    name="startTime"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
                    Punch Out Time
                  </label>
                  <input
                    value={scheduleData.endTime}
                    onChange={handleOnchange}
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    type="time"
                    name="endTime"
                  />
                </div>
              </div>

              <div className="flex justify-end items-center gap-5">
                <button className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300">
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isLoading}
                  className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300 disabled:opacity-80 disabled:pointer-events-none disabled:cursor-not-allowed"
                >
                  {shiftData?.upcomingShift?.id ? (
                    <>{isLoading ? "Updating..." : "Update"}</>
                  ) : (
                    <>{isLoading ? "Adding..." : "Add"}</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
