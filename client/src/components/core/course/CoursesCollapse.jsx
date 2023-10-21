import React from 'react';
import { AiOutlineVideoCamera } from "react-icons/ai";
import { IoIosArrowUp } from "react-icons/io";
const CoursesCollapse = ({ isActive, courseData, handleActive, setIsActive }) => {

    return (
        <>
            {courseData?.courseContent?.map((section) => (

                <div key={section._id} className="border border-solid border-richblack-600">
                    <div
                        onClick={() => {
                            handleActive(section._id)
                        }
                        }
                        className="bg-richblack-700 py-6 px-7 cursor-pointer flex flex-row justify-between"
                    >
                        <p className='flex items-center gap-x-1'>
                            <IoIosArrowUp className={`${isActive?.includes(section._id) ? "rotate-180 transition-all duration-[0.2s] ease-out" : "transition-all duration-[0.2s] ease-out"}`} />
                            {section.sectionName}
                        </p>
                        <p className='text-yellow-25'>{section?.subSection?.length} lecture(s)</p>
                    </div>



                    {/* subSection */}
                    <div
                    
                    >
                        {section?.subSection?.map((subSection) => (
                            <div key={subSection._id}

                            >
                                {isActive?.includes(section._id) ?
                                    <div className='flex flex-row gap-x-2 py-6 px-7 items-center '>
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
