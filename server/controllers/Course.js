import dotenv from "dotenv";
import Category from "../models/Category.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import { uploadToCloudinary } from "../utils/imageUploader.js";
dotenv.config()


// create course handler function
export const createCourse = async (req, res) => {
    try {
        // fetch data 
        const { courseName, courseDescription, whatYouWillLearn, price, category } = req.body  //here Category is Category id 

        // get thumbnail
        const thumbnail = req.files.thumbnailImages
        // validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail) {
            return req.status().json({
                success: false,
                message: "All fields are required "
            })
        }
        // check for Instructor

        const userId = req.user._id;
        const instructorDetail = await User.findById(userId)
        console.log("instructorDetail: ", instructorDetail)


        if (!instructorDetail) {
            return res.status(404).json({
                success: false,
                message: "Instructor details not found"
            })
        }
        // check given Category is valid or not
        const categoryDetails = await Category.findById(category)
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details not found "
            })
        }
        // upload image to cloudinary
        const thumbnailImage = await uploadToCloudinary(thumbnail, process.env.FOLDER_NAME)
        // create an entry for new course 
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetail._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            // category:category
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url
        })
        // add this course to the user schema of instructor 
        await User.findByIdAndUpdate({ _id: instructorDetail._id }, {
            $push: {
                courses: newCourse._id
            }
        }, { new: true })

        // update the category schema 
        await Category.findByIdAndUpdate({ _id: category }, {
            $push: {
                course: newCourse._id
            }
        })

        // return response 
        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Failed to create Course ",
            error: error.message
        })
    }
}

// getAllCourses handler function 
export const showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true
        }).populate("instructor").exec()
        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "cannot fetch courses data",
            error: error.message
        })

    }
}