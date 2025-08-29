const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
     otp: {
        type: String,
        required: true,
    },
     createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60,
    },
});

//a function  => to send emails
async function sendVarificationEmail(email, otp){
    try {
        const mailResponse = await mailSender(email, "varification Email from Learning Management System", otp);
        console.log("Email sent Successfully", mailResponse);
        //return mailResponse;
    }
    catch(error){
        console.log("error occured while sending emails", error);
        throw error;
    }
}

OTPschema.pre("save", async function(next){
    await sendVarificationEmail(this.email, this.otp);
    next();
})
module.exports = mongoose.model("OTP", OTPschema);