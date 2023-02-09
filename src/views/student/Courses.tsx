import React from "react";
import { ChevronRight, Clock } from "react-feather";
import Row from "../../components/layouts/Row";
import { Link } from "react-router-dom";
import ColWrapper from "../../components/students/ColWrapper";
import CardWrapper from "../../components/students/CardWrapper";
import colors from "../../assets/img/Colors";
import CourseSchedule from "../../components/students/CourseSchedule";
import MyCourses from "../../components/students/MyCourses";
import EmptyNotifications from "../../components/icons/EmptyNotifications";
import useClasses from "../../hooks/queries/classes/useClasses";
import { Spinner } from "reactstrap";
import getMonth from "../../utils/getMonth";
import getTimeString from "../../utils/getTimeString";
import { announcement } from "../ict-admin/MessageBoard";
import useNotifications from "../../hooks/queries/notifications/useNotifications";
import Announcement from "../../components/molecules/Announcement";

export default function StudentCourses() {
  const { data, isLoading } = useClasses({
    startTime: "2022-12-01T21:56:53.900Z",
  });
  const lectures = data?.classes?.nodes;

  const { data: notificationsData, isLoading: notifcationsLoading } =
    useNotifications();

  const notifications = notificationsData?.nodes as announcement[];

  return (
    <section className="container my-5">
      <Row>
        <ColWrapper lg="5">
          {/* Upcoming Lecture */}
          <section className="mb-6">
            <div className="d-flex justify-content-between">
              <h2 className="text-xl font-bold text-blue-600">
                Upcoming Lecture
              </h2>

              {isLoading && <Spinner />}
            </div>

            <article
              style={{ backgroundColor: colors.primary }}
              className="r-card px-4 py-4 mt-4 d-flex align-items-center justify-content-between"
            >
              {lectures && lectures[0] && (
                <div className="p-1 bg-white rounded-2">
                  <time className="font-bold text-center text-blue-600">
                    {new Date(lectures[0]?.startTime)?.getDate() ===
                    new Date(lectures[0]?.endTime)?.getDate()
                      ? new Date(lectures[0]?.startTime)?.getDate()
                      : `${new Date(
                          lectures[0]?.startTime
                        )?.getDate()} - ${new Date(
                          lectures[0]?.endTime
                        )?.getDate()} `}{" "}
                    <br />
                    {getMonth(new Date(lectures[0]?.startTime))}
                  </time>
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-white">
                  {(lectures && lectures[0]?.name) ?? ""}
                </h2>
                <div className="d-flex align-items-center gap-3">
                  <Clock color="#fff" size={12} />
                  <time className="text-white">
                    {lectures &&
                      getTimeString({
                        date: new Date(lectures[0]?.startTime),
                      })}{" "}
                    -{" "}
                    {lectures &&
                      getTimeString({
                        date: new Date(lectures[0]?.endTime),
                      })}
                  </time>
                </div>
              </div>
              {lectures && (
                <Link to={`/student/lecture/${lectures[0]?.id}`}>
                  <span
                    className="p-3 rounded-3"
                    style={{
                      backgroundColor: "#364C74",
                    }}
                  >
                    <ChevronRight color="white" />
                  </span>
                </Link>
              )}
            </article>
          </section>

          {/* Course Schedule */}
          <section className="mt-5 mb-5">
            <div className="d-flex justify-content-between">
              <h2 className="text-xl font-bold text-blue-600">
                My Course Schedule
              </h2>

              <Link to={"/student/all-courses"}>
                <small className="text-decoration-underline">Show All</small>
              </Link>
            </div>

            {/* Course Schedule Component */}
            <CardWrapper>
              <CourseSchedule />
            </CardWrapper>
          </section>
        </ColWrapper>

        <ColWrapper>
          {/* My Courses */}
          <section>
            <div
              className="d-flex justify-content-between"
              aria-level={2}
              role={"heading"}
            >
              <h2 className="text-xl font-bold text-blue-600">My Courses</h2>

              <Link to={"/student/all-courses"}>
                <small className="text-decoration-underline">Show All</small>
              </Link>
            </div>

            <div>
              <CardWrapper>
                <MyCourses />
              </CardWrapper>

              <button
                className="btn mt-4 btn-blue-800 btn-lg w-100 mb-5"
                type="button"
              >
                Submit Project
              </button>
            </div>
          </section>

          {/* Notifications */}
          <section>
            <h2 className="text-xl font-bold text-blue-600">Notifications</h2>
            <CardWrapper className="text-center">
              {notifcationsLoading && <Spinner />}
              {!!notifications ? (
                <div>
                  <ul className="no-padding-left">
                    {notifications.map((others, i) => {
                      const props = {
                        title: others?.title,
                        message: others?.content,
                        date: new Date(others?.createdAt),
                      };

                      return (
                        <li className="text-left" key={i}>
                          <Announcement {...props} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                <div>
                  {" "}
                  <EmptyNotifications />
                  <p className="text-center">There are no Notifications</p>{" "}
                </div>
              )}
            </CardWrapper>
          </section>
        </ColWrapper>
      </Row>
    </section>
  );
}
