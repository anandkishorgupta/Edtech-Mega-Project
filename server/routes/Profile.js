import express from "express";
const router = express.Router();

import { deleteAccount, getAllUserDetail, getEnrolledCourses, instructorDashboard, updateDisplayPicture, updateProfile } from "../controllers/Profile.js";
import { auth, isInstructor } from "../middlewares/auth.js";

router.post("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetail)
router.delete("/deleteProfile", auth, deleteAccount)
router.post("/updateDisplayPicture", auth, updateDisplayPicture)

// get enrolled courses 
router.get("/getEnrolledCourses", auth, getEnrolledCourses)


router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)
export default router; // Export the router