import FoundingStory from "../assets/Images/FoundingStory.png"
import aboutus1 from "../assets/Images/aboutus1.webp"
import aboutus2 from "../assets/Images/aboutus2.webp"
import aboutus3 from "../assets/Images/aboutus3.webp"
import Footer from "../components/common/Footer"
import ContactFormSection from "../components/core/AboutPage.jsx/ContactFormSection"
import LearningGrid from "../components/core/AboutPage.jsx/LearningGrid"
import Quotes from "../components/core/AboutPage.jsx/Quotes"
import StatsComponents from "../components/core/AboutPage.jsx/Stats"
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

            {/* founding story section */}
            <div className="h-[100px]"></div>
            <section className="flex flex-row justify-between w-11/12 max-w-maxContent mx-auto">
                <div className="flex flex-col w-[44%] gap-10 ">
                    <p className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                        Our Founding Story

                    </p>
                    <p className="text-base font-medium text-richblack-300">
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p className="text-base font-medium text-richblack-300">
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                    </p>
                </div>
                <div>
                    <img src={FoundingStory} alt="" className="shadow-[0px_0px_38px_-1px_rgba(252,0,0,0.75)]" />
                </div>
            </section>
            {/* vision mission section  */}
            <div className="h-[250px]"></div>
            <section className="flex flex-row justify-between w-11/12 max-w-maxContent mx-auto ">
                <div className="flex flex-col gap-y-8 w-[35%]">
                    <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">Our Vision</h1>
                    <p className="text-base text-richblack-300 font-medium">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>

                </div>
                <div className="flex flex-col gap-y-8 w-[35%]">
                    <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">Our Mission</h1>
                    <p className="text-base font-medium text-richblack-300">Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>
            </section>
            <div className="h-[150px]"></div>
            <div className="bg-richblack-700 py-10">
                <StatsComponents />
            </div>
            {/* learning grid */}
            <div className="h-[75px]"></div>
            <section className="w-11/12 mx-auto max-w-maxContent ">
                <LearningGrid />
                <div className="h-[75px]"></div>
                <ContactFormSection />
                <div className="mt-24 mb-24">
                    <h1 className="text-4xl font-bold text-center">Reviews From Other Learners </h1>
                </div>
                {/* reviews  */}

            </section>
            <Footer />

        </div>
    )
}

export default About