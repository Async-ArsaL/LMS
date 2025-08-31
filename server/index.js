const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

// Database connection
const { connect } = require("./config/database");
connect();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Uploads folder public
app.use("/uploads", express.static("uploads"));

// Import routes
const userRoutes = require("./routes/user"); // Auth, login, signup
const dashboardRoutes = require("./routes/dashboard"); // Dashboard related APIs
const profileRoutes = require("./routes/profile"); // Profile CRUD
const studentRoutes = require("./routes/student"); // Student CRUD + enrolledCourses
const courseRoutes = require("./routes/course"); // Course CRUD
const instructorRoutes = require("./routes/instructor"); // Instructor routes
const adminRoutes = require("./routes/admin"); // Admin routes
const authRoutes = require("./routes/Approval");

// Mount API routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v2/dashboard", dashboardRoutes);
app.use("/api/v3/profile", profileRoutes);
app.use("/api/v4/students", studentRoutes);
app.use("/api/v5/courses", courseRoutes);
app.use("/api/v6/instructors", instructorRoutes);
app.use("/api/v7/admin", adminRoutes);
app.use("/api/v7/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started successfully on port ${PORT}`);
});
