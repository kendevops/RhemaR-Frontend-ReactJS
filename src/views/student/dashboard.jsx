import React, { useState, useRef, useEffect } from "react";
import CardWrapper from "../../components/students/CardWrapper";
import CourseSchedule from "../../components/students/CourseSchedule";
import upcoming from "../../assets/img/upcoming-event.svg";
import useClasses from "../../hooks/queries/classes/useClasses";
import { Spinner } from "reactstrap";
import getMonth, { months } from "../../utils/getMonth";
import getTimeString from "../../utils/getTimeString";
import { Link } from "react-router-dom";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import useCourses from "../../hooks/queries/classes/useCourses";
import useAllEvents from "../../hooks/queries/events/useAllEvents";
import UpcomingEvent from "../../components/molecules/UpcomingEvent";

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

  const { data: coursesData, isLoading: coursesLoading } = useCourses();
  const courses = coursesData?.courses;

  const completion = courses?.reduce((a, b) => {
    return a?.report?.completion ?? 0 + b?.report?.completion ?? 0;
  });

  const totalCompletion = courses?.length * 100;
  const semesterProgress = Math.floor((completion / totalCompletion) * 100);

  console.log(semesterProgress);

  const { data: userData, isLoading: userLoading } = useCurrentUser();
  const application = userData?.applications
    ? userData?.applications[userData?.applications?.length - 1]
    : {};
  const feesPaid = application?.feePayment?.amount;
  const totalAmountRequired = application?.feePayment?.amount * 8;
  const paymentCompletion = (feesPaid / totalAmountRequired) * 100;

  const payUrl = application?.feePayment?.paymentUrl;

  const startDate = userData?.applications[0]?.session?.startDate;
  const endDate = userData?.applications[0]?.session?.endDate;

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
      <div className="row">
        <div className="col-lg-6 col-md-6 col-12 mb-4">
          {coursesLoading && <Spinner />}
          {/* Semester Progress */}
          {courses && (
            <div className="bg-white r-card px-5 py-4 mb-4 bg-cap">
              <div className="d-flex justify-content-between ">
                <p className="r-card-title">Semester Progress</p>
                <h2 className="font-bold text-2xl ms-4">{progress}%</h2>
              </div>

              {/* Progress bar */}
              <div>
                <div className="progress ">
                  <div
                    className="progress-bar progress-bar-animated bg-warning "
                    role="progressbar"
                    style={{
                      width: `${progress}%`,
                      // width: "30%",
                    }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Semester Progress */}
          {courses && (
            <div className="bg-white r-card px-5 py-4 mb-4 bg-cap">
              <div className="d-flex justify-content-between ">
                <p className="r-card-title">Student Progress</p>
                <h2 className="font-bold text-2xl ms-4">
                  {semesterProgress.toString() == "NaN"
                    ? "0"
                    : semesterProgress.toString()}
                  %
                </h2>
              </div>

              {/* Progress bar */}
              <div>
                <div className="progress ">
                  <div
                    className="progress-bar progress-bar-animated bg-warning "
                    role="progressbar"
                    style={{
                      width: `${
                        semesterProgress.toString() === "NaN"
                          ? "0"
                          : semesterProgress
                      }%`,
                      // width: "30%",
                    }}
                    aria-valuenow={semesterProgress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          )}
          {/* Upcmonign lecture */}
          <section className="bg-white r-card px-5 py-4">
            <div className="d-flex justify-content-between">
              <p className="r-card-title">Upcoming Lecture</p>
              {isLoading && <Spinner />}
            </div>
            <hr />
            {lectures ? (
              <article className="">
                <Link to={`/student/lecture/${lectures[0]?.id}`}>
                  <UpcomingEvent
                    title={lectures[0]?.name}
                    endDate={new Date(lectures[0]?.endTime)}
                    startDate={new Date(lectures[0]?.startTime)}
                  />
                </Link>
              </article>
            ) : (
              <p className="text-xl font-bold">No Upcoming Lectures</p>
            )}
          </section>
        </div>

        {/*  */}
        <div className="col-lg-6 col-md-6 col-12 mb-4">
          <div className="bg-white d-flex align-items-center justify-content-between r-card px-5 py-4 mb-4 payment-card">
            {userLoading && <Spinner />}
            {/* left */}
            <div className="text-center mx-auto">
              <div>
                <div
                  className="rounded-progressbar"
                  role="progressbar"
                  aria-valuenow={Math.floor(paymentCompletion)}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ "--value": Math.floor(paymentCompletion) }}
                ></div>
              </div>
              <div className="text-lg">Payment Completion</div>
            </div>

            <div
              style={{
                width: "2px",
                backgroundColor: "#D2D7E0",
                height: "100%",
              }}
            ></div>

            {/* right */}
            {feesPaid < totalAmountRequired ? (
              <div className="text-center mx-auto">
                <p className="text-xl">Next Payment</p>
                <p className="next-payment">N{feesPaid}</p>
                <p className="mb-0 text-lg click">
                  <u>
                    <a href={payUrl}>Make Payment</a>
                  </u>
                </p>
              </div>
            ) : (
              <p className="text-xl">Paid in full</p>
            )}
          </div>

          {/*  */}
          <div className="bg-white r-card text-center p-3 click">
            <Link to={"/student/tuition-clearance"}>View Fee Breakdown</Link>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-12 mb-4">
          <div className="d-flex justify-content-between">
            <h2 className="text-xl font-bold text-blue-600">Next Schedule</h2>

            <Link to={"/student/downloads"}>
              <small className="text-decoration-underline">Show All</small>
            </Link>
          </div>
          <CardWrapper>
            <CourseSchedule />
          </CardWrapper>
        </div>

        {/*  */}
        <div className="col-lg-6 col-md-6 col-12 mb-4">
          <div className="bg-white r-card px-5 py-4 mb-4">
            {eventsLoading && <Spinner />}
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
              <u>
                <Link to={"/student/events"}> Show all</Link>
              </u>
            </div>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default StudentDashboardPage;
