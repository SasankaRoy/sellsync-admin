import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { AdminDashboard } from "./Pages/admin/AdminDashboard/AdminDashboard";
import { Sale } from "./Pages/admin/sales/Sale";
import { Inventory } from "./Pages/admin/Inventory/Inventory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard />} exact />
          <Route path="/admin/sale" element={<Sale />} exact />
          <Route path="/admin/inventory" element={<Inventory />} exact />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
