import React, { useState, useMemo, useEffect } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Plus, X } from "lucide-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { CircleX, Edit, Trash, Eye } from "lucide-react";
import { DeleteIcon, FilterIcon, SortIcon } from "../../../assets/Svgs/AllSvgs";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axios-interceptor";
import { Loading } from "../../../components/UI/Loading/Loading";
import moment from "moment";
import { useDeboune } from "../../../hooks/useDebounce";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Task = () => {
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState({ status: false, task: null });
  const [deleteModel, setDeleteModel] = useState({
    status: false,
    productData: null,
  });
  const [editModel, setEditModel] = useState({
    status: false,
    taskData: null,
    actionType: null,
  });

  const {
    data: rowData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get_tasks_lists"],
    queryFn: async () => {
      try {
        const reqTaskList = await axiosInstance.post("api/v1/user/task-list", {
          page: 1,
          limit: 20,
        });
        if (reqTaskList.status === 200 && reqTaskList.data) {
          return reqTaskList?.data?.results;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [error]);

  // const [rowData, setRowData] = useState([
  //   {
  //     TaskID: "665e9c1e9f4f123456789def",
  //     EmployeeName: "Sohil Sen",
  //     TaskTitle: "Dummy Task",
  //     Description: "Test task description",
  //     AssignedDate: "20.02.2025",
  //     DeadLine: "22.02.2025",
  //     PhoneNumber: "9990124321",
  //     AssignedBy: "Admin",
  //     Status: "Ongoing",
  //   },
  //   {
  //     TaskID: "665e9c1e9f4f123456789abc",
  //     EmployeeName: "Sohil Sen",
  //     TaskTitle: "Dummy Task 2",
  //     Description: "Test task description 2",
  //     AssignedDate: "20.02.2025",
  //     DeadLine: "22.02.2025",
  //     PhoneNumber: "9990124321",
  //     AssignedBy: "Admin",
  //     Status: "Ongoing",
  //   },
  //   {
  //     TaskID: "665e9c1e9f4f123456789xyz",
  //     EmployeeName: "Sohil Sen",
  //     TaskTitle: "Dummy Task 3",
  //     Description: "Test task description 3",
  //     AssignedDate: "20.02.2025",
  //     DeadLine: "22.02.2025",
  //     PhoneNumber: "9990124321",
  //     AssignedBy: "Admin",
  //     Status: "Ongoing",
  //   },
  //   {
  //     TaskID: "665e9c1e9f4f123456789def4",
  //     EmployeeName: "Sohil Sen",
  //     TaskTitle: "Dummy Task 4",
  //     Description: "Test task description 4",
  //     AssignedDate: "20.02.2025",
  //     DeadLine: "22.02.2025",
  //     PhoneNumber: "9990124321",
  //     AssignedBy: "Admin",
  //     Status: "Ongoing",
  //   },
  //   {
  //     TaskID: "665e9c1e9f4f123456789def5",
  //     EmployeeName: "Sohil Sen",
  //     TaskTitle: "Dummy Task 5",
  //     Description: "Test task description 5",
  //     AssignedDate: "20.02.2025",
  //     DeadLine: "22.02.2025",
  //     PhoneNumber: "9990124321",
  //     AssignedBy: "Admin",
  //     Status: "Ongoing",
  //   },
  //   {
  //     TaskID: "665e9c1e9f4f123456789def6",
  //     EmployeeName: "Sohil Sen",
  //     TaskTitle: "Dummy Task 6",
  //     Description: "Test task description 6",
  //     AssignedDate: "20.02.2025",
  //     DeadLine: "22.02.2025",
  //     PhoneNumber: "9990124321",
  //     AssignedBy: "Admin",
  //     Status: "Ongoing",
  //   },
  //   {
  //     TaskID: "665e9c1e9f4f123456789def7",
  //     EmployeeName: "Sohil Sen",
  //     TaskTitle: "Dummy Task 7",
  //     Description: "Test task description 7",
  //     AssignedDate: "20.02.2025",
  //     DeadLine: "22.02.2025",
  //     PhoneNumber: "9990124321",
  //     AssignedBy: "Admin",
  //     Status: "Ongoing",
  //   },
  //   {
  //     TaskID: "665e9c1e9f4f123456789def8",
  //     EmployeeName: "Sohil Sen",
  //     TaskTitle: "Dummy Task 8",
  //     Description: "Test task description 8",
  //     AssignedDate: "20.02.2025",
  //     DeadLine: "22.02.2025",
  //     PhoneNumber: "9990124321",
  //     AssignedBy: "Admin",
  //     Status: "Ongoing",
  //   },
  //   {
  //     TaskID: "665e9c1e9f4f123456789def9",
  //     EmployeeName: "Sohil Sen",
  //     TaskTitle: "Dummy Task 9",
  //     Description: "Test task description 9",
  //     AssignedDate: "20.02.2025",
  //     DeadLine: "22.02.2025",
  //     PhoneNumber: "9990124321",
  //     AssignedBy: "Admin",
  //     Status: "Ongoing",
  //   },
  //   {
  //     TaskID: "665e9c1e9f4f123456789def10",
  //     EmployeeName: "Sohil Sen",
  //     TaskTitle: "Dummy Task 10",
  //     Description: "Test task description 10",
  //     AssignedDate: "20.02.2025",
  //     DeadLine: "22.02.2025",
  //     PhoneNumber: "9990124321",
  //     AssignedBy: "Admin",
  //     Status: "Ongoing",
  //   },
  // ]);

  const onEdit = (task) => {
    console.log(task);
    setNewTask({
      status: true,
      task: task,
    });
  };

  const onView = (task) => {
    navigate(`/admin/tasks/task-details/${task.id}`);
  };

  const onDelete = (product) => {
    console.log(product);
    setDeleteModel({
      status: true,
      productData: product.id,
    });
  };

  const [colDefs, setColDefs] = useState([
    { field: "employee_name", headerName: "Employee" },
    { field: "title", headerName: "Title" },
    { field: "task_details", headerName: "Description" },
    { field: "updatedAt", headerName: "Assigned" },
    { field: "task_deadline", headerName: "Deadline" },
    // { field: "AssignedBy", headerName: "Assigned By", width: 120 },
    { field: "task_status", headerName: "Status" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <ActionBtns
          {...params}
          onEdit={onEdit}
          onView={onView}
          onDelete={onDelete}
        />
      ),
      width: 150,
      sortable: false,
      filter: false,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: false,
      resizable: true,
    };
  }, []);


  return (
    <>
      <Layout>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
            <div className="flex flex-col sm:flex-row lg:flex-row justify-between items-start sm:items-center lg:items-center gap-4 mb-6 sm:mb-0 lg:mb-0 p-2 lg:p-2">
              <h3 className="text-2xl md:text-xl lg:font-[500] lg:text-[1.5dvw] font-semibold text-[var(--mainText-color)]">
                Task
              </h3>
              <div className="w-full sm:w-auto flex justify-center">
                <button
                  onClick={() => setNewTask({ status: true, task: null })}
                  className="w-full sm:w-auto flex justify-center items-center gap-2 rounded-full bg-[var(--button-color1)] text-white mainFont px-6 py-3 sm:px-4 sm:py-2 lg:px-5 lg:py-2 cursor-pointer text-base sm:text-sm hover:bg-[#F8A61B] transition-all duration-300"
                >
                  <Plus size={20} className="sm:w-5 sm:h-5" /> Create New Task
                </button>
              </div>
            </div>
            <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[80dvh]">
              <div className="flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 lg:px-2.5 lg:py-2 h-full">
                <h3 className="text-lg sm:text-xl lg:text-[1.3dvw] font-[600] text-[var(--mainText-color)] px-2.5">
                  Task List
                </h3>
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0 lg:flex-row lg:items-center lg:gap-0">
                  <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto lg:justify-center lg:w-auto">
                    <select className="font-[500] mainFont px-4 border-none outline-none text-sm sm:text-base lg:text-[1dvw]">
                      <option>All Task</option>
                    </select>
                    <div className="h-6 w-6 sm:h-7 sm:w-7 bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem]">
                      <p className="text-xs sm:text-xs font-[500] text-white">
                        {rowData.length}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-4 lg:gap-4 justify-end items-center">
                    {/*<button className="flex justify-center items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 text-sm sm:text-base lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                      Sort <SortIcon className="sm:w-5 sm:h-5" />
                    </button>
                    <button className="flex justify-center items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 text-sm sm:text-base lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                      Filter <FilterIcon className="sm:w-5 sm:h-5" />
                    </button>*/}
                    <button>
                      <DeleteIcon className="sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
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
          </div>
        )}
      </Layout>
      {newTask.status && (
        <CreateNewTask
          setNewTask={setNewTask}
          task={newTask.task}
          isEditing={!!newTask.task}
          rowData={rowData}
        />
      )}
      {deleteModel.status && deleteModel.productData && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          path={`api/v1/user/task-delete/${deleteModel?.productData}`}
          productId={deleteModel.productData}
          // refetchQuery='get_tasks_lists'
        />
      )}
    </>
  );
};

