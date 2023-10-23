import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { FooterLink2 } from "../../data/footer-links";
const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
]
const Plans = [
    "Paid memberships",
    "For students",
    "For students",
    " Business solutions"
]
const Community = [
    "Forums",
    "Chapters",
    "Events "
]
const Footer = () => {
    return (
        <div className="bg-richblack-800">
            <div className="w-11/12 max-w-maxContent mx-auto flex-col items-center justify-between gap-8">
                <div className="h-16"></div>
                <div className="flex flex-col">
                    <div className="lg:flex lg:gap-9 text-richblack-400 lg:flex-row flex-col">
                        {/* left section  */}
                        <div className=" lg:flex lg:flex-row lg:justify-between lg:w-[50%] lg:gap-10 grid grid-cols-2 mb-10 lg:mb-0">

                            <div className="flex flex-col gap-2  flex-1 text-richblack-400 w-[40%]">
                                <img src={Logo} alt="Logo" />
                                <h1 className="font-semibold text-xl text-richblack-50">Company</h1>
                                {
                                    ["About", "Careers", "Affiliates"].map((element, index) => (
                                        <div key={index}>
                                            <Link to={"/" + element.trim().toLowerCase()}>
                                                <p className="hover:text-richblack-50 transition-all duration-200">{element}</p>
                                            </Link>
                                        </div>
                                    ))
                                }
                                <div className="flex gap-4  items-center">
                                    <FaFacebook />
                                    <FaGoogle />
                                    <FaTwitter />
                                    <FaYoutube />
                                </div>
                            </div>
                            <div className="flex flex-col gap-9 flex-1">
                                <div className="flex flex-col gap-2">

                                    <h1 className="font-semibold text-xl text-richblack-50">Resources</h1>
                                    {
                                        Resources.map((element, index) => (
                                            <div key={index}>
                                                <Link to={"/" + element.trim().split(" ").join("-").toLowerCase()}>
                                                    <p className="hover:text-richblack-50 transition-all duration-200">{element}</p>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div>
                                    <h1 className="font-semibold text-xl text-richblack-50">Support</h1>
                                    <Link to={"/help-center"}>
                                        <p className="hover:text-richblack-50 transition-all duration-200">Help Center</p>
                                    </Link>
                                </div>

                            </div>
                            <div className="flex flex-col gap-9 flex-1">
                                <div className="flex flex-col gap-2">

                                    <h1 className="font-semibold text-xl text-richblack-50">Plans</h1>
                                    {
                                        Plans.map((element, index) => (
                                            <div key={index}>
                                                <Link to={"/" + element.trim().split(" ").join("-")}>
                                                    <p className="hover:text-richblack-50 transition-all duration-200">
                                                        {element}
                                                    </p>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-semibold text-xl text-richblack-50">Community</h1>
                                    {
                                        Community.map((element, index) => (
                                            <div key={index}>
                                                <Link to={"/" + element.trim().split(" ").join("-")}>
                                                    <p className="hover:text-richblack-50 transition-all duration-200">
                                                        {element}
                                                    </p>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                        {/* right section  */}
                        <div className="lg:flex lg:flex-row lg:justify-between lg:w-[50%] lg:border-l lg:border-richblack-700 lg:ps-4 lg:pb-0
                        grid grid-cols-2 gap-x-5 gap-y-5
                        ">
                            {
                                FooterLink2.map((element, index) => (
                                    <div key={index} className="flex flex-col gap-2 flex-1 ">
                                        <h1 className="font-semibold text-[16px] text-richblack-50">{element.title}</h1>
                                        {
                                            element.link.map((ele, index) => (
                                                <div key={index}>
                                                    <p className="text-richblack-400 cursor-pointer text-[14px] hover:text-richblack-50 transition-all duration-200">{ele.title}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex lg:flex-row lg:justify-between lg:items-center border-t border-richblack-700 mt-5 pt-7 text-richblack-400 flex-col items-center gap-y-2 lg:gap-y-0">
                        <div className="flex flex-row items-center gap-4 cursor-pointer ">
                            <p className="hover:text-richblack-50 transition-all duration-200">Privacy Policy</p>
                            <p>|</p>
                            <p className=" hover:text-richblack-50 transition-all duration-200" >Cookie Policy </p>
                            <p>|</p>
                            <p className="hover:text-richblack-50 transition-all duration-200">Terms </p>
                        </div>
                        <div className="">
                            Made with ❤️ ©2023 Studynotion
                        </div>
                    </div>
                </div>
                <div className="h-16"></div>
            </div>
        </div>

    )
}

export default Footer