const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }
    ],
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
    },
});

module.exports = mongoose.model("Student", studentSchema);
