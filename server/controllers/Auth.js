import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import OTP from "../models/OTP.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import mailSender from "../utils/mailSender.js";
dotenv.config()

// sendOTP
export const sendOTP = async (req, res) => {
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
export const signUp = async (req, res) => {
    try {
        // data fetch from req body
        const { firstName, lastName, email, password, confirmPassword, accountType, otp } = req.body
        // validation 
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })

        }
        // match password and conform password 
        if (password !== confirmPassword) {
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
        if (!recentOtp) {
            return res.status(400).json({
                success: false,
                message: "OTP not found may be expired "
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
            message: "User cannot be registered , Please try again",
            error:error.message
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
            user.token = token  //token generated using jwt
            user.password = undefined
            // create cookie and send response
            const options = {
                expires: new Date(Date.now() + 2* 60 * 60 * 1000),
                httpOnly: true
            }
            
            // COOKIE SEND TO CLIENT
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

    try {
        // get user id
        const id = req.user.id
        const user = await User.findById(id)
        // get data from req body
        // get old password , new password , confirmNewPassword 
        const { oldPassword, newPassword, confirmPassword } = req.body
        // validate old password
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "old password not matched "

            })
        }

        // match newPassword and confim password 
        if (newPassword != confirmPassword) {
            return res.status(400).json({
                success: false, message: "Password and Confirm Password does not match"
            })
        }
        // hash password 
        const hashedPassword = await bcrypt.hash(password, 10)
        const updatedUser = await User.findByIdAndUpdate(id,
            {
                password: hashedPassword
            }, { new: true })


        // send notification email
        try {
            const emailResponse = await mailSender(updatedUser.email, `Password updated Successfully for ${updatedUser.firstName} ${updatedUser.lastName}`)
            console.log("Email sent successfully", emailResponse.response)
        } catch (error) {
            console.error("Error occur while sending email: ", error)
            return res.status(500).json({
                success: false,
                message: "Error occur while sending email",
                error: error.message
            })

        }
        // Return success response
        return res
            .status(200)
            .json({ success: true, message: "Password updated successfully" });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occurred while updating password "
        })

    }


}
