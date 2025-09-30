import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/AuthStore.js";
import { useLogin } from "../../queries/useAuth.js";
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuthStore();
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginMutation.mutateAsync({ email, password });
      console.log(data);
      if (data.success) {
        setAuth(data.user, data.token);
        navigate("/home");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      console.log("Error while fetching through the backend");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-white mb-8">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-md text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-md text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
          />

          {loginMutation.isError && (
            <p className="text-red-500 text-sm">
              {loginMutation.error?.message || "Login failed"}
            </p>
          )}

          <button
            type="submit"
            disabled={loginMutation.isLoading}
            className="w-full px-4 py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loginMutation.isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-sm text-neutral-500">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-white hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};