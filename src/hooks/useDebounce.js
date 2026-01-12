import { useCallback, useRef } from "react";
import axiosInstance from "../utils/axios-interceptor";
// "api/v1/product/list"

const getItemData = async (queryString, queryPath) => {
  try {
    const reqData = await axiosInstance.post(queryPath, {
      search_text: queryString,
    });
    if (reqData.status === 200 && reqData.data) {
      return reqData?.data?.results;
    }
  } catch (error) {
    console.error(error, "from debouncing function");
    return error?.message || "Something went wrong";
  }
};

const reqQtyUpdate = async (updateString, newQty) => {
  try {
    const billDetails = await axiosInstance.put(updateString, {
      qty: newQty,
    });
    if (billDetails.status === 200) {
      toast.success("Quantity updated successfully");
      return true;
    }
    return false;
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
      if (args[2] === "QTY_UPDATE") {
        await reqQtyUpdate(args[0], args[1]);
      }
      const result = await getItemData(args[0], args[1]);
      if (result.error) {
        console.error(result.error);
        return cb([], result?.error || "No item found");
      }
      cb(result, null);
    }, delay);
  });
  return debouceCallback;
};
