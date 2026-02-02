import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "../../components/UI/Loading/Loading";

const AdminRouteGuard = () => {
  const user = useSelector((state) => state.loggedUser);

  // If user data is not yet loaded, show loading
  if (!user) {
    console.log('loading admin route guard',user)
    return <Loading />;
  }

  // Check if user role is admin
  // The API returns user_type which can be "admin", "staff", or "employee"
  const isAdmin =
    user.role === "admin" ||
    user.userType === "admin" ||
    user.user_type === "admin";

  // If user is admin, allow access to admin routes
  // Otherwise, redirect to seller dashboard
  return isAdmin ? <Outlet /> : <Navigate to="/seller/dashboard" replace />;
};

export default AdminRouteGuard;
