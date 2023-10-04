import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/countrycode.json";
const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const submitContactForm = async (data) => {
    console.log("Logging Data...", data);
    try {
      setLoading(true);
      // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
      const response = { status: "ok" };
      console.log(response);
    } catch (error) {
      console.log("error", error.message);
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(submitContactForm)} className="w-full">
      <div className="flex flex-col gap-y-6 text-black  w-full ">
        <div className="flex flex-row w-full gap-x-4">
          {/* firstname */}
          <div className="flex flex-col gap-y-1 items-start flex-grow">
            <label htmlFor="firstName" className="text-richblack-5">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first name"
              {...register("firstName", { required: true })}
              className="bg-richblack-700 rounded-md p-3 text-richblack-5 outline-none w-full "
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
              }}
            />
            {errors.firstName && <span className="text-[12px] text-yellow-100 -mt-1">please enter your first name </span>}
          </div>
          {/* lastname */}
          <div className="flex flex-col gap-y-1 items-start flex-grow">
            <label htmlFor="lastName" className="text-richblack-5">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last name"
              className="bg-richblack-700 rounded-md p-3 text-richblack-5 outline-none w-full "
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
              }}

              {...register("lastName")}
            />
            {errors.firstName && <span className="text-[12px] text-yellow-100 -mt-1">please enter your first name </span>}
          </div>
        </div>


        {/* email */}
        <div className="flex flex-col gap-1 items-start ">
          <label htmlFor="email" className="text-richblack-5">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="enter email address"
            className="bg-richblack-700 rounded-md p-3 text-richblack-5  outline-none w-full"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
            }}
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-[12px] text-yellow-100 -mt-1">please, enter email address</span>}
        </div>
        {/* phone number */}
        <div className="flex flex-col items-start">

          <label htmlFor="phoneNumber" className="text-richblack-5 ">Phone Number</label>
          <div className="flex flex-row gap-4">

            <select name="dropdown" id="dropdown"
              {...register("countrycode", { required: true })}
              className="bg-richblack-700 rounded-md p-3  outline-none  text-richblack-5 w-[20%]"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
              }}

            >
              {
                CountryCode.map((element, index) => {
                  return (
                    <option value={element.code} key={index}

                    >
                      {element.code}-{element.country}
                    </option>
                  )
                })

              }
            </select>
            <input type="number"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="12345 67890"

              className="bg-richblack-700 rounded-md p-3 text-richblack-5 outline-none w-full"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
              }}

              {...register("phoneNo", {
                required: { value: true, message: "Please enter phone number" },
                maxLength: { value: 10, message: "invalid phone number" },
                minLength: { value: 8, message: "invalid phone number" }

              })}
            />


          </div>
          {
            errors.phoneNo && <span className="text-[12px] text-yellow-100 ">please, enter phone no.</span>
          }
        </div>
        {/* message */}
        <div className="flex flex-col gap-1 items-start">
          <label htmlFor="message" className="text-richblack-5">Message</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter your message here"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
            }}
            className="bg-richblack-700 rounded-md p-3 text-richblack-5 outline-none w-full"

            {...register("message", { required: true })}
          />
          {errors.message && <span className="text-[12px] text-yellow-100 -mt-1">please, enter your message </span>}
        </div>
        <button
          type="submit"
          className="rounded-md bg-yellow-50 text-richblack-900 font-semibold py-3 outline-none hover:scale-[95%] transition-all duration-200"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
