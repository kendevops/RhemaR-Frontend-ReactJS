import React, { useState, useRef, useEffect } from "react";

import { Spinner } from "reactstrap";
import { Icon } from "@iconify/react";
import { FaBook, FaCalendarAlt, FaGraduationCap } from "react-icons/fa";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import useCourses from "../../hooks/queries/classes/useCourses";
import ProgressBarMui from "../../components/progressBars/progressBer";
import SessionSchedule from "../../components/students/SessionSchedule";
import Tab from "../../components/atoms/Tab";
import AcademicReport from "../../components/students/AcademicReport";
import UpcomingEvent from "../../components/molecules/UpcomingEvent";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import useClasses from "../../hooks/queries/classes/useClasses";
import { AiOutlineCreditCard } from "react-icons/ai";

const ELearningPage = () => {
  const [progress, setProgress] = useState(0);
  const { data, isLoading } = useClasses({
    startTime: "2022-12-01T21:56:53.900Z",
  });

  const lectures = data?.classes?.nodes;

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

  const application = userData?.applications
    ? userData?.applications[userData?.applications?.length - 1]
    : {};
  const feesPaid = application?.feePayment?.amount;
  const totalAmountRequired = application?.feePayment?.amount * 8;

  const payUrl = application?.feePayment?.paymentUrl;

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
        <div>E-Learning Class</div>

        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${userData?.campus?.name}`}</div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-md-6 col-12 mb-4">
          {/* {coursesLoading && <Spinner />} */}
          {/*  Progress */}

          {/* Upcmonign lecture */}
          <section className="bg-white r-card px-5 py-4">
            <div className="d-flex gap-3 align-center ">
              <FaCalendarAlt />
              <p className="r-card-title">Ongoing Class(es)</p>
              {isLoading && <Spinner />}
            </div>
            <hr />
            {lectures ? (
              <article className="position-relative ">
                <Link to={`/student/lecture/${lectures[0]?.id}`}>
                  <UpcomingEvent
                    title={lectures[0]?.name}
                    endDate={new Date(lectures[0]?.endTime)}
                    startDate={new Date(lectures[0]?.startTime)}
                  />
                </Link>

                <div
                  style={{ position: "absolute", right: "15px", top: "15px" }}
                >
                  <MdCancel style={{ color: "red", fontSize: "23px" }} />
                </div>
              </article>
            ) : (
              <p className="text-xl font-bold">
                There Are Currently No Ongoing Classes
              </p>
            )}
          </section>
        </div>

        {/*  */}
        <div className="col-lg-6 col-md-6 col-12 mb-4">
          <div className=" d-flex flex-column  align-items-center justify-content-between  mb-4 ">
            <div className="w-100 ">
              <ProgressBarMui
                name={"No. Of L1 Courses Completed"}
                percentage={30}
                progressColor={"red"}
                icon={<FaGraduationCap />}
              />
            </div>

            <div className="w-100 ">
              <ProgressBarMui
                name={"No. Of L2 Courses Completed"}
                percentage={30}
                progressColor={"red"}
                icon={<FaGraduationCap />}
              />
            </div>

            <div className="w-100 ">
              <ProgressBarMui
                name={"Tuition Payment"}
                percentage={50}
                progressColor={"green"}
                icon={<AiOutlineCreditCard />}
                others={
                  <div className="w-100 my-3">
                    {feesPaid < totalAmountRequired ? (
                      <div className="text-center mx-auto d-flex justify-content-between py-3 align-items-center text-4xl">
                        <p className="text-5xl" style={{ fontSize: "30px" }}>
                          Next Payment: <span>N{feesPaid}</span>
                        </p>

                        <button className="btn btn-blue-800 p-2 text-center ">
                          <a href={payUrl} className="text-2xl px-3 ">
                            Pay Now
                          </a>
                        </button>
                      </div>
                    ) : (
                      <p className="text-xl">Paid in full</p>
                    )}
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ELearningPage;