const ActionBtns = (props) => {
  const { data, onEdit, onView, onDelete } = props;

  const handleEdit = () => {
    console.log("Edit clicked for:", data);
    onEdit(data);
  };

  const handleView = () => {
    console.log("View clicked for:", data);
    onView(data);
  };

  const handleDelete = () => {
    console.log("Delete clicked for:", data);
    onDelete(data);
  };

  return (
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
        className="font-semibold font-[var(--paraFont)] bg-[var(--button-color5)] text-white p-1 sm:p-1.5 lg:p-1.5 rounded-full border-none cursor-pointer"
        onClick={handleView}
      >
        <Eye
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
  );
};

const CreateNewTask = ({
  setNewTask,
  task,
  isEditing,
  setRowData,
  rowData,
}) => {
  console.log(task, "new task data");
  const [formData, setFormData] = useState({
    TaskTitle: task?.title || "",
    Description: task?.task_details || "",
    EmployeeName: task?.employee_name || "",
    EmployeeId: task?.employee_id || "",
    DeadLine: moment(task?.task_deadline).format("YYYY-MM-DD") || "",
    Status: task?.task_status || "-- Select Status --",
  });
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [showEmployeeList, setShowEmployeeList] = useState(false);

  // handle onChange function...
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // search employee....
  const debounceCallback = useDeboune((data, error) => {
    if (data.length > 0 && error === null) {
      console.log(data);
      setIsSearching(false);
      setSearchResult([...data]);
      setIsError("");
      return;
    } else {
      setIsSearching(false);
    }
    if (error) {
      setIsError(error);
      setSearchResult([]);
      setIsSearching(false);
      return;
    }
  }, 800);

  // add task function....
  const handleSubmit = async () => {
    setIsSaving(true);
    // console.log(formData)
    // return
    try {
      const path = isEditing
        ? `api/v1/user/employee-task-update/${task.id}`
        : "api/v1/user/employee-task-assign";
      const reqAssignTask = await axiosInstance.post(path, {
        employee_id: formData?.EmployeeId,
        task_title: formData.TaskTitle,
        task_details: formData.Description,
        task_deadline: moment(formData.DeadLine).format("YYYY-MM-DD"),
        task_status: formData.Status,
      });

      if (reqAssignTask.status === 200 && reqAssignTask.data) {
        queryClient.invalidateQueries({
          queryKey: ["get_tasks_lists"],
        });
        toast.success(reqAssignTask?.data?.message);
        setNewTask({ status: false, task: null });
      }
    } catch (error) {
      console.error(error?.resposne?.data);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong, please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[#000]/20 backdrop-blur-xl z-50">
        <div
          onClick={() => {
            setShowEmployeeList(false);
          }}
          className="bg-white rounded-lg p-3 sm:p-5 w-[95%] sm:w-[80%] lg:w-[60%] max-h-[95%] overflow-y-auto shadow mx-4"
        >
          <div className="flex justify-between items-center w-full bg-[var(--sideMenu-color)] text-white p-2 sm:p-3 rounded-lg">
            <h3 className="text-lg sm:text-xl lg:text-[1.5dvw] font-[500]">
              {isEditing ? "Edit Task" : "Create New Task"}
            </h3>
            <button
              className="cursor-pointer"
              onClick={() => setNewTask({ status: false, task: null })}
            >
              <X size={24} className="sm:w-8 sm:h-8 lg:w-[35px] lg:h-[35px]" />
            </button>
          </div>
          <div className="my-6 sm:my-8 lg:my-10 flex flex-col gap-6 sm:gap-8">
            <div className="w-full flex flex-col gap-1.5">
              <label
                htmlFor="taskTitle"
                className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
              >
                Task Title
              </label>
              <input
                placeholder="Enter Task Title..."
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                id="TaskTitle"
                value={formData.TaskTitle}
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col gap-1.5">
              <label
                htmlFor="taskDescription"
                className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
              >
                Task Description
              </label>
              <textarea
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                id="Description"
                rows={5}
                value={formData.Description}
                onChange={handleChange}
                placeholder="Enter Task Description..."
              ></textarea>
            </div>
            <div className="w-full flex flex-col gap-1.5 relative">
              <label
                className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                htmlFor="employeeName"
              >
                Select Employee
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] appearance-none rounded-xl py-1.5 px-3"
                id="EmployeeName"
                placeholder="Employee name..."
                value={employeeName ? employeeName : formData.EmployeeName}
                onChange={(e) => {
                  e.target.value && setIsSearching(true);
                  e.target.value &&
                    debounceCallback(
                      e.target.value,
                      "api/v1/user/employee-list"
                    );
                  setShowEmployeeList(true);
                  setEmployeeName("");
                  handleChange(e);
                }}
              />

              {showEmployeeList && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
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
                      {searchResult.map((employee, id) => (
                        <button
                          key={id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData({
                              ...formData,
                              EmployeeId: employee.id,
                              EmployeeName: employee.name,
                            });
                          }}
                          className="w-full py-2 sm:py-3 px-3 sm:px-5 cursor-pointer hover:bg-[#000]/15 transition-all duration-200 ease-linear bg-[#000]/5 border-b border-[var(--border-color)] mainFont font-semibold rounded text-start text-sm sm:text-base"
                        >
                          {employee.name}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="w-full flex flex-col gap-1.5">
              <label
                className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
                htmlFor="deadLine"
              >
                Dead Line
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] appearance-none rounded-xl py-1.5 px-3"
                id="DeadLine"
                type="date"
                value={formData.DeadLine}
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col gap-1.5">
              <label
                htmlFor="status"
                className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont"
              >
                Update Status
              </label>
              <select
                id="Status"
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] appearance-none rounded-xl py-1.5 px-3"
                value={formData.Status}
                onChange={handleChange}
              >
                <option>-- Select Status --</option>
                <option value="pending">Pending</option>
                <option value="on-going">On-going</option>
                <option value="defer">Defer</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-end items-center">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300 disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-60"
                onClick={handleSubmit}
                disabled={isSaving}
              >
                {isSaving ? "Assigning..." : "Assign Task"}
              </button>
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
                onClick={() => setNewTask({ status: false, task: null })}
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
