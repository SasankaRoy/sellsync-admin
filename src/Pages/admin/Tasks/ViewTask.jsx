import React, { useState, useEffect } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Avatar } from "@mui/material";
import { Dot, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const ViewTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tid } = useParams(); // Get task ID from URL parameter
  const [taskData, setTaskData] = useState(null);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Shasank",
      message: "The message",
      date: "07/02"
    },
    {
      id: 2,
      author: "Shasank", 
      message: "The message",
      date: "07/02"
    }
  ]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    console.log("ViewTask mounted");
    console.log("Task ID from URL:", tid);
    console.log("Location state:", location.state);
    
    // Get task data from navigation state
    if (location.state && location.state.taskData) {
      console.log("Using task data from navigation state");
      setTaskData(location.state.taskData);
    } else if (tid) {
      console.log("Creating fallback task data for ID:", tid);
      // If no state data but we have task ID, create fallback data
      // In a real app, you would fetch this data from an API using the tid
      const fallbackTaskData = {
        TaskID: tid,
        EmployeeName: "Employee Name",
        TaskTitle: "Task Title",
        Description: "Task description will be loaded here...",
        DeadLine: "Not specified",
        AssignedBy: "Admin",
        AssignedDate: "Not specified",
        PhoneNumber: "Not specified",
        Status: "Pending"
      };
      setTaskData(fallbackTaskData);
    } else {
      console.log("No task data found, redirecting to tasks");
      navigate('/admin/tasks');
    }
  }, [location, navigate, tid]);

  const handleStatusChange = (e) => {
    if (taskData) {
      setTaskData({
        ...taskData,
        Status: e.target.value
      });
    }
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Current User", // You can replace this with actual user name
        message: newComment,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommentSubmit();
    }
  };

  const handleGoBack = () => {
    navigate('/admin/tasks');
  };

  if (!taskData) {
    return (
      <Layout>
        <div className="w-full">
          <h3 className="text-[1.3dvw] font-[500]">Loading Task Details...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
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
          #{taskData.TaskID}
          <span className="text-[1.4dvw] text-black">{taskData.EmployeeName}</span>
        </h5>
        <div className="flex justify-start items-center gap-3 my-4">
          <span className="text-[1dvw] font-[500] mainFont text-gray-500">
            Title :
          </span>
          <h4 className="text-[1.5dvw] font-[500]">
            {taskData.TaskTitle}
          </h4>
        </div>
        <div className="flex justify-start items-start gap-3 my-4">
          <span className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
            Description :
          </span>
          <p className="text-[1dvw] font-[400] paraFont">
            {taskData.Description}
          </p>
        </div>
        <div className="flex justify-start items-center gap-3 my-4">
          <span className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
            Dead Line :
          </span>
          <p className="text-[1.3dvw] font-[400] paraFont">{taskData.DeadLine}</p>
        </div>
        <div className="flex justify-start items-center gap-3 my-4">
          <span className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
            Assigned By :
          </span>
          <p className="text-[1.3dvw] font-[400] paraFont">{taskData.AssignedBy}</p>
        </div>
        <div className="flex justify-start items-center gap-3 my-4">
          <span className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
            Assigned Date :
          </span>
          <p className="text-[1.3dvw] font-[400] paraFont">{taskData.AssignedDate}</p>
        </div>
        <div className="flex justify-start items-center gap-3 my-4">
          <span className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
            Phone Number :
          </span>
          <p className="text-[1.3dvw] font-[400] paraFont">{taskData.PhoneNumber}</p>
        </div>
        <div className="flex flex-col justify-start items-start gap-2 my-4 w-[50%]">
          <label className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
            Status
          </label>
          <select
            id="status"
            value={taskData.Status}
            onChange={handleStatusChange}
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] appearance-none rounded-xl py-1.5 px-3"
          >
            <option>Pending</option>
            <option>On-going</option>
            <option>Defer</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div className="border border-[#d4d4d4] rounded-md bg-white p-5">
        <h3 className="text-[1.3dvw] font-[500]">Comments</h3>
        <div className="w-full min-h-[20vw] max-h-[60vh] overflow-y-auto bg-[var(--border-color)]/40 flex flex-col gap-6 justify-end items-start p-4 capitalize rounded-md mt-5">
          {comments.map((comment) => (
            <div key={comment.id} className="flex justify-center items-start gap-3">
              <div>
                <Avatar />
              </div>
              <div className="flex justify-start items-start flex-col">
                <div className="flex justify-start items-center gap-1">
                  <h4 className="mainFont font-[500] text-black text-[.9vw]">
                    {comment.author}
                  </h4>
                  <Dot />
                  <span className="paraFont text-[.9dvw] text-gray-500">
                    {comment.date}
                  </span>
                </div>
                <p className="text-black paraFont text-[1.2vw]">
                  {comment.message}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-4 w-full my-3">
          <input
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] appearance-none rounded-xl py-1.5 px-3"
            type="text"
            placeholder="enter comments.."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            onClick={handleCommentSubmit}
            className="mainFont bg-[var(--button-color1)] text-white px-5 py-1.5 rounded-md cursor-pointer font-[500]"
          >
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
};