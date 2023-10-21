import { AiFillStar } from "react-icons/ai";
const RatingAndReviewDisplay = ({ ratingData }) => {
    return (
        <div >
            {ratingData?.length > 0 ? (
                <div>
                    {
                        ratingData.map((item) => (
                            <div key={item._id} className=" py-3 px-4 border-b border-richblack-600">
                                <div className="flex items-center gap-x-2">
                                    <p className="flex items-center bg-yellow-100 text-richblack-600 py-0 px-1 rounded-sm text-[14px]">
                                        {item.rating}
                                        <AiFillStar />
                                    </p>
                                    <p>
                                        {
                                            item.user.firstName
                                        }
                                    </p>
                                </div>

                                <div className="text-richblack-400">
                                    {
                                        item.review
                                    }
                                </div>

                            </div>
                        ))
                    }
                </div>
            ) : (
                <div>
                    not rated yet
                </div>
            )}
        </div>
    );
}

export default RatingAndReviewDisplay;
