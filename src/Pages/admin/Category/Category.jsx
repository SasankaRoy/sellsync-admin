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
import { CircleX, Edit, Trash, Plus } from "lucide-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Category = () => {
  const [rowData, setRowData] = useState([
    {
      ID: "1279",
      CategoryName: "AW ROOR BEER 2LITER BTL",
      Group: "Beer",
      Stock: "-8",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1280",
      CategoryName: "RED WINE BOTTLE 750ML",
      Group: "Wine",
      Stock: "15",
      Supplier: "John Smith",
      Action: ActionBtns,
    },
    {
      ID: "1281",
      CategoryName: "WHISKEY PREMIUM 1LITER",
      Group: "Spirits",
      Stock: "5",
      Supplier: "Mike Johnson",
      Action: ActionBtns,
    },
    {
      ID: "1282",
      CategoryName: "VODKA CLASSIC 750ML",
      Group: "Spirits",
      Stock: "12",
      Supplier: "Sarah Wilson",
      Action: ActionBtns,
    },
    {
      ID: "1283",
      CategoryName: "CHAMPAGNE BOTTLE 750ML",
      Group: "Wine",
      Stock: "8",
      Supplier: "David Brown",
      Action: ActionBtns,
    },
    {
      ID: "1284",
      CategoryName: "CRAFT BEER 330ML CAN",
      Group: "Beer",
      Stock: "25",
      Supplier: "Rahul Doe",
      Action: ActionBtns,
    },
    {
      ID: "1285",
      CategoryName: "RUM GOLD 1LITER",
      Group: "Spirits",
      Stock: "7",
      Supplier: "Lisa Davis",
      Action: ActionBtns,
    },
    {
      ID: "1286",
      CategoryName: "WHITE WINE 750ML",
      Group: "Wine",
      Stock: "18",
      Supplier: "John Smith",
      Action: ActionBtns,
    },
    {
      ID: "1287",
      CategoryName: "LAGER BEER 500ML BTL",
      Group: "Beer",
      Stock: "30",
      Supplier: "Mike Johnson",
      Action: ActionBtns,
    },
    {
      ID: "1288",
      CategoryName: "TEQUILA SILVER 750ML",
      Group: "Spirits",
      Stock: "4",
      Supplier: "Sarah Wilson",
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

  const onAddCategory = () => {
    console.log("Create Category button clicked");
    const newState = {
      state: true,
      productData: {
        ID: "",
        CategoryName: "",
        Group: "",
        Stock: "",
        Supplier: "",
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
    console.log(product, "delete");
    setDeleteModel({
      state: true,
      productId: product.ID,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "ID" },
    { field: "CategoryName" },
    { field: "Group" },
    { field: "Stock" },
    { field: "Supplier" },
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
      editable: true,
    };
  }, []);

  return (
    <Layout onAddProduct={handleAddProduct}>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
            Categories List
          </h3>
          <div className="flex justify-center items-center gap-5">
            <button
              onClick={onAddCategory}
              className="px-5 py-1.5 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-4 text-white mainFont font-[500] cursor-pointer text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
            >
              Create Category <PluseIcon />
            </button>
            <button className="px-5 py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-4 text-white mainFont font-[500] cursor-pointer text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
              import CVS <PluseIcon />
            </button>
          </div>
        </div>

        <div className="w-full h-[75vh] ">
          <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-full">
            <div className="flex justify-between items-center py-1.5 shrink-0">
              <div className="flex justify-center items-center gap-3">
                <select className="font-[500] mainFont px-4 border-none outline-none">
                  <option>All Category</option>
                  <option>Beer</option>
                  <option>Wine</option>
                  <option>Spirits</option>
                </select>
                <p className="px-3 text-[1dvw] py-.5 bg-[#F8A61B] rounded-2xl font-[500] border-none text-white">
                  {rowData.length}
                </p>
              </div>
              <div className="flex gap-4 justify-center items-center">
                <button className="flex justify-center items-center gap-2 px-4 py-1 text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                  Sort <SortIcon />
                </button>
                <button className="flex justify-center items-center gap-2 px-4 py-1 text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                  Filter <FilterIcon />
                </button>
                <button>
                  <DeleteIcon />
                </button>
              </div>
            </div>
            <div className="h-full w-full">
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

const EditAndAddModel = ({ productData = {}, setShowModel, actionType, setRowData, rowData }) => {
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [showNewSupplierInput, setShowNewSupplierInput] = useState(false);
  const [categoryFields, setCategoryFields] = useState([
    {
      id: 1,
      CategoryName: productData.CategoryName || "",
      Group: productData.Group || "",
      Stock: productData.Stock || "",
      Supplier: productData.Supplier || "",
    }
  ]);

  // Predefined options for dropdowns
  const [categoryOptions, setCategoryOptions] = useState([
    "AW ROOR BEER 2LITER BTL",
    "RED WINE BOTTLE 750ML", 
    "WHISKEY PREMIUM 1LITER",
    "VODKA CLASSIC 750ML",
    "CHAMPAGNE BOTTLE 750ML",
    "CRAFT BEER 330ML CAN",
    "RUM GOLD 1LITER",
    "WHITE WINE 750ML",
    "LAGER BEER 500ML BTL",
    "TEQUILA SILVER 750ML"
  ]);

  const [groupOptions, setGroupOptions] = useState([
    "Beer",
    "Wine", 
    "Spirits",
    "Beverages",
    "Alcohol"
  ]);

  const [stockOptions, setStockOptions] = useState([
    "0", "5", "8", "10", "12", "15", "18", "20", "25", "30", "-8", "-5"
  ]);

  const [supplierOptions, setSupplierOptions] = useState([
    "Rahul Doe",
    "John Smith",
    "Mike Johnson", 
    "Sarah Wilson",
    "David Brown",
    "Lisa Davis"
  ]);

  const handleCloseModel = () => {
    setShowModel({
      state: false,
      productData: null,
      actionType: "",
    });
  };

  const handleAddField = () => {
    const newField = {
      id: categoryFields.length + 1,
      CategoryName: "",
      Group: "",
      Stock: "",
      Supplier: "",
    };
    setCategoryFields([...categoryFields, newField]);
  };

  const handleRemoveField = (indexToRemove) => {
    if (categoryFields.length > 1) {
      setCategoryFields(categoryFields.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFields = categoryFields.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setCategoryFields(updatedFields);
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
      const newCategories = categoryFields.map(field => ({
        ID: (Math.floor(Math.random() * 9000) + 1000).toString(),
        CategoryName: field.CategoryName,
        Group: field.Group,
        Stock: field.Stock,
        Supplier: field.Supplier,
        Action: ActionBtns,
      })).filter(category => category.CategoryName && category.Group && category.Stock && category.Supplier);
      
      setRowData([...rowData, ...newCategories]);
    } else if (actionType === "Edit") {
      const updatedRowData = rowData.map(item => 
        item.ID === productData.ID 
          ? { ...item, ...categoryFields[0] }
          : item
      );
      setRowData(updatedRowData);
    }
    handleCloseModel();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
      <div className="bg-white w-[70%] max-h-[90vh] overflow-y-auto p-5 rounded-lg shadow-md">
        <div className="flex justify-between items-center w-full p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
          <h3 className="text-[1.5dvw] font-semibold">
            {actionType === "Add" ? "Add Category" : `${actionType} Category`}
          </h3>
          <button
            onClick={handleCloseModel}
            className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
          >
            <CircleX size={30} />
          </button>
        </div>

        <div className="w-full p-3 space-y-6">
          {categoryFields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4 relative">
              {categoryFields.length > 1 && (
                <button
                  onClick={() => handleRemoveField(index)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                  title="Remove Field Set"
                >
                  <CircleX size={16} />
                </button>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-[1dvw] font-normal paraFont">
                    Category Name
                  </label>
                  {showNewCategoryInput ? (
                    <div className="relative">
                      <input
                        type="text"
                        value={field.CategoryName}
                        onChange={(e) => handleFieldChange(index, 'CategoryName', e.target.value)}
                        className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                        placeholder="Enter new category name"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (field.CategoryName.trim()) {
                            setCategoryOptions(prev => [...new Set([...prev, field.CategoryName.trim()])]);
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
                      <div className="relative">
                        <select
                          value={field.CategoryName}
                          onChange={(e) => {
                            if (e.target.value === 'custom') {
                              setShowNewCategoryInput(true);
                              handleFieldChange(index, 'CategoryName', '');
                            } else {
                              handleSelectChange(index, 'CategoryName', e.target.value, setCategoryOptions, categoryOptions);
                            }
                          }}
                          className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 pl-3 pr-8 appearance-none"
                        >
                          <option value="">Select Category Name</option>
                          {categoryOptions.map((option, optIndex) => (
                            <option key={optIndex} value={option}>{option}</option>
                          ))}
                          <option value="custom" className="text-blue-500">➕ Add New Category</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="w-full flex flex-col gap-2">
                  <label className="text-[1dvw] font-normal paraFont">Group</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={field.Group}
                      onChange={(e) => handleFieldChange(index, 'Group', e.target.value)}
                      className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                      placeholder="Enter Group Name"
                    />
                    {!groupOptions.includes(field.Group) && field.Group && (
                      <button
                        type="button"
                        onClick={() => setGroupOptions([...groupOptions, field.Group])}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-500 hover:text-blue-700"
                        title="Add to group options"
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="w-full flex flex-col gap-2">
                  <label className="text-[1dvw] font-normal paraFont">Stock</label>
                  <input
                    type="number"
                    value={field.Stock}
                    onChange={(e) => handleFieldChange(index, 'Stock', e.target.value)}
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    placeholder="Enter stock quantity"
                    step="1"
                  />
                </div>
                
                <div className="w-full flex flex-col gap-2">
                  <label className="text-[1dvw] font-normal paraFont">
                    Supplier
                  </label>
                  {showNewSupplierInput ? (
                    <div className="relative">
                      <input
                        type="text"
                        value={field.Supplier}
                        onChange={(e) => handleFieldChange(index, 'Supplier', e.target.value)}
                        className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                        placeholder="Enter new supplier name"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (field.Supplier.trim()) {
                            setSupplierOptions(prev => [...new Set([...prev, field.Supplier.trim()])]);
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
                        value={field.Supplier}
                        onChange={(e) => {
                          if (e.target.value === 'custom') {
                            setShowNewSupplierInput(true);
                            handleFieldChange(index, 'Supplier', '');
                          } else {
                            handleSelectChange(index, 'Supplier', e.target.value, setSupplierOptions, supplierOptions);
                          }
                        }}
                        className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 pl-3 pr-8 appearance-none"
                      >
                        <option value="">Select Supplier</option>
                        {supplierOptions.map((option, optIndex) => (
                          <option key={optIndex} value={option}>{option}</option>
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
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end items-center gap-5 my-4">
          <button
            className="px-5 py-1 rounded-md cursor-pointer text-white font-semibold bg-[var(--button-color4)] text-[1.2dvw] hover:opacity-80 transition-all duration-300"
            onClick={handleCloseModel}
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-5 py-1 rounded-md cursor-pointer text-white font-semibold bg-[var(--button-color5)] text-[1.2dvw] hover:opacity-80 transition-all duration-300"
          >
            {actionType === "Add" ? "Create" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};