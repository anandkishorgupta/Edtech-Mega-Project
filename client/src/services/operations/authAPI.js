import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = endpoints;
export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {
                email,
            });
            console.log(response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            setEmailSent(true);
            toast.success("Reset email sent successfully");
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
        dispatch(setLoading(false));
    };
}

// reset password
export function resetPassword(password, confirmPassword, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const respone = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token,
            });
            console.log(respone);
            if (!respone.data.success) {
                throw new Error(respone.data.message);
            }
            toast.success("Password has been updated successfully");
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
        dispatch(setLoading(false));
    };
}

// send otp
export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            });
            console.log("send otp api response.....", response);
            console.log(response.data.success);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("OTP sent Successfully");
            navigate("/verify-email");
        } catch (error) {
            console.log("send otp api error", error);
            // toast.error("could not send otp");
            toast.error(error.response.data.message)
            // navigate("/signup")
        }
        dispatch(setLoading(false));   
        toast.dismiss(toastId);
    };
}

// sign Up
export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading.......");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });
            console.log("sign up api response", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Sign up successful")
            navigate("/login")
        } catch (error) {
            console.log("Signup api error........", error);
            toast.error("signup failed ")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    };
}
