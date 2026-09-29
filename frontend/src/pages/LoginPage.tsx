import React, { useState } from "react";
import { login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import FormInput from "../components/FormInput";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/resources");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    loginMutation.mutate({ email, password });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">ResourceHub</h1>
          <p className="mt-6 text-3xl font-semibold text-gray-900">Welcome Back</p>
          <p className="mt-2 text-sm font-medium text-gray-500">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 rounded-xl p-8 border border-gray-200 bg-white">
          <FormInput
            id="email"
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            containerClassName="mt-5"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {loginMutation.isError && (
            <p className="mt-5 text-sm font-medium text-red-500">이메일 또는 비밀번호가 틀렸습니다.</p>
          )}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="mt-5 w-full bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium cursor-pointer transition-colors duration-200 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loginMutation.isPending ? "Signing In..." : "Sign In"}
          </button>
          <div className="mt-2 text-center">
            <span className="inline text-sm font-medium text-gray-500">Don't have an account?</span>
            <Link
              to="/sign-up"
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
