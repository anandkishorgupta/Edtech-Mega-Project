import jwt from "jsonwebtoken";
// auth
export const auth = async (req, res, next) => {
    try {
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer", "");
        // if token missing then return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            })

        }
        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode)
            req.user = decode

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }
        next();


    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validation the token"
        })
    }
}
// isStudent
export const isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for student only"
            })
        }

    } catch (error) {
        return req.status(500).json({
            success: false,
            message: "User role cannot be verified , please try again"
        })
    }
}
// isInstructor
export const isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "isInstructor") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Instructor only"
            })
        }

    } catch (error) {
        return req.status(500).json({
            success: false,
            message: "User role cannot be verified , please try again"
        })
    }
}
// isAdmin
export const isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "isAdmin") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admin only"
            })
        }

    } catch (error) {
        return req.status(500).json({
            success: false,
            message: "User role cannot be verified , please try again"
        })
    }
}