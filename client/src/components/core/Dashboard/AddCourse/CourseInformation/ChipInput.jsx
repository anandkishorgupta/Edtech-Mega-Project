import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useSelector } from "react-redux/es/hooks/useSelector"
const ChipInput = ({ label, name, placeholder, register, errors, setValue, getValues }) => {
    // chips holda all tags 
    const [chips, setChips] = useState([])
    const { course, editCourse } = useSelector((state) => state.course);

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault()
            const chipValue = event.target.value.trim()
            if (chipValue && !chips.includes(chipValue)) {

                // const newChips = [...chips, chipValue]
                // setChips(newChips)
                setChips((prev) => [...prev, chipValue])
                event.target.value = ""
            }

            if (chipValue && chips.includes(chipValue)) {
                toast.error(`${chipValue} already added`)
            }
        }

    }
    console.log("printing chips ", chips)

    function handleDeleteChip(chip) {
        const newChips = chips.filter((item) => item != chip)
        setChips(newChips)

    }
    useEffect(() => {
        register(name, { required: true, validate: (value) => value.length > 0 }) // found useful while fdisplaying errors[name]
        console.log("hello")
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (editCourse) {
            setChips(course?.tag) // chips is the tags to display
        }
    }, [])

    // chips data and input field data are in same state and while updating chips  also
    useEffect(() => {
        setValue(name, chips) //sync the input field while update(pres enter)
    }, [chips])
    return (
        <div className="flex flex-col gap-y-1">
            <label htmlFor={name} className="text-sm text-richblack-5">{label} <sup className="text-pink-200" > *</sup></label>
            <div>
                <div className="flex flex-row gap-x-2 items-center flex-wrap">
                    {
                        chips?.map((chip, index) => (
                            <div key={index}
                                className=" rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5 flex gap-x-2 items-center mb-2"
                            >
                                {chip}
                                <RxCross2
                                    className="cursor-pointer"
                                    onClick={() => handleDeleteChip(chip)} //i can do the same  using index also
                                />
                            </div>
                        ))
                    }
                </div>


                <input
                    type="text"
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    className="form-style w-full"
                />
            </div>
            {
                errors[name] && (
                    <span className="addCourseError">
                        {label} is required
                    </span>
                )
            }

        </div>
    )
}

export default ChipInput