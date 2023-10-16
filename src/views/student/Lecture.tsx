import { Checkbox, colors } from "@material-ui/core";
import { Feedback } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { ArrowRight, Edit2 } from "react-feather";
import ReactPlayer from "react-player";
import { Link, useHistory, useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import { BsFillCheckCircleFill, BsFillPlayCircleFill } from "react-icons/bs";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { GoPlay } from "react-icons/go";
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
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import { Icon } from "@iconify/react";
import { FaCalendarAlt } from "react-icons/fa";
import LectureButton from "../../components/general/lectureButton";
import ElearningInstructor from "../../components/students/ElearningInstructor";

interface LectureParams {
  id: string;
}

// https://soundcloud.com/miami-nights-1984/accelerated  audio url

const assignments = ["Reading Assignment.pdf", "Listening Assignment.mp3"];

const tabs = ["Course Overview", "E-Learning Instructor", "Course Chat"];
const playTabs = ["Session 2: Audio", "Session 2: Video"];

// const video = require("../../assets/videos/class.mp4");

export default function Lecture() {
  const params = useParams<LectureParams>();
  let router = useHistory();
  const className = "d-flex gap-4";

  const id = params?.id;

  const [eachSessionOverView, setEachSessionOverView] = useState("");

  const [tab, setTab] = useState(0);
  const [playTab, setPlayTab] = useState(0);
  const currentTab = tabs[tab];
  const currentPlayTab = playTabs[playTab];

  const { mutate, isLoading } = useAttendClass(params?.id);
  const [data, setData] = useState<any>(null);
  const course = data?.class?.course;
  const instructor = data?.class?.instructor;
  const sessions = course?.sections;
  const [watching, setWatching] = useState("");
  const [isCompletted, setIsCompletted] = useState(false);

  const { data: userData, isLoading: userLoading } = useCurrentUser();

  console.log(sessions);

  const currentSession = sessions?.find((s: any) => s?.videoUrl === watching);

  console.log(data);

  const classId = data?.class?.id;

  const [isOpen, toggle] = useToggle();
  const formValues = {
    level: "",
    course: "",
    instructor: "",
    studentName: "John Doe",
  };

  console.log(course?.exams[0].id);

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
          console.log("Gotten class data", d);
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

  console.log(sessions);

  return (
    <div className=" ">
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
        <div>{`${userData?.campus?.name}`}</div>
      </div>
      <BackButton />
      <Row style={{ marginTop: "3rem" }}>
        {/* Left */}
        <ColWrapper lg="7">
          {isLoading && <Spinner />}
          {/* Video or Audio Player */}
          {data?.class?.status == "ongoing" && (
            <section>
              <div className="mb-5">
                <Tab.Wrapper>
                  {playTabs?.map((t, i) => {
                    return (
                      <Tab
                        key={t}
                        isSelected={t === currentPlayTab}
                        tabColor={colors.green[500]}
                        onClick={() => setPlayTab(i)}
                      >
                        {t}
                      </Tab>
                    );
                  })}
                </Tab.Wrapper>
              </div>

              {currentPlayTab.includes("Video") && (
                <div
                  style={{
                    position: "relative",
                    paddingTop: "56.25%" /* Player ratio: 100 / (1280 / 720) */,
                  }}
                >
                  <ReactPlayer
                    url={watching}
                    controls
                    width="100%"
                    height="100%"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                </div>
              )}

              {currentPlayTab.includes("Audio") && (
                <div
                  style={{
                    position: "relative",
                    paddingTop: "56.25%" /* Player ratio: 100 / (1280 / 720) */,
                  }}
                >
                  <ReactPlayer
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                    url={"https://soundcloud.com/miami-nights-1984/accelerated"}
                    controls
                    width="100%"
                    height="100%"
                  />
                </div>
              )}
            </section>
          )}

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
              <CourseOverview course={course} overView={eachSessionOverView} />
            )}
            {currentTab === "E-Learning Instructor" && (
              <ElearningInstructor instructor={instructor} />
            )}
            {/* {currentTab === "Class Discussion" && (
              <ClassDiscussion course={params?.id} />
            )} */}
          </CardWrapper>
        </ColWrapper>

        {/* Right */}

        <ColWrapper lg="4">
          <div>
            <div className="bg-white position-relative ">
              <div
                style={{
                  position: "absolute",
                  top: "-80px",
                  left: 0,
                  fontSize: "18px",
                }}
              >
                {data?.class?.status == "ongoing" && (
                  <div>
                    <div className="d-flex align-items-center gap-3">
                      <FaCalendarAlt />
                      <div>Start Date: 30th April 2023</div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <FaCalendarAlt />
                      <div>End Date: 30th April 2023</div>
                    </div>
                  </div>
                )}
                {data?.class?.status !== "ongoing" && (
                  <div className="d-flex align-items-center gap-3">
                    <FaCalendarAlt />
                    <div>Date Of Course: 30th April 2023</div>
                  </div>
                )}
              </div>
              {data?.class?.status == "ongoing" && (
                <>
                  <div className="bg-blue-800 w-100 px-5 text-white py-3 text-2xl">
                    Course Session
                  </div>
                  <div className="px-5 py-4 ">
                    {data &&
                      sessions?.map((s: any, i: number) => {
                        const value =
                          i <= 0 ? 100 : Math.round(Math.random() * 10); //change later

                        // setEachSessionOverView(s.overView);

                        function handleWatch() {
                          setWatching(s?.videoUrl);
                        }

                        return (
                          <div className="" key={s?.name}>
                            {s?.name === currentSession?.name ? (
                              <div
                                className="my-3 d-flex align-items-center justify-content-between w-100 "
                                style={{
                                  // color:
                                  //   s?.name === currentSession?.name ? "green" : "",
                                  fontSize: "25px",
                                }}
                              >
                                <div className="d-flex align-items-center  gap-4 ">
                                  <BsFillCheckCircleFill
                                    style={{ color: "green" }}
                                  />
                                  <p
                                    className=" mt-2"
                                    style={{ fontSize: "25px" }}
                                  >
                                    {s?.name}
                                  </p>
                                </div>
                                <BsFillPlayCircleFill />
                              </div>
                            ) : (
                              <div
                                className="my-3 d-flex align-items-center justify-content-between w-100 text-blue-800"
                                style={{
                                  fontSize: "25px",
                                  cursor: "pointer",
                                }}
                                onClick={handleWatch}
                              >
                                <div className="d-flex align-items-center  gap-4 ">
                                  <MdOutlineRadioButtonUnchecked />
                                  <p
                                    className=" mt-2"
                                    style={{ fontSize: "25px" }}
                                  >
                                    {s?.name}
                                  </p>
                                </div>
                                <GoPlay />
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </div>

            <div className="my-5">
              {data?.class?.status == "ongoing" && (
                <>
                  <div>
                    <button
                      onClick={toggle}
                      className="btn btn-blue-800 btn-lg w-100  d-flex align-items-center justify-content-between"
                    >
                      Give Feedback <Feedback fill="#fff" />
                    </button>
                    <StudentFeedbackModal
                      {...{ formValues, isOpen, toggle, courseId: classId }}
                    />
                  </div>
                  <LectureButton text={"Course Feedback"} id={`feedback`} />
                  <LectureButton
                    text={"Course Exams"}
                    done={true}
                    id={`exam/${course?.exams[0]?.id}`}
                  />
                  <LectureButton
                    text={"Listening Assignment"}
                    done={true}
                    id={`lecture-listening-assignment/${id}`}
                  />
                  <LectureButton
                    text={"Course Assignments"}
                    done={true}
                    id={`lecture-assignments/${id}`}
                  />
                </>
              )}
              <LectureButton
                text={"Course Material"}
                done={true}
                id={`lecture-material/${id}`}
              />
              <LectureButton
                text={"Course Quizes"}
                done={true}
                id={`lecture-quizes/${id}`}
              />
            </div>
          </div>
        </ColWrapper>
        {/* 
        <ColWrapper lg="4">
          <CardWrapper className="d-flex flex-column gap-5"> */}
        {/* <article {...{ className }}>
             
              <div className="w-100">
                <div className="no-padding-left">
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
                          {s?.name === currentSession?.name ? (
                            <p
                              className="my-3"
                              style={{
                                color:
                                  s?.name === currentSession?.name
                                    ? "green"
                                    : "",
                              }}
                            >
                              {s?.name}
                            </p>
                          ) : (
                            <p
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={handleWatch}
                            >
                              {s?.name}
                            </p>
                          )}

                          
                        </li>
                      );
                    })}
                </div>
              </div>
            </article> */}

        {/* Course Materials */}
        {/* <article {...{ className }}>
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
            </article> */}

        {/* Course Assignment */}
        {/* <article {...{ className }}>
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
            </article> */}

        {/* Course Exams */}
        {/* <article {...{ className }}>
              <Timeline />
              <div className="w-100">
                <h2 className="text-xl font-bold text-blue-600">Exams</h2>
                <ul className="no-padding-left">
                  {!!course?.exams &&
                    course?.exams?.map((ex: any) => {
                      return (
                        <li
                          className="d-flex align-items-center justify-content-between"
                          key={ex?.id}
                        >
                          <h3>{ex?.name}</h3>
                          <Link to={`/student/exam/${ex?.id}`}>
                            <u>Take Exam</u>
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </article> */}

        {/* Feedback and Attendance */}
        {/* <article> */}
        {/* <div className="d-flex align-items-center justify-content-between p-3 rounded-3 mb-3 bg-blue-200 ">
                Mark course attendance
                <Checkbox />
              </div> */}

        {/* Student feedback modal */}
        {/* <div>
                <button
                  onClick={toggle}
                  className="btn btn-blue-800 btn-lg w-100  d-flex align-items-center justify-content-between"
                >
                  Give Feedback <Feedback fill="#fff" />
                </button>
                <StudentFeedbackModal
                  {...{ formValues, isOpen, toggle, courseId: classId }}
                />
              </div>
            </article> */}
        {/* </CardWrapper>
        </ColWrapper> */}
      </Row>
    </div>
  );
}
