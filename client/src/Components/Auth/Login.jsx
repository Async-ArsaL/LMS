import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Manage body cursor style
  useEffect(() => {
    if (loading) {
      document.body.style.cursor = "not-allowed";
    } else {
      document.body.style.cursor = "auto";
    }

    // Reset on unmount
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [loading]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("role", data.user.role.toLowerCase());

        if (data.user.role.toLowerCase() === "student") {
          localStorage.setItem("studentId", data.student._id);
        }

        toast.success("Login Successful!");

        // Role-based redirect
        if (data.user.role.toLowerCase() === "admin")
          navigate("/adminDashboard", { replace: true });
        else if (data.user.role.toLowerCase() === "student")
          navigate("/studentDashboard", { replace: true });
        else if (data.user.role.toLowerCase() === "instructor")
          navigate("/adminControl", { replace: true });
        else navigate("/", { replace: true });
      } else {
        toast.error(`Login Failed: ${data.message || "Try again"}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-br from-white to-blue-200 flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-gradient-to-br from-white to-blue-100 p-6 rounded-lg border-2 border-blue-100 shadow-md space-y-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome Back
          </h2>
          <p className="text-lg text-gray-600">
            Log in to access your learning journey.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-2 w-full px-3 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-2 w-full px-3 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <div className="flex items-center justify-between mt-4 text-base">
            <Link to="/forgot-password" className="text-gray-600 hover:text-blue-500">
              Forgot password?
            </Link>
            <div className="flex items-center">
              <span className="text-gray-600">New here?</span>
              <Link to="/signup" className="ml-2 text-blue-600 hover:text-blue-500 font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
