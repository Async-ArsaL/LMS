const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    course: {
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    },
    ammount: Number,
    status: {
        type: String,
        enum:['pending', 'completed', 'failed']
    },

    paymentMethod: String,
    transactionId: String,
    createdAt: Date

})

module.exports = mongoose.model("Payment", paymentSchema);