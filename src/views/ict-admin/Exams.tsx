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
import { MdOutlineCancel } from "react-icons/md";

type FiltersExamProps = {
  [key: string]: string | undefined;
  levelId?: string;
  examId?: string;
  courseId?: string;
};

type FiltersQuizProps = {
  [key: string]: string | undefined;
  levelId?: string;
  quizId?: string;
  courseId?: string;
};
export default function Exams() {
  const [isCreatingExam, toggleCreatingExam] = useToggle();
  const [isCreatingQuiz, toggleCreatingQuiz] = useToggle();
  const [isQuizUploadOpen, toggleQuizUpload] = useToggle();
  const [isExamUploadOpen, toggleExamUpload] = useToggle();

  const [isFilteringExam, toggleFilteringExam] = useToggle();
  const [filtersExam, setFiltersExam] = useState<FiltersExamProps>({});
  const [filteringExam, setFilteringExam] = useState(false);

  const [isFilteringQuiz, toggleFilteringQuiz] = useToggle();
  const [filtersQuiz, setFiltersQuiz] = useState<FiltersQuizProps>({});
  const [filteringQuiz, setFilteringQuiz] = useState(false);

  const { refetch } = useAllExams();
  const { refetch: refetchQuiz } = useAllQuizes();

  const tabs = ["Exams", "Quizes"];
  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];

  const removeFilterExam = (keyToRemove: string) => {
    setFiltersExam((prevFilters) => {
      const newFilters: any = { ...prevFilters };

      if (keyToRemove in newFilters) {
        delete newFilters[keyToRemove];
        delete newFilters[`${keyToRemove}Id`];
      }

      if (Object.keys(filtersExam).length < 2) {
        setFilteringExam(false);
      }

      return newFilters;
    });
  };

  const removeFilterQuiz = (keyToRemove: string) => {
    setFiltersQuiz((prevFilters) => {
      const newFilters: any = { ...prevFilters };

      if (keyToRemove in newFilters) {
        delete newFilters[keyToRemove];
        delete newFilters[`${keyToRemove}Id`];
      }

      if (Object.keys(filtersQuiz).length < 2) {
        setFilteringQuiz(false);
      }
      refetchQuiz();

      return newFilters;
    });
  };

  return (
    <>
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Exams & Quizes Management</div>
        {filteringExam ||
          (filteringQuiz && (
            <div
              className=" bg-white "
              style={{ width: "2px", height: "20px" }}
            ></div>
          ))}

        {filteringExam || (filteringQuiz && <div>Filtered List</div>)}
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
                className="btn btn-outline-info btn-lg "
                style={{ width: "fit-content", height: "50px" }}
                onClick={() => {
                  toggleFilteringExam();
                }}
              >
                Filter
              </button>
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

          {filteringExam && (
            <div className="d-flex gap-4 ">
              {Object.keys(filtersExam)
                .filter((k) => !k?.includes("Id"))
                .map((key: string) => (
                  <div key={key} className="">
                    <p
                      className=" py-3 px-4 rounded-5 d-flex align-items-center  gap-2 "
                      style={{ background: "#f0f0f0" }}
                    >
                      <p style={{ textAlign: "center" }} className="mt-1">
                        {filtersExam[key]}
                      </p>
                      <MdOutlineCancel
                        className="mb-2"
                        onClick={() => removeFilterExam(key)}
                      />
                    </p>
                  </div>
                ))}
            </div>
          )}

          {/* Exams Table */}
          <ExamsTable
            toggle={toggleFilteringExam}
            isOpen={isFilteringExam}
            filters={filtersExam}
            setFiltering={setFilteringExam}
            setFilters={setFiltersExam}
          />
        </>
      )}

      {currentTab === "Quizes" && (
        <>
          <div className="d-flex justify-content-between mb-5 align-items-center">
            <h1 className="text-bold">Quizes</h1>
            <div className="d-flex  align-items-center gap-5 my-3 ">
              <button
                className="btn btn-outline-info btn-lg "
                style={{ width: "fit-content", height: "50px" }}
                onClick={() => {
                  toggleFilteringQuiz();
                }}
              >
                Filter
              </button>
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

          {filteringQuiz && (
            <div className="d-flex gap-4 ">
              {Object.keys(filtersQuiz)
                .filter((k) => !k?.includes("Id"))
                .map((key: string) => (
                  <div key={key} className="">
                    <p
                      className=" py-3 px-4 rounded-5 d-flex align-items-center  gap-2 "
                      style={{ background: "#f0f0f0" }}
                    >
                      <p style={{ textAlign: "center" }} className="mt-1">
                        {filtersQuiz[key]}
                      </p>
                      <MdOutlineCancel
                        className="mb-2"
                        onClick={() => removeFilterQuiz(key)}
                      />
                    </p>
                  </div>
                ))}
            </div>
          )}

          {/* Quiz Table */}
          <QuizesTable
            toggle={toggleFilteringQuiz}
            isOpen={isFilteringQuiz}
            filters={filtersQuiz}
            setFiltering={setFilteringQuiz}
            setFilters={setFiltersQuiz}
          />
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
