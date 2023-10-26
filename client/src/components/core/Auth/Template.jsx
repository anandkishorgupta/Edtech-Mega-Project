import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
const Template = ({ title, description1, description2, image, formType }) => {
    return (
        <div className="flex flex-row justify-between items-center w-11/12 max-w-maxContent mx-auto  min-h-[calc(100vh-3.5rem)] gap-9">
            <div className="flex flex-col gap-2  w-11/12 max-w-[450px] mx-auto lg:mx-0">
                <h1 className="font-bold text-3xl">{title}</h1>
                <p className=" text-[1.125rem] leading-[1.625rem] mt-4">
                    <span className="text-richblack-100">{description1}</span>
                    <br />
                    <span className="font-edu-sa font-bold italic text-blue-100">{description2}</span>
                </p>

                {
                    formType === "login" &&
                    <LoginForm />
                }
                {
                    formType === "signup" &&
                    <SignupForm />
                }
            </div>
            <div className="relative lg:block hidden">
                <img src={frameImg} alt="" className=" w-[450px]" />
                <img src={image} alt="" className="w-[450px] object-contain absolute top-0 translate-x-[-4%] translate-y-[-4%]" />
            </div>
        </div>
    )
}
export default Template