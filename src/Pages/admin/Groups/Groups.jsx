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
import { CircleX, Edit, Trash, Plus, Download } from "lucide-react";
import { DeleteModel } from "../../../components/common/Models/DeleteMode";
ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Groups = () => {
  const [rowData, setRowData] = useState([
    {
      ID: "1001",
      GroupName: "Beer",
      Stock: "63",
      BuyPrice: "$25.50",
      SellPrice: "$35.00",
      Action: ActionBtns,
    },
    {
      ID: "1002",
      GroupName: "Wine",
      Stock: "41",
      BuyPrice: "$45.00",
      SellPrice: "$65.00",
      Action: ActionBtns,
    },
    {
      ID: "1003",
      GroupName: "Spirits",
      Stock: "28",
      BuyPrice: "$55.75",
      SellPrice: "$85.00",
      Action: ActionBtns,
    },
    {
      ID: "1004",
      GroupName: "Beverages",
      Stock: "150",
      BuyPrice: "$2.50",
      SellPrice: "$4.00",
      Action: ActionBtns,
    },
    {
      ID: "1005",
      GroupName: "Snacks",
      Stock: "89",
      BuyPrice: "$1.25",
      SellPrice: "$2.50",
      Action: ActionBtns,
    },
    {
      ID: "1006",
      GroupName: "Tobacco",
      Stock: "45",
      BuyPrice: "$8.00",
      SellPrice: "$12.00",
      Action: ActionBtns,
    },
    {
      ID: "1007",
      GroupName: "Energy Drinks",
      Stock: "72",
      BuyPrice: "$1.80",
      SellPrice: "$3.50",
      Action: ActionBtns,
    },
    {
      ID: "1008",
      GroupName: "Mixers",
      Stock: "35",
      BuyPrice: "$1.50",
      SellPrice: "$3.00",
      Action: ActionBtns,
    },
    {
      ID: "1009",
      GroupName: "Craft Beer",
      Stock: "24",
      BuyPrice: "$4.25",
      SellPrice: "$7.50",
      Action: ActionBtns,
    },
    {
      ID: "1010",
      GroupName: "Premium Spirits",
      Stock: "18",
      BuyPrice: "$85.00",
      SellPrice: "$125.00",
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
    //{ field: "ID" },
    { field: "GroupName", headerName: "Group Name" },
    { field: "Stock" },
    { field: "BuyPrice", headerName: "Buy Price" },
    { field: "SellPrice", headerName: "Sell Price" },
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
              <button 
                onClick={handleExportCSV}
                className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear"
              >
                Export CSV <Download size={16} />
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
  const [groupFields, setGroupFields] = useState([
    {
      id: 1,
      GroupName: productData.GroupName || "",
      ItemName: productData.ItemName || "",
    }
  ]);

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
    "Premium Spirits"
  ]);

  const [itemNameOptions, setItemNameOptions] = useState([
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

  const handleCloseModel = () => {
    setShowModel({
      state: false,
      productData: null,
      actionType: "",
    });
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFields = groupFields.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setGroupFields(updatedFields);
  };

  const handleSubmit = () => {
    if (actionType === "Add") {
      const newGroups = groupFields.map(field => ({
        ID: (Math.floor(Math.random() * 9000) + 1000).toString(),
        GroupName: field.GroupName,
        Stock: "0", // Default stock value
        BuyPrice: "$0.00", // Default buy price
        SellPrice: "$0.00", // Default sell price
        Action: ActionBtns,
      })).filter(group => group.GroupName);
      
      setRowData([...rowData, ...newGroups]);
    } else if (actionType === "Edit") {
      const updatedRowData = rowData.map(item => 
        item.ID === productData.ID 
          ? { ...item, GroupName: groupFields[0].GroupName }
          : item
      );
      setRowData(updatedRowData);
    }
    handleCloseModel();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 flex justify-center items-center p-4">
      <div className="bg-white w-full sm:w-[90%] md:w-[60%] lg:w-[50%] max-h-[90vh] overflow-y-auto p-4 sm:p-5 rounded-lg shadow-md">
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
                    onChange={(e) => handleFieldChange(index, 'GroupName', e.target.value)}
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    placeholder="Enter Group Name"
                  />
                </div>
                
                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm sm:text-base lg:text-[1dvw] font-normal paraFont">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={field.ItemName}
                    onChange={(e) => handleFieldChange(index, 'ItemName', e.target.value)}
                    className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-xl py-1.5 px-3"
                    placeholder="Enter Item Name"
                  />
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
          >
            {actionType === "Add" ? "Create" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};