import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import Upload from "../Upload"

const SubSectionModal = ({ modalData, setModalData, add = false, view = false, edit = false }) => {
    // at intial addSubsection modalData-> section id

    // at intial viewSubSection modalData->subSection Data
    // at intial editSubSection modalData->subsection data {title,timeDuration,description,videoUrl}+sectionId 

    // in db subSection contain title,description,videoUrl
    console.log("modalData", modalData)
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)

    useEffect(() => {
        console.log("view", view)
        console.log("edit", edit)
        if (view || edit) {
            setValue("lectureTitle", modalData.title)
            setValue("lectureDesc", modalData.description)
            setValue("lectureVideo", modalData.videoUrl)
            console.log('from useeffect')

        }
    }, [])

    // check the form is updated/edited
    const isFormUpdated = () => {
        const currentValues = getValues()
        if (currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ) {
            return true
        }
        else {
            return false
        }
    }
    const handleEditSubSection = async () => {
        const currentValues = getValues()
        const fromData = new FormData()
        fromData.append("sectionId", modalData.sectionId)
        fromData.append("subSectionId", modalData._id)
        if (currentValues.lectureTitle !== modalData.title) {
            fromData.append("title", currentValues.lectureTitle)
        }
        if (currentValues.lectureDesc !== modalData.description) {
            fromData.append("description", currentValues.lectureDesc)
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
            fromData.append("videoFile", currentValues.lectureVideo)
        }
        setLoading(true)
        // API call
        const result = await updateSubSection(fromData, token)

        if (result) {
            let updatedCourseContent = course.courseContent.map((section) => (
                section._id === modalData.sectionId ? result : section
            ))
            dispatch(setCourse({ ...course, courseContent: updatedCourseContent }))
        }
        setModalData(null)
        setLoading(false)
    }
    console.log(course)
    // submit handler
    const onsubmit = async (data) => {
        if (view)
            return;
        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made to the form")
            }
            else {
                await handleEditSubSection()
            }
            return
        }

        // if creating new  subsection
        const fromData = new FormData()
        fromData.append("sectionId", modalData) //modaldata=sectionId
        fromData.append("title", data.lectureTitle)
        fromData.append("description", data.lectureDesc)
        fromData.append("videoFile", data.lectureVideo) //this video is converted to videoUrl in the backend using cloudinary
        setLoading(true)

        // API  call to create subsection
        const result = await createSubSection(fromData, token)
        // here result contains the data of courseContent, on console-:section data {_id: '652277e5237bd1db1e786dd0', sectionName: 'vvrfvr', subSection: Array(1), __v: 0}
        console.log(result)
        if (result) {
            let updatedCourseContent = course.courseContent.map((section) => {
                return section._id === modalData ? result : section
            })
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)
    }

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className=" my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
                <div className="flex justify-between items-center h-[65px] bg-richblack-700 px-5">
                    {/* {
                    edit ? <div>Editing Lecture</div>
                        : add ? <div>Adding Lecture</div>
                            : view ? <div>Viewing Lecture</div>
                                : ""
                } */}
                    <p className="text-xl font-semibold text-richblack-5">{view && "Viewing"}{edit && "Editing"}{add && "Adding"} Lecture</p>
                    <button type="button" onClick={() => (!loading ? setModalData(null) : {})}>
                        <RxCross2 className="text-2xl cursor-pointer" />
                    </button>
                </div>
                <div className="h-[40px]"></div>
                <form onSubmit={handleSubmit(onsubmit)} className="px-8 flex flex-col gap-y-8" >
                    <Upload
                        name={"lectureVideo"}
                        label={"LectureVideo"}
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />
                    {/* // at intial viewSubSection modalData->subSection Data
                    // at intial editSubSection modalData->subsection data+sectionId  */}
                    <div >
                        <label htmlFor="lectureTitle" className="mb-2 block text-richblack-5 text-sm">
                            Lecture Title
                            {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <input type="text"
                            disabled={view || loading}
                            id="lectureTitle"
                            placeholder="Enter lecture title"
                            className="w-full form-style "
                            {...register("lectureTitle", { required: true })}
                        />
                        {errors.lectureTitle && <span>
                            Lecture Title is required</span>}
                    </div>
                    {/* lecture description */}
                    <div>
                        <label htmlFor="lectureDesc" className="mb-2 block text-richblack-5 text-sm">
                            Lecture Description<sup className="text-pink-200">*</sup>
                        </label>
                        <textarea type="text"
                            id="lectureDesc"
                            name="lectureDesc"
                            placeholder="Enter lecture Description"
                            className="w-full min-h-[130px] form-style "
                            {...register("lectureDesc", { required: true })}

                        />
                        {errors.lectureDesc && <span>
                            Lecture Description is required</span>}
                    </div>
                    {
                        !view && (
                            <button className="bg-yellow-50 text-richblack-900 px-5 py-2 w-fit self-end rounded-md"

                            >
                                {edit && "Save Changes"}{add && "Save"}
                            </button>
                        )
                    }
                </form>
                <div className="h-[40px]"></div>
            </div>
        </div>

    )
}

export default SubSectionModal