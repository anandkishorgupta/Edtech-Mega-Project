import toast from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";

const { UPDATE_DISPLAY_PICTURE_API, UPDATE_PROFILE_INFO_API, CHANGE_PASSWORD_API } = settingsEndpoints
// UPDATE  PROFILE PICTURE 
export const updateDisplayPicture = async (data, token, dispatch) => {
    let toastId = toast.loading("Loading....")
    try {
        const response = await apiConnector("POST", UPDATE_DISPLAY_PICTURE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        if (!response.data.success) {
            throw new Error("Unable to update profile picture ")
        }
        console.log(response)
        dispatch(setUser(response.data.data))
        // set to local storage
        localStorage.setItem("user", JSON.stringify(response.data.data))
        toast.success("profile picture updated successfully")
    } catch (error) {
        console.log(error)
        toast.error("could not update the profile picture ")

    }
    toast.dismiss(toastId)
}

// UPDATE PROFILE INFO
export const updateProfileInfo = async (data, token, dispatch) => {
    let toastId = toast.loading("Loading....")
    try {
        const response = await apiConnector("POST", UPDATE_PROFILE_INFO_API, data, {
            Authorization: `Bearer ${token}`
        })
        if (!response.data.success) {
            throw new Error("Unable to update profile info ")
        }
        console.log("UPDATE_PROFILE_INFO_API response..........", response)
        dispatch(setUser(response.data.updatedUserDetails))
        // set to local storage
        localStorage.setItem("user", JSON.stringify(response.data.updatedUserDetails))
        toast.success("profile info updated successfully")
    } catch (error) {
        console.log(error)
        toast.error("could not update the profile picture ")

    }
    toast.dismiss(toastId)
}

export const changePassword = async (data, token) => {
    let toastId = toast.loading("loading...")
    try {
        const response = await apiConnector("POST", CHANGE_PASSWORD_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("CHANGE_PASSWORD_API response.....",response)
        toast.success(response.data.message)
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)

    }
    toast.dismiss(toastId)

}
