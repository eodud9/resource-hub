import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signup } from "../api/auth";
import { useNavigate } from "react-router-dom";

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
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutation.mutate({ name, email, password });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" placeholder="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="email">Email: </label>
        <input type="email" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};
