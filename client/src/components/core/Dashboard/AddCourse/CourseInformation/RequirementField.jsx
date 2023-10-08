import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RequirementField = ({
    name,
    label,
    register,
    errors,
    setValue,
    getValues,
}) => {
    const [requirements, setRequirements] = useState("");
    const [requirementList, setRequirementList] = useState([]);
    const { course, editCourse } = useSelector((state) => state.course)
    function handleAddRequirements() {
        if (requirements) {
            setRequirementList((prev) => [...prev, requirements.trim()]);
            setRequirements("");
        }
    }
    function handleClearRequirements(index) {
        // const newRequirements = requirementList.filter((element, Index) => Index != index)
        // setRequirementList(newRequirements)
        // using splice
        const newList = [...requirementList];
        newList.splice(index, 1);
        setRequirementList(newList);
    }

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        }) // found only useful for displaying validation error , if not used errors[name]..  dont works ,You can use these methods to control the input’s value, validate it, and display error messages

        if (editCourse) {
            setRequirementList(course?.instructions)
        }
    }, []);

    useEffect(() => {
        // valuabe in edit mode , means the input tag is in sync with requirement lists while editing
        setValue(name, requirementList)
    }, [requirementList])

    return (
        <div className="flex flex-col">
            <label htmlFor={label} className="text-sm text-richblack-5">
                {label} <sup className="text-pink-200">*</sup>
            </label>
            <input
                name={name}
                id={label}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="form-style"
            />

            <button type="button" onClick={handleAddRequirements} className="cursor-pointer text-yellow-50 font-semibold text-start mt-2">
                {" "}
                {/* if not use type="button" then the button works as submit */}
                Add
            </button>
            {requirementList?.length > 0 &&
                requirementList.map((item, index) => (
                    <div key={index} className="flex  ">
                        <p>{item}</p>
                        <button type="button"
                            className="cursor-pointer ml-2 text-xs text-pure-greys-300"
                            onClick={() => handleClearRequirements(index)}
                        >
                            clear
                        </button>
                    </div>
                ))}

            {errors[name] && (
                <span className="addCourseError">
                    {label} is required
                </span>
            )}
        </div>
    );
};

export default RequirementField;
