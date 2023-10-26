import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"
import HighLightText from "./HighLightText"
const LearingLanguageSection = () => {
  return (
    <div className="mt-[130px] mb-32">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-4xl font-semibold text-center">
          Your Swiss knife for <HighLightText text={"learning any language"} />
        </div>
        <div className="text-center text-base w-[72%] font-medium text-richblack-600 mx-auto">
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking , custom schedule and more
        </div>
        <div className="flex lg:flex-row items-center justify-center mt-5 flex-col">
          <img src={know_your_progress} alt="know_your_progress" className="object-contain lg:-mr-28" />
          <img src={compare_with_others} alt="compare_with_others" className="object-contain" />
          <img src={plan_your_lesson} alt="plan_your_lesson" className="object-contain lg:-ml-32" />
        </div>
        <div>
          <CTAButton active={true} linkto={"/signup"} >
            Learn More
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearingLanguageSection