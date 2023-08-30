import { v2 as cloudinary } from "cloudinary"
export const uploadImageToCloudinary = async (file, folder, height, quality) => {
    const options = { folder: folder }
    if (height) {
        options.height
    }
    if (quality) {
        options.quality
    }
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file, tempFilePath, options)
}