import React, { useMemo, useState } from "react";
import { DeleteIcon, FilterIcon, SortIcon, PluseIcon } from "../../../assets/Svgs/AllSvgs";
import { Edit, Eye, Trash, Download, CircleX } from "lucide-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { Layout } from "../../../components/common/Layout/Layout";
import { toast } from "react-toastify";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
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
          <Edit size={16} className="sm:w-[18px] sm:h-[18px] lg:w-[18px] lg:h-[18px]" />
        </button>
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--button-color5)] text-white p-1 sm:p-1.5 lg:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleView}
        >
          <Eye size={16} className="sm:w-[18px] sm:h-[18px] lg:w-[18px] lg:h-[18px]" />
        </button>
        <button
          className="font-semibold font-[var(--paraFont)] bg-[var(--Negative-color)] text-white p-1 sm:p-1.5 lg:p-1.5 rounded-full border-none cursor-pointer"
          onClick={handleDelete}
        >
          <Trash size={16} className="sm:w-[18px] sm:h-[18px] lg:w-[18px] lg:h-[18px]" />
        </button>
      </div>
    </>
  );
};

export const Vendors = () => {
  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
  });
  const [editModel, setEditModel] = useState({
    state: false,
    productData: null,
    forStatus: null,
  });
  const [selectedRowData, setSelectedRowData] = useState([]);
  
  const [rowData, setRowData] = useState([
    {
      id: 1,
      VendorName: "Quantum Supply Co.",
      Product: "Fresh Glow Aloe Face Wash",
      Email: "example@gmail.com",
      ContactNumber: "+1 7835870001",
      LastOrderDate: "11 April 2025",
    },
    {
      id: 2,
      VendorName: "Quantum Supply Co.",
      Product: "Fresh Glow Aloe Face Wash",
      Email: "example@gmail.com",
      ContactNumber: "+1 7835870001",
      LastOrderDate: "11 April 2025",
    },
    {
      id: 3,
      VendorName: "Quantum Supply Co.",
      Product: "Fresh Glow Aloe Face Wash",
      Email: "example@gmail.com",
      ContactNumber: "+1 7835870001",
      LastOrderDate: "11 April 2025",
    },
    {
      id: 4,
      VendorName: "Quantum Supply Co.",
      Product: "Fresh Glow Aloe Face Wash",
      Email: "example@gmail.com",
      ContactNumber: "+1 7835870001",
      LastOrderDate: "11 April 2025",
    },
    {
      id: 5,
      VendorName: "Quantum Supply Co.",
      Product: "Fresh Glow Aloe Face Wash",
      Email: "example@gmail.com",
      ContactNumber: "+1 7835870001",
      LastOrderDate: "11 April 2025",
    },
    {
      id: 6,
      VendorName: "Quantum Supply Co.",
      Product: "Fresh Glow Aloe Face Wash",
      Email: "example@gmail.com",
      ContactNumber: "+1 7835870001",
      LastOrderDate: "11 April 2025",
    },
    {
      id: 7,
      VendorName: "Quantum Supply Co.",
      Product: "Fresh Glow Aloe Face Wash",
      Email: "example@gmail.com",
      ContactNumber: "+1 7835870001",
      LastOrderDate: "11 April 2025",
    },
    {
      id: 8,
      VendorName: "Quantum Supply Co.",
      Product: "Fresh Glow Aloe Face Wash",
      Email: "example@gmail.com",
      ContactNumber: "+1 7835870001",
      LastOrderDate: "11 April 2025",
    },
    {
      id: 9,
      VendorName: "Quantum Supply Co.",
      Product: "Fresh Glow Aloe Face Wash",
      Email: "example@gmail.com",
      ContactNumber: "+1 7835870001",
      LastOrderDate: "11 April 2025",
    },
    {
      id: 10,
      VendorName: "Quantum Supply Co.",
      Product: "Fresh Glow Aloe Face Wash",
      Email: "example@gmail.com",
      ContactNumber: "+1 7835870001",
      LastOrderDate: "11 April 2025",
    },
  ]);
  
  const onEdit = (products) => {
    console.log("Edit Button Clicked");
    setEditModel({
      state: true,
      productData: products,
      forStatus: "Edit",
    });
  };

  const onView = (products) => {
    console.log("View Button Clicked", products);
    setEditModel({
      state: true,
      productData: products,
      forStatus: "View",
    });
  };
  
  const onDelete = (products) => {
    console.log(products, "delete");
    setDeleteModel({
      state: true,
      productId: products.id,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "VendorName" },
    { field: "Product" },
    { field: "Email" },
    { field: "ContactNumber" },
    { field: "LastOrderDate" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionBtns,
      cellRendererParams: {
        onEdit,
        onView,
        onDelete,
      },
      sortable: false,
      filter: false,
    },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: false,
    };
  }, []);

  const handleImportCSV = () => {
    console.log("Import CSV clicked");
    // Add your import CSV logic here
  };

  const handleExportCSV = () => {
    console.log("Export CSV clicked");
    // Add your export CSV logic here
  };

  return (
    <>
      <Layout>
        <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
          <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0 lg:flex-row lg:items-center lg:gap-0 lg:mb-0">
              <h3 className="text-2xl md:text-xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                POS / Vendors
              </h3>
              <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto lg:flex-row lg:w-auto lg:gap-5">
                <button
                  onClick={() => {
                    setEditModel({
                      state: true,
                      productData: null,
                      forStatus: "Add",
                    });
                  }}
                  className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                >
                  Add Vendor <PluseIcon className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleImportCSV}
                  className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                >
                  Import CSV <PluseIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[80dvh]">
            <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 lg:px-5 lg:py-5 h-full">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-1.5 shrink-0 gap-3 sm:gap-0 lg:flex-row lg:items-center lg:gap-0">
                <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto lg:justify-center lg:w-auto">
                  <select className="font-[500] mainFont px-4 border-none outline-none text-sm lg:text-base">
                    <option>All Vendors</option>
                    <option>Active Vendors</option>
                    <option>Inactive Vendors</option>
                  </select>
                  <div className="h-6 w-6 sm:h-7 sm:w-7 bg-[#F8A61B] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem]">
                    <p className="text-xs sm:text-xs font-[500] text-white">
                      {rowData?.length}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-4 justify-between items-center flex-wrap lg:justify-center lg:gap-4">
                  <button 
                    onClick={handleExportCSV}
                    className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
                  >
                    Export CSV <Download size={16} />
                  </button>
                  <button>
                    <DeleteIcon className="w-5 h-5 lg:w-auto lg:h-auto" />
                  </button>
                </div>
              </div>
              <div className="h-full w-full overflow-x-scroll overflow-y-auto lg:overflow-visible">
                <div className="min-w-[800px] h-full">
                  <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    rowSelection={rowSelection}
                    onSelectionChanged={(event) => {
                      const selectedNodes = event.api.getSelectedNodes();
                      const selectedData = selectedNodes.map(node => node.data);
                      setSelectedRowData(selectedData);
                      console.log("Selected data updated:", selectedData);
                    }}
                    onCellValueChanged={(event) =>
                      console.log(`New Cell Value: ${event.value}`)
                    }
                    getRowId={(params) => params.data.id.toString()}
                    className="w-full h-full text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      {deleteModel.state && deleteModel.productId && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          productId={deleteModel.productId}
          setRowData={setRowData}
          rowData={rowData}
        />
      )}

      {editModel.state && editModel.forStatus && (
        <VendorEditModel
          forState={editModel.forStatus}
          setEditVendorModel={setEditModel}
          productData={editModel.productData}
          setRowData={setRowData}
          rowData={rowData}
        />
      )}
    </>
  );
};

