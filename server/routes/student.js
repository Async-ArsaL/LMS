const express = require("express");
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  enrollCourse
} = require("../controllers/Student");

const { auth, isStudent } = require("../middlewares/auth");

// Add Student
router.post("/create", createStudent);

// Get All Students
router.get("/", getAllStudents);

// Get student by ID
router.get("/:id", auth, isStudent, getStudentById);

// Update student (general updates)
router.put("/:id", auth, isStudent, updateStudent);

// Enroll course
router.post("/:id/enroll", auth, isStudent, enrollCourse);

// Delete student
router.delete("/:id", deleteStudent);

module.exports = router;
