import axiosInstance from "../axios-interceptor";

export const getAllTransactions = async ({
  storeId,
  method,
  status,
  page,
  limit,
  search,
  day
}) => {
  try {
    const getTransaction = await axiosInstance.get(
      `api/v1/bills/transaction/list?storeId=${storeId}&method=${method}&day=${day}&status=${status}&search=${search}&page=${page}&limit=${limit}`
    );
    if ((getAllTransactions.data && getAllTransactions.status === 200) || 201) {
      return getTransaction.data || {};
    }
    return getTransaction.data || {};
  } catch (error) {
    console.log("error in getAllTransaction api", error);
    return (
      error.message ||
      error.response.data.message ||
      "Failed to fetch transactions list"
    );
  }
};
