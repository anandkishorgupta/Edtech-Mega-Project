import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Banner from "../assets/Images/banner.mp4";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlock from "../components/core/HomePage/CodeBlocks";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/core/HomePage/Footer";
import HighLightText from "../components/core/HomePage/HighLightText";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import LearingLanguageSection from "../components/core/HomePage/LearingLanguageSection";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center  justify-between  max-w-maxContent">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
            <div className="group-hover:bg-richblack-900 flex justify-center items-center gap-2 rounded-full px-10 py-[5px]">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-center text-4xl font-semibold mt-8">
          Empower Your Future with
          <HighLightText text={"Coding Skills"} />
        </div>
        <div className="w-[90%] text-center mt-4 text-lg   text-richblack-300">
          with our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>
        <div
          className="mx-3 my-12 shadow-[10px_-5px_50px_-5px]  shadow-blue-200"

        >
          <video muted loop autoPlay className="shadow-[20px_20px_0px_0px_rgb(255,255,255)]">
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
        {/* code section 1 */}
        <div>
          <CodeBlock
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighLightText text={"coding potential"} /> {" "}
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you "
            }
            ctabtn1={{
              btnText: "try it yourself ",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more  ",
              linkto: "/login",
              active: false,
            }}

            codeblock={
              `<!DOCTYPE html>
              <html>
                <head>
                  <title>Example</title>
                  <link rel="stylesheet" href="style.css">
                </head>
                <body>
                  <h1>
                    <a href="/">Header</a>
                  </h1>
                </body>
              </html>`
            }
            codeColor={"text-yellow-25"}
          />
        </div>
        {/* code section 2 */}

        <div>
          <CodeBlock
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <HighLightText text={"coding"} /> {" "}
                <br />
                <HighLightText text={"in Seconds"} /> {" "}
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson. "
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more  ",
              linkto: "/login",
              active: false,
            }}

            codeblock={
              `<!DOCTYPE html>
              <html>
                <head>
                  <title>Example</title>
                  <link rel="stylesheet" href="style.css">
                </head>
                <body>
                  <h1>
                    <a href="/">Header</a>
                  </h1>
                </body>
              </html>`
            }
            codeColor={"text-white"}
          />
        </div>
        <ExploreMore/>
      </div>

      {/* section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex  flex-col gap-5   mx-auto items-center justify-between">
            <div className="h-[150px]"></div>
            {/* button */}
            <div className="flex gap-7 text-white ">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"} >
                Learn More

              </CTAButton>
            </div>
          </div>
        </div>
        <div className="w-11/12 max-w-maxContent mx-auto flex gap-7 flex-col items-center justify-between">
          <div className="flex flex-row gap-5 mt-[90px] mb-10 justify-between">
            <div className="w-[45%] text-4xl font-semibold">
              Get the skills you need for a <HighLightText text={"job that is in demand"} />
            </div>
            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <CTAButton active={true}>
                <div>
                  Learn More
                </div>
              </CTAButton>
            </div>
          </div>
          <TimeLineSection />
          <LearingLanguageSection />
        </div>


      </div>
      {/* section 3 */}
      <div className="w-11/12 max-w-maxContent mx-auto flex-col items-center justify-between gap-8 first-letter:bg-richblack-900 text-white">
        <InstructorSection />
        <h2 className="text-center text-4xl font-semibold mt-10">Review from other learners </h2>
      </div>
      {/* Footer */}
      <div className="bg-richblack-800">
        <div className="w-11/12 max-w-maxContent mx-auto flex-col items-center justify-between gap-8">
          <div className="h-16"></div>
          <Footer />
          <div className="h-16"></div>
        </div>
      </div>

    </div>
  );
};

export default Home