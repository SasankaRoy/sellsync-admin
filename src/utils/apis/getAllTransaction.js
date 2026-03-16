import axiosInstance from "../axios-interceptor";

export const getAllTransactions = async ({
  storeId,
  method,
  status,
  page,
  limit,
  search,
  day, userType
}) => {
  try {
    const getTransaction = await axiosInstance.get(
      `api/v1/bills/transaction/list?storeId=${storeId}&userType=${userType}&method=${method}&day=${day}&status=${status}&search=${search}&page=${page}&limit=${limit}`
    );
    if (getAllTransactions.data && getAllTransactions.status === 200) {
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

export const getRefund = async (billId) => {
  try {
    const reqRefund = await axiosInstance.post('/api/v1/bills/transaction/refund', {
      billId
    });

    if (reqRefund.status === 200 && reqRefund.data) {
      return reqRefund.data || ''
    }
    return reqRefund.data || ''
  } catch (error) {
    console.error(error);
    return error.message || error.response.data.message || 'Failed to request for refund'
  }
}
