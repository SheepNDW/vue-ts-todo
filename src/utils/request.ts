import axios, { type Method } from 'axios';

const baseURL = 'https://todoo.5xcamp.us';

const instance = axios.create({
  baseURL,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('5xcampTodo');

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: token,
      };
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/**
 * axios 請求工具函式
 * @param method  請求方法
 * @param url  請求 url
 * @param submitData  提交的資料
 */
export const http = <ApiRes>(method: Method, url: string, submitData?: object) => {
  return instance.request<ApiRes>({
    method,
    url,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
  });
};
