import dotenv from "dotenv";
import Course from "../models/Course.js";
import Tag from "../models/Tags.js";
import User from "../models/User.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
dotenv.config()


// create course handler function
export const createCourse = async (req, res) => {
    try {
        // fetch data 
        const { courseName, courseDescription, whatYouWillLearn, price, tag } = req.body  //here tag is tag id 

        // get thumbnail
        const thumbnail = req.files.thumbnailImages
        // validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail) {
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
        // check given tag is valid or not 
        const tagDetails = await Tag.findById(tag)
        if (!tagDetails) {
            return res.status(404).json({
                success: false,
                message: "Tag Details not found "
            })
        }
        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)
        // create an entry for new course 
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetail._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            // tag:tag
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url
        })
        // add this course to the user schema of instructor 
        await User.findByIdAndUpdate({ _id: instructorDetail._id }, {
            $push: {
                courses: newCourse._id
            }
        }, { new: true })
        // update the tag schema 


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