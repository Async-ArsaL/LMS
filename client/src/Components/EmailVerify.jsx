import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // signup se email aa raha hai
  const email = location.state?.email || "";

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
        alert("Email verified successfully! You can login now.");
        navigate("/login");
      } else {
        alert("Invalid OTP. Try again.");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-white to-blue-200">
      <form onSubmit={handleVerify} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
        <p className="mb-2 text-gray-600">Enter the OTP sent to <b>{email}</b></p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-3 py-2 border rounded-lg mb-3"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
