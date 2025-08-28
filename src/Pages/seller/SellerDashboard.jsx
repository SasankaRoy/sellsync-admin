import React, { useState } from 'react';
import { Search, Bell, BarChart3, Package, TrendingUp, CreditCard, Camera, Eye, Edit, Home, PieChart, Users, Settings, Menu, Download, ArrowUpRight, DollarSign, ShoppingCart } from 'lucide-react';
import ProductImg1 from "../../assets/images/ProductImg1.png";
import Layout from '../../components/common/Layout/Layout';
import { Overviewcards } from "../../components/common/Overviewcards/Overviewcards";
import { NetsaleAmountIcon, OverviewCardIcon1, RefundIcon } from "../../assets/Svgs/AllSvgs";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('transactions');

  const transactions = [
    { contact: "Andy Smith", id: "TXN202403", method: "Credit card", time: "Mar 2, 5:20 PM", amount: "$150", status: "Complete" },
    { contact: "Sarah Johnson", id: "TXN202404", method: "Debit card", time: "Mar 2, 4:35 PM", amount: "$85", status: "Complete" },
    { contact: "Mike Wilson", id: "TXN202405", method: "Cash", time: "Mar 2, 3:45 PM", amount: "$35", status: "Refund" },
    { contact: "Emily Davis", id: "TXN202406", method: "Credit card", time: "Mar 2, 2:20 PM", amount: "$220", status: "Complete" },
    { contact: "John Brown", id: "TXN202407", method: "Digital wallet", time: "Mar 2, 1:15 PM", amount: "$435", status: "Complete" },
    { contact: "Lisa Garcia", id: "TXN202408", method: "Credit card", time: "Mar 2, 12:30 PM", amount: "$95", status: "Complete" },
    { contact: "David Martinez", id: "TXN202409", method: "Debit card", time: "Mar 2, 11:45 AM", amount: "$180", status: "Complete" },
    { contact: "Jennifer Lee", id: "TXN202410", method: "Cash", time: "Mar 2, 10:20 AM", amount: "$65", status: "Refund" }
  ];

  const stocks = [
    { name: "Whipped Cream", stock: 0, price: 5, status: "Out of Stock", image: "productImg1" },
    { name: "Budweiser Magnum", stock: 4, price: 2, status: "Current Stock", image: "productImg1" },
    { name: "Mocha Beans", stock: 2, price: 20, status: "Current Stock", image: "productImg1" },
    { name: "Almonds", stock: 4, price: 15, status: "Current Stock", image: "productImg1" },
    { name: "Organic Honey", stock: 8, price: 12, status: "In Stock", image: "productImg1" },
    { name: "Dark Chocolate Bar", stock: 15, price: 4, status: "In Stock", image: "productImg1" },
    { name: "Vanilla Extract", stock: 3, price: 8, status: "Low Stock", image: "productImg1" },
    { name: "Coconut Milk", stock: 0, price: 3, status: "Out of Stock", image: "productImg1" },
    { name: "Cinnamon Sticks", stock: 7, price: 6, status: "In Stock", image: "productImg1" }
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

  // Action buttons component for transactions table
  const TransactionActionBtns = ({ data }) => {
    const handleView = () => {
      console.log('View transaction:', data);
      // Add view logic here
    };

    return (
      <button 
        onClick={handleView}
        className="text-blue-600 hover:text-blue-900 font-medium text-sm"
      >
        View Details
      </button>
    );
  };

  return (
    <Layout>
      <div className="w-full">
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg sm:text-xl md:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Seller Dashboard
            </h3>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Overviewcards 
            cardTitle="Total Sales Today"
            cardValue="$4,567"
            percent="32"
            subtitle="32 Transactions"

            icon={<OverviewCardIcon1 />}
          />
          <Overviewcards 
            cardTitle="Best Selling Product"
            cardValue="Espresso Coffee"
            percent="15"
            subtitle="15 sold"
            icon={<RefundIcon />}
          />
          <Overviewcards 
            cardTitle="Total Revenue Weekly"
            cardValue="$34,455"
            percent="12"
            subtitle="+12% from last week"
            icon={<NetsaleAmountIcon />}
          />
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Tabs Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 border-b border-gray-200">
            <div className="bg-[#E6E6E6] p-1.5 rounded-full w-full sm:w-auto mb-4 sm:mb-0 flex overflow-x-auto flex-shrink-0">
              <button
                onClick={() => setActiveTab('transactions')}
                className={`${
                  activeTab === 'transactions'
                    ? 'bg-white text-black'
                    : 'bg-transparent text-[#333333]/70'
                } border-none outline-none px-6 py-1.5 text-sm cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear whitespace-nowrap`}
              >
                Recent Transactions
              </button>
              <button
                onClick={() => setActiveTab('stocks')}
                className={`${
                  activeTab === 'stocks'
                    ? 'bg-white text-black'
                    : 'bg-transparent text-[#333333]/70'
                } border-none outline-none px-6 py-1.5 text-sm cursor-pointer rounded-full font-semibold transition-all duration-300 ease-linear whitespace-nowrap`}
              >
                Stocks
              </button>
            </div>
            <button className="bg-[var(--button-color1)]  text-white font-semibold py-2.5 px-6 rounded-full flex items-center justify-center space-x-2 transition-colors shadow-sm whitespace-nowrap">
              <Camera className="h-4 w-4" />
              <span>Scan Products</span>
            </button>
          </div>

          {/* Tab Panels */}
          {activeTab === 'transactions' && (
            <div className="w-full border border-gray-200 rounded-lg">
              {/* Table Header Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-3 px-4 shrink-0 gap-3 sm:gap-0">
                <div className="flex justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
                  <select className="font-medium px-4 py-2 border border-gray-300 rounded-lg outline-none text-sm lg:text-base bg-white">
                    <option>All Transactions</option>
                    <option>Completed</option>
                    <option>Refund</option>
                    <option>Pending</option>
                  </select>
                  <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 bg-[var(--counterBg-color)] rounded-full flex justify-center items-center min-w-[1.5rem] min-h-[1.5rem] sm:min-w-[1.75rem] sm:min-h-[1.75rem] md:min-w-[2rem] md:min-h-[2rem]">
                    <p className="text-xs sm:text-xs md:text-sm font-medium text-white">
                      {transactions.length}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-4 justify-between items-center flex-wrap">
                  <button className="px-4 sm:px-5 py-1.5 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 text-white font-medium cursor-pointer text-sm transition-all duration-300 ease-linear">
                    Export CSV <Download size={16} />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <div className="min-w-[900px]">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-[180px]">
                          Payer Name
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-[150px]">
                          Transaction ID
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-[150px]">
                          Payment Method
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-[150px]">
                          Time
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-[100px]">
                          Amount
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-[120px]">
                          Status
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-[150px]">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentTransactions.map((transaction, index) => (
                        <tr key={index} className="hover:bg-[#f5f8ff] transition-colors duration-150">
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {transaction.contact}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            #{transaction.id}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.method}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.time}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {transaction.amount}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                            <TransactionActionBtns data={transaction} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastItem, transactions.length)}
                      </span>{' '}
                      of <span className="font-medium">{transactions.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {/* Page Numbers */}
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === pageNumber
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stocks' && (
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {stocks.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-center space-y-3 mb-3">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
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
                      <h3 className="font-medium text-gray-900 text-center">{item.name}</h3>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <p className={`text-base font-medium ${getStockColor(item.stock)}`}>
                          {item.stock} in stock
                        </p>
                        <p className="text-xl font-semibold text-gray-800">${item.price}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {item.status}
                      </span>
                    </div>
                    <button className="mt-3 w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-full flex items-center justify-center space-x-2 transition-colors shadow-sm text-sm">
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;