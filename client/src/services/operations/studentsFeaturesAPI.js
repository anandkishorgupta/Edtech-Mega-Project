import toast from "react-hot-toast";
import rzLogo from "../../assets/Logo/rzLogo.png";
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";
import { apiConnector } from "../apiconnector";
import { studentEndpoints } from "../apis";
const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = src

        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

// BUY COURSE 
export async function buyCourse(courses, token, userDetails, navigate, dispatch) {
    const toastId = toast.loading("loading......")
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if (!res) {
            toast.error("Razorpay SDK failed to load")
        }
        // initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, { courses },
            {
                Authorization: `Bearer ${token}`
            })
        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message)
        }
        // options 
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name: "Study Notion",
            description: "Thank you for purchasing the course",
            image: rzLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function (response) {
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)

                verifyPayment({ ...response, courses }, token, navigate, dispatch)
            }
        }
    } catch (error) {
        console.log("COURSE_PAYMENT_API.......", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)

}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount
        },
            {
                Authorization: `Bearer ${token}`
            })
    } catch (error) {
        console.log("SEND_PAYMENT_SUCCESS_EMAIL_API..........", error)
    }
}

// verify payment 
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("verifying payment.....")
    dispatch(setPaymentLoading(true))
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, {
            Authorization: `Bearer ${token}`
        })
        if (!response) {
            throw new Error(response.data.message)

        }
        toast.success("Payment successful , you are added to the course")
        navigate("/dashboard/enrolledCourse")
        dispatch(resetCart())
    } catch (error) {
        console.log(error)
        toast.error(error)
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}