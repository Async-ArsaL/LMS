const express = require("express");
const router = express.Router();

const { auth, isInstructor } = require("../middlewares/auth");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require("../controllers/Course");

// Create new course (protected, Instructor only)
router.post("/", auth, isInstructor, createCourse);

// Get all courses
router.get("/", getAllCourses);

// Get course by ID
router.get("/:id", getCourseById);

// Update course
router.put("/:id", auth, isInstructor, updateCourse);

// Delete course
router.delete("/:id", auth, isInstructor, deleteCourse);

module.exports = router;
