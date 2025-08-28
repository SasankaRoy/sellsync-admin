import React, { useState } from 'react';
import { Search, Bell, BarChart3, Package, TrendingUp, CreditCard, Camera, Eye, Edit, Home, PieChart, Users, Settings, Menu } from 'lucide-react';
import ProductImg1 from "../../assets/images/ProductImg1.png";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('transactions');

  const stats = [
    {
      title: "Total Sales Today",
      value: "$4,567",
      subtitle: "32 Transactions",
      icon: <BarChart3 className="w-8 h-8" />,
      bgColor: "bg-blue-500",
      textColor: "text-blue-600"
    },
    {
      title: "Best-Selling Product",
      value: "Espresso Coffee",
      subtitle: "15 sold",
      icon: <Package className="w-8 h-8" />,
      bgColor: "bg-orange-400",
      textColor: "text-orange-600"
    },
    {
      title: "Total Revenue Weekly",
      value: "$34,455",
      subtitle: "+12.5% from last week",
      icon: <TrendingUp className="w-8 h-8" />,
      bgColor: "bg-green-500",
      textColor: "text-green-600"
    },
    {
      title: "Top Payment Method",
      value: "Credit Card",
      subtitle: "78% of transactions",
      icon: <CreditCard className="w-8 h-8" />,
      bgColor: "bg-purple-500",
      textColor: "text-purple-600"
    }
  ];

  const transactions = [
    { contact: "Andy Smith", id: "TXN202403", method: "Credit card", time: "Mar 2, 5:20 PM", amount: "$150", status: "Complete" },
    { contact: "Andy Smith", id: "TXN202403", method: "Credit card", time: "Mar 2, 5:20 PM", amount: "$35", status: "Refund" },
    { contact: "Andy Smith", id: "TXN202403", method: "Credit card", time: "Mar 2, 5:20 PM", amount: "$435", status: "Complete" }
  ];

  const stocks = [
    { name: "Whipped Cream", stock: 0, price: 5, status: "Out of Stock", image: "productImg1" },
    { name: "Budweiser Magnum", stock: 4, price: 2, status: "Current Stock", image: "productImg1" },
    { name: "Mocha Beans", stock: 2, price: 20, status: "Current Stock", image: "productImg1" },
    { name: "Almonds", stock: 4, price: 15, status: "Current Stock", image: "productImg1" }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Complete': return 'bg-green-100 text-green-800';
      case 'Refund': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockColor = (stock) => {
    if (stock === 0) return 'text-red-600';
    if (stock <= 2) return 'text-yellow-600';
    return 'text-green-600';
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-16 bg-blue-600">
          <span className="text-white text-xl font-bold">Dashboard</span>
        </div>
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            <a href="#" className="bg-blue-100 text-blue-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              <Home className="mr-3 h-5 w-5" />
              Home
            </a>
            <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              <PieChart className="mr-3 h-5 w-5" />
              Analytics
            </a>
            <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              <Users className="mr-3 h-5 w-5" />
              Customers
            </a>
            <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              <Package className="mr-3 h-5 w-5" />
              Inventory
            </a>
            <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden -ml-2 mr-2 h-10 w-10 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">JS</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Hello John Smith</h1>
                    <p className="text-gray-600">Welcome Back!</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="relative p-2 text-gray-600 hover:text-gray-900">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.bgColor.replace('500', '100')} ${stat.textColor}`}>
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Tab Content - Single Wrapper with Integrated Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Tabs Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('transactions')}
                    className={`px-6 py-3 font-medium text-sm rounded-md transition-all duration-200 ${
                      activeTab === 'transactions' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Recent Transactions
                  </button>
                  <button
                    onClick={() => setActiveTab('stocks')}
                    className={`px-6 py-3 font-medium text-sm rounded-md transition-all duration-200 ${
                      activeTab === 'stocks' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Stocks
                  </button>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors shadow-sm">
                  <Camera className="h-5 w-5" />
                  <span>Scan Products</span>
                </button>
              </div>
              {activeTab === 'transactions' && (
                <div>
                  <div className="overflow-x-auto">
                    <div className="divide-y divide-gray-200">
                      {currentTransactions.map((transaction, index) => (
                        <div key={index} className="grid grid-cols-8 gap-6 p-4 hover:bg-gray-50 transition-colors items-center">
                          <div>{transaction.contact}</div>
                          <div>{`#${transaction.id}`}</div>
                          <div>{transaction.method}</div>
                          <div>{transaction.time}</div>
                          <div>{transaction.amount}</div>
                          {transaction.status === 'Complete' && (
                            <div>
                              <button className="bg-green-400 hover:bg-green-500 text-white py-1 px-4 rounded-full">
                                Complete
                              </button>
                            </div>
                          )}
                          {transaction.status === 'Refund' && (
                            <div>
                              <button className="bg-red-400 hover:bg-red-500 text-white py-1 px-4 rounded-full">
                                Refund
                              </button>
                            </div>
                          )}
                          <div>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-full whitespace-nowrap">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 flex justify-center items-center space-x-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span>{currentPage} of {totalPages}</span>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'stocks' && (
                <div>
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Stocks</h2>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">See All</button>
                  </div>
                  <div className="p-6 space-y-4">
                    {stocks.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                            <img 
                              src={ProductImg1} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/40";
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className={`font-bold text-lg ${getStockColor(item.stock)}`}>{item.stock}</p>
                            <p className="text-xs text-gray-500">{item.status}</p>
                            <p className="text-sm text-gray-600">${item.price}</p>
                          </div>
                          <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;