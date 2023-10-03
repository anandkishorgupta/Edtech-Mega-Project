import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI'
const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm()
    const dispatch = useDispatch()
    const { course, editCourse } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])
    // get all categories
    const getCategories = async () => {
        setLoading(true)
        try {
            const categories = await fetchCourseCategories();
            if (categories.length > 0) {
                setCourseCategories(categories)
            }
        } catch (error) {
            console.log("unable to fetch categories ")
        }

        setLoading(false)
    }
    // useeffect
    useEffect(() => {
        getCategories()
    }, [])

    async function onSubmitHandler(data) {

    }
    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}
            className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
        >
            <div>
                <label>
                    Course Title
                </label>
                <input id='courseTitle' placeholder='Enter Course Title'
                    {...register("courseTitle", { required: true })}
                />
                {
                    errors.courseTitle && (
                        <span>Course Title is Required**</span>
                    )
                }
            </div>
        </form>
    )
}

export default CourseInformationForm