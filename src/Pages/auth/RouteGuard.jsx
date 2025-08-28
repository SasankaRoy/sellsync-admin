import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../../utils/axios-interceptor";
import { useDispatch } from "react-redux";
import { setLogginUser } from "../../Redux/UserSlice";
import { toast } from "react-toastify";
import { Loading } from "../../components/UI/Loading/Loading";
import { useEffect } from "react";
const RouteGuard = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("authToken");
  const userId = Cookies.get("u_id");
  const userType = Cookies.get("u_type");

  const { data, isLoading, error } = useQuery({
    queryKey: ["login", userId, userType],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/v1/user/details/${userId}/${userType}`
      );
      if (res.status !== 200 || !res.data) {
        throw new Error("Invalid response from server");
      }
      return res.data;
    },
    enabled: !!userId && !!userType,
  });

  useEffect(() => {
    if (data?.userDetails) {
      dispatch(setLogginUser(data.userDetails));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Un-authorised ! Please Login ");
    }
  }, [error]);

  return token ? (
    <>{isLoading ? <Loading /> : <Outlet />}</>
  ) : (
    <Navigate to="/auth/login" replace />
  );
};
export default RouteGuard;
