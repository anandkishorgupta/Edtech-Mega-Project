// import mongoose from "mongoose";
import { instance } from "../config/razorpay.js";
// import Course from "../models/Course.js";
// import User from "../models/User.js";
// import mailSender from "../utils/mailSender.js";

import mongoose from "mongoose";
import { courseEnrollmentEmail } from "../mail/templates/courseEnrollmentEmail.js";
import { paymentSuccessEmail } from "../mail/templates/paymentSuccessEmail.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import mailSender from "../utils/mailSender.js";

export const capturePayment = async (req, res) => {
    const { courses } = req.body // id of all courses
    const userId = req.user.id
    if (courses.length === 0) {
        return res.json({
            success: false,
            message: "please provide the course id"
        })
    }
    let totalAmount = 0
    for (const course_id of courses) {
        let course;
        try {
            course = await Course.findById(course_id)
            // check if course exist
            if (!course) {
                return res.status(200).json({
                    success: false,
                    message: "Could not find the course"
                })
            }
            // check if already student bought the course
            const uid = new mongoose.Types.ObjectId(userId)
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    success: false,
                    message: "Student is already enrolled"
                })
            }
            // calculating the total price
            totalAmount += course.price
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            })

        }
    }

    const options = {
        amount: totalAmount,
        currency: "INR",
        receipt: Date.now().toString()
    }
    // create order
    try {
        const paymentResponse = await instance.orders.create(options)
        res.json({
            success: true,
            data: paymentResponse
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Could not initiate order"
        })
    }
}

// verify the payment
export const verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature

    const courses = req.body?.courses; //courses id 
    const userId = req.body.id

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(200).json({
            success: false,
            message: "Payment failed "
        })
    }
    let body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex")

    if (expectedSignature === razorpay_signature) {
        // enroll the student
        await enrolledStudent(courses, userId, res)
        return res.status(200).json({
            success: true,
            message: "payement verified"
        })
    }
    return res.status(200).json({
        success: false,
        message: "Payment failed"
    })
}

const enrolledStudent = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide data for courses or UserId"
        })
    }

    try {
        for (const courseId of courses) {
            // enroll the user id in course document
            const enrolledCourse = await Course.findByIdAndUpdate(courseId, {
                $push: {
                    studentsEnrolled: userId
                }
            }, { new: true })

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "Course not found "
                })

            }
            // enroll the courses in user document
            const enrolledStudent = await User.findByIdAndUpdate(userId, {
                $push: {
                    courses: courseId
                }
            }, { new: true })

            if (!enrolledStudent) {
                return res.status(500).json({
                    success: false,
                    message: "user not found "
                })

            }
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
            )

            console.log("email send successfully", emailResponse.response)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// send email succesfull
export const sendPaymentSuccessEmail = async (req, res){
    const { orderId, paymentId, amount } = req.body
    const userId = req.user.id
    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "please provide all the field "
        })
    }
    try {
        // find the students 
        const enrolledStudent = await User.findById(userId)
        await mailSender(enrolledStudent.email, "Payment Received",
            paymentSuccessEmail(`${enrolledStudent.firstName}`, amount / 100, orderId, paymentId)
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "could not send email"
        })

    }
}






// // capture the payment and initiate the razorpay order
// export const capturePayment = async (req, res) => {
//     // get course id and user id
//     const { courseId } = req.body;
//     const userId = req.user.id;
//     // valid courseId
//     if (!courseId) {
//         return res.json({
//             success: false,
//             message: "Please provide valid course id "
//         })
//     }
//     // valid courseDetail
//     let course;
//     try {

//         course = await Course.findById(courseId)
//         if (!course) {
//             return res.json({
//                 success: false,
//                 message: "Could not found the course "
//             })
//         }
//         // user already paid for the same course
//         const uid = new mongoose.Types.ObjectId(userId)
//         if (course.studentsEnrolled.includes(uid)) {
//             return res.status(200).json({
//                 success: false,
//                 message: "Student is already enrolled "
//             })
//         }

//     } catch (error) {
//         console.error(error)
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })

//     }
//     const amount = course.price
//     const currency = "INR"
//     const options = {
//         amount: amount * 100,
//         currency: currency,
//         receipt: (Date.now()).toString(),
//         notes: {
//             courseId: course._id,
//             userId
//         }
//     }
//     try {
//         // initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options)
//         console.log(paymentResponse)
//         // return response 
//         return res.status(200).json({
//             success: false,
//             courseName: course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount
//         })
//     } catch (error) {
//         console.log(error)
//         res.json({
//             success: false,
//             message: "Could not initiate order"
//         })
//     }
// };


// // verify signature of Razorpay and Server
// export const verifySignature = async (req, res) => {
//     const webhookSecret = "123456"
//     const signature = req.headers["x-razorpay-signature"]

//     const shasum = crypto.createHmac("sha256", webhookSecret)
//     shasum.update(JSON.stringify(req.body))
//     const digest = shasum.digest("hex")

//     if (signature === digest) {
//         console.log("payment is Authorised")
//         const { courseId, userId } = req.body.payload.payment.entity.notes
//         try {
//             // fulfill the action 
//             // find the course and enroll the student in course
//             const enrolledCourse = await Course.findByIdAndUpdate(courseId, {
//                 $push: {
//                     studentsEnrolled: userId
//                 }
//             }, { new: true })

//             if (!enrolledCourse) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "Course not found"
//                 })
//             }
//             // find the student and add course
//             const enrolledStudent = await User.findByIdAndUpdate(userId, { $push: { courses: courseId } }, { new: true })
//             console.log(enrolledStudent)
//             // mail send confirmation
//             const emailResponse = await mailSender(enrolledStudent.email, "Congratulation", "you are enroled in the course")
//             console.log(emailResponse)
//             return res.status(200).json({
//                 success: true,
//                 message: "signature verified and course added"
//             })
//         } catch (error) {
//             console.log(error)
//             res.status(200).json({
//                 success: true,
//                 message: error.message
//             })
//         }

//     }
//     else{
//         return res.status(400).json({
//             success:false,
//             message:"Invalid request "
//         })
//     }


// }
