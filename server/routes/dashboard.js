const express = require("express");
const { auth, isStudent, isInstructor, isAdmin } = require("../middlewares/auth");
const router = express.Router();

// Only logged in users
router.get("/dashboard", auth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to your Dashboard",
        user: req.user,
    });
});

// Only Students
router.get("/student-only", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome Student!",
        user: req.user,
    });
});

// Only Instructors
router.get("/instructor-only", auth, isInstructor, (req, res) => {
    res.json({
        success: true,
        message: "Welcome Instructor!",
        user: req.user
    });
});

// Only Admin
router.get("/admin-only", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome Admin!",
        user: req.user
    });
});

module.exports = router;
