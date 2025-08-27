import { sendOtp, verifyOtp } from "../controllers/EmailVerify";
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);