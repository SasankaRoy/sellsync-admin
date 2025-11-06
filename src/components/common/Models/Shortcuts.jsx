import { CircleX } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductImg1 from "../../../assets/images/ProductImg1.png";

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
  const [currentSliderVarient, setCurrentSliderVarient] = useState(
    categoriesSlideVarient.initial
  );
  const [currentFilterItems, setCurrentFilterItems] = useState({
    title: "Shortcuts",
    queryName: "",
    totalItems: "20",
  });
  return (
    <>
      <motion.div
        variants={itemListVarient}
        initial="initial"
        animate={showShortcuts}
        key={showShortcuts}
        className="absolute flex flex-col gap-5 top-1.5 p-4 right-2 w-full h-full bg-(--primary-color)"
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
          className="flex justify-between shrink-0 w-full items-center border-b border-(--border-color) pb-2 px-3"
        >
          <h3 className="text-[1.5dvw] font-semibold text-(--button-color3)">
            {currentFilterItems.title} Items{" "}
            <span className="text-[.9dvw]">
              {" "}
              - ( {currentFilterItems.totalItems} )
            </span>
          </h3>
          <div className="flex justify-center items-center gap-5">
            <button
              onClick={() => {
                setCurrentSliderVarient(categoriesSlideVarient.inView);
              }}
              className="text-[1dvw] py-2.5 bg-(--button-color1) text-(--primary-color) px-5 rounded-md mainFont cursor-pointer font-semibold"
            >
              Browse Categories
            </button>
            <button
              onClick={() => {
                setShowShortcuts(itemListVarient.exit);
              }}
              className="cursor-pointer"
            >
              <CircleX size={30} />
            </button>
          </div>
        </motion.div>
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
          className=" p-2 grid bg-red-00 scrollCustom grid-cols-4 gap-4 w-full max-h-full overflow-y-auto"
        >
          {Array.from({ length: currentFilterItems.totalItems }).map(
            (cur, id) => (
              <div className="bg-(--primary-color) cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 border border-(--border-color)/20 flex flex-col gap-3 shadow-sm rounded-md p-2">
                <div className="h-[20vh] rounded-md w-full bg-(--secondary-color) py-4">
                  <img
                    className="w-full h-full object-contain"
                    src={ProductImg1}
                    alt="product-image"
                  />
                </div>
                <div className="flex flex-col gap-1 px-2 py-1">
                  <div className="flex flex-col gap-.5">
                    <h3 className="text-[1dvw] font-semibold line-clamp-2 mainFont">
                      Budwiser Magnum 750ML
                    </h3>
                    <p className="paraFont text-[.9dvw] text-(--button-color4) line-clamp-1">
                      Product small info
                    </p>
                  </div>
                  <h3 className="font-semibold text-[1.2dvw]">$ 20.00</h3>
                </div>
              </div>
            )
          )}
        </motion.div>
      </motion.div>
      <AnimatePresence mode="popLayout">
        <AllCategoryListSlide
          variants={categoriesSlideVarient}
          currentSliderVarient={currentSliderVarient}
          setCurrentSliderVarient={setCurrentSliderVarient}
          setCurrentFilterItems={setCurrentFilterItems}
        />
      </AnimatePresence>
    </>
  );
};

const AllCategoryListSlide = ({
  variants,
  currentSliderVarient,
  setCurrentSliderVarient,
  setCurrentFilterItems,
}) => {
  return (
    <>
      <motion.div
        variants={variants}
        initial="initial"
        key={currentSliderVarient}
        animate={currentSliderVarient}
        className="absolute top-2 right-0 w-[50%] bg-white shadow-md border-l border-(--border-color)/20 p-5 z-40 h-full"
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
          className="flex justify-between items-center border-b border-(--border-color) px-4 py-1.5"
        >
          <h3 className="text-[1.5dvw] font-semibold">All Categories</h3>
          <button
            onClick={() => {
              setCurrentSliderVarient(variants.exit);
            }}
            className="cursor-pointer"
          >
            <CircleX size={25} />
          </button>
        </motion.div>
        <div className="grid grid-cols-2 gap-4 w-full  my-4 p-2">
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
              setCurrentSliderVarient(variants.exit)
            }}
            className="w-full flex gap-3 bg-(--button-color2) text-(--primary-color) rounded justify-between items-center px-4 border shadow cursor-pointer border-(--border-color)  py-5 mainFont font-semibold text-[1dvw]"
          >
            <p>Shortcuts</p>
            <span className="text-[.8dvw]">12</span>
          </motion.button>
          <motion.button
            onClick={() => {
              setCurrentFilterItems({
                title: "Wine",
                queryName: "",
                totalItems: "15",
              });
              setCurrentSliderVarient(variants.exit)
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
            className="w-full flex gap-3 bg-(--button-color2) text-(--primary-color) rounded justify-between items-center px-4 border shadow cursor-pointer border-(--border-color)  py-5 mainFont font-semibold text-[1dvw]"
          >
            <p>Wine</p>
            <span className="text-[.8dvw]">15</span>
          </motion.button>
          <motion.button
            onClick={() => {
              setCurrentFilterItems({
                title: "Beer",
                queryName: "",
                totalItems: "20",
              });
              setCurrentSliderVarient(variants.exit)
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
            className="w-full flex gap-3 bg-(--button-color2) text-(--primary-color) rounded justify-between items-center px-4 border shadow cursor-pointer border-(--border-color)  py-5 mainFont font-semibold text-[1dvw]"
          >
            <p>Beer</p>
            <span className="text-[.8dvw]">20</span>
          </motion.button>
          <motion.button
            onClick={() => {
              setCurrentFilterItems({
                title: "PIZZA / WINGS COMBO",
                queryName: "",
                totalItems: "10",
              });
              setCurrentSliderVarient(variants.exit)
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
            className="w-full flex gap-3 bg-(--button-color2) text-(--primary-color) rounded justify-between items-center px-4 border shadow cursor-pointer border-(--border-color)  py-5 mainFont font-semibold text-[1dvw]"
          >
            <p className="line-clamp-1">PIZZA / WINGS COMBO</p>
            <span className="text-[.8dvw]">10</span>
          </motion.button>
          <motion.button
            onClick={() => {
              setCurrentFilterItems({
                title: "Cigaretes",
                queryName: "",
                totalItems: "150",
              });
              setCurrentSliderVarient(variants.exit)
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
            className="w-full flex gap-3 bg-(--button-color2) text-(--primary-color) rounded justify-between items-center px-4 border shadow cursor-pointer border-(--border-color)  py-5 mainFont font-semibold text-[1dvw]"
          >
            <p className="line-clamp-1">Cigaretes</p>
            <span className="text-[.8dvw]">150</span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};
