import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { PluseIcon } from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Loading } from "../../../components/UI/Loading/Loading";
import { AgGridReact } from "ag-grid-react";
import { Edit, Trash, X } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axios-interceptor";
import { useDeboune } from "../../../hooks/useDebounce";
import moment from "moment";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";

ModuleRegistry.registerModules([AllCommunityModule]);
const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const LoyaltyDeals = () => {
  const [prevData, setPrevData] = useState([]);
  const {
    data: rowData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get_loyalty_deals"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.post("api/v1/loyalty/deal-list", {
          page: 1,
          limit: 20,
        });
        if (response.status === 200 && response.data) {
          const filterData = response.data.results.filter(
            (item) => item.status === "inactive"
          );
          setPrevData(filterData);
          return response.data.results;
        }
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const [showModel, setShowModel] = useState({
    state: false,
    productData: null,
    actionType: "",
  });
  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
    path: null,
  });

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
  const onView = (product) => {
    console.log(product, "view");
  };
  const onDelete = (product) => {
    setDeleteModel({
      state: true,
      productId: product.id,
      path: `api/v1/loyalty/deal-details/${product.id}`,
    });
  };

  const [colDefs, setColDefs] = useState([
    { field: "id" },
    { field: "item_name" },
    { field: "item_id" },
    { field: "promocode" },
    { field: "from_date" },
    { field: "to_date" },
    { field: "amount_off" },
    { field: "minimum_quantity" },
    { field: "maximum_quantity" },
    { field: "status" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionBtns,
      cellRendererParams: {
        onEdit,
        onView,
        onDelete,
        skinSafe: true,
      },
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: false,
    };
  }, []);

  return (
    <>
      <Layout>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
              <div className="flex flex-col sm:flex-row lg:flex-row justify-between items-start sm:items-center lg:items-center gap-4 mb-6 sm:mb-0 lg:mb-0 p-2 lg:p-2">
                <h3 className="text-2xl md:text-xl lg:font-[500] lg:text-[1.5dvw] font-semibold text-[var(--mainText-color)]">
                  Loyalty Deals
                </h3>
                <div className="w-full sm:w-auto flex justify-center">
                  <button
                    onClick={() =>
                      setShowModel({
                        state: true,
                        actionType: "Add",
                        productData: null,
                      })
                    }
                    className="w-full sm:w-auto flex justify-center items-center gap-2 rounded-full bg-[var(--button-color1)] text-white mainFont px-6 py-3 sm:px-4 sm:py-2 lg:px-5 lg:py-2 cursor-pointer text-base sm:text-sm hover:bg-[#F8A61B] transition-all duration-300"
                  >
                    <PluseIcon className="sm:w-5 sm:h-5" /> Create New Deals
                  </button>
                </div>
              </div>

              <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[80dvh]">
                <div className="flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 lg:px-2.5 lg:py-2 h-full">
                  <h3 className="text-lg sm:text-xl lg:text-[1.3dvw] font-[600] text-[var(--mainText-color)] px-2.5">
                    Active Deals
                  </h3>
                  <div className="h-full w-full overflow-x-scroll overflow-y-auto lg:overflow-visible">
                    <div className="min-w-[800px] lg:min-w-0 h-full">
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
                        className="w-full h-full text-sm lg:text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-[40vh] sm:h-[50vh] lg:h-[50vh]">
                <div className="flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 lg:px-2.5 lg:py-2 h-full">
                  <h3 className="text-lg sm:text-xl lg:text-[1.3dvw] font-[600] text-[var(--mainText-color)] px-2.5">
                    Previous Deals
                  </h3>
                  <div className="h-full w-full overflow-x-scroll overflow-y-auto lg:overflow-visible">
                    <div className="min-w-[800px] lg:min-w-0 h-full">
                      <AgGridReact
                        rowData={prevData}
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
                        suppressClickEdit={true}
                        className="w-full h-full text-sm lg:text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Layout>

      {showModel.state && showModel.actionType === "Add" && (
        <EditAndAddModel showModel={showModel} setShowModel={setShowModel} />
      )}
      {showModel.state &&
        showModel.actionType === "Edit" &&
        showModel.productData !== null && (
          <EditAndAddModel showModel={showModel} setShowModel={setShowModel} />
        )}
      {deleteModel.state && deleteModel.path && deleteModel.productId && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          productId={deleteModel.productId}
          path={deleteModel.path}
        />
      )}
    </>
  );
};

