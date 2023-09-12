import express from "express";
import { changePassword, login, sendOTP, signUp } from "../controllers/Auth.js";
import { resetPassword, resetPasswordToken } from "../controllers/ResetPassword.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();
// Authentication routes 
router.post("/signup", signUp)
router.post("/login", login)
router.post("/sendotp", sendOTP)
router.post("/changepassword", auth, changePassword) //auth check user is login or not 



// reset password routes 
router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)
export default router; // Export the router