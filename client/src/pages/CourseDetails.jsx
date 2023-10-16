import { useEffect, useState } from 'react'
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ConfirmationModal from '../components/common/ConfirmationModal'
import RatingStars from '../components/common/RatingStars'
import { Spinner } from '../components/common/Spinner'
import CourseDetailsCard from '../components/core/course/CourseDetailsCard'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI'
import { buyCourse } from "../services/operations/studentsFeaturesAPI"
import { GetAvgRatings } from '../utils/avgratings'
import { ACCOUNT_TYPE } from '../utils/constants'
import dateFormatter from '../utils/dateFormatter'
import Error from './Error'
const CourseDetails = () => {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { courseId } = useParams()
    const [courseData, setCourseData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)

    const getCourseDetail = async () => {
        setLoading(true)
        const { data } = await fetchCourseDetails(courseId)
        console.log("------------------------", data)
        if (!data) {
            return <Error />
        }
        setCourseData(data)
        setLoading(false)
    }

    useEffect(() => {
        getCourseDetail()
    }, [courseId])

    const [avgReviewCount, setAvgReviewCount] = useState(0)

    useEffect(() => {
        const count = GetAvgRatings(courseData?.ratingAndReviews)
        setAvgReviewCount(count)
    }, [courseData])

    const [isActive, setIsActive] = useState([])
    
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat([id])
                : isActive.filter((e) => e != id)
        )
    }


    // TOTAL NUMBER OF LECTURES- total number of videos (sub sections video)
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
    const [timeDuration, setTimeDuration] = useState(0)


    useEffect(() => {
        let lectures = 0
        let time = 0
        courseData?.courseContent?.forEach(section => {
            lectures = lectures + section?.subSection?.length
            section?.subSection?.forEach((sub) => {
                time += parseFloat(sub.timeDuration)
            })
        });
        setTotalNoOfLectures(lectures)
        setTimeDuration(time)
    }, [courseData])


    function handleBuyCourse() {

        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("you are instructor, you are not allowed ")
            return
        }
        if (token) { //if logged in
            buyCourse(token, [courseId], user, navigate, dispatch)
            return
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to Purchase Course.",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null)
        })
    }
    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-[calc(100vh-55px)]'>
                <Spinner />
            </div>
        )
    }

    return (
        <>
            <div className='w-11/12 max-w-maxContent mx-auto'>
                {
                    courseData &&
                    <div>
                        {/* section 1 */}
                        <div className='relative'>
                            <div className='flex flex-col '>
                                <p>{courseData.courseName}</p>
                                <p>{courseData.courseDescription}</p>
                                <div className='flex flex-row items-center'>
                                    <span>{avgReviewCount}</span>
                                    {" "}
                                    <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                                    {" "}
                                    <span>{`(${courseData.ratingAndReviews.length} reviews )`}</span>
                                    {" "}
                                    <span>{`${courseData.courseContent.length} students`}</span>
                                </div>
                                <p>Created By: {courseData.instructor.firstName} {courseData.instructor.lastName}</p>
                                <div className='flex flex-row'>
                                    <p>Created at : {dateFormatter(courseData.createdAt)}</p>
                                    <p>English</p>
                                </div>
                            </div>
                            <div>
                                <CourseDetailsCard
                                    courseData={courseData}
                                    setConfirmationModal={setConfirmationModal}
                                    handleBuyCourse={handleBuyCourse}

                                />
                            </div>
                        </div>
                        <div>
                            <p>What you&apos;ll learn</p>
                            <p>{courseData?.whatYouWillLearn}</p>
                        </div>
                        <div className='flex flex-row gap-x-2 justify-between'>
                            <div className='flex flex-row gap-x-2'>
                                <p>{courseData?.courseContent?.length} section(s)</p>
                                <p>{totalNoOfLectures} lecture(s)</p>
                                <p>{parseFloat(timeDuration).toFixed(2)} total length</p>
                            </div>
                            <button onClick={()=>setIsActive([])}>
                                collapse all
                            </button>
                        </div>
                    </div>
                }
            </div>
            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }
        </>

    )
}

export default CourseDetails


