import dotenv from "dotenv";
import express from "express";
import contactUsRoute from "./routes/Contact.js";
import courseRoute from "./routes/Course.js";
import paymentRoutes from "./routes/Payments.js";
import profileRoutes from "./routes/Profile.js";
import searchRoute from "./routes/Search.js";
import userRoutes from "./routes/User.js";
import { deleteAccountSchedule } from "./utils/deleteAccountSchedule.js";
const app = express();
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { cloudinaryConnect } from "./config/cloudinary.js";
import { connectToDatabase } from "./config/database.js";

const PORT = process.env.PORT || 4000
// db connect
// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT
}))

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
)

// cloudinary connection
cloudinaryConnect()
deleteAccountSchedule()
// routes mount 
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/course", courseRoute)
app.use("/api/v1/payment", paymentRoutes)
app.use("/api/v1/reach", contactUsRoute)
app.use("/api/v1/search",searchRoute)
// default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running"
    })
})
app.listen(PORT, async () => {
    // await connectDB()
    await connectToDatabase()
    console.log(`App is running at ${PORT}`)
})