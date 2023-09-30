import aboutus1 from "../assets/Images/aboutus1.webp"
import aboutus2 from "../assets/Images/aboutus2.webp"
import aboutus3 from "../assets/Images/aboutus3.webp"
import Quotes from "../components/core/AboutPage.jsx/Quotes"
import HighLightText from "../components/core/HomePage/HighLightText"

const About = () => {
    return (
        <div >
            <section className="bg-richblack-700">
                <div className=" relative flex flex-col w-11/12 max-w-maxContent mx-auto text-white justify-between text-center gap-10">
                    <div className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]" >
                        Driving Innovation in Online Education for a
                        <HighLightText text={"Brighter Future"} />
                        <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
                            Studynotion is at the forefront of driving innovation in online
                            education. We're passionate about creating a brighter future by
                            offering cutting-edge courses, leveraging emerging technologies,
                            and nurturing a vibrant learning community.
                        </p>
                    </div>
                    <div className="lg:h-[150px]"></div>
                    <div className=" grid grid-cols-3 lg:gap-5 absolute bottom-0  w-[100%] translate-y-[30%]">
                        <img src={aboutus1} alt="" />
                        <img src={aboutus2} alt="" />
                        <img src={aboutus3} alt="" />
                    </div>
                </div>
            </section>
            {/* quote */}
            <div className=" border-b border-richblack-700">
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col  justify-between gap-10 text-richblack-500">
                    <div className="h-[100px]"></div>
                    <Quotes />
                </div>
            </div>
        </div>



    )
}

export default About