import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiArrowRight } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import NestedView from "./NestedView";
const CourseBuilderForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [editSectionName, setEditSectionName] = useState(false)
    const { course } = useSelector((state) => state.course)
    console.log(course)
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const onsubmit = async (data) => {
        setLoading(true)
        let result;
        if (editSectionName) {
            result = await updateSection({
                sectionName: data.sectionName,
                sectionId: editSectionName,
                courseId: course._id,
            }, token)
        }
        else {

            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id,  // from slice 
            }, token)
        }
        if (result) {
            // const newdata = { ...course, result }
            dispatch(setCourse(result))
            console.log(course)
            setValue("sectionName", "")
            setEditSectionName(false)
        }
        setLoading(false)
    }
    console.log(course)




    const goBack = () => {
        dispatch(setStep(1))
        dispatch(setEditCourse(true))

    }
    const goToNext = () => {
        if (course.courseContent.length === 0) {
            toast.error("Please add at least on section")
            return;
        }
        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Please add at least on lecture in each section")
            return
        }
        dispatch(setStep(3))
    }

    function cancelEdit() {
        setEditSectionName(false)
        setValue("sectionName", "")
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit()
            return
        }
        setEditSectionName(sectionId)
        setValue("sectionName", sectionName)
    }

    return (
        <div className="rounded-md  bg-richblack-800  space-y-8  p-6 border border-richblack-700">
            <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onsubmit)}>
                <div>
                    <label htmlFor="sectionName" className="text-sm text-richblack-5"> Section name <sup className="text-pink-200">*</sup></label>
                    <input type="text" name="sectionName" id="sectionName"
                        {...register("sectionName", { required: true })}
                        className="w-full form-style"
                    />
                    {errors.sectionName && (
                        <span className="addCourseError" >Section name is required </span>
                    )}
                </div>
                <div className="flex gap-x-3 items-end">
                    <button type="submit" className="flex items-center gap-x-2 rounded-md border border-yellow-50 px-5 py-2 text-yellow-50 font-semibold">
                        {
                            editSectionName ? "Edit Section Name" : "Create Section"

                        }
                        <IoMdAddCircleOutline className="text-yellow-200 font-semibold text-xl" />
                    </button>
                    {
                        editSectionName && (
                            <button type="button" onClick={cancelEdit}
                                className="text-sm text-richblack-300 underline"
                            >
                                Cancel Edit
                            </button>
                        )
                    }
                </div>
            </form>


            {
                course?.courseContent?.length > 0 &&
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
            }



            <div className="flex justify-end gap-x-3">
                <button onClick={goBack} className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900">
                    Back
                </button>
                <IconBtn text={"Next"} onClick={goToNext} className={"font-semibold"}>
                    <FiArrowRight />
                </IconBtn>
            </div>
        </div>
    )
}
export default CourseBuilderForm