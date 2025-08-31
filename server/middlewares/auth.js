const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Main auth middleware
exports.auth = async (req, res, next) => {
  try {
    let token = null;

    // Extract token from cookies, body, or headers
    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.body?.token) {
      token = req.body.token;
    } else if (req.headers?.authorization) {
      token = req.headers.authorization.replace("Bearer ", "");
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Token is missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      req.user = user; // Store user in request
      next();
    } catch (err) {
      console.error("JWT Error:", err.message);
      return res.status(401).json({ success: false, message: "Token is invalid" });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error verifying token",
    });
  }
};

// Role-based access control middlewares
exports.isStudent = (req, res, next) => {
  if (req.user.role !== "Student") {
    return res.status(403).json({ success: false, message: "Access restricted to Students only" });
  }
  next();
};

exports.isInstructor = (req, res, next) => {
  if (req.user.role !== "Instructor") {
    return res.status(403).json({ success: false, message: "Access restricted to Instructors only" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ success: false, message: "Access restricted to Admins only" });
  }
  next();
};

exports.isPrincipal = (req, res, next) => {
  if (req.user.role !== "Principal") {
    return res.status(403).json({ success: false, message: "Access restricted to Principals only" });
  }
  next();
};
