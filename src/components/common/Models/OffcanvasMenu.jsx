import React from "react";
import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  CircleX,
  ClipboardMinus,
  Settings,
  ClipboardList,
  Airplay,
  Tags,
  ShieldUser,
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
        className="absolute z-50 min-w-[35%] p-5 right-0 top-0 h-screen bg-(--primary-color) border-l border-(--border-color)/30 shadow overflow-y-auto"
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
          <h3 className="text-[1.7dvw] font-semibold">Menu</h3>
          <button
            onClick={() => {
              setShowOffcanvasMenu(varient.exit);
            }}
            className="cursor-pointer"
          >
            <CircleX size={30} />
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
          <button
            onClick={handleTasksClick}
            className="flex justify-start px-5 py-2.5 mainFont font-semibold tracking-wider text-[1.8dvw] items-center gap-6 border-b hover:bg-(--button-color5) hover:text-(--primary-color) hover:rounded-md transition-all duration-300 ease-linear cursor-pointer border-(--border-color) text-(--button-color5)"
          >
            <span>
              <ClipboardList size={40} />
            </span>
            My Tasks
          </button>
          <button
            onClick={() => {
              window.open(
                "/seller/customer-screen",
                "_blank",
                "width=600,height=700,scrollbars=yes,resizable=yes"
              );
              setShowOffcanvasMenu(varient.exit);
            }}
            className="flex justify-start px-5 py-2.5 mainFont font-semibold tracking-wider text-[1.8dvw] items-center gap-6 border-b hover:bg-(--button-color4) hover:text-(--primary-color) hover:rounded-md transition-all duration-300 ease-linear cursor-pointer border-(--border-color) text-(--button-color4)"
          >
            <span>
              <Airplay size={40} />
            </span>
            Customer Screen
          </button>
          <button className="flex justify-start px-5 py-2.5 mainFont font-semibold tracking-wider text-[1.8dvw] items-center gap-6 border-b hover:bg-(--button-color1) hover:text-(--primary-color) hover:rounded-md transition-all duration-300 ease-linear cursor-pointer border-(--border-color) text-(--button-color1)">
            <span>
              <Tags size={40} />
            </span>
            Get Labels
          </button>
          <NavLink
            onClick={() => setShowOffcanvasMenu(varient.exit)}
            to="/seller/sales-report"
            className="flex justify-start px-5 py-2.5 mainFont font-semibold tracking-wider text-[1.8dvw] items-center gap-6 border-b hover:bg-(--button-color2) hover:text-(--primary-color) hover:rounded-md transition-all duration-300 ease-linear cursor-pointer border-(--border-color) text-(--button-color2)"
          >
            <span>
              <BadgeDollarSign size={40} />
            </span>
            Sales
          </NavLink>
          <NavLink
            onClick={() => setShowOffcanvasMenu(varient.exit)}
            to="/seller/reports"
            className="flex justify-start px-5 py-2.5 mainFont font-semibold tracking-wider text-[1.8dvw] items-center gap-6 border-b hover:bg-(--button-color2) hover:text-(--primary-color) hover:rounded-md transition-all duration-300 ease-linear cursor-pointer border-(--border-color) text-(--button-color2)"
          >
            <span>
              <ClipboardMinus size={40} />
            </span>
            Reports
          </NavLink>
          <button className="flex justify-start px-5 py-2.5 mainFont font-semibold tracking-wider text-[1.8dvw] items-center gap-6 border-b hover:bg-(--button-color1) hover:text-(--primary-color) hover:rounded-md transition-all duration-300 ease-linear cursor-pointer border-(--border-color) text-(--button-color1)">
            <span>
              <Settings size={40} />
            </span>
            Settings
          </button>
          <button
            onClick={() => {
              handleLogout();
              setShowOffcanvasMenu(varient.exit);
            }}
            className="flex justify-start px-5 py-2.5 mainFont font-semibold tracking-wider text-[1.8dvw] items-center gap-6 border-b hover:bg-(--Negative-color) hover:text-(--primary-color) hover:rounded-md transition-all duration-300 ease-linear cursor-pointer border-(--border-color) text-(--Negative-color)"
          >
            <span>
              <ShieldUser size={40} />
            </span>
            Logout
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};
