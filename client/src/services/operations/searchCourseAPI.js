import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { searchEndpoints } from "../apis"
export const SearchCourse = async (query) => {
    let result = []
    const toastId = toast.loading("loading....")
    try {
        const response = await apiConnector("POST", searchEndpoints.SEARCH_COURSE_API, { query: query })
        if (!response.data.success) {
            throw new Error("Unable to search the course")
        }
        console.log(response)
        result = response.data.data
        toast.success("searched successfully")
    } catch (error) {
        console.log(error)
        toast.error(error)
    }
    toast.dismiss(toastId)
    return result
}