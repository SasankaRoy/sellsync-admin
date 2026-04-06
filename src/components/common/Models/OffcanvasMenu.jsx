import React from "react";
import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  CircleX,
  ClipboardMinus,
  Settings,  
  Airplay,
  Tags,
  ShieldUser,
  BookCheck,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Updates for print lables...
// Scan, sreach by category, manual

export const OffcanvasMenu = ({
  varient,
  setShowOffcanvasMenu,
  showOffcanvasMenu,
  setShowTaskListInner,
  setShowTaskListOutter,
  TaskListVarient,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove all auth cookies
    Cookies.remove("authToken", { path: "/" });
    Cookies.remove("u_id", { path: "/" });
    Cookies.remove("u_type", { path: "/" });

    toast.success("Logged out successfully");

    // Redirect to login page
    navigate("/auth/login", { replace: true });
  };

  const handleTasksClick = () => {
    setShowOffcanvasMenu(varient.exit);
    setShowTaskListInner(TaskListVarient.inView);
    setShowTaskListOutter(TaskListVarient.OutterWrapper.inView);
  };

  return (
    <>
      <motion.div
        initial="initial"
        variants={varient}
        key={showOffcanvasMenu}
        animate={showOffcanvasMenu}
        className="absolute z-50 w-full sm:w-[70%] md:w-[50%] lg:min-w-[35%] max-w-full p-3 sm:p-4 lg:p-5 right-0 top-0 h-screen bg-(--primary-color) border-l border-(--border-color)/30 shadow overflow-y-auto overflow-x-hidden"
      >
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            type: "tween",
            ease: "anticipate",
            delay: 0.3,
          }}
          className=" flex justify-between items-center px-2 border-b border-(--border-color) p-4"
        >
          <h3 className="text-lg sm:text-xl lg:text-[1.7dvw] font-semibold">
            Menu
          </h3>
          <button
            onClick={() => {
              setShowOffcanvasMenu(varient.exit);
            }}
            className="cursor-pointer"
          >
            <CircleX
              size={24}
              className="sm:w-7 sm:h-7 lg:w-[30px] lg:h-[30px]"
            />
          </button>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            type: "tween",
            ease: "anticipate",
            delay: 0.3,
          }}
          className="flex flex-col gap-5 my-5"
        >
          <NavLink
            onClick={() => setShowOffcanvasMenu(varient.exit)}
            to="/seller/sales-report"
            className="flex justify-start px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 mainFont font-semibold tracking-wider text-sm sm:text-base lg:text-[1.8dvw] items-center gap-3 sm:gap-4 lg:gap-6 border-b hover:bg-(--button-color2) hover:text-(--primary-color) hover:rounded-md transition-all duration-300 ease-linear cursor-pointer border-(--border-color) text-(--button-color2)"
          >
            <span>
              <BadgeDollarSign
                size={24}
                className="sm:w-8 sm:h-8 lg:w-10 lg:h-10"
              />
            </span>
            Sales
          </NavLink>
          <NavLink
            onClick={() => setShowOffcanvasMenu(varient.exit)}
            to="/seller/leave-management"
            className="flex justify-start px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 mainFont font-semibold tracking-wider text-sm sm:text-base lg:text-[1.8dvw] items-center gap-3 sm:gap-4 lg:gap-6 border-b hover:bg-(--button-color2) hover:text-(--primary-color) hover:rounded-md transition-all duration-300 ease-linear cursor-pointer border-(--border-color) text-(--button-color2)"
          >
            <span>
              <BookCheck size={24} className="sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
            </span>
            Leave Management
          </NavLink>
          <NavLink
            onClick={() => setShowOffcanvasMenu(varient.exit)}
            to="/seller/reports"
            className="flex justify-start px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 mainFont font-semibold tracking-wider text-sm sm:text-base lg:text-[1.8dvw] items-center gap-3 sm:gap-4 lg:gap-6 border-b hover:bg-(--button-color2) hover:text-(--primary-color) hover:rounded-md transition-all duration-300 ease-linear cursor-pointer border-(--border-color) text-(--button-color2)"
          >
            <span>
              <ClipboardMinus
                size={24}
                className="sm:w-8 sm:h-8 lg:w-10 lg:h-10"
              />
            </span>
            Reports
          </NavLink>
          <button className="flex justify-start px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 mainFont font-semibold tracking-wider text-sm sm:text-base lg:text-[1.8dvw] items-center gap-3 sm:gap-4 lg:gap-6 border-b hover:bg-(--button-color1) hover:text-(--primary-color) hover:rounded-md transition-all duration-300 ease-linear cursor-pointer border-(--border-color) text-(--button-color1)">
            <span>
              <Settings size={24} className="sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
            </span>
            Settings
          </button>
          <button
            onClick={() => {
              handleLogout();
              setShowOffcanvasMenu(varient.exit);
            }}
            className="flex justify-start px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 mainFont font-semibold tracking-wider text-sm sm:text-base lg:text-[1.8dvw] items-center gap-3 sm:gap-4 lg:gap-6 border-b hover:bg-(--Negative-color) hover:text-(--primary-color) hover:rounded-md transition-all duration-300 ease-linear cursor-pointer border-(--border-color) text-(--Negative-color)"
          >
            <span>
              <ShieldUser size={24} className="sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
            </span>
            Logout
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};
