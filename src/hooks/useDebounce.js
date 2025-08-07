import { useCallback, useRef } from "react";
import axiosInstance from "../utils/axios-interceptor";

const getItemData = async (queryString) => {
  try {
    const reqData = await axiosInstance.post("api/v1/product/list", {
      search_text: queryString,
    });
    if (reqData.status === 200 && reqData.data) {
      console.log(reqData?.data?.results);
      return reqData?.data?.results;
    }
  } catch (error) {
    console.error(error, "from debouncing function");
    return error?.message || "Something went wrong";
  }
};

export const useDeboune = (cb, delay = 1000) => {
  const timeoutRef = useRef(null);

  const debouceCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const result = await getItemData(args[0]);
      if (result.error) {
        console.error(result.error);
        return cb([], result?.error || "No item found");
      }
      cb(result, null);
    }, delay);
  });
  return debouceCallback;
};
