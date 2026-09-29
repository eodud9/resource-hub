import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import type { JwtPayload } from "../types/auth";

const AdminRoute = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) return <Navigate to="/login" replace />;

  try {
    const payload = jwtDecode<JwtPayload>(token);
    if (payload.role !== "ADMIN") {
      return <Navigate to="/resources" replace />;
    }
  } catch {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
