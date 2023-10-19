import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { fetchInstructorCourse } from "../../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../../services/operations/profileAPI"
const Instructor = () => {
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState(null)
    const [courses, setCourses] = useState([])

    const getCourseDataWithStats = async () => {
        // setLoading(true)
        const instructorApiData = await getInstructorData(token)
        const result = await fetchInstructorCourse(token)
        console.log(instructorApiData)
        console.log(result)
        if (instructorApiData.length > 0) {
            setInstructorData(instructorApiData)
            if (result) {
                setCourses(result)
            }
        }
        setLoading(false)
    }
    useEffect(() => {
        getCourseDataWithStats()
    }, [])
    return (
        <div>hello
        </div>
    )
}

export default Instructor