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
        <div className="bg-richblack-700 px-6 rounded-lg flex flex-col gap-y-4 py-6">
            <img src={courseData?.thumbnail} alt="" className='max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full' />
            <p className='text-3xl font-semibold'>Rs. {courseData?.price}</p>
            <button
                onClick={courseData?.studentsEnrolled.includes(user?._id)
                    ? () => navigate("/dashboard/enrolled-courses")
                    : handleBuyCourse}
                className='bg-yellow-100 rounded-md text-richblack-900 font-semibold py-2 inline-block'
            >
                {
                    courseData?.studentsEnrolled.includes(user?._id) ? "Go to course" : "Buy Course"
                }
            </button>

            {
                !courseData?.studentsEnrolled.includes(user?._id) &&
                <button className="inline-block bg-richblack-800 text-richblack-5 font-semibold py-2 rounded-md " onClick={handleAddToCart}>
                    Add to Cart
                </button>
            }
            <p className='text-sm text-richblack-25 text-center'>30-Day Money-Back Guarantee</p>
            <p className='text-xl font-semibold'>This Course Includes :</p>
            <div className='text-sm text-caribbeangreen-100'>
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

            } className='text-yellow-100 flex items-center gap-2 justify-center cursor-pointer'>
                <IoMdShareAlt /> share
            </div>

        </div>
    )
}
export default CourseDetailsCard