import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  UserCreateRequest,
  UserCreateResponse,
} from "../types/auth";
import { api } from "./axios";

export async function login(data: LoginRequest) {
  const response = await api.post<LoginResponse>("/api/users/login", data);

  return response.data;
}

export async function signup(data: UserCreateRequest) {
  const response = await api.post<UserCreateResponse>("/api/users", data);

  return response.data;
}

export async function logout() {
  await api.post("/api/users/logout");
}

export async function refresh(refreshToken: RefreshTokenRequest) {
  const response = await api.post("/api/users/refresh", refreshToken);

  return response;
}
