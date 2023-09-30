import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
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

// login
export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("loading....")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            })
            console.log("login api response........", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image ?
                response.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({ ...response.data.user, image: userImage }))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))

            navigate("/dashboard/my-profile")
        } catch (error) {

            console.log("login api error.......", error)
            toast.error("Login failed ")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


// logout
export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged out ")
        navigate("/")
    }
}