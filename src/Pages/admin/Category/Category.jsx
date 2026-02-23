import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import {
  DeleteIcon,
  FilterIcon,
  PluseIcon,
  SortIcon,
} from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { CircleX, Edit, Trash, Plus, Download } from "lucide-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios-interceptor";
import { toast } from "react-toastify";
import { Loading } from "../../../components/UI/Loading/Loading";
ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Category = () => {
  const [showModel, setShowModel] = useState({
    state: false,
    productData: null,
    actionType: "",
  });

  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
    path: "",
  });
  const handleGetCategoryList = async () => {
    try {
      const getCategoryList = await axiosInstance.post(
        "api/v1/common/category-list",
        {
          page: 1,
          limit: 10,
        }
      );

      if (getCategoryList.data && getCategoryList.status === 200) {
        return getCategoryList.data.results || [];
      }
      return [];
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  const {
    data: rowData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get_category_list"],
    queryFn: handleGetCategoryList,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to fetch category list");
    }
  }, [error]);

  const onAddCategory = () => {
    console.log("Create Category button clicked");
    const newState = {
      state: true,
      productData: {
        ID: "",
        CategoryName: "",
        AgeVerification: "",
        DefaultMargin: "",
        AllowEBT: false,
        DoNotDiscount: false,
        DoNotShowToWebstore: false,
        ExcludeDualPrice: false,
        ExcludeLoyaltyReward: false,
      },
      actionType: "Add",
    };
    setShowModel(newState);
    console.log("New showModel state:", newState);
  };

  // Add Product handler for Layout component
  const handleAddProduct = () => {
    console.log("Add Product clicked from Layout");
    onAddCategory(); // Trigger the same modal as Create Category
  };

  const onEdit = (product) => {
    console.log(product, "edit");
    if (product) {
      setShowModel({
        state: true,
        productData: product,
        actionType: "Edit",
      });
    }
  };

  const onDelete = (product) => {
    // console.log(product, "delete");
    setDeleteModel({
      state: true,
      productId: product.id || product._id,
      path: `api/v1/common/category-delete/${product._id}`,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "category_name", headerName: "Category Name" },
    { field: "number_of_product", headerName: "Number of Items" },
    { field: "category_slug", headerName: "Slug" },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (data) => {
        return (
          <>
            <div
              className={`capitalize font-semibold  flex justify-center items-center gap-3`}
            >
              <div
                className={`h-2 w-2 ${data.value === "active"
                  ? "bg-[var(--Positive-color)]"
                  : "bg-[var(--Negative-color)]"
                  } rounded-full`}
              ></div>
              <p>{data.value}</p>
            </div>
          </>
        );
      },
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionBtns,
      cellRendererParams: {
        onEdit,
        onDelete,
        skinSafe: true,
      },
    },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: false,
    };
  }, []);

  return (
    <Layout onAddProduct={handleAddProduct}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
            <div className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0 lg:flex-row lg:items-center lg:gap-0 lg:mb-0">
                <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                  Categories List
                </h3>
                <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto lg:flex-row lg:w-auto lg:gap-5">
                  <button
                    onClick={onAddCategory}
                    className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                  >
                    Create Category <PluseIcon />
                  </button>
                  <button className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
                    Import CSV <PluseIcon />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[75vh]">
              <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-full">
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0 lg:flex-row lg:items-center lg:gap-0">
                  <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto lg:justify-center lg:w-auto">
                    <select className="font-[500] mainFont px-4 justify-between border-none outline-none text-sm lg:text-base">
                      <option>All Category</option>
                      <option>Beer</option>
                      <option>Wine</option>
                      <option>Spirits</option>
                    </select>
                    <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[var(--counterBg-color)] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                      <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                        {rowData.length}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-4 justify-between items-center flex-wrap lg:gap-4">
                    {/*<button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                  Sort <SortIcon />
                </button>
                <button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                  Filter <FilterIcon />
                </button>*/}
                    <button className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
                      Export CSV <Download size={16} />
                    </button>
                    <button>
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
                <div className="h-full w-full overflow-x-scroll overflow-y-auto lg:overflow-x-visible">
                  <div className="min-w-[800px] h-full lg:min-w-0">
                    <AgGridReact
                      rowData={rowData}
                      columnDefs={colDefs}
                      defaultColDef={defaultColDef}
                      pagination={true}
                      rowSelection={rowSelection}
                      onSelectionChanged={(event) =>
                        console.log("Row Selected!")
                      }
                      onCellValueChanged={(event) =>
                        console.log(`New Cell Value: ${event.value}`)
                      }
                      className="w-full h-full text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showModel.state && (
        <EditAndAddModel
          productData={showModel.productData || {}}
          setShowModel={setShowModel}
          actionType={showModel.actionType}
        />
      )}
      {deleteModel.state && deleteModel.productId && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          productId={deleteModel.productId}
          path={deleteModel.path}
        // setRowData={setRowData}
        // rowData={rowData}
        />
      )}
    </Layout>
  );
};

const ActionBtns = (props) => {
  const { onEdit, onDelete } = props;
  const { data } = props;

  const handleEdit = () => {
    onEdit(data);
  };

  const handleDelete = () => {
    onDelete(data);
  };

  return (
    <>
      <div className="w-full flex gap-2 sm:gap-4 py-2 justify-center items-center">
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleEdit}
        >
          <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>

        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1 sm:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleDelete}
        >
          <Trash size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
      </div>
    </>
  );
};

