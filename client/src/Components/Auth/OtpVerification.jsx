import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { name, email, password, role } = location.state || {};

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      //Verify OTP
      const otpRes = await fetch("http://localhost:4000/api/v1/users/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const otpData = await otpRes.json();

      if (!otpRes.ok) {
        toast.error(otpData.message || "Invalid OTP");
        return;
      }

      // OTP correct to Signup API call kro
      const signupRes = await fetch(
        "http://localhost:4000/api/v1/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role }),
        }
      );

      const signupData = await signupRes.json();

      if (signupRes.ok) {
        toast.success("Account created successfully! Please login.");
        navigate("/login");
      } else {
        toast.error(signupData.message || "Signup failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error. Try again.");
    }
  };

  return (
    <div className="h-[calc(100vh-65px)] bg-gradient-to-br from-white to-blue-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md border border-blue-200">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Verify Your Email
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We’ve sent an OTP to your email{" "}
          <span className="font-medium">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />

          <button
            type="submit"
            className="w-full cursor-pointer py-2 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
