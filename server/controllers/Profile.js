import Course from "../models/Course.js";
import CourseProgress from "../models/CourseProgress.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import { uploadToCloudinary } from "../utils/imageUploader.js";
import { secondsToHMS } from "../utils/secondsToHMS.js";
// update Profile 
export const updateProfile = async (req, res) => {
  try {
    // fetch user Id
    const { firstName, lastName, gender, dateOfBirth, about, contactNumber } = req.body;

    // get userId
    const id = req.user.id

    // find profile 
    // const userDetails = await User.findById(id);
    const userDetails = await User.findByIdAndUpdate(id, {
      firstName,
      lastName
    }, {
      new: true
    })

    const profileId = userDetails.additionalDetails;

    const profileDetail = await Profile.findById(profileId)
    console.log(profileDetail)
    // update profile
    profileDetail.dateOfBirth = dateOfBirth;
    profileDetail.about = about;
    profileDetail.gender = gender
    profileDetail.contactNumber = contactNumber

    // save to db
    await profileDetail.save();

    // find the updated user details
    const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec()

    // return response
    res.status(200).json({
      success: true,
      message: "profile updated successfully",
      updatedUserDetails
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message
    })
  }
}

// delete account 
export const deleteAccount = async (req, res) => {
  try {
    console.log("deltee", req.user)
    // fetch userId
    const { id } = req.user
    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User id is required "
      })
    }
    // check user exist
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist"
      })
    }
    // find profile id 
    const profileId = user.additionalDetails;
    // delete from profile model
    await Profile.findByIdAndDelete(profileId)
    //unenroll user from all enrolled courses 
    await Course.deleteMany({ studentsEnrolled: id })
    // delete from user model
    await User.findByIdAndDelete({ _id: id })

    // sending response 
    res.status(200).json({
      success: true,
      message: "Account deleted successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user not deleted ",
      error: error.message
    })
  }
}


// getAllUserDetail
export const getAllUserDetail = async (req, res) => {
  try {
    // get user id 
    const { id } = req.user
    // validation 
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "user id is required "
      })
    }
    const user = await User.findById(id).populate("additionalDetails").exec();

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found  "
      })
    }

    // return response 
    res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      user
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}



export const updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    ).populate("additionalDetails");

    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

export const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    const userDetails = await User.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection"
          }
        }
      })
      .exec();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }


    // let coursesWithDuration = userDetails.courses.map((course) => {
    //   let duration = 0
    //   course.courseContent.forEach((section) => {
    //     section.subSection.forEach((sub) => {
    //       duration += parseFloat(sub.timeDuration)
    //     })

    //   })
    //   return {
    //     // convert mongoose object to js object 
    //     ...course.toObject(),
    //     duration: secondsToHMS(duration)
    //   }
    // })

    // this array contain courses with duration and progress info
    let coursesWithDuration = [];

    for (let i = 0; i < userDetails.courses.length; i++) {
      let course = userDetails.courses[i];
      let duration = 0;
      let subsectionLength = 0
      let progressCount = 0
      let progressPercent = 0
      //  progress
      let progress = await CourseProgress.findOne({
        courseID: course._id,
        userID: userId
      })
      // total no. of completed videos 
      progressCount = progress?.completedVideo?.length
      // subsectionLength = course.courseContent?.subSection?.length

      for (let j = 0; j < course.courseContent.length; j++) {
        let section = course.courseContent[j];
        subsectionLength +=section.subSection.length
        for (let k = 0; k < section.subSection.length; k++) {
          let sub = section.subSection[k];
          duration += parseFloat(sub.timeDuration);
        }
        const multiplier = Math.pow(10, 2)
        progressPercent = Math.round(
          (parseFloat(progressCount) / parseFloat(subsectionLength)) * 100 * multiplier
        ) / multiplier

      }
      coursesWithDuration.push({
        ...course.toObject(),
        duration: secondsToHMS(duration),
        progressPercent
      });
      console.log(progressCount)
      console.log(subsectionLength)
    }


    return res.status(200).json({
      success: true,
      data: coursesWithDuration,
    })






  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};


// instructor  dashboard 
export const instructorDashboard = async (req, res) => {
  console.log("instructor dashboard..........")
  try {
    // all courses of particular instructor 
    const courseDetails = await Course.find({ instructor: req.user.id })

    // return array of object
    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price
      // create a new object with the additional field
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated
      }
      return courseDataWithStats
    })
    return res.status(200).json({
      success: true,
      courses: courseData
    })
  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: error
    })

  }

}