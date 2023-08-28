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
    }
})
const RatingAndReviews = mongoose.model("RatingAndReviews", ratingAndReviewsSchema)
export default RatingAndReviews