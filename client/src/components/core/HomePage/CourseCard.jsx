import PropTypes from 'prop-types';
import { FaUserGroup } from "react-icons/fa6";
const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
    const isMatch = cardData.heading === currentCard
    const cardClass = isMatch ? "bg-white shadow-[11px_11px_0px_2px_rgba(255,255,0,1)]" : "bg-richblack-800"
    const headingClass = isMatch ? "text-black" : "text-white"
    const textClass = isMatch ? "text-blue-300" : "text-richblack-400"
    return (
            <div className={`${cardClass}  flex flex-col  gap-y-5 lg:h-[300px] py-5 lg:w-[30%] w-[50%]   cursor-pointer mb-8 lg:mb-0`}
                onClick={() => setCurrentCard(cardData.heading)}
            >
                <h2 className={`${headingClass} font-semibold text-[20px] px-6`}>{cardData.heading}</h2>
                <p className="text-richblack-400 px-6">{cardData.description}</p>
                <div className="flex-grow  border-b-[2px] border-richblack-400 border-dashed font-semibold"></div>

                <div className={`${textClass} flex flex-row justify-between px-6 `}>
                    <div className="flex flex-row gap-1 items-center">
                        <FaUserGroup />
                        {cardData.level}
                    </div>
                    <div className="self-end">
                        {cardData.lessionNumber} Lessons
                    </div>
                </div>
            </div>

    )
}
CourseCard.propTypes = {
    cardData: PropTypes.shape({
        heading: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        level: PropTypes.string.isRequired,
        lessionNumber: PropTypes.number.isRequired,
    }).isRequired,
    currentCard: PropTypes.string.isRequired,
    setCurrentCard: PropTypes.func.isRequired,
};
export default CourseCard
