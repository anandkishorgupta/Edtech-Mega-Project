import Course from "../models/Course.js";
import Section from "../models/Section.js";
import SubSection from "../models/SubSection.js";
// create section
export const createSection = async (req, res) => {
    try {
        // data fetch
        const { sectionName, courseId } = req.body
        // data validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties "
            })
        }
        // create section
        const newSection = await Section.create({ sectionName })
        // update course with section objectId
        const updateCourseDetails = await Course.findByIdAndUpdate(courseId, {
            $push: {
                courseContent: newSection._id
            }
        }, { new: true }).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        }).exec();

        // populate section  and subsection
        // return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updateCourseDetails

        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create Section , please try again",
            error: error.message
        })
    }
}
// update section
export const updateSection = async (req, res) => {
    try {
        // data input 
        const { sectionName, sectionId, courseId } = req.body
        console.log("from update section controller", req.body)
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "course not exist"
            })
        }
        // data validation
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties "
            })
        }
        // update data 
        const section = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true })
        // get the course data
        const courseDetails = await Course.findById(courseId)
            .populate({ //i can also populate all the necessary fields of course
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();




        // return res
        return res.status(200).json({
            success: true,
            message: "Section updated  successfully",
            data: courseDetails

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update  Section , please try again",
            error: error.message
        })
    }
}

//delete section
export const deleteSection = async (req, res) => {
    try {
        // taking courseId from body
        const { courseId, sectionId } = req.body
        // validation
        if (!sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties "
            })
        }
        // check the section is present
        const section = await Section.findById(sectionId)

        if (!section) {
            return res.status(400).json({
                success: false,
                message: "Section not found"
            })
        }
        // delete the subsection that are linked to this one section
        await SubSection.deleteMany({ _id: { $in: section.subSection } })

        // find by id and delete 
        await Section.findByIdAndDelete(sectionId);

        // delete this entry from course schema 
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId
            }
        })

        // find the course to send it as response 
        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            }).exec()
        console.log("from deleted section", updatedCourse)

        // return response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            data: updatedCourse

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete  Section , please try again",
            error: error.message
        })
    }

}

