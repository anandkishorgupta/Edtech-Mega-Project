import mongoose from "mongoose";
import { otpTemplate } from "../mail/templates/emailVerificationTemplate.js";
import mailSender from "../utils/mailSender.js";
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60
    }
})
// a function --> to send email
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", otpTemplate(otp)) //title:"Verification email from nodemailer" body:otp
        console.log("Email sent successfully: ", mailResponse)

    } catch (error) {
        console.log("error occur while sending mail", error)
        throw error
    }
}
// send email after the document has been saved 

otpSchema.pre("save", async function (next) {
    console.log("New document saved to database ")
    // only send an email when a new document is created 
    if (this.isNew) {

        await sendVerificationEmail(this.email, this.otp)
    }
    next();
})
const OTP = mongoose.model("OTP", otpSchema)
export default OTP