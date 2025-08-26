const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
        required: true,
        enum: ["Admin", "Student", "Instructor", "User"],
    },
    enrolledCourse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enrollment',
    }],
    createdAt: Date,
    updatedAt: Date,
})

module.exports = mongoose.model("User", userSchema);