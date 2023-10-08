import { useState } from "react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { MdArrowDropDown, MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";
const NestedView = ({ handleChangeEditSectionName }) => {
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    async function handleDeleteSection(sectionId) {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token,
        });
        if (result) {
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

    async function handleDeleteSubSection(subSectionId, sectionId) {  
        const result = await deleteSubSection({ subSectionId, sectionId }, token);
        console.log(result)
        if (result) {
            // this gives updated array of courseContent, the affected section obj containing subSection array is replaced by result and remaining remains the same 
            let updatedCourseContent = course.courseContent.map((section) => {
                return section._id === sectionId ? result : section
            })
            dispatch(setCourse({ ...course, courseContent: updatedCourseContent }));
        }
        setConfirmationModal(null);
    }    
    return (
        <>
            <div className="rounded-lg bg-richblack-700 p-6 px-8">
                <div>
                    {course?.courseContent?.map((section) => (
                        <details key={section._id} open>
                            <summary className="flex items-center justify-between gap-x-3 border-b-2">
                                <div className="flex gap-x-3 items-center">
                                    <RxDropdownMenu />
                                    <p className="font-semibold text-richblack-50">
                                        {section.sectionName}
                                    </p>
                                </div>
                                <div
                                    className="flex ite
                                      ms-center gap-x-3"
                                >
                                    <button
                                        onClick={() =>
                                            handleChangeEditSectionName(
                                                section._id,
                                                section.sectionName
                                            )
                                        }
                                    >
                                        <MdEdit className="text-xl text-richblack-300" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Delete this Section",
                                                text2:
                                                    "All the lectures in this section will be deleted ",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: () => handleDeleteSection(section._id),
                                                btn2Handler: () => setConfirmationModal(null),
                                            });
                                        }}
                                    >
                                        <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                    </button>
                                    <span>|</span>
                                    <MdArrowDropDown className={`text-3xl text-richblack-300`} />
                                </div>
                            </summary>
                            <div className="px-6 pb-4">
                                {section.subSection.map((data) => (
                                    <div
                                        key={data?._id}
                                        onClick={() => setViewSubSection(data)}
                                        className="flex items-center justify-between gap-x-3 border-b-2"
                                    >
                                        <div className="flex gap-x-3   py-2 items-center">
                                            <RxDropdownMenu />
                                            <p className="font-semibold text-richblack-50">
                                                {data.title}
                                            </p>
                                        </div>
                                        {/* STOP PROPAGATION *****************************************/}
                                        {/* ************************************************************ */}
                                        <div
                                            className="flex items-center gap-x-3"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button
                                                onClick={() =>
                                                    setEditSubSection({ ...data, sectionId: section._id })
                                                }
                                            >
                                                <MdEdit className="text-xl text-richblack-300" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setConfirmationModal({
                                                        text1: "Delete this Sub Section",
                                                        text2: "Selected lecture will be deleted ",
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: () =>
                                                            handleDeleteSubSection(data._id, section._id),
                                                        btn2Handler: () => setConfirmationModal(null),
                                                    });
                                                }}
                                            >
                                                <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    className="flex items-center gap-x-2 mt-4 text-yellow-50"
                                    onClick={() => setAddSubSection(section?._id)}
                                >
                                    {/* <AiOutlinePlus /> */}
                                    <AiOutlineVideoCameraAdd />
                                    <p>Add Lecture</p>
                                </button>
                            </div>
                        </details>
                    ))}
                </div>

                {addSubSection ? (
                    <SubSectionModal
                        modalData={addSubSection} //add subsection contain section id
                        setModalData={setAddSubSection}
                        add={true}
                    />
                ) : viewSubSection ? (
                    <SubSectionModal
                        modalData={viewSubSection} //view subsection contain subsection data
                        setModalData={setViewSubSection}
                        view={true}
                    />
                ) : editSubSection ? (
                    <SubSectionModal
                        modalData={editSubSection} // editSsection contain subsection data+sectionId
                        setModalData={setEditSubSection}
                        edit={true}
                    />
                ) : (
                    <></>
                )}
                {confirmationModal ? (
                    <ConfirmationModal modalData={confirmationModal} />
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default NestedView;
