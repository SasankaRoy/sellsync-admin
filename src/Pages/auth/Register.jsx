import React from "react";
import LoginBg from "../../assets/images/LoginBg.jpg";
import FullLogo from "../../assets/images/FullLogo.png";
import WhiteTexture from "../../assets/images/WhiteTexture.jpg";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div className="h-screen relative w-full">
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={LoginBg}
          alt="LoginBg"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full relative z-10 h-full  flex justify-end items-center">
        <div className="bg-white relative h-full w-[90%] clipPathEffect flex justify-end items-center px-16">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-70">
            <img
              src={WhiteTexture}
              alt="whiteTexture"
              className="w-full h-full object-cover "
            />
          </div>
          <div className="w-[45%] mr-[5%] relative  shadow-lg shadow-black/20 p-8  flex flex-col justify-center items-center gap-6 rounded-lg overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-50">
              <img
                src={WhiteTexture}
                alt="whiteTexture"
                className="w-full h-full object-cover "
              />
            </div>
            <div className="relative w-full">
              <div className="flex justify-center items-center h-[15dvw] w-[15dvw]">
                <img
                  className="w-full h-full object-contain mix-blend-multiply"
                  src={FullLogo}
                  alt="FullLogo"
                />
              </div>

              <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <label className="text-[1dvw] font-[700]" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[1dvw] font-[700]" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                  />
                </div>
                <button className="text-white mt-3 flex justify-center items-center py-3 bg-[var(--button-color2)] font-semibold paraFont w-full rounded-full cursor-pointer border border-[var(--button-color2)] hover:text-[var(--button-color2)] hover:bg-white transition-all duration-300 ease-linear">
                  Register
                </button>

                {/* <span className="text-center text-[1.2dvw] text-gray-400 font-semibold">
                  -- Or --
                </span>
                <p className="flex justify-start items-center gap-2 text-[1.2dvw] text-gray-500 font-semibold">
                  Have an Account?
                  <Link
                    to="/auth/register"
                    className="text-[var(--button-color2)] hover:text-[var(--button-color1)] transition-all duration-300 ease-linear"
                  >
                    Login
                  </Link>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
