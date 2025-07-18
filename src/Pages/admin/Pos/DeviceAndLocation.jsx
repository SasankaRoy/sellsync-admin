import React, { useMemo, useState } from "react";
import { DeleteIcon, FilterIcon, SortIcon } from "../../../assets/Svgs/AllSvgs";
import { CircleX, Edit, Eye, Trash, X } from "lucide-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
import { POSEditModel } from "../../../components/common/Models/POSEditModel";
import { Layout } from "../../../components/common/Layout/Layout";
import { Plus } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
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
          <Eye size={18} />
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

export const DeviceAndLocation = () => {
  const [newDevice, setNewDevice] = useState(false);
  const [deleteModel, setDeleteModel] = useState({
    state: false,
    productId: null,
  });
  const [editModel, setEditModel] = useState({
    state: false,
    productData: null,
  });
  const [rowData, setRowData] = useState([
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
    {
      ID: "#521478",
      DateOfReister: "20.02.2015",
      Name: "Admin dash",
      Location: "Admin dash",
      Type: "main",
      Status: "Active",
      Actions: ActionBtns,
    },
  ]);
  const onEdit = (products) => {
    console.log("Edit Button Clicked");
    setEditModel({
      state: true,
      productData: products,
    });
  };
  const onDelete = (products) => {
    console.log(products, "delete");
    setDeleteModel({
      state: true,
      productId: products.ID,
    });
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "ID" },
    { field: "DateOfReister" },
    { field: "Name" },
    { field: "Location" },
    { field: "Type" },
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
        <div className="flex justify-between items-center p-2">
          <h3 className="font-[500] text-[1.5dvw]">Device and Location</h3>
          <button
            onClick={() => setNewDevice(true)}
            className="flex justify-center items-center gap-2 rounded-full bg-[var(--button-color1)] text-white mainFont px-5 py-2 cursor-pointer"
          >
            <Plus /> New Device
          </button>
        </div>
        <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[80dvh]">
          <div className="flex justify-between items-center py-1.5 shrink-0">
            <div className="flex justify-center items-center gap-3">
              <select className="font-[500] mainFont px-4 border-none outline-none">
                <option>All</option>
              </select>
              <p className="px-3 text-[1dvw] py-.5 bg-[#F8A61B] rounded-2xl font-[500] border-none text-white">
                {rowData.length}
              </p>
            </div>
            {/* <div className="flex gap-4 justify-center items-center">
            <button className="flex justify-center items-center gap-2 px-4 py-1 text-[1dvw] border border-[#0052CC] rounded-full text-[#0052CC] cursor-pointer font-[600]">
              Sort <SortIcon />
            </button>
            <button className="flex justify-center items-center gap-2 px-4 py-1 text-[1dvw] border border-[#0052CC] rounded-full text-[#fff] cursor-pointer font-[600] bg-[#0052CC]">
              Filter <FilterIcon />
            </button>
            <button>
              <DeleteIcon />
            </button>
          </div> */}
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
      </Layout>
      {newDevice && <AddNewDevice setNewDevice={setNewDevice} />}
    </>
  );
};

const AddNewDevice = ({ setNewDevice }) => {
  return (
    <>
      <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[#000]/20 backdrop-blur-xl z-50">
        <div className="bg-white rounded-lg p-5 w-[50%] shadow">
          <div className="flex justify-between items-center w-full bg-[var(--sideMenu-color)] text-white p-3 rounded-lg">
            <h3 className="text-[1.5dvw] font-[500]">Add New Device</h3>
            <button
              onClick={() => setNewDevice(false)}
              className="cursor-pointer"
            >
              <CircleX size={35} />
            </button>
          </div>

          <div className="my-10 flex flex-col gap-8">
            <div className="flex justify-between items-center gap-5 w-full">
              <div className="w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-[1dvw] font-normal paraFont"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="Enter name..."
                />
              </div>
              <div className="w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-[1dvw] font-normal paraFont"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="Enter location..."
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-5 w-full">
              <div className="w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-[1dvw] font-normal paraFont"
                  htmlFor="type"
                >
                  Type
                </label>
                <input
                  id="type"
                  type="text"
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                  placeholder="Enter type..."
                />
              </div>
              <div className="w-1/2 flex flex-col gap-1.5">
                <label
                  className="text-[1dvw] font-normal paraFont"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)]  placeholder:text-[#333333]/40 text-[1.1dvw] border border-[#d4d4d4]  active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3 appearance-none"
                  id="status"
                >
                  <option>-- Select Status --</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <button className="w-full py-2 rounded-lg mainFont font-[500] text-white bg-[var(--button-color1)]">
                Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
