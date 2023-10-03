import express from "express";
import { categoryPageDetails, createCategory, showAllCategory } from "../controllers/Category.js";
import { createCourse, getCourseDetails, showAllCourses } from "../controllers/Course.js";
import { createRating, getAllRating, getAverageRating } from "../controllers/RatingAndReview.js";
import { createSection, deleteSection, updateSection } from "../controllers/Section.js";
import { createSubSection, deleteSubSection, updateSubSection } from "../controllers/SubSection.js";
import { auth, isAdmin, isInstructor, isStudent } from "../middlewares/auth.js";
const router=express.Router();

// course create by instructor
router.post("/createCourse",auth,isInstructor,createCourse)
// add section to the course 
router.post("/addSection",auth,isInstructor,createSection)
// update a section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)






// category
router.post("/create-category",auth,isAdmin,createCategory)
router.get("/showAllCategory", showAllCategory)
router.post("/getCategoryPageDetails", categoryPageDetails)


// ratings and reviews 
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)
export default router