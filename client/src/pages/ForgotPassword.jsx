import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")
    const { loading } = useSelector((state) => state.auth)
    return (
        <div>

            {
                loading ? (<div>loading</div>) : (
                    <div>
                        <h1>
                            {
                                !emailSent ? "Reset your password" : "Check Your Email"
                            }
                        </h1>
                        <p>
                            {
                                !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email} `
                            }
                        </p>
                        <form >
                            {
                                !emailSent && (
                                    <label>
                                        <p>Email Address:</p>
                                        <input type="email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter Your Email Address"

                                        />
                                    </label>
                                )
                            }
                            <button>
                                {

                                    !emailSent ? "Reset Password" : "Resend Email"

                                }</button>
                        </form>
                        <div>
                            <Link to={"/login"}>
                                <p>Back to Login</p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword