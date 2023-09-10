import dotenv from "dotenv";
import Razorpay from "razorpay";
dotenv.config()
export const instance=new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
})