import Tag from "../models/Tags.js";
// craete a tag
export const createTag = async (req, res) => {
    try {
        const { name, description } = req.body
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        // create entry in db
        const tag = await Tag.create({ name, description })
        console.log(tag)
        return res.status(200).json({
            success: true,
            message: 'Tag created successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get all tags
export const showAlltags = async (req, res) => {
    try {
        const allTags = await Tag.find({}, { name: true, description: true })
        return res.status(200).json({
            success: true,
            message: 'All tags returned successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}