const ActionBtns = (props) => {
  const { onEdit, onView, onDelete } = props;
  const { data } = props;

  const handleEdit = () => {
    onEdit(data);
  };

  const handleView = () => {
    onView(data);
  };
  const handleDelete = () => {
    onDelete(data);
  };

  return (
    <>
      <div className="w-full flex gap-2 sm:gap-4 lg:gap-4 py-2 justify-center items-center">
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1 sm:p-1.5 lg:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleEdit}
        >
          <Edit
            size={16}
            className="sm:w-[18px] sm:h-[18px] lg:w-[18px] lg:h-[18px]"
          />
        </button>

        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1 sm:p-1.5 lg:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleDelete}
        >
          <Trash
            size={16}
            className="sm:w-[18px] sm:h-[18px] lg:w-[18px] lg:h-[18px]"
          />
        </button>
      </div>
    </>
  );
};

const EditAndAddModel = ({ showModel, setShowModel }) => {
  const [itemName, setItemName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const [loyaltyData, setLoyaltyData] = useState({
    item_id: showModel?.productData?.item_id || "",
    item_name: showModel?.productData?.item_name || "",
    promocode: showModel?.productData?.promocode || "",
    amount_off: showModel?.productData?.amount_off || "",
    minimum_quantity: showModel?.productData?.minimum_quantity || "",
    maximum_quantity: showModel?.productData?.maximum_quantity || "",
    status: showModel?.productData?.status || "",
    from_date:
      moment(showModel?.productData?.from_date, "DD.MM.YYYY").format(
        "YYYY-MM-DD"
      ) || "",
    to_date:
      moment(showModel?.productData?.to_date, "DD.MM.YYYY").format(
        "YYYY-MM-DD"
      ) || "",
  });
  const [showItemList, setShowItemList] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoyaltyData({
      ...loyaltyData,
      [name]: value,
    });
  };

  const debounceCallback = useDeboune((data, error) => {
    if (data.length > 0 && error === null) {
      setIsSearching(false);
      setSearchResult([...data]);
      setError("");
      return;
    } else {
      setIsSearching(false);
    }
    if (error) {
      setError(error);
      setSearchResult([]);
      setIsSearching(false);
      return;
    }
  }, 800);

  const generatePromocode = () => {
    const characters = "0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    setLoyaltyData({
      ...loyaltyData,
      promocode: result,
    });
    return result;
  };

  //  for creating new deals...
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const reqSaveLoyaltyDeals = await axiosInstance.post(
        showModel.actionType === "Add"
          ? "api/v1/loyalty/deal-add"
          : `api/v1/loyalty/deal-update/${showModel?.productData?.id}`,
        {
          item_id: loyaltyData.item_id,
          promocode: loyaltyData.promocode,
          from_date: moment(loyaltyData.from_date).format("DD.MM.YYYY"),
          to_date: moment(loyaltyData.to_date).format("DD.MM.YYYY"),
          amount_off: loyaltyData.amount_off,
          minimum_quantity: loyaltyData.minimum_quantity,
          maximum_quantity: loyaltyData.maximum_quantity,
          status: loyaltyData.status,
        }
      );

      if (reqSaveLoyaltyDeals?.status === 200 && reqSaveLoyaltyDeals?.data) {
        queryClient.invalidateQueries({ queryKey: ["get_loyalty_deals"] });
        toast.success(
          reqSaveLoyaltyDeals?.data?.message || "Deal added successfully"
        );
        setShowModel({
          actionType: "",
          productData: null,
          state: false,
        });
      }
    } catch (error) {
      console.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[#000]/20 backdrop-blur-xl z-50">
        <div
          onClick={() => setShowItemList(false)}
          className="bg-white rounded-lg p-3 sm:p-5 w-[95%] max-w-[95%] sm:max-w-[80%] lg:max-w-[65%] shadow mx-4 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center w-full bg-[var(--sideMenu-color)] text-white p-2 sm:p-3 rounded-lg">
            <h2 className="text-lg sm:text-xl lg:text-[1.5dvw] font-[500]">
              {showModel?.actionType} Deals
            </h2>
            <button
              className="cursor-pointer"
              onClick={() => {
                setShowModel({
                  actionType: "",
                  productData: null,
                  state: false,
                });
              }}
            >
              <X size={24} className="sm:w-8 sm:h-8 lg:w-[30px] lg:h-[30px]" />
            </button>
          </div>

          <div className="my-6 sm:my-8 lg:my-10 flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-5 w-full">
              <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
                <label
                  htmlFor="itemsDeal"
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                >
                  Search Deal Item
                </label>
                <div className="relative">
                  <input
                    placeholder="Enter item name..."
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    onChange={(e) => {
                      e.target.value && setIsSearching(true);
                      e.target.value && debounceCallback(e.target.value);
                      setShowItemList(true);
                      setItemName("");
                      handleOnChange(e);
                    }}
                    type="text"
                    name="item_name"
                    value={itemName ? itemName : loyaltyData.item_name}
                  />
                  {showItemList && (
                    <div className="w-full top-[105%] rounded-md flex flex-col justify-start items-start gap-1 max-h-[20vh] left-0 absolute bg-white p-3 overflow-y-auto scroll-smooth">
                      {error && (
                        <p className="text-center mainFont text-gray-400 text-sm sm:text-base">
                          {error}
                        </p>
                      )}
                      {isSearching ? (
                        <p className="text-center mainFont text-gray-400 animate-pulse duration-200 ease-linear text-sm sm:text-base">
                          Searching items...
                        </p>
                      ) : (
                        <>
                          {searchResult.length === 0 ? (
                            <p className="text-center mainFont text-gray-500 text-sm sm:text-base">
                              No items found...
                            </p>
                          ) : (
                            <>
                              {searchResult?.map((cur, id) => (
                                <button
                                  key={id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setItemName(cur.name);
                                    setLoyaltyData({
                                      ...loyaltyData,
                                      item_id: cur.id,
                                      item_name: cur.name,
                                    });
                                  }}
                                  className="w-full py-2 sm:py-3 px-3 sm:px-5 cursor-pointer hover:bg-[#000]/15 transition-all duration-200 ease-linear bg-[#000]/5 border-b border-[var(--border-color)] mainFont font-semibold rounded text-start text-sm sm:text-base"
                                >
                                  {cur.name}
                                </button>
                              ))}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
                <label
                  htmlFor="promoCode"
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                >
                  Promocode
                </label>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-5">
                  <input
                    id="promoCode"
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    type="text"
                    placeholder="Enter code..."
                    value={loyaltyData.promocode}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                    name="promocode"
                  />
                  <button
                    onClick={generatePromocode}
                    className="w-full sm:w-auto shrink-0 bg-[var(--sideMenu-color)] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-md paraFont font-normal cursor-pointer text-sm sm:text-base lg:text-[1.2dvw]"
                  >
                    Generate Code
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-5 w-full">
              <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
                <label
                  htmlFor="offAmount"
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                >
                  Amount Off
                </label>
                <input
                  id="offAmount"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  placeholder="Enter off amount..."
                  value={loyaltyData.amount_off}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                  name="amount_off"
                />
              </div>
              <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
                <label
                  htmlFor="minQty"
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                >
                  Min Quantity
                </label>
                <input
                  id="minQty"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  placeholder="Enter min quantity..."
                  value={loyaltyData.minimum_quantity}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                  name="minimum_quantity"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-5 w-full">
              <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
                <label
                  htmlFor="maxQty"
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                >
                  Max Quantity
                </label>
                <input
                  id="maxQty"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="number"
                  placeholder="Enter max quantity..."
                  value={loyaltyData.maximum_quantity}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                  name="maximum_quantity"
                />
              </div>
              <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
                <label
                  htmlFor="status"
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                >
                  Status
                </label>
                <select
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  id="status"
                  value={loyaltyData.status}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                  name="status"
                >
                  <option>-- Select Status --</option>
                  <option value="active">Active</option>
                  <option value="inactive">In-Active</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-5 w-full">
              <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
                <label
                  htmlFor="from"
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                >
                  From
                </label>
                <input
                  id="from"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="date"
                  placeholder="Enter from date..."
                  value={loyaltyData.from_date}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                  name="from_date"
                />
              </div>
              <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
                <label
                  htmlFor="to"
                  className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                >
                  To
                </label>
                <input
                  id="to"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="date"
                  value={loyaltyData.to_date}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                  name="to_date"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-3 sm:gap-4 mt-5">
              <button
                disabled={isLoading}
                onClick={handleSubmit}
                className="w-full sm:w-auto bg-[var(--button-color5)] text-white px-4 sm:px-5 py-2 sm:py-1.5 rounded-md flex justify-center items-center font-semibold text-sm sm:text-base lg:text-[1.1dvw] cursor-pointer hover:opacity-80 transition-all duration-300 disabled:pointer-events-none disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    {showModel?.actionType === "Edit"
                      ? "Updating..."
                      : "Saving..."}
                  </>
                ) : (
                  <>{showModel?.actionType === "Edit" ? "Update" : "Save"}</>
                )}
              </button>
              <button
                onClick={() => {
                  setShowModel({
                    actionType: "",
                    productData: null,
                    state: false,
                  });
                }}
                className="w-full sm:w-auto bg-[var(--button-color4)] text-white px-4 sm:px-5 py-2 sm:py-1.5 rounded-md flex justify-center items-center font-semibold text-sm sm:text-base lg:text-[1.1dvw] cursor-pointer hover:opacity-80 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
