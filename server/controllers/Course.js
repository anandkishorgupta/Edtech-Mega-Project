import dotenv from "dotenv";
import Category from "../models/Category.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import { uploadToCloudinary } from "../utils/imageUploader.js";
dotenv.config();

// create course handler function
export const createCourse = async (req, res) => {
  console.log("*************************************************************");
  console.log(process.env.FOLDER_NAME);
  try {
    // get user id from request body
    const userId = req.user.id;
    // fetch data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category, // this is id of category
      instructions: _instructions, //'["Step 1: Install Node.js", "Step 2: Create a Mongoose model"]' //here instruction is assigned to _instruction
      tag: _tag, //'["JavaScript", "Node.js", "Mongoose"]'
      status,
    } = req.body; //here Category is Category id

    // get thumbnail
    const thumbnail = req.files.thumbnailImages;

    // Convert the tag and instructions from stringified Array to Array
    const tag = JSON.parse(_tag);
    const instructions = JSON.parse(_instructions);
    console.log("tag", tag);
    console.log("instructions", instructions);
    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag.length ||
      !thumbnail ||
      !category ||
      !instructions.length
    ) {
      return req.status().json({
        success: false,
        message: "All fields are required ",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }

    // check user is instructor for Instructor
    const instructorDetail = await User.findById(userId, {
      accountType: "Instructor",
    });

    console.log("instructorDetail: ", instructorDetail);

    if (!instructorDetail) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }
    // check given Category is valid or not
    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details not found ",
      });
    }

    // upload image to cloudinary
    const thumbnailImage = await uploadToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    console.log("after cloudinart");

    // create an entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetail._id,
      instructions,
      whatYouWillLearn,
      price,
      category: categoryDetails._id,
      tag,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    });
    // add this course to the user schema of instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetail._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // update the category schema
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create Course ",
      error: error,
    });
  }
};

// getAllCourses handler function
export const showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "cannot fetch courses data",
      error: error.message,
    });
  }
};

// get  particular course details
export const getCourseDetails = async (req, res) => {
  try {
    // fetch courseId
    const { courseId } = req.body;
    // validation
    if (courseId) {
      return res.status(400).json({
        success: false,
        message: "Invalid course Id ",
      });
    }

    // find courseDetails from db
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("ratingAndReviews")
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `could not find the course with ${courseId}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Course data fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// update course detail
export const updateCourse = async (req, res) => {
  console.log(
    "from updated course ***************************************************"
  );
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const updateKeys = Object.keys(req.body); // array of keys


    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }


    // i can use this logic also to update the required fields
    //   if (courseName !== undefined) {
    //     course.courseName = courseName
    // }


    // handling images
    if (req.files) {
      const thumbnail = req.files.thumbnailImage;
      // upload to cloudinary to get thumbnails link
      const thumbnailImage = await uploadToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      // modify course object
      course.thumbnail = thumbnailImage.secure_url;
    }

    // HANDLING TAGS and Instructions
    updateKeys.forEach((key) => {
      if (key == "tag" || key == "instructions") {
        course[key] = JSON.parse(updates[key]);
      } else {
        course[key] = updates[key];
      }
    });
    // the save method of Mongoose is used to update an existing document in the database if it already exists
    await course.save();
    //db call and populate
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("ratingAndReviews")
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: courseDetails
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create Course ",
      error: error,
    });
  }
};
