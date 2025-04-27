import axios from "axios";
import { URLs } from "@types";

export const axiosBase = axios.create({
  baseURL: URLs.api,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosBase.interceptors.request.use((config) => {
  const token = process.env.API_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
