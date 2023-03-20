import Axios, { AxiosRequestHeaders } from "axios";
import Cookies from 'js-cookie';

const Api = (headers?: AxiosRequestHeaders) => {
  const api = Axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      ...headers,
      Authorization: Cookies.get("token"),
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  api.interceptors.request.use(
    (request) => {
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return {
    GET: api.get,
    POST: api.post,
    PUT: api.put,
    DELETE: api.delete,
  };
};

export default Api;
