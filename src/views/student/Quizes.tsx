import React, { useState, useRef, useEffect } from "react";

import { Spinner } from "reactstrap";
import { Icon } from "@iconify/react";
import { FaBook } from "react-icons/fa";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import useCourses from "../../hooks/queries/classes/useCourses";
import ProgressBarMui from "../../components/progressBars/progressBer";
import SessionSchedule from "../../components/students/SessionSchedule";
import Tab from "../../components/atoms/Tab";
import QuizesContainer from "../../components/students/QuizesCaontainer";

const StudentQuizesPage = () => {
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState(0);

  let levelTabs = ["Level 1", "Level 2"];

  const currentLevel = levelTabs[level];

  const { data: coursesData, isLoading: coursesLoading } = useCourses();
  const courses = coursesData?.courses;

  const completion = courses?.reduce((a: any, b: any) => {
    return a?.report?.completion ?? 0 + b?.report?.completion ?? 0;
  });

  const totalCompletion = courses?.length * 100;

  // console.log(totalCompletion, courses?.length, completion);
  const semesterProgress = Math.floor((completion / totalCompletion) * 100);

  console.log(semesterProgress);

  const { data: userData, isLoading: userLoading } = useCurrentUser();

  const startDate = userData?.applications[0]?.session?.startDate;
  const endDate = userData?.applications[0]?.session?.endDate;

  console.log(userData);

  // const startDate = "2022-12-07T22:00:43.187Z";
  // const endDate = "2023-12-20T22:00:43.187Z";

  useEffect(() => {
    const currentTime = new Date().getTime();

    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();

    const totalDuration = endTime - startTime;
    const elapsedDuration = currentTime - startTime;

    console.log(totalDuration, elapsedDuration);

    const calculatedProgress = Math.round(
      (elapsedDuration / totalDuration) * 100
    );
    setProgress(calculatedProgress > 100 ? 100 : calculatedProgress);
  }, [startDate, endDate]);

  return (
    <div className="container my-5">
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Course Quizes</div>

        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${userData?.firstName} ${userData?.firstName}`}</div>
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

        <div className="row my-4 ">
          <div className="col-lg-6 col-md-6 col-12 mb-4">
            {coursesLoading && <Spinner />}
            {/* Semester Progress */}

            {/* Semester Progress */}
            {currentLevel === "Level 1" && (
              <ProgressBarMui
                name={"No. of L1 Quizes Completed"}
                percentage={
                  semesterProgress.toString() === "NaN" ? 0 : semesterProgress
                }
                progressColor={"yellow"}
                icon={<FaBook />}
              />
            )}

            {currentLevel === "Level 2" && (
              <ProgressBarMui
                name={"No. of L2 Quizes Completed"}
                percentage={progress}
                progressColor={"green"}
                icon={<FaBook />}
              />
            )}
          </div>

          {/*  */}
        </div>

        <div>
          <QuizesContainer
            title={
              currentLevel === "Level 2"
                ? "List Of L2 Quizes"
                : "List Of L1 Quizes"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default StudentQuizesPage;
