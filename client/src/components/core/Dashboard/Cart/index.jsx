import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"
const Cart = () => {
    const { totalItems } = useSelector((state) => state.cart)

    return (
        <div>
            <h1 className="text-3xl font-medium text-richblack-5 mb-14">Cart</h1>
            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">{totalItems} Courses in cart</p>
            {
                totalItems > 0 ? (
                    <div className="flex justify-between mt-7 gap-x-8">
                        <RenderCartCourses />
                        <RenderTotalAmount />
                    </div>)
                    : (<p>Your Cart is Empty</p>)
            }
        </div>
    )
}

export default Cart