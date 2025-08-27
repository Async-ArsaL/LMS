import React, { useState } from "react";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
    level: "",
    img: null,
  });

  // handle changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-white to-blue-200 flex flex-col items-center p-4 sm:p-6">
      {/* Top Section */}
      <div className="m-4 w-full sm:w-[90%] md:w-[80%] lg:w-[75%] flex flex-row flex-wrap justify-between items-center gap-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
          Step: 1 Create Course
        </h1>

        {/* Progress Bar */}
        <div className="flex-1 min-w-[150px] mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-2 bg-blue-400 w-[30%] rounded-full"></div>
        </div>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-grow w-full sm:w-[90%] md:w-[80%] lg:w-[75%] rounded-lg p-3"
      >
        {/* Course Title */}
        <label htmlFor="title">
          <h2 className="text-black font-semibold">Course Title</h2>
        </label>
        <input
          type="text"
          onChange={handleChange}
          className="w-full p-3 mt-2 mb-3 rounded-md border border-gray-300 outline-none focus:ring-1 focus:ring-blue-400"
          placeholder="Enter course title"
          id="title"
          name="title"
          value={formData.title}
        />

        {/* Description */}
        <label htmlFor="desc">
          <h2 className="text-black font-semibold">Description</h2>
        </label>
        <textarea
          className="w-full p-3 mt-2 mb-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Provide a clear, compelling description to attract students."
          id="desc"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          required
          rows="2"
        ></textarea>

        {/* Category */}
        <label className="block font-semibold">Category</label>
        <select
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

        {/* Level + Upload */}
        <div className="flex flex-col md:flex-row gap-2">
          {/* Level */}
          <div className="w-full">
            <label htmlFor="level">
              <p className="block font-semibold">Level</p>
            </label>
            <select
              className="w-full border border-gray-300 mt-2 mb-5 p-3 rounded text-sm"
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              id="level"
            >
              <option value="">All</option>
              <option value="hard">Hard</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
            </select>
          </div>

          {/* Upload Thumbnail */}
          <div className="w-full">
            <label htmlFor="img">
              <p className="font-semibold">Upload Thumbnail</p>
            </label>
            <input
              required
              type="file"
              id="img"
              name="img"
              accept="image/*"
              className="w-full px-3 py-2 mt-2 mb-3 border border-gray-300 rounded cursor-pointer"
              onChange={handleChange}
            />
            {formData.img && (
              <p className="text-sm text-gray-600">
                Selected: {formData.img.name}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
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
