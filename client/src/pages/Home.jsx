import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Banner from "../assets/Images/banner.mp4";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlock from "../components/core/HomePage/CodeBlocks";
import HighLightText from "../components/core/HomePage/HighLightText";
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
        <div className="w-[90%] text-center mt-4 text-lg  text-richblack-300">
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
          className="mx-3 my-12 shadow-blue-200 "
          style={{ boxShadow: "18px 18px 0px 0px rgb(255, 255, 255)" }}
        >
          <video muted loop autoPlay>
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
            codeColor={"text-yellow-25"}
          />
        </div>
      </div>
      {/* section 2 */}

      {/* section 3 */}

      {/* Footer */}
    </div>
  );
};

export default Home