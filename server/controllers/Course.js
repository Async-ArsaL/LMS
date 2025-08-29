const Course = require("../models/Course");

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const { title, desc, category, level, price, instructor, thumbnail } = req.body;

    if (!title || !desc || !category || !level || !price || !instructor) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const course = await Course.create({
      title,
      desc,
      category,
      level,
      price,
      instructor,
      thumbnail,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");

    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email"
    );

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Course
exports.updateCourse = async (req, res) => {
  try {
    const { title, desc, category, level, price, instructor, thumbnail } = req.body;

    const updatedData = {
      ...(title && { title }),
      ...(desc && { desc }),
      ...(category && { category }),
      ...(level && { level }),
      ...(price && { price }),
      ...(instructor && { instructor }),
      ...(thumbnail && { thumbnail }),
      updatedAt: new Date(),
    };

    const course = await Course.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    }).populate("instructor", "name email");

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.json({ success: true, message: "Course updated successfully", data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
