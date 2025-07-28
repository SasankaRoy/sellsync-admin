import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookies";
import { Navigate, Outlet } from "react-router-dom";
const RouteGuard = () => {
  const token = Cookies.getItem("authToken");
  const { data, isLoading, error } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      try {
      } catch (error) {
        console.log(error?.response.data.error);
        return error?.response.date.error;
      }
    },
  });

  return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
};
export default RouteGuard;
