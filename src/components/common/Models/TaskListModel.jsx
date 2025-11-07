import React from "react";
import { motion } from "framer-motion";
import { CircleX } from "lucide-react";

export const TaskListModel = ({
  varient,
  setShowTaskListInner,
  setShowTaskListOutter,
  showTaskListInner,
  showTaskListOutter,
}) => {
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
                setShowTaskListInner(varient.OutterWrapper.exit);
              }}
            >
              <CircleX size={30} />
            </button>
          </div>
          <div className="h-full flex flex-col gap-2 overflow-y-auto my-4 py-4 px-2">
            {[1, 2, 3, 4, 5].map((cur, id) => (
              <div
                key={id}
                className="w-full border border-(--border-color) rounded-md p-3 flex justify-between items-center"
              >
                <div className="max-w-[70%] flex flex-col gap-2">
                  <div className="flex justify-start items-center gap-5">
                    <h5 className="text-[1.4dvw] font-semibold">
                      Task title {id+1}......
                    </h5>
                    <span className="text-[.9dvw] paraFont text-(--button-color2)">
                      20.11.2025
                    </span>
                  </div>
                  <div className="flex justify-start items-center gap-3">
                    <div className="w-[1dvw] h-[1dvw] bg-(--activeTab-color) rounded-full" />
                    <p className="text-[1dvw] paraFont font-medium text-(--activeTab-color)">
                      Task Status
                    </p>
                  </div>
                </div>
                <button className="mainFont font-semibold shrink-0 text-[.9dvw] py-3 cursor-pointer px-5 text-(--primary-color) bg-(--button-color1) rounded-md">
                  View Task
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
