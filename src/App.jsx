import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { AdminDashboard } from "./Pages/admin/AdminDashboard/AdminDashboard";
import { Sale } from "./Pages/admin/sales/Sale";
import { Inventory } from "./Pages/admin/Inventory/Inventory";
import { Reports } from "./Pages/admin/Reports/Reports";
import { Users } from "./Pages/admin/Users/Users";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
