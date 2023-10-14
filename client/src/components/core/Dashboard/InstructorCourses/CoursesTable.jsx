import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCourse, fetchInstructorCourse } from "../../../../services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "../../../../utils/constants";
import dateFormatter from "../../../../utils/dateFormatter";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { Spinner } from "../../../common/Spinner";
const CoursesTable = ({ courses, setCourses, loading, setLoading }) => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const TRUNCATE_LENGTH = 30;
    // const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    async function handleCourseDelete(courseId) {
        setLoading(true)
        await deleteCourse({ courseId: courseId }, token)
        // fetch the courses of instructor
        const result = await fetchInstructorCourse(token)
        if (result) {
            setCourses(result)
        }
        setConfirmationModal(null)
        setLoading(false)
    }
    return (


        loading ? (<Spinner />) : (
            <table className="table-auto w-full">
                <thead>
                    <tr className=" ">

                        <th>
                            Courses
                        </th>
                        <th>
                            Duration
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {courses &&
                        courses.length === 0 ? (
                        <tr>
                            <td>
                                No Courses found
                            </td>
                        </tr>
                    ) : (
                        courses?.map((course) => (
                            <tr key={course._id} >

                                <td className="flex ">
                                    <img src={course?.thumbnail} alt="" className="h-[150px] w-[220px] rounded-lg object-cover" />
                                    <div className="flex flex-col">
                                        <p>{course.courseName}</p>

                                        <p className="text-xs text-richblack-300"
                                        >
                                            {
                                                course.courseDescription > TRUNCATE_LENGTH
                                                    ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ")
                                                    + "..." : course.courseDescription
                                            }
                                        </p>
                                        <p>Created: {dateFormatter(course?.createdAt)}</p>
                                        {
                                            course.status === COURSE_STATUS.DRAFT ? (
                                                <p>DRAFTED</p>
                                            ) : (
                                                <p>PUBLISHED</p>
                                            )
                                        }
                                    </div>

                                </td>
                                <td>
                                    duration
                                </td>
                                <td>
                                    {course?.price}
                                </td>
                                <td>
                                    <button disabled={loading}
                                        onClick={() => navigate(`/dashboard/add-course/${course._id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        disabled={loading}
                                        onClick={() => setConfirmationModal({
                                            text1: `Do you want to delete this course?`,
                                            text2: "All the data related to this course will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: !loading
                                                ? () => handleCourseDelete(course._id)
                                                : () => { },
                                            btn2Handler: !loading
                                                ? () => setConfirmationModal(null)
                                                : () => { }
                                        })}
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )
                    }
                </tbody>
                {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

            </table>
        )
    )
}

export default CoursesTable


