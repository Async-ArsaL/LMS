import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentDashBoard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const name = localStorage.getItem("name");
  const studentId = localStorage.getItem("studentId");
  const navigate = useNavigate();

  const fetchStudentCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:4000/api/v4/students/${studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourses(res.data?.data?.enrolledCourses || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) fetchStudentCourses();
  }, [studentId]);

  const clickSubmit = () => {
    navigate("/courses");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <p className="text-xl font-medium text-gray-600">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-blue-200 min-h-[calc(100vh-64px)] p-4 md:p-8 font-sans overflow-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {name} 👋
        </h1>
        <button
          onClick={clickSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm cursor-pointer"
        >
          Explore New Courses
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Left Section - Courses */}
        <div className="lg:flex-2 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            My Courses
          </h2>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-1 sm:pr-2 flex-1">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-gray-100 rounded-lg p-4 flex flex-col justify-between items-center text-center shadow-sm min-h-[320px]"
                >
                  <div className="h-40 w-full mb-3 flex items-center justify-center">
                    <img
                      src={
                        course.thumbnail
                          ? `http://localhost:4000/uploads/${course.thumbnail}`
                          : "https://via.placeholder.com/300x180"
                      }
                      alt={course.title}
                      className="h-full object-contain rounded-md"
                    />
                  </div>
                  <p className="text-xl font-medium text-gray-700 mb-4">
                    {course.title}
                  </p>
                  <button
                  onClick={clickSubmit} 
                  className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 cursor-pointer">
                    Open Course
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 text-lg">No enrolled courses yet.</p>
          )}
        </div>

        {/* Right Section - Progress & Certificates */}
        <div className="lg:flex-1 flex flex-col gap-4 h-full overflow-y-auto">
          {/* Progress Bars */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Progress
            </h2>
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm flex flex-col gap-4">
              {[
                { label: "Course Completion", width: "w-3/4" },
                { label: "Quizzes Completed", width: "w-1/2" },
                { label: "Assignments Submitted", width: "w-2/3" },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm text-gray-700 mb-1">
                    <span>{item.label}</span>
                    <span>
                      {item.width === "w-3/4"
                        ? "75%"
                        : item.width === "w-2/3"
                        ? "66%"
                        : "50%"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      className={`bg-blue-500 h-2 ${item.width} rounded`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3 mt-4">
              Certificates
            </h2>
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((cert) => (
                  <div
                    key={cert}
                    className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition"
                  >
                    <div className="text-4xl mb-2">📄</div>
                    <p className="text-sm font-medium text-gray-700">
                      Certificate
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Overall Progress (Full Width) */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-2">
          Overall Progress
        </h2>
        <div className="w-full sm:w-1/2 bg-gray-200 h-3 rounded mb-2">
          <div className="bg-blue-600 h-3 w-[60%] rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashBoard;
