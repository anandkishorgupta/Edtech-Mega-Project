import mongoose from "mongoose";
const courseProgressSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    userID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
    completedVideo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection"
    }
});
const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
export default CourseProgress