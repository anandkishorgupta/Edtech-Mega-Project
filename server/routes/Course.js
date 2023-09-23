import express from "express";
import { createCategory, showAllCategory } from "../controllers/Category.js";
import { createCourse, getCourseDetails, showAllCourses } from "../controllers/Course.js";
import { auth, isAdmin } from "../middlewares/auth.js";
const router=express.Router();

// course
router.post("/",createCourse)
router.get("/",showAllCourses)
router.get("/",getCourseDetails)


// category
router.post("/create-category",auth,isAdmin,createCategory)
router.get("/showAllCategory", showAllCategory)
export default router