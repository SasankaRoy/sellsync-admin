import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CircleX, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axios-interceptor";
import { toast } from "react-toastify";

export const TaskListModel = ({
  varient,
  setShowTaskListInner,
  setShowTaskListOutter,
  showTaskListInner,
  showTaskListOutter,
}) => {
  const router = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const TASKS_PER_LOAD = 5;

  // Fetch tasks when the modal is opened
  useEffect(() => {
    if (showTaskListOutter?.opacity === 1) {
      fetchTasks();
    }
  }, [showTaskListOutter]);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/v1/user/task-list", {
        page: 1,
        limit: 100,
      });
      if (response.status === 200 && response.data) {
        // Filter tasks assigned to current employee or get all from response
        const taskList = response.data.results || response.data.tasks || [];
        setTasks(taskList);
        setDisplayedTasks(taskList.slice(0, TASKS_PER_LOAD));
        setVisibleCount(TASKS_PER_LOAD);
      }
    } catch (error) {
      console.log("Error fetching tasks:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-300";
    const statusLower = status.toLowerCase();
    if (statusLower === "completed" || statusLower === "done")
      return "bg-green-500";
    if (statusLower === "pending") return "bg-yellow-500";
    if (statusLower === "overdue") return "bg-red-500";
    return "bg-blue-500";
  };

  const getStatusTextColor = (status) => {
    if (!status) return "text-gray-600";
    const statusLower = status.toLowerCase();
    if (statusLower === "completed" || statusLower === "done")
      return "text-green-600";
    if (statusLower === "pending") return "text-yellow-600";
    if (statusLower === "overdue") return "text-red-600";
    return "text-blue-600";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB");
    } catch {
      return dateString;
    }
  };

  const handleLoadMore = () => {
    const newCount = visibleCount + TASKS_PER_LOAD;
    setVisibleCount(newCount);
    setDisplayedTasks(tasks.slice(0, newCount));
  };

  return (
    <>
      <motion.div
        initial="initial"
        variants={varient.OutterWrapper}
        animate={showTaskListOutter}
        key={showTaskListOutter}
        onClick={() => {
          setShowTaskListInner(varient.exit);
          setShowTaskListOutter(varient.OutterWrapper.exit);
        }}
        className="absolute top-0 z-50 left-0 w-full h-full bg-transparent backdrop-blur-[1px] flex justify-center items-center"
      >
        <motion.div
          initial="initial"
          variants={varient}
          animate={showTaskListInner}
          key={showTaskListInner}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="min-w-[40%] max-h-[95%]  overflow-y-auto scrollCustom max-w-[60%] bg-white rounded-md p-5 shadow-md"
        >
          <div className="flex justify-between items-center border-b px-3 py-3 border-(--border-color)/70">
            <h3 className="text-[1.5dvw] font-semibold text-(--mainText-color)">
              Task List
            </h3>
            <button
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowTaskListInner(varient.exit);
                setShowTaskListOutter(varient.OutterWrapper.exit);
              }}
            >
              <CircleX size={30} />
            </button>
          </div>
          <div className="h-full flex flex-col gap-2 overflow-y-auto my-4 py-4 px-2">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader className="animate-spin" size={40} />
              </div>
            ) : displayedTasks && displayedTasks.length > 0 ? (
              <>
                {displayedTasks.map((task) => (
                  <div
                    key={task.id || task._id}
                    className="w-full border border-(--border-color) rounded-md p-3 flex justify-between items-center"
                  >
                    <div className="max-w-[70%] flex flex-col gap-2">
                      <div className="flex justify-start items-center gap-5">
                        <h5 className="text-[1.4dvw] font-semibold">
                          {task.title || task.name || "Untitled Task"}
                        </h5>
                        <span className="text-[.9dvw] paraFont text-(--button-color2)">
                          {formatDate(
                            task.task_deadline || task.dueDate || task.due_date
                          )}
                        </span>
                      </div>
                      <div className="flex justify-start items-center gap-3">
                        <div
                          className={`w-[1dvw] h-[1dvw] ${getStatusColor(
                            task.task_status || task.status
                          )} rounded-full`}
                        />
                        <p
                          className={`text-[1dvw] paraFont font-medium ${getStatusTextColor(
                            task.task_status || task.status
                          )}`}
                        >
                          {task.task_status || task.status || "Pending"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        router(`/seller/task-details/${task.id || task._id}`);
                      }}
                      className="mainFont font-semibold shrink-0 text-[.9dvw] py-3 cursor-pointer px-5 text-(--primary-color) bg-(--button-color1) rounded-md"
                    >
                      View Task
                    </button>
                  </div>
                ))}
                {visibleCount < tasks.length && (
                  <button
                    onClick={handleLoadMore}
                    className="w-full mainFont font-semibold text-[.95dvw] py-3 cursor-pointer mt-4 text-(--primary-color) bg-(--button-color5) hover:opacity-90 rounded-md transition-all duration-300"
                  >
                    Load More ({tasks.length - visibleCount} remaining)
                  </button>
                )}
                {visibleCount >= tasks.length &&
                  tasks.length > TASKS_PER_LOAD && (
                    <div className="text-center py-3">
                      <p className="text-[.9dvw] text-gray-600 paraFont">
                        All {tasks.length} tasks loaded
                      </p>
                    </div>
                  )}
              </>
            ) : (
              <div className="flex justify-center items-center py-10">
                <p className="text-[1dvw] text-gray-500">No tasks available</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
