import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
const PublishCourse = () => {
  const { register, handleSubmit, setValue, getValues } = useForm()
  const { course, editCourse } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  function goBack() {
    dispatch(setStep(2))
  }
  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }
  async function handleCoursePublish() {
    if (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true
      || (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // no updation in form
      // no need to make api call
      goToCourses()
      return
    }
    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    setLoading(true)
    const result = await editCourseDetails(formData, token)
    if (result) {
      goToCourses()
    }
    setLoading(false)
  }

  function onsubmit() {
    handleCoursePublish();
  }
  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])
  return (
    <div className="rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700">
      <p>Publish Course</p>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div >
          <label htmlFor="public" className="flex items-center gap-x-2">
            <input type="checkbox" id="public"
              {...register("public")}
              className="rounded h-4 w-4  "
            />
            <span>Make this course as public</span>
          </label>
        </div>
        <div>
          <div className="flex gap-x-3 justify-end">
            <button
              disabled={loading}
              type="button"
              onClick={goBack}
              className="bg-richblack-300 rounded-md text-base  px-5  py-2 text-richblack-900 "
            >Back</button>
            <IconBtn text={`${editCourse ? "save changes" : "save"}`}>
            </IconBtn>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PublishCourse