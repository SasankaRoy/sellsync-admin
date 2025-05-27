import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { AdminDashboard } from "./Pages/admin/AdminDashboard/AdminDashboard";
import { Sale } from "./Pages/admin/sales/Sale";
import { Inventory } from "./Pages/admin/Inventory/Inventory";
import { Reports } from "./Pages/admin/Reports/Reports";
import { Users } from "./Pages/admin/Users/Users";
import { POS } from "./Pages/admin/Pos/POS";
import { Settings } from "./Pages/admin/Settings/Settings";
import { Help } from "./Pages/admin/Help/Help";
import { Rewards } from "./Pages/admin/Rewards/Rewards";
import { Payroll } from "./Pages/admin/Payroll/Payroll";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard />} exact />
          <Route path="/admin/sale" element={<Sale />} exact />
          <Route path="/admin/inventory" element={<Inventory />} exact />
          <Route path="/admin/reports" element={<Reports />} exact />
          <Route path="/admin/users" element={<Users />} exact />
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
