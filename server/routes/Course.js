import express from "express";
import { categoryPageDetails, createCategory, showAllCategory } from "../controllers/Category.js";
import { createCourse, deleteCourse, getCourseDetails, getFullCourseDetails, getInstructorCourses, showAllCourses, updateCourse } from "../controllers/Course.js";
import { createRating, getAllRating, getAverageRating } from "../controllers/RatingAndReview.js";
import { createSection, deleteSection, updateSection } from "../controllers/Section.js";
import { createSubSection, deleteSubSection, updateSubSection } from "../controllers/SubSection.js";
import { updateCourseProgress } from "../controllers/courseProgress.js";
import { auth, isAdmin, isInstructor, isStudent } from "../middlewares/auth.js";
const router = express.Router();

// @COURSE API

// course create by instructor
router.post("/createCourse", auth, isInstructor, createCourse)
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// getFullCourseDetails
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// update course 
router.patch("/editCourse", auth, isInstructor, updateCourse)
// delete course
router.post("/deleteCourse", auth, isInstructor, deleteCourse)
// getInstructorCourses
router.post("/getInstructorCourses", auth, isInstructor, getInstructorCourses)



// add section to the course 
router.post("/addSection", auth, isInstructor, createSection)
// update a section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)

// SUBSECTION
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)


// category
router.post("/create-category", auth, isAdmin, createCategory)
router.get("/showAllCategory", showAllCategory)
router.post("/getCategoryPageDetails", categoryPageDetails)


// ratings and reviews 
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)


// @COURSE COMPLETION
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)



export default router


