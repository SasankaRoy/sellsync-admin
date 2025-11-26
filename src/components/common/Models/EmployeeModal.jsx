import React, { useState } from "react";
import { CircleX } from "lucide-react";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axios-interceptor";
import { useQueryClient } from "@tanstack/react-query";

const EmployeeModal = ({ forState, setEditUserModel, productData }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [driversLicenseType, setDriversLicenseType] = useState("number"); // "number" or "pdf"
  const [userInfo, setUserInfo] = useState({
    full_name: productData?.name || "",
    phone: productData?.mobile || "",
    email: productData?.email || "",
    log_userId: productData?.log_userId || "",
    password: productData?.Password || "",
    street: productData?.address?.street || "",
    zip: productData?.address?.zip || "",
    role: productData?.role || "",
    status: productData?.status || "",
    city: productData?.address?.city || "",
    state: productData?.address?.state || "",
    staff_position: productData?.staff_position || "",
    date_of_birth: "",
    pay_rate: productData?.pay_rate || "",
    pay_type: productData?.pay_type || "",
    drivers_license: productData?.drivers_license || "",
    social_security_number: productData?.social_security_number || "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/api/v1/user/employee-add", {
        full_name: userInfo.full_name,
        email: userInfo.email,
        log_userId: userInfo.log_userId,
        password: userInfo.password,
        role: userInfo.role,
        staff_position: userInfo.staff_position,
        phone: userInfo.phone,
        date_of_birth: userInfo.date_of_birth,
        pay_rate: userInfo.pay_rate,
        pay_type: userInfo.pay_type,
        drivers_license: userInfo.drivers_license,
        social_security_number: userInfo.social_security_number,
        address: {
          street: userInfo.street,
          city: userInfo.city,
          state: userInfo.state,
          zip: userInfo.zip,
        },
        status: userInfo.status,
      });
      if (response.status === 200 && response.data) {
        toast.success("Employee Added Successfully");
        setEditUserModel({
          status: false,
          productData: null,
          forStatus: null,
        });

        queryClient.invalidateQueries({ queryKey: ["employee_list"] });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.password ||
          error?.response?.data?.error?.email ||
          error?.response?.data?.message ||
          "Add Employee Failed!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmployee = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        `/api/v1/user/employee-update/${productData.id}`,
        {
          full_name: userInfo.full_name,
          email: userInfo.email,
          role: "staff",
          log_userId: userInfo.log_userId,
          password: userInfo.password,
          staff_position: userInfo.staff_position,
          phone: userInfo.phone,
          date_of_birth: userInfo.date_of_birth,
          pay_rate: userInfo.pay_rate,
          pay_type: userInfo.pay_type,
          drivers_license: userInfo.drivers_license,
          social_security_number: userInfo.social_security_number,
          address: {
            street: userInfo.street,
            city: userInfo.city,
            state: userInfo.state,
            zip: userInfo.zip,
          },
          status: userInfo?.status,
        }
      );

      if (response.status === 200 && response.data) {
        toast.success(
          response?.data?.message || "Employee Updated Successfully"
        );
        setEditUserModel({
          status: false,
          productData: null,
          forStatus: null,
        });
        queryClient.invalidateQueries({ queryKey: ["employee_list"] });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.password ||
          error?.response?.data?.error?.email ||
          error?.response?.data?.message ||
          "Update Employee Failed!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
        <div className="bg-white w-[95%] sm:w-[80%] md:w-[70%] lg:w-[50%] p-4 sm:p-5 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center w-full p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.5dvw] font-semibold">
              {forState === "Add" ? "Add Employee" : "Edit Employee"}
            </h3>
            <button
              onClick={() => {
                setEditUserModel({
                  status: false,
                  productData: null,
                  forStatus: null,
                });
              }}
              className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
            >
              <CircleX size={30} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full p-3">
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Full Name
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter Full Name..."
                name="full_name"
                value={userInfo.full_name}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Phone
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="tel"
                placeholder="Phone number..."
                name="phone"
                value={userInfo.phone}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="col-span-2">
              <div className="w-full my-4 flex flex-col gap-2">
                <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                  Email
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="email"
                  placeholder="Enter Email..."
                  name="email"
                  value={userInfo.email}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="w-full my-4 flex flex-col gap-2">
                <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                  User Id
                </label>

                <input
                  className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="text"
                  placeholder="Enter user ID..."
                  name="log_userId"
                  value={userInfo.log_userId || ""}
                  onChange={handleOnChange}
                  required
                />
              </div>

              {forState === "Add" && (
                <div className="w-full my-4 flex flex-col gap-2">
                  <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                    Password
                  </label>
                  <input
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={userInfo.password}
                    onChange={handleOnChange}
                    required
                  />
                </div>
              )}
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Street Address
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter Street Address..."
                name="street"
                value={userInfo.street}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Zip Code
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="number"
                placeholder="Enter Zip Code..."
                name="zip"
                value={userInfo.zip}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                City
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter City..."
                name="city"
                value={userInfo.city}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                State
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter State..."
                name="state"
                value={userInfo.state}
                onChange={handleOnChange}
                required
              />
            </div>

            {forState === "Add" && (
              <div className="w-full my-4 flex flex-col gap-2">
                <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                  Role
                </label>
                <select
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  name="role"
                  value={userInfo.role}
                  onChange={handleOnChange}
                  required
                >
                  <option value="">Select Employee Role</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
            )}
            {/* {forState === "Add" && ( */}
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Status
              </label>
              <select
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                name="status"
                value={userInfo.status}
                onChange={handleOnChange}
                required
              >
                <option value="">Select Employee Status</option>
                <option value="active">Active</option>
                <option value="in-active">Inactive</option>
              </select>
            </div>
            {/* )} */}

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Staff Position
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter Staff Position..."
                name="staff_position"
                value={userInfo.staff_position}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Date of Birth
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="date"
                name="date_of_birth"
                value={userInfo.date_of_birth}
                onChange={handleOnChange}
                max={new Date().toISOString().split("T")[0]}
                pattern="\d{4}-\d{2}-\d{2}"
                required
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Pay Rate
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="number"
                step="0.01"
                placeholder="Enter Pay Rate..."
                name="pay_rate"
                value={userInfo.pay_rate}
                onChange={handleOnChange}
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Pay Type
              </label>
              <select
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                name="pay_type"
                value={userInfo.pay_type}
                onChange={handleOnChange}
              >
                <option value="">Select Pay Type</option>
                <option value="hourly">Hourly</option>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Driver's License
              </label>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="number"
                    checked={driversLicenseType === "number"}
                    onChange={(e) => setDriversLicenseType(e.target.value)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-sm sm:text-base paraFont">
                    License Number
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="pdf"
                    checked={driversLicenseType === "pdf"}
                    onChange={(e) => setDriversLicenseType(e.target.value)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-sm sm:text-base paraFont">
                    Upload PDF
                  </span>
                </label>
              </div>
              {driversLicenseType === "number" ? (
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="text"
                  placeholder="Enter Driver's License Number..."
                  name="drivers_license"
                  value={userInfo.drivers_license}
                  onChange={handleOnChange}
                />
              ) : (
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="file"
                  name="drivers_license"
                  onChange={handleOnChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              )}
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Social Security Number
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter Social Security Number..."
                name="social_security_number"
                value={userInfo.social_security_number}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-end items-center my-4">
            <button
              type="button"
              onClick={() => {
                setEditUserModel({
                  status: false,
                  productData: null,
                  forStatus: null,
                });
              }}
              className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() =>
                forState === "Add" ? handleSubmit() : handleEmployee()
              }
              className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300 disabled:opacity-80 disabled:pointer-events-none disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading
                ? "Saving..."
                : forState === "Add"
                ? "Add Employee"
                : "Update Employee"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeModal;
