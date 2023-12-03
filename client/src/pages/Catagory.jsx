import { BiChevronDown } from "react-icons/bi"
import { CiFilter } from "react-icons/ci"
import FilterMenu from "../components/core/Catagory/FilterMenu"
const Catagory = () => {
    return (
        <div className="w-11/12 max-w-maxContent mx-auto mt-5 flex flex-col gap-y-8">
            <div className="flex justify-between">
                {/* left side */}
                <div className=" flex items-center gap-x-5" >
                    <div className="flex items-center  border border-richblack-600 px-4 py-3 rounded-md gap-x-1">
                        <CiFilter size={24} />
                        {" "}
                        Filter
                    </div>
                    <div className="flex items-center  border border-richblack-600 px-4 py-3 rounded-md gap-x-1">
                        Sort by
                        <BiChevronDown />
                    </div>
                </div>
                {/* right side */}
                <div>
                    1000 results
                </div>
            </div>
            <div className="flex justify-between">
                <div>
                    <FilterMenu />
                </div>
                <div>
                    courses
                </div>
            </div>
        </div>
    )
}

export default Catagory