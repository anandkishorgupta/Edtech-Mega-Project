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
        <div>
            <label htmlFor={label}>
                {label} <sup>*</sup>
            </label>
            <input
                type="text"
                name={name}
                id={label}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value.trim())}
            />
            <p onClick={handleAddRequirements} className="cursor-pointer">
                {" "}
                Add
            </p>
            {requirementList.length > 0 &&
                requirementList.map((item, index) => (
                    <div key={index} className="flex justify-between ">
                        <p>{item}</p>
                        <p
                            className="cursor-pointer text-xs text-pure-greys-900"
                            onClick={() => handleClearRequirements(index)}
                        >
                            clear
                        </p>
                    </div>
                ))}

            {errors.name && (
                <span>
                    {label} is required
                </span>
            )}
        </div>
    );
};

export default RequirementField;
