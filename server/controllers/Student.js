const Student = require("../models/Student");

// Create Student
exports.createStudent = async (req, res) => {
  try {
    const { user, profile, enrolledCourses } = req.body;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

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

// Get all Students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("user", "name email")
      .populate("profile", "bio")
      .populate("enrolledCourses", "title thumbnail");

    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("user", "name email")
      .populate("profile", "bio")
      .populate("enrolledCourses", "title thumbnail");

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Student 
exports.updateStudent = async (req, res) => {
  try {
    const { enrolledCourses } = req.body;

    const student = await Student.findById(req.params.id);
    if (!student)
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });

    // Add new courses avoiding duplicates
    if (enrolledCourses && Array.isArray(enrolledCourses)) {
      enrolledCourses.forEach((courseId) => {
        if (!student.enrolledCourses.includes(courseId)) {
          student.enrolledCourses.push(courseId);
        }
      });
    }

    // Update other fields
    Object.keys(req.body).forEach((key) => {
      if (key !== "enrolledCourses") {
        student[key] = req.body[key];
      }
    });

    await student.save();

    await student.populate([
      { path: "user", select: "name email" },
      { path: "profile", select: "bio" },
      { path: "enrolledCourses", select: "title thumbnail" },
    ]);

    res.json({ success: true, message: "Student updated", data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Enroll a course
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const student = await Student.findById(req.params.id);

    if (!student)
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });

    if (courseId && !student.enrolledCourses.includes(courseId)) {
      student.enrolledCourses.push(courseId);
    }

    await student.save();

    await student.populate([
      { path: "user", select: "name email" },
      { path: "profile", select: "bio" },
      { path: "enrolledCourses", select: "title thumbnail" },
    ]);

    res.json({ success: true, message: "Course enrolled", data: student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
