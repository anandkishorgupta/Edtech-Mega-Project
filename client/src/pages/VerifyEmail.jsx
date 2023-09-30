import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../components/common/Spinner";
import { sendOtp, signUp } from "../services/operations/authAPI";
const VerifyEmail = () => {
    const {loading,signupData}=useSelector((state)=>state.auth)
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, []);
    function handleVerifyAndSignup(e) {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
        dispatch(
            signUp(
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
                navigate
            )
        );
    }
    return (
        <div className="text-white">
            {loading ? (
                <div>
                    <Spinner />
                </div>
            ) : (
                <div>
                    <h1>Verify Email</h1>
                    <p>A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleVerifyAndSignup}>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />}
                        />
                        <button type="submit">Verify Email</button>
                    </form>
                    <div>
                        <div>
                            <Link
                                to={"/login"}
                                className="flex flex-row gap-3 mt-4  items-center"
                            >
                                <AiOutlineArrowLeft />
                                <p className="text-richblack-5 ">Back to Login</p>
                            </Link>
                        </div>
                        <button onClick={() => dispatch(sendOtp(signupData.email,navigate))}>
                            Resend it
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;
