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
import SubmitProjectModal from "../../components/modals/SubmitProjectModal";
import useToggle from "../../utility/hooks/useToggle";
import { Icon } from "@iconify/react";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";

export default function StudentCourses() {
  const { data: userData, isLoading: userLoading } = useCurrentUser();
  const { data, isLoading } = useClasses({});
  const lectures = data?.classes?.nodes;

  console.log(lectures);

  const { data: notificationsData, isLoading: notifcationsLoading } =
    useNotifications();

  const notifications = notificationsData?.nodes as announcement[];

  const [projectOpen, toggleProject] = useToggle();

  return (
    <section className="container my-5">
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Courses</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${userData?.currentCampus?.name}`}</div>{" "}
      </div>
      <Row>
        <ColWrapper lg="5">
          {/* Upcoming Lecture */}
          <section className="mb-6">
            <div className="d-flex justify-content-between">
              <h2 className="text-xl font-bold text-blue-600">
                Upcoming Classes
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
                    {new Date(lectures[0]?.onlineStartDateTime)?.getDate() ===
                    new Date(lectures[0]?.onlineEndDateTime)?.getDate()
                      ? new Date(lectures[0]?.onlineStartDateTime)?.getDate()
                      : `${new Date(
                          lectures[0]?.onlineStartDateTime
                        )?.getDate()} - ${new Date(
                          lectures[0]?.onlineEndDateTime
                        )?.getDate()} `}{" "}
                    <br />
                    {getMonth(new Date(lectures[0]?.onlineStartDateTime))}
                  </time>
                </div>
              )}
              {lectures && lectures[0] && (
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {(lectures && lectures[0]?.name) ?? ""}
                  </h2>
                  <div className="d-flex align-items-center gap-3">
                    <Clock color="#fff" size={12} />
                    <time className="text-white">
                      {lectures &&
                        getTimeString({
                          date: new Date(lectures[0]?.onlineStartDateTime),
                        })}{" "}
                      -{" "}
                      {lectures &&
                        getTimeString({
                          date: new Date(lectures[0]?.onlineEndDateTime),
                        })}
                    </time>
                  </div>
                </div>
              )}
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

              <Link to={"/student/downloads"}>
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

              <SubmitProjectModal isOpen={projectOpen} toggle={toggleProject} />
              <button
                onClick={toggleProject}
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
              {/* {notifcationsLoading && <Spinner />} */}
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
