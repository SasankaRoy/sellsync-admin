import Cookies from "js-cookies";
import { Navigate, Outlet } from "react-router-dom";
const RouteGuard = () => {
  
  const token = Cookies.getItem("session")  || true;

  return token ? <Outlet /> : <Navigate to="/auth/login" replace />
};
export default RouteGuard;
