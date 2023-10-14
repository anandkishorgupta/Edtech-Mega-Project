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
                <div className='flex flex-col'>
                    <div >
                        <img src={course?.thumbnail} alt="" className={`${Height} w-full rounded-xl object-cover`} />
                    </div>
                    <div>
                        <p>{course.courseName}</p>
                        <p>By {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div className='flex gap-x-3'>
                            <span>{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span>{course?.ratingAndReviews?.length} ratings</span>
                        </div>
                        <p>{course.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Course_Card