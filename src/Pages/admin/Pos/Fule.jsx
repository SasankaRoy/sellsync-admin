import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { POSEditModel } from "../../../components/common/Models/POSEditModel";

import { EditIcon } from "../../../assets/Svgs/AllSvgs";
import { Download, Trash } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios-interceptor";
import { Loading } from "../../../components/UI/Loading/Loading";
import { toast } from "react-toastify";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "none",
  headerCheckbox: false,
};

export const Fule = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [fuelPrice, setFuelPrice] = useState({
    regular_cash: "",
    regular_credit: "",
    plus_cash: "",
    plus_credit: "",
    premium_credit: "",
    premium_cash: "",
    diesel_cash: "",
    diesel_credit: "",
  });
  const queryClient = useQueryClient();

  // handle onChange function
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFuelPrice({ ...fuelPrice, [name]: value });
  };

  // get fuel price history list....
  const getHistoryList = async () => {
    try {
      const reqList = await axiosInstance.post("api/v1/common/fuel-list", {
        page: 1,
        limit: 20,
      });

      if (reqList.status === 200 && reqList.data) {
        return reqList?.data?.results;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const { data: latestPrice, isLoading: isGetLatestPrice } = useQuery({
    queryKey: ["fule_latest_price"],
    queryFn: async () => {
      try {
        const getLatestPrice = await axiosInstance.get(
          "/api/v1/common/last-fuel-details"
        );

        if (getLatestPrice.status === 200 && getLatestPrice.data) {
          setFuelPrice({
            regular_cash: getLatestPrice?.data?.fuelDetails?.regular_cash,
            regular_credit: getLatestPrice?.data?.fuelDetails?.regular_credit,
            plus_cash: getLatestPrice?.data?.fuelDetails?.plus_cash,
            plus_credit: getLatestPrice?.data?.fuelDetails?.plus_credit,
            premium_credit: getLatestPrice?.data?.fuelDetails?.premium_cash,
            premium_cash: getLatestPrice?.data?.fuelDetails?.premium_credit,
            diesel_cash: getLatestPrice?.data?.fuelDetails?.diesel_cash,
            diesel_credit: getLatestPrice?.data?.fuelDetails?.diesel_credit,
          });
          // return getLatestPrice?.data?.fuelDetails;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  // handleUpdate price function...
  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const reqUpdatePrice = await axiosInstance.post(
        "/api/v1/common/fuel-update",
        {
          regular_cash: fuelPrice.regular_cash.toString(),
          regular_credit: fuelPrice.regular_credit.toString(),
          plus_cash: fuelPrice.plus_cash.toString(),
          plus_credit: fuelPrice.plus_credit.toString(),
          premium_cash: fuelPrice.premium_cash.toString(),
          premium_credit: fuelPrice.premium_credit.toString(),
          diesel_cash: fuelPrice.diesel_cash.toString(),
          diesel_credit: fuelPrice.diesel_credit.toString(),
        }
      );

      if (reqUpdatePrice.status === 200 && reqUpdatePrice.data) {
        toast.success(reqUpdatePrice?.data?.message);
        queryClient.invalidateQueries({
          queryKey: ["fuel_Price_History"],
        });
        queryClient.invalidateQueries({
          queryKey: ["fule_latest_price"],
        });
      }
    } catch (error) {
      console.error(error?.response?.data?.error);
      toast.error(
        error?.response?.data?.error || "Something went wrong! while updating"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const {
    data: rowData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fuel_Price_History"],
    queryFn: getHistoryList,
  });

  // if error occurs while fetching the list ..
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "id" },
    { field: "business_id" },
    { field: "date" },
    { field: "time" },
    { field: "regular_cash" },
    { field: "regular_credit" },
    { field: "plus_cash" },
    { field: "plus_credit" },
    { field: "premium_cash" },
    { field: "premium_credit" },
    { field: "diesel_cash" },
    { field: "diesel_credit" },
    { field: "status" },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: true,
    };
  }, []);

  return (
    <>
      {isLoading && isGetLatestPrice ? (
        <Loading />
      ) : (
        <Layout>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                POS / Fuels
              </h3>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full my-8 bg-white rounded-md border border-[#d4d4d4] p-5">
            <div className="">
              <h3 className="font-semibold text-[1.3dvw]">
                Current Fule Price
              </h3>
              <div className="flex justify-between items-center w-full gap-5">
                <div className="my-4 border-b px-2 py-4 border-[#d4d4d4] w-1/2">
                  <div className="flex justify-start items-center gap-3 mb-4">
                    <h4 className="text-[1.2dvw] font-semibold">REG</h4>
                    <p className="text-[1dvw] font-medium text-gray-600">
                      Regular
                    </p>
                  </div>
                  <div className="flex justify-start items-center gap-4 w-full">
                    <div className="flex flex-col gap-3 flex-1">
                      <label className="text-[1dvw] font-[700]">Cash</label>
                      <input
                        className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                        type="number"
                        placeholder="price.."
                        onChange={handleOnChange}
                        value={fuelPrice.regular_cash}
                        name="regular_cash"
                      />
                    </div>
                    <div className="flex flex-col gap-3 flex-1">
                      <label className="text-[1dvw] font-[700]">Credit</label>
                      <input
                        className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                        type="number"
                        placeholder="price.."
                        onChange={handleOnChange}
                        value={fuelPrice.regular_credit}
                        name="regular_credit"
                      />
                    </div>
                  </div>
                </div>

                <div className="my-4 border-b px-2 py-4 border-[#d4d4d4] w-1/2">
                  <div className="flex justify-start items-center gap-3 mb-4">
                    <h4 className="text-[1.2dvw] font-semibold">MID</h4>
                    <p className="text-[1dvw] font-medium text-gray-600">
                      Plus
                    </p>
                  </div>
                  <div className="flex justify-start items-center gap-4 w-full">
                    <div className="flex flex-col gap-3 flex-1">
                      <label className="text-[1dvw] font-[700]">Cash</label>
                      <input
                        className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                        type="number"
                        placeholder="price.."
                        onChange={handleOnChange}
                        value={fuelPrice.plus_cash}
                        name="plus_cash"
                      />
                    </div>
                    <div className="flex flex-col gap-3 flex-1">
                      <label className="text-[1dvw] font-[700]">Credit</label>
                      <input
                        className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                        type="number"
                        placeholder="price.."
                        onChange={handleOnChange}
                        value={fuelPrice.plus_credit}
                        name="plus_credit"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center gap-5 w-full">
                <div className="my-4 border-b px-2 py-4 border-[#d4d4d4] w-1/2">
                  <div className="flex justify-start items-center gap-3 mb-4">
                    <h4 className="text-[1.2dvw] font-semibold">PRE</h4>
                    <p className="text-[1dvw] font-medium text-gray-600">
                      PREMIUM
                    </p>
                  </div>
                  <div className="flex justify-start items-center gap-4 w-full">
                    <div className="flex flex-col gap-3 flex-1">
                      <label className="text-[1dvw] font-[700]">Cash</label>
                      <input
                        className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                        type="number"
                        placeholder="price.."
                        onChange={handleOnChange}
                        value={fuelPrice.premium_cash}
                        name="premium_cash"
                      />
                    </div>
                    <div className="flex flex-col gap-3 flex-1">
                      <label className="text-[1dvw] font-[700]">Credit</label>
                      <input
                        className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                        type="number"
                        placeholder="price.."
                        onChange={handleOnChange}
                        value={fuelPrice.premium_credit}
                        name="premium_credit"
                      />
                    </div>
                  </div>
                </div>
                <div className="my-4 border-b px-2 py-4 border-[#d4d4d4] w-1/2">
                  <div className="flex justify-start items-center gap-3 mb-4">
                    <h4 className="text-[1.2dvw] font-semibold">DSL</h4>
                    <p className="text-[1dvw] font-medium text-gray-600">
                      DIESEL
                    </p>
                  </div>
                  <div className="flex justify-start items-center gap-4 w-full">
                    <div className="flex flex-col gap-3 flex-1">
                      <label className="text-[1dvw] font-[700]">Cash</label>
                      <input
                        className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                        type="number"
                        placeholder="price.."
                        onChange={handleOnChange}
                        value={fuelPrice.diesel_cash}
                        name="diesel_cash"
                      />
                    </div>
                    <div className="flex flex-col gap-3 flex-1">
                      <label className="text-[1dvw] font-[700]">Credit</label>
                      <input
                        className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3"
                        type="number"
                        placeholder="price.."
                        onChange={handleOnChange}
                        value={fuelPrice.diesel_credit}
                        name="diesel_credit"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                disabled={isUpdating}
                onClick={handleUpdate}
                className="w-full py-5 disabled:opacity-70 disabled:pointer-events-none disabled:cursor-not-allowed bg-[var(--button-color1)] text-white mainFont font-[600] rounded-xl cursor-pointer"
              >
                {isUpdating ? "Updating...." : "Update Price"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-white rounded-md border border-[#d4d4d4] px-5 py-2">
            <div className="flex justify-between items-center w-full">
              <h3 className="font-[500] text-[1.5vw]">Price Update History</h3>
              <button className="bg-[var(--button-color1)] flex justify-center items-center text-[1dvw] gap-2 px-5 py-2 rounded-full mainFont font-[500] cursor-pointer text-white">
                <Download /> Download CSV
              </button>
            </div>
            <div className=" h-[60vh]">
              <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                // loading={loading}
                defaultColDef={defaultColDef}
                pagination={true}
                rowSelection={rowSelection}
                onSelectionChanged={(event) => console.log("Row Selected!")}
                onCellValueChanged={(event) =>
                  console.log(`New Cell Value: ${event.value}`)
                }
              />
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};
