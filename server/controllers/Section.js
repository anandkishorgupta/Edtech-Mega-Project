import Course from "../models/Course.js";
import Section from "../models/Section.js";
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
        }, { new: true }).populate("Section").populate("SubSection").exec();
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
        const { sectionName, sectionId } = req.body
        // data validation
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties "
            })
        }
        // update data 
        const section = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true })
        // return res
        return res.status(200).json({
            success: true,
            message: "Section updated  successfully",

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
        // fetch id -- assuming sectionId is sent in param
        const { sectionId } = req.param
        // taking courseId from body
        const { courseId } = req.body
        // validation
        if (!sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties "
            })
        }
        // find by id and delete 
        await Section.findByIdAndDelete(sectionId);

        // delete this entry from course schema 
        await Course.findByIdAndDelete(courseId, {
            $pull: {
                courseContent: sectionId
            }
        })

        // return response
        return res.status(200).json({
            success: true,
            message: "Section deleted   successfully",

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete  Section , please try again",
            error: error.message
        })
    }

}

