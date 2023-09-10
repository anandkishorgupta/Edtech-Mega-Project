import Course from "../models/Course.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";

// update Profile 
export const updateProfile = async (req, res) => {
    try {
        // fetch profile Id
        const { gender, dateOfBirth = "", about = "", contactNumber } = req.body;

        // get userId
        const id = req.user.id
        // validation
        if (!contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are  required"
            })
        }
        // find profile 
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        // find and update it
        // const updatedProfile = await Profile.findByIdAndUpdate(profileId, {
        //     gender,
        //     dateOfBirth,
        //     about,
        //     contactNumber
        // })
        const profileDetail = await Profile.findById(profileId)
        // update profile
        profileDetail.dateOfBirth = dateOfBirth;
        profileDetail.about = about;
        profileDetail.gender = gender
        profileDetail.contactNumber = contactNumber
        // save to db
        await profileDetail.save();
        // return response
        res.status(200).json({
            success: true,
            message: "profile updated successfully",
            profileDetail
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
        // fetch userId
        const { id } = req.user._id
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
        const { id } = req.user._id
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
      const image = await uploadImageToCloudinary(
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
      )
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
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};