import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String
    },
    courseDescription: {
        type: String
    }, price: {
        type: Number
    },
    thumbnail: {
        type: String
    },
    whatYouWillLearn: {
        type: String,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }
    ],



    ratingAndReviews: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReviews"
        }
    ]
    ,

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    studentsEnrolled: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});
const Course = mongoose.model("Course", courseSchema);
export default Course