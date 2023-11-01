import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useHistory, useParams } from "react-router-dom";
import BackButton from "../../components/molecules/BackButton";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import useSubmitQuiz from "../../hooks/mutations/exams/useSubmitQuiz";
import handleError from "../../utils/handleError";
import { toast } from "react-toastify";
import ToastContent from "../../components/molecules/ToastContent";
import useStartQuiz from "../../hooks/queries/classes/useStartQuiz";

interface LectureParams {
  id: string;
}

export default function LectureQuizes() {
  const params = useParams<LectureParams>();
  let router = useHistory();
  const { data: userData, isLoading: userLoading } = useCurrentUser();
  const { mutate, isLoading: submitIsLoading } = useSubmitQuiz(params?.id);

  const { data, isLoading } = useStartQuiz(params?.id);

  console.log(data);

  // const quiz = {
  //   id: "652fd41db74083ba7d20d6ab",
  //   rdNo: 2048114,
  //   name: "Math Exam",
  //   score: 100,
  //   endsAt: "2023-12-01T00:00:00.000Z",
  //   startsAt: "2023-10-01T09:00:00.000Z",
  //   duration: 67,
  //   course: {
  //     id: "651b0cf7c784e6f1e1b0907c",
  //     name: "Prayer Principle",
  //   },
  //   session: {
  //     id: "6518a058db94e9a5e84710d8",
  //     name: "2022/2023",
  //   },
  //   questions: [
  //     {
  //       id: "652fd41db74083ba7d20d6af",
  //       text: "What is 3 x 7?",
  //       score: 29,
  //       options: ["15", "20", "21", "23"],
  //       answer: "21",
  //       isActive: true,
  //     },
  //     {
  //       id: "652fd41db74083ba7d20d6ad",
  //       text: "What is 2 + 2? QuestionQuestion Question Question Question Question Questionv Question Question Question v Question Question Question Question v",
  //       score: 13,
  //       options: ["3", "4", "5", "6"],
  //       answer: "4",
  //       isActive: true,
  //     },
  //     {
  //       id: "653faff64e538fb36a5d6e9d",
  //       text: "what?",
  //       score: 2,
  //       options: ["Yes", "No"],
  //       answer: "Yes",
  //       isActive: true,
  //     },
  //     {
  //       id: "653fb0394e538fb36a5d6e9e",
  //       text: "what is it",
  //       score: 5,
  //       options: ["nothing", "no", "yes", "me"],
  //       answer: "yes",
  //       isActive: true,
  //     },
  //     {
  //       id: "653fb0394e538fb36a5d6e9f",
  //       text: "how?",
  //       score: 8,
  //       options: ["what", "no"],
  //       answer: "no",
  //       isActive: true,
  //     },
  //   ],
  //   _count: {
  //     questions: 5,
  //   },
  // };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(data?.questions.length).fill(null)
  );

  const handleNextQuestion = () => {
    if (currentQuestionIndex < data?.questions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionChange = (option: string) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  const handleSubmit = () => {
    // Assemble submissions array
    handleNextQuestion();

    const newSubmissions = selectedOptions.map((answer, index) => ({
      answer,
      questionId: data?.questions[index].id,
    }));
    // setSubmissions(newSubmissions);

    console.log(newSubmissions);

    mutate(
      { submissions: newSubmissions },
      {
        onSuccess: (e) => {
          console.log(e);

          toast.success(
            <ToastContent
              heading={"Successful"}
              message={"Quiz submitted successfully"}
              type={"success"}
            />,
            ToastContent.Config
          );

          router?.goBack();
        },
        onError: (e: any) => {
          handleError(e);
        },
      }
    );
  };

  return (
    <div className=" ">
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Course Quizes</div>
      </div>
      <BackButton />

      <div className="d-flex align-items-center justify-content-center  gap-4 flex-wrap mt-5  ">
        {isLoading ? (
          <Spinner />
        ) : data ? (
          <div
            className="border-top border-4 border-blue-800 px-3 py-5 text-blue-800 shadow-lg  my-4"
            style={{ width: "80%", height: "350px" }}
          >
            <Card>
              <CardBody>
                <h2>{data?.name}</h2>
                <Form>
                  <FormGroup tag="fieldset">
                    <Label>
                      {" "}
                      Question {currentQuestionIndex + 1}:{" "}
                      {data?.questions[currentQuestionIndex].text}
                    </Label>
                    {data?.questions[currentQuestionIndex].options.map(
                      (option: any, index: React.Key | null | undefined) => (
                        <FormGroup check key={index}>
                          <Label check>
                            <Input
                              type="radio"
                              checked={
                                selectedOptions[currentQuestionIndex] === option
                              }
                              onChange={() => handleOptionChange(option)}
                            />{" "}
                            {option}
                          </Label>
                        </FormGroup>
                      )
                    )}
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            <div className="d-flex justify-content-between align-items-center my-4">
              {currentQuestionIndex > 0 && (
                <Button
                  style={{
                    background: "#203864",
                    color: "#fff",
                    fontSize: "18px",
                  }}
                  onClick={handlePreviousQuestion}
                  className="py-2 px-4"
                >
                  Previous
                </Button>
              )}
              {currentQuestionIndex < data?.questions.length - 1 ? (
                <Button
                  style={{
                    background: "#203864",
                    color: "#fff",
                    fontSize: "18px",
                  }}
                  onClick={handleNextQuestion}
                  className="py-2 px-4"
                >
                  Next
                </Button>
              ) : (
                <Button
                  color="success"
                  onClick={handleSubmit}
                  className="py-2 px-4"
                  style={{
                    color: "#fff",
                    fontSize: "18px",
                  }}
                >
                  {submitIsLoading ? "Submiting..." : "Submit"}
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div
              className="border-top border-4 border-blue-800 px-3 py-5 text-blue-800 shadow-lg  my-4"
              style={{ width: "400px", height: "100px" }}
            >
              <p>Looks like Quiz has already ended.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
