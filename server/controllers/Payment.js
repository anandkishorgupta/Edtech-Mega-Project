import mongoose from "mongoose";
import { instance } from "../config/razorpay";
import Course from "../models/Course";
import User from "../models/User";
import mailSender from "../utils/mailSender";

// capture the payment and initiate the razorpay order
export const capturePayment = async (req, res) => {
    // get course id and user id
    const { courseId } = req.body;
    const userId = req.user._id;
    // valid courseId
    if (!courseId) {
        return res.json({
            success: false,
            message: "Please provide valid course id "
        })
    }
    // valid courseDetail
    let course;
    try {

        course = await Course.findById(courseId)
        if (!course) {
            return res.json({
                success: false,
                message: "Could not found the course "
            })
        }
        // user already paid for the same course
        const uid = new mongoose.Types.ObjectId(userId)
        if (course.studentsEnrolled.includes(uid)) {
            return res.status(200).json({
                success: false,
                message: "Student is already enrolled "
            })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
    const amount = course.price
    const currency = "INR"
    const options = {
        amount: amount * 100,
        currency: currency,
        receipt: (Date.now()).toString(),
        notes: {
            courseId: course._id,
            userId
        }
    }
    try {
        // initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options)
        console.log(paymentResponse)
        // return response 
        return res.status(200).json({
            success: false,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Could not initiate order"
        })
    }
};


// verify signature of Razorpay and Server
export const verifySignature = async (req, res) => {
    const webhookSecret = "123456"
    const signature = req.headers["x-razorpay-signature"]

    const shasum = crypto.createHmac("sha256", webhookSecret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest("hex")

    if (signature === digest) {
        console.log("payment is Authorised")
        const { courseId, userId } = req.body.payload.payment.entity.notes
        try {
            // fulfill the action 
            // find the course and enroll the student in course
            const enrolledCourse = await Course.findByIdAndUpdate(courseId, {
                $push: {
                    studentsEnrolled: userId
                }
            }, { new: true })

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "Course not found"
                })
            }
            // find the student and add course
            const enrolledStudent = await User.findByIdAndUpdate(userId, { $push: { courses: courseId } }, { new: true })
            console.log(enrolledStudent)
            // mail send confirmation
            const emailResponse = await mailSender(enrolledStudent.email, "Congratulation", "you are enroled in the course")
            console.log(emailResponse)
            return res.status(200).json({
                success: true,
                message: "signature verified and course added"
            })
        } catch (error) {
            console.log(error)
            res.status(200).json({
                success: true,
                message: error.message
            })
        }

    }
    else{
        return res.status(400).json({
            success:false,
            message:"Invalid request "
        })
    }


}
