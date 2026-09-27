import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { jwtDecode } from "jwt-decode";
import type { JwtPaload } from "../types/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  let isAdmin = false;

  if (token) {
    const payload = jwtDecode<JwtPaload>(token);
    isAdmin = payload.role === "ADMIN";
  }

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    },
  });

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold tracking-tight">ResourceHub</h1>
        <div className="flex items-center gap-6">
          <Link
            to={"/resources"}
            className="text-md font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            Resources
          </Link>
          <Link
            to={"/reservations"}
            className="text-md font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            My Reservations
          </Link>
          {isAdmin && (
            <Link
              to={"/admin/resources"}
              className="text-md font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Resource Management
            </Link>
          )}
          <button
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="
          rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:text-gray-700 disabled:opcaty-50 cursor-pointer transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
