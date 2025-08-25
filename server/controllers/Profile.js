const Profile = require("../models/Profile");

// Create Profile
exports.createProfile = async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;

    const profile = await Profile.create({ name, email, password, bio });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Profile by ID
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { name, bio },
      { new: true }
    );

    res.json({ success: true, message: "Profile updated", data: profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Profile
exports.deleteProfile = async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
