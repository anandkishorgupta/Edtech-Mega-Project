import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../../../services/operations/settingsAPI';
import IconBtn from '../../../common/IconBtn';

const PasswordUpdate = () => {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // submit data
    async function onsubmit(data) {
       
        await changePassword(data, token)
    }
    return (
        <div
            className="mt-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5"
            onClick={(e) => e.stopPropagation()}
        >
            <form className="grid grid-cols-2 gap-x-6 gap-y-6"
                onSubmit={handleSubmit(onsubmit)}
            >
                <div className="flex flex-col">
                    <label htmlFor="oldPassword">Current password</label>
                    <input
                        type="text"
                        id="oldPassword"
                        className="form-style"
                        placeholder="Enter  current password"
                        {...register("oldPassword", { required: true })}
                    />
                    {errors.oldPassword && <span className='addCourseError'>Password is required</span>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="text"
                        id="newPassword"
                        className="form-style"
                        placeholder="Enter new password"
                        {...register("newPassword", { required: true })}

                    />
                    {errors.newPassword && (
                        <span className='addCourseError'>Confirm Password is required</span>
                    )}
                </div>
                <div className="flex gap-x-3 col-span-2 justify-end">
                    <button
                        onClick={() => navigate('/dashboard/my-profile')}
                        type="button"
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                        Cancel
                    </button>
                    <IconBtn text="Save" type="submit"
                    />
                </div>
            </form>
        </div>
    );
};

export default PasswordUpdate;
