import { CircleX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
ModuleRegistry.registerModules([AllCommunityModule]);
const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const AddProductModel = ({ productData, setShowModel, actionType }) => {
  const [currentActiveTab, setCurrentActiveTab] = useState("Details");
  const handleCloseModle = () => {
    setShowModel({
      state: false,
      productData: null,
      actionType: "",
    });
  };
  const handleChangeTab = (currentTab) => {
    // if (actionType === "Add" && currentTab !== "Details") {
    //   return; // Prevent changing tabs when actionType is "Add"
    // }
    setCurrentActiveTab(currentTab);
  };

  const handleRenderTab = (currentTab) => {
    switch (currentTab) {
      case "Details":
        return <DetailsTab actionType={actionType} />;
      case "Options":
        return <OptionsTab />;
      case "Promotions":
        return <PromotionsTab />;
      default:
        return <DetailsTab actionType={actionType} />;
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center p-4">
        <div className="bg-white rounded-md shadow p-4 sm:p-5 w-full sm:w-[90%] md:w-[80%] lg:w-[60%] max-h-[95%] overflow-auto">
          <div className="w-full bg-[var(--sideMenu-color)] flex justify-between items-center px-3 py-1.5 text-white rounded-md">
            <h3 className="font-semibold text-lg sm:text-xl lg:text-[1.8dvw]">
              {actionType === "Add" ? "Add Items" : `${actionType} Product`}
            </h3>
            <button
              onClick={handleCloseModle}
              className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
            >
              <CircleX size={24} className="sm:w-[30px] sm:h-[30px]" />
            </button>
          </div>

          <div className="bg-[#E6E6E6] p-2 rounded-full w-auto my-5 inline-flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => handleChangeTab("Details")}
              className={` ${
                currentActiveTab === "Details"
                  ? "bg-[var(--sideMenu-color)] text-white"
                  : "bg-transparent text-[#333333]/70"
              } border-none outline-none px-4 sm:px-8 py-1 text-sm sm:text-base lg:text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
            >
              Details
            </button>
            <button
              onClick={() => handleChangeTab("Options")}
              className={` ${
                currentActiveTab === "Options"
                  ? "bg-[var(--sideMenu-color)] text-white"
                  : "bg-transparent text-[#333333]/70"
              } border-none outline-none px-4 sm:px-8 py-1 text-sm sm:text-base lg:text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
            >
              Options
            </button>
            {actionType !== "Add" && (
              <>
                {/* <button
                  onClick={() => handleChangeTab("Options")}
                  className={` ${
                    currentActiveTab === "Options"
                      ? "bg-[var(--sideMenu-color)] text-white"
                      : "bg-transparent text-[#333333]/70"
                  } border-none outline-none px-4 sm:px-8 py-1 text-sm sm:text-base lg:text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
                >
                  Options
                </button> */}
                <button
                  onClick={() => handleChangeTab("Promotions")}
                  className={` ${
                    currentActiveTab === "Promotions"
                      ? "bg-[var(--sideMenu-color)] text-white"
                      : "bg-transparent text-[#333333]/70"
                  } border-none outline-none px-4 sm:px-8 py-1 text-sm sm:text-base lg:text-[.9dvw] cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear`}
                >
                  Promotions
                </button>
              </>
            )}
          </div>

          <div className="w-full p-2 border border-[var(--border-color)] rounded-md">
            {handleRenderTab(currentActiveTab)}
            <div className="flex flex-col sm:flex-row gap-4 justify-end items-center mt-6">
              <button className="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300">
                Update
              </button>
              <button className="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DetailsTab = ({ actionType }) => {
  const [addQuantityData, setQuantityData] = useState([1]);
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setImages((prevImages) => [
      ...prevImages,
      ...files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setImages((prevImages) => [
      ...prevImages,
      ...files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      return updatedImages;
    });
  };

  // Clean up preview URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  return (
    <>
      <div className="w-full p-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Stockcode
              <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Qty on Hand (Items)
              <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="number"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Qty on Hand (Cases)
              <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="number"
            />
          </div>
        </div>

        <div className="w-full my-4 flex flex-col gap-2">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Name
            <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">
              *
            </span>
          </label>
          <input
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="text"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Qty
              <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="number"
            />
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Qty Extra
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="number"
            />
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Price
              <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="number"
            />
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Price Extra
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="number"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-4">
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Avg Cost
              <span className="text-xs sm:text-sm lg:text-[.9dvw] text-[var(--Negative-color)]">
                *
              </span>
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="number"
            />
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Margin
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="number"
            />
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Markup
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="number"
            />
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Latest Cost
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="number"
            />
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Qty
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="number"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Size
            </label>
            {/* <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
            /> */}
            <select className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3">
              <option>-- Select Size--</option>
              <option value="50ML">50ML</option>
              <option value="100ML">100ML</option>
              <option value="200ML">200ML</option>
              <option value="375ML">375ML</option>
              <option value="750ML">750ML</option>
              <option value="1LT">1LT</option>
              <option value="1.5LT">1.5LT</option>
              <option value="1.75LT">1.75LT</option>
              <option value="1.75LT">1.75LT</option>
              <option value="2LT">2LT</option>
              <option value="3LT">3LT</option>
              <option value="4LT">4LT</option>
              <option value="5LT">5LT</option>
              <option value="8OZ">8OZ</option>
              <option value="12OZ">12OZ</option>
              <option value="16OZ">16OZ</option>
              <option value="18OZ">18OZ</option>
              <option value="22OZ">22OZ</option>
              <option value="24OZ">24OZ</option>
              <option value="28OZ">28OZ</option>
              <option value="32OZ">32OZ</option>
              <option value="1PK">1PK</option>
              <option value="2PK">2PK</option>
              <option value="4PK">4PK</option>
              <option value="6PK">6PK</option>
              <option value="8PK">8PK</option>
              <option value="10PK">10PK</option>
              <option value="12PK">12PK</option>
              <option value="15PK">15PK</option>
              <option value="16PK">16PK</option>
              <option value="18PK">18PK</option>
              <option value="20PK">20PK</option>
              <option value="24PK">24PK</option>
              <option value="30PK">30PK</option>
              <option value="36PK">36PK</option>
              <option value="Single">Single</option>
              <option value="MISC">MISC</option>
              <option value="19.2OZ">19.2OZ</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Vendor Name
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              placeholder="Enter vendor name..."
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 my-4">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Category
          </label>
          <input
            className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            placeholder="Enter catagory name..."
          />
        </div>

        <div className="w-full flex flex-col gap-2 my-4">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Add to Group (optional)
          </label>

          <input
            className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            placeholder="Enter group name..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full my-4">
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Supplier
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              placeholder="Enter supplier name..."
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              SKU
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full my-6">
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Units Per Case
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Case Cost Total
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Tax
            </label>

            <select className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3">
              <option value="no tax">No Tax</option>
              <option value="low-tax">Low Tax</option>
              <option value="high-tax">High Tax</option>
            </select>
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Reorder Point
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Reorder Value
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Rank
            </label>

            <select className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3">
              <option> -- Select Item Rank --</option>
            </select>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 mt-4">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Upload Images
          </label>
          <div
            className={`w-full border-2 border-dashed rounded-lg p-4 transition-colors duration-300 cursor-pointer ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50 hover:bg-gray-100"
            } ${actionType === "View" ? "opacity-50 pointer-events-none" : ""}`}
            onDragEnter={actionType !== "View" ? handleDragOver : undefined}
            onDragLeave={actionType !== "View" ? handleDragLeave : undefined}
            onDragOver={actionType !== "View" ? handleDragOver : undefined}
            onDrop={actionType !== "View" ? handleDrop : undefined}
            onClick={
              actionType !== "View"
                ? () => document.getElementById("file-input").click()
                : undefined
            }
          >
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {isDragging ? "Drop files here" : "Upload images"}
                  </p>
                </div>
              </div>
              {images.length > 0 && (
                <div className="relative flex items-center space-x-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.preview}
                        alt={`Uploaded ${index}`}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
                      />
                      {actionType !== "View" && (
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute -top-2 -right-2 bg-[var(--Negative-color)] text-white rounded-full p-1 hover:bg-red-700 transition-all duration-300"
                          title="Remove image"
                        >
                          <CircleX size={14} className="sm:w-4 sm:h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {actionType !== "View" && (
              <input
                id="file-input"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileInput}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const OptionsTab = () => {
  return (
    <>
      <div className="w-full p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2 sm:gap-4">
          <div className="flex justify-start items-center gap-3">
            <input
              id="autoUpdate"
              type="checkbox"
              className="h-4 w-4 sm:h-5 sm:w-5 lg:h-[1.2dvw] lg:w-[1.2dvw]"
            />
            <label
              htmlFor="autoUpdate"
              className="text-sm sm:text-base lg:text-[1.2dvw] font-semibold cursor-pointer"
            >
              Do Not Auto Update
            </label>
          </div>
          <div className="flex justify-start items-center gap-3">
            <input
              id="trackInventory"
              type="checkbox"
              className="h-4 w-4 sm:h-5 sm:w-5 lg:h-[1.2dvw] lg:w-[1.2dvw]"
            />
            <label
              htmlFor="trackInventory"
              className="text-sm sm:text-base lg:text-[1.2dvw] font-semibold cursor-pointer"
            >
              Do Not Track Inventory
            </label>
          </div>
          <div className="flex justify-start items-center gap-3">
            <input
              id="shortcutKeys"
              type="checkbox"
              className="h-4 w-4 sm:h-5 sm:w-5 lg:h-[1.2dvw] lg:w-[1.2dvw]"
            />
            <label
              htmlFor="shortcutKeys"
              className="text-sm sm:text-base lg:text-[1.2dvw] font-semibold cursor-pointer"
            >
              Add to Shortcut Keys
            </label>
          </div>
          <div className="flex justify-start items-center gap-3">
            <input
              id="outItem"
              type="checkbox"
              className="h-4 w-4 sm:h-5 sm:w-5 lg:h-[1.2dvw] lg:w-[1.2dvw]"
            />
            <label
              htmlFor="outItem"
              className="text-sm sm:text-base lg:text-[1.2dvw] font-semibold cursor-pointer"
            >
              Close Out Item
            </label>
          </div>
          <div className="flex justify-start items-center gap-3">
            <input
              id="manualDiscount"
              type="checkbox"
              className="h-4 w-4 sm:h-5 sm:w-5 lg:h-[1.2dvw] lg:w-[1.2dvw]"
            />
            <label
              htmlFor="manualDiscount"
              className="text-sm sm:text-base lg:text-[1.2dvw] font-semibold cursor-pointer"
            >
              Do Not Apply Manual Discount
            </label>
          </div>
          <div className="flex justify-start items-center gap-3">
            <input
              id="promotionsDiscount"
              type="checkbox"
              className="h-4 w-4 sm:h-5 sm:w-5 lg:h-[1.2dvw] lg:w-[1.2dvw]"
            />
            <label
              htmlFor="promotionsDiscount"
              className="text-sm sm:text-base lg:text-[1.2dvw] font-semibold cursor-pointer"
            >
              Exclude from Promotions Discount
            </label>
          </div>
          <div className="flex justify-start items-center gap-3">
            <input
              id="showWebstore"
              type="checkbox"
              className="h-4 w-4 sm:h-5 sm:w-5 lg:h-[1.2dvw] lg:w-[1.2dvw]"
            />
            <label
              htmlFor="showWebstore"
              className="text-sm sm:text-base lg:text-[1.2dvw] font-semibold cursor-pointer"
            >
              Do Not Show to Webstore
            </label>
          </div>
          <div className="flex justify-start items-center gap-3">
            <input
              id="hideInventory"
              type="checkbox"
              className="h-4 w-4 sm:h-5 sm:w-5 lg:h-[1.2dvw] lg:w-[1.2dvw]"
            />
            <label
              htmlFor="hideInventory"
              className="text-sm sm:text-base lg:text-[1.2dvw] font-semibold cursor-pointer"
            >
              Hide Inventory
            </label>
          </div>
          <div className="flex justify-start items-center gap-3">
            <input
              id="EBTEligible"
              type="checkbox"
              className="h-4 w-4 sm:h-5 sm:w-5 lg:h-[1.2dvw] lg:w-[1.2dvw]"
            />
            <label
              htmlFor="EBTEligible"
              className="text-sm sm:text-base lg:text-[1.2dvw] font-semibold cursor-pointer"
            >
              EBT Eligible
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          <div className="w-full my-4 flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Default Qty
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              placeholder="Enter Quantity..."
            />
          </div>
          <div className="w-full my-4 flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Min Price
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="number"
              placeholder="Min Price..."
            />
          </div>

          <div className="w-full my-4 flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Remind Date
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="date"
            />
          </div>
          {/* <div className="w-full my-4 flex flex-col gap-2">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Vendor Item Name
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
            />
          </div> */}
        </div>

        <div className="flex flex-col gap-2 w-full my-4">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Notes
          </label>
          <textarea
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            rows={5}
            placeholder="Enter Notes..."
          ></textarea>
        </div>

        <div className="flex flex-col gap-2 w-full my-4">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Tags
          </label>
          <input
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="text"
            placeholder="Tags"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
          <div className="flex flex-col gap-2 w-full my-4">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Points Multiplier
            </label>
            <select
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              placeholder="Tags"
            >
              <option>Select Multiplier</option>
              <option>1x</option>
              <option>2x</option>
              <option>3x</option>
              <option>4x</option>
              <option>5x</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full my-4">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Points Required
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="text"
              placeholder="Enter points"
            />
          </div>
          <div className="flex flex-col gap-2 w-full my-4">
            <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
              Item Type
            </label>
            <select
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              placeholder="Tags"
            >
              <option>Select Item Type</option>
              <option>Inventory Item</option>
              <option>Free Item</option>
              <option>Negative Item</option>
              <option>Lotto Sale</option>
              <option>Lotto Payout</option>
              <option>Deposit Return</option>
              <option>Gift Item</option>
              <option>Online Lottery</option>
              <option>Online Payout</option>
              <option>Manual Item</option>
              <option>House Pay</option>
              <option>Coupon ($)</option>
              <option>Coupon (%)</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

const PromotionsTab = () => {
  const [rowData, setRowData] = useState([
    {
      ID: "1",
      Name: "Beer",
      Status: "Enable",
    },
    {
      ID: "2",
      Name: "Beer",
      Status: "Enable",
    },
    {
      ID: "3",
      Name: "Beer",
      Status: "Enable",
    },
  ]);
  const [colDefs, setColDefs] = useState([
    { field: "ID", width: 80 },
    { field: "Name", width: 150 },
    { field: "Status", width: 120 },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      sortable: true,
      resizable: true,
      editable: false,
    };
  }, []);
  return (
    <>
      <div className="w-full p-2">
        <div className="flex flex-col gap-2 w-full my-4">
          <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
            Search Items
          </label>
          <input
            placeholder="Enter items ..."
            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
            type="text"
          />
        </div>
        <div className="h-[30vh] sm:h-[40vh] w-full">
          <div className="h-full w-full overflow-x-scroll overflow-y-auto">
            <div className="min-w-[400px] h-full">
              <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                rowSelection={rowSelection}
                onSelectionChanged={(event) => console.log("Row Selected!")}
                onCellValueChanged={(event) =>
                  console.log(`New Cell Value: ${event.value}`)
                }
                className="w-full h-full text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
