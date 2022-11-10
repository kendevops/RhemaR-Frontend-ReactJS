import { Checkbox, colors } from "@material-ui/core";
import { useEffect, useState } from "react";
import { ArrowRight, Edit2 } from "react-feather";
import ReactPlayer from "react-player";
import { Link, useHistory, useParams } from "react-router-dom";
import Tab from "../../components/atoms/Tab";
import Timeline from "../../components/atoms/Timeline";
import AudioNoteIcon from "../../components/icons/AudioNote";
import PdfIcon from "../../components/icons/Pdf";
import Row from "../../components/layouts/Row";
import BackButton from "../../components/molecules/BackButton";
import CardWrapper from "../../components/students/CardWrapper";
import ClassDiscussion from "../../components/students/ClassDiscussion";
import ColWrapper from "../../components/students/ColWrapper";
import CourseOverview from "../../components/students/CourseOverview";

interface LectureParams {
  id: string;
}

const materials = ["Course Material", "Course Material"];
const assignments = ["Reading Assignment.pdf", "Listening Assignment.mp3"];

const sessions = [
  "Session 1",
  "Session 2",
  "Session 3",
  "Session 4",
  "Session 5",
  "Session 6",
  "Session 7",
  "Session 8",
  "Session 9",
  "Session 10",
];

const tabs = ["Course Overview", "Class Discussion"];

export default function Lecture() {
  const params = useParams<LectureParams>();
  let router = useHistory();
  const className = "d-flex gap-4";
  const sessionData = sessions;

  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];

  const video = require("../../assets/videos/class.mp4");

  useEffect(() => {
    params?.id ? console.log(params?.id) : router?.goBack();
  }, [params?.id, router]);

  //authomatically mark attendance when the user reaches this page

  //download button for courses

  return (
    <>
      <BackButton />
      <Row style={{ marginTop: "3rem" }}>
        {/* Left */}
        <ColWrapper lg="7">
          {/* Video or Audio Player */}
          <section>
            <ReactPlayer url={video} controls />
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
              <CourseOverview course={params?.id} />
            )}
            {currentTab === "Class Discussion" && (
              <ClassDiscussion course={params?.id} />
            )}
          </CardWrapper>
        </ColWrapper>

        {/* Right */}
        <ColWrapper lg="4">
          <CardWrapper className="d-flex flex-column gap-5">
            {/* Course Outline Sessions */}
            <article {...{ className }}>
              <Timeline />
              <div>
                <h2 className="text-xl font-bold text-blue-600">
                  {params?.id}
                </h2>
                <ul className="no-padding-left">
                  {sessionData?.map((s) => {
                    return (
                      <li key={s}>
                        <u>{s}</u>
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
                  {materials?.map((m) => {
                    return (
                      <li className={className} key={m}>
                        <PdfIcon />
                        {m}
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
                  {assignments?.map((a) => {
                    const isAudio = a.endsWith("mp3");
                    return (
                      <li className={className} key={a}>
                        {isAudio ? <AudioNoteIcon /> : <PdfIcon />}
                        {a}
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
                to={`/student/exam/${params?.id}`}
                className="btn btn-blue-800 btn-lg w-100 mb-5 d-flex align-items-center justify-content-between"
              >
                <div className={className}>
                  <Edit2 color="#fff" />
                  <p>Take Exam</p>
                </div>

                <ArrowRight color="#fff" />
              </Link>
            </article>
          </CardWrapper>
        </ColWrapper>
      </Row>
    </>
  );
}
