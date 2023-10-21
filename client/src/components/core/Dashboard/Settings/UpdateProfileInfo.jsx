import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { updateProfileInfo } from '../../../../services/operations/settingsAPI';
import IconBtn from "../../../common/IconBtn";

const UpdateProfileInfo = () => {
    const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "other"]
    const { token } = useSelector((state) => state.auth)
    // const { loading } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state) => state.profile)

    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();





    async function onsubmit(data) {
        if (
            user.firstName === data.firstName &&
            user.lastName === data.lastName &&
            user.additionalDetails.gender === data.gender &&
            user.additionalDetails.about === data.about &&
            user.additionalDetails.dateOfBirth === data.dateOfBirth &&
            user.additionalDetails.contactNumber == data.contactNumber
        ) {
            toast.error("Nothing changed");
            return;
        }

        setLoading(true)
        await updateProfileInfo(data, token, dispatch)
        setLoading(false)
    }
    return (
        <div className="mt-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5"
            onClick={(e) => e.stopPropagation()}
        >
            <p className="text-lg font-semibold text-richblack-5 mb-7">Profile Information</p>
            <form className="grid grid-cols-2 gap-x-6 gap-y-6"
                onSubmit={handleSubmit(onsubmit)}
            >
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text"
                        id="firstName"
                        placeholder="Enter first name"
                        className="form-style"
                        {...register("firstName", { required: true })}
                        defaultValue={user?.firstName}

                    />
                </div>
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text"
                        id="lastName"
                        placeholder="Enter last name"
                        className="form-style"
                        {...register("lastName", { required: true })}
                        defaultValue={user?.lastName}



                    />
                </div>
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input type="date"
                        id="dateOfBirth"
                        className="form-style"
                        {...register("dateOfBirth", { required: true })}
                        defaultValue={user?.additionalDetails?.dateOfBirth}


                    />
                </div>
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender"
                        className="form-style"
                        {...register("gender", { required: true })}
                        defaultValue={user?.additionalDetails?.gender || ''}
                    >
                        {
                            !user?.additionalDetails?.gender &&
                            <option selected>select gender</option>

                        }
                        {
                            genders.map((gender, index) => (
                                <option value={gender} key={index}

                                >{gender}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="contactNumber">
                        Contact Number
                    </label>
                    <input type="text"
                        id="contactNumber"
                        placeholder="Enter Contact Number"
                        className="form-style"
                        {...register("contactNumber", { required: true })}
                        defaultValue={user?.additionalDetails?.contactNumber}


                    />
                </div>
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="about">About</label>
                    <input type="text" id="about"
                        placeholder="Enter Bio Details"
                        className="form-style"
                        {...register("about", { required: true })}
                        defaultValue={user?.additionalDetails?.about}

                    />
                </div>
                <div className="flex gap-x-3 col-span-2 justify-end">
                    <button
                        onClick={() =>
                            navigate("/dashboard/my-profile")

                        }
                        type='button'
                        className=" cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                        Cancel
                    </button>
                    <IconBtn text={`${loading ? "saving..." : "save"}`}
                        type={"submit"}
                    >
                    </IconBtn>
                </div>

            </form>
        </div>
    )
}

export default UpdateProfileInfo