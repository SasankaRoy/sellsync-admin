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
  const router = useNavigate();
  const dispatch = useDispatch();
  const [loginDetails, setLogoinDetails] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setLogoinDetails((prev) => ({ ...prev, [name]: value }));
  };

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      const reqLogin = await axiosInstance.post("/api/v1/auth/login", {
        email: loginDetails.email,
        password: loginDetails.password,
      });

      // console.log(reqLogin.data);
      if (reqLogin.status === 200 && reqLogin.data) {
        toast.success("Login Success");
        Cookies.set("authToken", reqLogin.data.token, {
          expires: 1,
          path: "/",
        });
        Cookies.set("u_id", reqLogin.data.user_id, {
          expires: 1,
          path: "/",
        });
        Cookies.set("u_type", reqLogin.data.user_type, {
          expires: 1,
          path: "/",
        });
        router("/");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.response);
      toast.error(
        error?.response?.data?.error.password ||
          error?.response?.data?.error.email ||
          "Login failed!"
      );
      setIsLoading(false);
    }
  };

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["login"],
  //   queryFn: async () => {},
  // });
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
                <div className="flex flex-col gap-2 sm:gap-3">
                  <label
                    className="text-sm sm:text-base lg:text-[1dvw] font-[700]"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleOnChange}
                    value={loginDetails.email}
                    placeholder="Enter your email"
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
                    value={loginDetails.password}
                    placeholder="Enter password"
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                  />
                </div>
                <button
                  disabled={
                    isLoading ||
                    !Object.keys(loginDetails).every(
                      (item) => loginDetails[item]
                    )
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
