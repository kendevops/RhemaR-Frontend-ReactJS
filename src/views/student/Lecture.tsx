import { Checkbox, colors } from "@material-ui/core";
import { Feedback } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { ArrowRight, Edit2 } from "react-feather";
import ReactPlayer from "react-player";
import { Link, useHistory, useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import Tab from "../../components/atoms/Tab";
import Timeline from "../../components/atoms/Timeline";
import AudioNoteIcon from "../../components/icons/AudioNote";
import PdfIcon from "../../components/icons/Pdf";
import Row from "../../components/layouts/Row";
import StudentFeedbackModal from "../../components/modals/StudentFeedbackModal";
import BackButton from "../../components/molecules/BackButton";
import CardWrapper from "../../components/students/CardWrapper";
import ClassDiscussion from "../../components/students/ClassDiscussion";
import ColWrapper from "../../components/students/ColWrapper";
import CourseOverview from "../../components/students/CourseOverview";
import useAttendClass from "../../hooks/mutations/classes/useAttendClass";
import useToggle from "../../utility/hooks/useToggle";
import downloadFile from "../../utils/downloadFile";

interface LectureParams {
  id: string;
}

const assignments = ["Reading Assignment.pdf", "Listening Assignment.mp3"];

const tabs = ["Course Overview"]; //"Class Discussion"
// const video = require("../../assets/videos/class.mp4");

export default function Lecture() {
  const params = useParams<LectureParams>();
  let router = useHistory();
  const className = "d-flex gap-4";

  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];

  const { mutate, isLoading } = useAttendClass(params?.id);
  const [data, setData] = useState<any>(null);
  const course = data?.class?.course;
  const sessions = course?.sections;
  const [watching, setWatching] = useState("");
  const currentSession = sessions?.find((s: any) => s?.videoUrl === watching);

  console.log({
    currentSession,
  });

  const [isOpen, toggle] = useToggle();
  const formValues = {
    level: "",
    course: "",
    instructor: "",
    studentName: "John Doe",
  };

  useEffect(() => {
    if (!params?.id) router?.goBack();

    if (data) return;

    // Fetch course data

    mutate(
      {
        section: "section 1",
        watchTime: "",
      },
      {
        onSuccess: (d) => {
          console.log("Gotten class data");
          setData(d);
          setWatching(sessions[0]?.videoUrl);
        },
      }
    );

    //authomatically mark attendance when the user reaches this page
  }, [params?.id, router, mutate, sessions, data]);

  useEffect(() => {
    if (!data) return;
    setWatching(sessions[0]?.videoUrl);
  }, [sessions, data]);

  //download button for courses

  return (
    <>
      <BackButton />
      <Row style={{ marginTop: "3rem" }}>
        {/* Left */}
        <ColWrapper lg="7">
          {isLoading && <Spinner />}
          {/* Video or Audio Player */}
          <section>
            <ReactPlayer url={watching} controls />
          </section>

          {/* Course overview and Discussion */}
          <CardWrapper>
            <Tab.Wrapper>
              {tabs?.map((t, i) => {
                return (
                  <Tab
                    key={t}
                    isSelected={t === currentTab}
                    tabColor={colors.green[500]}
                    onClick={() => setTab(i)}
                  >
                    {t}
                  </Tab>
                );
              })}
            </Tab.Wrapper>

            {currentTab === "Course Overview" && (
              <CourseOverview course={course} />
            )}
            {/* {currentTab === "Class Discussion" && (
              <ClassDiscussion course={params?.id} />
            )} */}
          </CardWrapper>
        </ColWrapper>

        {/* Right */}
        <ColWrapper lg="4">
          <CardWrapper className="d-flex flex-column gap-5">
            {/* Course Outline Sessions */}
            <article {...{ className }}>
              <Timeline />
              <div className="w-100">
                <h2 className="text-xl font-bold text-blue-600">
                  {course?.title}
                </h2>
                <ul className="no-padding-left">
                  {data &&
                    sessions?.map((s: any, i: number) => {
                      const value =
                        i <= 0 ? 100 : Math.round(Math.random() * 10); //change later

                      function handleWatch() {
                        setWatching(s?.videoUrl);
                      }

                      return (
                        <li
                          className="d-flex align-items-center justify-content-between"
                          key={s?.name}
                        >
                          <u
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={handleWatch}
                          >
                            {s?.name}
                          </u>

                          <div className="progress w-25">
                            <div
                              className="progress-bar progress-bar-animated bg-success "
                              role="progressbar"
                              style={{ width: `${value}%` }}
                              aria-valuenow={value}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            ></div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </article>

            {/* Course Materials */}
            <article {...{ className }}>
              <Timeline />
              <div>
                <h2 className="text-xl font-bold text-blue-600">
                  Course Materials
                </h2>

                <ul className="no-padding-left">
                  {currentSession &&
                    currentSession?.materials?.map((m: any) => {
                      const attributes = downloadFile(m?.path, m?.name);
                      let icon = <></>;

                      switch (m?.type) {
                        case "png":
                          icon = (
                            <img
                              alt={m?.name}
                              src={m?.path}
                              style={{
                                width: "20px",
                                height: "20px",
                              }}
                            />
                          );
                          break;
                        default:
                          icon = <PdfIcon />;
                      }

                      return (
                        <li key={m?.name}>
                          <a {...attributes} className={className}>
                            {icon}
                            {m?.name}
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </article>

            {/* Course Assignment */}
            <article {...{ className }}>
              <Timeline />
              <div>
                <h2 className="text-xl font-bold text-blue-600">
                  Course Assignment
                </h2>

                <ul className="no-padding-left">
                  {currentSession &&
                    currentSession?.assignments?.map((a: any) => {
                      const attributes = downloadFile(a?.path, a?.name);
                      let icon = <></>;

                      if (a?.name?.endsWith("mp3")) icon = <AudioNoteIcon />;
                      if (a?.name?.endsWith("pdf")) icon = <PdfIcon />;
                      if (a?.type === "jpg" || "png")
                        icon = (
                          <img
                            alt={a?.name}
                            src={a?.path}
                            style={{
                              width: "20px",
                              height: "20px",
                            }}
                          />
                        );

                      return (
                        <li key={a}>
                          <a {...attributes} className={className}>
                            {icon}
                            {a?.name}
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </article>

            {/* Exams and Attendance */}
            <article>
              <div className="d-flex align-items-center justify-content-between p-3 rounded-3 mb-3 bg-blue-200 ">
                Mark course attendance
                <Checkbox />
              </div>
              <Link
                to={`/student/exam/${course?.id}`}
                className="btn btn-blue-800 btn-lg w-100 mb-5 d-flex align-items-center justify-content-between"
              >
                <div className={className}>
                  <Edit2 color="#fff" />
                  <p>Take Exam</p>
                </div>

                <ArrowRight color="#fff" />
              </Link>

              {/* Student feedback modal */}
              <div>
                <button
                  onClick={toggle}
                  className="btn btn-blue-800 btn-lg w-100  d-flex align-items-center justify-content-between"
                >
                  Give Feedback <Feedback fill="#fff" />
                </button>
                <StudentFeedbackModal {...{ formValues, isOpen, toggle }} />
              </div>
            </article>
          </CardWrapper>
        </ColWrapper>
      </Row>
    </>
  );
}
