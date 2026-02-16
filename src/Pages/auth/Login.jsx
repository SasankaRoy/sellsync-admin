import React, { useState } from "react";
import LoginBg from "../../assets/images/LoginBg2.jpg";
import FullLogo from "../../assets/images/FullLogo2.png";
import WhiteTexture from "../../assets/images/WhiteTexture.jpg";
// import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios-interceptor";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setLogginUser } from "../../Redux/UserSlice";
import { CloudSun, LocateFixed, ShieldUser, SquareUser } from "lucide-react";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState("admin"); // "admin" or "employee"
  const router = useNavigate();
  const dispatch = useDispatch();
  const [loginDetails, setLogoinDetails] = useState({
    identifier: "", // email or userId
    password: "",
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setLogoinDetails((prev) => ({ ...prev, [name]: value }));
  };

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      let loginPayload = {
        password: loginDetails.password,
      };

      // If employee login, use either email or userId
      if (loginType === "employee") {
        // Determine if identifier is email or userId
        if (loginDetails.identifier.includes("@")) {
          loginPayload.email = loginDetails.identifier;
        } else {
          loginPayload.log_userId = loginDetails.identifier;
        }
      } else {
        // Admin login - use email
        loginPayload.email = loginDetails.identifier;
      }

      // Use same endpoint for both admin and staff
      const reqLogin = await axiosInstance.post(
        "/api/v1/auth/login",
        loginPayload,
      );

      if (reqLogin.status === 200 && reqLogin.data) {
        toast.success("Login Success");

        // Store all cookies
        const userType = reqLogin.data.user_type;
        // console.log("Login Response:", reqLogin.data);
        // console.log("User Type:", userType);

        Cookies.set("authToken", reqLogin.data.token, {
          expires: 1,
          path: "/",
        });
        Cookies.set("u_id", reqLogin.data.user_id, {
          expires: 1,
          path: "/",
        });
        Cookies.set("u_type", userType, {
          expires: 1,
          path: "/",
        });

        // Verify cookie was set
        const savedUserType = Cookies.get("u_type");
        // console.log("Saved u_type cookie:", savedUserType);

        // Route to appropriate dashboard based on user_type from API response
        setIsLoading(false);

        // Add a small delay to ensure cookies are set before navigation
        setTimeout(() => {
          if (userType === "staff" || userType === "employee") {
            // console.log("Routing to /seller/dashboard");
            router("/seller/dashboard");
          } else {
            // console.log("Routing to /");
            router("/");
          }
        }, 100);
      }
    } catch (error) {
      console.error(error.response);
      toast.error(
        error?.response?.data?.error?.password ||
          error?.response?.data?.error?.email ||
          error?.response?.data?.error?.log_userId ||
          error?.response?.data?.message ||
          "Login failed!",
      );
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !isLoading &&
      loginDetails.identifier &&
      loginDetails.password
    ) {
      loginHandler();
    }
  };

  return (
    <div className="h-screen flex justify-center items-center relative w-full customBg">
      {/* Background Image - Hidden on mobile/tablet, visible on desktop */}
      {/* <div className="absolute top-0 left-0 w-full h-full hidden lg:block mix-blend-color-dodge">
        <img
          src={LoginBg}
          alt="LoginBg"
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* Main Container */}
      <div className="w-full relative z-10 h-full flex justify-center lg:justify-end items-center bg-white lg:bg-transparent">
        <div className="bg-white relative h-full w-full lg:w-[90%] clipPathEffect flex justify-center lg:justify-end items-center px-4 sm:px-8 lg:px-16">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-70 hidden lg:block">
            <img
              src={WhiteTexture}
              alt="whiteTexture"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[45%] lg:mr-[5%] relative shadow-lg shadow-black/20 p-6 sm:p-8 flex flex-col justify-center items-center gap-6 rounded-lg overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-50">
              <img
                src={WhiteTexture}
                alt="whiteTexture"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative w-full">
              <div className="flex justify-center items-center h-[120px] w-[120px] sm:h-[150px] sm:w-[150px] lg:h-[15dvw] lg:w-[15dvw] mx-auto">
                <img
                  className="w-full h-full object-contain mix-blend-multiply"
                  src={FullLogo}
                  alt="FullLogo"
                />
              </div>

              <div className="w-full flex flex-col gap-4 sm:gap-6">
                {/* Login Type Toggle */}
                <div className="flex gap-3 w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginType("admin");
                      setLogoinDetails({ identifier: "", password: "" });
                    }}
                    className={`flex-1 py-2 px-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                      loginType === "admin"
                        ? "bg-[var(--button-color2)] text-white"
                        : "bg-[#F3F3F3] text-[#333333] border border-[#d4d4d4]"
                    }`}
                  >
                    Admin Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginType("employee");
                      setLogoinDetails({ identifier: "", password: "" });
                    }}
                    className={`flex-1 py-2 px-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                      loginType === "employee"
                        ? "bg-[var(--button-color2)] text-white"
                        : "bg-[#F3F3F3] text-[#333333] border border-[#d4d4d4]"
                    }`}
                  >
                    Employee Login
                  </button>
                </div>

                <div className="flex flex-col gap-2 sm:gap-3">
                  <label
                    className="text-sm sm:text-base lg:text-[1dvw] font-[700]"
                    htmlFor="identifier"
                  >
                    {loginType === "employee" ? "Email or User ID" : "Email"}
                  </label>
                  <input
                    type="text"
                    id="identifier"
                    name="identifier"
                    onChange={handleOnChange}
                    value={loginDetails.identifier}
                    placeholder={
                      loginType === "employee"
                        ? "Enter email or user ID..."
                        : "Enter your email"
                    }
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-3">
                  <label
                    className="text-sm sm:text-base lg:text-[1dvw] font-[700]"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleOnChange}
                    onKeyDown={handleKeyDown}
                    value={loginDetails.password}
                    placeholder="Enter password"
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                  />
                </div>
                <button
                  disabled={
                    isLoading ||
                    !loginDetails.identifier ||
                    !loginDetails.password
                  }
                  onClick={loginHandler}
                  className="text-white mt-3 flex justify-center items-center py-3 bg-[var(--button-color2)] font-semibold paraFont w-full rounded-full cursor-pointer border border-[var(--button-color2)] hover:text-[var(--button-color2)] hover:bg-white transition-all duration-300 ease-linear disabled:pointer-events-none disabled:cursor-not-allowed disabled:animate-pulse text-sm sm:text-base"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-[90%] flex justify-center items-center gap-10">
        <div className="w-[45%] p-5 flex flex-col gap-5 justify-center items-center">
          <div className="flex justify-center items-center gap-8">
            <div>
              <h5 className="text-[.9dvw] font-medium text-white">
                28 October 2025, Tuesday
              </h5>
              <h2 className="text-[3.2dvw] text-white font-semibold">
                16:20 AM
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-start items-center gap-4">
                <CloudSun size={60} color="white" />

                <h3 className="text-[3dvw] font-semibold text-white">
                  20&deg;C
                </h3>
              </div>
              <div className="flex justify-start items-center gap-4">
                <LocateFixed size={30} color="white" />
                <p className="text-white font-medium text-[1.1dvw]">
                  City Name, Test
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/15 backdrop:blur-[100px] rounded-lg shadow-md shadow-white/5 h-[25dvw] w-[20dvw]">
            <img
              src={FullLogo}
              alt="sell-sync"
              className="object-contain h-full w-full"
            />
          </div>
        </div>
        <div className="w-[60%] p-5 flex flex-col justify-center items-center gap-16">
          <h3 className="text-[2.5dvw] font-medium text-white">Login Types</h3>
          <div className="flex  w-full justify-around items-center gap-10">
            <button className="flex cursor-pointer flex-col justify-center items-center gap-2 bg-white/15 p-7 rounded-lg shadow-sm shadow-white/15 backdrop-blur-2xl text-white/85 hover:scale-105 transition-all duration-300 ease-linear">
              <ShieldUser size={90} />
              <h5 className="text-[1.2dvw] text-white font-semibold">
                Admin Login
              </h5>
            </button>
            <button className="flex cursor-pointer flex-col justify-center items-center gap-2 bg-white/15 p-7 rounded-lg shadow-sm shadow-white/15 backdrop-blur-2xl text-white/85 hover:scale-105 transition-all duration-300 ease-linear">
              <SquareUser color="white" size={90} />
              <h5 className="text-[1.2dvw] text-white font-semibold">
                Employee Login
              </h5>
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};
