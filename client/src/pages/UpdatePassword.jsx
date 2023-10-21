import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiHide, BiShow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Spinner } from "../components/common/Spinner";
import { resetPassword } from "../services/operations/authAPI";
const UpdatePassword = () => {
    const { loading } = useSelector((state) => state.auth)
    const [hidePassword, setHidePassword] = useState(true)
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true)
    const dispatch = useDispatch()
    const location = useLocation()

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    })
    const { password, confirmPassword } = formData
    function handleOnChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    function handleOnSubmit(e) {
        e.preventDefault()
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(password, confirmPassword, token))
    }
    return (
        <div className="flex justify-center items-center h-[calc(100vh-3.5rem)] w-[370px] mx-auto">
            {
                loading ? (
                    <div><Spinner /></div>
                ) : (
                    <div className="">
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new Password </h1>
                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done. Enter your new password and you are all set</p>
                        <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-3">
                            <label className="relative">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password
                                    <sup>*</sup>
                                </p>
                                <input type={
                                    hidePassword ? "password" :
                                        "text"}
                                    required
                                    name="password"
                                    value={password}
                                    onChange={handleOnChange}
                                    placeholder="Enter password"
                                    className=" w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                />
                                <span onClick={
                                    () => setHidePassword((prev) => !prev)

                                }
                                    className="absolute right-1  translate-y-[90%] translate-x-[-50%]"
                                >
                                    {
                                        hidePassword ? <BiHide /> : <BiShow />
                                    }
                                </span>
                            </label>
                            <label className="relative"> 
                                <p className=" mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm Password
                                    <sup>*</sup>
                                </p>
                                <input type={
                                    hideConfirmPassword ? "password" :
                                        "text"}
                                    required
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleOnChange}
                                    placeholder="confirm password "
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                />
                                <span onClick={
                                    () => setHideConfirmPassword((prev) => !prev)

                                }
                                className="absolute right-1  translate-y-[90%] translate-x-[-50%]"
                                
                                >
                                    {
                                        hideConfirmPassword ? <BiHide /> : <BiShow />
                                    }
                                </span>
                            </label>
                            <button type="submit"
                                className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                            >
                                Reset password
                            </button>

                        </form>
                        <div>
                            <Link to={"/login"} className="flex flex-row gap-3 mt-4  items-center">
                                <AiOutlineArrowLeft />
                                <p className="text-richblack-5 ">Back to Login</p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword