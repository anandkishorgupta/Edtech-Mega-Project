import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { logout } from "./authAPI";
const { GET_USER_ENROLLED_COURSES_API, GET_USER_DETAILS_API, GET_INSTRUCTOR_DATA_API, DELETE_PROFILE_API } = profileEndpoints

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
export const getInstructorData = async (token) => {
    const toastId = toast.loading("loading....")
    let result = []
    try {
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`
        })
        console.log("GET_INSTRUCTOR_DATA_API reponse..", response)
        result = response?.data?.courses
    } catch (error) {
        console.log(error)
        toast.error(error)

    }
    toast.dismiss(toastId)
    return result
}

// DELETE ACCOUNT 
export const deleteAccount = async (token,dispatch,navigate) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
            Authorization: `Bearer ${token}`
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        console.log("DELETE_PROFILE_API reponse......", response)
        toast.success("account deleted successfully")
        dispatch(logout(navigate))
    } catch (error) {
        console.log(error)
        toast.error(error)
    }
    toast.dismiss(toastId)
}