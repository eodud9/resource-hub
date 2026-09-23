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
    <nav>
      <h1>Resourcehub</h1>
      <Link to={"/resources"}>Resources</Link>
      <Link to={"/reservations"}>My Reservations</Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/sign-up"}>Sign up</Link>
      {isAdmin && <Link to={"/admin/resources"}>Resource Management</Link>}
      <button onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
