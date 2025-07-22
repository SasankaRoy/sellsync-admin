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
    { key: "1", ID: "1279", ExpenseType: "Office Supplies", DueDate: "2025-07-29", Description: "Expense purchase", InvoiceImage: "N/A", AmountType: "Cash" },
    { key: "2", ID: "1280", ExpenseType: "Utilities", DueDate: "2025-07-29", Description: "Expense purchase", InvoiceImage: "N/A", AmountType: "Credit Card" },
    { key: "3", ID: "1281", ExpenseType: "Travel", DueDate: "2025-07-29", Description: "Expense purchase", InvoiceImage: "N/A", AmountType: "Bank Transfer" },
    { key: "4", ID: "1282", ExpenseType: "Marketing", DueDate: "2025-07-29", Description: "Expense purchase", InvoiceImage: "N/A", AmountType: "Check" },
    { key: "5", ID: "1283", ExpenseType: "Equipment", DueDate: "2025-07-29", Description: "Expense purchase", InvoiceImage: "N/A", AmountType: "Cash" },
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
  });
  const [showNewExpenseTypeInput, setShowNewExpenseTypeInput] = useState(false);
  const [expenseTypeOptions, setExpenseTypeOptions] = useState([
    "Office Supplies",
    "Utilities",
    "Travel",
    "Marketing",
    "Equipment"
  ]);

  // Update formData when expenseData prop changes
  React.useEffect(() => {
    if (expenseData) {
      setFormData(expenseData);
    }
  }, [expenseData]);

  const handleCloseModel = () => {
    setShowModel({
      state: false,
      expenseData: null,
      actionType: "",
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
                Invoice Image
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="file"
                accept="image/*"
                onChange={(e) => handleInputChange("InvoiceImage", e.target.files[0]?.name || "N/A")}
              />
            </div>
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