const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["Student", "Instructor", "Admin", "Principal"],
      default: "Student",
    },
    status: {
      type: String,
      enum: ["pending", "active", "rejected"],
      default: function () {
        return this.role === "Student" ? "active" : "pending";
      },
    },
    enrolledCourse: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enrollment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
