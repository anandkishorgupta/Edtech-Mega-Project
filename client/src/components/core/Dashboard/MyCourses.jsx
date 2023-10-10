import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchInstructorCourse } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import { Spinner } from "../../common/Spinner"
import CoursesTable from "./InstructorCourses/CoursesTable"
const MyCourses = () => {
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])
    const fetchCourses = async () => {
        setLoading(true)
        const result = await fetchInstructorCourse(token);
        if (result) {
            setCourses(result)
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchCourses()
    }, [])
    return (
        <div>
            <div>
                <h1>My Courses</h1>
                <IconBtn text={"Add Course "}
                    onClick={() => navigate("/dashboard/add-course")}
                >

                </IconBtn>
            </div>

            {
                loading ? (<Spinner  />) : (
                    courses && <CoursesTable courses={courses} setCourses={setCourses} loading={loading} setLoading={setLoading} />
                )
            }
        </div>
    )
}

export default MyCourses