import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, AlertTriangle, ArrowRight } from "lucide-react";

export const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAdmin") === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();

    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === "admin@ngo.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Admin Portal</h1>
            <p className="text-blue-100 mt-1">Access the dashboard to manage programs</p>
          </div>

          <div className="p-6 md:p-8">
            {error && (
              <div className="mb-6 flex items-center gap-2 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md animate-fadeIn">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@ngo.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-xs text-blue-500 font-medium"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition ${
                  isLoading ? "opacity-80 cursor-not-allowed" : "hover:bg-blue-700 transform hover:scale-105"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              For admin access only. Volunteers should use the{" "}
              <a href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                volunteer sign up
              </a>{" "}
              page.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Demo login: <strong>admin@ngo.com</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  );
};