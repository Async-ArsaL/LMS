const User = require("../models/User");
const Instructor = require("../models/Instructor");
const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");

require("dotenv").config();

// Send OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    let otp = otpGenerator.generate(6, {
      uppercaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        uppercaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }

    const otpPayload = { email, otp };
    await OTP.create(otpPayload);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// SignUp
exports.signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Status based on role
    let status = "active"; 
    if (role === "Instructor" || role === "Admin") status = "pending";

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "Student",
      status,
    });

    // Role-based collection entry
    let extraData = null;
    if ((role || "Student") === "Student") {
      const student = await Student.create({
        user: user._id,
        profile: null,
        enrolledCourses: [],
      });
      extraData = { _id: student._id };
    } else if (role === "Instructor") {
      const instructor = await Instructor.create({
        user: user._id,
        profile: null,
        courses: [],
      });
      extraData = { _id: instructor._id };
    }

    res.status(200).json({
      success: true,
      message:
        status === "pending"
          ? "Signup successful! Waiting for admin approval."
          : "User registered successfully",
      user: { name: user.name, email: user.email, role: user.role, status },
      extra: extraData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again",
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, please sign up",
      });
    }

    // Pending check
    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: `Your account is ${user.status}. Please wait for approval.`,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Password is incorrect" });
    }

    const payload = { email: user.email, id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    let studentData = null;
    if (user.role === "Student") {
      const student = await Student.findOne({ user: user._id });
      if (student) studentData = { _id: student._id };
    }

    user.password = undefined;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: { name: user.name, email: user.email, role: user.role },
      student: studentData,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Login failed, please try again" });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.id;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error, try again later",
    });
  }
};
