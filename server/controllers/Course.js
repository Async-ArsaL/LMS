const Course = require("../models/Course");
const multer = require("multer");
const path = require("path");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage }).single("thumbnail");

// Create course
exports.createCourse = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });

    try {
      const { title, desc, category, level, price } = req.body;
      if (!title || !desc || !category || !level || !price) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }

      const course = await Course.create({
        title,
        desc,
        category,
        level,
        price,
        thumbnail: req.file ? req.file.filename : null,
        instructor: req.user._id,
      });

      res.status(201).json({ success: true, message: "Course created successfully", data: course });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor", "name email");
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true, runValidators: true }).populate("instructor", "name email");
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });
    res.json({ success: true, message: "Course updated successfully", data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });
    res.json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
