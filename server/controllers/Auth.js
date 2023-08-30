import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import OTP from "../models/OTP.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";
dotenv.config()

// sendOTP
const sendOTP = async (req, res) => {
    try {
        // fetch email from request body
        const { email } = req.body
        // check if user already exist
        const checkUserPresent = await User.findOne({ email })

        // if user already exist,then return a response
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered"
            })
        }
        // generate otp
        let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, specialChars: false });
        console.log("otp generated ", otp)
        // check unique otp or not
        let result = await OTP.findOne({ otp })
        while (result) {
            otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, specialChars: false });
            result = await OTP.findOne({ otp })
        }
        const otpPayload = { email, otp }
        // create an entry in db for otp
        const otpBody = await OTP.create(otpPayload)
        console.log(otpBody)
        // return response successful
        res.status(200).json({
            success: true,
            message: "OTP sent Successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

// signup
const signUp = async (req, res) => {
    try {
        // data fetch from req body
        const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body
        // validation 
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })

        }
        // match password and conform password 
        if (password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm Password values does not match, please try again"
            })
        }


        // check user already exist
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }
        // find most recent OTP started for the user
        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1)
        console.log(recentOtp)


        //validate Otp
        if (recentOtp.length == 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            })
        } else if (otp != recentOtp.otp) {
            // invalid otp
            return res.status(400).json({
                success: false
                ,
                message: "Invalid OTP"
            })
        }

        // hash password 

        const hashedPassword = await bcrypt.hash(password, 10)
        // profile detail to null
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        })
        // create entry in db
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })


        // return response
        return res.status(200).json({
            success: true,
            message: "User is registered successfully"

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "User cannot be registered , Please try again"
        })

    }
}
//login
export const login = async (req, res) => {
    try {
        // get data from rew body
        const { email, password } = req.body
        // validation data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required , please try again"
            })
        }
        // user exist check
        const user = await User.findOne({ email })
        // .populate("additionalDetails")
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered , please signup first"
            })
        }
        // generate jwt, after password matching
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            })
            user.token = token
            user.password = undefined
            // create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully"
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login Failure, please try again"
        })

    }
}

// change Password
export const changePassword = async (req, res) => {
    // get data from req body
    const { email, password, confirmPassword } = req.body
    try {
        // get old password , new password , confirmNewPassword 
        const user = await User.findOne({ email })
        // validation


        // update password in db

        // send email -password updated 

        // return response
    } catch (error) {

    }


}
