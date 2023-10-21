import dotenv from "dotenv";
import mongoose from "mongoose";
import Category from "../models/Category.js";
import Course from "../models/Course.js";
import CourseProgress from "../models/CourseProgress.js";
import Section from "../models/Section.js";
import SubSection from "../models/SubSection.js";
import User from "../models/User.js";
import { uploadToCloudinary } from "../utils/imageUploader.js";
import { secondsToHMS } from "../utils/secondsToHMS.js";
dotenv.config();

// create course handler function
export const createCourse = async (req, res) => {

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
    const instructorDetail = await User.findOne({
      _id: userId,
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

    // update the category schema-- include the course in category schema 
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
      { status: "Published" },
      // fields to include in the result
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

// get  particular course details-- used when user student click on specific course to view course , consisting but and add to cart options 
export const getCourseDetails = async (req, res) => {
  try {
    // fetch courseId
    const { courseId } = req.body;
    console.log(courseId)
    // validation    
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Invalid course Id ",
      });
    }

    // find courseDetails from db
    const courseDetails = await Course.findById(courseId)
      .populate("instructor")
      .populate({
        path: "ratingAndReviews",
        populate: {
          path: "user"
        }
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl"
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

// get full course details authenticated       
export const getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails"
        }
      })
      .populate("ratingAndReviews")
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection"
        }
      }).exec()


    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `course with course id ${courseId} not exist`
      })
    }

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userID: userId
    })

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((section) => {
      section.subSection.forEach((sub) => {
        const timeLengthInSecond = parseInt(sub.timeDuration)
        totalDurationInSeconds += timeLengthInSecond
      })
    })

    const totalDuration = secondsToHMS(totalDurationInSeconds)
    res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideo ? courseProgressCount?.completedVideo : []
      }

    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error
    })

  }
}

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



// get instructor courses
export const getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    // Find the courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId
    }).sort({ createdAt: -1 }).populate({
      path: "courseContent",
      populate: {
        path: "subSection"
      }
    })

    if (!instructorCourses) {
      return res.status(400).json({
        success: false,
        message: "Instructor course not found"
      })
    }

    // append duration of course to each course object

    let instructorCoursesWithDuration = instructorCourses.map((course) => {
      let duration = 0



      course.courseContent.forEach((section) => {
        section.subSection.forEach((sub) => {
          duration += parseFloat(sub.timeDuration)
        })







      })
      return {
        // convert mongoose object to js object 
        ...course.toObject(),
        duration: secondsToHMS(duration)
      }
    })


    // Respond with the instructor's courses
    res.status(200).json({
      success: true,
      // data: instructorCourses,
      data: instructorCoursesWithDuration

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message
    });
  }
};


// delete a course 
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // find the course 
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      })
    }
    // Unenroll students from the course ************

    const studentsEnrolled = course.studentsEnrolled
    //i get the array of  id of students enrolled in that course [studentId]
    // for (const studentId of studentsEnrolled) {
    //   await User.findByIdAndUpdate(studentId, {
    //     $pull: {
    //       courses: courseId
    //     }
    //   })
    // }
    // alternative way
    await User.updateMany(
      { _id: { $in: studentsEnrolled } },
      {
        $pull: { courses: new mongoose.Types.ObjectId(courseId) }
      }
    )
    // DELETE SECTION AND SUBSECTION OF THIS COURSE 
    const courseSections = course.courseContent //courseSection contains the section id of that course -- not populated 

    for (const sectionId of courseSections) {
      const { subSection } = await Section.findById(sectionId).select("subSection").exec()
      console.log("susectionsid...........", subSection)
      // delete subsections
      await SubSection.deleteMany({
        _id: { $in: subSection }
      })

    }

    // delete section***************
    await Section.deleteMany(
      { _id: { $in: courseSections } }
    )

    // DELETE COURSE FROM CATEGORY
    await Category.findByIdAndUpdate(course.category, {
      $pull: {
        courses: course._id
      }
    })

    // FINALLY DELETE THE COURSE 
    await Course.findByIdAndDelete(courseId)

    // SEND RESPONSE
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}


// DELETE MANY COURSES AT ONCE 
export const deleteManyCourses = async (req, res) => {
  try {

    const { courseId } = req.body

    // find the course 
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      })
    }
    // Unenroll students from the course ************

    const studentsEnrolled = course.studentsEnrolled
    await User.updateMany(
      { _id: { $in: studentsEnrolled } },
      {
        $pull: { courses: new mongoose.Types.ObjectId(courseId) }
      }
    )
    // DELETE SECTION AND SUBSECTION OF THIS COURSE 
    const courseSections = course.courseContent //courseSection contains the section id of that course -- not populated 

    for (const sectionId of courseSections) {
      const { subSection } = await Section.findById(sectionId).select("subSection").exec()
      console.log("susectionsid...........", subSection)
      // delete subsections
      await SubSection.deleteMany({
        _id: { $in: subSection }
      })

    }

    // delete section***************
    await Section.deleteMany(
      { _id: { $in: courseSections } }
    )

    // FINALLY DELETE THE COURSE 
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}


