import React, { useState, useRef, useEffect } from "react";
import CardWrapper from "../../components/students/CardWrapper";
import CourseSchedule from "../../components/students/CourseSchedule";
import upcoming from "../../assets/img/upcoming-event.svg";
import useClasses from "../../hooks/queries/classes/useClasses";
import { Spinner } from "reactstrap";
import getMonth, { months } from "../../utils/getMonth";
import getTimeString from "../../utils/getTimeString";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaGraduationCap } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { AiOutlineCreditCard } from "react-icons/ai";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import useCourses from "../../hooks/queries/classes/useCourses";
import useAllEvents from "../../hooks/queries/events/useAllEvents";
import UpcomingEvent from "../../components/molecules/UpcomingEvent";
import ProgressBarMui from "../../components/progressBars/progressBer";
import ProgressBarBootstrap from "../../components/progressBars/progressBarBoostrap";
import BButton from "../../components/general/button";
import useUserCourses from "../../hooks/queries/users/useUserCourses";
import useUserClasses from "../../hooks/queries/users/useUserClasses";
import useUserCoursesReport from "../../hooks/queries/users/useUserCoursesReport";
import usePaymentHistory from "../../hooks/queries/users/usePaymentHistory";

const StudentDashboardPage = () => {
  const { data, isLoading } = useClasses({
    startTime: "2022-12-01T21:56:53.900Z",
  });

  const [progress, setProgress] = useState(0);

  const lectures = data?.classes?.nodes;

  const { data: eventsData, isLoading: eventsLoading } = useAllEvents();

  const upcomingEvent = eventsData
    ? eventsData?.nodes?.find((e) => e?.status !== "live")
    : undefined;

  const { data: coursesData, isLoading: coursesLoading } = useUserCourses();
  const { data: classesData, isLoading: classesLoading } = useClasses();
  const { data: coursesReportData, isLoading: coursesReportLoading } =
    useUserCoursesReport();

  const { data: paymentData, isLoading: paymentLoading } = usePaymentHistory();

  const courses = coursesData?.nodes;
  const classes = classesData?.classes?.nodes;
  const coursesReport = coursesReportData?.nodes;
  const paymentHistory = paymentData?.nodes;

  const ongoingOnlineClasses = classes?.filter(
    (clas) => clas?.onlineStatus === "ONGOING"
  );

  const ongoingOnsiteClasses = classes?.filter(
    (clas) => clas?.onsiteStatus === "ONGOING"
  );

  const completion = coursesReport?.reduce(
    (a, b) => {
      return (a?.completion ?? 0) + (b?.completion ?? 0);
    },
    [0]
  );

  const totalCompletion = courses?.length * 100;

  const semesterProgress = Math.floor((completion / totalCompletion) * 100);

  // console.log(semesterProgress, coursesReport);

  // console.log(paymentHistory);

  const { data: userData, isLoading: userLoading } = useCurrentUser();

  const application = userData?.applications
    ? userData?.applications[userData?.applications?.length - 1]
    : {};
  const feesPaid = application?.feePayment?.amount;
  const totalAmountRequired = application?.feePayment?.amount * 8;
  const paymentCompletion = (feesPaid / totalAmountRequired) * 100;

  const payUrl = application?.feePayment?.paymentUrl;

  console.log(userData);

  const startDate = userData?.currentSession?.startDate;
  const endDate = userData?.currentSession?.endDate;

  // const startDate = "2022-12-07T22:00:43.187Z";
  // const endDate = "2023-12-20T22:00:43.187Z";

  useEffect(() => {
    const currentTime = new Date().getTime();

    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();

    console.log(endTime, startTime);

    const totalDuration = endTime - startTime;
    const elapsedDuration = currentTime - startTime;

    const calculatedProgress = Math.round(
      (elapsedDuration / totalDuration) * 100
    );
    console.log(totalDuration, elapsedDuration, calculatedProgress);
    setProgress(calculatedProgress > 100 ? 100 : calculatedProgress);
  }, [startDate, endDate]);

  return (
    <div className="container my-5 mx-0">
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Student Dashboard</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${userData?.firstName} ${userData?.firstName}`}</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${userData?.level?.name
          ?.split("_")
          .join(" ")
          .toLowerCase()}`}</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${userData?.currentCampus?.name}`}</div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-12 mb-4 d-flex flex-column flex-lg-row  gap-5 justify-content-center ">
          {/* {coursesLoading && <Spinner />} */}
          {/* Semester Progress */}

          {/* Semester Progress */}
          <div className="col-lg-6 col-md-6 col-12 mb-4">
            <ProgressBarMui
              name={"Student Progress"}
              percentage={
                semesterProgress.toString() === "NaN" ? 0 : semesterProgress
              }
              progressColor={"green"}
              icon={<FaGraduationCap />}
            />

            <ProgressBarMui
              name={"Session Progress"}
              percentage={progress}
              progressColor={"yellow"}
              icon={<FaGraduationCap />}
            />
          </div>

          {/*  */}

          <div className="col-lg-6 col-md-6 col-12 mb-4">
            <div className="bg-white d-flex flex-column  align-items-center justify-content-between r-card mb-4 payment-card">
              <div className="w-100 ">
                <ProgressBarMui
                  name={"Tuition Payment"}
                  percentage={Math.floor(paymentCompletion)}
                  progressColor={"green"}
                  icon={<AiOutlineCreditCard />}
                  others={
                    <div className="w-100 my-3">
                      {feesPaid < totalAmountRequired ? (
                        <div className="text-center mx-auto d-flex justify-content-between py-3 align-items-center text-xl">
                          <p className="text-xl">
                            Next Payment: <span>N{feesPaid}</span>
                          </p>
                          {/* <p className="next-payment">N{feesPaid}</p> */}

                          <button className="btn btn-blue-800 p-2 text-center ">
                            <a href={payUrl}>Pay Now</a>
                          </button>
                        </div>
                      ) : (
                        <p className="text-xl">Paid in full</p>
                      )}
                      <button className="btn btn-outline-dark border-1 text-xl border-blue-800 w-100 py-3 text-blue-800">
                        <Link to={"/student/tuition-clearance"}>
                          Show all Payments
                        </Link>
                      </button>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="col-lg-6 col-md-6 col-12 mb-4">
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

                <div
                  style={{ position: "absolute", right: "15px", top: "15px" }}
                >
                  <MdCancel style={{ color: "red", fontSize: "23px" }} />
                </div>
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

                <div
                  style={{ position: "absolute", right: "15px", top: "15px" }}
                >
                  <MdCancel style={{ color: "red", fontSize: "23px" }} />
                </div>
              </article>
            ) : (
              <p className="text-xl font-bold">No Onging Onsite Lectures</p>
            )}
          </section>

          {/*  */}
          {/* <div className="bg-white r-card text-center p-3 click">
            <Link to={"/student/tuition-clearance"}>View Fee Breakdown</Link>
          </div> */}
          <div className=" mb-4">
            <CardWrapper>
              <CourseSchedule title={"Upcoming Classes"} />
            </CardWrapper>
          </div>
        </div>

        {/*  */}
        <div className="col-lg-6 col-md-6 col-12 mb-4">
          <div className="bg-white r-card px-5 py-4 mb-4">
            {/* {eventsLoading && <Spinner />} */}
            <div className="bg-blue-200 rounded-2 py-2 px-4 d-flex justify-content-between align-items-center mt-3 mb-4">
              <h2 className="r-card-title me-3">Notice</h2>
              <div>
                <img src={upcoming} alt="Upcoming event" />
              </div>
            </div>

            {/* Event */}
            {upcomingEvent && (
              <div className="border p-4 rounded-2 mb-3">
                <div className="d-flex align-items-center">
                  <div className="bg-blue-200 p-3 me-4 rounded-2 text-center">
                    <h2 className="text-lg font-medium lh-1 mb-1">
                      {new Date(upcomingEvent?.startTime)?.getDate()} -{" "}
                      {new Date(upcomingEvent?.endTime)?.getDate()}
                    </h2>
                    <p className="text-xxl font-bold lh-1">
                      {months[new Date(upcomingEvent?.startTime).getMonth()]}
                    </p>
                  </div>
                  <div className="text-text-body">
                    <p className="text-xl">{upcomingEvent?.name}</p>
                    <div className="text-sm">
                      <time>
                        {getTimeString({
                          date: new Date(upcomingEvent?.startTime),
                        })}{" "}
                        -{" "}
                        {getTimeString({
                          date: new Date(upcomingEvent?.endTime),
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="text-center text-xl click my-3">
              <BButton text={"View All 2023/2024 Notice"} onClick={() => {}} />
            </div>
          </div>

          {/*  */}

          <div className="bg-white r-card px-5 py-4 mb-4">
            {/* {eventsLoading && <Spinner />} */}
            <div className="bg-blue-200 rounded-2 py-2 px-4 d-flex justify-content-between align-items-center mt-3 mb-4">
              <h2 className="r-card-title me-3">Upcoming Events</h2>
              <div>
                <img src={upcoming} alt="Upcoming event" />
              </div>
            </div>

            {/* Event */}
            {upcomingEvent && (
              <div className="border p-4 rounded-2 mb-3">
                <div className="d-flex align-items-center">
                  <div className="bg-blue-200 p-3 me-4 rounded-2 text-center">
                    <h2 className="text-lg font-medium lh-1 mb-1">
                      {new Date(upcomingEvent?.startTime)?.getDate()} -{" "}
                      {new Date(upcomingEvent?.endTime)?.getDate()}
                    </h2>
                    <p className="text-xxl font-bold lh-1">
                      {months[new Date(upcomingEvent?.startTime).getMonth()]}
                    </p>
                  </div>
                  <div className="text-text-body">
                    <p className="text-xl">{upcomingEvent?.name}</p>
                    <div className="text-sm">
                      <time>
                        {getTimeString({
                          date: new Date(upcomingEvent?.startTime),
                        })}{" "}
                        -{" "}
                        {getTimeString({
                          date: new Date(upcomingEvent?.endTime),
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="text-center text-xl click my-3">
              <BButton text={"View All 2023/2024 Events"} onClick={() => {}} />
            </div>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default StudentDashboardPage;
