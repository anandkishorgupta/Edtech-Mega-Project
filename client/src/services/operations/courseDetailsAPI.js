import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";

const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
} = courseEndpoints


//   GET ALL COURSES 
export const getAllCourses = async () => {
    const toastId = toast.loading("Loading.....")
    let result = []
    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API)
        if (!response?.data?.success) {
            throw new Error("Could not fetch courses ")
        }
    } catch (error) {
        console.log("get all course api error ,", error)
        toast.error(error.message)

    }
    toast.dismiss(toastId)
    return result
}

//   FETCH COURSE DETAILS 
export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading.....")
    let result = null
    try {
        const response = await apiConnector("GET", COURSE_DETAILS_API, {
            courseId
        })
        console.log("course detail api response ", response)
        if (!response.data.success) {
            throw new Error(response.data.message)

        }
        result = response.data



    } catch (error) {
        console.log("course detail api error", error)
        result = error.response.data

    }
    toast.dismiss(toastId)
    return result
}

// fetch the available course category
export const fetchCourseCategories = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API)
        console.log(response)
        if (!response?.data?.success) {
            throw new Error("Could not fetch course categories ")
        }
        result = response?.data?.allCategory
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
    return result
}

// add the course details 
export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading.......")
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log(response)
        if (!response?.data?.success) {
            throw new Error("Could Not add course details")

        }
        toast.success("Course details added successfully")
        console.log(result)
        result = response?.data?.data
    } catch (error) {
        console.log(error)
        toast.error(error.message)

    }
    toast.dismiss(toastId)
    return result
}


export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading.....")
    try {
        const response = await apiConnector("PUT", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`

        })
        toast.success("course details edited successfully")
        result = response?.data?.data
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result

}