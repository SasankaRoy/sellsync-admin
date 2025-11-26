import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CircleX, LogIn, LogOut, UtensilsCrossed, Loader } from "lucide-react";
import axiosInstance from "../../../utils/axios-interceptor";
import { toast } from "react-toastify";

export const ClockInOut = ({
  clockInVarient,
  time,
  setCurrentStateOutter,
  setCurrentStateInner,

  currentStateOutter,
  currentStateInner,
  setPunchInTime,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [punchStatus, setPunchStatus] = useState(null); // "punched-in", "on-break", null
  const [notes, setNotes] = useState("");
  const [localPunchInTime, setLocalPunchInTime] = useState(null); // Store punch in time
  const [punchOutTime, setPunchOutTime] = useState(null); // Store punch out time
  const [breakStartTime, setBreakStartTime] = useState(null); // Store break start time
  const [totalBreakTime, setTotalBreakTime] = useState(0); // Total break time in milliseconds
  const [currentTime, setCurrentTime] = useState(new Date()); // For updating display time

  // Update current time every second to show real-time duration
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchWorkStatus = async () => {
    try {
      // Try to get punch status from punch-in endpoint
      const response = await axiosInstance.post(
        "/api/v1/employee/punch-in",
        {}
      );
      // If successful, they haven't punched in yet
      if (response.status === 200 && response.data.workTime?.punch_in_time) {
        setLocalPunchInTime(new Date(response.data.workTime.punch_in_time));
        setPunchStatus("punched-in");
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.error || error?.response?.data?.message;
      const workTime = error?.response?.data?.workTime;

      // Check if already punched out today
      if (errorMsg && errorMsg.includes("already completed your work")) {
        setPunchStatus("completed");
        if (workTime?.punch_in_time) {
          setLocalPunchInTime(new Date(workTime.punch_in_time));
        }
        if (workTime?.punch_out_time) {
          setPunchOutTime(new Date(workTime.punch_out_time));
        }
      }
      // Check if on break
      else if (workTime?.break_start_time && !workTime?.break_end_time) {
        setPunchStatus("on-break");
        setBreakStartTime(new Date(workTime.break_start_time));
        if (workTime?.punch_in_time) {
          setLocalPunchInTime(new Date(workTime.punch_in_time));
        }
      }
      // Check if punched in
      else if (errorMsg && errorMsg.includes("already punched in")) {
        setPunchStatus("punched-in");
        if (workTime?.punch_in_time) {
          setLocalPunchInTime(new Date(workTime.punch_in_time));
        }
      }
      // Otherwise, no punch status
      else {
        setPunchStatus(null);
      }
    }
  };

  const handlePunchIn = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/v1/employee/punch-in",
        {}
      );
      if (response.status === 200) {
        toast.success("Punched In Successfully");
        setPunchStatus("punched-in");
        // Store the punch in time from API response
        if (response.data.workTime?.punch_in_time) {
          const punchTime = new Date(response.data.workTime.punch_in_time);
          setLocalPunchInTime(punchTime);
          if (setPunchInTime) {
            setPunchInTime(punchTime);
          }
        }
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.error || error?.response?.data?.message;
      const workTime = error?.response?.data?.workTime;

      // If already completed, show completion status
      if (errorMsg && errorMsg.includes("already completed your work")) {
        setPunchStatus("completed");
        if (workTime?.punch_in_time) {
          setLocalPunchInTime(new Date(workTime.punch_in_time));
        }
        if (workTime?.punch_out_time) {
          setPunchOutTime(new Date(workTime.punch_out_time));
        }
        toast.info("You have already completed your work today");
      }
      // If already punched in, show working status
      else if (errorMsg && errorMsg.includes("already punched in")) {
        setPunchStatus("punched-in");
        if (workTime?.punch_in_time) {
          const punchTime = new Date(workTime.punch_in_time);
          setLocalPunchInTime(punchTime);
          if (setPunchInTime) {
            setPunchInTime(punchTime);
          }
        }
        toast.info("You are already punched in today");
      } else {
        toast.error(errorMsg || "Punch In Failed");
      }
      console.log("Punch In Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBreakTime = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/v1/employee/break-time", {
        action: "start",
      });
      if (response.status === 200) {
        toast.success("Break Started");
        setPunchStatus("on-break");
        // Store the break start time from API response
        if (response.data.workTime?.break_start_time) {
          setBreakStartTime(new Date(response.data.workTime.break_start_time));
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Break Failed");
      console.log("Break Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeWork = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/v1/employee/break-time", {
        action: "end",
      });
      if (response.status === 200) {
        toast.success("Break Ended - Back to Work");
        // Calculate break duration and add to total
        if (breakStartTime) {
          const breakDuration = new Date().getTime() - breakStartTime.getTime();
          setTotalBreakTime((prev) => prev + breakDuration);
        }
        setPunchStatus("punched-in");
        setBreakStartTime(null);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Resume Work Failed");
      console.log("Resume Work Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePunchOut = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/v1/employee/punch-out", {
        notes: notes || "Today Punch Out",
      });
      if (response.status === 200) {
        toast.success("Punched Out Successfully");
        // Store punch out time from response
        if (response.data.workTime?.punch_out_time) {
          setPunchOutTime(new Date(response.data.workTime.punch_out_time));
        } else {
          // If no punch_out_time in response, use current time
          setPunchOutTime(new Date());
        }
        setPunchStatus("completed");
        setNotes("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Punch Out Failed");
      console.log("Punch Out Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        variants={clockInVarient.OutterWrapper}
        initial="initial"
        animate={currentStateOutter}
        onClick={(e) => {
          e.stopPropagation();
          setCurrentStateOutter(clockInVarient.OutterWrapper.exit);
          setCurrentStateInner(clockInVarient.exit);
        }}
        key={currentStateOutter}
        className="absolute h-screen bg-transparent flex justify-center items-center backdrop-blur-[1px] w-full max-w-full top-0 z-50 p-3 sm:p-0 overflow-x-hidden"
      >
        <motion.div
          variants={clockInVarient}
          initial="initial"
          animate={currentStateInner}
          className="w-[95%] sm:w-[80%] md:w-[50%] lg:w-[30%] bg-(--primary-color) py-3 sm:py-4 px-3 sm:px-4 lg:px-6 rounded-md max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center border-b border-(--border-color) py-2 sm:py-2.5 px-2 sm:px-3">
            <h3 className="text-base sm:text-lg lg:text-[1.5dvw] text-(--button-color2) font-semibold">
              {punchStatus === "completed"
                ? "Work Completed"
                : punchStatus === "punched-in"
                ? "Manage Work"
                : "Clock In"}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentStateOutter(clockInVarient.OutterWrapper.exit);
                setCurrentStateInner(clockInVarient.exit);
              }}
              className="cursor-pointer"
            >
              <CircleX
                size={24}
                className="sm:w-7 sm:h-7 lg:w-[30px] lg:h-[30px]"
              />
            </button>
          </div>
          <div className="my-3 sm:my-4 lg:my-5 flex flex-col gap-3 sm:gap-4">
            {punchStatus !== "completed" && (
              <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 sm:gap-4">
                <p className="text-xs sm:text-sm lg:text-[1.2dvw] paraFont capitalize font-normal text-(--button-color4)">
                  {punchStatus === "punched-in"
                    ? "Working Since"
                    : "Start Working"}
                </p>
                <p className="hidden sm:block text-sm lg:text-[1.2dvw] paraFont capitalize font-normal text-(--button-color4)">
                  |
                </p>
                <h3 className="text-lg sm:text-xl lg:text-[1.5dvw] font-semibold">
                  {punchStatus === "punched-in" && localPunchInTime
                    ? `${localPunchInTime
                        .getHours()
                        .toString()
                        .padStart(2, "0")}:${localPunchInTime
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}:${localPunchInTime
                        .getSeconds()
                        .toString()
                        .padStart(2, "0")}`
                    : `${time.hours}:${time.minutes}:${time.seconds}`}
                </h3>
              </div>
            )}

            {punchStatus === "punched-in" && localPunchInTime && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border border-blue-400 rounded-md px-2 sm:px-3 py-2 bg-blue-500/10">
                <p className="text-xs sm:text-sm lg:text-[1.1dvw] paraFont font-normal text-blue-600">
                  Current Work Duration
                </p>
                <h5 className="font-semibold text-sm sm:text-base lg:text-[1.2dvw] text-blue-700">
                  {(() => {
                    const diff =
                      currentTime.getTime() - localPunchInTime.getTime();
                    const hours = Math.floor(diff / 3600000);
                    const minutes = Math.floor((diff % 3600000) / 60000);
                    const seconds = Math.floor((diff % 60000) / 1000);
                    return `${hours}h ${minutes}m ${seconds}s`;
                  })()}
                </h5>
              </div>
            )}

            {punchStatus === "on-break" && (
              <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 sm:gap-4 border border-(--button-color3) rounded-md px-2 py-2 bg-(--button-color3)/10">
                <p className="text-xs sm:text-sm lg:text-[1dvw] paraFont font-normal text-(--button-color3)">
                  On Break Since
                </p>
                <p className="hidden sm:block text-sm lg:text-[1dvw] paraFont font-normal text-(--button-color3)">
                  |
                </p>
                <h5 className="font-semibold text-sm sm:text-base lg:text-[1.2dvw] text-(--button-color3)">
                  {breakStartTime
                    ? `${breakStartTime
                        .getHours()
                        .toString()
                        .padStart(2, "0")}:${breakStartTime
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}:${breakStartTime
                        .getSeconds()
                        .toString()
                        .padStart(2, "0")}`
                    : `${time.hours}:${time.minutes}:${time.seconds}`}
                </h5>
              </div>
            )}

            {punchStatus === "completed" &&
              localPunchInTime &&
              punchOutTime && (
                <div className="flex flex-col gap-2 sm:gap-3 border border-green-500 rounded-md px-2 sm:px-3 py-2 sm:py-3 bg-green-500/10">
                  <div className="flex justify-between items-center">
                    <p className="text-xs sm:text-sm lg:text-[1.1dvw] paraFont font-normal text-green-600">
                      Punch In Time
                    </p>
                    <h5 className="font-semibold text-sm sm:text-base lg:text-[1.2dvw] text-green-600">
                      {`${localPunchInTime
                        .getHours()
                        .toString()
                        .padStart(2, "0")}:${localPunchInTime
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}:${localPunchInTime
                        .getSeconds()
                        .toString()
                        .padStart(2, "0")}`}
                    </h5>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs sm:text-sm lg:text-[1.1dvw] paraFont font-normal text-green-600">
                      Punch Out Time
                    </p>
                    <h5 className="font-semibold text-sm sm:text-base lg:text-[1.2dvw] text-green-600">
                      {`${punchOutTime
                        .getHours()
                        .toString()
                        .padStart(2, "0")}:${punchOutTime
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}:${punchOutTime
                        .getSeconds()
                        .toString()
                        .padStart(2, "0")}`}
                    </h5>
                  </div>
                  <div className="border-t border-green-400 pt-2 flex justify-between items-center">
                    <p className="text-xs sm:text-sm lg:text-[1.1dvw] paraFont font-semibold text-green-600">
                      Total Work Duration
                    </p>
                    <h4 className="font-bold text-sm sm:text-base lg:text-[1.3dvw] text-green-700">
                      {(() => {
                        const diff =
                          punchOutTime.getTime() -
                          localPunchInTime.getTime() -
                          totalBreakTime;
                        const hours = Math.floor(diff / 3600000);
                        const minutes = Math.floor((diff % 3600000) / 60000);
                        const seconds = Math.floor((diff % 60000) / 1000);
                        return `${hours}h ${minutes}m ${seconds}s`;
                      })()}
                    </h4>
                  </div>
                  {totalBreakTime > 0 && (
                    <div className="border-t border-green-400 pt-2 flex justify-between items-center">
                      <p className="text-xs sm:text-sm lg:text-[1.1dvw] paraFont font-normal text-green-600">
                        Total Break Time
                      </p>
                      <h5 className="font-semibold text-sm sm:text-base lg:text-[1.2dvw] text-green-600">
                        {(() => {
                          const hours = Math.floor(totalBreakTime / 3600000);
                          const minutes = Math.floor(
                            (totalBreakTime % 3600000) / 60000
                          );
                          const seconds = Math.floor(
                            (totalBreakTime % 60000) / 1000
                          );
                          return `${hours}h ${minutes}m ${seconds}s`;
                        })()}
                      </h5>
                    </div>
                  )}
                </div>
              )}

            {punchStatus === "punched-in" && (
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm lg:text-[1dvw] paraFont font-normal">
                  Punch Out Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes for punch out..."
                  className="w-full px-2 sm:px-3 py-2 border border-(--border-color) rounded-md text-xs sm:text-sm lg:text-[0.9dvw] focus:outline focus:outline-[var(--button-color1)]"
                  rows="3"
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-2 sm:gap-3 lg:gap-5">
              {!punchStatus && (
                <button
                  onClick={handlePunchIn}
                  disabled={isLoading}
                  className="w-full py-2.5 sm:py-3 rounded-md text-sm sm:text-base lg:text-[1.3dvw] cursor-pointer bg-(--button-color1) text-(--primary-color) font-semibold mainFont flex justify-center items-center gap-2 sm:gap-3 lg:gap-5 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  <span className="p-1 sm:p-1.5 bg-(--primary-color) flex justify-center items-center rounded-full text-(--mainText-color)">
                    {isLoading ? (
                      <Loader
                        size={16}
                        className="sm:w-5 sm:h-5 animate-spin"
                      />
                    ) : (
                      <LogIn size={16} className="sm:w-5 sm:h-5" />
                    )}
                  </span>
                  {isLoading ? "Punching In..." : "Clock In"}
                </button>
              )}

              {punchStatus === "punched-in" && (
                <>
                  <button
                    onClick={handlePunchOut}
                    disabled={isLoading}
                    className="w-full py-2.5 sm:py-3 rounded-md text-sm sm:text-base lg:text-[1.3dvw] cursor-pointer bg-(--Negative-color) text-(--primary-color) font-semibold mainFont flex justify-center items-center gap-2 sm:gap-3 lg:gap-5 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                  >
                    <span className="p-1 sm:p-1.5 bg-(--primary-color) flex justify-center items-center rounded-full text-(--mainText-color)">
                      {isLoading ? (
                        <Loader
                          size={16}
                          className="sm:w-5 sm:h-5 animate-spin"
                        />
                      ) : (
                        <LogOut size={16} className="sm:w-5 sm:h-5" />
                      )}
                    </span>
                    <span className="hidden sm:inline">
                      {isLoading ? "Punching Out..." : "Clock Out"}
                    </span>
                    <span className="sm:hidden">
                      {isLoading ? "..." : "Out"}
                    </span>
                  </button>

                  <button
                    onClick={handleBreakTime}
                    disabled={isLoading}
                    className="w-full py-2.5 sm:py-3 rounded-md text-sm sm:text-base lg:text-[1.3dvw] cursor-pointer bg-(--button-color3) text-(--primary-color) font-semibold mainFont flex justify-center items-center gap-2 sm:gap-3 lg:gap-5 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                  >
                    <span className="p-1 sm:p-1.5 bg-(--primary-color) flex justify-center items-center rounded-full text-(--mainText-color)">
                      {isLoading ? (
                        <Loader
                          size={16}
                          className="sm:w-5 sm:h-5 animate-spin"
                        />
                      ) : (
                        <UtensilsCrossed size={16} className="sm:w-5 sm:h-5" />
                      )}
                    </span>
                    {isLoading ? "Starting..." : "Break"}
                  </button>
                </>
              )}

              {punchStatus === "on-break" && (
                <>
                  <button
                    onClick={handleResumeWork}
                    disabled={isLoading}
                    className="w-full py-2.5 sm:py-3 rounded-md text-sm sm:text-base lg:text-[1.3dvw] cursor-pointer bg-(--button-color1) text-(--primary-color) font-semibold mainFont flex justify-center items-center gap-2 sm:gap-3 lg:gap-5 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                  >
                    <span className="p-1 sm:p-1.5 bg-(--primary-color) flex justify-center items-center rounded-full text-(--mainText-color)">
                      {isLoading ? (
                        <Loader
                          size={16}
                          className="sm:w-5 sm:h-5 animate-spin"
                        />
                      ) : (
                        <LogIn size={16} className="sm:w-5 sm:h-5" />
                      )}
                    </span>
                    {isLoading ? "Resuming..." : "Resume Work"}
                  </button>

                  <button
                    onClick={handlePunchOut}
                    disabled={isLoading}
                    className="w-full py-2.5 sm:py-3 rounded-md text-sm sm:text-base lg:text-[1.3dvw] cursor-pointer bg-(--Negative-color) text-(--primary-color) font-semibold mainFont flex justify-center items-center gap-2 sm:gap-3 lg:gap-5 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                  >
                    <span className="p-1 sm:p-1.5 bg-(--primary-color) flex justify-center items-center rounded-full text-(--mainText-color)">
                      {isLoading ? (
                        <Loader
                          size={16}
                          className="sm:w-5 sm:h-5 animate-spin"
                        />
                      ) : (
                        <LogOut size={16} className="sm:w-5 sm:h-5" />
                      )}
                    </span>
                    <span className="hidden sm:inline">
                      {isLoading ? "Punching Out..." : "Clock Out"}
                    </span>
                    <span className="sm:hidden">
                      {isLoading ? "..." : "Out"}
                    </span>
                  </button>
                </>
              )}

              {punchStatus === "completed" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentStateOutter(clockInVarient.OutterWrapper.exit);
                    setCurrentStateInner(clockInVarient.exit);
                    setPunchStatus(null);
                    setLocalPunchInTime(null);
                    setPunchOutTime(null);
                    setNotes("");
                    setBreakStartTime(null);
                    setTotalBreakTime(0);
                  }}
                  className="w-full py-2.5 sm:py-3 rounded-md text-sm sm:text-base lg:text-[1.3dvw] cursor-pointer bg-(--button-color1) text-(--primary-color) font-semibold mainFont flex justify-center items-center gap-2 sm:gap-3 lg:gap-5 hover:scale-105 transition-transform"
                >
                  <CircleX size={16} className="sm:w-5 sm:h-5" />
                  Close
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
