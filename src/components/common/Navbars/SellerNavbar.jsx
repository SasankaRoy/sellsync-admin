import {
  Airplay,
  CalendarClock,
  ClipboardList,
  Logs,
  ShieldUser,
  Tags,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import SellsyncLogo from "../../../assets/images/SellsyncLogo.png";
import { AnimatePresence } from "framer-motion";
import { TaskListModel } from "../Models/TaskListModel";
import { ClockInOut } from "../Models/ClockInOut";
import { useNavigate } from "react-router-dom";
import { OffcanvasMenu } from "../Models/OffcanvasMenu";

const clockInVarient = {
  initial: {
    y: "-50%",
    opacity: 0,
    scale: 0.6,
  },
  inView: {
    y: "0%",
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      duration: 1,
      ease: "circInOut",
      type: "tween",
    },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    scale: 0.6,
    transition: {
      delay: 0.1,
      duration: 1,
      ease: "circInOut",
      type: "tween",
    },
  },
  OutterWrapper: {
    initial: {
      y: "-100%",
      opacity: 0,
    },
    inView: {
      y: "0%",
      opacity: 1,

      transition: {
        delay: 0.01,
        duration: 1,
        ease: "circInOut",
        type: "tween",
      },
    },
    exit: {
      y: "-100%",
      opacity: 0,

      transition: {
        delay: 1,
        duration: 1,
        ease: "circInOut",
        type: "tween",
      },
    },
  },
};

const TaskListVarient = {
  initial: {
    y: "-100%",
    opacity: 0,
    scale: 0.8,
  },
  inView: {
    y: "0%",
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      ease: "easeInOut",
      type: "tween",
      duration: 1,
    },
  },
  exit: {
    y: "-100%",
    opacity: 0.4,
    scale: 0.8,
    transition: {
      delay: 0.2,
      ease: "easeInOut",
      type: "tween",
      duration: 0.8,
    },
  },
  OutterWrapper: {
    initial: {
      y: "-100%",
      opacity: 0,
    },
    inView: {
      y: "0%",
      opacity: 1,

      transition: {
        delay: 0.01,
        duration: 1,
        ease: "circInOut",
        type: "tween",
      },
    },
    exit: {
      y: "-100%",
      opacity: 0,

      transition: {
        delay: 0.3,
        duration: 1,
        ease: "circInOut",
        type: "tween",
      },
    },
  },
};
const OffcanvasMenuVarients = {
  initial: {
    opacity: 0,
    x: "100%",
  },
  inView: {
    opacity: 1,
    x: "0%",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      type: "tween",
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      type: "tween",
    },
  },
};