const EditAndAddModel = ({ productData = {}, setShowModel, actionType }) => {
  const [categoryFields, setCategoryFields] = useState({
    CategoryName: productData?.category_name || "",
    AgeVerification: productData?.category_name || "", // Changed from Stock to AgeVerification
    DefaultMargin: "",
    AllowEBT: false,
    DoNotDiscount: false,
    DoNotShowToWebstore: false,
    ExcludeDualPrice: false,
    ExcludeLoyaltyReward: false,
  });
  const queryClient = useQueryClient();



  const handleCloseModel = () => {
    setShowModel({
      state: false,
      productData: null,
      actionType: "",
    });
  };

  const handleOnchange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setCategoryFields({
        ...categoryFields,
        [name]: checked,
      });
      return;
    }
    setCategoryFields({
      ...categoryFields,
      [name]: value,
    });
  };

  const mutationFn = useMutation({
    mutationFn: async ({ bodyObj, path }) => {
      const reqSaveCategory = await axiosInstance.post(path, bodyObj);
      if (reqSaveCategory.data && reqSaveCategory.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["get_category_list"],
        });
        return reqSaveCategory.data;
      }
      throw new Error(response.data?.message || "Failed to add group");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to save the category !");
    },
    onSuccess: (data) => {
      toast.success(data.message || "Category added successfully");
    },
    onSettled: () => {
      handleCloseModel();
    },
  });

  const handleSubmit = () => {
    if (actionType === "Add") {
      const bodyObj = {
        category_name: categoryFields.CategoryName,
        age_verification: categoryFields.AgeVerification,
        default_margin: categoryFields.DefaultMargin,
        allow_ebt: categoryFields.AllowEBT,
        do_not_discount: categoryFields.DoNotDiscount,
        do_not_show_to_webstore: categoryFields.DoNotShowToWebstore,
        exclude_dial_price: categoryFields.ExcludeDualPrice,
        exclude_loyalty_reward: categoryFields.ExcludeLoyaltyReward,
      };
      mutationFn.mutate({ bodyObj, path: "api/v1/common/category-add" });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center p-4">
      <div className="bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[70%] max-h-[90vh] overflow-y-auto p-4 sm:p-5 rounded-lg shadow-md">
        <div className="flex justify-between items-center w-full p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
          <h3 className="text-lg sm:text-xl lg:text-[1.5dvw] font-semibold">
            {actionType === "Add" ? "Add Category" : `${actionType} Category`}
          </h3>
          <button
            onClick={handleCloseModel}
            className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
          >
            <CircleX size={24} className="sm:w-[30px] sm:h-[30px]" />
          </button>
        </div>

        <div className="w-full p-2 sm:p-3 space-y-4 sm:space-y-6">
          <div className="border border-gray-200 rounded-lg p-3 sm:p-4 relative grid grid-cols-2 gap-4 w-full">
            <div className="w-full flex flex-col gap-2 col-span-2">
              <label
                htmlFor="categoryName"
                className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
              >
                Category Name
              </label>
              <input
                placeholder="Enter category name...
              "
                type="text"
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                onChange={handleOnchange}
                value={categoryFields.CategoryName}
                name="CategoryName"
                id="categoryName"
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="ageLimit"
                className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
              >
                Age Verification (age limit)
              </label>
              <input
                placeholder="Enter age limit...
              "
                type="number"
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                onChange={handleOnchange}
                value={categoryFields.AgeVerification}
                name="AgeVerification"
                id="ageLimit"
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="defaultMargin"
                className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
              >
                Default Margin
              </label>
              <input
                placeholder="Enter margin...
              "
                type="number"
                onChange={handleOnchange}
                value={categoryFields.DefaultMargin}
                name="DefaultMargin"
                id="defaultMargin"
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              />
            </div>

            <div className="w-full flex flex-row justify-start items-center gap-4">
              <label
                htmlFor="allowEBT"
                className="text-sm sm:text-base lg:text-[1.2dvw] font-medium paraFont"
              >
                Allow EBT -
              </label>
              <input
                type="checkbox"
                checked={categoryFields.AllowEBT}
                id="allowEBT"
                onChange={handleOnchange}
                name="AllowEBT"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="w-full flex flex-row justify-start items-center gap-4">
              <label
                htmlFor="discount"
                className="text-sm sm:text-base lg:text-[1.2dvw] font-medium paraFont"
              >
                Do Not Discount -
              </label>
              <input
                type="checkbox"
                checked={categoryFields.DoNotDiscount}
                onChange={handleOnchange}
                name="DoNotDiscount"
                id="discount"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="w-full flex flex-row justify-start items-center gap-4">
              <label
                htmlFor="Webstore"
                className="text-sm sm:text-base lg:text-[1.2dvw] font-medium paraFont"
              >
                Do Not Show to Webstore -
              </label>
              <input
                type="checkbox"
                checked={categoryFields.DoNotShowToWebstore}
                onChange={handleOnchange}
                name="DoNotShowToWebstore"
                id="Webstore"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="w-full flex flex-row justify-start items-center gap-4">
              <label
                htmlFor="dualPrice"
                className="text-sm sm:text-base lg:text-[1.2dvw] font-medium paraFont"
              >
                Exclude Dual Price -
              </label>
              <input
                type="checkbox"
                checked={categoryFields.ExcludeDualPrice}
                onChange={handleOnchange}
                name="ExcludeDualPrice"
                id="dualPrice"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="w-full flex flex-row justify-start items-center gap-4">
              <label
                htmlFor="loyaltyReward"
                className="text-sm sm:text-base lg:text-[1.2dvw] font-medium paraFont"
              >
                Exclude Loyalty Reward -
              </label>
              <input
                type="checkbox"
                checked={categoryFields.ExcludeLoyaltyReward}
                onChange={handleOnchange}
                name="ExcludeLoyaltyReward"
                id="loyaltyReward"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 my-4">
          <button
            className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
            onClick={handleCloseModel}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!categoryFields.CategoryName}
            className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300 disabled:pointer-events-none disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {actionType === "Add" ? "Create" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};
