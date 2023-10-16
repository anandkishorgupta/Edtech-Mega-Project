import copy from 'copy-to-clipboard';
import { toast } from "react-hot-toast";
import { AiFillCaretRight } from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from '../../../slices/cartSlice';
import { ACCOUNT_TYPE } from '../../../utils/constants';
const CourseDetailsCard = ({ courseData, handleBuyCourse, setConfirmationModal }) => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)

    console.log("from course detail card .................", user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function handleAddToCart() {
        
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("you are instructor, you are not allowed ")
            return
        }
        if (token) {
            // whole course data is added to the cart
            dispatch(addToCart(courseData))
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
    function handleShare() {
        copy(window.location.href)
        toast.success("copied to clipboard")

    }
    return (
        <div className="bg-richblack-700">
            <img src={courseData?.thumbnail} alt="" />
            <p>Rs. {courseData?.price}</p>
            <button
                onClick={courseData?.studentsEnrolled.includes(user?._id)
                    ? () => navigate("/dashboard/enrolled-courses")
                    : handleBuyCourse}
            >
                {
                    courseData?.studentsEnrolled.includes(user?._id) ? "Go to course" : "Buy Course"
                }
            </button>

            {
                !courseData?.studentsEnrolled.includes(user?._id) &&
                <button className="bg-richblack-800 text-richblack-5" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            }
            <p>30-Day Money-Back Guarantee</p>
            <p>This Course Includes :</p>
            <div>
                {
                    courseData?.instructions.map((item, index) => (
                        <p key={index} className="flex items-center gap-x-1">
                            <AiFillCaretRight />
                            {item}</p>
                    ))
                }
            </div>
            <div onClick={
                handleShare

            }>
                <IoMdShareAlt />
            </div>

        </div>
    )
}
export default CourseDetailsCard