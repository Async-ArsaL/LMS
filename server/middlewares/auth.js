const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    let token = null;

    // Get token from cookies, body or header
    if (req.cookies?.token) token = req.cookies.token;
    else if (req.body?.token) token = req.body.token;
    else if (req.headers?.authorization) token = req.headers.authorization.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ success: false, message: "Token is missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) return res.status(401).json({ success: false, message: "User not found" });

      req.user = user; // full user object
      next();
    } catch (err) {
      console.log("JWT verify error:", err.message); // Debug JWT issues
      return res.status(401).json({ success: false, message: "Token is invalid" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "Something went wrong while validating the token" });
  }
};

exports.isStudent = (req, res, next) => {
  if (req.user.role !== "Student") return res.status(403).json({ success: false, message: "Protected route for Student only" });
  next();
};

exports.isInstructor = (req, res, next) => {
  if (req.user.role !== "Instructor") return res.status(403).json({ success: false, message: "Protected route for Instructor only" });
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") return res.status(403).json({ success: false, message: "Protected route for Admin only" });
  next();
};
