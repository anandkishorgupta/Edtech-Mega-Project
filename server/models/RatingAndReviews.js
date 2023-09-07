import mongoose from "mongoose";
const ratingAndReviewsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
        index: true,
    },
})
const RatingAndReviews = mongoose.model("RatingAndReviews", ratingAndReviewsSchema)
export default RatingAndReviews

// here the rating is save like 
// course     user    rating 
// c1          u1       5
// c1          u2       3
