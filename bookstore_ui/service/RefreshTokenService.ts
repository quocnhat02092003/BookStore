import axios from "axios";

export const API = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

let isRefreshing: boolean = false;
let queue: Array<() => void> = [];

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        // Đợi refresh xong thì gọi lại
        return new Promise((resolve) => {
          queue.push(() => resolve(API(original)));
        });
      }

      isRefreshing = true;
      try {
        await API.post("api/auth/refresh-token");
        // Gọi lại các request trong queue
        queue.forEach((cb) => cb());
        queue = [];
        return API(original);
      } catch (e) {
        window.location.href = "/login";
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);
