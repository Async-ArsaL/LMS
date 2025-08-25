const express = require("express");
const router = express.Router();
const {
  createInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
} = require("../controllers/Instructor");

//Create Instructor
router.post("/", createInstructor);

//Get All Instructors
router.get("/", getAllInstructors);

//Get Instructor by ID
router.get("/:id", getInstructorById);

//Update Instructor
router.put("/:id", updateInstructor);

//Delete Instructor
router.delete("/:id", deleteInstructor);

module.exports = router;
