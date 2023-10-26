import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useHistory, useParams } from "react-router-dom";
import BackButton from "../../components/molecules/BackButton";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import Tab from "../../components/atoms/Tab";
import useToggle from "../../utility/hooks/useToggle";
import useCourse from "../../hooks/queries/classes/useCourse";
import { toast } from "react-toastify";
import ToastContent from "../../components/molecules/ToastContent";
import handleError from "../../utils/handleError";
import useAllExams from "../../hooks/queries/classes/useAllExams";
import QuestionInput from "../../components/molecules/QuestionInput";
import useCreateExamQuestion from "../../hooks/mutations/exams/useCreateExamQuestuions";
import { RiDeleteBin6Line } from "react-icons/ri";
import FAQCard from "../../components/general/FAQCard";

interface LectureParams {
  id: string;
}

type ExamDetailsProps = {
  data?: any;
};

export default function ExamDetails({ data: ExamData }: ExamDetailsProps) {
  const params = useParams<LectureParams>();
  let router = useHistory();
  const { data: userData, isLoading: userLoading } = useCurrentUser();
  const [isAddingQuestion, toggleAddQuestion] = useToggle();

  const {
    data: examData,
    isLoading,
    refetch,
  } = useAllExams({ examId: params?.id });

  const examData2 = examData?.nodes[0];

  console.log(examData2);

  const initialQuestion = {
    examId: examData2?.id,
    text: "No Question",
    score: "",
    isActive: true,
    answer: "",
    options: [],
  };
  const [questions, setQuestions] = useState([initialQuestion]);
  const { mutate, isLoading: isCreatingQuestions } = useCreateExamQuestion();

  // const [data, setData] = useState<any>(null);
  const [tab, setTab] = useState(0);

  let Tabs = ["Exam Info", "Exam Questions"];

  const currentTab = Tabs[tab];

  function addData() {
    setQuestions((p: any) => {
      return [...p, initialQuestion];
    });
  }

  function add5Data() {
    setQuestions((p: any) => {
      return [
        ...p,
        initialQuestion,
        initialQuestion,
        initialQuestion,
        initialQuestion,
        initialQuestion,
      ];
    });
  }

  function removeData(index: number) {
    setQuestions((p: any) => {
      return p?.filter((_: any, i: number) => i !== index);
    });
  }
  function handleSubmit(e: FormEvent) {
    e?.preventDefault();

    const questionsData = questions[0];

    console.log(questionsData, questions);

    // Creating
    if (questionsData) {
      mutate(questionsData, {
        onSuccess: (e) => {
          console.log(e);

          toast.success(
            <ToastContent
              heading={"Successful"}
              message={"Exam Questions added successfully"}
              type={"success"}
            />,
            ToastContent.Config
          );
          refetch();
          toggleAddQuestion();
        },
        onError: (e: any) => {
          handleError(e);
        },
      });
    }
  }

  return (
    <div className=" ">
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>{examData2?.name ?? ""}</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>Exam Details</div>
      </div>
      <BackButton />

      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="my-4">
              <div className="d-flex  gap-5 align-items-center ">
                <Tab.Wrapper className="d-flex gap-3">
                  {Tabs?.map((t, i) => {
                    return (
                      <Tab
                        key={t}
                        tabColor="#203864"
                        isSelected={currentTab === t}
                        onClick={() => {
                          setTab(i);
                        }}
                      >
                        {t}
                      </Tab>
                    );
                  })}
                </Tab.Wrapper>

                <div
                  className="py-2 px-5  fw-bold "
                  style={{
                    background: "#203864",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => toggleAddQuestion()}
                >
                  + Add Exam Questions
                </div>
              </div>

              {!isLoading && (
                <div className="my-5">
                  {currentTab === "Exam Info" && (
                    <div className="d-flex flex-column gap-5">
                      <h1>Name: {examData2?.name}</h1>
                      <h2>Score: {examData2?.score}</h2>
                      <p>
                        Starts at:{" "}
                        {new Date(examData2?.startsAt)?.toDateString()}
                      </p>
                      <p>
                        Ends at: {new Date(examData2?.endsAt)?.toDateString()}
                      </p>
                      <h3>Course: {examData2?.course?.name}</h3>
                      <h3>Session: {examData2?.session?.name}</h3>
                      <h3>RD No: {examData2?.rdNo}</h3>
                    </div>
                  )}
                  {currentTab === "Exam Questions" && (
                    <div className="d-flex  flex-wrap align-items-center gap-4 justify-content-between ">
                      {examData2?.questions?.map((q: any, i: number) => {
                        return (
                          <>
                            {/* <FAQCard data={q} /> */}

                            <div key={q?.id} className="shadow p-3">
                              <h2>{`Question ${i + 1}: ${q.text}`}</h2>
                              <h2>{`Score: ${q.score}`}</h2>
                              <ol>
                                Option:{" "}
                                {q?.options?.map((op: string, ind: number) => (
                                  <li key={ind}>{op}</li>
                                ))}
                              </ol>
                              <p>{`Answer: ${q.answer}`}</p>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </>

      {/* Questions */}

      <Modal
        centered
        isOpen={isAddingQuestion}
        toggle={toggleAddQuestion}
        // {...{ isAddingQuestion, toggleAddQuestion }}
        fullscreen
        id="examModal"
      >
        <ModalHeader toggle={toggleAddQuestion}>
          {"Add Exam Questions"}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div>
              {questions?.map((q: any, i: number) => {
                function handleQuestionChange(
                  e: ChangeEvent<HTMLInputElement>,
                  type: "question" | "answer" | "score"
                ) {
                  setQuestions((prev: any) => {
                    if (type === "question") prev[i].text = e?.target?.value;
                    if (type === "answer") prev[i].answer = e?.target?.value;
                    if (type === "score") prev[i].score = +e?.target?.value;

                    return prev;
                  });
                }

                function handleOptionChange(opt: number, val: string) {
                  setQuestions((prev: any) => {
                    prev[i].options[opt] = val;
                    return prev;
                  });
                }
                return (
                  <>
                    <QuestionInput
                      key={q.id}
                      serialNumber={i + 1}
                      onChangeQuestion={(e) =>
                        handleQuestionChange(e, "question")
                      }
                      onChangeOption={handleOptionChange}
                      onChangeAnswer={(e) => handleQuestionChange(e, "answer")}
                      onChangeScore={(e) => handleQuestionChange(e, "score")}
                    />
                    {i > 0 && (
                      <RiDeleteBin6Line
                        style={{
                          cursor: "pointer",
                          fontSize: "23px",
                          color: "red",
                          marginTop: "-5px",
                        }}
                        onClick={() => removeData(i)}
                      />
                    )}
                  </>
                );
              })}
              <div className="d-flex justify-content-between align-items-center my-4 ">
                <button
                  onClick={() => add5Data()}
                  className="btn btn-blue-800 btn-lg w-25"
                  type="button"
                >
                  Add 5 more questions
                </button>

                <button
                  onClick={() => addData()}
                  className="btn btn-blue-800 btn-lg w-25"
                  type="button"
                >
                  Add 1 more question
                </button>
              </div>
            </div>

            {/* submit button */}
            {isCreatingQuestions && <Spinner />}
            <button type="submit" className="btn btn-lg  btn-blue-800">
              {"Submit Questions"}
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
