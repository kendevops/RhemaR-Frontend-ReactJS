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

export default function StudentCourses() {
  return (
    <section className="container my-5">
      <Row>
        <ColWrapper lg="5">
          {/* Upcoming Lecture */}
          <section className="mb-6">
            <h2 className="text-xl font-bold text-blue-600">
              Upcoming Lecture
            </h2>

            <article
              style={{ backgroundColor: colors.primary }}
              className="r-card px-4 py-4 mt-4 d-flex align-items-center justify-content-between"
            >
              <div className="p-1 bg-white rounded-2">
                <time className="font-bold text-center text-blue-600">
                  10 - 12 <br />
                  Oct
                </time>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">Pneumatology 1</h2>
                <div className="d-flex align-items-center gap-3">
                  <Clock color="#fff" size={12} />
                  <time className="text-white">8:00AM - 9:00AM</time>
                </div>
              </div>

              <Link to={"/student/lecture/Pneumatology"}>
                <span
                  className="p-3 rounded-3"
                  style={{
                    backgroundColor: "#364C74",
                  }}
                >
                  <ChevronRight color="white" />
                </span>
              </Link>
            </article>
          </section>

          {/* Course Schedule */}
          <section className="mt-5 mb-5">
            <div className="d-flex justify-content-between">
              <h2 className="text-xl font-bold text-blue-600">
                My Course Schedule
              </h2>

              <Link to={"/"}>
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
              <EmptyNotifications />

              <p className="text-center">There are no Notifications</p>
            </CardWrapper>
          </section>
        </ColWrapper>
      </Row>
    </section>
  );
}