export const SellerNavbar = () => {
  const [time, setTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const navigate = useNavigate();
  const [currentStateOutter, setCurrentStateOutter] = useState(
    clockInVarient.OutterWrapper.initial
  );
  const [showOffcanvasMenu, setShowOffcanvasMenu] = useState(
    OffcanvasMenuVarients.initial
  );
  const [currentStateInner, setCurrentStateInner] = useState(
    clockInVarient.initial
  );
  const [showTaskListInner, setShowTaskListInner] = useState(
    TaskListVarient.initial
  );
  const [showTaskListOutter, setShowTaskListOutter] = useState(
    TaskListVarient.OutterWrapper.initial
  );

  useMemo(() => {
    const getTimeInterval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      setTime({
        hours:
          hours.toString().split("").length == 1
            ? `0${hours}`
            : hours.toString(),
        minutes:
          minutes.toString().split("").length == 1
            ? `0${minutes}`
            : minutes.toString(),
        seconds:
          seconds.toString().split("").length == 1
            ? `0${seconds}`
            : seconds.toString(),
      });
    }, 1000);

    return () => {
      clearInterval(getTimeInterval);
    };
  }, []);

  return (
    <>
      <header className="flex justify-center items-center py-3 bg-[#f8f8f8]/70 shadow-sm">
        <div className="w-[95%] flex justify-between items-center">
          <div>
            <div
              onClick={() => {
                navigate("/seller/dashboard");
              }}
              className=" flex cursor-pointer justify-center items-center w-[14dvw] h-auto"
            >
              <img
                alt="sellsync.com"
                src={SellsyncLogo}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-6">
            <button
              onClick={() => {
                setShowTaskListInner(TaskListVarient.inView);
                setShowTaskListOutter(TaskListVarient.OutterWrapper.inView);
              }}
              className="flex justify-center items-center gap-3 border border-(--border-color) rounded-full px-4 py-2 cursor-pointer"
            >
              <span className="bg-(--button-color5) text-(--primary-color) rounded-full p-2 flex justify-center items-center">
                <ClipboardList size={20} />
              </span>
              <p className="text-[.9dvw] font-semibold mainFont">My Tasks</p>
            </button>
            <button
              onClick={() => {
                setCurrentStateOutter(clockInVarient.OutterWrapper.inView);
                setCurrentStateInner(clockInVarient.inView);
                console.log("clicked");
              }}
              className="flex justify-center items-center gap-3 border border-(--border-color) rounded-full px-4 py-2 cursor-pointer"
            >
              <span className="bg-(--button-color1) text-(--primary-color) rounded-full p-2 flex justify-center items-center">
                <CalendarClock size={20} />
              </span>
              <p className="text-[.9dvw] font-semibold mainFont">
                {time.hours} : {time.minutes}
              </p>
            </button>
            <button className="flex justify-center items-center gap-3 border border-(--border-color) rounded-full px-4 py-2 cursor-pointer">
              <span className="bg-(--button-color4) text-(--primary-color) rounded-full p-2 flex justify-center items-center">
                <Airplay size={20} />
              </span>
              <p className="text-[.9dvw] font-semibold mainFont">
                Customer Screen
              </p>
            </button>
            <button className="flex justify-center items-center gap-3 border border-(--border-color) rounded-full px-4 py-2 cursor-pointer">
              <span className="bg-(--button-color1) text-(--primary-color) rounded-full p-2 flex justify-center items-center">
                <Tags size={20} />
              </span>
              <p className="text-[.9dvw] font-semibold mainFont">Get labels</p>
            </button>
            <button className="flex justify-center items-center gap-3 border border-(--border-color) rounded-full px-4 py-2 cursor-pointer">
              <span className="bg-(--Negative-color) text-(--primary-color) rounded-full p-2 flex justify-center items-center">
                <ShieldUser size={20} />
              </span>
              <p className="text-[.9dvw] font-semibold mainFont">Logout</p>
            </button>
            <button
              onClick={() => {
                setShowOffcanvasMenu(OffcanvasMenuVarients.inView);
              }}
              className="p-2 border border-(--border-color)/40 rounded-full cursor-pointer hover:bg-(--button-color1) hover:text-(--primary-color) transition-all duration-300 ease-in-out hover:border(--button-color1)"
            >
              <Logs />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence mode="popLayout">
        <ClockInOut
          clockInVarient={clockInVarient}
          time={time}
          setCurrentStateOutter={setCurrentStateOutter}
          setCurrentStateInner={setCurrentStateInner}
          currentStateOutter={currentStateOutter}
          currentStateInner={currentStateInner}
        />
      </AnimatePresence>
      <AnimatePresence mode="popLayout">
        <TaskListModel
          varient={TaskListVarient}
          setShowTaskListInner={setShowTaskListInner}
          setShowTaskListOutter={setShowTaskListOutter}
          showTaskListInner={showTaskListInner}
          showTaskListOutter={showTaskListOutter}
        />
      </AnimatePresence>
      <AnimatePresence mode="popLayout">
        <OffcanvasMenu
          varient={OffcanvasMenuVarients}
          setShowOffcanvasMenu={setShowOffcanvasMenu}
          showOffcanvasMenu={showOffcanvasMenu}
        />
      </AnimatePresence>
    </>
  );
};
