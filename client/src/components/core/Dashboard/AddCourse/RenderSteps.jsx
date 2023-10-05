import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
const RenderSteps = () => {
    const { step } = useSelector((state) => state.course)
    const steps = [
        {
            id: 1,
            title: "Course information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish"
        }
    ]
    return (
        <>
            <div className="flex">
                {
                    steps.map((item, index) => (
                        <div key={index}>
                            <div className={`${step === item.id ? "bg-yellow-900 border-r-yellow-50 text-yellow-50" : " border-richblack-700 bg-richblack-800 text-richblack-300"}`}>
                                {
                                    step > item.id ? (<FaCheck />) : (item.id)
                                }

                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex mb-16">
                {steps.map((item, index) => (
                    <div key={index}>
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>
            {
                step == 1 &&
                <CourseInformationForm />
            }
            {/* {
                step == 2 &&
                <CourseBuilderForm />
            }
            {
                step == 3 &&
                <PublishCourse />
            } */}
        </>
    )
}

export default RenderSteps