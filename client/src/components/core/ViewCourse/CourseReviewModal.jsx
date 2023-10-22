import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RxCross2 } from "react-icons/rx";
import ReactStars from "react-rating-stars-component";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createRating } from '../../../services/operations/courseDetailsAPI';
const CourseReviewModal = ({ setReviewModal }) => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { courseId } = useParams()
    console.log(courseId)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm()

    useEffect(() => {
        setValue("courseExperience", "")
        setValue("courseRating", 0)
    }, [])

    async function onsubmit(data) {
        console.log("...........", data.courseRating)
        console.log("...........", data.courseExperience)
        console.log("...........", courseId)

        await createRating({
            rating: data.courseRating,
            review: data.courseExperience,
            courseId
        }, token)

        setReviewModal(null)
    }


    function ratingChange(newRating) {
        setValue("courseRating", newRating)

    }
    return (
        <div className='fixed inset-0 z-[1000] !mt-0 flex justify-center items-center bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className='flex flex-col gap-y-3 border border-richblack-400 bg-richblack-800
             rounded-xl  w-[500px]'>
                {/* Modal header */}
                <div className=' bg-richblack-600 rounded-t-xl'>
                    <div className='px-9 py-5 flex justify-between items-center'>

                        <p>Add Review</p>
                        <p
                            onClick={() => setReviewModal(null)}
                        >
                            <RxCross2 className='cursor-pointer' />
                        </p>
                    </div>

                </div>
                {/* modal body */}
                <div className='px-9 py-5'>
                    <div className='flex flex-col items-center gap-y-1'>
                        <img src={user?.image} alt="profile"
                            className='aspect-square w-[50px] block rounded-full'
                        />
                        <p>{user?.firstName} {user?.lastName}</p>
                        <p>Posting publicly</p>
                    </div>

                    <form onSubmit={handleSubmit(onsubmit)}>
                        <ReactStars
                            count={5}
                            onChange={ratingChange}
                            size={24}
                            activeColor={"#ffd700"}
                        />
                        <div className='flex flex-col'>
                            <label htmlFor="courseExperience" className='text-sm'>
                                Add your Experience <sup className='text-pink-100'>*</sup>
                            </label>
                            <textarea
                                id='courseExperience'
                                placeholder='Add your experience here'
                                className='min-h-[130px] w-full form-style '
                                {...register("courseExperience", { required: true })}
                            ></textarea>
                            {
                                errors.courseExperience && (
                                    <span className='addCourseError'>
                                        please add your experience
                                    </span>
                                )
                            }
                            <div className='flex items-center gap-x-5 mt-4 justify-end'>
                                <button type='button' onClick={() => setReviewModal(null)}>
                                    Cancel
                                </button>

                                {/* <IconBtn text={"save"}
                                    type={"submit"}
                                /> */}
                                <button
                                    className='bg-yellow-50 px-4 py-2 rounded-md'
                                    type='submit'
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default CourseReviewModal