import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import type { JwtPaload } from "../types/auth";

const AdminRoute = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) return <Navigate to={"/login"} replace />;

  const payload = jwtDecode<JwtPaload>(token);

  if (payload.role !== "ADMIN") {
    return <Navigate to={"/resources"} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
