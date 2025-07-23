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
import { CircleX, Edit, Eye, Trash } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

// ActionBtns component defined first to avoid reference issues
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
    <div className="w-full flex gap-4 py-2 justify-center items-center">
      <button
        className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1.5 rounded-full border-none cursor-pointer"
        onClick={handleEdit}
      >
        <Edit size={18} />
      </button>
      <button
        className="font-semibold font-[var(--paraFont)] bg-[var(--button-color5)] text-white p-1.5 rounded-full border-none cursor-pointer"
        onClick={handleView}
      >
        <Eye size={18} />
      </button>
      <button
        className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1.5 rounded-full border-none cursor-pointer"
        onClick={handleDelete}
      >
        <Trash size={18} />
      </button>
    </div>
  );
};

export const ExpenseList = () => {
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [rowData, setRowData] = useState([
    { key: "1", ID: "1279", ExpenseType: "Office Supplies", DueDate: "2025-07-29", Description: "Expense purchase", InvoiceImage: "N/A", AmountType: "Cash", Amount: 0 },
    { key: "2", ID: "1280", ExpenseType: "Utilities", DueDate: "2025-07-29", Description: "Expense purchase", InvoiceImage: "N/A", AmountType: "Credit Card", Amount: 0 },
    { key: "3", ID: "1281", ExpenseType: "Travel", DueDate: "2025-07-29", Description: "Expense purchase", InvoiceImage: "N/A", AmountType: "Bank Transfer", Amount: 0 },
    { key: "4", ID: "1282", ExpenseType: "Marketing", DueDate: "2025-07-29", Description: "Expense purchase", InvoiceImage: "N/A", AmountType: "Check", Amount: 0 },
    { key: "5", ID: "1283", ExpenseType: "Equipment", DueDate: "2025-07-29", Description: "Expense purchase", InvoiceImage: "N/A", AmountType: "Cash", Amount: 0 },
  ]);

  const [showModel, setShowModel] = useState({
    state: false,
    expenseData: null,
    actionType: "",
  });
  const [deleteModel, setDeleteModel] = useState({
    state: false,
    expenseId: null,
  });

  const onAddExpense = () => {
    setShowModel({
      state: true,
      expenseData: {
        ID: "",
        ExpenseType: "",
        DueDate: "",
        Description: "",
        InvoiceImage: "",
        AmountType: "",
        Amount: 0,
      },
      actionType: "Add",
    });
  };

  const onEdit = (expense) => {
    if (expense) {
      setShowModel({
        state: true,
        expenseData: expense,
        actionType: "Edit",
      });
    }
  };

  const onView = (expense) => {
    console.log(expense, "view");
  };

  const onDelete = (expense) => {
    setDeleteModel({
      state: true,
      expenseId: expense.ID,
    });
  };

  // Toolbar edit function - opens edit modal directly with empty data
  const handleToolbarEdit = () => {
    setShowModel({
      state: true,
      expenseData: {
        ID: "",
        ExpenseType: "",
        DueDate: "",
        Description: "",
        InvoiceImage: "",
        AmountType: "",
        Amount: 0,
      },
      actionType: "Edit",
    });
  };

  const [colDefs, setColDefs] = useState([
    { field: "ID" },
    { field: "ExpenseType", headerName: "Expense Type", width: 150 },
    { field: "DueDate", headerName: "Due date", width: 120 },
    { field: "Description", headerName: "Description", width: 200 },
    { field: "InvoiceImage", headerName: "Invoice Image", width: 150 },
    { field: "AmountType", headerName: "Amount Type", width: 120 },
    { field: "Amount", headerName: "Amount", width: 120 },
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
      editable: true,
    };
  }, []);

  return (
    <>
      <Layout>
        <div className="flex justify-between items-center">
          <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
            Expense List
          </h3>
          <div className="flex justify-center items-center gap-5">
            <button
              onClick={onAddExpense}
              className="px-5 py-1.5 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-4 text-white mainFont font-[500] cursor-pointer text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
            >
              Add Expense <PluseIcon />
            </button>
            <button className="px-5 py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-4 text-white mainFont font-[500] cursor-pointer text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
              Export CSV <PluseIcon />
            </button>
          </div>
        </div>
        <div className="w-full h-[75vh]">
          <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-full">
            <div className="flex justify-between items-center py-1.5 shrink-0">
              <div className="flex justify-center items-center gap-3">
                <select className="font-[500] mainFont px-4 border-none outline-none">
                  <option>All Expenses</option>
                  <option>Office Supplies</option>
                  <option>Utilities</option>
                  <option>Travel</option>
                  <option>Marketing</option>
                  <option>Equipment</option>
                </select>
                <p className="px-3 text-[1dvw] py-.5 bg-[#F8A61B] rounded-2xl font-[500] border-none text-white">
                  {rowData.length}
                </p>
              </div>
              <div className="flex gap-4 justify-center items-center">
                <button
                  onClick={handleToolbarEdit}
                  className="flex justify-center items-center gap-2 px-4 py-1 text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC] hover:bg-[#003d99] transition-all duration-300"
                >
                  <Edit size={16} /> Edit
                </button>
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
                onSelectionChanged={(event) => {
                  const selectedNodes = event.api.getSelectedNodes();
                  setSelectedRowData(selectedNodes.map((node) => node.data));
                  console.log("Selected data:", selectedNodes.map((node) => node.data));
                }}
                onCellValueChanged={(event) =>
                  console.log(`New Cell Value: ${event.value}`)
                }
                getRowId={(params) => params.data.key}
              />
            </div>
          </div>
        </div>
      </Layout>

      {showModel.state && showModel.expenseData && (
        <AddExpenseModal
          expenseData={showModel.expenseData}
          setShowModel={setShowModel}
          actionType={showModel.actionType}
          setRowData={setRowData}
          rowData={rowData}
        />
      )}
      {deleteModel.state && deleteModel.expenseId && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          expenseId={deleteModel.expenseId}
        />
      )}
    </>
  );
};

