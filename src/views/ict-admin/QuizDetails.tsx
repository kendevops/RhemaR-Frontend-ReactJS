import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useHistory, useParams } from "react-router-dom";
import BackButton from "../../components/molecules/BackButton";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import Tab from "../../components/atoms/Tab";
import useToggle from "../../utility/hooks/useToggle";
import { toast } from "react-toastify";
import ToastContent from "../../components/molecules/ToastContent";
import handleError from "../../utils/handleError";
import useAllExams from "../../hooks/queries/classes/useAllExams";
import QuestionInput from "../../components/molecules/QuestionInput";
import useAllQuizes from "../../hooks/queries/classes/useAllQuizes";
import useCreateQuizQuestion from "../../hooks/mutations/exams/useCreateQuizQuestions";

interface LectureParams {
  id: string;
}

export default function ExamDetails() {
  const params = useParams<LectureParams>();
  let router = useHistory();
  const [isAddingQuestion, toggleAddQuestion] = useToggle();

  const { data, isLoading, refetch } = useAllQuizes({ quizId: params?.id });

  const quizData = data?.nodes[0];

  console.log(quizData);
  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState(
    Array.from(Array(numQuestions).keys())?.map((val, ind) => {
      return {
        quizId: quizData?.id,
        text: "questiontest2" + `${ind}`,
        score: 1,
        isActive: true,
        answer: "a",
        options: ["a", "b", "c", "d"],
      };
    })
  );
  const { mutate, isLoading: isCreatingQuestions } = useCreateQuizQuestion();

  useEffect(() => {
    refetch();
  }, [params?.id]);

  // const [data, setData] = useState<any>(null);
  const [tab, setTab] = useState(0);

  let Tabs = ["Quiz Info", "Quiz Questions"];

  const currentTab = Tabs[tab];

  function handleSubmit(e: FormEvent) {
    e?.preventDefault();

    const questionsData = questions;

    console.log(questionsData);

    // Creating
    if (questionsData) {
      mutate(
        { questions: questionsData },
        {
          onSuccess: (e) => {
            console.log(e);

            e?.data?.data?.results?.map((e: any) => {
              if (!e?.success) {
                toast.error(
                  <ToastContent
                    type={"error"}
                    heading={"Error Adding Questions"}
                    message={e?.error}
                  />
                );
              } else {
                toast.success(
                  <ToastContent
                    type={"success"}
                    heading={"Students added"}
                    message={"The question has been added successfully"}
                  />
                );
                refetch();
                toggleAddQuestion();
              }
            });
          },
          onError: (e: any) => {
            handleError(e);
          },
        }
      );
    }
  }

  return (
    <div className=" ">
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>{quizData?.name ?? ""}</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>Quiz Details</div>
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
                  {currentTab === "Quiz Info" && (
                    <div className="d-flex flex-column gap-5">
                      <h1>Name: {quizData?.name}</h1>
                      <h2>Score: {quizData?.score}</h2>
                      <p>
                        Starts at:{" "}
                        {new Date(quizData?.startsAt)?.toDateString()}
                      </p>
                      <p>
                        Ends at: {new Date(quizData?.endsAt)?.toDateString()}
                      </p>
                      <h3>Course: {quizData?.course?.name}</h3>
                      <h3>Session: {quizData?.session?.name}</h3>
                      <h3>RD No: {quizData?.rdNo}</h3>
                    </div>
                  )}
                  {currentTab === "Quiz Questions" && (
                    <div className="d-flex  flex-wrap align-items-center gap-4 justify-content-between ">
                      {quizData?.questions?.map((q: any, i: number) => {
                        return (
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
          {"Add Quiz Questions"}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div>
              {questions?.map((_: any, i: number) => {
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
                  <QuestionInput
                    key={i + 1}
                    serialNumber={i + 1}
                    onChangeQuestion={(e) =>
                      handleQuestionChange(e, "question")
                    }
                    onChangeOption={handleOptionChange}
                    onChangeAnswer={(e) => handleQuestionChange(e, "answer")}
                    onChangeScore={(e) => handleQuestionChange(e, "score")}
                  />
                );
              })}
              <div className="d-flex justify-content-between align-items-center my-4 ">
                <button
                  onClick={() => {
                    setNumQuestions((prev: any) => prev + 5);
                    setQuestions(
                      // defaultValues?.questions ??
                      Array.from(Array(numQuestions).keys())?.map(
                        (val, ind) => {
                          return {
                            quizId: quizData?.id,
                            text: "questiontest2" + `${ind}`,
                            score: 1,
                            isActive: true,
                            answer: "a",
                            options: ["a", "b", "c", "d"],
                          };
                        }
                      )
                    );
                  }}
                  className="btn btn-blue-800 btn-lg w-25"
                  type="button"
                >
                  Add 5 more questions
                </button>

                <button
                  onClick={() => {
                    setNumQuestions((prev: any) => prev + 1);
                    setQuestions(
                      // defaultValues?.questions ??
                      Array.from(Array(numQuestions).keys())?.map(
                        (val, ind) => {
                          return {
                            quizId: quizData?.id,
                            text: "questiontest2" + `${ind}`,
                            score: 1,
                            isActive: true,
                            answer: "a",
                            options: ["a", "b", "c", "d"],
                          };
                        }
                      )
                    );
                  }}
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
