import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios-interceptor";
import { toast } from "react-toastify";
import { CircleX } from "lucide-react";
import { useSelector } from "react-redux";

export const CustomerAddEditModel = ({
  setEditUserModel,
  userData,
  forState,
}) => {
  const customerDetails = useSelector(
    (state) => state.currentBill.currentCustomerDetails,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    customer_name: userData?.name || "",
    customer_email: userData?.email || "",
    customer_mobile: userData?.mobile || "",
    date_of_birth: userData?.dob || "",
    customer_address: userData?.address || "",
    customer_zipcode: userData?.zipcode || "",
    customer_points: userData?.points || "",
    sms_email_promotions: userData?.sms_email_promotions || "",
    status: userData?.status || "",
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (customerDetails) {
      setCustomerInfo({
        customer_mobile: customerDetails?.customerPhone || "",
      });
    }
  }, [customerDetails]);

  // handle onChange function...
  const handleOnChanges = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  // handle onSubmit function add/create new customer..
  const handleOnsubmit = async () => {
    setIsSaving(true);

    try {
      const reqSaveCustomer = await axiosInstance.post("api/v1/customer/add", {
        ...customerInfo,
      });

      if (reqSaveCustomer.status === 200 && reqSaveCustomer.data) {
        queryClient.invalidateQueries({
          queryKey: ["customer_list"],
        });
        setEditUserModel({
          state: false,
          userData: null,
          forState: null,
        });
        toast.success(
          reqSaveCustomer.data.message || "Customer Added Successfully!",
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to save customer");
      console.error(error?.response?.data?.error);
    } finally {
      setIsSaving(false);
    }
  };

  // handle onEdit function edit/update existing customer...
  const handleCustomerUpdate = async () => {
    try {
      const reqUpdateCustomer = await axiosInstance.post(``, {});
    } catch (error) {
      console.log(error?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
        <div className="bg-white w-[95%] sm:w-[80%] md:w-[90%] lg:w-[50%] p-4 sm:p-5 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center w-full p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.5dvw] font-semibold">
              {forState} User
            </h3>
            <button
              onClick={() => {
                setEditUserModel({
                  state: false,
                  userData: null,
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
                Name
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter Name..."
                name="customer_name"
                value={customerInfo.customer_name}
                onChange={handleOnChanges}
              />
            </div>
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Mobile *
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="number"
                placeholder="phone number..."
                value={customerInfo.customer_mobile}
                name="customer_mobile"
                onChange={handleOnChanges}
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Email *
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="email"
                placeholder="Enter Email...."
                value={customerInfo.customer_email}
                name="customer_email"
                onChange={handleOnChanges}
              />
            </div>
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                DOB
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="date"
                name="date_of_birth"
                value={customerInfo.date_of_birth}
                onChange={handleOnChanges}
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Address
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter Address..."
                name="customer_address"
                value={customerInfo.customer_address}
                onChange={handleOnChanges}
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Zipcode
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter Zipcode..."
                name="customer_zipcode"
                value={customerInfo.customer_zipcode}
                onChange={handleOnChanges}
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Points
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="number"
                placeholder="Enter Points..."
                name="customer_points"
                value={customerInfo.customer_points}
                onChange={handleOnChanges}
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                SMS & Email Promotions
              </label>
              <select
                name="sms_email_promotions"
                value={customerInfo.sms_email_promotions}
                onChange={handleOnChanges}
                className="bg-[#F3F3F3] appearance-none w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              >
                <option value="">Select for Promotions</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full sm:col-span-2 my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Status
              </label>
              <select
                name="status"
                value={customerInfo.status}
                onChange={handleOnChanges}
                className="bg-[#F3F3F3] appearance-none w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="in-active">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-end items-center my-4">
            <button
              onClick={() => {
                setEditUserModel({
                  state: false,
                  userData: null,
                });
              }}
              className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleOnsubmit}
              disabled={
                isSaving ||
                !Object.keys(customerInfo).every((item) => customerInfo[item])
              }
              className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300 disabled:opacity-80 disabled:pointer-events-none disabled:cursor-not-allowed"
            >
              {isSaving ? (
                "Saving..."
              ) : (
                <>{forState === "Add" ? "Save" : "Update"}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
