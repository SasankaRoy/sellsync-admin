import { CircleX, Plus, Trash } from "lucide-react";
import React, { lazy, Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductImg1 from "../../../assets/images/ProductImg1.png";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios-interceptor";
import { useDispatch, useSelector } from "react-redux";
import { addNewItem, removeItem } from "../../../Redux/RingUpSlice";
import { toast } from "react-toastify";
import { calculateTax } from "../../../utils/CalculateTax";
import { handleGetTaxValue } from "../../../utils/apis/Taxes";
// import { AllCategoryListSlide } from "./AllCategoryListSlide";
const AllCategoryListSlide = lazy(() => import("./AllCategoryListSlide"));

const categoriesSlideVarient = {
  initial: {
    opacity: 0,
    x: "100%",
  },
  inView: {
    opacity: 1,
    x: "0%",
    transition: {
      duration: 0.9,
      ease: "anticipate",
      type: "tween",
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      delay: 0.3,
      duration: 0.9,
      ease: "anticipate",
      type: "tween",
    },
  },
};

export const Shortcuts = ({
  itemListVarient,
  showShortcuts,
  setShowShortcuts,
}) => {
  const [limit, setLimit] = useState(10);
  const [currentSliderVarient, setCurrentSliderVarient] = useState(
    categoriesSlideVarient.initial,
  );
  const [currentFilterItems, setCurrentFilterItems] = useState({
    title: "Shortcuts",
    queryName: "",
    totalItems: "20",
  });
  const dispatch = useDispatch();
  const currentRingUpData = useSelector((state) => state.ringUps);
  const currentBillId = useSelector((state) => state.currentBill.billId);

  const handleGetLists = async (title, queryName) => {
    try {
      if (title === "Shortcuts") {
        const reqList = await axiosInstance.post(
          "/api/v1/product/shortcut-product-list",
          {
            page: 1,
            limit: limit,
            // selected_category_id: "",
            // search_text: "",
          },
        );
        if (reqList.status === 200) {
          
          return reqList.data.results || [];
        }
        return reqList.data.results || [];
      } else {
        const reqList = await axiosInstance.post(
          "/api/v1/employee/category-wise-product-list",
          {
            page: 1,
            limit: limit,
            selected_category_id: queryName,
            // selected_category_id: '68adb20884f3336f436a8769',
            // search_text: "",
          },
        );
        if (reqList.status === 200) {         
          return reqList.data.results || [];
        }
        return reqList.data.results || [];
      }
      return [];
    } catch (error) {
      console.error(error);
      return error?.response?.data.message || "Faild to fetch product list";
    }
  };

  const {
    data = [],
    isError,
    isFetching,
    isLoading,
  } = useQuery({
    queryFn: async () =>
      await handleGetLists(
        currentFilterItems.title,
        currentFilterItems.queryName,
      ),
    queryKey: [
      "get_shortcuts_list",
      limit,
      currentFilterItems.title,
      currentFilterItems.queryName,
    ],
  });

  const { data: CurrentTaxVal } = useQuery({
    queryKey: ["get_current_tax_value", currentBillId],
    queryFn: async () => {
      const res = handleGetTaxValue();
      return res;
    },
  });

  const handleAddItem = async (curData) => {
    const { id, name, product_image, product_price, tax_percentage,category_age_verification } = curData;
    if (currentBillId) {
      try {
        // mean the bill is already created and we are adding items to it
        const billDetails = await axiosInstance.post(
          `api/v1/bills/${currentBillId}/items`,
          {
            productId: id,
            qty: 1,
          },
        );

        if (billDetails.status === 200) {
          toast.success("Item added to bill");
        }
      } catch (error) {
        toast.error(
          error.response.data.message || "Failed to add item to bill",
        );
      }
    }
    dispatch(
      addNewItem({
        id,
        name,
        product_image,
        product_price,
        tax_percentage,
        qty: 1,
        tax: calculateTax(1, tax_percentage, CurrentTaxVal),
        category_age_verification
      }),
    );
    localStorage.setItem(
      "processingPayment",
      JSON.stringify({
        state: false,
        message: "",
      }),
    );
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const isItemInCart = (itemId) => {
    return currentRingUpData?.some((item) => item.id === itemId);
  };

  return (
    <>
      <motion.div
        variants={itemListVarient}
        initial="initial"
        animate={showShortcuts}
        key={showShortcuts}
        className="absolute flex flex-col gap-3 sm:gap-4 lg:gap-5 top-0 sm:top-1.5 p-2 sm:p-3 lg:p-4 right-0 sm:right-2 w-full h-full bg-(--primary-color) overflow-x-hidden max-w-full"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            ease: "circInOut",
            type: "tween",
            delay: 0.5,
          }}
          className="flex flex-col sm:flex-row justify-between shrink-0 w-full items-start sm:items-center gap-3 sm:gap-0 border-b border-(--border-color) pb-2 px-2 sm:px-3"
        >
          <h3 className="text-sm sm:text-base lg:text-[1.5dvw] font-semibold text-(--button-color3)">
            {currentFilterItems.title} Items{" "}
            <span className="text-xs sm:text-sm lg:text-[.9dvw]">
              {" "}
              - ( {currentFilterItems.totalItems} )
            </span>
          </h3>
          <div className="flex justify-center items-center gap-2 sm:gap-3 lg:gap-5 w-full sm:w-auto">
            <button
              onClick={() => {
                setCurrentSliderVarient(categoriesSlideVarient.inView);
              }}
              className="text-xs sm:text-sm lg:text-[1dvw] py-1.5 sm:py-2 lg:py-2.5 bg-(--button-color1) text-(--primary-color) px-3 sm:px-4 lg:px-5 rounded-md mainFont cursor-pointer font-semibold flex-1 sm:flex-none"
            >
              Browse Categories
            </button>
            <button
              onClick={() => {
                setShowShortcuts(itemListVarient.exit);
              }}
              className="cursor-pointer"
            >
              <CircleX
                size={24}
                className="sm:w-7 sm:h-7 lg:w-[30px] lg:h-[30px]"
              />
            </button>
          </div>
        </motion.div>
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center gap-2">
            <img src="/logo.png" className="h-[7dvw] w-[5dvw] object-contain" />
            <p className="text-center mainFont text-[1.5dvw] font-semibold animate-pulse">
              Fetching items.....
            </p>
          </div>
        ) : (
          <>
            {data.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center gap-2">
                <img
                  src="/logo.png"
                  className="h-[7dvw] w-[5dvw] object-contain"
                />
                <p className="text-center mainFont text-(--mainText-color)/70 text-[1.5dvw] font-semibold">
                  No Products Found.....
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: "circInOut",
                  type: "tween",
                  delay: 0.5,
                }}
                className=" p-2 grid bg-red-00 scrollCustom grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 w-full max-h-full overflow-y-auto"
              >
                {data.map((cur, id) => (
                  <div
                    key={id}
                    className={`bg-(--primary-color) cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 border border-(--border-color)/20 flex flex-col gap-2 sm:gap-3 shadow-sm rounded-md p-2 ${
                      isItemInCart(cur.id)
                        ? "bg-(--sideMenu-color)/15"
                        : "bg-(--primary-color)"
                    }`}
                  >
                    <div className="h-[15vh] sm:h-[18vh] lg:h-[20vh] rounded-md w-full bg-(--secondary-color) py-2 sm:py-3 lg:py-4">
                      <img
                        className="w-full h-full object-contain"
                        src={cur.product_image}
                        alt="product-image"
                      />
                    </div>
                    <div className="flex flex-col gap-1 px-1 sm:px-2 py-1">
                      <div className="flex flex-col gap-.5">
                        <h3 className="text-xs sm:text-sm lg:text-[1dvw] font-semibold line-clamp-2 mainFont">
                          {cur.name}
                        </h3>
                        <p className="paraFont text-xs sm:text-sm lg:text-[.9dvw] text-(--button-color4) line-clamp-1 my-2">
                          Size {cur.product_size}
                          {cur.qty_on_hand !== undefined && (
                            <span className="ml-2">
                              • Stock: {cur.qty_on_hand}
                            </span>
                          )}
                          {cur.tax_percentage !== undefined && (
                            <span className="ml-2">
                              • Tax: {cur.tax_percentage}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-sm sm:text-base lg:text-[1.2dvw]">
                          $ {cur.product_price}
                        </h3>
                        {isItemInCart(cur.id) ? (
                          <button
                            onClick={() => handleRemoveItem(cur.id)}
                            className="px-5 py-1 tracking-wider bg-(--Negative-color) text-white mainFont cursor-pointer font-semibold text-[.95dvw] rounded-lg"
                          >
                            <Trash />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddItem(cur)}
                            className="px-5 py-1 tracking-wider bg-(--button-color1) text-white mainFont cursor-pointer font-semibold rounded-lg"
                          >
                            <Plus />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </>
        )}
        {currentRingUpData?.length >= 1 && (
          <div className="absolute right-0 bottom-[5%] w-[30%]  z-30">
            <button
              onClick={() => {
                setShowShortcuts(itemListVarient.exit);
              }}
              className="bg-(--button-color1) text-white mainFont flex justify-center items-center gap-4 font-semibold text-[1.5dvw] cursor-pointer py-2 w-full rounded-xl"
            >
              Contiune{" "}
              <span className="text-[1dvw]">
                ( {currentRingUpData.length} items )
              </span>
            </button>
          </div>
        )}
      </motion.div>
      <Suspense fallback={null}>
        <AnimatePresence mode="popLayout">
          <AllCategoryListSlide
            variants={categoriesSlideVarient}
            currentSliderVarient={currentSliderVarient}
            setCurrentSliderVarient={setCurrentSliderVarient}
            setCurrentFilterItems={setCurrentFilterItems}
          />
        </AnimatePresence>
      </Suspense>
    </>
  );
};
