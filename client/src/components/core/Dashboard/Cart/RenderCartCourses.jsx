import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";
const RenderCartCourses = () => {
    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    return (
        <div>
            {
                cart.map((course) => (
                    <div key={course._id} className="flex justify-between w-full gap-x-6 border-b border-b-richblack-400 py-6">
                        <div className="flex gap-x-6">
                            <img src={course?.thumbnail} alt="" className="w-[220px] h-[148px] object-cover"/>
                            <div className="flex flex-col gap-y-2">
                                <p className="text-lg font-medium text-richblack-5">{course?.courseName}</p>
                                <p className="text-sm text-richblack-300">{course.category?.name}</p>
                                <div className="flex gap-x-2 items-center">
                                    <ReactStars
                                        count={5}
                                        size={20}
                                        edit={false}
                                        isHalf={true}
                                        activeColor={"#ffd700"}
                                        emptyIcon={<AiOutlineStar />}
                                        fullIcon={<AiFillStar />}
                                    />
                                    <span className="text-richblack-400">{course?.ratingAndReviews?.length} Ratings</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={() => dispatch(removeFromCart(course._id))}
                                className="flex gap-x-2 items-center border border-richblack-600 bg-richblack-700 text-pink-200 py-3 px-[12px] rounded-md"
                            >
                                <MdDeleteForever />
                                <span>Remove</span>
                            </button>
                            <p className="text-3xl font-medium text-yellow-100 mt-4">Rs {course?.price}</p>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartCourses