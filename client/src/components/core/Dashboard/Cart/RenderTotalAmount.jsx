import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { buyCourse } from "../../../../services/operations/studentsFeaturesAPI"
import IconBtn from "../../../common/IconBtn"
const RenderTotalAmount = () => {
    const { total } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cart } = useSelector((state) => state.cart)
    function handleBuyCourse() {
        const courseId = cart.map((item) => item._id)
        buyCourse(token, courseId, user, navigate, dispatch)
    }
    return (
        <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 h-fit">
            <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
            <p className="mb-6 text-3xl font-medium text-yellow-100">Rs. {total}</p>
            <IconBtn
                text={"Buy Now"}
                onClick={handleBuyCourse}
                className={"w-full justify-center font-semibold text-richblack-500"}
            />
        </div>
    )
}

export default RenderTotalAmount