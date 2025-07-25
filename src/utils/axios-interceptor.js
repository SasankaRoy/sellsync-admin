import axios from "axios";
import Cookies from "js-cookies";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL, // Replace with your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Set headers here
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";

    const token = Cookies.getItem("authToken");
    if (token) {
      config.headers["token"] = `${token}`;
    }

    config.headers["x-api-key"] = import.meta.env.VITE_APP_HEADER_KEY;

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor (optional, included for completeness)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response error
    // console.log(error)
    return Promise.reject(error);
  }
);

export default axiosInstance;

// import axios from "axios";
// import Cookies from "js-cookies";

// const Client = axios.create({
//   baseURL: import.meta.env.VITE_APP_BASE_URL,
// });

// Client.interceptors.request.use(
//   (config)=>{
//     const session = Cookies.getItem('session');

//     if(!session){

//     }
//   }
// )

// export const request = async ({ ...options }) => {
//   Client.defaults.headers.common.Authorization = options?.session;

//   const onSuccess = (response) => response;
//   const onError = (error) => {
//     console.log(error);

//     return error;
//   };

//   try {
//     const response = await Client(options);
//     return onSuccess(response);
//   } catch (error) {
//     return onError(error);
//   }
// };
