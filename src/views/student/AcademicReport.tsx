import React, { useState, useRef, useEffect } from "react";

import { Spinner } from "reactstrap";
import { Icon } from "@iconify/react";
import { FaBook, FaGraduationCap } from "react-icons/fa";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import useCourses from "../../hooks/queries/classes/useCourses";
import ProgressBarMui from "../../components/progressBars/progressBer";
import SessionSchedule from "../../components/students/SessionSchedule";
import Tab from "../../components/atoms/Tab";
import AcademicReport from "../../components/students/AcademicReport";
import StudentActionButtons from "./StudentActionButtons";
import useUserCoursesReport from "../../hooks/queries/users/useUserCoursesReport";
import useUserCourses from "../../hooks/queries/users/useUserCourses";

const AcademicReportPage = () => {
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState(0);

  let levelTabs = ["Level 1", "Level 2"];

  const currentLevel = levelTabs[level];

  // const { data: coursesData, isLoading: coursesLoading } = useCourses();
  const { data: coursesData, isLoading: coursesLoading } = useUserCourses();

  const { data: coursesReportData, isLoading: coursesReportLoading } =
    useUserCoursesReport();
  const courses = coursesData?.nodes;
  const coursesReport = coursesReportData?.nodes;

  const completion = coursesReport?.reduce(
    (sum: number, course: { completion: number }) => {
      return sum + (course?.completion ?? 0);
    },
    0
  );

  const totalCompletion = courses?.length * 100;

  // console.log(totalCompletion, courses?.length, completion);
  const semesterProgress = Math.floor((completion / totalCompletion) * 100);

  console.log(semesterProgress, completion, totalCompletion, courses);

  const { data: userData, isLoading: userLoading } = useCurrentUser();

  console.log(userData);

  return (
    <div className="container my-5">
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>2023/2024 Academic Report</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${userData?.firstName} ${userData?.lastName}`}</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${userData?.currentCampus?.name}`}</div>{" "}
      </div>

      <div>
        <Tab.Wrapper className="d-flex gap-3 ">
          {levelTabs?.map((t, i) => {
            return (
              <Tab
                key={t}
                tabColor="#203864"
                isSelected={currentLevel === t}
                onClick={() => {
                  setLevel(i);
                }}
              >
                {t}
              </Tab>
            );
          })}
        </Tab.Wrapper>

        <div className="mt-5 d-flex  justify-content-between gap-5">
          <div className="rounded-4 p-4 w-100" style={{ background: "white" }}>
            <div className="d-flex justify-content-between align-items-center  text-2xl">
              <p className="text-2xl d-flex align-items-center ">
                <FaGraduationCap className="text-2xl m-xl-3 " />{" "}
                <span className="">Admission Start Date</span>
              </p>
              <p className="text-2xl">
                {new Date(userData?.currentSession?.startDate).toDateString()}
              </p>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center text-2xl">
              <p className="text-2xl d-flex align-items-center ">
                <FaGraduationCap className="text-2xl m-xl-3 " />{" "}
                <span className="">Admission End Date</span>
              </p>
              <p className="text-2xl">
                {new Date(userData?.currentSession?.endDate).toDateString()}
              </p>
            </div>
          </div>

          <div
            className="rounded-4 p-4  w-100 "
            style={{ background: "white" }}
          >
            <div className="d-flex justify-content-between align-items-center  text-2xl">
              <p className="text-2xl d-flex align-items-center ">
                <FaGraduationCap className="text-2xl m-xl-3 " />{" "}
                <span className="">Campus</span>
              </p>
              <p className="text-2xl">{userData?.currentCampus?.name}</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center text-2xl">
              <p className="text-2xl d-flex align-items-center ">
                <FaGraduationCap className="text-2xl m-xl-3 " />{" "}
                <span className="">Year of Graduation</span>
              </p>
              <p className="text-2xl">{userData?.graduateDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <AcademicReport title={"Student Level 1 Academic Progress Report"} />
      </div>

      <div className="row">
        <div className="col-lg-6 col-md-6 col-12 mb-4">
          {/* {coursesLoading && <Spinner />} */}
          {/*  Progress */}

          <ProgressBarMui
            name={"L 1 Courses Completed"}
            percentage={
              semesterProgress.toString() === "NaN" ? 0 : semesterProgress
            }
            progressColor={"yellow"}
            icon={<FaGraduationCap />}
          />

          <ProgressBarMui
            name={"L 1 Quizes Completed"}
            percentage={progress}
            progressColor={"green"}
            icon={<FaGraduationCap />}
          />
        </div>

        {/*  */}
        <div className="col-lg-6 col-md-6 col-12 mb-4">
          <div className=" d-flex flex-column  align-items-center justify-content-between  mb-4 ">
            <div className="w-100 ">
              <ProgressBarMui
                name={"L 1 Exams Completed"}
                percentage={30}
                progressColor={"red"}
                icon={<FaGraduationCap />}
              />
            </div>

            <div className="w-100 ">
              <ProgressBarMui
                name={"L 1 Tuition Completed"}
                percentage={30}
                progressColor={"red"}
                icon={<FaGraduationCap />}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <StudentActionButtons level={currentLevel} />
      </div>
    </div>
  );
};

export default AcademicReportPage;
