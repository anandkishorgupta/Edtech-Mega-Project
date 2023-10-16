import toast from "react-hot-toast";
import Logo from "../../assets/Logo/Logo-Full-Dark.png";
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
export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
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
        console.log("order response .......", orderResponse)
        // options 
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name: "Study Notion",
            description: "Thank you for purchasing the course",
            image: Logo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function (response) {
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
                verifyPayment({ ...response, courses }, token, navigate, dispatch)
            }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
        paymentObject.on("payment.failed", function (response) {
            toast.error("payment failed")
            console.log(response)
        })

    } catch (error) {
        console.log("COURSE_PAYMENT_API.......", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)

}

async function sendPaymentSuccessEmail(response, amount, token) {
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++")

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
    console.log("body data....",bodyData)
    dispatch(setPaymentLoading(true))
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API,bodyData, {
            Authorization: `Bearer ${token}`
        })
        if (!response) {
            throw new Error(response.data.message)

        }
        toast.success("Payment successful , you are added to the course")
        dispatch(resetCart())
        navigate("/dashboard/enrolled-courses")
    } catch (error) {
        console.log(error)
        toast.error(error)
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}