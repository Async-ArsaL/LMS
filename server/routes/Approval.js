// routes/Approval.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
 
const {
  getPendingUsers,
  approveUser,
  rejectUser,
} = require("../controllers/Approval");

const { auth, isPrincipal } = require("../middlewares/auth");


router.get("/pending", auth, isPrincipal, getPendingUsers);
router.put("/approve/:id", auth, isPrincipal, approveUser);
router.put("/reject/:id", auth, isPrincipal, rejectUser);

router.get("/test", async (req, res) => {
  try {
    const users = await User.find({ status: "pending" });
    res.json({ success: true, data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});


module.exports = router;
