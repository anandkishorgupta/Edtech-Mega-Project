import { useEffect, useRef, useState } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import IconBtn from "../../common/IconBtn";
import { Spinner } from "../../common/Spinner";
const VideoDetails = () => {
    const { courseId, sectionId, subSectionId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const playerRef = useRef()
    const location = useLocation()
    const { token } = useSelector((state) => state.auth)
    const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse)
    const [videoData, setVideoData] = useState(null)
    const [videoEnded, setVideoEnded] = useState(false)
    const [loading, setLoading] = useState(false)
    const setVideoSpecificDetails = () => {
        setLoading(true)
        if (!courseSectionData) {
            return
        }
        if (!courseId && !sectionId && !subSectionId) {
            return

        }
        const filteredData = courseSectionData.filter((section) => section._id === sectionId)
        console.log(filteredData)
        const filteredVideoData = filteredData?.[0].subSection.filter((data) => data._id === subSectionId)
        console.log(filteredVideoData[0])
        setVideoData(filteredVideoData[0]) //subSection object
        setVideoEnded(false)
        setLoading(false)
    }
    useEffect(() => {
        if (courseSectionData.length > 0) {
            console.log(courseSectionData.length)
            setVideoSpecificDetails()
            console.log(location.pathname)
        }
    }, [courseSectionData, courseEntireData, location.pathname])

    const isFirstVideo = () => {
        if (courseSectionData.length > 0) {
            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
            const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId)
            if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
                return true
            } else {
                return false
            }
        }
    }
    const isLastVideo = () => {
        if (courseSectionData.length > 0) {
            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
            const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId)
            const noOfSubSection = courseSectionData[currentSectionIndex]?.subSection.length

            if (currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSection - 1) {
                return true
            } else {
                return false
            }
        }
    }
    const goToNextVideo = () => {
        if (courseSectionData.length > 0) {
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )

            const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

            const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
                (data) => data._id === subSectionId
            )

            if (currentSubSectionIndex !== noOfSubSections - 1) {
                //same section ki next video me jao
                const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSectionIndex + 1]._id;
                //next video pr jao
                navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
            }
            else {
                //different section ki first video
                const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
                const nextSubSectionId = courseSectionData[currentSectionIndex + 1]?.subSection[0]._id;
                ///iss voide par jao 
                navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
            }
        }

    }
    const goToPreviousVideo = () => {
        if (courseSectionData.length > 0) {
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )

            const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

            const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
                (data) => data._id === subSectionId
            )

            if (currentSubSectionIndex != 0) {
                //same section , prev video
                const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1];
                //iss video par chalge jao
                navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
            }
            else {
                //different section , last video
                const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
                const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
                const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
                //iss video par chalge jao
                navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)

            }
        }
    }
    const handleLectureCompletion = () => {

    }
    return (
        <>
            {
                loading ? (<div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
                    <Spinner />
                </div>) : (
                    <div className="">
                        {
                            !videoData ? (<div>no data found</div>) : (
                                <Player
                                    ref={playerRef}
                                    aspectRatio="16:9"
                                    playsInline
                                    onEnded={() => setVideoEnded(true)}
                                >
                                    <source src={videoData?.videoUrl} />
                                    <AiOutlinePlayCircle />
                                    {
                                        videoEnded && (
                                            <div>
                                                {
                                                    !completedLectures.includes(subSectionId) &&
                                                    <IconBtn
                                                        onClick={() => handleLectureCompletion()}
                                                        text={!loading ? "Mark as completed" : "Loading....."}
                                                    />
                                                }
                                                <IconBtn
                                                    onClick={() => {
                                                        if (playerRef?.current) {
                                                            playerRef.current.seek(0)
                                                            setVideoEnded(false)
                                                        }
                                                    }}
                                                    text={"ReWatch"}
                                                />

                                            </div>
                                        )
                                    }
                                    <div>
                                        {!isFirstVideo() && (
                                            <button
                                                disabled={loading}
                                                onClick={goToPreviousVideo}
                                                className='blackButton'
                                            >
                                                Prev
                                            </button>
                                        )}
                                        {!isLastVideo() && (
                                            <button
                                                // disabled={loading}
                                                onClick={goToNextVideo}
                                                className='blackButton'>
                                                Next
                                            </button>
                                        )}
                                    </div>
                                </Player>

                            )
                        }
                    </div>

                )
            }
        </>

    )
}

export default VideoDetails