import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getFullCourseDetails } from "../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import RenderSteps from "../AddCourse/RenderSteps"

const EditCourse = () => {
    const dispatch = useDispatch()
    const { courseId } = useParams()
    const { course } = useSelector((state) => state.course)
    const [loading, setLoading] = useState()
    const { token } = useSelector((state) => state.auth)
    const populateCourseDetails = async () => {
        setLoading(true)
        // authenticated
        const result = await getFullCourseDetails(courseId, token)
        if (result) {
            dispatch(setEditCourse(true))
            dispatch(setCourse(result?.courseDetails))
            setLoading(false)
        }
    }
    useEffect(() => {
        populateCourseDetails()
    }, [])
    return (
        <div>
            <h1>Edit Course</h1>
            <div className="lg:max-w-[600px] mx-auto">
                {
                    course ? (<RenderSteps />) : (<p>course not found</p>)
                }
            </div>
        </div>
    )
}

export default EditCourse