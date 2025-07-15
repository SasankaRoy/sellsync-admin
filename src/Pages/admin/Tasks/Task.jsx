import React, { useState, useMemo } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Plus, X } from "lucide-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { CircleX, Edit, Trash } from "lucide-react";
import { DeleteIcon, FilterIcon, SortIcon } from "../../../assets/Svgs/AllSvgs";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Task = () => {
  const [newTask, setNewTask] = useState(false);
  const [deleteModel, setDeleteModel] = useState({
    status: false,
    productData: null,
  });
  const [editModel, setEditModel] = useState({
    status: false,
    productData: null,
    forStatus: null,
  });
  const [rowData, setRowData] = useState([
    {
      TaskID: "665e9c1e9f4f123456789def",
      EmployeeName: "Sohil Sen",
      TaskTitle: "Dummy Task",
      Description: "Test task description",
      AssignedDate: "20.02.2025",
      DeadLine: "22.02.2025",
      PhoneNumber: "9990124321",
      AssignedBy: "Admin",
      Status: "Ongoing",
      Action: ActionBtns,
    },
    {
      TaskID: "665e9c1e9f4f123456789def",
      EmployeeName: "Sohil Sen",
      TaskTitle: "Dummy Task",
      Description: "Test task description",
      AssignedDate: "20.02.2025",
      DeadLine: "22.02.2025",
      PhoneNumber: "9990124321",
      AssignedBy: "Admin",
      Status: "Ongoing",
      Action: ActionBtns,
    },
    {
      TaskID: "665e9c1e9f4f123456789def",
      EmployeeName: "Sohil Sen",
      TaskTitle: "Dummy Task",
      Description: "Test task description",
      AssignedDate: "20.02.2025",
      DeadLine: "22.02.2025",
      PhoneNumber: "9990124321",
      AssignedBy: "Admin",
      Status: "Ongoing",
      Action: ActionBtns,
    },
    {
      TaskID: "665e9c1e9f4f123456789def",
      EmployeeName: "Sohil Sen",
      TaskTitle: "Dummy Task",
      Description: "Test task description",
      AssignedDate: "20.02.2025",
      DeadLine: "22.02.2025",
      PhoneNumber: "9990124321",
      AssignedBy: "Admin",
      Status: "Ongoing",
      Action: ActionBtns,
    },
    {
      TaskID: "665e9c1e9f4f123456789def",
      EmployeeName: "Sohil Sen",
      TaskTitle: "Dummy Task",
      Description: "Test task description",
      AssignedDate: "20.02.2025",
      DeadLine: "22.02.2025",
      PhoneNumber: "9990124321",
      AssignedBy: "Admin",
      Status: "Ongoing",
      Action: ActionBtns,
    },
    {
      TaskID: "665e9c1e9f4f123456789def",
      EmployeeName: "Sohil Sen",
      TaskTitle: "Dummy Task",
      Description: "Test task description",
      AssignedDate: "20.02.2025",
      DeadLine: "22.02.2025",
      PhoneNumber: "9990124321",
      AssignedBy: "Admin",
      Status: "Ongoing",
      Action: ActionBtns,
    },
    {
      TaskID: "665e9c1e9f4f123456789def",
      EmployeeName: "Sohil Sen",
      TaskTitle: "Dummy Task",
      Description: "Test task description",
      AssignedDate: "20.02.2025",
      DeadLine: "22.02.2025",
      PhoneNumber: "9990124321",
      AssignedBy: "Admin",
      Status: "Ongoing",
      Action: ActionBtns,
    },
    {
      TaskID: "665e9c1e9f4f123456789def",
      EmployeeName: "Sohil Sen",
      TaskTitle: "Dummy Task",
      Description: "Test task description",
      AssignedDate: "20.02.2025",
      DeadLine: "22.02.2025",
      PhoneNumber: "9990124321",
      AssignedBy: "Admin",
      Status: "Ongoing",
      Action: ActionBtns,
    },
    {
      TaskID: "665e9c1e9f4f123456789def",
      EmployeeName: "Sohil Sen",
      TaskTitle: "Dummy Task",
      Description: "Test task description",
      AssignedDate: "20.02.2025",
      DeadLine: "22.02.2025",
      PhoneNumber: "9990124321",
      AssignedBy: "Admin",
      Status: "Ongoing",
      Action: ActionBtns,
    },
    {
      TaskID: "665e9c1e9f4f123456789def",
      EmployeeName: "Sohil Sen",
      TaskTitle: "Dummy Task",
      Description: "Test task description",
      AssignedDate: "20.02.2025",
      DeadLine: "22.02.2025",
      PhoneNumber: "9990124321",
      AssignedBy: "Admin",
      Status: "Ongoing",
      Action: ActionBtns,
    },
    {
      TaskID: "665e9c1e9f4f123456789def",
      EmployeeName: "Sohil Sen",
      TaskTitle: "Dummy Task",
      Description: "Test task description",
      AssignedDate: "20.02.2025",
      DeadLine: "22.02.2025",
      PhoneNumber: "9990124321",
      AssignedBy: "Admin",
      Status: "Ongoing",
      Action: ActionBtns,
    },
    {
      TaskID: "665e9c1e9f4f123456789def",
      EmployeeName: "Sohil Sen",
      TaskTitle: "Dummy Task",
      Description: "Test task description",
      AssignedDate: "20.02.2025",
      DeadLine: "22.02.2025",
      PhoneNumber: "9990124321",
      AssignedBy: "Admin",
      Status: "Ongoing",
      Action: ActionBtns,
    },
    {
      TaskID: "665e9c1e9f4f123456789def",
      EmployeeName: "Sohil Sen",
      TaskTitle: "Dummy Task",
      Description: "Test task description",
      AssignedDate: "20.02.2025",
      DeadLine: "22.02.2025",
      PhoneNumber: "9990124321",
      AssignedBy: "Admin",
      Status: "Ongoing",
      Action: ActionBtns,
    },
    {
      TaskID: "665e9c1e9f4f123456789def",
      EmployeeName: "Sohil Sen",
      TaskTitle: "Dummy Task",
      Description: "Test task description",
      AssignedDate: "20.02.2025",
      DeadLine: "22.02.2025",
      PhoneNumber: "9990124321",
      AssignedBy: "Admin",
      Status: "Ongoing",
      Action: ActionBtns,
    },
    {
      TaskID: "665e9c1e9f4f123456789def",
      EmployeeName: "Sohil Sen",
      TaskTitle: "Dummy Task",
      Description: "Test task description",
      AssignedDate: "20.02.2025",
      DeadLine: "22.02.2025",
      PhoneNumber: "9990124321",
      AssignedBy: "Admin",
      Status: "Ongoing",
      Action: ActionBtns,
    },
    {
      TaskID: "665e9c1e9f4f123456789def",
      EmployeeName: "Sohil Sen",
      TaskTitle: "Dummy Task",
      Description: "Test task description",
      AssignedDate: "20.02.2025",
      DeadLine: "22.02.2025",
      PhoneNumber: "9990124321",
      AssignedBy: "Admin",
      Status: "Ongoing",
      Action: ActionBtns,
    },
  ]);

  const onEdit = (product) => {
    console.log("Edit button clicked");
    setEditModel({
      status: true,
      productData: product,
      forStatus: "Edit",
    });
  };
  const onDelete = (product) => {
    setDeleteModel({
      status: true,
      productData: product.ID,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "TaskID" },
    { field: "EmployeeName" },
    { field: "TaskTitle" },
    { field: "Description" },
    { field: "AssignedDate" },
    { field: "DeadLine" },
    { field: "AssignedBy" },
    { field: "Status" },
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
    <>
      <Layout>
        <div className="flex justify-between items-center w-full">
          <h3 className="text-[1.5dvw] font-[500]">Task</h3>
          <button
            onClick={() => setNewTask(true)}
            className="flex justify-center items-center gap-3 mainFont bg-[var(--button-color1)] text-white px-5 py-2 rounded-full cursor-pointer font-[500] text-[1dvw]"
          >
            <Plus /> Create New Task
          </button>
        </div>
        <div className="mt-5 bg-white rounded-md border border-[#d4d4d4] p-5">
          <h3 className="text-[1.3dvw] font-[500]">Task List</h3>
          <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[60dvh]">
            <div className="flex justify-between items-center py-1.5 shrink-0">
              <div className="flex justify-center items-center gap-3">
                <select className="font-[500] mainFont px-4 border-none outline-none">
                  <option>All Task</option>
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
                // loading={loading}
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
      </Layout>
      {newTask && <CreateNewTask setNewTask={setNewTask} />}
    </>
  );
};
const ActionBtns = (props) => {
  const { onEdit, onDelete } = props;
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

const CreateNewTask = ({ setNewTask }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 h-screen bg-[#000]/20 backdrop-blur-xl flex justify-center items-center">
        <div className="bg-white w-[60%] max-h-[95%] overflow-y-auto rounded-md border border-[#d4d4d4] shadow p-5">
          <div className="flex justify-between items-center bg-[var(--sideMenu-color)] text-white rounded-md p-3">
            <h3 className="text-[1.3dvw] font-[500]">Create New Task</h3>
            <button
              className="cursor-pointer"
              onClick={() => setNewTask(false)}
            >
              <X size={35} />
            </button>
          </div>
          <div className="flex flex-col gap-5 mt-8">
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="taskTitle"
                className="text-[1dvw] font-normal paraFont"
              >
                Task Title
              </label>
              <input
                placeholder="Enter Task Title..."
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                id="taskTitle"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="taskDescription"
                className="text-[1dvw] font-normal paraFont"
              >
                Task Description
              </label>
              <textarea
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                id="taskDescription"
                rows={5}
                placeholder="Enter Task Description..."
              ></textarea>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-[1dvw] font-normal paraFont"
                htmlFor="employeeName"
              >
                Select Employee
              </label>
              <select
                id="employeeName"
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] appearance-none rounded-xl py-1.5 px-3"
              >
                <option>-- Select Employee --</option>
                <option>Shasank</option>
                <option>Neel</option>
                <option>Satpal</option>
                <option>Tirtho</option>
                <option>Ram</option>
                <option>Rahul</option>
                <option>John</option>
                <option>Mike</option>
                <option>Leo</option>
              </select>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label
                className="text-[1dvw] font-normal paraFont"
                htmlFor="deadLine"
              >
                Dead Line
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] appearance-none rounded-xl py-1.5 px-3"
                id="deadLine"
                type="date"
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label
                htmlFor="status"
                className="text-[1dvw] font-normal paraFont"
              >
                Update Status
              </label>
              <select
                id="status"
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] appearance-none rounded-xl py-1.5 px-3"
              >
                <option>-- Select Status --</option>
                <option>Pending</option>
                <option>On-going</option>
                <option>Defer</option>
                <option>Completed</option>
              </select>
            </div>

            <button
              type="button"
              className="w-full mainFont rounded-md text-[1.2dvw] font-[500] py-2.5 cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-60 bg-[var(--sideMenu-color)] text-white"
            >
              Assign Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
