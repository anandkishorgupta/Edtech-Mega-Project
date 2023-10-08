import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import IconBtn from "../../../../common/IconBtn";
import Upload from "../Upload";
import ChipInput from "./ChipInput";
import RequirementField from "./RequirementField";
const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const { course, editCourse } = useSelector((state) => state.course);

  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const { token } = useSelector((state) => state.auth);
  // get all categories
  const getCategories = async () => {
    setLoading(true);
    try {
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
    } catch (error) {
      console.log("unable to fetch categories ");
    }

    setLoading(false);
  };
  // useeffect
  useEffect(() => {
    getCategories();
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag); // sync input field with data
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
  }, []);
  const isFormUpdated = () => {
    console.log(course);
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    } else {
      return false;
    }
  };

  async function onsubmit(data) {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        // console.log(data)
        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }
    // add new course
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImages", data.courseImage);
    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
      console.log(course);
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="rounded-md  bg-richblack-800  space-y-8  p-6 border border-richblack-700 "
    >
      <div className="flex flex-col gap-y-1 ">
        <label htmlFor="courseTitle" className="text-sm text-richblack-5">
          Course Title <sup className="text-pink-200"> *</sup>{" "}
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="addCourseError">Course Title is Required**</span>
        )}
      </div>

      <div>
        <label htmlFor="courseShortDesc" className="text-sm text-richblack-5">
          Course Short Description <sup className="text-pink-200"> *</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="min-h-[140px] w-full form-style"
        />
        {errors.courseShortDesc && (
          <span className="addCourseError">
            Course Description is Required**
          </span>
        )}
      </div>
      <div className="relative">
        <label htmlFor="coursePrice" className="text-sm text-richblack-5">
          Course Price <sup className="text-pink-200"> *</sup>
        </label>
        <input
          id="coursePrice"
          placeholder="Enter Course price"
          {...register("coursePrice", {
            required: true,
            valueAsNumber: true,
          })}
          className="form-style w-full px-10"
        />
        <HiOutlineCurrencyRupee className="absolute text-richblack-400 top-[50%]  text-2xl  ml-2" />
      </div>
      {errors.coursePrice && (
        <span className="addCourseError">Course Price is Required**</span>
      )}

      <div className="flex flex-col gap-y-1">
        <label htmlFor="courseCategory" className="text-sm text-richblack-5">
          {" "}
          course category <sup className="text-pink-200"> *</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue={""}
          {...register("courseCategory", { required: true })}
          className="form-style w-full"
        >
          <option value="" disabled>
            {" "}
            Choose a category
          </option>
          {!loading &&
            courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="addCourseError">Course Category is required </span>
        )}
      </div>
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* uploding thumbnail */}
      <Upload
        name="courseImage"
        label="Course_Thumbnail"
        register={register}
        errors={errors}
        setValue={setValue}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* benefits of course */}
      <div>
        <label htmlFor="courseBenefits" className="text-sm text-richblack-5">
          Benefit of course <sup className="text-pink-200"> *</sup>
        </label>
        <textarea
          name="courseBenefits"
          id="courseBenefits"
          placeholder="Enter benefits of course"
          {...register("courseBenefits", { required: true })}
          className="min-h-[130px] w-full form-style"
        ></textarea>
        {errors.courseBenefits && (
          <span className="addCourseError block ">
            Course benefits are required**
          </span>
        )}
      </div>
      {/* <RequirementField/> */}
      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            type="submit"
          >
            Continue without Saving
          </button>
        )}
        <IconBtn
          type={"submit"}
          text={!editCourse ? "Next" : "Save Changes"}
        ></IconBtn>
      </div>
    </form>
  );
};

export default CourseInformationForm;
