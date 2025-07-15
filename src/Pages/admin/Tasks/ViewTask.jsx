import React from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Avatar } from "@mui/material";
import { Dot } from "lucide-react";

export const ViewTask = () => {
  return (
    <Layout>
      <div className="w-full">
        <h3 className="text-[1.3dvw] font-[500] ">Task Details</h3>
      </div>
      <div className="w-full p-5 rounded-lg border border-[#d4d4d4] bg-white my-8">
        <h5 className="font-[500] text-[1dvw] text-gray-500 tracking-wide flex justify-start items-center gap-4">
          <div className="h-[1.2vw] w-[1.2vw] bg-red-400 rounded-full"></div>{" "}
          #665e9c1e9f4f123456789def{" "}
          <span className="text-[1.4dvw] text-black">Shasank</span>
        </h5>
        <div className="flex justify-start items-center gap-3 my-4">
          <span className="text-[1dvw] font-[500] mainFont text-gray-500">
            Title :
          </span>
          <h4 className=" text-[1.5dvw] font-[500]">
            Create the Backend Api for Sell-sync
          </h4>
        </div>
        <div className="flex justify-start items-start gap-3 my-4">
          <span className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
            Description :
          </span>
          <p className=" text-[1dvw] font-[400] paraFont">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
        <div className="flex justify-start items-center gap-3 my-4">
          <span className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
            Dead Line :
          </span>
          <p className=" text-[1.3dvw] font-[400] paraFont">20.02.2025</p>
        </div>
        <div className="flex justify-start items-center gap-3 my-4">
          <span className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
            Assigned By :
          </span>
          <p className=" text-[1.3dvw] font-[400] paraFont">Admin</p>
        </div>
        <div className="flex flex-col justify-start items-start gap-2 my-4 w-[50%]">
          <label className="text-[1dvw] shrink-0 font-[500] mainFont text-gray-500">
            Status
          </label>
          <select
            id="status"
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] appearance-none rounded-xl py-1.5 px-3"
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
          <div className="flex justify-center items-start gap-3">
            <div>
              <Avatar />
            </div>
            <div className="flex justify-start items-start flex-col">
              <div className="flex justify-start items-center gap-1">
                <h4 className="mainFont font-[500] text-black text-[.9vw]">
                  Shasank
                </h4>
                <Dot />
                <span className="paraFont text-[.9dvw] text-gray-500">07/02</span>
              </div>
              <p className="text-black paraFont text-[1.2vw]">The message</p>
            </div>
          </div>
          <div className="flex justify-center items-start gap-3">
            <div>
              <Avatar />
            </div>
            <div className="flex justify-start items-start flex-col">
              <div className="flex justify-start items-center gap-1">
                <h4 className="mainFont font-[500] text-black text-[.9vw]">
                  Shasank
                </h4>
                <Dot />
                <span className="paraFont text-[.9dvw] text-gray-500">07/02</span>
              </div>
              <p className="text-black paraFont text-[1.2vw]">The message</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 w-full my-3">
          <input
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] appearance-none rounded-xl py-1.5 px-3"
            type="text"
            placeholder="enter comments.."
          />{" "}
          <button className="mainFont bg-[var(--button-color1)] text-white px-5 py-1.5 rounded-md cursor-pointer font-[500]">
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
};
