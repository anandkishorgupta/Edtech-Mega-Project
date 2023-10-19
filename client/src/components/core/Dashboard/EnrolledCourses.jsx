import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { geUserEnrolledCourses } from "../../../services/operations/profileAPI";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  console.log(token);
  const navigate = useNavigate()
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const getEnrolledCourses = async () => {
    try {
      const response = await geUserEnrolledCourses(token); // i am returning course data
      console.log("enrolled courses..............", response);
      setEnrolledCourses(response);
    } catch (error) {
      console.log("Unable to fetch  Enrolled Courses ");
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, []);
  return (
    <div>
      <div className="text-3xl font-semibold mb-6">Enrolled Courses </div>
      {!enrolledCourses ? (
        <div>Loading....</div>
      ) : !enrolledCourses.length ? (
        <p>not enrolled yet</p>
      ) : (
        <div className="flex flex-col ">
          <div className="grid grid-cols-4  bg-richblack-600 rounded-t-md py-3 px-3">
            {/* <p>{enrolledCourses.courseName}</p> */}
            <p className="col-span-2">Course Name</p>
            <p>Duration</p>
            <p>Progress</p>
          </div>
          {/* cards  */}
          <div className="border-l border-r border-richblack-600">
            {enrolledCourses.map((course, index) => (
              <div key={index} className="cursor-pointer grid grid-cols-4 py-2 border-b border-b-richblack-600 px-2"
                onClick={() => navigate(`/view-course/${course?._id}/section/${course?.courseContent[0]._id}/sub-section/${course?.courseContent[0].subSection[0]._id}`)}
              >
                <div className="flex gap-x-3 col-span-2 lg:max-w-[300px] items-center">
                  <img src={course.thumbnail} alt="" className="max-w-[75px] h-[75px] object-cover rounded-md" />
                  <div>
                    <p>{course.courseName}</p>
                    {/* <p>{course.courseDescription}</p> */}
                    {/* <p>{course.instructor.firstName}</p> */}
                  </div>
                </div>
                <div>{course?.totalDuration}</div>
                <div className="max-w-[200px] flex flex-col justify-center">
                  <p>Progress:{course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course?.courseProgress?.length || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
