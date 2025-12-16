import { Search } from "lucide-react";
import React from "react";
// import ProductImg from "../../../assets/images/ProductImg1.png";
import ProductImg from "../../../../assets/images/ProductImg1.png";

export const SearchItemsInput = ({ 
  setIsKeyboardOpen, 
  input, 
  onchange,
  searchResults = [],
  isSearching = false,
  searchError = "",
  showSearchResults = false,
  onSelectProduct,
  setActiveInputField
}) => {
  return (
    <div className="w-[60%] flex-shrink-0 relative flex justify-center items-center gap-4 bg-(--secondary-color) p-2 rounded-full">
      <button className="p-2 flex justify-center items-center cursor-pointer">
        <Search size={20} />
      </button>
      <input
        type="text"
        onFocus={(e) => {
          setIsKeyboardOpen(true);
          setActiveInputField && setActiveInputField({ type: 'search', itemId: null });
        }}
        onClick={(e) => {
          e.stopPropagation();
          // Ensure active field is set even if keyboard is already open
          setIsKeyboardOpen(true);
          setActiveInputField && setActiveInputField({ type: 'search', itemId: null });
        }}
        // onBlur={() => setIsKeyboardOpen(false)}
        value={input}
        onChange={(e) => {
          console.log(e.target.value);
          onchange(e.target.value);
        }}
        placeholder="Search items, categories,Stocks etc..."
        className="w-full outline-none text-[1dvw] mainFont"
      />
      
      {/* Search Results Dropdown */}
      {showSearchResults && input && (
        <div className="absolute top-[105%] left-0 w-full min-h-[10vh] max-h-[40vh] overflow-auto flex flex-col gap-1 bg-(--secondary-color) shadow-lg border border-(--border-color) rounded-xl z-50 p-3">
          {searchError && (
            <p className="text-center mainFont text-gray-400 text-[1dvw]">
              {searchError}
            </p>
          )}

          {isSearching ? (
            <div className="w-full py-4">
              <p className="text-center mainFont text-gray-400 animate-pulse duration-200 ease-linear text-[1dvw]">
                Searching items...
              </p>
            </div>
          ) : (
            <>
              {searchResults.length === 0 && !searchError ? (
                <p className="text-center mainFont text-gray-400 py-4 text-[1dvw]">
                  No items found
                </p>
              ) : (
                <>
                  {searchResults.map((product, idx) => (
                    <button
                      key={product.id || product._id || idx}
                      className="w-full py-3 px-3 cursor-pointer hover:bg-(--button-color1)/20 transition-all duration-200 ease-linear bg-(--secondary-color)/50 border-b border-(--border-color) mainFont font-semibold rounded text-start flex justify-start items-center gap-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct && onSelectProduct(product);
                      }}
                    >
                      <img
                        src={product.image || product.product_image || ProductImg}
                        className="h-[3dvw] w-[3dvw] shrink-0 object-cover rounded"
                        alt={product.name || product.product_name}
                        onError={(e) => {
                          e.target.src = ProductImg;
                        }}
                      />
                      <div className="w-full flex flex-col">
                        <p className="line-clamp-1 text-[1dvw] font-semibold">
                          {product.name || product.product_name}
                        </p>
                        <p className="text-[0.8dvw] text-(--paraText-color)">
                          ${parseFloat(product.sale_price || product.price || 0).toFixed(2)}
                          {product.stock !== undefined && (
                            <span className="ml-2">• Stock: {product.stock}</span>
                          )}
                        </p>
                      </div>
                    </button>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
