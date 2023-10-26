import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Footer from "../components/common/Footer"
import CourseSlider from "../components/core/Catalog/CourseSlider"
import Course_Card from "../components/core/Catalog/Course_Card"
import { fetchCourseCategories } from "../services/operations/courseDetailsAPI"
import { getCatalogaPageData } from "../services/operations/pageAndComponentData"
const Catalog = () => {
    const { catalogName } = useParams()

    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState("")
    const [clickedTab, setClickedTab] = useState("Most popular")

    // fetch all categories  and get the id of category
    const getCategoryId = async () => {
        const allCategory = await fetchCourseCategories()  //get all category
        const category_Id = allCategory?.filter((cat) => cat.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id //get id of category
        setCategoryId(category_Id)
    }
    useEffect(() => {
        if (catalogName) {
            getCategoryId()
        }
    }, [catalogName])

    // get category detail data  using category id 
    const getCategoryDetails = async () => {
        const res = await getCatalogaPageData(categoryId);
        console.log("PRinting res: ", res);
        setCatalogPageData(res);
    }
    useEffect(() => {
        if (categoryId) {
            getCategoryDetails();
        }
    }, [categoryId]);
    return (
        <div >
            <div className="bg-richblack-800">

                <div className="w-11/12 max-w-maxContent mx-auto min-h-[250px] flex flex-col justify-center">
                    <p className="text-sm text-richblack-300">{`Home / Catalog / `}
                        <span className="text-yellow-25 font-semibold">
                            {catalogPageData?.data?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className="text-3xl text-richblack-5">
                        {catalogPageData?.data?.selectedCategory?.name}

                    </p>
                    <p className="max-w-[870px] text-richblack-200">
                        {catalogPageData?.data?.selectedCategory?.description}

                    </p>
                </div>
            </div>

            <div className="text-white w-11/12 max-w-maxContent mx-auto flex flex-col gap-y-20" >
                {/* section 1 */}
                <div className="mt-16">
                    <div className="font-bold text-4xl mb-6">Courses to get you started</div>
                    <div className=" gap-x-3 my-4 flex border-b border-b-richblack-600 text-sm">
                        <p onClick={() => setClickedTab("Most popular")}
                            className={`${clickedTab === "Most popular" ? "border-b border-b-yellow-25 text-yellow-25 " : " "} cursor-pointer px-4 py-2`}
                        >Most popular</p>
                        <p onClick={() => setClickedTab("New")}
                            className={`${clickedTab === "New" ? " border-b border-b-yellow-25 text-yellow-25 " : " "} cursor-pointer px-4 py-2`}
                        >new</p>
                    </div>
                    {
                        clickedTab === "Most popular" &&
                        <CourseSlider courses={catalogPageData?.data?.popular} />
                    }
                    {
                        clickedTab === "New" &&
                        <CourseSlider courses={catalogPageData?.data?.latest} />
                    }
                </div>
                {/* section 2 */}
                <div>
                    <p className="font-bold text-4xl mb-10">Top courses in {catalogPageData?.data?.differentCategory?.name}</p>
                    <div  >
                        <CourseSlider courses={catalogPageData?.data?.differentCategory?.courses} />
                    </div>
                </div>
                {/* section 3 */}
                <div>
                    <p className="font-bold text-4xl mb-10">Frequently bought </p>
                    <div className="py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 gap-x-10">
                            {
                                catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => (
                                    <Course_Card course={course} key={index} Height={"h-[250px]"} />
                                ))
                            }
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Catalog