import mongoose from "mongoose";
const courseProgressSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    completedVideo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection"
    }
});
const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
export default CourseProgress