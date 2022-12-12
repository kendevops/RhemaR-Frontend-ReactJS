import React, { useState, useRef, useEffect } from "react";
import CardWrapper from "../../components/students/CardWrapper";
import CourseSchedule from "../../components/students/CourseSchedule";
import upcoming from "../../assets/img/upcoming-event.svg";
import useClasses from "../../hooks/queries/classes/useClasses";
import { Spinner } from "reactstrap";
import getMonth from "../../utils/getMonth";
import getTimeString from "../../utils/getTimeString";
import { Link } from "react-router-dom";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";

const StudentDashboardPage = () => {
  const { data, isLoading } = useClasses({
    startTime: "2022-12-01T21:56:53.900Z",
  });
  const lectures = data?.classes?.nodes;

  const { data: userData, isLoading: userLoading } = useCurrentUser();
  const application = userData?.applications
    ? userData?.applications[userData?.applications?.length - 1]
    : {};
  const feesPaid = application?.feePayment?.amount;
  const paymentCompletion = (feesPaid / 80000) * 100;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-12 mb-4">
          {/* Semester Progress */}
          <div className="bg-white r-card px-5 py-4 mb-4 bg-cap">
            <div className="d-flex justify-content-between ">
              <p className="r-card-title">Semester Progress</p>
              <h2 className="font-bold text-2xl ms-4">43%</h2>
            </div>

            {/* Progress bar */}
            <div>
              <div class="progress ">
                <div
                  class="progress-bar progress-bar-animated bg-warning "
                  role="progressbar"
                  style={{ width: "43%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>

          {/* Upcmonign lecture */}
          <section className="bg-white r-card px-5 py-4">
            <div className="d-flex justify-content-between">
              <p className="r-card-title">Upcoming Lecture</p>
              {isLoading && <Spinner />}
            </div>
            <hr />
            {lectures ? (
              <article className="d-flex align-items-center justify-content-between mt-4">
                <div className="d-flex align-items-center">
                  <div className="bg-blue-200 p-3 me-4 rounded-2 text-center">
                    <time className="text-lg font-medium lh-1 mb-1">
                      {new Date(lectures[0]?.startTime)?.getDate() ===
                      new Date(lectures[0]?.endTime)?.getDate()
                        ? new Date(lectures[0]?.startTime)?.getDate()
                        : `${new Date(
                            lectures[0]?.startTime
                          )?.getDate()} - ${new Date(
                            lectures[0]?.endTime
                          )?.getDate()} `}
                    </time>
                    <div className="text-xxl font-bold lh-1">
                      {getMonth(new Date(lectures[0]?.startTime))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-bold">{lectures[0]?.name}</p>
                    <div className="text-sm">
                      <span className="me-1">
                        <span
                          className="iconify"
                          data-icon="bi:clock-fill"
                        ></span>
                      </span>
                      <time>
                        {getTimeString({
                          date: new Date(lectures[0]?.startTime),
                        })}{" "}
                        -{" "}
                        {getTimeString({
                          date: new Date(lectures[0]?.endTime),
                        })}
                      </time>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-200 py-3 px-4 rounded-2 ms-4 text-lg lh-1 click">
                  <span className="iconify" data-icon="fa:angle-right"></span>
                </div>
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
            {feesPaid < 80000 ? (
              <div className="text-center mx-auto">
                <p className="text-xl">Next Payment</p>
                <p className="next-payment">N10,000</p>
                <p className="mb-0 text-lg click">
                  <u>Make Payment</u>
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
          <CardWrapper>
            <CourseSchedule />
          </CardWrapper>
        </div>

        {/*  */}
        <div className="col-lg-6 col-md-6 col-12 mb-4">
          <div className="bg-white r-card px-5 py-4 mb-4">
            <div className="bg-blue-200 rounded-2 py-2 px-4 d-flex justify-content-between align-items-center mt-3 mb-4">
              <h2 className="r-card-title me-3">Upcoming Events</h2>
              <div>
                <img src={upcoming} alt="Upcoming event" />
              </div>
            </div>

            {/* Event */}
            <div className="border p-4 rounded-2 mb-3">
              <div className="d-flex align-items-center">
                <div className="bg-blue-200 p-3 me-4 rounded-2 text-center">
                  <div className="text-lg font-medium lh-1 mb-1">10 - 12</div>
                  <div className="text-xxl font-bold lh-1">Oct</div>
                </div>
                <div className="text-text-body">
                  <div className="text-xl">Christ the Healer</div>
                  <div className="text-sm">
                    <span className="me-1">
                      <span
                        className="iconify"
                        data-icon="bi:clock-fill"
                      ></span>
                    </span>
                    <span> 9:00AM - 5:00PM </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-xl click my-3">
              <u> Show all</u>
            </div>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default StudentDashboardPage;
