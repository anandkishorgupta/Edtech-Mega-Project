import express from "express"
import { SearchCourse } from "../controllers/Search.js"
const router=express.Router()

router.post("/",SearchCourse)
export default router