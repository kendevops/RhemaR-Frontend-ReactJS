import React, { useState, useRef, useEffect } from "react";

import { Spinner } from "reactstrap";
import { Icon } from "@iconify/react";
import { FaBook, FaCalendarAlt, FaGraduationCap } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import useCourses from "../../hooks/queries/classes/useCourses";
import ProgressBarMui from "../../components/progressBars/progressBer";
import AcademicReport from "../../components/students/AcademicReport";
import UpcomingEvent from "../../components/molecules/UpcomingEvent";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import useClasses from "../../hooks/queries/classes/useClasses";
import { AiOutlineCreditCard } from "react-icons/ai";
import useUserClasses from "../../hooks/queries/users/useUserClasses";

const ELearningPage = () => {
  const [progress, setProgress] = useState(0);
  const { data, isLoading } = useClasses({});
  const { data: coursesData, isLoading: coursesLoading } = useCourses();

  const lectures = data?.classes?.nodes;

  const ongoingOnlineClasses = lectures?.filter(
    (clas: { onlineStatus: string }) => clas?.onlineStatus === "ONGOING"
  );

  const ongoingOnsiteClasses = lectures?.filter(
    (clas: { onsiteStatus: string }) => clas?.onsiteStatus === "ONGOING"
  );

  console.log(lectures);

  const courses = coursesData?.courses;

  // const completion = courses?.reduce((a: any, b: any) => {
  //   return a?.report?.completion ?? 0 + b?.report?.completion ?? 0;
  // });

  const totalCompletion = courses?.length * 100;

  // console.log(totalCompletion, courses?.length, completion);
  // const semesterProgress = Math.floor((completion / totalCompletion) * 100);

  const { data: userData, isLoading: userLoading } = useCurrentUser();

  const application = userData?.applications
    ? userData?.applications[userData?.applications?.length - 1]
    : {};
  const feesPaid = application?.feePayment?.amount;
  const totalAmountRequired = application?.feePayment?.amount * 8;

  const payUrl = application?.feePayment?.paymentUrl;

  // const startDate = userData?.applications[0]?.session?.startDate;
  // const endDate = userData?.applications[0]?.session?.endDate;

  console.log(userData);

  // const startDate = "2022-12-07T22:00:43.187Z";
  // const endDate = "2023-12-20T22:00:43.187Z";

  // useEffect(() => {
  //   const currentTime = new Date().getTime();

  //   const startTime = new Date(startDate).getTime();
  //   const endTime = new Date(endDate).getTime();

  //   const totalDuration = endTime - startTime;
  //   const elapsedDuration = currentTime - startTime;

  //   console.log(totalDuration, elapsedDuration);

  //   const calculatedProgress = Math.round(
  //     (elapsedDuration / totalDuration) * 100
  //   );
  //   setProgress(calculatedProgress > 100 ? 100 : calculatedProgress);
  // }, [startDate, endDate]);

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
        <div>{`${userData?.currentCampus?.name}`}</div>{" "}
      </div>

      <div className="row ">
        <div className="col-lg-6 col-md-6 col-12 mb-4 ">
          {/* {coursesLoading && <Spinner />} */}
          {/*  Progress */}

          {/* Upcmonign lecture */}
          <section className="bg-white r-card px-5 mb-4   py-4">
            <div className="d-flex gap-3 align-center ">
              <FaCalendarAlt />
              <p className="r-card-title">Ongoing Online Lecture</p>
              {isLoading && <Spinner />}
            </div>
            <hr />
            {ongoingOnlineClasses?.length > 0 ? (
              <article className="position-relative ">
                <Link to={`/student/lecture/${ongoingOnlineClasses[0]?.id}`}>
                  <UpcomingEvent
                    title={ongoingOnlineClasses[0]?.name}
                    endDate={
                      new Date(ongoingOnlineClasses[0]?.onlineEndDateTime)
                    }
                    startDate={
                      new Date(ongoingOnlineClasses[0]?.onlineStartDateTime)
                    }
                  />
                </Link>
              </article>
            ) : (
              <p className="text-xl font-bold">No Onging Online Lectures</p>
            )}
          </section>

          <section className="bg-white r-card px-5   py-4">
            <div className="d-flex gap-3 align-center ">
              <FaCalendarAlt />
              <p className="r-card-title">Ongoing OnSite Lecture</p>
            </div>
            <hr />
            {ongoingOnsiteClasses?.length > 0 ? (
              <article className="position-relative ">
                <Link to={`/student/lecture/${ongoingOnsiteClasses[0]?.id}`}>
                  <UpcomingEvent
                    title={ongoingOnsiteClasses[0]?.name}
                    endDate={
                      new Date(ongoingOnsiteClasses[0]?.onsiteEndDateTime)
                    }
                    startDate={
                      new Date(ongoingOnsiteClasses[0]?.onsiteStartDateTime)
                    }
                  />
                </Link>
              </article>
            ) : (
              <p className="text-xl font-bold">No Onging Onsite Lectures</p>
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
