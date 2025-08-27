import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

let otpStore = {};  // Simple storage, production me DB use karo

// Send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: "Email required" });

  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  otpStore[email] = otp;

  // Mail setup
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  });

  res.json({ msg: "OTP sent successfully" });
};

// Verify OTP
export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] && otpStore[email] === otp) {
    delete otpStore[email]; // ek bar use karke remove kar do
    return res.json({ msg: "OTP verified successfully" });
  }
  res.status(400).json({ msg: "Invalid OTP" });
};
