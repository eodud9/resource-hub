import { useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../types/auth";

interface NavBarLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavBarLink = ({ to, children }: NavBarLinkProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `text-md font-medium ${isActive ? "font-semibold text-gray-900" : "font-medium text-gray-600 hover:text-gray-900"} transition-colors duration-200`
    }
  >
    {children}
  </NavLink>
);

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  let isAdmin = false;

  if (token) {
    const payload = jwtDecode<JwtPayload>(token);
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
          <NavBarLink to="/resources">Resources</NavBarLink>
          <NavBarLink to="/reservations">My Reservations</NavBarLink>
          {isAdmin && <NavBarLink to="/admin/resources">Resource Management</NavBarLink>}
          <button
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="
          rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700 disabled:opcaity-50 cursor-pointer transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
