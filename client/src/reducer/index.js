import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import cartReducer from "../slices/cartSlice"
import courseSlice from "../slices/courseSlice"
import profileReducer from "../slices/profileSlice"
import viewCourseSlice from "../slices/viewCourseSlice"
const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    viewCourse: viewCourseSlice,
    course:courseSlice
})
export default rootReducer