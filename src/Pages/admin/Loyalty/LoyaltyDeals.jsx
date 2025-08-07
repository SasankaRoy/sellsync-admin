import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { PluseIcon } from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Loading } from "../../../components/UI/Loading/Loading";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { Edit, Trash, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axios-interceptor";
import { useDeboune } from "../../../hooks/useDebounce";

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
    console.log(product, "delete 201");
    setDeleteModel({
      state: true,
      productId: product.ID,
    });
  };

  // Column Definitions: Defines & controls grid columns.
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

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: true,
    };
  }, []);

  return (
    <>
      <Layout>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="h-full flex flex-col gap-6">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-[1.5dvw] font-[500] mainFont">
                  Loyalty Ddeals
                </h3>
                <button
                  onClick={() =>
                    setShowModel({
                      state: true,
                      actionType: "Add",
                      productData: null,
                    })
                  }
                  className="cursor-pointer px-5 py-2 bg-[var(--button-color1)] text-white mainFont rounded-full font-[500] flex justify-center items-center gap-3"
                >
                  <PluseIcon /> Create New Deals
                </button>
              </div>

              <div className="bg-white border border-[var(--border-color)] mt-5 p-5 rounded-md">
                <h3 className="text-[1.3dvw] font-[600] ">Active Deals</h3>
                <div className="h-[70vh] w-full my-5">
                  <div className="h-full w-full">
                    <AgGridReact
                      rowData={rowData}
                      columnDefs={colDefs}
                      // loading={loading}
                      defaultColDef={defaultColDef}
                      pagination={true}
                      rowSelection={rowSelection}
                      onSelectionChanged={(event) =>
                        console.log("Row Selected!")
                      }
                      onCellValueChanged={(event) =>
                        console.log(`New Cell Value: ${event.value}`)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[var(--border-color)] p-5 rounded-md bg-red-500">
                <h3 className="text-[1.3dvw] font-[600] ">Previous Deals</h3>
                <div className="h-[50vh] w-full mt-5">
                  <div className="h-full w-full">
                    <AgGridReact
                      rowData={prevData}
                      columnDefs={colDefs}
                      // loading={loading}
                      defaultColDef={defaultColDef}
                      pagination={true}
                      rowSelection={rowSelection}
                      onSelectionChanged={(event) =>
                        console.log("Row Selected!")
                      }
                      onCellValueChanged={(event) =>
                        console.log(`New Cell Value: ${event.value}`)
                      }
                    />
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
      <div className="w-full flex gap-4 py-2 justify-center items-center">
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleEdit}
        >
          <Edit size={18} />
        </button>

        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleDelete}
        >
          <Trash size={18} />
        </button>
      </div>
    </>
  );
};

const EditAndAddModel = ({ showModel, setShowModel }) => {
  const [itemName, setItemName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState("");
  const [loyaltyData, setLoyaltyData] = useState({
    item_id: "",
    item_name: "",
    promocode: "",
    amount_off: "",
    minimum_quantity: "",
    maximum_quantity: "",
    status: "",
    from_date: "",
    to_date: "",
  });
  const [showItemList, setShowItemList] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoyaltyData({
      ...loyaltyData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log(loyaltyData);
    } catch (error) {
      console.error(error.response.data.message);
    }
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
  }, 2000);

  // genarate promocode
  const generatePromocode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen z-50 bg-[#000]/20 backdrop-blur-xl flex justify-center items-center">
        <div
          onClick={() => setShowItemList(false)}
          className="w-[65%] bg-white rounded-md p-5"
        >
          <div className="rounded-md p-2 bg-[var(--sideMenu-color)] flex justify-between items-center w-full text-white">
            <h2 className="font-[500] text-[1.5dvw] text-[var(--text-color)]">
              {showModel?.actionType} Deals
            </h2>
            <button
              className="cursor-pointer"
              onClick={() => {
                setShowModel({
                  actionType: "",
                  productData: null,
                  status: false,
                });
              }}
            >
              <X size={30} />
            </button>
          </div>

          <div className="my-8 flex flex-col gap-3">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="flex flex-col gap-2 w-full relative">
                <label
                  htmlFor="itemsDeal"
                  className="text-[1dvw] font-normal paraFont"
                >
                  Search Deal Item
                </label>
                <input
                  placeholder="Enter item name..."
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
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
                      <>
                        <p className="text-center mainFont text-gray-400 ">
                          {error}
                        </p>
                      </>
                    )}
                    {isSearching ? (
                      <>
                        <p className="text-center mainFont text-gray-400 animate-pulse duration-200 ease-linear">
                          Searching items...
                        </p>
                      </>
                    ) : (
                      <>
                        {searchResult.length === 0 ? (
                          <>
                            <p className="text-center mainFont text-gray-500 ">
                              No items found...
                            </p>
                          </>
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
                                className="w-full py-3 px-5 cursor-pointer hover:bg-[#000]/15 transition-all duration-200 ease-linear bg-[#000]/5 border-b border-[var(--border-color)] mainFont font-semibold rounded text-start"
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

              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="promoCode"
                  className="text-[1dvw] font-normal paraFont"
                >
                  Promocode
                </label>
                <input
                  id="promoCode"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  type="text"
                  placeholder="Enter code..."
                  value={loyaltyData.promocode}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                  name="promocode"
                />
              </div>

              <div className="flex justify-between items-center w-full gap-5">
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="offAmount"
                    className="text-[1dvw] font-normal paraFont"
                  >
                    Amount Off
                  </label>
                  <input
                    id="offAmount"
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    type="number"
                    placeholder="Enter off amount..."
                    value={loyaltyData.amount_off}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                    name="amount_off"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="minQty"
                    className="text-[1dvw] font-normal paraFont"
                  >
                    Min Quantity
                  </label>
                  <input
                    id="minQty"
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
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

              <div className="flex justify-between items-center w-full gap-5">
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="offAmount"
                    className="text-[1dvw] font-normal paraFont"
                  >
                    Max Quantity
                  </label>
                  <input
                    id="offAmount"
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    type="number"
                    placeholder="Enter max quantity..."
                    value={loyaltyData.maximum_quantity}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                    name="maximum_quantity"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="status"
                    className="text-[1dvw] font-normal paraFont"
                  >
                    Status
                  </label>
                  <select
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
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

              <div className="flex justify-between items-center w-full gap-5">
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="from"
                    className="text-[1dvw] font-normal paraFont"
                  >
                    From
                  </label>
                  <input
                    id="from"
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    type="date"
                    placeholder="Enter max quantity..."
                    value={loyaltyData.from_date}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                    name="from_date"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="to"
                    className="text-[1dvw] font-normal paraFont"
                  >
                    To
                  </label>
                  <input
                    id="to"
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] appearance-none focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    type="date"
                    value={loyaltyData.to_date}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                    name="to_date"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-5 mt-5">
              <button
                onClick={handleSubmit}
                className="px-4 py-1.5 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md"
              >
                Save
              </button>
              <button className="px-4 py-1.5 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
