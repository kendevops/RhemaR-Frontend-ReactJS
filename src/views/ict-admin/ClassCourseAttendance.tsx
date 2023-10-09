import { Icon } from "@iconify/react";
import CreateExamModal from "../../components/modals/CreateExamModal";
import ExamsTable from "../../components/tables/admin-tables/ExamsTable";
import useToggle from "../../utility/hooks/useToggle";
import Tab from "../../components/atoms/Tab";
import { useState } from "react";
import CreateQuizModal from "../../components/modals/CreateQuizModal";
import QuizesTable from "../../components/tables/admin-tables/QuizTable";
import UploadExamModal from "../../components/modals/UploadExamModal";
import useAllExams from "../../hooks/queries/classes/useAllExams";
import useAllQuizes from "../../hooks/queries/classes/useAllQuizes";
import UploadQuizModal from "../../components/modals/UploadQuizModal";
import useAllClassesAttendance from "../../hooks/queries/classes/useAllClassAttendance";

export default function ClassCourseAttendance() {
  const [isCreatingClassAttendance, toggleCreatingClassAttendance] =
    useToggle();
  const [isCreatingCourseAttendance, toggleCreatingCourseAttendance] =
    useToggle();
  const [isQuizUploadOpen, toggleQuizUpload] = useToggle();
  const [isExamUploadOpen, toggleExamUpload] = useToggle();

  const { refetch } = useAllClassesAttendance();
  const { refetch: refetchQuiz } = useAllQuizes();

  const tabs = ["Class", "Course"];
  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];

  return (
    <>
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Class & Course Attendance</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
      </div>
      <Tab.Wrapper>
        {tabs?.map((t, i) => {
          return (
            <Tab
              key={t}
              onClick={() => setTab(i)}
              tabColor="#203864"
              isSelected={currentTab === t}
            >
              {t}
            </Tab>
          );
        })}
      </Tab.Wrapper>
      {currentTab === "Class" && (
        <>
          <div className="d-flex justify-content-between mb-5 align-items-center">
            <h1 className="text-bold">Class</h1>
            <div className="d-flex  align-items-center gap-5 ">
              <button
                onClick={() => {}}
                className="btn btn-blue-800 btn-lg w-auto "
              >
                Upload Class
              </button>
              <button
                onClick={() => {}}
                className="btn btn-blue-800 btn-lg w-auto"
              >
                Create Class Attendance
              </button>
            </div>

            <CreateExamModal
              isOpen={isCreatingClassAttendance}
              toggle={() => {}}
            />
          </div>

          {/* Exams Table */}
          <ExamsTable />
        </>
      )}

      {currentTab === "Course" && (
        <>
          <div className="d-flex justify-content-between mb-5 align-items-center">
            <h1 className="text-bold">Course</h1>
            <div className="d-flex  align-items-center gap-5 ">
              <button
                onClick={() => {}}
                className="btn btn-blue-800 btn-lg w-auto "
              >
                Upload Quiz
              </button>
              <button
                onClick={() => {}}
                className="btn btn-blue-800 btn-lg w-auto"
              >
                Create Course Attendance
              </button>
            </div>

            <CreateQuizModal
              isOpen={isCreatingCourseAttendance}
              toggle={() => {}}
            />
          </div>

          {/* Quiz Table */}
          <QuizesTable />
        </>
      )}

      <UploadQuizModal
        isOpen={isQuizUploadOpen}
        toggle={() => {}}
        refetch={refetchQuiz}
      />
      <UploadExamModal
        isOpen={isExamUploadOpen}
        toggle={() => {}}
        refetch={refetch}
      />
    </>
  );
}
//here
