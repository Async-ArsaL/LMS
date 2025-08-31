const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },

    permissions: { type: [String] },
    status: {
      type: String,
      enum: ["pending", "active", "rejected"],
      default: "pending",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
