import bcrypt from "bcrypt";
import User from "../models/User.js";
import mailSender from "../utils/mailSender.js";

// resetPasswordToken-- mail send 
export const resetPasswordToken = async (req, res, next) => {
    try {
        // fetch email
        const { email } = req.body;
        // check user for this email - email validation
        const user = await User.findOne({ email })
        if (user) {
            return res.json({
                success: false,
                message: "Email not registered "
            })
        }
        // generate token
        // const token = crypto.randomUUID();
        const token = crypto.randomBytes(20).toString("hex");
        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({ email }, {
            token,
            resetPasswordToken: Date.now() + 5 * 60 * 1000
        },
            { new: true })
            console.log(updatedDetails)
        // create url
        const url = `http://localhost:3000/update-password/${token}`;
        // send mail containing the url
        await mailSender(email, "Password Reset", `Your Link for email verification is ${url}. Please click this url to reset your password.`)
        // return response
        return res.json({
            success: true,
            message: "Email sent successfully , please check email and change password "
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong while sending reset password link "
        })
    }

}
// resetPassword--db entry

export const resetPassword = async (req, res) => {
    try {
        // data fetch
        const { password, confirmPassword, token } = req.body // crypto generated token
        // validation
        if (password != confirmPassword) {
            return res.json({
                success: false,
                message: "Password not matching"
            })
        }
        
        // get user detail from db using token 
        const userDetails = await User.findOne({ token })

        // if no entry-invalid token
        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token is invalid"
            })
        }
        // token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: "Token is expired , please regenerate token "
            })

        }
        // hash password 
        const hashedPassword = await bcrypt.hash(password, 10)
        // password update 
        await User.findOneAndUpdate({ token }, { password: hashedPassword }, { new: true })

        // return response
        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong while reseting password "
        })
    }
}