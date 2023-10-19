import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchInstructorCourse } from "../../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../../services/operations/profileAPI"
import InstructorChat from "./InstructorChat"
const Instructor = () => {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)

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
    const totalAmount = instructorData?.reduce(
        (acc, curr) => acc + curr.totalAmountGenerated,
        0
    )

    const totalStudents = instructorData?.reduce(
        (acc, curr) => acc + curr.totalStudentsEnrolled,
        0
    )
    return (
        <div>
            <div>
                <h1>Hi {user.firstName}</h1>
                <p>lets start something new </p>
            </div>
            {
                loading ? (<div>loading...</div>) : (
                    courses.length > 0 ? (
                        <div>
                            <div>
                                <InstructorChat courses={instructorData} />
                                <div>
                                    <p>Statistics</p>
                                    <div>
                                        <p>Total Courses </p>
                                        <p>{courses.length}</p>
                                    </div>
                                    <div>
                                        <p>Total Students</p>
                                        <p>{totalStudents}</p>
                                    </div>
                                    <div>
                                        <p>Total Income</p>
                                        <p>{totalAmount}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>Your Courses</p>
                                    <Link to={"/dashboard/my-courses"}>
                                        View all
                                    </Link>
                                </div>
                                <div>
                                    {
                                        courses.slice(0, 3).map((course) => (
                                            <div key={course._id}>
                                                <img src={course.thumbnail} alt="" />
                                                <div>
                                                    <p>{course.courseName}</p>
                                                    <div>
                                                        <p> {course.studentsEnrolled.length} student(s)</p>
                                                        <p>|</p>
                                                        <p>Rs {course.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
                            <p className="text-center text-2xl font-bold text-richblack-5">
                                You have not created any courses yet
                            </p>
                            <Link to="/dashboard/add-course">
                                <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                                    Create a course
                                </p>
                            </Link>
                        </div>
                    )
                )
            }
        </div >
    )
}

export default Instructor