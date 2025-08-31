import React, { useState, useEffect } from "react";
import qrCodeImg from "../assets/qr.jpg";
import { toast } from "react-toastify";
import axios from "axios";

const Payment = ({ onClose, course }) => {
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    upiId: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const [studentId, setStudentId] = useState(null);
  const [existingCourses, setExistingCourses] = useState([]);

  useEffect(() => {
    // Get studentId from localStorage
    const id = localStorage.getItem("studentId");
    setStudentId(id);

    if (id) {
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:4000/api/v4/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const courses = res.data.data.enrolledCourses || [];
          setExistingCourses(courses.map((c) => c._id));
        })
        .catch((err) => {
          console.error("Failed to fetch student courses:", err);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId) {
      toast.error("Student not found!");
      return;
    }

    setLoading(true);

    try {
      if (selectedPayment === "upi" && !formData.upiId) {
        toast.error("Please enter your UPI ID");
        setLoading(false);
        return;
      }
      if (
        selectedPayment === "card" &&
        (!formData.cardNumber ||
          !formData.expiry ||
          !formData.cvv ||
          !formData.cardName)
      ) {
        toast.error("Please fill all card details");
        setLoading(false);
        return;
      }

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Merge existing courses with new course
      const updatedCourses = [...existingCourses];
      if (!updatedCourses.includes(course._id)) {
        updatedCourses.push(course._id);
      }

      // Update student enrolledCourses
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:4000/api/v4/students/${studentId}`,
        { enrolledCourses: updatedCourses },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(
        `Payment of ₹${course?.price || 0} successful via ${
          selectedPayment === "upi" ? "UPI" : "Card"
        }`
      );

      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] rounded-sm shadow-xl max-w-md p-6 bg-gradient-to-br from-white to-blue-200 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 font-bold text-xl"
      >
        ×
      </button>

      <h1 className="text-2xl font-semibold mb-2 sm:text-3xl text-gray-900">
        Complete Your Purchase
      </h1>

      <div className="mb-2 p-4 rounded-lg bg-white/30 border border-gray-300">
        <h2 className="text-lg font-semibold mb-2 sm:text-xl text-gray-900">
          {course?.title || "Course Name"}
        </h2>
        <p className="mb-2 text-sm sm:text-base text-gray-700">
          {course?.desc || "Course description"}
        </p>
        <p className="font-bold text-base sm:text-lg text-gray-900">
          Price: ₹{course?.price || 0}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 sm:text-xl text-gray-900">
          Payment Method
        </h2>
        <div className="flex gap-3">
          <div
            onClick={() => setSelectedPayment("upi")}
            className={`flex-1 p-3 rounded-lg text-center cursor-pointer text-sm sm:text-base transition border-2 ${
              selectedPayment === "upi"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          >
            UPI
          </div>
          <div
            onClick={() => setSelectedPayment("card")}
            className={`flex-1 p-3 rounded-lg text-center cursor-pointer text-sm sm:text-base transition border-2 ${
              selectedPayment === "card"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          >
            Credit/Debit Card
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4">
        {selectedPayment === "upi" && (
          <>
            <input
              type="text"
              name="upiId"
              placeholder="Enter your UPI ID"
              value={formData.upiId}
              onChange={handleChange}
              className="w-full p-3 rounded-md focus:outline-none text-sm sm:text-base border border-gray-300 bg-white text-gray-900"
              disabled={loading}
            />
            <img
              src={qrCodeImg}
              alt="UPI QR Code"
              className="w-32 h-32 sm:w-40 sm:h-40"
            />
          </>
        )}

        {selectedPayment === "card" && (
          <>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full p-3 rounded-md focus:outline-none bg-white border border-gray-300 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
              disabled={loading}
            />
            <div className="flex gap-3">
              <input
                type="text"
                name="expiry"
                placeholder="Expiry (MM/YY)"
                value={formData.expiry}
                onChange={handleChange}
                className="flex-grow p-3 rounded-md focus:outline-none bg-white border border-gray-300 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                disabled={loading}
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                className="flex-shrink-0 w-20 p-3 rounded-md focus:outline-none bg-white border border-gray-300 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                disabled={loading}
              />
            </div>
            <input
              type="text"
              name="cardName"
              placeholder="Name on Card"
              value={formData.cardName}
              onChange={handleChange}
              className="w-full p-3 rounded-md focus:outline-none bg-white border border-gray-300 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
              disabled={loading}
            />
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-extrabold rounded-lg py-3 text-base sm:text-lg ${
            loading ? "bg-gray-400" : "bg-blue-600 text-white"
          }`}
        >
          {loading ? "Processing..." : `Pay ₹${course?.price || 0}`}
        </button>
      </form>
    </div>
  );
};

export default Payment;
