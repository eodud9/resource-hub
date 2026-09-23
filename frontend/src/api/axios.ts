import axios from "axios";
import type { JwtPaload, LoginResponse } from "../types/auth";
import { jwtDecode } from "jwt-decode";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(jwtDecode<JwtPaload>(token));
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post<LoginResponse>("http://localhost:8080/api/users/refresh", { refreshToken });

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
