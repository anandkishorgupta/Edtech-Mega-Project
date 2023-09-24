import toast from "react-hot-toast"
import { setLoading } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import { RESETPASSWORD_API } from "../apis"
export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, { email })
            console.log(response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            setEmailSent(true)
            toast.success("Reset email sent successfully")
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
        dispatch(setLoading(false))

    }
}