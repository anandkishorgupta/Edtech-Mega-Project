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
        <div className="text-white">
            <div>
                <p>{`Home / Catalog / `}
                    <span>
                        {catalogPageData?.data?.selectedCategory?.name}
                    </span>
                </p>
                <p>
                    {catalogPageData?.data?.selectedCategory?.name}

                </p>
                <p>
                    {catalogPageData?.data?.selectedCategory?.description}

                </p>
            </div>
            <div>
                {/* section 1 */}
                <div>
                    <div>Courses to get you started</div>
                    <div className=" gap-x-3 my-4 flex border-b border-b-richblack-600 text-sm">
                        <p onClick={() => setClickedTab("Most popular")}
                            className={`${clickedTab === "Most popular" ? "text-yellow-200 border-b-2 border-yellow-200" : " "}`}
                        >Most popular</p>
                        <p onClick={() => setClickedTab("New")}
                            className={`${clickedTab === "New" ? "text-yellow-200  border-b-2 border-yellow-200" : " "}`}
                        >new</p>
                    </div>
                    <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses} />
                </div>
                {/* section 2 */}
                <div>
                    <p>Top courses in {catalogPageData?.data?.selectedCategory?.name}</p>
                    <div>
                        <CourseSlider courses={catalogPageData?.data?.differentCategory?.courses} />
                    </div>
                </div>
                {/* section 3 */}
                <div>
                    <p>Frequently bought </p>
                    <div className="py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {
                                catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => (
                                    <Course_Card course={course} key={index} Height={"h-[400px]"} />
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