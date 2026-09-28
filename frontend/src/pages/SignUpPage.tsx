import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signup } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import type { ErrorResponse } from "../types/api";

export const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const createMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate("/login");
    },
    onError: () => {
      setName("");
      setEmail("");
      setPassword("");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutation.mutate({ name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">ResourceHub</h1>
          <p className="mt-6 text-3xl font-semibold text-gray-900">Create an account</p>
          <p className="mt-2 text-sm font-medium text-gray-500">Get Started with ResourceHub</p>
        </div>
        <form action="" onSubmit={handleSubmit} className="mt-8 rounded-xl border border-gray-200 p-8 bg-white">
          <div>
            <label htmlFor="name" className="text-sm font-medium block text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 outline-none border border-gray-300 rounded-lg transition-colors duration-200 focus:border-gray-700"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="email" className="text-sm font-medium block text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 outline-none border border-gray-300 rounded-lg transition-colors duration-200 focus:border-gray-700"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="password" className="text-sm font-medium block text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 outline-none border border-gray-300 rounded-lg transition-colors duration-200 focus:border-gray-700"
            />
          </div>
          {createMutation.isError && (
            <p className="mt-5 text-sm font-medium text-red-500">
              {axios.isAxiosError<ErrorResponse>(createMutation.error)
                ? createMutation.error.response?.data.message
                : "Error!"}
            </p>
          )}
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="mt-5 w-full bg-gray-900 text-white rounded-lg px-4 py-2 cursor-pointer transition-colors duration-200 hover:bg-gray-700"
          >
            {createMutation.isPending ? "Creating..." : "Create Account"}
          </button>
          <div className="mt-2 text-center">
            <span className="text-sm font-medium text-gray-500">Already have an account?</span>
            <Link
              to={"/login"}
              className="text-gray-600 px-2 text-sm font-medium cursor-pointer transition-colors duration-200 hover:text-gray-900"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
