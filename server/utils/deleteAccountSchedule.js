import cron from "node-cron";
import Course from "../models/Course.js";
import CourseProgress from "../models/CourseProgress.js";
import Profile from "../models/Profile.js";
import RatingAndReviews from "../models/RatingAndReviews.js";
import User from "../models/User.js";
import mailSender from "./mailSender.js";

// delete account cron 
export const deleteAccountSchedule = async () => {
    cron.schedule("0 0 * * *",
        async () => {
            try {
                const usersToDelete = await User.find({
                    deleteRequested: true,
                    deletedAt: {
                        $lte: new Date() //less or equals now date 
                    }
                })
                for (let user of usersToDelete) {
                    const profileId = user.additionalDetails;
                    await Profile.findByIdAndDelete(profileId)
                    await Course.deleteMany({ studentsEnrolled: user._id })
                    await RatingAndReviews.deleteMany({ user: user._id })
                    await CourseProgress.deleteMany({ userID: user._id })
                    if (user.accountType == "Instructor") {
                        await Course.deleteMany({ instructor: user._id })
                    }
                    await User.findByIdAndDelete({ _id: user._id })
                    mailSender(user.email, "Account Deletion", "Account deleted successfully")
                }
            } catch (error) {
                console.log(error)
            }
        }
    )

}