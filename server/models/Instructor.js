const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  myCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  status: {
    type: String,
    enum: ["pending", "active", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Instructor", instructorSchema);
