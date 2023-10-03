import { useSelector } from "react-redux"

const Cart = () => {
    const { totalItems, total } = useSelector((state) => state.cart)

    return (
        <div>
            <h1>Your Cart</h1>
            <p>{totalItems} Courses in cart</p>
            {
                // total>0
                totalItems > 0 ? (<div>
                    <RenderCartCourses />
                    <RenderTotalAmount />
                </div>) : (<p>Your Cart is Empty</p>)
            }
        </div>
    )
}

export default Cart