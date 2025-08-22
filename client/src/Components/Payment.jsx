import React, { useState } from "react";
import qrCodeImg from "../assets/qr.jpg";

const accentColor = "#60a5fa";

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState("upi");

  return (
    <div
        className="rounded-xl shadow-xl max-w-md p-6 bg-gradient-to-br from-white to-blue-200"
        style={{ minHeight: "300px" }} // stable min height
      >
        <h1
          className="text-2xl font-semibold mb-2 sm:text-3xl"
          style={{ color: accentColor }}
        >
          Complete Your Purchase
        </h1>

        {/* Course Info */}
        <div
          className="mb-2 p-4 rounded-lg bg-opacity-20"
          style={{ borderColor: accentColor, backgroundColor: "#eff6ff" }}
        >
          <h2
            className="text-lg font-semibold mb-2 sm:text-xl"
            style={{ color: accentColor }}
          >
            Physics Wallah JEE Crash Course
          </h2>
          <p
            className="mb-2 text-sm sm:text-base"
            style={{ color: accentColor, opacity: 0.85 }}
          >
            Complete preparation for JEE Advanced & Main.
          </p>
          <p
            className="font-bold text-base sm:text-lg"
            style={{ color: accentColor }}
          >
            Price: ₹799
          </p>
        </div>

        {/* Payment Method Options */}
        <div className="mb-6">
          <h2
            className="text-lg font-semibold mb-3 sm:text-xl"
            style={{ color: accentColor }}
          >
            Payment Method
          </h2>
          <div className="flex gap-3">
            <div
              onClick={() => setSelectedPayment("upi")}
              className={`flex-1 p-3 rounded-lg text-center cursor-pointer text-sm sm:text-base transition ${
                selectedPayment === "upi"
                  ? `border-2 border-solid text-white`
                  : `border-2 border-solid text-blue-400`
              }`}
              style={{
                borderColor: accentColor,
                backgroundColor: selectedPayment === "upi" ? accentColor : "transparent",
              }}
            >
              UPI
            </div>
            <div
              onClick={() => setSelectedPayment("card")}
              className={`flex-1 p-3 rounded-lg text-center cursor-pointer text-sm sm:text-base transition ${
                selectedPayment === "card"
                  ? `border-2 border-solid text-white`
                  : `border-2 border-solid text-blue-400`
              }`}
              style={{
                borderColor: accentColor,
                backgroundColor: selectedPayment === "card" ? accentColor : "transparent",
              }}
            >
              Credit/Debit Card
            </div>
          </div>
        </div>

        {/* UPI Input and QR Code */}
        {selectedPayment === "upi" && (
          <div className="mb-6 flex flex-col items-center gap-4">
            <input
              type="text"
              placeholder="Enter your UPI ID"
              className="w-full p-3 rounded-md focus:outline-none text-sm sm:text-base"
              style={{
                border: `1px solid ${accentColor}`,
                backgroundColor: "#eff6ff",
                color: accentColor,
                fontWeight: "500",
              }}
            />
            <img
              src={qrCodeImg}
              alt="UPI QR Code"
              className="w-32 h-32 sm:w-40 sm:h-40"
            />
          </div>
        )}

        {/* Credit/Debit Card form */}
        {selectedPayment === "card" && (
          <form className="mb-6 flex flex-col gap-4 text-blue-400">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-3 rounded-md focus:outline-none bg-transparent border border-blue-400 text-white placeholder-blue-400 text-sm sm:text-base"
            />
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Expiry (MM/YY)"
                className="flex-grow p-3 rounded-md focus:outline-none bg-transparent border border-blue-400 text-white placeholder-blue-400 text-sm sm:text-base"
              />
              <input
                type="text"
                placeholder="CVV"
                className="flex-shrink-0 w-20 p-3 rounded-md focus:outline-none bg-transparent border border-blue-400 text-white placeholder-blue-400 text-sm sm:text-base"
              />
            </div>
            <input
              type="text"
              placeholder="Name on Card"
              className="w-full p-3 rounded-md focus:outline-none bg-transparent border border-blue-400 text-white placeholder-blue-400 text-sm sm:text-base"
            />
          </form>
        )}

        <button
          className="w-full font-extrabold rounded-lg py-3 text-base sm:text-lg"
          style={{ backgroundColor: accentColor, color: "#27272a" }}
        >
          Pay ₹799
        </button>
      </div>
  );
};

export default Payment;
