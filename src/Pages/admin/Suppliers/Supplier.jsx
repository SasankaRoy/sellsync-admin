import React, { useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import {
  DeleteIcon,
  FilterIcon,
  PluseIcon,
  SortIcon,
} from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { CircleX, Edit, Plus, Trash } from "lucide-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode"; // Corrected to match Category.jsx

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Supplier = () => {
  const [rowData, setRowData] = useState([
    {
      ID: "1279",
      SupplierName: "A.B. BEVRAGE INC. (BUDWEISER)",
      Category: "Beer",
      Items: "500",
      Date: "12/05/2025",
      Action: ActionBtns,
    },
    {
      ID: "1280",
      SupplierName: "VINO DISTRIBUTORS",
      Category: "Wine",
      Items: "300",
      Date: "12/06/2025",
      Action: ActionBtns,
    },
    {
      ID: "1281",
      SupplierName: "SPIRIT CO.",
      Category: "Spirits",
      Items: "200",
      Date: "12/07/2025",
      Action: ActionBtns,
    },
    {
      ID: "1282",
      SupplierName: "CRAFT BEER SUPPLY",
      Category: "Beer",
      Items: "400",
      Date: "12/08/2025",
      Action: ActionBtns,
    },
    {
      ID: "1283",
      SupplierName: "PREMIUM LIQUORS",
      Category: "Spirits",
      Items: "250",
      Date: "12/09/2025",
      Action: ActionBtns,
    },
  ]);

  const [showModel, setShowModel] = useState({
    state: false,
    productData: null,
    actionType: "",
  });

  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
  });

  const onAddSupplier = () => {
    console.log("Add Supplier button clicked");
    const newState = {
      state: true,
      productData: {
        ID: "",
        SupplierName: "",
        Category: "",
        Items: "",
        Date: "",
      },
      actionType: "Add",
    };
    setShowModel(newState);
    console.log("New showModel state:", newState);
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

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "ID" },
    { field: "SupplierName" },
    { field: "Category" },
    { field: "Items" },
    { field: "Date" },
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
    <Layout>
      <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
            <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Suppliers List
            </h3>
            <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
              <button
                onClick={onAddSupplier}
                className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
              >
                Add Supplier <PluseIcon />
              </button>
              <button className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
                Export CSV <PluseIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[75vh]">
          <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-full">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
              <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
                <select className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-base">
                  <option>All Categories</option>
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
              <div className="flex gap-2 sm:gap-4 justify-between items-center flex-wrap">
                <button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                  Sort <SortIcon />
                </button>
                <button className="flex justify-between items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                  Filter <FilterIcon />
                </button>
                <button>
                  <DeleteIcon />
                </button>
              </div>
            </div>
            <div className="h-full w-full overflow-x-scroll overflow-y-auto">
              <div className="min-w-[800px] h-full">
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
      </div>
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
  );
};

