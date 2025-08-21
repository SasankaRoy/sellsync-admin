import React, { useState, useEffect } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Avatar } from "@mui/material";
import { Dot, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios-interceptor";
import { Loading } from "../../../components/UI/Loading/Loading";
import { toast } from "react-toastify";
import moment from "moment";

export const ViewTask = () => {
  const navigate = useNavigate();
  const { tid } = useParams(); // Get task ID from URL parameter
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["get_task_info", tid],
    queryFn: async () => {
      try {
        const getTaskInfo = await axiosInstance.get(
          `api/v1/user/employee-task-details/${tid}`
        );

        if (getTaskInfo.status === 200 && getTaskInfo.data) {
          return getTaskInfo.data.product;
        }
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    },
  });

  const {
    data: comments = [],
    isLoading: loadingComment,
    error: errorComment,
  } = useQuery({
    queryKey: ["get_comments_list", tid],
    queryFn: async () => {
      try {
        const getCommentList = await axiosInstance.post(
          "api/v1/user/comment-list",
          {
            task_id: tid,
            page: 1,
            limit: 10,
          }
        );

        if (getCommentList.status === 200 && getCommentList.data) {
          // console.log(getCommentList.data);
          return getCommentList.data.results;
        }
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    },
  });
  const [statusUpdate, setStatusUpdate] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  useEffect(() => {
    if (data?.task_status) {
      setStatusUpdate(data.task_status);
    }
  }, [data?.task_status]);

  const handleStatusChange = async (e) => {
    try {
      if (!data.id) return;
      const reqStatusUpdate = await axiosInstance.post(
        `api/v1/user/employee-task-update/${data?.id}`,
        {
          employee_id: data.employee_id,
          task_title: data.task_title,
          task_details: data.task_details,
          task_deadline: moment(data.task_deadline).format("YYYY-MM-DD"),
          task_status: e.target.value,
        }
      );
      if (reqStatusUpdate.status === 200 && reqStatusUpdate.data) {
        toast.success(reqStatusUpdate.data.message);
        queryClient.invalidateQueries({
          queryKey: ["get_tasks_lists"],
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Something went wrong !");
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    setIsSaving(true);
    if (newComment.trim()) {
      try {
        const reqUpdateComment = await axiosInstance.post(
          "api/v1/user/comment-on-task",
          {
            task_id: tid,
            comment: newComment,
          }
        );

        if (reqUpdateComment.data && reqUpdateComment.status === 200) {
          queryClient.invalidateQueries({
            queryKey: ["get_comments_list"],
          });
          setNewComment("");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message || "Something went wrong!");
        throw new Error(error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const handleGoBack = () => {
    navigate("/admin/tasks");
  };

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full flex items-center gap-4">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-[1dvw] font-[500] text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <ArrowLeft size={20} />
              Back to Tasks
            </button>
            <h3 className="text-[1.3dvw] font-[500]">Task Details</h3>
          </div>

          <div className="w-full p-5 rounded-lg border border-[#d4d4d4] bg-white my-8">
            <h5 className="font-[500] text-[1dvw] text-gray-500 tracking-wide flex justify-start items-center gap-4">
              <div className="h-[1.2vw] w-[1.2vw] bg-red-400 rounded-full"></div>
              # {data.id}
              <span className="text-[1.4dvw] text-black">{data.name}</span>
            </h5>
            <div className="flex justify-start items-center gap-3 my-4">
              <span className="text-[1dvw] font-[500] mainFont text-gray-500">
                Title :
              </span>
              <h4 className="text-[1.5dvw] font-[500]">{data.task_title}</h4>
            </div>
            <div className="flex justify-start items-start gap-3 my-4">
              <span className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
                Description :
              </span>
              <p className="text-[1dvw] font-[400] paraFont">
                {data.task_details}
              </p>
            </div>
            <div className="flex justify-start items-center gap-3 my-4">
              <span className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
                Dead Line :
              </span>
              <p className="text-[1.3dvw] font-[400] paraFont">
                {moment(data.task_deadline).format("MMM Do YY")}
              </p>
            </div>
            <div className="flex justify-start items-center gap-3 my-4">
              <span className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
                Assigned By :
              </span>
              <p className="text-[1.3dvw] font-[400] paraFont">Admin</p>
            </div>
            <div className="flex justify-start items-center gap-3 my-4">
              <span className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
                Assigned Date :
              </span>
              <p className="text-[1.3dvw] font-[400] paraFont">
                {moment(data.updated_at).format("MMM Do YY")}
              </p>
            </div>

            <div className="flex flex-col justify-start items-start gap-2 my-4 w-[50%]">
              <label className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
                Status
              </label>
              <select
                disabled={statusUpdate === "completed"}
                id="status"
                value={statusUpdate}
                onChange={(e) => {
                  setStatusUpdate(e.target.value);
                  handleStatusChange(e);
                }}
                className={
                  "bg-[#F3F3F3] disabled:pointer-events-none disabled:opacity-75 disabled:cursor-not-allowed w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] appearance-none rounded-xl py-1.5 px-3"
                }
              >
                <option value="pending">Pending</option>
                <option value="on-going">On-going</option>
                <option value="defer">Defer</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="border border-[#d4d4d4] rounded-md bg-white p-5">
            <h3 className="text-[1.3dvw] font-[500]">Comments</h3>
            <div className="w-full min-h-[20vw] max-h-[60vh] overflow-y-auto bg-[var(--border-color)]/40 flex flex-col gap-6 justify-end items-start p-4 capitalize rounded-md mt-5">
              {comments.length === 0 ? (
                <div className="">
                  <p className="text-[1.5dvw] text-center mainFont text-gray-400/80 font-medium">
                    No Comments Found...
                  </p>
                </div>
              ) : (
                <>
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex justify-center items-start gap-3"
                    >
                      <div>
                        <Avatar />
                      </div>
                      <div className="flex justify-start items-start flex-col">
                        <div className="flex justify-start items-center gap-1">
                          <h4 className="mainFont font-[500] text-black text-[.9vw]">
                            {comment.created_by.name}
                          </h4>
                          <Dot />
                          <span className="paraFont text-[.9dvw] text-gray-500">
                            {comment.createdAt}
                          </span>
                        </div>
                        <p className="text-black paraFont text-[1.2vw]">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="flex justify-center items-center gap-4 w-full my-3">
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] appearance-none rounded-xl py-1.5 px-3 disabled:pointer-events-none disabled:opacity-70 disabled:cursor-not-allowed"
                type="text"
                placeholder="enter comments.."
                value={newComment}
                onChange={handleCommentChange}
                onKeyUp={handleKeyPress}
                disabled={isSaving}
              />
              <button
                disabled={isSaving}
                type="button"
                onClick={handleCommentSubmit}
                className="mainFont disabled:pointer-events-none disabled:opacity-70 disabled:cursor-not-allowed bg-[var(--button-color1)] text-white px-5 py-1.5 rounded-md cursor-pointer font-[500]"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};
