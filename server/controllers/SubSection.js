import Section from "../models/Section.js";
import SubSection from "../models/SubSection.js";
import { uploadToCloudinary } from "../utils/imageUploader.js";

// create subsection
export const createSubSection = async (req, res) => {
    try {
        // fetch data
        const { title, description, sectionId } = req.body;
        console.log("from create sub section")
        // extract video file
        const video = req.files.videoFile;
        // validation
        if (!title || !description || !sectionId || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required  ",
            });
        }
        // upload to cloudinary
        const uploadDetails = await uploadToCloudinary(
            video,
            process.env.FOLDER_NAME
        );
        console.log(uploadDetails);
        // save to SubSection collection
        const subSectionDetails = await SubSection.create({
            title,
            timeDuration: `${uploadDetails.duration}`,
            description,
            videoUrl: uploadDetails.secure_url,
        });
        // update  to section Collection
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    subSection: subSectionDetails._id,
                },
            },
            { new: true }
        ).populate("subSection").exec();
        res.status(200).json({
            success: true,
            message: "sub section created  successfully",
            updatedSection,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "internal server error ",
            error: error.message,
        });
    }
};
// update subsection
export const updateSubSection = async (req, res) => {
    try {
        // get data from body
        const { sectionId, title, description } = req.body
        // get section detail from db
        const subSection = await SubSection.findById(sectionId)

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }

        if (title !== undefined) {
            subSection.title = title
        }

        if (description !== undefined) {
            subSection.description = description
        }
        if (req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile
            const uploadDetails = await uploadToCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save()

        const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.json({
            success: true,
            message: "sub Section updated successfully",
            data: updatedSection
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section",
        })
    }
};
// delete subssection
export const deleteSubSection = async (req, res) => {
    try {
        // fetch sub section id from body
        const { subSectionId, sectionId } = req.body;
        // validation
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "error occur while deleting sub section",
            });
        }
        // delete from sub section
        const deletedSubsection = await SubSection.findByIdAndDelete(subSectionId);
        // delete from section
        await Section.findByIdAndDelete(sectionId, {
            $pull: {
                subSection: subSectionId,
            },
        });
        // return response
        res.status(200).json({
            success: true,
            message: "sub section deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error ",
            error: error.message,
        });
    }
};
