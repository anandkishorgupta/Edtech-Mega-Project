import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
const { GET_USER_ENROLLED_COURSES_API, GET_USER_DETAILS_API } = profileEndpoints

export const geUserEnrolledCourses = async (token) => {
    const toastId = toast.loading("Loading....")
    let result = []
    try {
        const response = await apiConnector("GET",
            GET_USER_ENROLLED_COURSES_API, null, {

            Authorization: `Bearer ${token}`

        }
        )
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return result

}