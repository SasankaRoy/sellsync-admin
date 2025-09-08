import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios-interceptor";
import { toast } from "react-toastify";

export const useBulkDelete = () => {
  const queryClient = useQueryClient();
  let isDeleting;
  let queryKey;
  const BulkDelete = useMutation({
    mutationFn: async ({ path, idList, queryKey, isDeleting }) => {
      queryKey = queryKey;
      isDeleting = isDeleting;
      const reqBulkDelete = await axiosInstance.post(path, { ...idList });
      if (reqBulkDelete.status === 200 && reqBulkDelete.data) {
        return reqBulkDelete.data;
      }
      throw new Error(reqBulkDelete.data?.message || "Failed to add group");
    },
    onSuccess: (data) => {
      console.log("on Success", data);
      toast.success(data.message || "Deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
      return data;
    },
    onError: (error) => {
      console.error("on Error", error);
      toast.error(error.message || "Failed to Delete");
      return error;
    },
    onSettled: () => {
      console.log("on Settled", isDeleting);
      //   isDeleting(false);
    },
  });

  return BulkDelete;
};
