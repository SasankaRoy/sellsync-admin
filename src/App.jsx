import React, { useEffect } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdminDashboard } from "./Pages/admin/AdminDashboard/AdminDashboard";
import { Sale } from "./Pages/admin/sales/Sale";
import { Inventory } from "./Pages/admin/Inventory/Inventory";
import { Reports } from "./Pages/admin/Reports/Reports";
import { POS } from "./Pages/admin/Pos/POS";
import { Settings } from "./Pages/admin/Settings/Settings";
import { Help } from "./Pages/admin/Help/Help";
import { Rewards } from "./Pages/admin/Rewards/Rewards";
import { Payroll } from "./Pages/admin/Payroll/Payroll";
import { Customer } from "./Pages/admin/Customer/Customer";
import { Employee } from "./Pages/admin/Employee/Employee";
import { ItemsList } from "./Pages/admin/ItemsList/ItemsList";
import { Category } from "./Pages/admin/Category/Category";
import { Supplier } from "./Pages/admin/Suppliers/Supplier";
import { Orders } from "./Pages/admin/Orders/Orders";
import { Receive } from "./Pages/admin/Receive/Receive";
import { ItemReport } from "./Pages/admin/ItemReport/ItemReport";
import { Login } from "./Pages/auth/Login";
import { Register } from "./Pages/auth/Register";
import { Journal } from "./Pages/admin/Pos/Journals";
import { Deals } from "./Pages/admin/Pos/Deals";
import { ReceiptSettings } from "./Pages/admin/Pos/ReceiptSettings";
import { CustomerDisplaySetting } from "./Pages/admin/Pos/CustomerDisplaySetting";
import { EDIFile } from "./Pages/admin/Pos/EDIFile";
import { CategoriesPOS } from "./Pages/admin/Pos/POSCategories";
import { Vendors } from "./Pages/admin/Pos/Vendors";
import { Fule } from "./Pages/admin/Pos/Fule";
import { DeviceAndLocation } from "./Pages/admin/Pos/DeviceAndLocation";
import { Task } from "./Pages/admin/Tasks/Task";
import { ViewTask } from "./Pages/admin/Tasks/ViewTask";
import { InventoryLottery } from "./Pages/admin/Lottery/InventoryLottery";
import { ScanTickets } from "./Pages/admin/Lottery/ScanTickets";
import { SalesReport } from "./Pages/admin/Lottery/SalesReport";
import { LoyaltyDeals } from "./Pages/admin/Loyalty/LoyaltyDeals";
import { Purchase } from "./Pages/admin/Daily/Purchase";
import { ExpenseList } from "./Pages/admin/Daily/Expense";
import RouteGuard from "./Pages/auth/RouteGuard";
import AdminRouteGuard from "./Pages/auth/AdminRouteGuard";
import { Loyaltyreports } from "./Pages/admin/Loyalty/Loyaltyreports";
import { Groups } from "./Pages/admin/Groups/Groups";
import SellerDashboard from "./Pages/seller/SellerDashboard";
import Sales from "./Pages/seller/Sales";

import InventorySeller from "./Pages/seller/Inventory";
import SettingSeller from "./Pages/seller/setting";
import { SalePoint } from "./Pages/seller/SalePoint";
import { TaskDetails } from "./Pages/seller/TaskDetails";
import { AllSalesReports } from "./Pages/seller/AllSalesReports";
import CustomerScreenPage from "./Pages/seller/CustomerScreenPage";
import NewLogin from "./Pages/auth/NewLogin";
import Taxes from "./Pages/admin/Daily/GlobalTax";

function App() {
  // Mirror ringUps into localStorage for customer screen tab to consume
  const ringUps = useSelector((state) => state.ringUps);

  useEffect(() => {
    try {
      localStorage.setItem("ringUpsSnapshot", JSON.stringify(ringUps || []));
    } catch (e) {
      console.error(e);
      // ignore storage errors to avoid impacting flow
    }
  }, [ringUps]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<RouteGuard />}>
            {/* Admin Routes - Only accessible to admin users */}
            <Route element={<AdminRouteGuard />}>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/admin/sale" element={<Sale />} />
              <Route path="/admin/inventory/overview" element={<Inventory />} />
              <Route
                path="/admin/inventory/item-lists"
                element={<ItemsList />}
              />
              <Route path="/admin/inventory/category" element={<Category />} />
              <Route path="/admin/inventory/groups" element={<Groups />} />

              <Route path="/admin/inventory/suppliers" element={<Supplier />} />
              <Route path="/admin/inventory/receive" element={<Receive />} />
              <Route path="/admin/inventory/order" element={<Orders />} />
              <Route path="/admin/reports" element={<Reports />} />
              <Route path="/admin/customers" element={<Customer />} />
              <Route path="/admin/employees" element={<Employee />} />

              <Route path="/admin/pos" element={<POS />} />
              <Route path="/admin/pos/journals" element={<Journal />} />
              <Route path="/admin/pos/deals" element={<Deals />} />
              <Route
                path="/admin/pos/receipt-settings"
                element={<ReceiptSettings />}
              />
              <Route
                path="/admin/pos/customer-display-setting"
                element={<CustomerDisplaySetting />}
              />
              <Route path="/admin/pos/edi-file" element={<EDIFile />} />
              <Route
                path="/admin/pos/pos-categorries"
                element={<CategoriesPOS />}
              />
              <Route path="/admin/pos/vendors" element={<Vendors />} />
              <Route path="/admin/pos/fuels" element={<Fule />} />
              <Route
                path="/admin/pos/device-and-location"
                element={<DeviceAndLocation />}
              />

              {/* Task Routes */}
              <Route path="/admin/tasks" element={<Task />} />
              <Route
                path="/admin/tasks/task-details/:tid"
                element={<ViewTask />}
              />

              <Route path="/admin/daily/purchase" element={<Purchase />} />
              <Route path="/admin/daily/expense" element={<ExpenseList />} />
              <Route path="/admin/daily/taxes" element={<Taxes />} />

              <Route
                path="/admin/lottery/inventory"
                element={<InventoryLottery />}
              />
              <Route
                path="/admin/lottery/instant-scan-tickets"
                element={<ScanTickets />}
              />
              <Route
                path="/admin/lottery/sale-report"
                element={<SalesReport />}
              />
              <Route path="/admin/loyalty/deals" element={<LoyaltyDeals />} />
              <Route
                path="/admin/loyalty/reports"
                element={<Loyaltyreports />}
              />

              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/admin/help" element={<Help />} />
              <Route path="/admin/rewards" element={<Rewards />} />
              <Route path="/admin/payroll" element={<Payroll />} />
              <Route path="/admin/item-report/:id" element={<ItemReport />} />
            </Route>

            {/* Seller Routes - Protected by RouteGuard */}
            <Route path="/seller/dashboard" element={<SalePoint />} />
            <Route path="/seller/task-details/:id" element={<TaskDetails />} />
            <Route path="/seller/sales-report" element={<Sales />} />
            <Route path="/seller/reports" element={<AllSalesReports />} />
            <Route path="/seller/inventory" element={<InventorySeller />} />
            <Route path="/seller/settings" element={<SettingSeller />} />
          </Route>
          <Route
            path="/seller/customer-screen"
            element={<CustomerScreenPage />}
          />

          <Route path="/auth/old-login" element={<Login />} />
          <Route path="/auth/login" element={<NewLogin />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
