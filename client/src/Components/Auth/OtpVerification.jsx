import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpVerification = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/v1/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("OTP Verified Successfully");
        alert("Account Verified Successfully");
        navigate("/login");
      } else {
        setMessage(data.message || "Invalid OTP");
      }
    } catch (err) {
      setMessage("Server Error");
    }
  };

  return (
    <div className="h-[calc(100vh-65px)] bg-gradient-to-br from-white to-blue-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md border border-blue-200">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Verify Your Email
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We’ve sent an OTP to your email <span className="font-medium">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-blue-500 focus:blue-green-500"
          />

          <button
            type="submit"
            className="w-full cursor-pointer py-2 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Verify OTP
          </button>
        </form>

        {message && <p className="text-center text-red-600 mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default OtpVerification;
