import { BiEdit } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../common/IconBtn"
const MyProfile = () => {
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    console.log("user slice from my profile component......", user)
    return (
        <div className="flex flex-col gap-y-10  ">
            <h1 className="text-3xl text-start">My Profile</h1>
            {/* section 1 */}
            <div className="flex flex-row bg-richblack-800 px-10 py-8 border justify-between border-richblack-600 rounded-md items-center w-full">
                <div className="flex gap-x-4 flex-row items-center">
                    <img src={user?.image} alt={`profile-${user.firstName}`} className="aspect-square w-[78px] rounded-full object-cover" />
                    <div className="flex flex-col gap-y-1 font-semibold">
                        <p>{user?.firstName + " " + user?.lastName}</p>
                        <p className="text-sm font-medium text-richblack-300">{user?.email}</p>
                    </div>
                </div>
                <IconBtn
                    text={"Edit"}
                    onClick={() => {
                        navigate("/dashboard/settings")
                    }}
                >
                    <BiEdit />
                </IconBtn>
            </div>
            {/* section 2 */}
            <div className=" bg-richblack-800 px-10 py-8 border  border-richblack-600 rounded-md flex flex-col gap-y-7">
                <div className="flex flex-row justify-between">
                    <p className="font-semibold">About</p>
                    <IconBtn text={"Edit"} onClick={() => { navigate("/dashboard/settings") }}>

                        <BiEdit />

                    </IconBtn>

                </div>
                <p className="text-sm text-richblack-300">{user?.additionalDetails?.about ?? "Write Something about Yourself"}</p>
            </div>
            {/* section3 */}
            <div className=" bg-richblack-800 px-10 py-8 border  border-richblack-600 rounded-md flex flex-col gap-y-7">
                <div className="flex flex-row justify-between">
                    <p className="font-semibold">Personal Details</p>
                    <div className="w-fit">
                        <IconBtn text={"Edit"} onClick={() => { navigate("/dashboard/settings") }}  >
                            <BiEdit />

                        </IconBtn>
                    </div>

                </div>
                <div className=" flex gap-44">
                    <div className="flex flex-col gap-y-5">

                        <div >
                            <p className="text-sm text-richblack-300">First Name</p>
                            <p>{user?.firstName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-richblack-300">Email</p>
                            <p>{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-richblack-300">Gender</p>
                            <p>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5">

                        <div>
                            <p className="text-sm text-richblack-300">Last Name</p>
                            <p>{user?.lastName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-richblack-300">Phone Number</p>
                            <p>{user?.additionalDetails?.contactNumber ?? "Add contact Number"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-richblack-300">Date of Birth</p>
                            <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth"}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MyProfile