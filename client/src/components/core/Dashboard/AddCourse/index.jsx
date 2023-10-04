import RenderSteps from "./RenderSteps"
const AddCourse = () => {
  return (
    <>
      <div className="flex flex-row  justify-between">
        <div className="">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">Add Course</h1>
          <div>
            <RenderSteps />
          </div>
        </div>
        <div className="rounded-md max-w-[400px] border-[1px] border-richblack-700 h-fit  bg-richblack-800 px-6 py-5 sticky top-10">
          <p className="text-lg text-richblack-5 mb-8"> ⚡  Code Upload Tips</p>
          <ul className="text-xs text-richblack-5  gap-y-4 list-disc ml-5 flex flex-col ">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
            <li>Information from the Additional Data section shows up on the course single page.</li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default AddCourse