import Section from "../models/Section";
import SubSection from "../models/SubSection";
import { uploadToCloudinary } from "../utils/imageUploader";

// create subsection
export const createSubSection = async (req, res) => {
    try {
        // fetch data 
        const { title, timeDuration, description, sectionId } = req.body;
        // extract video file
        const video = req.files.videoFile
        // validation
        if (!title || !timeDuration || !description || !sectionId || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required  "
            })
        }
        // upload to cloudinary
        const uploadDetails = await uploadToCloudinary(video, process.env.FOLDER_NAME)
        // save to SubSection collection
        const subSectionDetails = await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl: uploadDetails.secure_url
        })
        // update  to section Collection 
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            $push: {
                subSection: subSectionDetails._id
            }
        }).populate("subSection");
        res.status(200).json({
            success: true,
            message: "sub section created  successfully",
            updatedSection
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error ",
            error: error.message
        })
    }
}
// update subsection 
export const updateSubSection = async (req, res) => {
    try {
        // get data from req body
        const { title, timeDuration, description, subSectionId } = req.body;
        // extract video
        const video = req.files.videoFile;
        // validation
        if (!title || !timeDuration || !description || !subSectionId || !video) {
            return req.status(400).json({
                success: false,
                message: "All fields are required "
            })
        }
        // upload video to cloudinary
        const videoDetails = await uploadToCloudinary(video, process.env.FOLDER_NAME)
        // update details in db
        const updatedSubSection = await SubSection.findByIdAndUpdate(subSectionId, {
            title,
            timeDuration,
            description,
            videoUrl: videoDetails.secure_url
        })

        // sending response 
        res.status(200).json({
            success: true,
            message: "Subsection details updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error ",
            error: error.message
        })
    }
}
// delete subssection 
export const deleteSubSection = async (req, res) => {
    try {
        // fetch sub section id from body
        const { subSectionId, sectionId } = req.body
        // validation
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "error occur while deleting sub section"

            })
        }
        // delete from sub section
        const deletedSubsection = await SubSection.findByIdAndDelete(subSectionId);
        // delete from section
        await Section.findByIdAndDelete(sectionId, {
            $pull: {
                subSection: subSectionId
            }
        });
        // return response
        res.status(200).json({
            success: true,
            message: "sub section deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error ",
            error: error.message
        })
    }
}