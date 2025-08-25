const express = require("express");
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/Student");

// Add Student
router.post("/create", createStudent);

// Get All Students
router.get("/", getAllStudents);

// Get student by ID           
router.get("/:id", getStudentById);

// Update student      
router.put("/:id", updateStudent);

// Delete student        
router.delete("/:id", deleteStudent);

module.exports = router;
