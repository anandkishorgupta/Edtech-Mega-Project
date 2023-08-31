import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses"
    }]
})
const Category= mongoose.model("Category", tagSchema)
export default Tag