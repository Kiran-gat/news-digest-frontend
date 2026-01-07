import { useState } from "react";
import { apiRequest } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // ✅ CASE 1: New user created
      if (data.message === "User registered successfully") {
        setMessage("Account created. Redirecting to login...");
        setTimeout(() => navigate("/login"), 1200);
        return;
      }

      // ✅ CASE 2: User already exists → go to login
      if (data.message === "User already exists") {
        setMessage("Account already exists. Redirecting to login...");
        setTimeout(() => navigate("/login"), 1200);
        return;
      }

      // ❌ Any other case
      setMessage(data.message || "Registration failed");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
      <div className="bg-slate-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-400">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-2 rounded-lg bg-slate-700 focus:ring-2 focus:ring-purple-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg bg-slate-700 focus:ring-2 focus:ring-purple-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-semibold"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-300">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
