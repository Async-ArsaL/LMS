const User = require('../models/User');
const Instructor = require('../models/Instructor');
const Student = require('../models/Student'); // agar Student collection hai
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const OTP = require('../models/OTP');
const otpGenerator = require("otp-generator");
require('dotenv').config();

//send OTP
exports.sendOTO = async (req, res) => {
    try {
        //fetch  email from request body
        const { email } = req.body;

        //check if user already exist
        const checkUserPresent = await User.findOne({ email });

        // if user already exist then return a response
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: " User already registered",
            })
        }

        //generate otp

        var otp = otpGenerator.generate(6, {
            uppercaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP Generator", otp);

        //check unique otp or not
        let result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator(6, {
                uppercaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            result = await OTP.findOne({otp: otp});
        }

        const otpPayload = {email, otp};

        //create an entry in DB
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        //return response successful
        res.status(200).json({
            success:true,
            message:"OTP sent Successfully", otp
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:error.message,
        })
    }
}

// signUp
exports.signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "User already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role: role || "Student" });

    res.status(201).json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "User cannot be registered, Please try again" });
  }
};

//Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "User not registered, please sign up" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid password" });

    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

    user.password = undefined; // hide password
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 3*24*60*60*1000 });
    res.status(200).json({ success: true, message: "Logged in successfully", token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed, please try again" });
  }
};
