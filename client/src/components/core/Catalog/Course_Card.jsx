import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetAvgRatings } from '../../../utils/avgratings'
import RatingStars from '../../common/RatingStars'

const Course_Card = ({ course, Height }) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0)
    useEffect(() => {
        const count = GetAvgRatings(course?.ratingAndReviews)
        setAvgReviewCount(count)
    }, [course])
    return (
        <div>
            <Link to={`/courses/${course._id}`}>
                <div className='flex flex-col gap-y-2 '>
                    <div>
                        <img src={course?.thumbnail} alt="" className={`${Height} w-full rounded-xl object-cover `} />
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <p className='text-xl text-richblack-5 font-semibold'>{course.courseName}</p>
                        <p>By {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div className='flex gap-x-3'>
                            <span className='text-yellow-5'>{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span className='text-richblack-400'>{course?.ratingAndReviews?.length} ratings</span>
                        </div>
                        <p className='text-xl text-richblack-5'>Rs. {course.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Course_Card