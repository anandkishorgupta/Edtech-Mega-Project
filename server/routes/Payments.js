import express from "express";
import { capturePayment, verifySignature } from "../controllers/Payment.js";
import { auth, isStudent } from "../middlewares/auth.js";
const router = express.Router()

router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", verifySignature)

export default router