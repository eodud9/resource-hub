import React, { useState } from "react";
import { login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login({ email, password });

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      navigate("/resources");
    } catch {
      setErrorMessage("이메일 또는 비밀번호가 틀렸습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">ResourceHub</h1>
          <p className="mt-6 text-3xl font-semibold text-gray-900">Welcome Back</p>
          <p className="mt-2 text-sm font-medium text-gray-500">Sign in to your account</p>
        </div>
        <form action="" onSubmit={handleSubmit} className="mt-8 rounded-xl p-8 border border-gray-200 bg-white">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-3 py-2 outline-none border border-gray-300 rounded-lg transition-colors duration-200 focus:border-gray-600"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="password" className="mt-2 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 outline-none border border-gray-300 rounded-lg transition-colors duration-200 focus:border-gray-600"
            />
          </div>
          {errorMessage && <p className="mt-5 text-sm font-medium text-red-500">{errorMessage}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-5 w-full bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium cursor-pointer transition-colors duration-200 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          <div className="mt-2 text-center">
            <span className="inline text-sm font-medium text-gray-500">Don't have an account?</span>
            <Link
              to={"/sign-up"}
              className="text-gray-600 px-2 text-sm font-medium cursor-pointer transition-colors duration-200 hover:text-gray-900"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
