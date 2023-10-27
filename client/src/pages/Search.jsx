import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import RatingStars from "../components/common/RatingStars"
import { SearchCourse } from "../services/operations/searchCourseAPI"
import { GetAvgRatings } from "../utils/avgratings"
const Search = () => {
    const { query } = useParams()
    console.log(query)
    const [searchCourseData, setSearchCourseData] = useState([])
    async function searchHandler() {
        const result = await SearchCourse(query)
        if (result.length > 0) {
            setSearchCourseData(result)
            console.log("..................", result)
        } else {
            setSearchCourseData([])
        }
    }
    useEffect(() => {
        searchHandler()
    }, [query])

    return (
        <div className="w-11/12 max-w-maxContent mx-auto">

            <div className="flex flex-row justify-between flex-wrap mt-5 gap-6">
                {
                    searchCourseData.length > 0 ? (
                        searchCourseData.map((course) => (
                            <div key={course?._id} className="w-[30%]">
                                <div>
                                    <Link to={`/courses/${course._id}`}>
                                        <div className='flex flex-col gap-y-2 '>
                                            <div>
                                                <img src={course?.thumbnail} alt="" className={` rounded-xl object-cover h-[250px]`} />
                                            </div>
                                            <div className='flex flex-col gap-y-1'>
                                                <p className='text-xl text-richblack-5 font-semibold'>{course?.courseName}</p>
                                                <p>By {course?.instructorData?.firstName} {course?.instructorData?.lastName}</p>
                                                <div className='flex gap-x-3'>
                                                    {(() => {
                                                        const avgReviewCount = GetAvgRatings(course?.ratingAndReviews);
                                                        return (
                                                            <>
                                                                <span className='text-yellow-5'>{avgReviewCount || 0}</span>
                                                                <RatingStars Review_Count={avgReviewCount} />
                                                            </>
                                                        );
                                                    })()}
                                                    <span className='text-richblack-400'>{course?.ratingAndReviews?.length} ratings</span>
                                                </div>
                                                <p className='text-xl text-richblack-5'>Rs. {course?.price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (<div> course not cound </div>)
                }
            </div>
        </div>


    )
}

export default Search