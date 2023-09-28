import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("connected to database successfully")).catch((error) => {
        console.log("Database connection failed ")
        console.error(error)
        process.exit(1)
    })   
}