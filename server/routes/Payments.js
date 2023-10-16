import express from "express";
import { capturePayment, sendPaymentSuccessEmail, verifyPayment } from "../controllers/Payment.js";
import { auth, isStudent } from "../middlewares/auth.js";
const router = express.Router()

router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment", auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail)

export default router