import { useEffect, useState } from "react";

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

    function handleAddRequirements() {
        if (requirements) {
            setRequirementList((prev) => [...prev, requirements]);
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
        })
    }, []);
    useEffect(()=>{
        setValue(name,requirementList)
    },[requirementList])

    return (
        <div className="flex flex-col"> 
            <label htmlFor={label} className="text-sm text-richblack-5">
                {label} <sup className="text-pink-200">*</sup>
            </label>
            <input
                type="text"
                name={name}
                id={label}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value.trim())}
                className="form-style"
            />
            <button type="button" onClick={handleAddRequirements} className="cursor-pointer text-yellow-50 font-semibold text-start mt-2">
                {" "} 
                {/* if not use type="button" then the button works as submit */}
                Add
            </button>
            {requirementList.length > 0 &&
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

            {errors.name && (
                <span className="addCourseError">
                    {label} is required
                </span>
            )}
        </div>
    );
};

export default RequirementField;