const AddExpenseModal = ({ expenseData, setShowModel, actionType, setRowData, rowData }) => {
  const [formData, setFormData] = useState(expenseData || {
    ID: "",
    ExpenseType: "",
    DueDate: "",
    Description: "",
    InvoiceImage: "",
    AmountType: "",
    Amount: 0,
  });
  const [showNewExpenseTypeInput, setShowNewExpenseTypeInput] = useState(false);
  const [expenseTypeOptions, setExpenseTypeOptions] = useState([
    "Office Supplies",
    "Utilities",
    "Travel",
    "Marketing",
    "Equipment"
  ]);
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Update formData when expenseData prop changes
  React.useEffect(() => {
    if (expenseData) {
      setFormData(expenseData);
      setImagePreview(null); // Reset preview on data change
    }
  }, [expenseData]);

  const handleCloseModel = () => {
    setShowModel({
      state: false,
      expenseData: null,
      actionType: "",
    });
    setImagePreview(null); // Clear preview on modal close
  };

  const handleInputChange = (field, value) => {
    if (field === "Amount") {
      const numericValue = value ? Number(value) : 0;
      if (!isNaN(numericValue)) {
        setFormData((prev) => ({ ...prev, [field]: numericValue }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Handle file upload
  const handleFileUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      handleInputChange("InvoiceImage", file.name);
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      console.log("File uploaded:", file.name);
    } else {
      alert("Please select a valid image file");
    }
  };

  // Handle remove image
  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    handleInputChange("InvoiceImage", "");
    document.getElementById('file-input').value = null; // Reset file input
  };

  // Clean up preview URL to prevent memory leaks
  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (actionType === "Add") {
      const newExpense = {
        key: (rowData.length + 1).toString(),
        ID: formData.ID || `${1283 + rowData.length}`,
        ExpenseType: formData.ExpenseType,
        DueDate: formData.DueDate,
        Description: formData.Description,
        InvoiceImage: formData.InvoiceImage || "N/A",
        AmountType: formData.AmountType,
        Amount: formData.Amount,
      };
      setRowData([...rowData, newExpense]);
    } else if (actionType === "Edit") {
      const updatedRowData = rowData.map(item => 
        item.ID === formData.ID 
          ? { ...item, ...formData }
          : item
      );
      setRowData(updatedRowData);
    }
    handleCloseModel();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
      <div className="bg-white rounded-md shadow p-5 w-[60%] max-h-[95%] overflow-auto">
        <div className="w-full bg-[var(--sideMenu-color)] flex justify-between items-center px-3 py-1.5 text-white rounded-md">
          <h3 className="font-semibold text-[1.8dvw]">
            {actionType === "Add" ? "Add Expense" : `${actionType} Expense`}
          </h3>
          <button
            onClick={handleCloseModel}
            className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
          >
            <CircleX size={30} />
          </button>
        </div>

        <div className="w-full p-4 mt-4">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="w-full flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">
                Expense ID
                <span className="text-[.9dvw] text-[var(--Negative-color)]">*</span>
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter Expense ID"
                value={formData.ID}
                onChange={(e) => handleInputChange("ID", e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">
                Expense Type
                <span className="text-[.9dvw] text-[var(--Negative-color)]">*</span>
              </label>
              {showNewExpenseTypeInput ? (
                <div className="relative">
                  <input
                    type="text"
                    value={formData.ExpenseType}
                    onChange={(e) => handleInputChange("ExpenseType", e.target.value)}
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    placeholder="Enter new expense type"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.ExpenseType.trim()) {
                        setExpenseTypeOptions(prev => [...new Set([...prev, formData.ExpenseType.trim()])]);
                      }
                      setShowNewExpenseTypeInput(false);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-500 hover:text-blue-700"
                    title="Save new expense type"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <select
                    value={formData.ExpenseType}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setShowNewExpenseTypeInput(true);
                        handleInputChange("ExpenseType", "");
                      } else {
                        handleInputChange("ExpenseType", e.target.value);
                      }
                    }}
                    className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 pl-3 pr-8 appearance-none"
                  >
                    <option value="">Select Expense Type</option>
                    {expenseTypeOptions.map((option, optIndex) => (
                      <option key={optIndex} value={option}>{option}</option>
                    ))}
                    <option value="custom" className="text-blue-500">➕ Add New Expense Type</option>
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

          <div className="w-full flex flex-col gap-2 mt-4">
            <label className="text-[1dvw] font-normal paraFont">
              Due Date
              <span className="text-[.9dvw] text-[var(--Negative-color)]">*</span>
            </label>
            <input
              className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              type="date"
              value={formData.DueDate}
              onChange={(e) => handleInputChange("DueDate", e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-2 mt-4">
            <label className="text-[1dvw] font-normal paraFont">
              Description
              <span className="text-[.9dvw] text-[var(--Negative-color)]">*</span>
            </label>
            <textarea
              className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              rows="4"
              placeholder="Enter Description"
              value={formData.Description}
              onChange={(e) => handleInputChange("Description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full mt-4">
            <div className="w-full flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">
                Amount Type
                <span className="text-[.9dvw] text-[var(--Negative-color)]">*</span>
              </label>
              <select
                className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                value={formData.AmountType}
                onChange={(e) => handleInputChange("AmountType", e.target.value)}
              >
                <option value="">Select Amount Type</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Check">Check</option>
              </select>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-[1dvw] font-normal paraFont">
                Amount
                <span className="text-[.9dvw] text-[var(--Negative-color)]">*</span>
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="number"
                placeholder="Enter Amount"
                value={formData.Amount}
                onChange={(e) => handleInputChange("Amount", e.target.value)}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 mt-4">
            <label className="text-[1dvw] font-normal paraFont">
              Invoice Image
            </label>
            <div 
              className={`w-full border-2 border-dashed rounded-lg p-4 transition-colors duration-300 cursor-pointer ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
              } ${actionType === "View" ? 'opacity-50 pointer-events-none' : ''}`}
              onDragEnter={actionType !== "View" ? handleDrag : undefined}
              onDragLeave={actionType !== "View" ? handleDrag : undefined}
              onDragOver={actionType !== "View" ? handleDrag : undefined}
              onDrop={actionType !== "View" ? handleDrop : undefined}
              onClick={actionType !== "View" ? () => document.getElementById('file-input').click() : undefined}
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      {dragActive ? "Drop file here" : "Upload images"}
                    </p>
                  </div>
                </div>
                {formData.InvoiceImage && formData.InvoiceImage !== "N/A" && imagePreview && (
                  <div className="relative flex items-center space-x-2">
                    <img
                      src={imagePreview}
                      alt="Invoice preview"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    {actionType !== "View" && (
                      <button
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-[var(--Negative-color)] text-white rounded-full p-1 hover:bg-red-700 transition-all duration-300"
                        title="Remove image"
                      >
                        <CircleX size={16} />
                      </button>
                    )}
                  </div>
                )}
              </div>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInputChange}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end items-center mt-6">
            <button 
              onClick={handleSubmit}
              className="px-6 py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
            >
              {actionType === "Add" ? "Create" : "Update"}
            </button>
            <button 
              onClick={handleCloseModel}
              className="px-6 py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteModel = ({ setDeleteModel, expenseId }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
        <div className="w-[50%] p-5 bg-white rounded-xl shadow-md flex flex-col gap-4">
          <div className="flex justify-between items-center w-full p-1">
            <h3 className="text-[1.5dvw] font-semibold">Delete Expense</h3>
            <button
              onClick={() => {
                setDeleteModel({
                  state: false,
                  expenseId: null,
                });
              }}
              className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
            >
              <CircleX size={30} />
            </button>
          </div>
          <p className="text-[1.2dvw] font-semibold font-[var(--paraFont)]">
            Expense ID <span className="italic">"{expenseId}"</span> will be{" "}
            <span className="text-[var(--Negative-color)] font-bold font-[var(--paraFont)] text-[1.3dvw]">
              Removed
            </span>{" "}
            from the Records.
          </p>
          <div className="flex justify-end items-center gap-4">
            <button
              onClick={() => {
                setDeleteModel({
                  state: false,
                  expenseId: null,
                });
              }}
              className="bg-[var(--button-color4)] text-white px-5 py-1.5 rounded-md flex justify-center items-center font-semibold text-[1.1dvw] cursor-pointer"
            >
              Cancel
            </button>
            <button className="bg-[var(--Negative-color)] text-white px-5 py-1.5 rounded-md flex justify-center items-center font-semibold text-[1.1dvw] cursor-pointer">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};