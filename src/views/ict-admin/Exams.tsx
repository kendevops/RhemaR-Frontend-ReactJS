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

export default function Exams() {
  const [isCreatingExam, toggleCreatingExam] = useToggle();
  const [isCreatingQuiz, toggleCreatingQuiz] = useToggle();
  const [isQuizUploadOpen, toggleQuizUpload] = useToggle();
  const [isExamUploadOpen, toggleExamUpload] = useToggle();

  const { refetch } = useAllExams();
  const { refetch: refetchQuiz } = useAllQuizes();

  const tabs = ["Exams", "Quizes"];
  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];

  return (
    <>
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Exams & Quizes Management</div>
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
      {currentTab === "Exams" && (
        <>
          <div className="d-flex justify-content-between mb-5 align-items-center">
            <h1 className="text-bold">Exams</h1>
            <div className="d-flex  align-items-center gap-5 my-3">
              <button
                onClick={toggleExamUpload}
                className="btn btn-blue-800 btn-lg w-auto "
              >
                Upload Exam
              </button>
              <button
                onClick={toggleCreatingExam}
                className="btn btn-blue-800 btn-lg w-auto"
              >
                Create Exam
              </button>
            </div>

            <CreateExamModal
              isOpen={isCreatingExam}
              toggle={toggleCreatingExam}
            />
          </div>

          {/* Exams Table */}
          <ExamsTable />
        </>
      )}

      {currentTab === "Quizes" && (
        <>
          <div className="d-flex justify-content-between mb-5 align-items-center">
            <h1 className="text-bold">Quizes</h1>
            <div className="d-flex  align-items-center gap-5 my-3 ">
              <button
                onClick={toggleQuizUpload}
                className="btn btn-blue-800 btn-lg w-auto "
              >
                Upload Quiz
              </button>
              <button
                onClick={toggleCreatingQuiz}
                className="btn btn-blue-800 btn-lg w-auto"
              >
                Create Quiz
              </button>
            </div>

            <CreateQuizModal
              isOpen={isCreatingQuiz}
              toggle={toggleCreatingQuiz}
            />
          </div>

          {/* Quiz Table */}
          <QuizesTable />
        </>
      )}

      <UploadQuizModal
        isOpen={isQuizUploadOpen}
        toggle={toggleQuizUpload}
        refetch={refetchQuiz}
      />
      <UploadExamModal
        isOpen={isExamUploadOpen}
        toggle={toggleExamUpload}
        refetch={refetch}
      />
    </>
  );
}
//here
