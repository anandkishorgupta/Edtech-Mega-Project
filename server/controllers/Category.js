import mongoose from "mongoose";
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

        const allCategory = await Category.find() // document contain only name and description
        return res.status(200).json({
            success: true,
            message: 'All categories returned successfully',
            allCategory
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
    const { categoryId } = req.body
    try {

        // get from db
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: "ratingAndReviews"
            }).exec()  //return the document having course status "published"

        // console.log("selected category data ....", selectedCategory)
        // validation
        if (!selectedCategory) {
            return res.status(400).json({
                success: false,
                message: "Category not found "
            })
        }
        // handle the case where there is no category
        if (selectedCategory.courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category"
            })
        }


        // get courses for other categories 
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: new mongoose.Types.ObjectId(categoryId) }
        })
        // console.log("categoriesExceptSelected....", categoriesExceptSelected)

        let differentCategory;
        if (categoriesExceptSelected.length > 0) {
            differentCategory = await Category.findOne(
                {
                    _id: categoriesExceptSelected[Math.floor(Math.random() * (categoriesExceptSelected.length))]
                        ._id
                }

            ).populate({
                path: "courses",
                match: { status: "Published" },
                populate: "ratingAndReviews"
            }).exec()
        }


        // top selling courses
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                    select: '-password' //password is ignored 
                }
            }).exec()
        // console.log("allCategories...............", allCategories)
        // const allCourses = [].concat(...allCategories.map(category => category.courses))
        const allCourses = allCategories.flatMap((category) => category.courses)
        // console.log("all courses ............", allCourses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)
        console.log("mostSellingCourses.....", mostSellingCourses)
        // return response 
        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses
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