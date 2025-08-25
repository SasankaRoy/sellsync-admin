import React, { useEffect } from 'react';
import { X, Package, AlertTriangle } from 'lucide-react';
import { NotificationIcon } from '../../../assets/Svgs/AllSvgs';
import ProductImg1 from '../../../assets/images/ProductImg1.png';

const StockNotificationDrawer = ({ isOpen, onClose, onNotificationCountChange }) => {
  
  const stockData = [
    {
      id: 1,
      name: 'Budwiser Magnum 750ML',
      status: 'out_of_stock',
      image: ProductImg1,
      quantity: 0
    },
    {
      id: 2,
      name: 'Budwiser Magnum 750ML',
      status: 'out_of_stock',
      image: ProductImg1,
      quantity: 0
    },
    {
      id: 3,
      name: 'Budwiser Magnum 750ML',
      status: 'out_of_stock',
      image: ProductImg1,
      quantity: 0
    },
    {
      id: 4,
      name: 'Corona Extra 330ML',
      status: 'low_stock',
      image: ProductImg1,
      quantity: 3
    },
    {
      id: 5,
      name: 'Heineken 500ML',
      status: 'low_stock',
      image: ProductImg1,
      quantity: 2
    }
  ];

  const outOfStockItems = stockData.filter(item => item.status === 'out_of_stock');
  const lowStockItems = stockData.filter(item => item.status === 'low_stock');
  const totalNotifications = outOfStockItems.length + lowStockItems.length;

  // Update notification count when component mounts or items change
  useEffect(() => {
    if (onNotificationCountChange) {
      onNotificationCountChange(totalNotifications);
    }
  }, [totalNotifications, onNotificationCountChange]);

  const StockItem = ({ item }) => (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 mb-2">
      <div className="w-12 h-12 flex-shrink-0 xs:w-10 xs:h-10">
        <img
          className="w-full h-full object-cover rounded"
          src={item.image}
          alt={item.name}
        />
      </div>
      <div className="flex-1">
        <h4 className="mainfont font-medium text-gray-800 text-[3.5dvw] xs:text-[3dvw] sm:text-[2.5dvw] md:text-[1.1rem]">
          {item.name}
        </h4>
        <p className={`parafont font-medium ${
          item.status === 'out_of_stock' 
            ? 'text-[var(--Negative-color)]' 
            : 'text-[var(--counterBg-color)]'
        } text-[3dvw] xs:text-[2.7dvw] sm:text-[2.2dvw] md:text-[0.9rem]`}>
          {item.status === 'out_of_stock' 
            ? 'Out Of Stock' 
            : `Low Stock (${item.quantity} left)`
          }
        </p>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-md bg-gray-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-4 sm:p-6 bg-white border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative p-1.5 sm:p-2 bg-blue-100 rounded-lg">
              <NotificationIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              {(outOfStockItems.length + lowStockItems.length) > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                  {outOfStockItems.length + lowStockItems.length}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">Stock Alerts</h2>
              <p className="text-xs sm:text-sm text-gray-500">
                {outOfStockItems.length + lowStockItems.length} notifications
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X size={20} className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 pb-4">
            {/* Out of Stock Section */}
            {outOfStockItems.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <AlertTriangle className="text-[var(--Negative-color)] w-4 h-4 sm:w-5 sm:h-5" />
                  <h3 className="mainfont font-semibold text-[var(--Negative-color)] text-sm sm:text-base">Out Of Stock</h3>
                  <span className="bg-red-100 text-[var(--Negative-color)] text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full font-medium">
                    {outOfStockItems.length}
                  </span>
                </div>
                {outOfStockItems.map((item) => (
                  <StockItem key={item.id} item={item} />
                ))}
              </div>
            )}

            {/* Low Stock Section */}
            {lowStockItems.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Package className="text-[var(--counterBg-color)] w-4 h-4 sm:w-5 sm:h-5" />
                  <h3 className="mainfont font-semibold text-[var(--counterBg-color)] text-sm sm:text-base">Low Stocks</h3>
                  <span className="bg-orange-100 text-[var(--counterBg-color)] text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full font-medium">
                    {lowStockItems.length}
                  </span>
                </div>
                {lowStockItems.map((item) => (
                  <StockItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        {(outOfStockItems.length > 0 || lowStockItems.length > 0) && (
          <div className="border-t border-gray-200 p-3 sm:p-4 bg-white flex-shrink-0">
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full bg-[var(--button-color1)] text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium text-[3.5dvw] xs:text-[3dvw] sm:text-[2.5dvw] md:text-base transition-colors duration-200">
                Restock All Items
              </button>
              <button className="w-full bg-[var(--button-color3)] text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium text-[3.5dvw] xs:text-[3dvw] sm:text-[2.5dvw] md:text-base transition-colors duration-200">
                Mark as Reviewed
              </button>
            </div>
          </div>
        )}
      </div>   
    </div>
  );
};

export default StockNotificationDrawer;