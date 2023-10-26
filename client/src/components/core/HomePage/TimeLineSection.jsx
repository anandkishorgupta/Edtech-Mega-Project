import timelineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo3,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo4,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
];
const TimeLineSection = () => {
  return (
    <div>
      <div className="flex lg:flex-row lg:gap-14 items-center flex-col">
        {/* left part */}
        <div className="w-[45%] flex flex-col gap-5">
          {timeline.map((element, index) => (
            <div key={index} className="flex gap-6 flex-row">
              <div className="w-[50px] h-[50px] bg-white flex items-center">
                <img src={element.Logo} alt="" />
              </div>
              <div>
                <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                <p className="text-base">{element.Description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* right part */}
        <div className="relative w-[80%] lg:w-auto mt-5 lg:mt-0">
          <img src={timelineImage} alt="timlelineImage " />

          <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 
          translate-x-[-50%] 
          translate-y-[-50%]
          left-[50%] 
          ">
            <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-6">
              <p className="text-xl font-bold">10</p>
              <p className="text-caribbeangreen-300 text-sm">
                Years of Experience
              </p>
            </div>
            <div className="flex gap-5 items-center px-7">
              <p className="text-xl font-bold">250</p>
              <p className="text-caribbeangreen-300 text-sm">Type of Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;
