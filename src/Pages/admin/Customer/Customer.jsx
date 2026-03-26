import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import { Overviewcards } from "../../../components/common/Overviewcards/Overviewcards";
import {
  BuyPriceIcon,
  CashierIcon,
  DeleteIcon,
  FilterIcon,
  InventoryManagerIcon,
  PluseIcon,
  SellPriceIcon,
  SortIcon,
  StoreManagerIcon,
  TotalInventoryIcon,
  UsersIcon2,
} from "../../../assets/Svgs/AllSvgs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import {
  CircleX,
  Edit,
  Trash,
  Download,
  PlusIcon,
  SearchIcon,
  Eye,
  ArrowRight,
} from "lucide-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axios-interceptor";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loading } from "../../../components/UI/Loading/Loading";
import { useBulkDelete } from "../../../utils/apis/BulkDelete";
import {
  customersOverviewData,
  getAllCustomerList,
} from "../../../utils/apis/handleCustomer";
import { Link } from "react-router-dom";
import moment from "moment";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "mult",
  headerCheckbox: true,
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
        <Link
          to={`/admin/customer/details/${data.id}`}
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color1)] text-white p-1.5 rounded-full border-none cursor-pointer"
        >
          <Eye size={18} />
        </Link>

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

export const Customer = () => {
  const [bulkDeleteIds, setBulkDeleteIds] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editUserModel, setEditUserModel] = useState({
    state: false,
    userData: null,
    forState: null,
  });
  const [overviewFilter, setOverviewFilter] = useState("ALL");
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFiler] = useState("");
  const [customFilter, setCustomFilter] = useState({
    from_date: "",
    to_date: "",
  });

  const [deleteModel, setDeleteModel] = useState({
    state: false,
    userData: null,
    path: null,
  });
  const bulkDelete = useBulkDelete();
  // const queryClient = useQueryClient();

  // get all customer list...
  const {
    data: rowData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customer_list", searchValue, statusFilter],
    queryFn: async () => await getAllCustomerList(searchValue, statusFilter),
    placeholderData: (prev) => prev,
    refetchInterval: 800,
  });

  // get customer over-view data ....
  const {
    data: customerOverviewdata,
    isLoading: customerOverviewLoading,
    isError: customerOverviewError,
  } = useQuery({
    queryKey: ["customer_overview", overviewFilter,customFilter.from_date,customFilter.to_date],
    queryFn: async () =>
      await customersOverviewData({
        default: overviewFilter,
        from_date: customFilter.from_date,
        to_date: customFilter.to_date,
      }),
    placeholderData: (prev) => prev,
    // refetchInterval: 800,
  });

  // error if error occurs
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const onEdit = (user) => {
    // edit user data
    console.log("edit user");

    setEditUserModel({
      state: true,
      userData: user,
      forState: "Edit",
    });
  };
  const onDelete = (user) => {
    setDeleteModel({
      state: true,
      userData: user.id,
      path: `api/v1/customer/delete/${user.id}`,
    });
  };

  // const handleImportCSV = () => {
  //   console.log("Import CSV clicked");
  //   // Add your import CSV logic here
  // };

  // const handleExportCSV = () => {
  //   console.log("Export CSV clicked");
  // };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState([
    { field: "name", flex: 1 },
    { field: "email", flex: 1 },
    { field: "mobile", flex: 1 },
    { field: "dob", flex: 1 },
    { field: "zipcode", flex: 1 },
    { field: "points", flex: 1 },
    { field: "address", flex: 1 },
    { field: "sms_email_promotions", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (params) => {
        return params?.value === "active" ? "Active" : "Inactive";
      },
      flex: 1,
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
    <>
      {isLoading || customerOverviewLoading ? (
        <Loading />
      ) : (
        <Layout>
          <div
            className="pb-14 w-full px-4 sm:px-6 lg:px-0 h-[calc(100vh-5rem)]"
            style={{ marginTop: 0 }}
          >
            <div className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0 lg:flex-row lg:items-center lg:gap-0 lg:mb-0">
                <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                  Customers
                </h3>
                <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto lg:flex-row lg:w-auto lg:gap-5">
                    {overviewFilter === "CUSTOM" && (
                      <div className="flex justify-center items-center gap-3 transition-all duration-300 ease-linear">
                        <div className="flex gap-3 justify-start items-center">
                          <label className="text-sm sm:text-base lg:text-[1dvw] shrink-0 font-normal paraFont">
                            From :{" "}
                          </label>
                          <input
                            type="date"
                            value={customFilter.from_date}
                            onChange={(e) => {
                              setCustomFilter({
                                ...customFilter,
                                from_date: moment(e.target.value).format(
                                  "YYYY-MM-DD",
                                ),
                              });
                            }}
                            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                          />
                        </div>
                        <div className="flex gap-3 justify-start items-center">
                          <label className="text-sm sm:text-base lg:text-[1dvw] shrink-0 font-normal paraFont">
                            To :{" "}
                          </label>
                          <input
                            type="date"
                            value={customFilter.to_date}
                            onChange={(e) => {
                              setCustomFilter({
                                ...customFilter,
                                to_date: moment(e.target.value).format(
                                  "YYYY-MM-DD",
                                ),
                              });
                            }}
                            className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                          />
                        </div>
                        {/* <button
                          onClick={() => {
                            queryClient.invalidateQueries({
                              queryKey: ["get_report_data"],
                            });
                          }}
                          className="bg-(--button-color1) text-white h-[2dvw] w-[2dvw] rounded-full flex justify-center items-center cursor-pointer"
                        >
                          <ArrowRight size={20} />
                        </button> */}
                      </div>
                    )}
                  <div className="relative w-full sm:w-auto">

                    <select
                      value={overviewFilter}
                      onChange={(e) => setOverviewFilter(e.target.value)}
                      className="appearance-none pl-4 pr-8 py-2 sm:py-1 md:py-1.5 bg-[var(--button-color2)] text-[var(--primary-color)] rounded-full font-[var(--paraFont)] text-sm sm:text-base md:text-base w-full sm:w-auto cursor-pointer"
                    >
                      <option value="ALL">All</option>
                      <option value="TODAY">Today</option>
                      <option value="LAST_DAY">Last Day</option>
                      <option value="LAST_3_DAY">Last 3 Days</option>
                      <option value="LAST_7_DAY">Last 7 Days</option>
                      <option value="LAST_30_DAY">Last 30 Days</option>
                      <option value="CUSTOM">Custom</option>
                    </select>
                    <div className="pointer-events-none   absolute inset-y-0 right-0 flex items-center px-2 text-[var(--primary-color)]">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setEditUserModel({
                        state: true,
                        userData: "23",
                        forState: "Add",
                      });
                    }}
                    className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                  >
                    Add Customer <PluseIcon />
                  </button>
                  {/* <button
                    onClick={handleImportCSV}
                    className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                  >
                    Import CSV <PluseIcon />
                  </button> */}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full my-4 lg:my-3">
              <Overviewcards
                cardTitle="Active Customers"
                cardValue={customerOverviewdata?.activeCustomers}
                percent="View"
                className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
                icon={
                  <StoreManagerIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />
                }
              />
              <Overviewcards
                cardTitle="Inactive Customers"
                cardValue={customerOverviewdata?.inactiveCustomers}
                percent="View"
                className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
                icon={
                  <CashierIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />
                }
              />
              <Overviewcards
                cardTitle="Customers with Promotions"
                cardValue={customerOverviewdata?.customersWithPromotions}
                percent="View"
                className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
                icon={
                  <InventoryManagerIcon className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />
                }
              />
              <Overviewcards
                cardTitle="Total Customers"
                cardValue={customerOverviewdata?.totalCustomers}
                percent="View"
                className="lg:scale-95 lg:hover:scale-100 transition-transform duration-200"
                icon={
                  <UsersIcon2 className="w-[8dvw] h-[8dvw] sm:w-12 sm:h-12 lg:w-10 lg:h-10" />
                }
              />
            </div>

            <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[60dvh]">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0">
                <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFiler(e.target.value)}
                    className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-base"
                  >
                    <option value="">All Customers</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[1.8dvw] lg:w-[1.8dvw] bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                    <p className="text-xs sm:text-xs md:text-sm lg:text-[1dvw] font-[500] text-white">
                      {rowData.length}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-4 justify-between items-center">
                  <input
                    type="text"
                    placeholder="Search by name, phone, email..."
                    className="border border-[#d4d4d4] rounded-full px-4 py-2 text-sm lg:text-base"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />

                  {/*<button className="flex justify-between items-center gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
                    Sort <SortIcon />
                  </button>
                  <button className="flex justify-between items-center gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm lg:text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
                    Filter <FilterIcon />
                  </button>*/}
                  <button className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
                    Export CSV <Download size={16} />
                  </button>

                  <button
                    onClick={async () => {
                      setIsDeleting(true);
                      const result = bulkDelete.mutate({
                        path: "api/v1/customer/bulk-delete",
                        idList: {
                          customerIds: bulkDeleteIds,
                        },
                        queryKey: "customer_list",
                        isDeleting: setIsDeleting,
                      });
                    }}
                    className="disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer disabled:pointer-events-none"
                    disabled={bulkDeleteIds.length === 0 ? true : false}
                  >
                    <DeleteIcon className="w-5 h-5" />
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
                    onSelectionChanged={(event) => {
                      let bulkIds = [];
                      event.selectedNodes.forEach((item) => {
                        bulkIds.push(item.data.id);
                      });
                      const uniqueSet = new Set(bulkIds);
                      setBulkDeleteIds([...uniqueSet]);
                    }}
                    onCellValueChanged={(event) =>
                      console.log(`New Cell Value: ${event.value}`)
                    }
                    className="w-full h-full text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}

      {editUserModel.state &&
        editUserModel.userData &&
        editUserModel.forState && (
          <EditUserModel
            setEditUserModel={setEditUserModel}
            userData={editUserModel.userData}
            forState={editUserModel.forState}
          />
        )}

      {deleteModel.state && deleteModel.userData && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          productId={deleteModel.userData}
          path={deleteModel.path}
        />
      )}
    </>
  );
};

