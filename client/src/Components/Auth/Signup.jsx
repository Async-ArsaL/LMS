import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1) Send OTP
      const otpRes = await fetch("http://localhost:4000/api/v1/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const otpData = await otpRes.json();
      console.log("OTP Response:", otpData);

      if (!otpRes.ok) {
        alert("Error sending OTP: " + (otpData.message || "Try again"));
        return;
      }

      alert("OTP sent to your email. Please verify.");

      // 2) Redirect to OTP verification page with user details
      navigate("/otpVerification", {
        state: { name, email, password, role },
      });

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setRole("Student");
    } catch (err) {
      console.error(err);
      setMessage("Server Error");
      alert("Server Error");
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
            className="appearance-none rounded-lg block w-full px-3 py-2.5 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
            placeholder="Full Name"
          />

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none rounded-lg block w-full px-3 py-2.5 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
            placeholder="Email Address"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none rounded-lg block w-full px-3 py-2.5 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
            placeholder="Create Password"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Student">Student</option>
          </select>

          <button
            type="submit"
            className="w-full cursor-pointer flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
