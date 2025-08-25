const express = require("express");
const router = express.Router();
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/Profile");

// Create profile
router.post("/create", createProfile);

// Get profile by id  
router.get("/:id", getProfile);

// Update profile
router.put("/:id", updateProfile);

// Delete profile        
router.delete("/:id", deleteProfile);

module.exports = router;