const VendorEditModel = ({ forState, setEditVendorModel, productData, setRowData, rowData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [vendorInfo, setVendorInfo] = useState({
    full_name: productData?.VendorName || "",
    phone: productData?.ContactNumber || "",
    email: productData?.Email || "",
    password: productData?.Password || "",
    street: productData?.address?.street || "",
    zip: productData?.address?.zip || "",
    role: productData?.role || "",
    status: productData?.status || "",
    city: productData?.address?.city || "",
    state: productData?.address?.state || "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setVendorInfo({
      ...vendorInfo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const newVendor = {
        id: rowData.length + 1,
        VendorName: vendorInfo.full_name,
        Product: productData?.Product || "Fresh Glow Aloe Face Wash",
        Email: vendorInfo.email,
        ContactNumber: vendorInfo.phone,
        LastOrderDate: productData?.LastOrderDate || "11 April 2025",
        address: {
          street: vendorInfo.street,
          zip: vendorInfo.zip,
          city: vendorInfo.city,
          state: vendorInfo.state,
        },
        role: vendorInfo.role,
        status: vendorInfo.status,
        Password: vendorInfo.password,
      };
      setRowData([...rowData, newVendor]);
      console.log("Adding vendor:", vendorInfo);
      toast.success("Vendor Added Successfully");
      setEditVendorModel({
        state: false,
        productData: null,
        forStatus: null,
      });
    } catch (error) {
      toast.error("Add Vendor Failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVendorUpdate = async () => {
    setIsLoading(true);
    try {
      const updatedRowData = rowData.map((item) =>
        item.id === productData.id
          ? {
              ...item,
              VendorName: vendorInfo.full_name,
              Email: vendorInfo.email,
              ContactNumber: vendorInfo.phone,
              address: {
                street: vendorInfo.street,
                zip: vendorInfo.zip,
                city: vendorInfo.city,
                state: vendorInfo.state,
              },
              role: vendorInfo.role,
              status: vendorInfo.status,
              Password: vendorInfo.password,
            }
          : item
      );
      setRowData(updatedRowData);
      console.log("Updating vendor:", vendorInfo);
      toast.success("Vendor Updated Successfully");
      setEditVendorModel({
        state: false,
        productData: null,
        forStatus: null,
      });
    } catch (error) {
      toast.error("Update Vendor Failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center px-2 sm:px-4">
        <div className="bg-white w-full sm:w-[90%] md:w-[70%] lg:w-[50%] p-3 sm:p-4 lg:p-5 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center w-full p-2 sm:p-2.5 rounded-md bg-[var(--sideMenu-color)] text-white">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-[1.5dvw] font-semibold">
              {forState === "Add" ? "Add Vendor" : forState === "View" ? "View Vendor" : "Edit Vendor"}
            </h3>
            <button
              onClick={() => {
                setEditVendorModel({
                  state: false,
                  productData: null,
                  forStatus: null,
                });
              }}
              className="hover:text-[var(--Negative-color)] transition-all duration-300 ease-linear cursor-pointer"
            >
              <CircleX size={24} className="sm:w-[30px] sm:h-[30px]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full p-3 sm:p-4">
            <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                Full Name
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                type="text"
                placeholder="Enter Full Name..."
                name="full_name"
                value={vendorInfo.full_name}
                onChange={handleOnChange}
                required
                disabled={forState === "View"}
              />
            </div>
            <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                Phone
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                type="tel"
                placeholder="Phone number..."
                name="phone"
                value={vendorInfo.phone}
                onChange={handleOnChange}
                required
                disabled={forState === "View"}
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
                <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                  Email
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-normal font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                  type="email"
                  placeholder="Enter Email..."
                  name="email"
                  value={vendorInfo.email}
                  onChange={handleOnChange}
                  required
                  disabled={forState === "View"}
                />
              </div>
              <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
                <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                  Password
                </label>
                <input
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={vendorInfo.password}
                  onChange={handleOnChange}
                  required
                  disabled={forState === "View"}
                />
              </div>
            </div>
            <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                Street Address
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                type="text"
                placeholder="Enter Street Address..."
                name="street"
                value={vendorInfo.street}
                onChange={handleOnChange}
                required
                disabled={forState === "View"}
              />
            </div>
            <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                Zip Code
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                type="number"
                placeholder="Enter Zip Code..."
                name="zip"
                value={vendorInfo.zip}
                onChange={handleOnChange}
                required
                disabled={forState === "View"}
              />
            </div>
            <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                City
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                type="text"
                placeholder="Enter City..."
                name="city"
                value={vendorInfo.city}
                onChange={handleOnChange}
                required
                disabled={forState === "View"}
              />
            </div>
            <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                State
              </label>
              <input
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                type="text"
                placeholder="Enter State..."
                name="state"
                value={vendorInfo.state}
                onChange={handleOnChange}
                required
                disabled={forState === "View"}
              />
            </div>
            <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                Role
              </label>
              <select
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                name="role"
                value={vendorInfo.role}
                onChange={handleOnChange}
                required
                disabled={forState === "View"}
              >
                <option value="">Select Vendor Role</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>
            <div className="w-full my-2 sm:my-3 flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg lg:text-[1dvw] font-normal paraFont">
                Status
              </label>
              <select
                className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base md:text-lg lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-2 sm:px-3"
                name="status"
                value={vendorInfo.status}
                onChange={handleOnChange}
                required
                disabled={forState === "View"}
              >
                <option value="">Select Vendor Status</option>
                <option value="active">Active</option>
                <option value="in-active">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end items-center my-3 sm:my-4">
            <button
              type="button"
              onClick={() => {
                setEditVendorModel({
                  state: false,
                  productData: null,
                  forStatus: null,
                });
              }}
              className="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 bg-[var(--button-color4)] cursor-pointer text-white paraFont rounded-md font-semibold text-sm sm:text-base hover:opacity-80 transition-all duration-300"
            >
              {forState === "View" ? "Close" : "Cancel"}
            </button>
            {forState !== "View" && (
              <button
                type="button"
                onClick={() =>
                  forState === "Add" ? handleSubmit() : handleVendorUpdate()
                }
                className="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 bg-[var(--button-color5)] cursor-pointer text-white paraFont rounded-md font-semibold text-sm sm:text-base hover:opacity-80 transition-all duration-300 disabled:opacity-80 disabled:pointer-events-none disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading
                  ? "Saving..."
                  : forState === "Add"
                  ? "Add Vendor"
                  : "Update Vendor"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};