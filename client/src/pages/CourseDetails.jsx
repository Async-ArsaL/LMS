import React from "react";
import { useNavigate } from "react-router-dom";




const CourseDetails = () => {

  const navigate = useNavigate();

  const goToPayment = () =>{

    navigate("/payment")
}

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-white to-blue-200 px-2 sm:px-6">
      {/* Main Card, FULL WIDTH on mobile/tablet */}
      <div className="w-full rounded-2xl p-4 sm:p-8">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">Course Title</h2>
        <p className="text-lg sm:text-xl text-gray-500 mt-2">
          Taught by <span className="font-medium text-xl">[Instructor Name]</span> • Skill Level • Category
        </p>

        {/* Tabs */}
        <div className="flex space-x-4 sm:space-x-6 mt-6 border-b text-base sm:text-lg font-medium text-gray-600 overflow-x-auto no-scrollbar">
          <button className="pb-2 border-b-2 border-blue-600 text-blue-600">Overview</button>
          <button className="pb-2 hover:text-blue-600">Curriculum</button>
          <button className="pb-2 hover:text-blue-600">Instructor</button>
          <button className="pb-2 hover:text-blue-600">Reviews</button>
          <button className="pb-2 hover:text-blue-600">FAQs</button>
        </div>

        {/* Description */}
        <p className="mt-8 text-gray-700 text-lg font-semibold sm:text-xl leading-relaxed">
          Learn [what the course teaches] with hands-on lessons and projects.
          This section can be extended to curriculum, instructor details, and reviews.
        </p>

        {/* Course Info */}
        <div className="mt-7 text-md font-semibold text-gray-600 flex flex-wrap gap-4 sm:gap-6">
          <span>⏱ Duration: 3h 30m</span>
          <span>🎬 Lectures: 42</span>
          <span>🌐 Language: English</span>
          <span>📅 Updated: July 2025</span>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-300" />

        {/* Price Section */}
        <div>
          <div className="text-lg sm:text-xl font-semibold mb-2">Buy this course</div>
          <div className="text-2xl sm:text-3xl font-bold mb-5">₹999</div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={goToPayment} className="flex-1 cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
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
