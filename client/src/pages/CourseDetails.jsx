// this  is the  course detail  page consist of buy and add to catrt options 
import { useEffect, useState } from 'react'
import { toast } from "react-hot-toast"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { CiGlobe } from "react-icons/ci"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ConfirmationModal from '../components/common/ConfirmationModal'
import Footer from '../components/common/Footer'
import RatingStars from '../components/common/RatingStars'
import { Spinner } from '../components/common/Spinner'
import CourseDetailsCard from '../components/core/course/CourseDetailsCard'
import CoursesCollapse from '../components/core/course/CoursesCollapse'
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

    // for showing subsectkion data and for collapse features
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
            <div >
                {
                    courseData &&    
                    <div className=' bg-richblack-800'>
                        {/* section 1 */}
                        <div className='relative w-11/12 max-w-maxContent mx-auto'>
                            <div className='h-[100px]'></div>
                            <div className='flex flex-col gap-y-3 w-[65%]'>
                                <p className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>{courseData.courseName}</p>
                                <p className='text-richblack-200'>{courseData.courseDescription}</p>
                                <div className='flex flex-row items-center gap-x-2'>
                                    <span>{avgReviewCount}</span>
                                    {" "}
                                    <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                                    {" "}
                                    <span>{`(${courseData.ratingAndReviews.length} reviews )`}</span>
                                    {" "}{" "}
                                    <span>{`${courseData.courseContent.length} student(s)`}</span>
                                </div>
                                <p>Created By: {courseData.instructor.firstName} {courseData.instructor.lastName}</p>
                                <div className='flex flex-row items-center gap-x-2 text-richblack-5'>
                                    <AiOutlineInfoCircle/>
                                    <p>Created at : {dateFormatter(courseData.createdAt)}</p>
                                    {" "}
                                    <CiGlobe className='text-richblack-5' />
                                    <p>English</p>
                                </div>
                            </div>
                            <div className='absolute right-0 top-0 translate-y-[7%] max-w-[410px] '>
                                <CourseDetailsCard
                                    courseData={courseData}
                                    setConfirmationModal={setConfirmationModal}
                                    handleBuyCourse={handleBuyCourse}
                                />
                            </div>
                            <div className='h-[100px]'></div>
                        </div>
                        {/* section 2 */}
                        <div className='bg-richblack-900'>
                            <div className='h-[50px]'></div>
                            <div className='w-11/12 mx-auto max-w-maxContent '>
                                {/* what you will learn */}
                                <div className='w-[65%]'>
                                    <div className=' flex flex-col gap-y-3 p-8 border border-richblack-600 '>
                                        <p className='font-semibold text-3xl'>What you&apos;ll learn</p>
                                        {/* <pre>
                                            <ul className='list-disc'>
                                                <li className='list-disc'>
                                                    {courseData?.whatYouWillLearn}
                                                </li>
                                            </ul>
                                        </pre> */}
                                        <pre>
                                            <ul className='list-disc'>
                                                {
                                                    courseData?.whatYouWillLearn.split('\n').map((line, index) => (
                                                        <li key={index}>
                                                            {line}
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </pre>

                                    </div>
                                    <div className='h-[50px]'></div>
                                    <p className='text-4xl font-bold mb-2'>Course Content</p>
                                    <div className='flex flex-row gap-x-2 justify-between mb-2'>
                                        <div className='flex flex-row gap-x-2'>
                                            <p>{courseData?.courseContent?.length} section(s)</p>
                                            <p>{totalNoOfLectures} lecture(s)</p>
                                            <p>{parseFloat(timeDuration).toFixed(2)} total length</p>
                                        </div>
                                        <button onClick={() => setIsActive([])}
                                            className='text-yellow-25'
                                        >
                                            Collapse all sections
                                        </button>
                                    </div>
                                    <div className='mb-20'>
                                        <CoursesCollapse
                                            handleActive={handleActive}
                                            courseData={courseData}
                                            isActive={isActive}
                                            setIsActive={setIsActive}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Footer />
            </div>
            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }
        </>

    )
}

export default CourseDetails


