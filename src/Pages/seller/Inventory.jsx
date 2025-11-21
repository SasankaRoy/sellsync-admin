import React, { useState } from "react";
import { Search, Edit, Plus, X } from "lucide-react";
import ProductImg1 from "../../assets/images/ProductImg1.png";
import Layout from "../../components/common/Layout/Layout";
import { PluseIcon } from "../../assets/Svgs/AllSvgs";
import { AddProductModel } from "../../components/common/AddProductModel/AddProductModel";

// Product View Modal Component
const ProductViewModal = ({ product, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) return null;

  const getStatusColor = (stock) => {
    if (stock === 0) return "bg-red-100 text-red-800";
    if (stock <= 2) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  // Generate different views for the same product
  // In a real app, these would be actual different images from your product data
  const getProductViews = (productName) => {
    // Create different view descriptions for the same product
    const baseImage = ProductImg1; // Using same image as placeholder
    return [
      {
        src: baseImage,
        alt: `${productName} - Front View`,
        label: "Front View",
      },
      {
        src: baseImage,
        alt: `${productName} - Side View`,
        label: "Side View",
      },
      {
        src: baseImage,
        alt: `${productName} - Back View`,
        label: "Back View",
      },
      {
        src: baseImage,
        alt: `${productName} - Detail View`,
        label: "Detail View",
      },
      {
        src: baseImage,
        alt: `${productName} - Package View`,
        label: "Package View",
      },
    ];
  };

  const productViews = getProductViews(product.name);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-md shadow p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="w-full bg-[var(--sideMenu-color)] flex justify-between items-center px-3 py-1.5 text-white rounded-md mb-4">
          <h3 className="font-semibold text-lg sm:text-xl lg:text-[1.8dvw]">
            Product Details
          </h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              {/* Main Product Image */}
              <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square mb-4 relative">
                <img
                  src={productViews[selectedImageIndex].src}
                  alt={productViews[selectedImageIndex].alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300";
                  }}
                />
                {/* View Label Overlay */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {productViews[selectedImageIndex].label}
                </div>
              </div>

              {/* Grid of 4 different product views */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {productViews.slice(1, 5).map((view, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImageIndex(index + 1)}
                    className={`bg-gray-100 rounded-md overflow-hidden aspect-square cursor-pointer border-2 transition-all duration-200 ${
                      selectedImageIndex === index + 1
                        ? "border-[#3b82f6]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    title={view.label}
                  >
                    <img
                      src={view.src}
                      alt={view.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/80";
                      }}
                    />
                    {/* Small label overlay on hover */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {view.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* View selector info */}
              <div className="mt-2 text-center">
                <p className="text-xs text-gray-500">
                  Click thumbnails to view different angles
                </p>
              </div>
            </div>

            <div className="w-full md:w-2/3 space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 mb-8">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                      product.stock
                    )}`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-base text-gray-500">Price</p>
                    <p className="text-xl font-semibold">${product.price}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-base text-gray-500">Stock</p>
                    <p className="text-xl font-semibold">
                      {product.stock} units
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-base text-gray-500">Description</p>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {product.description ||
                      "No description available for this product."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InventorySeller = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState({
    state: false,
    productData: null,
    actionType: "",
  });

  const items = [
    {
      id: 1,
      name: "Whipped Cream",
      stock: 0,
      price: 5,
      status: "Out of Stock",
      image: "productImg1",
      description: "Light and fluffy whipped cream for desserts and beverages.",
    },
    {
      id: 2,
      name: "Budweiser Magnum",
      stock: 4,
      price: 2,
      status: "Current Stock",
      image: "productImg1",
      description: "Classic American lager with a crisp, clean taste.",
    },
    {
      id: 3,
      name: "Mocha Beans",
      stock: 2,
      price: 20,
      status: "Current Stock",
      image: "productImg1",
      description:
        "High-quality Arabica coffee beans for a rich and smooth coffee experience.",
    },
    {
      id: 4,
      name: "Almonds",
      stock: 4,
      price: 15,
      status: "Current Stock",
      image: "productImg1",
      description: "Fresh and crunchy almonds perfect for snacking or baking.",
    },
    {
      id: 5,
      name: "Organic Honey",
      stock: 8,
      price: 12,
      status: "In Stock",
      image: "productImg1",
      description:
        "Pure and natural organic honey for a healthier alternative to refined sugars.",
    },
    {
      id: 6,
      name: "Dark Chocolate Bar",
      stock: 15,
      price: 4,
      status: "In Stock",
      image: "productImg1",
      description:
        "Rich and decadent dark chocolate bar with a smooth and velvety texture.",
    },
    {
      id: 7,
      name: "Vanilla Extract",
      stock: 3,
      price: 8,
      status: "Low Stock",
      image: "productImg1",
      description: "High-quality vanilla extract for baking and cooking.",
    },
    {
      id: 8,
      name: "Coconut Milk",
      stock: 0,
      price: 3,
      status: "Out of Stock",
      image: "productImg1",
      description:
        "Creamy and rich coconut milk for soups, curries, and desserts.",
    },
    {
      id: 9,
      name: "Cinnamon Sticks",
      stock: 7,
      price: 6,
      status: "In Stock",
      image: "productImg1",
      description: "Fresh and aromatic cinnamon sticks for baking and cooking.",
    },
    {
      id: 10,
      name: "Espresso Coffee",
      stock: 5,
      price: 10,
      status: "In Stock",
      image: "productImg1",
      description: "Strong and rich espresso coffee for a perfect shot.",
    },
  ];

  const getStockColor = (stock) => {
    if (stock === 0) return "text-red-600";
    if (stock <= 2) return "text-yellow-600";
    return "text-green-600";
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddItem = () => {
    setShowAddModal({
      state: true,
      productData: {
        ID: "",
        ProductName: "",
        Rank: "",
        Category: "",
        Stock: "",
        OfDaysSupply: "",
        BuyPrice: "",
        SellPrice: "",
        StockCode: "",
        SupplierID: "",
        SupplierName: "",
      },
      actionType: "Add",
    });
  };

  return (
    <Layout>
      <div className="w-full p-3 sm:p-4 lg:p-6">
        {/* Combined Header and Products Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6">
          {/* Search and Add Product Section */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <select className="font-[500] mainFont px-2 sm:px-4 py-1.5 sm:py-2 border-0 outline-none text-xs sm:text-sm lg:text-base bg-transparent">
                <option>All Items</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
              <div className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 bg-[var(--counterBg-color)] rounded-full flex justify-center items-center min-w-[1.25rem] min-h-[1.25rem] sm:min-w-[1.5rem] sm:min-h-[1.5rem]">
                <p className="text-xs sm:text-xs md:text-sm font-medium text-white">
                  {items.length}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto order-2 sm:order-1">
                <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                  <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-8 sm:pl-10 pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={handleAddItem}
                className="px-3 sm:px-4 lg:px-5 py-1.5 sm:py-1.5 lg:py-1.5 rounded-full bg-[var(--button-color1)] flex justify-center items-center gap-1.5 sm:gap-2 lg:gap-4 text-white mainFont font-[500] cursor-pointer text-xs sm:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear order-1 sm:order-2 whitespace-nowrap"
              >
                Add Items <PluseIcon />
              </button>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 pt-3 sm:pt-4 lg:pt-4 border-t border-gray-100">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleProductClick(item)}
                  className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex flex-col items-center space-y-2 sm:space-y-3 mb-3">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={ProductImg1}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/80";
                        }}
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 text-center text-xs sm:text-sm line-clamp-2">
                      {item.name}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center mt-2 gap-2">
                    <div>
                      <p
                        className={`text-xs sm:text-sm font-medium ${getStockColor(
                          item.stock
                        )}`}
                      >
                        {item.stock} in stock
                      </p>
                      <p className="text-base sm:text-lg font-semibold text-gray-800">
                        ${item.price}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded whitespace-nowrap">
                      {item.status}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle edit action
                    }}
                    className="mt-3 w-full bg-gray-600 hover:bg-gray-700 text-white font-[500] mainFont py-1.5 sm:py-2 px-3 sm:px-4 rounded-full flex items-center justify-center space-x-1 sm:space-x-2 transition-colors shadow-sm text-xs sm:text-sm"
                  >
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Edit</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500 text-sm sm:text-base">
                No items found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product View Modal */}
      {selectedProduct && (
        <ProductViewModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}

      {/* Add Product Modal */}
      {showAddModal.state && showAddModal.productData && (
        <AddProductModel
          productData={showAddModal.productData}
          setShowModel={setShowAddModal}
          actionType={showAddModal.actionType}
        />
      )}
    </Layout>
  );
};

export default InventorySeller;
