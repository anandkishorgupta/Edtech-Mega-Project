import CourseProgress from "../models/CourseProgress.js"
import SubSection from "../models/SubSection.js"

export const updateCourseProgress = async (req, res) => {
    const { courseId, subSectionId } = req.body
    const userId = req.user.id
    try {
        // check if the subsection is valid 
        const subSection = await SubSection.findById(subSectionId)
        if (!subSection) {
            return res.status(404).json({
                error: "Invalid subsection"
            })
        }
        // find the course progress document for the user and course
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userID: userId   
        }).exec()
        if (!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "Course progress doesnot exist"
            })
        }
        if (courseProgress.completedVideo.includes(subSectionId)) {
            return res.status(400).json({
                error: "Sub section already completed "
            })
        }
        // push the subsection id in the completed video array
        courseProgress.completedVideo.push(subSectionId)
        await courseProgress.save()
        return res.status(200).json({ 
            success:true,
            message: "Course progress updated " })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error"
        })

    }
}