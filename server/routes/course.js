const express = require("express");
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/Course");

//Create new course
router.post("/", createCourse);

//Get all courses
router.get("/", getAllCourses);

//Get course by ID
router.get("/:id", getCourseById);

//Update course
router.put("/:id", updateCourse);

// Delete course
router.delete("/:id", deleteCourse);

module.exports = router;

