import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Helper function to capitalize first letter
  const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:4000/api/v5/course/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data?.data;
        setCourse(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const goToPayment = () => {
    navigate("/payment");
  };

  if (loading) return <p className="text-center mt-10">Loading course...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!course) return <p className="text-center mt-10">Course not found.</p>;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-white to-blue-200 px-2 sm:px-6">
      <div className="w-full rounded-2xl p-4 sm:p-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">{capitalize(course.title)}</h2>
        <p className="text-lg sm:text-xl text-gray-500 mt-2">
          Taught by <span className="font-medium text-xl">{capitalize(course.instructor?.name)}</span> • {capitalize(course.level)} • {capitalize(course.category)}
        </p>

        {/* Tabs */}
        <div className="flex space-x-4 sm:space-x-6 mt-6 border-b text-base sm:text-lg font-medium text-gray-600 overflow-x-auto no-scrollbar">
          <button className="pb-2 border-b-2 border-blue-600 text-blue-600">Overview</button>
          <button className="pb-2 hover:text-blue-600">Curriculum</button>
          <button className="pb-2 hover:text-blue-600">Instructor</button>
          <button className="pb-2 hover:text-blue-600">Reviews</button>
          <button className="pb-2 hover:text-blue-600">FAQs</button>
        </div>

        <p className="mt-8 text-gray-700 text-lg font-semibold sm:text-xl leading-relaxed">
          {course.desc}
        </p>

        <div className="mt-7 text-md font-semibold text-gray-600 flex flex-wrap gap-4 sm:gap-6">
          <span>⏱ Duration: {course.duration || "3h"}</span>
          <span>🎬 Lectures: {course.lectures || "11"}</span>
          <span>🌐 Language: {"English"}</span>
          <span>📅 Updated: {new Date(course.updatedAt).toLocaleDateString()}</span>
        </div>

        <hr className="my-8 border-gray-300" />

        <div>
          <div className="text-lg sm:text-xl font-semibold mb-2">Buy this course</div>
          <div className="text-2xl sm:text-3xl font-bold mb-5">₹{course.price}</div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
            onClick={goToPayment}
            
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Enroll Now
            </button>
            <button className="flex-1 border border-gray-500 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Add to Wishlist
            </button>
          </div>
          <div className="flex mt-6 justify-between items-center">
            <div className="mt-5 text-sm font-semibold text-gray-500">❤️Like the course</div>
            <div className="mt-5 text-sm font-semibold text-gray-500">🔗 Share this course</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
