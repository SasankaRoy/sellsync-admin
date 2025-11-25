import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CircleX, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTaskList } from "../../../utils/apis/useTasks";

export const TaskListModel = ({
  varient,
  setShowTaskListInner,
  setShowTaskListOutter,
  showTaskListInner,
  showTaskListOutter,
}) => {
  const router = useNavigate();
  const [visibleCount, setVisibleCount] = useState(5);
  const TASKS_PER_LOAD = 5;

  // React Query hook
  const { data: tasks = [], isLoading, error } = useTaskList();

  // Memoized displayed tasks
  const displayedTasks = useMemo(() => {
    return tasks.slice(0, visibleCount);
  }, [tasks, visibleCount]);

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
        className="absolute top-0 z-50 left-0 w-full h-full bg-transparent backdrop-blur-[1px] flex justify-center items-center p-3 sm:p-0"
      >
        <motion.div
          initial="initial"
          variants={varient}
          animate={showTaskListInner}
          key={showTaskListInner}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-full sm:min-w-[25%] sm:max-w-[45%] max-h-[90vh] sm:max-h-[95%] overflow-y-auto scrollCustom bg-white rounded-md p-3 sm:p-4 lg:p-5 shadow-md"
        >
          <div className="flex justify-between items-center border-b px-2 sm:px-3 py-2 sm:py-3 border-(--border-color)/70 gap-2">
            <h3 className="text-base sm:text-lg lg:text-[1.5dvw] font-semibold text-(--mainText-color) truncate">
              Task List
            </h3>
            <button
              className="cursor-pointer flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setShowTaskListInner(varient.exit);
                setShowTaskListOutter(varient.OutterWrapper.exit);
              }}
            >
              <CircleX size={24} className="sm:w-6 sm:h-6" />
            </button>
          </div>
          <div className="h-full flex flex-col gap-2 overflow-y-auto my-3 sm:my-4 py-3 sm:py-4 px-1.5 sm:px-2">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader className="animate-spin" size={40} />
              </div>
            ) : displayedTasks && displayedTasks.length > 0 ? (
              <>
                {displayedTasks.map((task) => (
                  <div
                    key={task.id || task._id}
                    className="w-full border border-(--border-color) rounded-md p-2 sm:p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3"
                  >
                    <div className="w-full sm:max-w-[70%] flex flex-col gap-2">
                      <div className="flex justify-start items-start sm:items-center gap-1 sm:gap-2 lg:gap-5 flex-wrap">
                        <h5 className="text-xs sm:text-sm lg:text-[1.4dvw] font-semibold break-words">
                          {task.title || task.name || "Untitled Task"}
                        </h5>
                        <span className="text-xs sm:text-sm lg:text-[.9dvw] paraFont text-(--button-color2) whitespace-nowrap">
                          {formatDate(
                            task.task_deadline || task.dueDate || task.due_date
                          )}
                        </span>
                      </div>
                      <div className="flex justify-start items-center gap-2 sm:gap-3">
                        <div
                          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-[1dvw] lg:h-[1dvw] ${getStatusColor(
                            task.task_status || task.status
                          )} rounded-full flex-shrink-0`}
                        />
                        <p
                          className={`text-xs sm:text-sm lg:text-[1dvw] paraFont font-medium ${getStatusTextColor(
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
                      className="mainFont font-semibold w-full sm:w-auto shrink-0 text-xs sm:text-sm lg:text-[.9dvw] py-2 sm:py-3 px-3 sm:px-5 text-(--primary-color) bg-(--button-color1) rounded-md whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      View Task
                    </button>
                  </div>
                ))}
                {visibleCount < tasks.length && (
                  <button
                    onClick={handleLoadMore}
                    className="w-full mainFont font-semibold text-xs sm:text-sm lg:text-[.95dvw] py-2 sm:py-3 cursor-pointer mt-3 sm:mt-4 text-(--primary-color) bg-(--button-color5) hover:opacity-90 rounded-md transition-all duration-300"
                  >
                    Load More ({tasks.length - visibleCount} remaining)
                  </button>
                )}
                {visibleCount >= tasks.length &&
                  tasks.length > TASKS_PER_LOAD && (
                    <div className="text-center py-2 sm:py-3">
                      <p className="text-xs sm:text-sm lg:text-[.9dvw] text-gray-600 paraFont">
                        All {tasks.length} tasks loaded
                      </p>
                    </div>
                  )}
              </>
            ) : (
              <div className="flex justify-center items-center py-8 sm:py-10">
                <p className="text-xs sm:text-sm lg:text-[1dvw] text-gray-500">
                  No tasks available
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
