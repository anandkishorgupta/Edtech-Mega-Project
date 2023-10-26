import { BiSolidPhoneCall } from "react-icons/bi"
import { BsGlobeAsiaAustralia } from "react-icons/bs"
import { IoMdChatbubbles } from "react-icons/io"
import ContactForm from "../components/common/ContactForm"
import Footer from "../components/common/Footer"
const ContactUs = () => {
    return (
        <div>

            <div
                className="w-11/12 max-w-maxContent mx-auto mt-20 flex lg:flex-row flex-col justify-between gap-12"
                  >
                <div className="flex flex-col gap-y-10 bg-richblack-800 rounded-xl p-8 lg:w-[52%] h-fit">
                    <div>
                        <div className="flex flex-row gap-2 items-center text-lg font-semibold text-richblack-5">
                            <IoMdChatbubbles />
                            Chat on us
                        </div>
                        <p className="font-medium text-base">
                            Our friendly team is here to help.

                        </p>
                        <p className="font-medium text-base">
                            info@studynotion.com

                        </p>
                    </div>
                    <div>
                        <div className="flex flex-row gap-2 items-center text-lg font-semibold text-richblack-5">
                            <BsGlobeAsiaAustralia />
                            Visit us
                        </div>
                        <p className="font-medium text-base">
                            Come and say hello at our office HQ.

                        </p>
                        <p className="font-medium text-base">
                            Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016

                        </p>
                    </div>
                    <div>
                        <div className="flex flex-row gap-2 items-center text-lg font-semibold text-richblack-5">
                            <BiSolidPhoneCall />
                            Call us
                        </div>
                        <p className="font-medium text-base">

                            Mon - Fri From 8am to 5pm


                        </p>
                        <p className="font-medium text-base">+123 456 7869</p>
                    </div>
                </div>
                <div className="border border-richblack-600 rounded-xl flex flex-col px-16 py-16">
                    <div className=" flex flex-col gap-2">
                        <h1 className="text-4xl text-richblack-5 font-bold ">
                            Got a Idea? We've got the skills. Let's team up
                        </h1>
                        <p className="text-richblack-300">
                            Tell us more about yourself and what you're got in mind.
                        </p>
                    </div>
                    <div className="mt-10">
                        <ContactForm />

                    </div>
                </div>

            </div>
            <div className="h-[100px]">

            </div>
            <Footer />
        </div>

    )
}

export default ContactUs