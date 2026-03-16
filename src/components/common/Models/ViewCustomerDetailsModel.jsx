import { CircleX, Search } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCustomerDetails } from "../../../Redux/CurrentBillSlice";
import { getCustomerDetails } from "../../../utils/apis/handleCustomer";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { getLowStockThreshold, getRedeemRateList } from "../../../utils/apis/handleSetting";

export const ViewCustomerDetailsModel = ({ setFindCustomerModel }) => {
    const customerDetails = useSelector(state => state.currentBill.currentCustomerDetails)
    const dispatch = useDispatch();
    const [isFetching, setIsFetching] = useState(false);
    const [customerInfo, setCustomerInfo] = useState();
    const [showRedeemModel, setShowRedeemModel] = useState(false);
    const [selectedRate, setSelectedRate] = useState(null);


    const { data, isLoading, isError } = useQuery({
        queryKey: ["get_low_stock_threshold"],
        queryFn: async () => {
            const prvData = await getLowStockThreshold();
            if (prvData) {
                return prvData;
            } else {
                return {
                    redeem_point_cost: 0,
                    redeem_point: 1,
                    minimum_points_required_for_redeem: 0
                };
            }
        },
    });

    const { data: redeemRateList, isLoading: isRedeemListLoading } = useQuery({
        queryKey: ["get_redeem_rate_list"],
        queryFn: async () => {
            const res = await getRedeemRateList();
            return Array.isArray(res) ? res : [];
        },
    });


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
                    currentCustomerDetails: {
                        name: 'customerName',
                        value: resData.product?.customer_name
                    }
                })
            )
            dispatch(
                setCurrentCustomerDetails({
                    currentCustomerDetails: {
                        name: 'customerEmail',
                        value: resData.product?.customer_email
                    }
                })
            )
            dispatch(
                setCurrentCustomerDetails({
                    currentCustomerDetails: {
                        name: 'customerAddress',
                        value: resData.product?.customer_address
                    }
                })
            )
            dispatch(
                setCurrentCustomerDetails({
                    currentCustomerDetails: {
                        name: 'customerPoint',
                        value: resData.product?.customer_points
                    }
                })
            )
            dispatch(
                setCurrentCustomerDetails({
                    currentCustomerDetails: {
                        name: 'redeemedPoints',
                        value: 0
                    }
                })
            )
            dispatch(
                setCurrentCustomerDetails({
                    currentCustomerDetails: {
                        name: 'offAmount',
                        value: 0
                    }
                })
            )
        } else {
            setIsFetching(false)
        }

        console.log(resData.product)
    }

    const handleRedeemPoints = () => {
        if (!selectedRate) return;
        
        dispatch(
            setCurrentCustomerDetails({
                currentCustomerDetails: {
                    name: 'redeemedPoints',
                    value: selectedRate.point
                }
            })
        );
        dispatch(
            setCurrentCustomerDetails({
                currentCustomerDetails: {
                    name: 'offAmount',
                    value: Number(selectedRate.point_cost).toFixed(2)
                }
            })
        );
        setShowRedeemModel(false);
    }


    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
                <div className="bg-white w-[95%] sm:w-[80%] md:w-[70%] lg:w-[50%] p-4 sm:p-5 rounded-lg shadow-md max-h-[90vh] overflow-y-auto relative">
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
                        isFetching || isLoading && (
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
                                            Customer Points {customerDetails?.offAmount > 0 && <span className="text-[1dvw] mainFont font-semibold text-green-500">
                                                ( Applied: $ {customerDetails.offAmount} )
                                            </span>}
                                        </lable>
                                        <input className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3" readOnly value={customerInfo?.customer_points} />
                                        <p className="text-[.8dvw] paraFont font-semibold text-gray-600">
                                            * Redeem over {data?.minimum_points_required_for_redeem} points.
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
                                    <button 
                                        onClick={() => {
                                            setFindCustomerModel(false);
                                        }}
                                        className="w-full sm:w-auto px-6 py-2 bg-(--button-color4) cursor-pointer text-white rounded-md font-semibold hover:opacity-80 transition-all duration-300">
                                        Cancel
                                    </button>
                                    {
                                        customerInfo?.customer_points >= (data?.minimum_points_required_for_redeem || 0) && (
                                            <button 
                                                onClick={() => setShowRedeemModel(true)}
                                                className="w-full sm:w-auto px-6 py-2 bg-(--button-color5) cursor-pointer text-white rounded-md font-semibold hover:opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                                Reedem
                                            </button>
                                        )
                                    }
                                    <button 
                                        onClick={() => {
                                            setFindCustomerModel(false);
                                        }}
                                        className="w-full sm:w-auto px-6 py-2 bg-(--button-color1) cursor-pointer text-white rounded-md font-semibold hover:opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
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

                    {/* Redeem Points Sub-Modal */}
                    {showRedeemModel && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg p-5">
                            <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-2xl border border-gray-200">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="text-xl font-bold mainFont text-gray-800">Redeem Points</h4>
                                    <button onClick={() => setShowRedeemModel(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                                        <CircleX size={24} />
                                    </button>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-600 paraFont">
                                            Select an offer (Your Points: {customerInfo?.customer_points})
                                        </label>
                                        <div className="flex flex-col gap-3 max-h-[40vh] overflow-y-auto pr-1">
                                            {isRedeemListLoading ? (
                                                <p className="text-sm font-medium">Loading offers...</p>
                                            ) : redeemRateList && redeemRateList.filter(r => Number(r.point) <= Number(customerInfo?.customer_points)).length > 0 ? (
                                                redeemRateList
                                                    .filter(r => Number(r.point) <= Number(customerInfo?.customer_points))
                                                    .sort((a,b) => Number(a.point) - Number(b.point))
                                                    .map((rate, idx) => (
                                                    <div 
                                                        key={rate._id || idx}
                                                        onClick={() => setSelectedRate(rate)}
                                                        className={`border-2 p-3 rounded-lg cursor-pointer transition-all ${selectedRate?._id === rate._id ? 'border-[var(--button-color1)] bg-[var(--button-color1)]/10' : 'border-gray-200 hover:border-gray-300'}`}
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-semibold mainFont">{rate.point} Points</span>
                                                            <span className="font-bold mainFont text-green-600">Get $ {rate.point_cost} Off</span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-500 paraFont">No applicable offers for your current points.</p>
                                            )}
                                        </div>
                                    </div>

                                    {selectedRate && (
                                    <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex justify-between items-center">
                                        <span className="text-green-700 font-medium paraFont">You get off:</span>
                                        <span className="text-2xl font-black text-green-600 mainFont">
                                            $ {Number(selectedRate.point_cost).toFixed(2)}
                                        </span>
                                    </div>
                                    )}

                                    <div className="flex gap-4 pt-4">
                                        <button 
                                            onClick={() => setShowRedeemModel(false)}
                                            className="flex-1 py-2.5 rounded-lg border border-gray-300 font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={handleRedeemPoints}
                                            disabled={!selectedRate}
                                            className="flex-1 py-2.5 rounded-lg bg-[var(--button-color1)] font-semibold text-white hover:opacity-90 transition-opacity shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}