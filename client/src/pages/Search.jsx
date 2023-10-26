// import { useEffect, useState } from "react"
// import { Link, useParams } from "react-router-dom"
// // import RatingStars from "../components/common/RatingStars"
// import { SearchCourse } from "../services/operations/searchCourseAPI"
// const Search = () => {
//     const { query } = useParams()
//     console.log(query)
//     const [searchCourseData, setSearchCourseData] = useState([])
//     async function searchHandler() {
//         const result = await SearchCourse(query)
//         if (result.length > 0) {
//             setSearchCourseData(result)
//             console.log("..................", result)
//         }
//     }
//     useEffect(() => {
//         searchHandler()
//     }, [query])   
    
//     return (
//         <div>
//             {
//                 searchCourseData.length > 0 ? (
//                     searchCourseData.map((course) => (
//                         <div key={course._id}>
//                             <div>
//                                 <Link to={`/courses/${course._id}`}>
//                                     <div className='flex flex-col gap-y-2 '>
//                                         <div>
//                                             <img src={course?.thumbnail} alt="" className={` rounded-xl object-cover h-[250px]`} />
//                                         </div>
//                                         <div className='flex flex-col gap-y-1'>
//                                             <p className='text-xl text-richblack-5 font-semibold'>{course.courseName}</p>
//                                             <p>By {course?.instructorData[0].firstName} {course?.instructorData[0].lastName}</p>
//                                             <div className='flex gap-x-3'>
//                                                 {/* <span className='text-yellow-5'>{avgReviewCount || 0}</span>
//                                                 <RatingStars Review_Count={avgReviewCount} /> */}
//                                                 <span className='text-richblack-400'>{course?.ratingAndReviews?.length} ratings</span>
//                                             </div>
//                                             <p className='text-xl text-richblack-5'>Rs. {course.price}</p>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             </div>
//                         </div>
//                     ))
//                 ) : (<div> course not cound </div>)
//             }
//         </div>

//     )
// }

// export default Search