import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { TiTick } from "react-icons/ti";
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


        // loading ? (<Spinner />) : (
        //     <table className="table-auto w-full">
        //         <thead>
        //             <tr className=" ">

        //                 <th>
        //                     Courses
        //                 </th>
        //                 <th>
        //                     Duration
        //                 </th>
        //                 <th>
        //                     Price
        //                 </th>
        //                 <th>
        //                     Action
        //                 </th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {courses &&
        //                 courses.length === 0 ? (
        //                 <tr>
        //                     <td>
        //                         No Courses found
        //                     </td>
        //                 </tr>
        //             ) : (
        //                 courses?.map((course) => (
        //                     <tr key={course._id} >

        //                         <td className="flex ">
        //                             <img src={course?.thumbnail} alt="" className="h-[150px] w-[220px] rounded-lg object-cover" />
        //                             <div className="flex flex-col">
        //                                 <p>{course.courseName}</p>

        //                                 <p className="text-xs text-richblack-300"
        //                                 >
        //                                     {
        //                                         course.courseDescription > TRUNCATE_LENGTH
        //                                             ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ")
        //                                             + "..." : course.courseDescription
        //                                     }
        //                                 </p>
        //                                 <p>Created: {dateFormatter(course?.createdAt)}</p>
        //                                 {
        //                                     course.status === COURSE_STATUS.DRAFT ? (
        //                                         <p>DRAFTED</p>
        //                                     ) : (
        //                                         <p>PUBLISHED</p>
        //                                     )
        //                                 }
        //                             </div>

        //                         </td>
        //                         <td>
        //                             duration
        //                         </td>
        //                         <td>
        //                             {course?.price}
        //                         </td>
        //                         <td>
        //                             <button disabled={loading}
        //                                 onClick={() => navigate(`/dashboard/add-course/${course._id}`)}
        //                             >
        //                                 Edit
        //                             </button>
        //                             <button
        //                                 disabled={loading}
        //                                 onClick={() => setConfirmationModal({
        //                                     text1: `Do you want to delete this course?`,
        //                                     text2: "All the data related to this course will be deleted",
        //                                     btn1Text: "Delete",
        //                                     btn2Text: "Cancel",
        //                                     btn1Handler: !loading
        //                                         ? () => handleCourseDelete(course._id)
        //                                         : () => { },
        //                                     btn2Handler: !loading
        //                                         ? () => setConfirmationModal(null)
        //                                         : () => { }
        //                                 })}
        //                             >
        //                                 delete
        //                             </button>
        //                         </td>
        //                     </tr>
        //                 ))
        //             )
        //             }
        //         </tbody>
        //         {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

        //     </table>
        // )
        loading ? (<Spinner />) : (

            courses.length === 0 ? (<div>no course found</div>) : (
                <div>
                    <div className=" flex border border-richblack-800 py-2 px-2 text-sm font-medium uppercase text-richblack-100  ">
                        <p className="w-[60%] ">Courses</p>
                        <div className="flex justify-between w-[40%]">
                            <p className="">Duration</p>
                            <p>Price</p>
                            <p>Action</p>
                        </div>
                    </div>
                    <div className="px-2  border-l border-richblack-800 border-r border-b">
                        {
                            courses.map((course) => (
                                <div key={course._id} className="flex justify-between  py-3">
                                    <div className="flex w-[60%] gap-x-2">
                                        <img src={course.thumbnail} alt="" className="w-[150px] h-[150px] object-cover rounded-lg" />
                                        <div className="flex flex-col gap-y-2 w-[62%]">
                                            <p className="font-semibold">{course.courseName}</p>
                                            <p className="text-sm text-richblack-500">{course.courseDescription.split(" ").slice(0, 10).join(" ") + "....."}</p>
                                            <p className="text-[12px] text-white">Created: {dateFormatter(course?.createdAt)} </p>
                                            <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                {
                                                    course.status === COURSE_STATUS.DRAFT ? "Drafted" :
                                                        <p className="flex items-center gap-x-2">
                                                            <TiTick className="bg-yellow-100 text-richblack-700 rounded-full" />
                                                            Published
                                                        </p>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-[40%] ">
                                        <p className="text-sm font-medium text-richblack-100">
                                            {course.duration.time}
                                        </p>
                                        <p className="text-sm font-medium text-richblack-100">Rs {course.price}</p>
                                        <div className="flex gap-x-5 justify-center">
                                            <MdOutlineModeEditOutline className="cursor-pointer text-2xl transition-all ease-linear duration-200 hover:text-caribbeangreen-300 hover:scale-110"
                                                onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                            />

                                            <AiOutlineDelete className="cursor-pointer text-3xl transition-all duration-200 ease-linear hover:scale-110 hover:text-[#ff0000]"
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
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
                </div>

            )
        )



    )
}

export default CoursesTable


