import axios from "axios";

export const requestPrintBill = async (billPayload) => {
  try {
    console.log("🚀 ~ requestPrintBill ~ billPayload:", billPayload);
    const printBill = await axios.post(
      "http://localhost:5050/api/v1/bills/print",
      billPayload
    );
    if (printBill.status === 200) {
      console.log("🚀 ~ requestPrintBill ~ printBill:", printBill);
      return printBill.data;
    }
  } catch (error) {
    console.log("🚀 ~ requestPrintBill ~ error:", error);
    return error.message || error.response.data.message;
  }
};
