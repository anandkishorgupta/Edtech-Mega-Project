import express from "express";
const router = express.Router();

import { deleteAccount, getAllUserDetail, getEnrolledCourses, updateDisplayPicture, updateProfile } from "../controllers/Profile.js";
import { auth } from "../middlewares/auth.js";

router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetail)
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

// get enrolled courses 
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
export default router; // Export the router