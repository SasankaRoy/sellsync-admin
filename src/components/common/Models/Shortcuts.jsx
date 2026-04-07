import { CircleX, Plus, Trash } from "lucide-react";
import React, { lazy, Suspense, useState, useEffect } from "react";
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
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [totalPages, setTotalPages] = useState(0);
  const [currentSliderVarient, setCurrentSliderVarient] = useState(
    categoriesSlideVarient.initial,
  );
  const [currentFilterItems, setCurrentFilterItems] = useState({
    title: "Shortcuts",
    queryName: "",
    totalItems: "20",
  });
  const [prevFilter, setPrevFilter] = useState({
    title: "Shortcuts",
    queryName: "",
  });

  if (
    currentFilterItems.title !== prevFilter.title ||
    currentFilterItems.queryName !== prevFilter.queryName
  ) {
    setPrevFilter({
      title: currentFilterItems.title,
      queryName: currentFilterItems.queryName,
    });
    setAllData([]);
    setCurrentPage(1);
  }
  const dispatch = useDispatch();
  const currentRingUpData = useSelector((state) => state.ringUps);
  const currentBillId = useSelector((state) => state.currentBill.billId);
  const handleGetLists = async (title, queryName, pageNum) => {
    try {
      if (title === "Shortcuts") {
        const reqList = await axiosInstance.post(
          "/api/v1/product/shortcut-product-list",
          {
            page: pageNum,
            limit: limit,
            // selected_category_id: "",
            // search_text: "",
          },
        );
        if (reqList.status === 200) {
          setTotalPages(reqList.data?.total_records || 0);
          return reqList.data.results || [];
        }
        return reqList.data.results || [];
      } else {
        const reqList = await axiosInstance.post(
          "/api/v1/employee/category-wise-product-list",
          {
            page: pageNum,
            limit: limit,
            selected_category_id: queryName,
            // selected_category_id: '68adb20884f3336f436a8769',
            // search_text: "",
          },
        );
        if (reqList.status === 200) {
          setTotalPages(reqList.data?.total_records || 0);
          return reqList.data.results || [];
        }
        return reqList.data.results || [];
      }
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
        currentPage,
      ),
    queryKey: [
      "get_shortcuts_list",
      // limit,
      currentFilterItems.title,
      currentFilterItems.queryName,
      currentPage,
    ],
    refetchInterval: 3000,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setAllData((prev) => {
        const map = new Map(prev.map((item) => [item.id, item]));
        data.forEach((item) => map.set(item.id, item));
        return Array.from(map.values());
      });
    }
  }, [data]);

  const { data: CurrentTaxVal } = useQuery({
    queryKey: ["get_current_tax_value", currentBillId],
    queryFn: async () => {
      const res = handleGetTaxValue();
      return res;
    },
  });

  const handleAddItem = async (curData) => {
    const {
      id,
      name,
      product_image,
      product_price,
      tax_percentage,
      category_age_verification,
    } = curData;
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
        category_age_verification,
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

  const handleLoadMore = () => {
    if (isLoading || isFetching) return;
    if (allData.length < totalPages) {
      setCurrentPage((prv) => prv + 1);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      handleLoadMore();
    }
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
        {isLoading && allData?.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center gap-2">
            <img src="/logo.png" className="h-[7dvw] w-[5dvw] object-contain" />
            <p className="text-center mainFont text-[1.5dvw] font-semibold animate-pulse">
              Fetching items.....
            </p>
          </div>
        ) : (
          <>
            {allData?.length === 0 ? (
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
                onScroll={handleScroll}
                className=" p-2 grid  scrollCusto grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 w-full max-h-full overflow-y-auto"
              >
                {allData?.map((cur, id) => (
                  <>
                    <div
                      key={id}
                      className={`group min-h-[40dvh] flex flex-col gap-2 sm:gap-3 overflow-hidden rounded-xl border bg-(--primary-color) shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-2 ${
                        isItemInCart(cur.id)
                          ? "border-(--button-color1) ring-1 ring-(--button-color1)/30 bg-(--primary-color)"
                          : "border-(--border-color)/20"
                      } ${!cur.qty_on_hand ? "opacity-90" : ""}`}
                    >
                      {/* Image Region: EXACT SAME HEIGHT CLASSES */}
                      <div className="relative flex h-[15vh] w-full items-center justify-center overflow-hidden rounded-lg bg-(--secondary-color)/20 p-2 sm:h-[18vh] sm:p-3 lg:h-[20vh] lg:p-4">
                        {!cur.qty_on_hand && (
                          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-[1.5px]">
                            <div className="rounded border border-red-200 bg-red-50/90 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-red-600 shadow-sm sm:px-3 sm:text-xs">
                              Out of Stock
                            </div>
                          </div>
                        )}
                        <img
                          className={`h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 ${!cur.qty_on_hand ? "grayscale opacity-75" : ""}`}
                          src={cur.product_image || ProductImg1}
                          alt="product-image"
                        />
                        {isItemInCart(cur.id) && (
                          <div className="absolute left-2 top-2 z-10 rounded bg-(--button-color1) px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white shadow-sm lg:text-[0.65dvw]">
                            In Cart
                          </div>
                        )}
                      </div>

                      {/* Content Region */}
                      <div className="flex flex-col gap-1 px-1 sm:px-2 pb-1">
                        <div className="flex flex-col gap-1">
                          <h3 className="line-clamp-2 text-xs font-semibold sm:text-sm lg:text-[1dvw] mainFont">
                            {cur.name}
                          </h3>

                          <div className="flex flex-wrap items-center gap-1.5 paraFont mt-1">
                            {cur.product_size && (
                              <span className="rounded bg-(--border-color)/10 px-1.5 py-0.5 text-[0.65rem] font-medium text-(--button-color4) sm:text-xs lg:text-[0.8dvw]">
                                Size {cur.product_size}
                              </span>
                            )}
                            {cur.qty_on_hand !== undefined && (
                              <span
                                className={`rounded px-1.5 py-0.5 text-[0.65rem] font-medium sm:text-xs lg:text-[0.8dvw] ${cur.qty_on_hand > 5 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
                              >
                                Stock: {cur.qty_on_hand}
                              </span>
                            )}
                            {cur.tax_percentage !== undefined && (
                              <span className="rounded bg-(--border-color)/10 px-1.5 py-0.5 text-[0.65rem] font-medium text-(--button-color4) sm:text-xs lg:text-[0.8dvw]">
                                Tax: {cur.tax_percentage}%
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-2 flex items-center justify-between border-t border-(--border-color)/10 pt-2">
                          <h3 className="font-semibold text-sm sm:text-base lg:text-[1.2dvw]">
                            $ {cur.product_price}
                          </h3>
                          {isItemInCart(cur.id) ? (
                            <button
                              onClick={() => handleRemoveItem(cur.id)}
                              className="flex items-center justify-center rounded-lg bg-(--Negative-color)/10 px-4 py-1.5 text-(--Negative-color) transition-all hover:bg-(--Negative-color) hover:text-white mainFont font-semibold text-[.9dvw]"
                              title="Remove from Cart"
                            >
                              <Trash size={16} className="sm:mr-1" />
                              <span className="hidden sm:inline-block">
                                Remove
                              </span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAddItem(cur)}
                              disabled={!cur.qty_on_hand}
                              className="flex items-center justify-center rounded-lg bg-(--button-color1) px-4 py-1.5 text-white shadow-sm transition-all hover:bg-opacity-90 active:scale-95 disabled:pointer-events-none disabled:opacity-50 mainFont font-semibold text-[.9dvw]"
                              title="Add to Cart"
                            >
                              <Plus size={16} className="sm:mr-1" />
                              <span className="hidden sm:inline-block">
                                Add
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
                {isFetching && allData?.length > 0 && (
                  <div className="col-span-2 sm:col-span-3 lg:col-span-3 w-full flex justify-center items-center py-4">
                    <p className="text-center mainFont text-[1.2dvw] font-semibold animate-pulse text-(--button-color3)">
                      Loading more...
                    </p>
                  </div>
                )}
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
            setAllData={setAllData}
          />
        </AnimatePresence>
      </Suspense>
    </>
  );
};