const EditUserModel = ({ setEditUserModel, userData, forState }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    customer_name: userData?.name || "",
    customer_email: userData?.email || "",
    customer_mobile: userData?.mobile || "",
    date_of_birth: userData?.dob || "",
    customer_address: userData?.address || "",
    customer_zipcode: userData?.zipcode || "",
    customer_points: userData?.points || "",
    sms_email_promotions: userData?.sms_email_promotions || "",
    status: userData?.status || "",
  });
  const queryClient = useQueryClient();

  // handle onChange function...
  const handleOnChanges = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  // handle onSubmit function add/create new customer..
  const handleOnsubmit = async () => {
    setIsSaving(true);

    try {
      const reqSaveCustomer = await axiosInstance.post("api/v1/customer/add", {
        ...customerInfo,
      });

      if (reqSaveCustomer.status === 200 && reqSaveCustomer.data) {
        queryClient.invalidateQueries({
          queryKey: ["customer_list"],
        });
        setEditUserModel({
          state: false,
          userData: null,
          forState: null,
        });
        toast.success(
          reqSaveCustomer.data.message || "Customer Added Successfully!",
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to save customer");
      console.error(error?.response?.data?.error);
    } finally {
      setIsSaving(false);
    }
  };

  // handle onEdit function edit/update existing customer...
  const handleCustomerUpdate = async () => {
    try {
      const reqUpdateCustomer = await axiosInstance.post(``, {});
    } catch (error) {
      console.log(error?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center">
        <div className="bg-white w-[95%] sm:w-[80%] md:w-[90%] lg:w-[50%] p-4 sm:p-5 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center w-full p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.5dvw] font-semibold">
              {forState} User
            </h3>
            <button
              onClick={() => {
                setEditUserModel({
                  state: false,
                  userData: null,
                });
              }}
              className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
            >
              <CircleX size={30} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full p-3">
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Name
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter Name..."
                name="customer_name"
                value={customerInfo.customer_name}
                onChange={handleOnChanges}
              />
            </div>
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Mobile
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="number"
                placeholder="phone number..."
                value={customerInfo.customer_mobile}
                name="customer_mobile"
                onChange={handleOnChanges}
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Email
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="email"
                placeholder="Enter Email...."
                value={customerInfo.customer_email}
                name="customer_email"
                onChange={handleOnChanges}
              />
            </div>
            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                DOB
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="date"
                name="date_of_birth"
                value={customerInfo.date_of_birth}
                onChange={handleOnChanges}
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Address
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter Address..."
                name="customer_address"
                value={customerInfo.customer_address}
                onChange={handleOnChanges}
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Zipcode
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="text"
                placeholder="Enter Zipcode..."
                name="customer_zipcode"
                value={customerInfo.customer_zipcode}
                onChange={handleOnChanges}
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Points
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                type="number"
                placeholder="Enter Points..."
                name="customer_points"
                value={customerInfo.customer_points}
                onChange={handleOnChanges}
              />
            </div>

            <div className="w-full my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                SMS & Email Promotions
              </label>
              <select
                name="sms_email_promotions"
                value={customerInfo.sms_email_promotions}
                onChange={handleOnChanges}
                className="bg-[#F3F3F3] appearance-none w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              >
                <option value="">Select for Promotions</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full sm:col-span-2 my-4 flex flex-col gap-2">
              <label className="text-base sm:text-lg md:text-xl lg:text-[1dvw] font-normal paraFont">
                Status
              </label>
              <select
                name="status"
                value={customerInfo.status}
                onChange={handleOnChanges}
                className="bg-[#F3F3F3] appearance-none w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-base sm:text-lg md:text-xl lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="in-active">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-end items-center my-4">
            <button
              onClick={() => {
                setEditUserModel({
                  state: false,
                  userData: null,
                });
              }}
              className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleOnsubmit}
              disabled={
                isSaving ||
                !Object.keys(customerInfo).every((item) => customerInfo[item])
              }
              className="w-full sm:w-auto px-6 py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold hover:opacity-80 transition-all duration-300 disabled:opacity-80 disabled:pointer-events-none disabled:cursor-not-allowed"
            >
              {isSaving ? (
                "Saving..."
              ) : (
                <>{forState === "Add" ? "Save" : "Update"}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
