import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Spinner } from "../components/common/Spinner";
import { resetPassword } from "../services/operations/authAPI";
const UpdatePassword = () => {
    const { loading } = useSelector((state) => state.auth)
    // const [hidePassword, setHidePassword] = useState(true)
    // const [hideConfirmPassword, setHideConfirmPassword] = useState(true)
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
        <div>
            {
                loading ? (
                    <div><Spinner /></div>
                ) : (
                    <div>
                        <h1>Choose new Password </h1>
                        <p>Almost done. Enter your new password and you are all set</p>
                        <form onSubmit={handleOnSubmit}>
                            <label>
                                <p>New Password
                                    <sup>*</sup>
                                </p>
                                <input type={
                                    // hidePassword ? "password" :
                                    
                                    "text"}
                                    required
                                    name="password"
                                    value={password}
                                    onChange={handleOnChange}
                                    placeholder="Enter password"
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                />
                                {/* <span onClick={setHidePassword((prev) => !prev)}>
                                    {
                                        hidePassword ? <BiHide /> : <BiShow />
                                    }
                                </span> */}
                            </label>

                            <label>
                                <p>Confirm Password
                                    <sup>*</sup>
                                </p>
                                <input type={
                                    // hideConfirmPassword ? "password" :
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
                                {/* <span onClick={setHideConfirmPassword((prev) => !prev)}>
                                    {
                                        hideConfirmPassword ? <BiHide /> : <BiShow />
                                    }
                                </span> */}
                            </label>
                            <button type="submit">
                                Reset password
                            </button>

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

export default UpdatePassword