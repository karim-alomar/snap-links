import Axios from "axios";

export const axios = Axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});
