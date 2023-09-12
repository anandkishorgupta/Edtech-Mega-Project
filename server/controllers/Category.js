import Category from "../models/Category.js";
// create a category
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
            message: 'Category created successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({  
            success: false,
            message: error.message
        })
    }
}

// get all categories 
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

//get  category page detail
export const categoryPageDetails = async (req, res) => {
    try {

        //get category name 
        // const { name } = req.body;
        // get category id 
        const { categoryId } = req.body

        // get from db
        const categoryPageDetails = await Category.findById(categoryId).populate("courses").exec();
        // validation
        if (!categoryPageDetails) {
            return res.status(400).json({
                success: false,
                message: "Data  not found "
            })
        }
        // get courses for different categories 
        const differentCategories = await Category.find({
            _id: { $ne: categoryId }
        }).populate("courses").exec();

        // top 10 selling courses 






        // return response 
        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories
            }
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}