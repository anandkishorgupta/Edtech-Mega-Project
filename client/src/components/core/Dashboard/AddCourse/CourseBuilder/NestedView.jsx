import { useState } from "react"
import { MdArrowDropDown, MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
const NestedView = ({ handleChangeEditSectionName }) => {
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [addSubSection, setAddSubSection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)

    const [confirmationModal, setConfirmationModal] = useState(null)

    function handleDeleteSection(sectionId){

    }
    return (
        <div className="rounded-lg bg-richblack-700 p-6 px-8">
            <div>
                {
                    course?.courseContent?.map((section) => (
                        <details key={section._id} open>
                            <summary className="flex items-center justify-between gap-x-3 border-b-2">
                                <div className="flex gap-x-3 items-center">
                                    <RxDropdownMenu />
                                    <p>{section.sectionName}</p>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <button onClick={handleChangeEditSectionName(section._id, section.sectionName)}>
                                        <MdEdit />
                                    </button>
                                    <button onClick={() => {
                                        setConfirmationModal({
                                            text1: "Delete this Section",
                                            text2: "All the lectures in this section will be deleted ",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null)

                                        })
                                    }}>
                                        <RiDeleteBin6Line />
                                    </button>
                                    <span>|</span>
                                    <MdArrowDropDown className={`text-3xl text-richblack-300`}/>
                                </div>
                            </summary>
                        </details>
                    ))
                }
            </div>
        </div>
    )
}

export default NestedView