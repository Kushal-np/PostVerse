import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../queries/useAuth";
import useAuthStore from "../../stores/AuthStore";
import { useState } from "react";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupMutation = useSignUp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(username, email, password);
    e.preventDefault();
    try {
      const data = await signupMutation.mutateAsync({
        username,
        email,
        password,
      });
      if (data.success) {
        console.log("Registration successfull !");
        navigate("/login");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-white mb-8">Sign up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-md text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
          />

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

          {signupMutation.isError && (
            <p className="text-red-500 text-sm">
              {signupMutation.error?.message || "Signup failed"}
            </p>
          )}

          <button
            type="submit"
            disabled={signupMutation.isLoading}
            className="w-full px-4 py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {signupMutation.isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-sm text-neutral-500">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-white hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};