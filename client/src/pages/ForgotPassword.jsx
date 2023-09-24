import { useState } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Spinner } from "../components/common/Spinner"
import { getPasswordResetToken } from "../services/operations/authAPI"
const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")
    const { loading } = useSelector((state) => state.auth)
    const dispatch=useDispatch()
    function handleOnSubmit(event){
        event.preventDefault();
        
        dispatch(getPasswordResetToken(email,setEmailSent))
        
    }
    return (
        <div className=" grid place-items-center mx-auto min-h-[calc(100vh-3.5rem)] ">

            {
                loading ? (<Spinner/>) : (
                    <div className="flex flex-col justify-center max-w-[500px] p-4 lg:p-8">
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                            {
                                !emailSent ? "Reset your password" : "Check Your Email"
                            }
                        </h1>
                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100 pr-3">
                            {
                                !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email} `
                            }
                        </p>
                        <form onSubmit={handleOnSubmit}>
                            {
                                !emailSent && (
                                    <label className="w-full">
                                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address:
                                            <sup className="text-pink-200">*</sup>
                                        </p>
                                        <input type="email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter Your Email Address"
                                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
                                            style={{
                                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                                            }}

                                        />
                                    </label>
                                )
                            }
                            <button className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium
                             text-richblack-900" type="submit">
                                {

                                    !emailSent ? "Reset Password" : "Resend Email"

                                }</button>
                        </form>
                        <div>
                            <Link to={"/login"} className="flex flex-row gap-3 mt-4  items-center">
                                <AiOutlineArrowLeft/>
                                <p className="text-richblack-5 ">Back to Login</p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword