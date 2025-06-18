import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard />} exact />
          <Route path="/admin/sale" element={<Sale />} exact />
          <Route path="/admin/inventory/overview" element={<Inventory />} exact />
          <Route path="/admin/inventory/item-lists" element={<ItemsList />} exact />
          <Route path="/admin/inventory/category" element={<Category />} exact />
          <Route path="/admin/inventory/suppliers" element={<Supplier />} exact />
          <Route path="/admin/inventory/receive" element={<Receive />} exact />
          <Route path="/admin/inventory/order" element={<Orders />} exact />
          <Route path="/admin/reports" element={<Reports />} exact />
          <Route path="/admin/customers" element={<Customer />} exact />
          <Route path="/admin/employees" element={<Employee />} exact />
          <Route path="/admin/pos" element={<POS />} exact />
          <Route path="/admin/settings" element={<Settings />} exact />
          <Route path="/admin/help" element={<Help />} exact />
          <Route path="/admin/rewards" element={<Rewards />} exact />
          <Route path="/admin/payroll" element={<Payroll />} exact />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
