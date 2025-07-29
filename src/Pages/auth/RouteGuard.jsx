import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../../utils/axios-interceptor";
import { useDispatch } from "react-redux";
import { setLogginUser } from "../../Redux/UserSlice";
import { toast } from "react-toastify";
import { Loading } from "../../components/UI/Loading/Loading";
const RouteGuard = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("authToken");
  const userId = Cookies.get("u_id");
  const userType = Cookies.get("u_type");

  console.log(userId, userType);
  const { data, isLoading, error } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      try {
        const reqUserData = await axiosInstance.get(
          `/api/v1/user/details/${userId}/${userType}`
        );

        if (reqUserData.status === 200 && reqUserData.data) {
          dispatch(
            setLogginUser({
              ...reqUserData?.data?.userDetails,
            })
          );
          return reqUserData.data;
        }
      } catch (error) {
        console.log(error?.response.data.error);
        toast.error(error?.response.data.error || "Something went wrong !");
        return error?.response.date.error;
      }
    },
  });
  console.log("running every time");
  return token ? (
    <>{isLoading ? <Loading /> : <Outlet />}</>
  ) : (
    <Navigate to="/auth/login" replace />
  );
};
export default RouteGuard;
