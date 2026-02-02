import React, { useEffect, useState } from "react";
import Loginbg23 from "../../assets/images/loginBg23.jpg";
import FullLogo from "../../assets/images/SellsyncLogo.png";
import { CircleUserRound, ShieldUser } from "lucide-react";
import moment from "moment";
import AlphabetKeyboard from "../../components/UI/TouchKeys/AlphabetKeyboard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios-interceptor";
import Cookies from "js-cookie";

const NewLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState("admin"); // "admin" or "employee"
  const router = useNavigate();

  const [currentTimeDate, setCurrentTimeDate] = useState(null);
  const [currentSelection, setCurrentSelection] = useState("");
  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    password: "",
  });

  // For the clock and date ...
  useEffect(() => {
    const clock = setInterval(() => {
      setCurrentTimeDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, 1000);

    return () => {
      clearInterval(clock);
    };
  }, [currentTimeDate]);

  const loginHandler = async () => {
    setIsLoading(true);
    console.log(loginInfo);
    try {
      // let loginPayload = {
      //     password: loginDetails.password,
      // };

      // If employee login, use either email or userId
      // if (currentSelection === "EMPLOYEE") {
      //     // Determine if identifier is email or userId
      //     if (loginDetails.identifier.includes("@")) {
      //         loginPayload.email = loginDetails.identifier;
      //     } else {
      //         loginPayload.log_userId = loginDetails.identifier;
      //     }
      // } else {
      //     // Admin login - use email
      //     loginPayload.email = loginDetails.identifier;
      // }

      console.log(loginInfo);

      // Use same endpoint for both admin and staff
      const reqLogin = await axiosInstance.post("/api/v1/auth/login", {
        email: loginInfo.userId, // email or userId
        password: loginInfo.password,
      });

      if (reqLogin.status === 200 && reqLogin.data) {
        toast.success("Login Success");

        // Store all cookies
        const userType = reqLogin.data.user_type;
        console.log("Login Response:", reqLogin.data);
        console.log("User Type:", userType);

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
        console.log("Saved u_type cookie:", savedUserType);

        // Route to appropriate dashboard based on user_type from API response
        setIsLoading(false);

        // Add a small delay to ensure cookies are set before navigation
        setTimeout(() => {
          if (userType === "staff" || userType === "employee") {
            console.log("Routing to /seller/dashboard");
            router("/seller/dashboard");
          } else {
            console.log("Routing to /");
            router("/");
          }
        }, 100);
      }
    } catch (error) {
      console.log(error.response);
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

  const handleScreenRender = (currentscreen) => {
    switch (currentSelection) {
      case "ADMIN":
        return (
          <CommonScreen
            currentscreen={currentSelection}
            setCurrentSelection={setCurrentSelection}
            setLoginInfo={setLoginInfo}
            loginInfo={loginInfo}
            loginHandler={loginHandler}
          />
        );

      case "EMPLOYEE":
        return (
          <CommonScreen
            currentscreen={currentSelection}
            setCurrentSelection={setCurrentSelection}
            setLoginInfo={setLoginInfo}
            loginInfo={loginInfo}
            loginHandler={loginHandler}
          />
        );

      default:
        return <Initialscreen setCurrentSelection={setCurrentSelection} />;
        break;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <div className="top-0 left-0 w-full h-full absolute">
        <img
          src={Loginbg23}
          alt="background-image"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/20 brightness-[.8] backdrop-blur-sm"></div>

      <div className="relative w-full h-full flex justify-center items-center bg-transparent z-20">
        <div className="fixed top-0 w-full left-0  py-4 flex justify-between items-center px-10">
          <div className="h-[5dvw] w-[20dvw] mx-auto">
            <img
              src={FullLogo}
              alt="sell-sync-logo"
              className="w-full h-full object-contain object-center"
            />
          </div>
          <div className="text-white px-3">
            <h2 className="text-[.9dvw] font-normal tracking-wider">
              {currentTimeDate}
            </h2>
          </div>
        </div>

        {handleScreenRender(currentSelection)}
      </div>
    </div>
  );
};

export default NewLogin;

const Initialscreen = ({ setCurrentSelection }) => {
  const handleSelecteDashboard = (dashboardType) => {
    setCurrentSelection(dashboardType);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-16">
        <div className="flex justify-center items-center gap-50 mb-5">
          <div
            onClick={() => handleSelecteDashboard("ADMIN")}
            className="flex justify-center items-center flex-col gap-8 cursor-pointer buttonOutterWrapper"
          >
            <button className="bg-white/10 customShadow rounded-full text-white  p-5">
              <ShieldUser size={140} />
            </button>
            <h2 className="text-white text-[2.6dvw] font-bold tracking-wider uppercase">
              Admin
            </h2>
          </div>
          <div
            onClick={() => handleSelecteDashboard("EMPLOYEE")}
            className="flex justify-center items-center flex-col gap-8 cursor-pointer buttonOutterWrapper"
          >
            <button className="bg-white/10 customShadow rounded-full text-white  p-5">
              <CircleUserRound size={140} />
            </button>
            <h2 className="text-white text-[2.6dvw] font-bold tracking-wider uppercase">
              Employee
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

const CommonScreen = ({
  currentscreen,
  setCurrentSelection,
  setLoginInfo,
  loginInfo,
  loginHandler,
}) => {
  const [showPassField, setShowPassFeild] = useState(false);

  // Handle physical keyboard input for userId
  const handleUserIdChange = (e) => {
    setLoginInfo((prev) => ({ ...prev, userId: e.target.value }));
  };

  // Handle physical keyboard input for password
  const handlePasswordChange = (e) => {
    setLoginInfo((prev) => ({ ...prev, password: e.target.value }));
  };

  // Handle Enter key press to submit or move to password field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (showPassField) {
        loginHandler();
      } else {
        setShowPassFeild(true);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center p-6 mt-16">
        <div className="w-full flex gap-6 flex-col justify-center items-center">
          {!showPassField && (
            <div className="w-[70%]">
              <input
                value={loginInfo.userId}
                onChange={handleUserIdChange}
                onKeyPress={handleKeyPress}
                type="text"
                placeholder="user name..."
                className="bg-white w-full py-2 text-black px-5 text-center text-[1.5dvw] mainFont rounded-3xl outline-none fonr-semibold"
                autoFocus
              />
            </div>
          )}
          {showPassField && (
            <div className="w-[70%]">
              <input
                type="password"
                value={loginInfo.password}
                onChange={handlePasswordChange}
                onKeyPress={handleKeyPress}
                placeholder="*****"
                className="bg-white w-full py-2 text-black px-5 text-center text-[1.5dvw] mainFont rounded-3xl outline-none fonr-semibold"
                autoFocus
              />
            </div>
          )}
        </div>

        <AlphabetKeyboard
          setShowPassFeild={setShowPassFeild}
          showPassFeild={showPassField}
          setCurrentSelection={setCurrentSelection}
          setLoginInfo={setLoginInfo}
          loginHandler={loginHandler}
        />
      </div>
    </>
  );
};
