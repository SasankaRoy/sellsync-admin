import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios-interceptor";
import { CircleX } from "lucide-react";
import { motion } from "framer-motion";

const AllCategoryListSlide = ({
  variants,
  currentSliderVarient,
  setCurrentSliderVarient,
  setCurrentFilterItems,
}) => {
  const handleGetCategoryList = async () => {
    try {
      const reqCategoryList = await axiosInstance.post(
        "/api/v1/common/category-list",
        {
          page: 1,
          limit: 10,
          // search_text: "",
        }
      );

      if (reqCategoryList.status === 200) {
        return reqCategoryList.data.results || [];
      }
      return reqCategoryList.data.results || [];
    } catch (error) {
      console.log(error);
      return error?.response.data.message || "Faild to get Category list";
    }
  };

  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["get_categories"],
    queryFn: async () => await handleGetCategoryList(),
    staleTime: 3 * 60 * 1000,
  });
  // console.log(data)

  return (
    <>
      <motion.div
        variants={variants}
        initial="initial"
        key={currentSliderVarient}
        animate={currentSliderVarient}
        className="absolute top-2 right-0 w-full sm:w-[70%] lg:w-[50%] bg-white shadow-md border-l border-(--border-color)/20 p-3 sm:p-4 lg:p-5 z-40 h-full overflow-y-auto overflow-x-hidden max-w-full"
      >
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
            transition: {
              delay: 0.3,
            },
          }}
          transition={{
            duration: 0.4,
            ease: "anticipate",
            type: "tween",
          }}
          className="flex justify-between items-center border-b border-(--border-color) px-2 sm:px-3 lg:px-4 py-1.5"
        >
          <h3 className="text-base sm:text-lg lg:text-[1.5dvw] font-semibold">
            All Categories
          </h3>
          <button
            onClick={() => {
              setCurrentSliderVarient(variants.exit);
            }}
            className="cursor-pointer"
          >
            <CircleX
              size={20}
              className="sm:w-6 sm:h-6 lg:w-[25px] lg:h-[25px]"
            />
          </button>
        </motion.div>
        {isLoading || isFetching ? (
          <>
            <p className="text-center mainFont text-[1.5dvw] text-(--mainText-color)">
              Loading All categories List....
            </p>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 w-full my-3 sm:my-4 p-2">
              <motion.button
                initial={{
                  scale: 1,
                  opacity: 0,
                }}
                whileHover={{
                  scale: 1.05,
                }}
                whileInView={{
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                  },
                }}
                transition={{
                  duration: 0.4,
                  ease: "anticipate",
                  type: "tween",
                }}
                onClick={() => {
                  setCurrentFilterItems({
                    title: "Shortcuts",
                    queryName: "",
                    totalItems: "12",
                  });
                  setCurrentSliderVarient(variants.exit);
                }}
                className="w-full flex gap-2 sm:gap-3 bg-(--button-color2) text-(--primary-color) rounded justify-between items-center px-3 sm:px-4 border shadow cursor-pointer border-(--border-color) py-3 sm:py-4 lg:py-5 mainFont font-semibold text-xs sm:text-sm lg:text-[1dvw]"
              >
                <p>Shortcuts</p>
                <span className="text-xs sm:text-sm lg:text-[.8dvw]">12</span>
              </motion.button>
              {data.map((cur, id) => (
                <motion.button
                  key={id}
                  onClick={() => {
                    setCurrentFilterItems({
                      title: cur.category_name,
                      queryName: cur._id || cur.id,
                      totalItems: cur.number_of_product,
                    });
                    setCurrentSliderVarient(variants.exit);
                  }}
                  initial={{
                    scale: 1,
                    opacity: 0,
                  }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileInView={{
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                    },
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "anticipate",
                    type: "tween",
                  }}
                  className="w-full flex gap-2 sm:gap-3 bg-(--button-color2) text-(--primary-color) rounded justify-between items-center px-3 sm:px-4 border shadow cursor-pointer border-(--border-color) py-3 sm:py-4 lg:py-5 mainFont font-semibold text-xs sm:text-sm lg:text-[1dvw]"
                >
                  <p>{cur.category_name}</p>
                  <span className="text-xs sm:text-sm lg:text-[.8dvw]">
                    {cur.number_of_product || cur.products.length || 0}
                  </span>
                </motion.button>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default AllCategoryListSlide;
