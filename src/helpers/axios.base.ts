import axios from "axios";
import { URLs } from "@types";
import { loadToken } from "./auth";

export const axiosBase = axios.create({
  baseURL: URLs.api,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosBase.interceptors.request.use((config) => {
  const token = loadToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
