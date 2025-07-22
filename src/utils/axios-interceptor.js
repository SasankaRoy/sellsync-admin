import axios from "axios";
import Cookies from "js-cookies";


const Client = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

Client.interceptors.request.use(
  (config)=>{
    const session = Cookies.getItem('session');

    if(!session){

    }
  }
)

export const request = async ({ ...options }) => {
  Client.defaults.headers.common.Authorization = options?.session;

  const onSuccess = (response) => response;
  const onError = (error) => {
    console.log(error);

    return error;
  };

  try {
    const response = await Client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};
