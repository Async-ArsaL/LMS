const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
    },

    courseDescription: {
        type: String,
    },

    instructor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],

    category: {
        type: String,  
        required: true,
    },

    createdAt: Date,
    updatedAt: Date,

    thumbnail: {
        type: String,
    },
});

module.exports = mongoose.model("Course", courseSchema);
