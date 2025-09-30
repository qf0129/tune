import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from "axios";

export interface PageObject<T> {
  List: T[];
  Page: number;
  PageSize: number;
  Total: number;
}

export interface Response<T> {
  Code: number;
  Msg: string;
  Data: T;
}

const request: AxiosInstance = axios.create({
  timeout: 10000,
});

request.interceptors.response.use((response: AxiosResponse<any, any>) => {
  console.log("RequestApi >>>", response.request.responseURL, response.data);
  if (response.data.Code != 0) {
    // message.warning(response.data.Msg);
    if (response.data.Code === 401002) {
      window.location.href = "/signin"
    }
  }
  return Promise.resolve(response.data);
},
  (error: AxiosError) => {
    console.log("RequestError:", error);
    if (error.message) {
      console.debug("RequestError:", error.message);
      // message.error(error.message);
    }
    return Promise.reject(error);
  },
);

export default request;