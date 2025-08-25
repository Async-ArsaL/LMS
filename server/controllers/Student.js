const Student = require("../models/Student");

// Create Student
exports.createStudent = async (req, res) => {
  try {
    const { user, profile, enrolledCourses } = req.body;

    const student = await Student.create({ user, profile, enrolledCourses });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("user", "name email") // user ka sirf name/email dikhayega
      .populate("profile", "bio")     // profile ka sirf bio dikhayega
      .populate("enrolledCourses", "title"); // course ka sirf title

    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get Student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("user", "name email")
      .populate("profile", "bio")
      .populate("enrolledCourses", "title");

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Update Student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("user", "name email")
      .populate("profile", "bio")
      .populate("enrolledCourses", "title");

    res.json({ success: true, message: "Student updated", data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
