import { CircleX, Search } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCustomerDetails } from "../../../Redux/CurrentBillSlice";
import { getCustomerDetails } from "../../../utils/apis/handleCustomer";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import moment from "moment";

export const ViewCustomerDetailsModel = ({ setFindCustomerModel }) => {
    const customerDetails = useSelector(state => state.currentBill.currentCustomerDetails)
    const dispatch = useDispatch();
    const [isFetching, setIsFetching] = useState(false);
    const [customerInfo, setCustomerInfo] = useState()


    const handleOnchange = (e) => {
        dispatch(
            setCurrentCustomerDetails({
                currentCustomerDetails: {
                    name: 'customerPhone',
                    value: e.target.value,
                },
            }),
        );
    }

    const handleSearchCustomer = async () => {
        setIsFetching(true);
        const resData = await getCustomerDetails(customerDetails.customerPhone)
        if (resData.product) {
            setIsFetching(false);
            setCustomerInfo(resData.product)
            dispatch(
                setCurrentCustomerDetails({
                    currentCustomerDetails:{
                        name:'customerPoint',
                        value:resData.product?.customer_points
                    }
                })
            )
            dispatch(
                setCurrentCustomerDetails({
                    currentCustomerDetails:{
                        name:'offAmount',
                        value:'2.00'
                    }
                })
            )
        } {
            setIsFetching(false)
        }

        console.log(resData.product)
    }






    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
                <div className="bg-white w-[95%] sm:w-[80%] md:w-[70%] lg:w-[50%] p-4 sm:p-5 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center w-full p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.5dvw] font-semibold">
                            View Customer Details
                        </h3>
                        <button
                            onClick={() => {
                                setFindCustomerModel(false);
                            }}
                            className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
                        >
                            <CircleX size={30} />
                        </button>
                    </div>
                    <div className="my-3 flex flex-col gap-3">
                        <lable className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                            Search Customer by Phone Number
                        </lable>
                        <div className="flex gap-5">
                            <input value={customerDetails.customerPhone} onChange={handleOnchange} type="tel" placeholder="9865214735" className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3" />
                            <button onClick={handleSearchCustomer} className="bg-(--button-color1) flex justify-center items-center rounded-full text-white h-[3dvw] w-[3dvw] shrink-0 cursor-pointer">
                                <Search />
                            </button>
                        </div>
                    </div>
                    {
                        isFetching && (
                            <div className="w-full flex justify-center items-center my-3">
                                <CircularProgress />
                            </div>
                        )
                    }
                    {
                        customerInfo ? (<>
                            <div className="w-full px-5 my-5  border-t border-gray-200 py-3">
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-2">
                                        <lable className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                                            Name
                                        </lable>
                                        <input className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3" readOnly value={customerInfo?.customer_name} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <lable className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                                            Phone Number
                                        </lable>
                                        <input className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3" readOnly value={customerInfo?.customer_mobile} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <lable className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                                            Email
                                        </lable>
                                        <input className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3" readOnly value={customerInfo?.customer_email} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <lable className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                                            Address
                                        </lable>
                                        <input className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3" readOnly value={customerInfo?.customer_address} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <lable className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                                            Zip code
                                        </lable>
                                        <input className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3" readOnly value={customerInfo?.customer_zipcode} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <lable className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                                            SMS and Email Promotions
                                        </lable>
                                        <input className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3" readOnly value={customerInfo?.sms_email_promotions} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <lable className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                                            Customer Points - <span className="text-[1.1dvw] mainFont font-semibold text-green-500">
                                                ( off $ 2.00 )
                                            </span>
                                        </lable>
                                        <input className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3" readOnly value={customerInfo?.customer_points} />
                                        <p className="text-[.8dvw] paraFont font-semibold text-gray-600">
                                            * Redeem over 100 points.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <lable className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                                            Customer DOB
                                        </lable>
                                        <input className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3" readOnly value={moment(customerInfo?.date_of_birth).format('YYYY-MM-DD')} />
                                    </div>

                                </div>
                                <div className="mt-5 flex justify-end gap-5 items-center">
                                    <button className="w-full sm:w-auto px-6 py-2 bg-(--button-color4) cursor-pointer text-white rounded-md font-semibold hover:opacity-80 transition-all duration-300">
                                        Cancel
                                    </button>
                                    <button className="w-full sm:w-auto px-6 py-2 bg-(--button-color1) cursor-pointer text-white rounded-md font-semibold hover:opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </>) : (
                            <>
                                <div className="flex justify-center items-center my-3 text-[1.2dvw]">
                                    <p className="mainFont text-center font-semibold text-gray-400">
                                        No customer data found !
                                    </p>
                                </div>
                            </>
                        )
                    }


                </div>

            </div>
        </>
    )
}