import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
    level: "",
    img: null,
    price: "",
  });
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Login first to create a course.", {
        position: "top-center",
      });
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("desc", formData.desc);
      data.append("category", formData.category);
      data.append("level", formData.level);
      data.append("price", formData.price);
      data.append("thumbnail", formData.img);

      const res = await axios.post(
        "http://localhost:4000/api/v5/courses",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Course created successfully!", {
          position: "top-center",
        });
        navigate("/courses");
      } else {
        toast.error(res.data.message || "Failed to create course", {
          position: "top-center",
        });
      }

      setFormData({
        title: "",
        desc: "",
        category: "",
        level: "",
        img: null,
        price: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating course", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-white to-blue-200 flex flex-col items-center p-4 sm:p-6">
      <ToastContainer />
      <div className="m-4 w-full sm:w-[90%] md:w-[80%] lg:w-[75%] flex flex-row flex-wrap justify-between items-center gap-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
          Step: 1 Create Course
        </h1>
        <div className="flex-1 min-w-[150px] mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-2 bg-blue-400 w-[30%] rounded-full"></div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-grow w-full sm:w-[90%] md:w-[80%] lg:w-[75%] rounded-lg p-3"
      >
        {/* Form fields same as before */}
        <label htmlFor="title">
          <h2 className="text-black font-semibold">Course Title</h2>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter course title"
          className="w-full p-3 mt-2 mb-3 rounded-md border border-gray-300 outline-none focus:ring-1 focus:ring-blue-400"
        />

        <label htmlFor="desc">
          <h2 className="text-black font-semibold">Description</h2>
        </label>
        <textarea
          id="desc"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          placeholder="Provide a clear, compelling description to attract students."
          required
          rows="2"
          className="w-full p-3 mt-2 mb-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full">
            <label htmlFor="category">
              <h2 className="text-black font-semibold">Category</h2>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 mt-2 mb-5 p-3 rounded text-sm"
            >
              <option value="">All</option>
              <option value="Development">Development</option>
              <option value="Data Science">Data Science</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div className="w-full">
            <label htmlFor="price">
              <h2 className="text-black font-semibold">Price</h2>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter Course Price"
              className="w-full p-3 mt-2 mb-3 rounded-md border border-gray-300 outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full">
            <label htmlFor="level">
              <p className="block font-semibold">Level</p>
            </label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 mt-2 mb-5 p-3 rounded text-sm"
            >
              <option value="">All</option>
              <option value="hard">Hard</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
            </select>
          </div>

          <div className="w-full">
            <label htmlFor="img">
              <p className="font-semibold">Upload Thumbnail</p>
            </label>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-3 py-2 mt-2 mb-3 border border-gray-300 rounded cursor-pointer"
            />
            {formData.img && (
              <p className="text-sm text-gray-600">
                Selected: {formData.img.name}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center md:justify-between gap-2 mt-3">
          <button
            type="submit"
            className="w-full sm:w-[48%] md:w-[30%] lg:w-[27%] cursor-pointer py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
          >
            Save & Next
          </button>
          <button
            type="button"
            className="w-full sm:w-[48%] md:w-[30%] lg:w-[22%] cursor-pointer py-3 border rounded-md hover:bg-gray-100 transition"
          >
            Preview Course
          </button>
          <button
            type="button"
            className="w-full sm:w-[48%] md:w-[20%] lg:w-[12%] cursor-pointer py-3 border rounded-md hover:bg-gray-100 transition"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-full sm:w-[48%] md:w-[30%] lg:w-[27%] cursor-pointer py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
          >
            Publish Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
