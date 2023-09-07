import mongoose from "mongoose"
import Course from "../models/Course.js"
import RatingAndReviews from "../models/RatingAndReviews"


// createRating
export const createRating = async (req, res) => {
    try {
        // get data
        const { rating, review, courseId } = req.body

        const userId = req.user.id
        // validation
        if (!rating || !review || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required "
            })
        }
        // check user is enrolled or not in the course
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } }
        });

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "You are not enrolled in this course"
            })
        }
        // check user already reviewed the course
        const alreadyReviewed = await RatingAndReviews.findOne({ course: courseId, user: userId })
        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "Course is already reviewed"
            })
        }
        // save to rating and review model
        const ratingReview = await RatingAndReviews.create({
            rating,
            review,
            user: userId,
            course: courseId
        })

        // update the Course model 
        await Course.findByIdAndUpdate(courseId, {
            $push: {
                ratingAndReviews: ratingReview._id
            }
        })
        // return response 
        return res.status(200).json({
            success: true,
            message: "Rating and Review created Successfully",
            ratingReview
        })
    } catch (error) {
        console.log(error)
        return req.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// get average rating

export const getAverageRating = async (req, res) => {
    try {
        // get course id 
        const { courseId } = req.body;
        // validation 
        if (courseId) {
            return res.status(400).json({
                success: false,
                message: "course Id is required "
            })
        }
        // calculate avg rating 
        const result = await RatingAndReviews.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }
                }
            }
        ])
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0]
            })
        }
        // if no rating/review exist
        return res.status(200).json({
            success: true,
            message: "Average Rating is 0 , no rating given till now ",
            averageRating: 0
        })
    } catch (error) {
        console.log(error)
        return req.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// getAllRating&review
export const getAllRating = async (req, res) => {
    try {
        // get courseId
        const { courseId } = req.body
        // fetch from db
        // const ratingAndReviews = await RatingAndReviews.find({ course: courseId }).populate("user")
        const allRatingAndReviews = await RatingAndReviews.find({}).sort({ rating: "desc" }).populate({
            path: "user",
            select: " firstName lastName email image "
        }).populate({
            path: "course",
            select: "courseName"
        }).exec()
        // if not found 
        if (!allRatingAndReviews) {
            return res.status(400).json({
                success: false,
                message: "No rating and reviews "
            })
        }
        res.status(200).json({
            success: true,
            message:"All reviews fetched successfully",
            allRatingAndReviews
        })
    } catch (error) {
        console.log(error)
        return req.status(500).json({
            success: false,
            message: error.message
        })
    }
}
