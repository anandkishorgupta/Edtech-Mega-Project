import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { setCourse } from "../../../../../slices/courseSlice"

const SubSectionModal = ({ modalData, setModalData, add = false, view = false, edit = false }) => {
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
        if (view || edit) {
            setValue("lectureTitle", modalData.title)
            setValue("lectureDesc", modalData.description)
            setValue("lectureVideo", modalData.videoUrl)
        }
    }, [])

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
    const onsubmit = (data) => {
        if (view)
            return;
        if (edit) {
            if (!isFormUpdated) {
                toast.error("No changes made to the form")
            }
            else {
                handleEditSubSection()
            }
            return
        }
        const fromData=new FormData()
        fromData.append("sectionId",modalData)
        fromData.append("title",modalData.lectureTitle)
        fromData.append("description",modalData.lectureDesc)
        fromData.append("video",modalData.lectureVideo)
        setLoading(true)

        // api call
        const result=await CreateSubSection(fromData,token)
        if(result){
            dispatch(setCourse(result))
        }
        setModalData(null)
        setLoading(false)
    }




    return (
        <div>

        </div>
    )
}

export default SubSectionModal