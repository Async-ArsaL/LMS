import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/v5/course", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", res.data);

        // normalize response safely
        const data = res.data?.courses || res.data?.data || res.data || [];

        if (!Array.isArray(data)) {
          throw new Error("Invalid course response");
        }

        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err.message);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    (course?.title || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-center mt-10">Loading courses...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-auto bg-gradient-to-br from-white to-blue-200 p-4">
      <div className="flex justify-evenly items-center mb-4">
        <h1 className="text-2xl font-bold">Browse Courses</h1>
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredCourses.length === 0 ? (
        <p className="text-center text-gray-700">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <div
              key={course._id || course.id || Math.random()}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <img
                src={`http://localhost:4000/uploads/${course.thumbnail}`}
                alt={course?.title || "No Title"}
                className="w-full h-45 object-cover shadow shadow-blue-200"
              />
              <div className="p-2">
                <h3 className="font-semibold text-xl">{course?.title || "Untitled"}</h3>
                <p className="text-gray-500 text-sm">
                  {course?.category || "Uncategorized"}
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  {course?.desc || "No description available."}
                </p>
                <div className="flex space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-sm">
                    Enroll
                  </button>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded text-sm">
                    Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
