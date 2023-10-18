import { useEffect, useState } from "react"
import { IoChevronBackCircleOutline } from "react-icons/io5"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import IconBtn from "../../common/IconBtn"
const VideoDetailSidebar = ({ setReviewModal }) => {
    const [activeSection, setActiveSection] = useState('')
    const [videobarActive, setVideobarActive] = useState('')
    const navigate = useNavigate()
    const { sectionId, subSectionId } = useParams()
    const location = useLocation()

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse)


    const setActiveFlags = () => {
        if (courseSectionData.length === 0) {
            return;
        }
        // find the index of current sectionId in courseSectionData [{sectionName,[subSection]},{sectionName,[subSection]}}]
        const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
        console.log("currentSectionIndex........", currentSectionIndex)
        // set current section id
        setActiveSection(courseSectionData?.[currentSectionIndex]?._id)


        // find the index of current subSectionId 
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
            (data) => data._id === subSectionId
        )
        // get current subSection id 
        const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id

        // set current subsection id
        setVideobarActive(activeSubSectionId)

        //LATER I WILL TRY THE SAME USING FILTER METHOD 
    }
    useEffect(() => {
        // if (courseSectionData.length > 0) {
        setActiveFlags()
        // }
    }, [courseSectionData, courseEntireData, location.pathname])
    return (
        <div className=" bg-richblack-800  border-r-[1px] border-r-richblack-700 min-w-[250px] h-[calc(100vh-3.5rem)]">
            <div className="flex justify-between items-center px-3">
                {/* back Icon */}
                <IoChevronBackCircleOutline className="text-4xl cursor-pointer"
                    onClick={() => navigate("/dashboard/enrolled-courses ")}
                />
                <IconBtn text={"Add Review"}
                    onClick={() => setReviewModal(true)}
                />
            </div>
            <p>course name</p>
            <p>completed info /{totalNoOfLectures}</p>
            {/* sections and subsections  */}

            <div onClick={(e) => e.stopPropagation()}>
                {
                    courseSectionData?.map((section, index) => (
                        <div key={index} >
                            {/* section */}
                            <div className="bg-richblack-700 cursor-pointer" onClick={() => setActiveSection(section?._id)}>
                                <div >
                                    {section?.sectionName}
                                    {/* icon */}
                                </div>
                            </div>
                            {/* sub section */}
                            <div>
                                {
                                    activeSection === section._id && (
                                        <div>

                                            {
                                                section.subSection.map((topic, index) => (
                                                    <div key={index}
                                                        className={`flex gap-5 p-5 ${videobarActive === topic?._id ? "bg-yellow-200" : "bg-richblack-900 text-richblack-5"}`}
                                                        onClick={() => {
                                                            navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                                            setVideobarActive(topic?._id)
                                                        }}
                                                    >

                                                        <input type="checkbox"
                                                            checked={completedLectures?.includes(topic?._id)}
                                                        />
                                                        {topic.title}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default VideoDetailSidebar