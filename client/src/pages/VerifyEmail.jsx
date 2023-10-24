import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoMdRefresh } from "react-icons/io";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../components/common/Spinner";
import { sendOtp, signUp } from "../services/operations/authAPI";
const VerifyEmail = () => {
    const { loading, signupData } = useSelector((state) => state.auth)
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
        <div className="text-white flex justify-center items-center min-h-[calc(100vh-3.5rem)] ">
            {loading ? (
                <div>
                    <Spinner />
                </div>
            ) : (
                <div className="border border-richblack-600 p-8 rounded-lg">
                    <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verify Email</h1>
                    <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleVerifyAndSignup}>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props}
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"

                            />}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                        />
                        <button type="submit"
                            className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                        >Verify Email</button>
                    </form>
                    <div>
                        <div>
                            <Link
                                to={"/login"}
                                className="flex flex-row gap-3 mt-4  items-center"
                            >
                                <AiOutlineArrowLeft />
                                <p className="text-richblack-5 flex items-center gap-x-2">Back to Login</p>
                            </Link>
                        </div>
                        <button
                            className="flex items-center text-blue-100 gap-x-2 mt-1"
                            onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
                            <IoMdRefresh />
                            <p>
                                Resend otp
                            </p>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;
