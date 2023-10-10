import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCourseDetails } from "../../../../services/operations/courseDetailsAPI"
import RenderSteps from "../AddCourse/RenderSteps"

const EditCourse = () => {
    const dispatch = useDispatch()
    const { courseId } = useParams()
    const { course } = useSelector((state) => state.course)
    const [loading, setLoading] = useState()
    const { token } = useSelector((state) => state.auth)
    useEffect(() => {
        const populateCourseDerails = async () => {
            setLoading(true)
            const result = await fetchCourseDetails(courseId, token)

        }
    }, [])
    return (
        <div>
            <h1>Edit Course</h1>
            <div>
                {
                    course ? (<RenderSteps />) : (<p>course not found</p>)
                }
            </div>
        </div>
    )
}

export default EditCourse