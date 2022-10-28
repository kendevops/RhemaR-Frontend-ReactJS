import { colors } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Tab from "../../components/atoms/Tab";
import Row from "../../components/layouts/Row";
import BackButton from "../../components/molecules/BackButton";
import CardWrapper from "../../components/students/CardWrapper";
import ClassDiscussion from "../../components/students/ClassDiscussion";
import ColWrapper from "../../components/students/ColWrapper";
import CourseOverview from "../../components/students/CourseOverview";

interface LectureParams {
  id: string;
}

const tabs = ["Course Overview", "Class Discussion"];

export default function Lecture() {
  const params = useParams<LectureParams>();
  let router = useHistory();

  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];

  useEffect(() => {
    params?.id ? router?.goBack() : console.log(params?.id);
  }, [params?.id, router]);

  return (
    <>
      <BackButton />
      <Row style={{ marginTop: "3rem" }}>
        <ColWrapper lg="7">
          {/* Video or Audio Player */}
          <section></section>

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

            {currentTab === "Course Overview" && <CourseOverview course="" />}
            {currentTab === "Class Discussion" && <ClassDiscussion course="" />}
          </CardWrapper>
        </ColWrapper>
        <ColWrapper lg="4">
          <CardWrapper>
            {/* Course Outline Sessions */}
            <div></div>

            {/* Course Materials */}
            <div></div>

            {/* Course Assignment */}
            <div></div>

            {/* Exams and Attendance */}
            <div></div>
          </CardWrapper>
        </ColWrapper>
      </Row>
    </>
  );
}
