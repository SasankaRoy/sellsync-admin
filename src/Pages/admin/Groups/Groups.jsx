import React, { useMemo, useState, useEffect, useRef } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import {
  DeleteIcon,
  FilterIcon,
  PluseIcon,
  SortIcon,
} from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { CircleX, Edit, Trash, Plus, Download, X } from "lucide-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios-interceptor";
import { toast } from "react-toastify";

// Temporary inline useDebounce hook (replace with proper import when available)
function useDebounce(callback, delay) {
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
}

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Groups = () => {
  const [rowData, setRowData] = useState([]);
  const [showModel, setShowModel] = useState({
    state: false,
    productData: null,
    actionType: "",
  });

  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
  });

  const queryClient = useQueryClient();

  // Fetch groups data on component mount
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axiosInstance.post("api/v1/group/list", {
          page: 1,
          limit: 10,
        });
        console.log("API Response:", response.data); // Log the full response for debugging
        if (response.status === 200 && response.data?.results?.length > 0) {
          const formattedData = response.data.results.map((group) => {
            // Log all available keys for debugging
            console.log("Group Keys:", Object.keys(group));
            // Try to find any date-related field
            const dateFields = Object.keys(group).filter(key =>
              key.toLowerCase().includes("date") || key.toLowerCase().includes("time") || key.toLowerCase().includes("created")
            );
            let createdAtValue = "";
            if (dateFields.length > 0) {
              createdAtValue = group[dateFields[0]] || ""; // Use the first matching date field
            }
            return {
              ID: group.id || "",
              group_name: group.group_name || "",
              Items: group.items || group.Items || "",
              Status: group.status || group.Status || "",
              CreatedAt: createdAtValue || group.created_at || group.CreatedAt || group.creation_date || group.date_created || group.createdOn || group.createDate || group.timestamp || "", 
              Action: ActionBtns,
            };
          });
          setRowData(formattedData);
          console.log("Formatted Row Data:", formattedData); // Log formatted data for verification
        } else {
          setRowData([]);
          console.log("No results found in API response");
        }
      } catch (error) {
        console.error("Failed to fetch groups:", error);
        setRowData([]);
      }
    };
    fetchGroups();
  }, []);

  const onAddGroup = () => {
    console.log("Create Group button clicked");
    const newState = {
      state: true,
      productData: {
        ID: "",
        GroupName: "",
        ItemName: "",
      },
      actionType: "Add",
    };
    setShowModel(newState);
    console.log("New showModel state:", newState);
  };

  // Add Product handler for Layout component
  const handleAddProduct = () => {
    console.log("Add Product clicked from Layout");
    onAddGroup(); // Trigger the same modal as Create Group
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
    console.log(product, "delete");
    setDeleteModel({
      state: true,
      productId: product.ID,
    });
  };

  const handleImportCSV = () => {
    console.log("Import CSV clicked");
    // Add your import CSV logic here
  };

  const handleExportCSV = () => {
    console.log("Export CSV clicked");
    // Add your export CSV logic here
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "group_name", headerName: "Group Name" },
    { field: "Items" },
    { field: "Status" },
    { field: "CreatedAt" },
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
      <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0 lg:flex-row lg:items-center lg:gap-0 lg:mb-0">
            <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              All Groups
            </h3>
            <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto lg:flex-row lg:w-auto lg:gap-5">
              <button
                onClick={onAddGroup}
                className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
              >
                Create Group <PluseIcon />
              </button>
              <button
                onClick={handleImportCSV}
                className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
              >
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
                  <option>All Groups</option>
                  <option>Beer</option>
                  <option>Wine</option>
                  <option>Spirits</option>
                  <option>Beverages</option>
                  <option>Snacks</option>
                  <option>Tobacco</option>
                </select>
                <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[var(--counterBg-color)] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                  <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                    {rowData.length}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-4 justify-between items-center flex-wrap lg:gap-4">
                <button
                  className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                  onClick={handleExportCSV}
                >
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
      </div>

      {showModel.state && (
        <EditAndAddModel
          productData={showModel.productData || {}}
          setShowModel={setShowModel}
          actionType={showModel.actionType}
          setRowData={setRowData}
          rowData={rowData}
        />
      )}
      {deleteModel.state && deleteModel.productId && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          productId={deleteModel.productId}
          setRowData={setRowData}
          rowData={rowData}
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

const EditAndAddModel = ({ productData = {}, setShowModel, actionType, setRowData, rowData }) => {
  const queryClient = useQueryClient();
  const [groupFields, setGroupFields] = useState([
    {
      id: 1,
      GroupName: productData.group_name || "",
      ItemName: productData.ItemName || "",
      Status: productData.Status || "Active",
      ProductIds: productData.ProductIds || [], // Array to store multiple product IDs
      selectedItems: productData.ProductIds
        ? productData.ProductIds.map((id) => ({ id, name: "Unknown" })) // Placeholder until API data is available
        : [],
    },
  ]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [itemSearch, setItemSearch] = useState("");
  const [showItemList, setShowItemList] = useState(false);

  // Predefined options for dropdowns
  const [groupNameOptions, setGroupNameOptions] = useState([
    "Beer",
    "Wine",
    "Spirits",
    "Beverages",
    "Snacks",
    "Tobacco",
    "Energy Drinks",
    "Mixers",
    "Craft Beer",
    "Premium Spirits",
  ]);

  const [statusOptions] = useState(["Active", "Inactive"]);

  const handleCloseModel = () => {
    setShowModel({
      state: false,
      productData: null,
      actionType: "",
    });
    setItemSearch("");
    setSearchResult([]);
    setShowItemList(false);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFields = groupFields.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setGroupFields(updatedFields);
  };

  // Debounced search for items
  const debounceCallback = useDebounce(async (value, path) => {
    console.log("Searching with value:", value); // Debug log to verify full input
    try {
      const response = await axiosInstance.post(path, {
        page: 1,
        limit: 10,
        search_text: value, // Ensure full text is sent
      });
      if (response.status === 200 && response.data?.results?.length > 0) {
        setIsSearching(false);
        setSearchResult(response.data.results);
        setIsError("");
      } else {
        throw new Error("No products found"); 
      }
    } catch (error) {
      setIsSearching(false);
      setSearchResult([]);
      setIsError(error.message || "Failed to search products");
    }
  }, 800);

  // Mutation for adding a group
  const addGroupMutation = useMutation({
    mutationFn: async (groupData) => {
      const response = await axiosInstance.post("api/v1/group/add", groupData);
      if (response.status === 200 && response.data) {
        return response.data;
      }
      throw new Error(response.data?.message || "Failed to add group");
    },
    onSuccess: (data) => {
      toast.success(data.message || "Group added successfully");
      queryClient.invalidateQueries({ queryKey: ["get_groups_lists"] });
      handleCloseModel();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong, please try again.");
    },
    onSettled: () => {
      setIsSaving(false);
    },
  });

  const handleSubmit = () => {
    if (actionType === "Add") {
      setIsSaving(true);
      const groupData = {
        group_name: groupFields[0].GroupName,
        status: groupFields[0].Status.toLowerCase(),
        productIds: groupFields[0].ProductIds,
      };
      addGroupMutation.mutate(groupData);
    } else if (actionType === "Edit") {
      const updatedRowData = rowData.map((item) =>
        item.ID === productData.ID
          ? { ...item, group_name: groupFields[0].GroupName, Status: groupFields[0].Status }
          : item
      );
      setRowData(updatedRowData);
      handleCloseModel();
    }
  };

  // Handle adding a selected item
  const handleAddItem = (product) => {
    setGroupFields((prev) =>
      prev.map((item, i) =>
        i === 0
          ? {
              ...item,
              ProductIds: [...item.ProductIds, product.id],
              selectedItems: [
                ...item.selectedItems,
                { id: product.id, name: product.name },
              ],
              ItemName: item.selectedItems
                .concat({ id: product.id, name: product.name })
                .map((item) => item.name)
                .join(", "),
            }
          : item
      )
    );
    setItemSearch("");
    setShowItemList(false);
  };

  // Handle removing an item
  const handleRemoveItem = (idToRemove) => {
    setGroupFields((prev) =>
      prev.map((item, i) =>
        i === 0
          ? {
              ...item,
              ProductIds: item.ProductIds.filter((id) => id !== idToRemove),
              selectedItems: item.selectedItems.filter((item) => item.id !== idToRemove),
              ItemName: item.selectedItems
                .filter((item) => item.id !== idToRemove)
                .map((item) => item.name)
                .join(", ") || "",
            }
          : item
      )
    );
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center p-4">
      <div className="bg-white w-full sm:w-[90%] md:w-[60%] lg:w-[50%] max-h-[90vh] min-h-[70vh] overflow-y-auto p-4 sm:p-5 rounded-lg shadow-md">
        <div className="flex justify-between items-center w-full p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
          <h3 className="text-lg sm:text-xl lg:text-[1.5dvw] font-semibold">
            {actionType === "Add" ? "Add Group" : `${actionType} Group`}
          </h3>
          <button
            onClick={handleCloseModel}
            className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
          >
            <CircleX size={24} className="sm:w-[30px] sm:h-[30px]" />
          </button>
        </div>

        <div className="w-full p-2 sm:p-3 space-y-4 sm:space-y-6">
          {groupFields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 relative">
              <div className="grid grid-cols-1 gap-3">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
                    Group Name
                  </label>
                  <input
                    type="text"
                    value={field.GroupName}
                    onChange={(e) => handleFieldChange(index, "GroupName", e.target.value)}
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    placeholder="Enter Group Name"
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
                    Status
                  </label>
                  <select
                    value={field.Status}
                    onChange={(e) => handleFieldChange(index, "Status", e.target.value)}
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full flex flex-col gap-2 relative">
                  <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
                    Item Name
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {groupFields[0].selectedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center bg-[#F3F3F3] text-sm sm:text-base lg:text-[1.1dvw] font-semibold font-[var(--paraFont)] px-2 py-1 rounded-full border border-[#d4d4d4]"
                      >
                        {item.name}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="ml-2 text-[var(--Negative-color)] hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={itemSearch}
                    onChange={(e) => {
                      const value = e.target.value;
                      console.log("Input value:", value); // Debug log to verify full input
                      setItemSearch(value);
                      if (value) {
                        setIsSearching(true);
                        debounceCallback(value, "api/v1/product/list");
                        setShowItemList(true);
                      } else {
                        setShowItemList(false);
                        setSearchResult([]);
                        setIsError("");
                      }
                    }}
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    placeholder="Enter Item Name..."
                  />
                  {showItemList && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-[105%] flex flex-col justify-start gap-1 items-start left-0 w-full bg-white p-3 overflow-y-auto scroll-smooth max-h-[20vh]"
                    >
                      {isError && (
                        <p className="text-center mainFont text-gray-400 text-sm sm:text-base">
                          {isError}
                        </p>
                      )}
                      {isSearching ? (
                        <p className="text-center mainFont text-gray-400 animate-pulse duration-200 ease-linear text-sm sm:text-base">
                          Searching items...
                        </p>
                      ) : (
                        <>
                          {searchResult
                            .filter((product) => !groupFields[0].ProductIds.includes(product.id))
                            .map((product, id) => (
                              <button
                                key={id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddItem(product);
                                }}
                                className="w-full py-2 sm:py-3 px-3 sm:px-5 cursor-pointer hover:bg-[#000]/15 transition-all duration-200 ease-linear bg-[#000]/5 border-b border-[var(--border-color)] mainFont font-semibold rounded text-start text-sm sm:text-base"
                              >
                                {product.name}
                              </button>
                            ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
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
            className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : actionType === "Add" ? "Create" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};