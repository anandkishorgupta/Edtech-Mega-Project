import Category from "../models/Category.js";
// craete a tag
export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        // create entry in db
        const category = await Category.create({ name, description })
        console.log(category)
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
export const showAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find({}, { name: true, description: true })
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