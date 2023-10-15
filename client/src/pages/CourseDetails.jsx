import { useDispatch, useSelector } from 'react-redux'
import { buyCourse } from "../services/operations/studentsFeaturesAPI"
const CourseDetails = () => {
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    function handleBuyCourse() {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch)
            return
        }
    }

    return (
        <div
            onClick={() => handleBuyCourse()}
        >
            <button>buy now </button>
        </div>
    )
}

export default CourseDetails



// import { useEffect, useState } from "react"
// import { AiOutlineVideoCamera } from "react-icons/ai"
// import { useParams } from "react-router-dom"
// import Footer from "../components/common/Footer"
// import RatingStars from "../components/common/RatingStars"
// import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
// import dateFormatter from "../utils/dateFormatter"
// const CourseDetails = () => {
//     const { courseId } = useParams()
//     const [courseData, setCourseData] = useState(null)
//     const [avgReviewCount, setAverageReviewCount] = useState(0);
//     const getCourseFullDetails = async () => {
//         const result = await fetchCourseDetails(courseId)
//         console.log("course Details page.......", result?.data)
//         if (result) {
//             setCourseData(result?.data)
//         }
//     }
//     useEffect(() => {
//         getCourseFullDetails()
//     }, [courseId])
//     return (
//         <div className="mb-20">
//             {/* section 1 */}
//             <div className=" bg-richblack-800">
//                 <div className="w-11/12 max-w-maxContent mx-auto min-h-[450px] flex flex-col justify-center">
//                     <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">{courseData?.courseName}</p>
//                     <p className="text-richblack-200">{courseData?.courseDescription}</p>
//                     <div className="flex gap-x-2">
//                         <span>{avgReviewCount}</span>
//                         <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
//                         <span>{`(${courseData?.ratingAndReviews?.length} reviews)`}</span>
//                         <span>{`${courseData?.studentsEnrolled?.length} students enrolled`}</span>
//                     </div>
//                     <div>
//                         <p >Created By {courseData?.instructor?.firstName}</p>
//                     </div>
//                     <div className="flex gap-x-3">
//                         <p>
//                             Created At : {
//                                 dateFormatter(courseData?.createdAt)
//                             }
//                         </p>
//                         <p>
//                             {" "} English
//                         </p>
//                     </div>
//                     <div>
//                         {/* coursedetail card */}
//                     </div>
//                 </div>
//             </div>
//             <div className="w-11/12 max-w-maxContent mx-auto border border-richblack-800 p-8 mt-8">
//                 <p className="text-3xl font-semibold">What You Will learn</p>
//                 <div className="text-richblack-5">
//                     {courseData?.whatYouWillLearn}
//                 </div>
//             </div>
//             <div className="w-11/12 max-w-maxContent mx-auto ">
//                 <div>
//                     <p className="text-[28px] font-semibold">Course Content</p>
//                 </div>
//                 <div>
//                     <span>{courseData?.courseContent?.length} section(s)</span>
//                     <span>no.of lectures </span>
//                     <span>total duration</span>
//                 </div>
//                 <div>
//                     <button className="text-yellow-25">
//                         collase all sections
//                     </button>
//                     <div className="">
//                         {
//                             courseData?.courseContent?.
//                                 map((section) => (
//                                     <details key={section._id} className="border border-solid border-richblack-600">
//                                         <summary className="font-bold bg-richblack-700  text-richblack-5 py-6 px-7">
//                                             {
//                                                 section?.sectionName
//                                             }
//                                         </summary>
//                                         {
//                                             section?.subSection?.map((subsection) => (
//                                                 <div key={subsection._id} className="flex justify-between items-center">
//                                                     <p className="flex items-center gap-x-3  text-richblack-5 py-6 px-7">
//                                                         <AiOutlineVideoCamera className="text-yellow-100" />
//                                                         {
//                                                             subsection?.title
//                                                         }
//                                                     </p>
//                                                     <p className="px-7">
//                                                         {
//                                                             parseFloat(subsection?.timeDuration).toFixed(2)
//                                                         }
//                                                     </p>
//                                                 </div>


//                                             ))
//                                         }
//                                     </details>
//                                 ))
//                         }
//                     </div>
//                 </div>
//             </div>
//             <div className="mt-20">
//                 <Footer />
//             </div>
//         </div>
//     )
// }

// export default CourseDetails
