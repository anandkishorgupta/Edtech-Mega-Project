import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { geUserEnrolledCourses } from "../../../services/operations/profileAPI";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  console.log(token)
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const getEnrolledCourses = async () => {
    try {
      const response = await geUserEnrolledCourses(token); // i am returning course data
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
      <div>Enrolled Courses </div>
      {!enrolledCourses ? (
        <div>Loading....</div>
      ) : !enrolledCourses.length ? (
        <p>not enrolled yet</p>
      ) : (
        <div>
          <div>
            <p>Course Name</p>
            <p>Duration</p>
            <p>Progress</p>
          </div>
          {/* cards  */}
          {
            enrolledCourses.map((course, index) => (
              <div key={index}>
                <div>
                  <img src={course.thumbnail} alt="" />
                  <div>
                    <p>{course.courseName}</p>
                    <p>{course.courseDescription}</p>
                  </div>
                </div>
                <div>
                  {course?.totalDuration}
                </div>
                <div>
                  <p>Progress:{course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
