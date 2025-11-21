import React from "react";
import { SellerNavbar } from "../../components/common/Navbars/SellerNavbar";
import { ArrowLeft, Dot, Loader } from "lucide-react";
import { Avatar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useTaskById, useUpdateTaskStatus } from "../../utils/apis/useTasks";

const comments = [1, 2, 3, 3];

export const TaskDetails = () => {
  const navigate = useNavigate();
  const { id: taskId } = useParams();

  // React Query hooks
  const { data: task, isLoading, error } = useTaskById(taskId);

  const updateTaskMutation = useUpdateTaskStatus();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleStatusChange = async (newStatus) => {
    if (task) {
      updateTaskMutation.mutate({
        taskId,
        task,
        newStatus,
      });
    }
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

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-300";
    const statusLower = status.toLowerCase();
    if (statusLower === "completed" || statusLower === "done")
      return "bg-green-500";
    if (statusLower === "pending") return "bg-yellow-500";
    if (statusLower === "on-going") return "bg-blue-500";
    if (statusLower === "defer") return "bg-red-500";
    return "bg-gray-500";
  };

  if (isLoading) {
    return (
      <>
        <SellerNavbar />
        <div className="w-full sm:w-[90%] lg:w-[85%] mx-auto py-3 sm:py-4 overflow-y-auto h-[calc(100vh-70px)] sm:h-[calc(100vh-80px)] scrollCustom flex justify-center items-center">
          <Loader className="animate-spin" size={40} />
        </div>
      </>
    );
  }

  if (!task) {
    return (
      <>
        <SellerNavbar />
        <div className="w-full sm:w-[90%] lg:w-[85%] mx-auto py-3 sm:py-4 overflow-y-auto h-[calc(100vh-70px)] sm:h-[calc(100vh-80px)] scrollCustom">
          <div className="w-full flex items-center gap-2 sm:gap-4">
            <button
              onClick={handleGoBack}
              className="flex items-center mainFont font-semibold border border-(--border-color) px-3 sm:px-4 py-1.5 rounded-full gap-2 text-xs sm:text-sm lg:text-[1dvw] text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <span className="p-1.5 flex justify-center items-center bg-(--button-color1) text-white rounded-full shrink-0">
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              </span>
              <span className="hidden sm:inline">Back to Tasks</span>
            </button>
          </div>
          <p className="text-sm sm:text-base lg:text-[1.2dvw] text-gray-500 mt-6 sm:mt-8">
            Task not found
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <SellerNavbar />
      <div className="w-full sm:w-[90%] lg:w-[85%] mx-auto py-3 sm:py-4 overflow-y-auto h-[calc(100vh-70px)] sm:h-[calc(100vh-80px)] scrollCustom">
        <div className="w-full flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center mainFont font-semibold border border-(--border-color) px-3 sm:px-4 py-1.5 rounded-full gap-2 text-xs sm:text-sm lg:text-[1dvw] text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            <span className="p-1.5 flex justify-center items-center bg-(--button-color1) text-white rounded-full shrink-0">
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
            </span>
            <span className="hidden sm:inline">Back to Tasks</span>
          </button>
          <h3 className="text-sm sm:text-base lg:text-[1.3dvw] font-[500]">
            Task Details
          </h3>
        </div>

        <div className="w-full p-3 sm:p-4 lg:p-5 rounded-lg border border-[#d4d4d4] bg-white mb-4 sm:mb-6 lg:mb-8">
          <h5 className="font-[500] text-xs sm:text-sm lg:text-[1dvw] text-gray-500 tracking-wide flex justify-start items-center gap-2 sm:gap-3 lg:gap-4 flex-wrap">
            <div
              className={`h-3 w-3 sm:h-4 sm:w-4 lg:h-[1.2vw] lg:w-[1.2vw] ${getStatusColor(
                task.task_status
              )} rounded-full flex-shrink-0`}
            ></div>
            <span className="text-xs sm:text-sm"># {task.id}</span>
            <span className="text-sm sm:text-base lg:text-[1.4dvw] text-black">
              {task.employee_name || "N/A"}
            </span>
          </h5>
          <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 sm:gap-3 my-3 sm:my-4">
            <span className="text-xs sm:text-sm lg:text-[1dvw] font-[500] mainFont text-gray-500 whitespace-nowrap">
              Title :
            </span>
            <h4 className="text-sm sm:text-base lg:text-[1.5dvw] font-[500] break-words">
              {task.title || "Untitled Task"}
            </h4>
          </div>
          <div className="flex flex-col sm:flex-row justify-start items-start gap-2 sm:gap-3 my-3 sm:my-4">
            <span className="text-xs sm:text-sm lg:text-[1dvw] shrink-0 font-[500] mainFont text-gray-500 whitespace-nowrap">
              Description :
            </span>
            <p className="text-xs sm:text-sm lg:text-[1dvw] font-[400] paraFont break-words">
              {task.task_details || "No description provided"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 sm:gap-3 my-3 sm:my-4">
            <span className="text-xs sm:text-sm lg:text-[1dvw] shrink-0 font-[500] mainFont text-gray-500 whitespace-nowrap">
              Dead Line :
            </span>
            <p className="text-xs sm:text-sm lg:text-[1.3dvw] font-[400] paraFont">
              {formatDate(task.task_deadline)}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 sm:gap-3 my-3 sm:my-4">
            <span className="text-xs sm:text-sm lg:text-[1dvw] shrink-0 font-[500] mainFont text-gray-500 whitespace-nowrap">
              Assigned By :
            </span>
            <p className="text-xs sm:text-sm lg:text-[1.3dvw] font-[400] paraFont">
              Admin
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 sm:gap-3 my-3 sm:my-4">
            <span className="text-xs sm:text-sm lg:text-[1dvw] shrink-0 font-[500] mainFont text-gray-500 whitespace-nowrap">
              Assigned Date :
            </span>
            <p className="text-xs sm:text-sm lg:text-[1.3dvw] font-[400] paraFont">
              {formatDate(task.createdAt)}
            </p>
          </div>

          <div className="flex flex-col justify-start items-start gap-2 my-3 sm:my-4 w-full sm:w-[70%] lg:w-[50%]">
            <label className="text-xs sm:text-sm lg:text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
              Status
            </label>
            <select
              id="status"
              value={task?.task_status || ""}
              onChange={(e) => {
                handleStatusChange(e.target.value);
              }}
              disabled={updateTaskMutation.isPending}
              className={
                "bg-[#F3F3F3] disabled:pointer-events-none disabled:opacity-75 disabled:cursor-not-allowed w-full font-semibold placeholder:text-[#333333]/40 text-xs sm:text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] appearance-none rounded-xl py-1.5 px-3"
              }
            >
              <option value="pending">Pending</option>
              <option value="on-going">On-going</option>
              <option value="defer">Defer</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="border border-[#d4d4d4] rounded-md bg-white p-3 sm:p-4 lg:p-5">
          <h3 className="text-sm sm:text-base lg:text-[1.3dvw] font-[500]">
            Comments
          </h3>
          <div className="w-full min-h-[200px] sm:min-h-[300px] max-h-[50vh] overflow-y-auto bg-[var(--border-color)]/40 flex flex-col gap-3 sm:gap-4 lg:gap-6 justify-end items-start p-3 sm:p-4 capitalize rounded-md mt-3 sm:mt-5">
            {comments.length === 0 ? (
              <div className="w-full flex justify-center items-center py-8">
                <p className="text-sm sm:text-base lg:text-[1.5dvw] text-center mainFont text-gray-400/80 font-medium">
                  No Comments Found...
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-start items-start gap-2 sm:gap-3 w-full">
                  <div className="flex-shrink-0">
                    <Avatar sx={{ width: 32, height: 32 }} />
                  </div>
                  <div className="flex justify-start items-start flex-col flex-1">
                    <div className="flex justify-start items-center gap-1 flex-wrap">
                      <h4 className="mainFont font-[500] text-black text-xs sm:text-sm lg:text-[.9vw]">
                        John
                      </h4>
                      <Dot size={16} />
                      <span className="paraFont text-xs sm:text-sm lg:text-[.9dvw] text-gray-500">
                        13.02
                      </span>
                    </div>
                    <p className="text-black paraFont text-xs sm:text-sm lg:text-[1.2vw]">
                      Ok
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-2 sm:gap-3 lg:gap-4 w-full my-3 sm:my-4">
            <input
              className="bg-[#F3F3F3] w-full font-semibold placeholder:text-[#333333]/40 text-xs sm:text-sm lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] appearance-none rounded-xl py-1.5 px-3 disabled:pointer-events-none disabled:opacity-70 disabled:cursor-not-allowed"
              type="text"
              placeholder="enter comments.."
              disabled={task?.task_status?.toLowerCase() === "completed"}
            />
            <button
              type="button"
              className="mainFont disabled:pointer-events-none disabled:opacity-70 disabled:cursor-not-allowed bg-[var(--button-color1)] text-white px-4 sm:px-5 py-1.5 rounded-md cursor-pointer font-[500] text-xs sm:text-sm lg:text-base whitespace-nowrap"
              disabled={task?.task_status?.toLowerCase() === "completed"}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
