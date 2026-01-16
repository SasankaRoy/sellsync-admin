import axiosInstance from "../axios-interceptor";

export const saveTranscation = async (payload) => {
  try {
    const reqSaveTranscation = await axiosInstance.post(
      "/api/v1/bills/transaction/save",
      {
        ...payload,
      }
    );
    if (reqSaveTranscation.status === 200 && reqSaveTranscation.data) {
      console.log(reqSaveTranscation.data);
      return reqSaveTranscation.data;
    }
  } catch (error) {
    console.log("Error in Save Transcation", error);
    return error.message || error.response.data.message;
  }
};
