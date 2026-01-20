import {
  Airplay,
  CalendarClock,
  ClipboardList,
  Logs,
  ShieldUser,
  Tags,
} from "lucide-react";
import React, { useMemo, useState, useEffect } from "react";
import SellsyncLogo from "../../../assets/images/SellsyncLogo.png";
import { AnimatePresence } from "framer-motion";
// import { TaskListModel } from "../Models/TaskListModel";
const TaskListModel = React.lazy(() =>
  import("../Models/TaskListModel").then((module) => ({
    default: module.TaskListModel,
  }))
);
import { ClockInOut } from "../Models/ClockInOut";
import { useNavigate } from "react-router-dom";
import { OffcanvasMenu } from "../Models/OffcanvasMenu";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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

export const SellerNavbar = ({ showPunchInModal, setShowPunchInModal }) => {
  const [time, setTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [workDuration, setWorkDuration] = useState({
    hours: "0",
    minutes: "0",
    seconds: "0",
  });
  const [showTaskListModel, setShowTaskListModel] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentStateOutter, setCurrentStateOutter] = useState(
    showPunchInModal
      ? clockInVarient.OutterWrapper.inView
      : clockInVarient.OutterWrapper.initial
  );
  const [showOffcanvasMenu, setShowOffcanvasMenu] = useState(
    OffcanvasMenuVarients.initial
  );
  const [currentStateInner, setCurrentStateInner] = useState(
    showPunchInModal ? clockInVarient.inView : clockInVarient.initial
  );
  const [showTaskListInner, setShowTaskListInner] = useState(
    TaskListVarient.initial
  );
  const [showTaskListOutter, setShowTaskListOutter] = useState(
    TaskListVarient.OutterWrapper.initial
  );

  const handleLogout = () => {
    toast.warn("Please Close your Register first !");
    navigate("/seller/reports");

    // Remove all auth cookies
    // Cookies.remove("authToken", { path: "/" });
    // Cookies.remove("u_id", { path: "/" });
    // Cookies.remove("u_type", { path: "/" });

    // Optionally dispatch logout action to Redux
    // dispatch(clearUser()); // if you have a clearUser action

    // toast.success("Logged out successfully");

    // // Redirect to login page
    // navigate("/auth/login", { replace: true });
  };

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
      setCurrentTime(date);
    }, 1000);

    return () => {
      clearInterval(getTimeInterval);
    };
  }, []);

  // Calculate work duration when punch in time is set

  useEffect(() => {
    if (punchInTime) {
      const timer = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - punchInTime.getTime();
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setWorkDuration({
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [punchInTime]);

  return (
    <>
      <header className="flex justify-center items-center py-2 sm:py-3 bg-[#f8f8f8]/70 shadow-sm w-full max-w-full overflow-x-hidden">
        <div className="w-[95%] flex justify-between items-center">
          <div>
            <div
              onClick={() => {
                navigate("/seller/dashboard");
              }}
              className=" flex cursor-pointer justify-center items-center w-[120px] sm:w-[140px] md:w-[14dvw] h-auto"
            >
              <img
                alt="sellsync.com"
                src={SellsyncLogo}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="hidden md:flex flex-wrap justify-center items-center gap-2 sm:gap-6">
            <button
              onClick={() => {
                setShowTaskListInner(TaskListVarient.inView);
                setShowTaskListOutter(TaskListVarient.OutterWrapper.inView);
                setShowTaskListModel(true);
              }}
              className="flex justify-center items-center gap-3 border border-(--border-color) rounded-full px-2 py-1 sm:px-4 sm:py-2 cursor-pointer"
            >
              <span className="bg-(--button-color5) text-(--primary-color) rounded-full p-2 flex justify-center items-center">
                <ClipboardList size={20} />
              </span>
              <p className="text-[.9dvw] font-semibold mainFont hidden sm:block">
                My Tasks
              </p>
            </button>
            <button
              onClick={() => {
                setCurrentStateOutter(clockInVarient.OutterWrapper.inView);
                setCurrentStateInner(clockInVarient.inView);
                console.log("clicked");
              }}
              className="flex justify-center items-center gap-3 border border-(--border-color) rounded-full px-2 py-1 sm:px-4 sm:py-2 cursor-pointer"
            >
              <span className="bg-(--button-color1) text-(--primary-color) rounded-full p-2 flex justify-center items-center">
                <CalendarClock size={20} />
              </span>
              <p className="text-[.9dvw] font-semibold mainFont">
                {punchInTime
                  ? `${workDuration.hours}:${workDuration.minutes}:${workDuration.seconds}`
                  : `${time.hours}:${time.minutes}`}
              </p>
            </button>
            <button
              onClick={() => {
                window.open(
                  "/seller/customer-screen",
                  "_blank",
                  "width=600,height=700,scrollbars=yes,resizable=yes"
                );
              }}
              className="flex justify-center items-center gap-3 border border-(--border-color) rounded-full px-2 py-1 sm:px-4 sm:py-2 cursor-pointer hover:bg-(--button-color4)/10 transition-all duration-300"
            >
              <span className="bg-(--button-color4) text-(--primary-color) rounded-full p-2 flex justify-center items-center">
                <Airplay size={20} />
              </span>
              <p className="text-[.9dvw] font-semibold mainFont hidden sm:block">
                Customer Screen
              </p>
            </button>
            <button className="flex justify-center items-center gap-3 border border-(--border-color) rounded-full px-2 py-1 sm:px-4 sm:py-2 cursor-pointer">
              <span className="bg-(--button-color1) text-(--primary-color) rounded-full p-2 flex justify-center items-center">
                <Tags size={20} />
              </span>
              <p className="text-[.9dvw] font-semibold mainFont hidden sm:block">
                Get labels
              </p>
            </button>
            <button
              onClick={handleLogout}
              className="flex justify-center items-center gap-3 border border-(--border-color) rounded-full px-2 py-1 sm:px-4 sm:py-2 cursor-pointer hover:bg-(--Negative-color) hover:text-white transition-all duration-300"
            >
              <span className="bg-(--Negative-color) text-(--primary-color) rounded-full p-2 flex justify-center items-center">
                <ShieldUser size={20} />
              </span>
              <p className="text-[.9dvw] font-semibold mainFont hidden sm:block">
                Logout
              </p>
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1.5 sm:gap-2">
            {/* Tasks Button for mobile */}
            <button
              onClick={() => {
                setShowTaskListInner(TaskListVarient.inView);
                setShowTaskListOutter(TaskListVarient.OutterWrapper.inView);
              }}
              className="flex justify-center items-center border border-(--border-color) rounded-full p-1.5 sm:p-2 cursor-pointer"
              title="My Tasks"
            >
              <span className="bg-(--button-color5) text-(--primary-color) rounded-full p-1.5 sm:p-2 flex justify-center items-center">
                <ClipboardList size={16} className="sm:w-[18px] sm:h-[18px]" />
              </span>
            </button>

            {/* Clock In/Out Button for mobile */}
            <button
              onClick={() => {
                setCurrentStateOutter(clockInVarient.OutterWrapper.inView);
                setCurrentStateInner(clockInVarient.inView);
              }}
              className="flex justify-center items-center border border-(--border-color) rounded-full p-1.5 sm:p-2 cursor-pointer"
              title="Clock In/Out"
            >
              <span className="bg-(--button-color1) text-(--primary-color) rounded-full p-1.5 sm:p-2 flex justify-center items-center">
                <CalendarClock size={16} className="sm:w-[18px] sm:h-[18px]" />
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                setShowOffcanvasMenu(OffcanvasMenuVarients.inView);
              }}
              className="p-1.5 sm:p-2 border border-(--border-color)/40 rounded-full cursor-pointer hover:bg-(--button-color1) hover:text-(--primary-color) transition-all duration-300"
              title="Menu"
            >
              <Logs size={18} className="sm:w-5 sm:h-5" />
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
          setPunchInTime={setPunchInTime}
        />
      </AnimatePresence>

      {showTaskListModel && (
        <TaskListModel
          varient={TaskListVarient}
          setShowTaskListInner={setShowTaskListInner}
          setShowTaskListOutter={setShowTaskListOutter}
          showTaskListInner={showTaskListInner}
          showTaskListOutter={showTaskListOutter}
        />
      )}
      {/* <AnimatePresence mode="popLayout">
        <TaskListModel
          varient={TaskListVarient}
          setShowTaskListInner={setShowTaskListInner}
          setShowTaskListOutter={setShowTaskListOutter}
          showTaskListInner={showTaskListInner}
          showTaskListOutter={showTaskListOutter}
        />
      </AnimatePresence> */}
      <AnimatePresence mode="popLayout">
        <OffcanvasMenu
          varient={OffcanvasMenuVarients}
          setShowOffcanvasMenu={setShowOffcanvasMenu}
          showOffcanvasMenu={showOffcanvasMenu}
          setShowTaskListInner={setShowTaskListInner}
          setShowTaskListOutter={setShowTaskListOutter}
          TaskListVarient={TaskListVarient}
        />
      </AnimatePresence>
    </>
  );
};
