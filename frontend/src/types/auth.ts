export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserCreateResponse {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface JwtPaload {
  sub: string;
  type: string;
  role: "USER" | "ADMIN";
  exp: number;
}
