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
import useSubmitExam from "../../hooks/mutations/classes/useSubmitExam";
import handleError from "../../utils/handleError";
import { toast } from "react-toastify";
import ToastContent from "../../components/molecules/ToastContent";
import useExam from "../../hooks/queries/classes/useExam";

interface LectureParams {
  id: string;
}

export default function LectureQuizes() {
  const params = useParams<LectureParams>();
  let router = useHistory();
  const { data: userData, isLoading: userLoading } = useCurrentUser();
  const { mutate, isLoading: submitIsLoading } = useSubmitExam(params?.id);

  const { data: exam, isLoading } = useExam(params?.id);

  console.log(exam);

  // const exam2 = {
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
    Array(exam?.questions?.length).fill(null)
  );

  const handleNextQuestion = () => {
    if (currentQuestionIndex < exam?.questions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    console.log(selectedOptions);
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
      questionId: exam?.questions[index].id,
    }));

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
        <div>Course Exam</div>
      </div>
      <BackButton />

      <div className="d-flex align-items-center justify-content-center  gap-4 flex-wrap mt-5  ">
        {isLoading ? (
          <Spinner />
        ) : exam ? (
          <div
            className="border-top border-4 border-blue-800 px-3 py-5 text-blue-800 shadow-lg  my-4"
            style={{ width: "80%", height: "350px" }}
          >
            <Card>
              <CardBody>
                <h2>{exam?.name}</h2>
                <Form>
                  <FormGroup tag="fieldset">
                    <Label>
                      {" "}
                      Question {currentQuestionIndex + 1}:{" "}
                      {exam?.questions[currentQuestionIndex]?.text}
                    </Label>
                    {exam?.questions[currentQuestionIndex]?.options.map(
                      (option: any, index: number) => (
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
              {currentQuestionIndex < exam?.questions?.length - 1 ? (
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
              <p>Looks like exam has already ended.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