const EditAndAddModel = ({ productData = {}, setShowModel, actionType, setRowData, rowData }) => {
  const [showNewSupplierInput, setShowNewSupplierInput] = useState(false);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [supplierFields, setSupplierFields] = useState([
    {
      id: 1,
      SupplierName: productData.SupplierName || "",
      Category: productData.Category || "",
      Items: productData.Items || "",
      Date: productData.Date || "",
    },
  ]);

  // Predefined options for dropdowns
  const [supplierOptions, setSupplierOptions] = useState([
    "A.B. BEVRAGE INC. (BUDWEISER)",
    "VINO DISTRIBUTORS",
    "SPIRIT CO.",
    "CRAFT BEER SUPPLY",
    "PREMIUM LIQUORS",
  ]);

  const [categoryOptions, setCategoryOptions] = useState([
    "Beer",
    "Wine",
    "Spirits",
  ]);

  // Items is now a number input, so we don't need predefined options

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const [month, day, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };

  const handleCloseModel = () => {
    setShowModel({
      state: false,
      productData: null,
      actionType: "",
    });
  };

  const handleAddField = () => {
    const newField = {
      id: supplierFields.length + 1,
      SupplierName: "",
      Category: "",
      Items: "",
      Date: "",
    };
    setSupplierFields([...supplierFields, newField]);
  };

  const handleRemoveField = (indexToRemove) => {
    if (supplierFields.length > 1) {
      setSupplierFields(supplierFields.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFields = supplierFields.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setSupplierFields(updatedFields);
  };

  const handleSelectChange = (index, field, value, setter, options) => {
    if (value === "custom") {
      const newValue = prompt(`Enter new ${field}:`);
      if (newValue && newValue.trim()) {
        setter([...options, newValue.trim()]);
        handleFieldChange(index, field, newValue.trim());
      }
    } else {
      handleFieldChange(index, field, value);
    }
  };

  const handleSubmit = () => {
    if (actionType === "Add") {
      const newSuppliers = supplierFields
        .map((field) => ({
          ID: (Math.floor(Math.random() * 9000) + 1000).toString(),
          SupplierName: field.SupplierName,
          Category: field.Category,
          Items: field.Items,
          Date: field.Date,
          Action: ActionBtns,
        }))
        .filter(
          (supplier) =>
            supplier.SupplierName && supplier.Category && supplier.Items && supplier.Date
        );
      setRowData([...rowData, ...newSuppliers]);
    } else if (actionType === "Edit") {
      const updatedRowData = rowData.map((item) =>
        item.ID === productData.ID ? { ...item, ...supplierFields[0] } : item
      );
      setRowData(updatedRowData);
    }
    handleCloseModel();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-md shadow p-4 sm:p-5 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] max-h-[95%] overflow-auto">
        <div className="flex justify-between items-center w-full p-2 sm:p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
          <h3 className="text-lg sm:text-xl lg:text-[1.5dvw] font-semibold">
            {actionType === "Add" ? "Add Suppliers" : `${actionType} Supplier`}
          </h3>
          <button
            onClick={handleCloseModel}
            className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
          >
            <CircleX size={24} className="sm:w-[30px] sm:h-[30px]" />
          </button>
        </div>

        <div className="w-full p-2 sm:p-3 space-y-6">
          {supplierFields.map((field, index) => (
            <div
              key={field.id}
              className="border border-gray-200 rounded-lg p-3 sm:p-4 relative"
            >
              {supplierFields.length > 1 && (
                <button
                  onClick={() => handleRemoveField(index)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                  title="Remove Field Set"
                >
                  <CircleX size={16} />
                </button>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
                    Supplier Name
                  </label>
                  {showNewSupplierInput ? (
                    <div className="relative">
                      <input
                        type="text"
                        value={field.SupplierName}
                        onChange={(e) => handleFieldChange(index, 'SupplierName', e.target.value)}
                        className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                        placeholder="Enter supplier name"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (field.SupplierName.trim()) {
                            setSupplierOptions(prev => [...new Set([...prev, field.SupplierName.trim()])]);
                          }
                          setShowNewSupplierInput(false);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-500 hover:text-blue-700"
                        title="Save new supplier"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <select
                        value={field.SupplierName}
                        onChange={(e) => {
                          if (e.target.value === 'custom') {
                            setShowNewSupplierInput(true);
                            handleFieldChange(index, 'SupplierName', '');
                          } else {
                            handleSelectChange(index, 'SupplierName', e.target.value, setSupplierOptions, supplierOptions);
                          }
                        }}
                        className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 pl-3 pr-8 appearance-none"
                      >
                        <option value="">Select Supplier Name</option>
                        {supplierOptions.map((option, optIndex) => (
                          <option key={optIndex} value={option}>
                            {option}
                          </option>
                        ))}
                        <option value="custom" className="text-blue-500">➕ Add New Supplier</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
                    Category
                  </label>
                  {showNewCategoryInput ? (
                    <div className="relative">
                      <input
                        type="text"
                        value={field.Category}
                        onChange={(e) => handleFieldChange(index, 'Category', e.target.value)}
                        className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                        placeholder="Enter category name"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (field.Category.trim()) {
                            setCategoryOptions(prev => [...new Set([...prev, field.Category.trim()])]);
                          }
                          setShowNewCategoryInput(false);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-500 hover:text-blue-700"
                        title="Save new category"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <select
                        value={field.Category}
                        onChange={(e) => {
                          if (e.target.value === 'custom') {
                            setShowNewCategoryInput(true);
                            handleFieldChange(index, 'Category', '');
                          } else {
                            handleSelectChange(index, 'Category', e.target.value, setCategoryOptions, categoryOptions);
                          }
                        }}
                        className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 pl-3 pr-8 appearance-none"
                      >
                        <option value="">Select Category</option>
                        {categoryOptions.map((option, optIndex) => (
                          <option key={optIndex} value={option}>
                            {option}
                          </option>
                        ))}
                        <option value="custom" className="text-blue-500">➕ Add New Category</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">Items</label>
                  <input
                    type="text"
                    value={field.Items}
                    onChange={(e) => {
                      handleFieldChange(index, 'Items', e.target.value);
                    }}
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    placeholder="Enter items"
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">Date</label>
                  <input
                    type="date"
                    value={formatDateForInput(field.Date)}
                    onChange={(e) => {
                      const formattedDate = formatDateForDisplay(e.target.value);
                      handleFieldChange(index, 'Date', formattedDate);
                    }}
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-6">
          <button
            className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
            onClick={handleCloseModel}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
          >
            {actionType === "Add" ? "Create" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};