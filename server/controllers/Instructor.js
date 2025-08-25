const Instructor = require("../models/Instructor");

// Create Instructor
exports.createInstructor = async (req, res) => {
  try {
    const { user, myCourses, profile } = req.body;

    const instructor = await Instructor.create({ user, myCourses, profile });

    res.status(201).json({
      success: true,
      message: "Instructor created successfully",
      data: instructor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get All Instructors
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find()
      .populate("user", "name email")     // User ka name, email
      .populate("profile", "bio")         // Profile ka bio
      .populate("myCourses", "title");    // Courses ka sirf title

    res.json({ success: true, data: instructors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Instructor by ID
exports.getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id)
      .populate("user", "name email")
      .populate("profile", "bio")
      .populate("myCourses", "title");

    if (!instructor) {
      return res.status(404).json({ success: false, message: "Instructor not found" });
    }

    res.json({ success: true, data: instructor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Update Instructor
exports.updateInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("user", "name email")
      .populate("profile", "bio")
      .populate("myCourses", "title");

    res.json({ success: true, message: "Instructor updated", data: instructor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Delete Instructor
exports.deleteInstructor = async (req, res) => {
  try {
    await Instructor.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Instructor deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
