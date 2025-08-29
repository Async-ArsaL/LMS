const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    desc: {  
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        required: true,
    },

    level: {
        type: String,
        enum: ["easy", "medium", "hard"],
        required: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    thumbnail: { 
        type: String,
    },

   instructor: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}

}, {
    timestamps: true 
});

module.exports = mongoose.model("Course", courseSchema);
