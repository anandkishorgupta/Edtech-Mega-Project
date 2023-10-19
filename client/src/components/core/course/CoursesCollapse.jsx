import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineVideoCamera } from "react-icons/ai";
import { IoIosArrowUp } from "react-icons/io";
const CoursesCollapse = ({ isActive, courseData, handleActive }) => {
    const contentEl = useRef(null)
    const [sectionHeight, setSectionHeight] = useState(0)
    useEffect(() => {
        console.log('isActive:', isActive);
        setSectionHeight(isActive.length > 0 ? contentEl.current.scrollHeight : 0)
    }, [isActive])
    const [rotate, setRotate] = useState(false)
    return (
        <>
            {courseData?.courseContent?.map((section) => (

                <div key={section._id} className="border border-solid border-richblack-600">
                    <div
                        onClick={() => {
                            handleActive(section._id)
                            setRotate(!rotate)
                        }
                        }
                        className="bg-richblack-700 py-6 px-7 cursor-pointer flex flex-row justify-between"
                    >
                        <p className='flex items-center gap-x-1'>
                            <IoIosArrowUp className={`${rotate ? "rotate-180 transition-all duration-[0.2s] ease-out" : "transition-all duration-[0.2s] ease-out"}`} />
                            {section.sectionName}
                        </p>
                        <p className='text-yellow-25'>{section?.subSection?.length} lecture(s)</p>
                    </div>
                    {/* subSection */}
                    <div className="h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.34s] ease-[ease]" style={{
                        height: sectionHeight,
                        }}
                        ref={contentEl}
                             >
                        {section?.subSection?.map((subSection) => (
                            <div key={subSection._id}
                            >
                                {isActive?.includes(section._id) ?
                                    <div className='flex flex-row gap-x-2 py-6 px-7 items-center'>
                                        <AiOutlineVideoCamera />
                                        {
                                            subSection?.title

                                        }
                                    </div>
                                    : null
                                }
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default CoursesCollapse;
