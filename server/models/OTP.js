import mongoose from "mongoose";
import mailSender from "../utils/mailSender";
const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
})
// a function --> to send email
async function sendVerificationEmail(email,otp){
    try {
        const mailResponse=await mailSender(email,"Verification Email from StudyNotion",otp) //title:"Verification email from nodemailer" body:otp
        console.log("Email sent successfully: ",mailResponse)
        
    } catch (error) {
        console.log("error occur while sending mail",error)
        throw error
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp)
    

})
const OTP=mongoose.model("OTP",otpSchema)
export default OTP




 // Call next to continue to the next middleware or save operation