import { useState } from "react"
import { BiHide, BiShow } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../../services/operations/authAPI"
const LoginForm = () => {
    const [hidePassword, setHidePassword] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { email, password } = formData
    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password, navigate))
    }
    return (
        <form className="flex flex-col gap-5 mt-3" onSubmit={handleOnSubmit}>
            <label className="w-full" >
                <p
                    className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
                >Email Address
                    <sup className="text-pink-200">*</sup>
                </p>
                <input type="text"
                    required
                    name="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={handleOnChange}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                    }}
                />
            </label>
            <label className="w-full flex flex-col">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Password
                    <sup className="text-pink-200">*</sup>
                </p>
                <div className="relative">
                    <input type={`${hidePassword ? "password" : "text"}`}
                        required
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handleOnChange}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                        }}
                    />

                    <div className="absolute right-2 top-0 translate-y-[50%] text-2xl" onClick={() => setHidePassword((prev) => !prev)}>
                        {
                            hidePassword ? <BiHide /> : <BiShow />
                        }
                    </div>
                </div>
            </label>
            <Link to={"/forgot-password"} className="text-end text-xs text-blue-100  cursor-pointer -mt-4">

                Forgot password?
            </Link>
            <button className="w-full bg-yellow-50 text-richblack-900 px-[12px] py-[8px] rounded-md mt-6" type="submit">Sign In</button>
        </form>
    )
}

export default LoginForm