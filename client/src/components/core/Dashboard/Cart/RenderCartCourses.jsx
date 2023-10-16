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
                    <div key={course._id}>
                        <div>
                            <img src={course?.thumbnail} alt="" />
                            <div>
                                <p>{course?.courseName}</p>
                                <p>{course.category?.name}</p>
                                <div>
                                    average ratings
                                    <ReactStars
                                        count={5}
                                        size={20}
                                        edit={false}
                                        isHalf={true}
                                        activeColor={"#ffd700"}
                                        emptyIcon={<AiOutlineStar />}
                                        fullIcon={<AiFillStar />}
                                    />
                                    <span>{course?.ratingAndReviews?.length}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={() => dispatch(removeFromCart(course._id))}
                            >
                                <MdDeleteForever />
                                <span>Remove</span>
                            </button>
                            <p>Rs {course?.price}</p>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartCourses