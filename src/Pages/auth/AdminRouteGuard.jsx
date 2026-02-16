import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "../../components/UI/Loading/Loading";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const AdminRouteGuard = () => {
  const user = useSelector((state) => state.loggedUser);
  const [userType, setUserType] = useState(null);
  useEffect(() => {
    const userType = Cookies.get("u_type");

    setUserType(userType);
  }, [user]);

  // If user data is not yet loaded, show loading
  if (!userType) {
    // console.log("loading admin route guard", user);
    return <Loading />;
  }

  // Check if user role is admin
  // The API returns user_type which can be "admin", "staff", or "employee"
  const isAdmin =
    userType === "admin" || userType === "admin" || userType === "admin";

  // If user is admin, allow access to admin routes
  // Otherwise, redirect to seller dashboard
  return isAdmin ? <Outlet /> : <Navigate to="/seller/dashboard" replace />;
};

export default AdminRouteGuard;
