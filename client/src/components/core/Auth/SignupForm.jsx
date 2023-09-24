import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../common/Tab";
const SignupForm = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true)
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);




  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div>
      <form className="flex flex-col gap-5 mt-3">
        {/* role button */}

        <Tab accountType={accountType} setAccountType={setAccountType} tabData={tabData}/>
        {/* firstname & lastname */}
        <div className="flex flex-row gap-5 justify-center items-center">
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name
              <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              name="firstName"
              placeholder="Enter first name "
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
          </label>
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name
              <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              name="lastName"
              placeholder="Enter last name"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
          </label>
        </div>
        {/* email */}
        <div>
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address
              <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              name="email"
              placeholder="Enter email address"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
          </label>
        </div>
        {/* password & confirm password  */}
        <div className="flex flex-row justify-center items-center gap-5">
          <label className="w-full flex flex-col">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create password
              <sup className="text-pink-200">*</sup>
            </p>
            <div className="relative">
              <input
                type={`${hidePassword ? "password" : "text"}`}
                required
                name="password"
                placeholder="Enter password"
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              />

              <div className="absolute right-2 top-0 translate-y-[50%] text-2xl">
                {hidePassword ? (
                  <BiHide onClick={() => setHidePassword(false)} fill="#AFB2BF" />
                ) : (
                  <BiShow onClick={() => setHidePassword(true)} fill="#AFB2BF" />
                )}
              </div>
            </div>
          </label>
          <label className="w-full flex flex-col">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm password
              <sup className="text-pink-200">*</sup>
            </p>
            <div className="relative">
              <input
                type={`${hideConfirmPassword ? "password" : "text"}`}
                required
                name="confirmPassword"
                placeholder="confirm password "
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              />

              <div className="absolute right-2 top-0 translate-y-[50%] text-2xl">
                {hideConfirmPassword ? (
                  <BiHide onClick={() => setHideConfirmPassword(false)} fill="#AFB2BF" />
                ) : (
                  <BiShow onClick={() => setHideConfirmPassword(true)} fill="#AFB2BF" />
                )}
              </div>
            </div>
          </label>
        </div>
        {/* signup button */}
        <button className="w-full bg-yellow-50 text-richblack-900 px-[12px] py-[8px] rounded-md mt-6">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
