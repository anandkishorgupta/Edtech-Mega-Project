import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactStars from "react-rating-stars-component";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import IconBtn from '../../common/IconBtn';
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
        await createRating({
            rating: data.courseRating,
            review: data.courseExperience,
            courseId
        }, token)
    }
    function ratingChange(newRating) {
        setValue("courseRating", newRating)

    }
    return (
        <div className=''>
            <div>
                {/* Modal header */}
                <div>
                    <p>Add Review</p>
                    <p
                        onClick={() => setReviewModal(null)}
                    >cross</p>
                </div>
                {/* modal body */}
                <div>
                    <div>
                        <img src={user?.image} alt="profile"
                            className='aspect-square w-[50px]'
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
                        <div>
                            <label htmlFor="courseExperience">
                                Add your Experience
                            </label>
                            <textarea
                                id='courseExperience'
                                placeholder='Add your experience here'
                                className='min-h-[130px] w-full'
                                {...register("courseExperience", { required: true })}
                            ></textarea>
                            {
                                errors.courseExperience && (
                                    <span>
                                        please add your experience
                                    </span>
                                )
                            }
                            <div>
                                <button onClick={setReviewModal(null)}>
                                    Cancel
                                </button>
                                <IconBtn text={"save"}
                                    type={"submit"}
                                />
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default CourseReviewModal