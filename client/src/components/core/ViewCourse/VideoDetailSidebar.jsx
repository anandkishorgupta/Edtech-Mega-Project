import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const VideoDetailSidebar = ({ setReviewModal }) => {
    const [activeSection, setActiveSection] = useState('')
    const [videobarActive, setVideobarActive] = useState('')
    const navigate = useNavigate()
    const { sectionId, subSectionId } = useParams()
    const location = useLocation()
    const [rotate, setRotate] = useState(false)
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

    }
    useEffect(() => {
        // if (courseSectionData.length > 0) {
        setActiveFlags()
        // }
    }, [courseSectionData, courseEntireData, location.pathname])
    return (
        <div className=" bg-richblack-800  border-r-[1px] border-r-richblack-700 max-w-[300px] min-h-[298px] h-[calc(100vh-3.5rem)]">
            <div className="flex justify-between items-center px-3 my-5">
                {/* back Icon */}
                <IoChevronBackCircleOutline className="text-4xl cursor-pointer"
                    onClick={() => navigate("/dashboard/enrolled-courses ")}
                />
                <button
                    type="button"
                    className="px-5  py-2 rounded-md text-base bg-yellow-50"
                    onClick={() => setReviewModal(true)}
                >
                    Add Review
                </button>
            </div>
            <p className="px-4 mb-4 font-semibold">{courseEntireData?.courseName}</p>
            <p className="px-4 mb-1">{completedLectures?.length}/{totalNoOfLectures}</p>
            {/* sections and subsections  */}

            <div onClick={(e) => e.stopPropagation()}>
                {
                    courseSectionData?.map((section, index) => (
                        <div key={index} >
                            {/* section */}
                            <div className="bg-richblack-700 py-4 px-4 cursor-pointer border-b border-richblack-600" onClick={() => setActiveSection(section?._id)}>
                                <div className="flex items-center gap-x-2"
                                // onClick={() => setRotate(!rotate)}
                                >
                                    {/* icon */}
                                    <IoIosArrowUp className={`${rotate ? "rotate-180 transition-all duration-[0.2s] ease-out" : "transition-all duration-[0.2s] ease-out"}`} />
                                    {section.sectionName}
                                </div>
                            </div>
                            {/* sub section */}
                            <div>
                                {
                                    activeSection === section._id && (

                                        <div>
                                            {section.subSection.map((topic, index) => (
                                                <div key={index} className={`relative flex gap-5 py-4 px-4 items-center bg-richblack-900  text-richblack-5`} onClick={() => {
                                                    navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`);
                                                    setVideobarActive(topic?._id);
                                                }}>
                                                    <input type="checkbox" checked={completedLectures?.includes(topic?._id)} readOnly />
                                                    {topic.title}
                                                    <div className={videobarActive === topic?._id ? "absolute left-0 bg-yellow-200 w-[2px] h-full text-richblack-5" : ""}></div>
                                                </div>
                                            ))}
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