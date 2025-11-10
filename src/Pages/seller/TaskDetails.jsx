import React from "react";
import { SellerNavbar } from "../../components/common/Navbars/SellerNavbar";
import { ArrowLeft, Dot } from "lucide-react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
const comments = [1, 2, 3, 3];

export const TaskDetails = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <SellerNavbar />
      <div className="w-[85%] mx-auto py-4 overflow-y-auto h-[88vh] scrollCustom">
        <div className="w-full flex items-center gap-4">
          <button
            onClick={handleGoBack}
            className="flex items-center mainFont font-semibold border border-(--border-color) px-4 py-1.5 rounded-full gap-2 text-[1dvw] text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            <span className="p-1.5 flex justify-center items-center bg-(--button-color1) text-white rounded-full">
              <ArrowLeft size={20} />
            </span>
            Back to Tasks
          </button>
          <h3 className="text-[1.3dvw] font-[500]">Task Details</h3>
        </div>

        <div className="w-full p-5 rounded-lg border border-[#d4d4d4] bg-white my-8">
          <h5 className="font-[500] text-[1dvw] text-gray-500 tracking-wide flex justify-start items-center gap-4">
            <div className="h-[1.2vw] w-[1.2vw] bg-red-400 rounded-full"></div>#{" "}
            {/* {data.id} */} 68bf05794cd5465159e56f3b
            <span className="text-[1.4dvw] text-black">John Doe</span>
          </h5>
          <div className="flex justify-start items-center gap-3 my-4">
            <span className="text-[1dvw] font-[500] mainFont text-gray-500">
              Title :
            </span>
            <h4 className="text-[1.5dvw] font-[500]">
              Keep the note of the latest stocks
            </h4>
          </div>
          <div className="flex justify-start items-start gap-3 my-4">
            <span className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
              Description :
            </span>
            <p className="text-[1dvw] font-[400] paraFont">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="flex justify-start items-center gap-3 my-4">
            <span className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
              Dead Line :
            </span>
            <p className="text-[1.3dvw] font-[400] paraFont">
              {/* {moment(data.task_deadline).format("MMM Do YY")} */}{" "}
              20.11.2025
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
              {/* {moment(data.updated_at).format("MMM Do YY")} */} 20.11.2025
            </p>
          </div>

          <div className="flex flex-col justify-start items-start gap-2 my-4 w-[50%]">
            <label className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
              Status
            </label>
            <select
              // disabled={statusUpdate === "completed"}
              id="status"
              // value={statusUpdate}
              // onChange={(e) => {
              //   setStatusUpdate(e.target.value);
              //   handleStatusChange(e);
              // }}
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
                {/* {comments.map((comment) => (
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
                ))} */}

                <div
                  // key={comment.id}
                  className="flex justify-center items-start gap-3"
                >
                  <div>
                    <Avatar />
                  </div>
                  <div className="flex justify-start items-start flex-col">
                    <div className="flex justify-start items-center gap-1">
                      <h4 className="mainFont font-[500] text-black text-[.9vw]">
                        John
                      </h4>
                      <Dot />
                      <span className="paraFont text-[.9dvw] text-gray-500">
                        13.02
                      </span>
                    </div>
                    <p className="text-black paraFont text-[1.2vw]">
                      Ok
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-center items-center gap-4 w-full my-3">
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] appearance-none rounded-xl py-1.5 px-3 disabled:pointer-events-none disabled:opacity-70 disabled:cursor-not-allowed"
              type="text"
              placeholder="enter comments.."
              // value={newComment}
              // onChange={handleCommentChange}
              // onKeyUp={handleKeyPress}
              // disabled={isSaving}
            />
            <button
              // disabled={isSaving}
              type="button"
              // onClick={handleCommentSubmit}
              className="mainFont disabled:pointer-events-none disabled:opacity-70 disabled:cursor-not-allowed bg-[var(--button-color1)] text-white px-5 py-1.5 rounded-md cursor-pointer font-[500]"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
