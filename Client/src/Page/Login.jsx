import React, { useState } from "react";
import { useSignin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isLoading } = useSignin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: () => navigate("/"),
        onError: (err) => console.error("Login error:", err),
      }
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0d0d0f] text-gray-100 font-sans">
      <section className="w-full max-w-sm px-8 py-10 rounded-xl border border-gray-800 bg-[#141416] shadow-lg">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Sign in
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-2 text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#1b1c1f] border border-gray-700 text-gray-100 placeholder-gray-500 
              focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#1b1c1f] border border-gray-700 text-gray-100 placeholder-gray-500 
              focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-md bg-gray-100 text-black font-medium 
            hover:bg-gray-200 active:scale-[0.99] transition disabled:opacity-50 disabled:hover:bg-gray-100"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 flex justify-between text-sm text-gray-400">
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="hover:text-gray-200 transition-colors"
          >
            Create Account
          </button>
          <a href="#" className="hover:text-gray-200 transition-colors">
          </a>
        </div>
      </section>
    </main>
  );
};

export default Login;
