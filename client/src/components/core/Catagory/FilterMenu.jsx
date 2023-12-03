import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from "react";
import { BiUpArrowAlt } from "react-icons/bi";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
const stars = [
    {
        icons: [
            <BsStarFill size={12} />,
            <BsStarFill size={12} />,
            <BsStarFill size={12} />,
            <BsStarFill size={12} />,
            <BsStarHalf size={12} />
        ],
        text: "4.5 & up"
    },
    {
        icons: [
            <BsStarFill size={12} />,
            <BsStarFill size={12} />,
            <BsStarFill size={12} />,
            <BsStarFill size={12} />,
            <BsStar size={12} />
        ],
        text: "4 & up"
    },
    {
        icons: [
            <BsStarFill size={12} />,
            <BsStarFill size={12} />,
            <BsStarFill size={12} />,
            <BsStarHalf size={12} />,
            <BsStar size={12} />
        ],
        text: "3.5 & up"
    },
    {
        icons: [
            <BsStarFill size={12} />,
            <BsStarFill size={12} />,
            <BsStarFill size={12} />,
            <BsStar size={12} />,
            <BsStar size={12} />
        ],
        text: "3.0 & up"
    }
];

const FilterMenu = () => {
    const [ratingOpen, setRatingOpen] = useState(true);
    return (
        <div className="w-[250px] border border-richblack-600 py-3 text-white">
            {/* Ratings */}
            <div>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => setRatingOpen(!ratingOpen)}>
                    Ratings
                    <BiUpArrowAlt className={`${ratingOpen ? "rotate-180" : ""} duration-200 transition-all ease-linear`} size={20} />
                </div>
                {ratingOpen && (
                    <div className="text-white flex flex-col gap-y-2 mt-1">
                        {stars.map((item, index) => (
                            <div key={index} className="text-white cursor-pointer flex items-center gap-x-2 "  >
                                <input type="radio" name="star" id={index} className="block" />
                                <label className="flex items-center gap-x-2 cursor-pointer" htmlFor={index}>
                                    {item.icons.map((Icon) => (
                                        <span key={Icon.key} className="text-[#B4690E]">{Icon}</span>
                                    ))}
                                    <span>{item.text}</span>
                                    <span>(num )</span>
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* video length */}
            <div className="flex flex-col text-white">
                price
                <Slider range allowCross={false}
                    min={0}
                    max={10000}
                    step={100}
                    defaultValue={[0, 10000]}
                    trackStyle={{ backgroundColor: "#B4690E" }}
                />
                <div>
                    min
                </div>
            </div>
        </div>
    );
};

export default FilterMenu;
