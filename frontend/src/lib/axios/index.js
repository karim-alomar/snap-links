import Axios from "axios";
import Cookies from "js-cookie";
export const axios = Axios.create({
  baseURL: `https://snaplinksbe.vercel.app/api`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  (config) => {
    const guestId = Cookies.get("guest_id");
    const authorization = Cookies.get("authorization");

    if (guestId) {
      config.headers.guest_id = guestId;
    }

    if (authorization) {
      config.headers.authorization = authorization;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
