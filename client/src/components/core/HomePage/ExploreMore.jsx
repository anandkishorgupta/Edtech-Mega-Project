import { useState } from "react"
import { HomePageExplore } from "../../../data/homepage-explore"
import CourseCard from "./CourseCard"
import HighLightText from "./HighLightText"
const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]
const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0])
    const [courses, setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)
    const setMyCards = (value) => {
        setCurrentTab(value)
        const result = HomePageExplore.filter((ele) => ele.tag === value)
        console.log(result)
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }
    return (
        <div className="flex flex-col ">
            <div className="text-4xl font-semibold text-center">
                Unlock the <HighLightText text={"Power of Code"} />
            </div>
            <div className="text-center text-richblack-300 text-[16px] mt-3">Learn to build anything you can imagine</div>

            <div className="flex flex-row items-center gap-4 bg-richblack-800 px-1 py-1 rounded-full mb-10 mt-5 ">
                {
                    tabsName.map((ele, index) => (
                        <div key={index}
                            className={`text-[16px] flex flex-row items-center gap-2 
                            ${currentTab === ele ? "bg-richblack-900 text-richblack-5 font-medium" : " text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                            onClick={() => setMyCards(ele)}
                        >
                            {ele}
                        </div>
                    ))
                }
            </div>
            <div className="lg:h-[150px]"></div>
            {/* course card  */}
            <div className="absolute flex flex-row justify-between translate-y-[62%] left-0">
                {
                    courses.map((element, index) => (
                        <CourseCard key={index} cardData={element} currentCard={currentCard} setCurrentCard={setCurrentCard} />
                    ))
                }
            </div>
        </div>
    )
}

export default ExploreMore