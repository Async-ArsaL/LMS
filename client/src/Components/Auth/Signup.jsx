import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.cursor = loading ? "not-allowed" : "auto";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const otpRes = await fetch("http://localhost:4000/api/v1/users/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const otpData = await otpRes.json();

      if (!otpRes.ok) {
        toast.error("Error sending OTP: " + (otpData.message || "Try again"));
        return;
      }

      toast.success("OTP sent to your email. Please verify.");

      navigate("/otpVerification", {
        state: { name, email, password, role },
      });

      setName("");
      setEmail("");
      setPassword("");
      setRole("Student");
    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-65px)] bg-gradient-to-br from-white to-blue-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gradient-to-br from-white to-blue-100 p-6 rounded-lg border-2 border-blue-100 shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Join the Learning Revolution
          </h2>
          <p className="text-base text-gray-600 mb-6">
            Create your account and start your first course today.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="appearance-none rounded-lg block w-full px-3 py-2.5 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base disabled:cursor-not-allowed"
            placeholder="Full Name"
          />

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="appearance-none rounded-lg block w-full px-3 py-2.5 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base disabled:cursor-not-allowed"
            placeholder="Email Address"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="appearance-none rounded-lg block w-full px-3 py-2.5 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base disabled:cursor-not-allowed"
            placeholder="Create Password"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed"
          >
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2.5 px-4 rounded-lg shadow-sm text-base font-medium text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending OTP..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
