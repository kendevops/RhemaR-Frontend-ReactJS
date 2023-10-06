import { ChangeEvent, FormEvent, useState } from "react";
import QuestionInput from "../molecules/QuestionInput";
import Tab from "../atoms/Tab";
import FormInput from "../molecules/FormInput";
import useForm from "../../utility/hooks/useForm";
import { Autocomplete, TextField } from "@mui/material";
import useAllCourses from "../../hooks/queries/classes/useAllCourses";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import useCreateExam from "../../hooks/mutations/classes/useCreateExam";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";
import FormDropdown from "../molecules/FormDropdown";
import useAcademicSessions from "../../hooks/queries/classes/useAcademicSessions";
import useCreateQuiz from "../../hooks/mutations/classes/useCreateQuiz";
import useEditQuiz from "../../hooks/mutations/classes/useEditQuiz";
import useAllQuizes from "../../hooks/queries/classes/useAllQuizes";

type CreateQuizModalProps = {
  defaultValues?: any;
  toggle: VoidFunction;
  isOpen: boolean;
};

export default function CreateQuizModal({
  defaultValues,
  toggle,
  isOpen,
}: CreateQuizModalProps) {
  const { refetch } = useAllQuizes();
  const [numQuestions, setNumQuestions] = useState(5);

  const Options = ["Basic Information", "Questions"];
  const [option, setOption] = useState(0);
  const currentOption = Options[option];

  const { data: coursesData, isLoading } = useAllCourses();
  const coursesOptions = coursesData?.nodes?.map((cours: any) => ({
    label: cours?.name,
    id: cours?.id,
  }));

  console.log(coursesData, coursesOptions);

  const { mutate, isLoading: isCreating } = useCreateQuiz();
  const { mutate: mutateEdit, isLoading: isEditing } = useEditQuiz(
    defaultValues?.id
  );

  const initialState = defaultValues ?? {
    name: "",
    courseId: "",
    sessionId: "",
    durationInSeconds: 0,
    endsAt: "",
    startsAt: "",
    totalScore: 100,
  };

  const {
    formData: basicInformation,
    updateForm: updateBasicInformation,
    toggleError,
    formErrors,
  } = useForm({
    initialState: {
      name: initialState?.name,
      courseId: initialState?.courseId,
      durationInSeconds: initialState?.durationInSeconds,
      endsAt: initialState?.endsAt,
      startsAt: initialState?.startsAt,
      totalScore: initialState?.totalScore,
      sessionId: initialState?.sessionId,
    },
  });

  const [questions, setQuestions] = useState(
    defaultValues?.questions ??
      Array.from(Array(numQuestions).keys())?.map((val, ind) => {
        return {
          text: "questiontest2" + `${ind}`,
          score: 1,
          isActive: true,
          answer: "a",
          options: ["a", "b", "c", "d"],
        };
      })
  );

  const { data: sessionsData, isLoading: sessionsLoading } =
    useAcademicSessions();

  const sessionOptions = sessionsData?.nodes?.map((session: any) => ({
    label: session?.name,
    id: session?.id,
  }));

  console.log(sessionsData, sessionOptions);

  function handleSubmit(e: FormEvent) {
    e?.preventDefault();

    const examData = {
      ...basicInformation,
      questions,
    };

    // Creating
    if (!defaultValues) {
      mutate(examData, {
        onSuccess: (e) => {
          console.log(e);

          toast.success(
            <ToastContent
              heading={"Successful"}
              message={"Quiz created successfully"}
              type={"success"}
            />,
            ToastContent.Config
          );
          refetch();
          toggle();
        },
        onError: (e: any) => {
          handleError(e, basicInformation, toggleError);
        },
      });
    }

    if (defaultValues) {
      mutateEdit(examData, {
        onSuccess: (e) => {
          console.log(e);

          toast.success(
            <ToastContent
              heading={"Successful"}
              message={"Quiz Updated successfully"}
              type={"success"}
            />,
            ToastContent.Config
          );
          refetch();
          toggle();
        },
        onError: (e: any) => {
          handleError(e, basicInformation, toggleError);
        },
      });
    }
  }

  return (
    <>
      <Modal centered {...{ isOpen, toggle }} fullscreen id="examModal">
        <ModalHeader toggle={toggle}>
          {!!defaultValues ? "Modify Quiz" : "Create Quiz"}
        </ModalHeader>
        <ModalBody>
          {/* Tabs */}
          <Tab.Wrapper>
            {Options.map((o, i) => {
              const isSelected = i === option;
              function onClick() {
                setOption(i);
              }
              return (
                <Tab tabColor="#203864" key={o} {...{ onClick, isSelected }}>
                  {o}
                </Tab>
              );
            })}
          </Tab.Wrapper>

          <form onSubmit={handleSubmit}>
            {/* {(isCreating || sessionsLoading) && <Spinner />} */}
            {/* Basic Information */}
            {currentOption === Options[0] && (
              <div>
                <FormInput
                  label="Name"
                  placeholder="Name of this exam"
                  value={basicInformation?.name}
                  hasErrors={formErrors.name}
                  onChange={(e) =>
                    updateBasicInformation("name", e?.target?.value)
                  }
                />

                <FormInput
                  label="Total score"
                  placeholder="Total score"
                  value={basicInformation?.totalScore}
                  hasErrors={formErrors.totalScore}
                  onChange={(e) =>
                    updateBasicInformation("totalScore", e?.target?.value)
                  }
                />
                <div className="form-group">
                  <label htmlFor="Search courses">Course ID</label>
                  <Autocomplete
                    fullWidth
                    disablePortal
                    id="Search courses"
                    loading={isLoading}
                    options={coursesOptions}
                    value={basicInformation?.courseId}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          placeholder="Search courses"
                          className="form-control "
                          error={formErrors?.courseId}
                        />
                      );
                    }}
                    onChange={(e, value: any) => {
                      updateBasicInformation("courseId", value?.id);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Search session">Session ID</label>
                  <Autocomplete
                    fullWidth
                    disablePortal
                    id="Search session"
                    loading={sessionsLoading}
                    options={sessionOptions}
                    value={basicInformation?.sessionId}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          placeholder="Search session"
                          className="form-control "
                          error={formErrors?.sessionId}
                        />
                      );
                    }}
                    onChange={(e, value: any) => {
                      updateBasicInformation("sessionId", value?.id);
                    }}
                  />
                </div>

                {/* <FormDropdown
                  title="Session"
                  options={sessionsData?.nodes?.map((sess: any) => ({
                    children: sess?.name,
                  }))}
                  onChange={(e) =>
                    updateBasicInformation("session", e.target.value)
                  }
                /> */}

                <FormInput
                  label="Duration (minutes)"
                  placeholder="Duration in minutes e.g. 60"
                  value={basicInformation?.durationInSeconds}
                  hasErrors={formErrors.durationInSeconds}
                  type={"number"}
                  onChange={(e) =>
                    updateBasicInformation(
                      "durationInSeconds",
                      e?.target?.valueAsNumber
                    )
                  }
                />
                <FormInput
                  label="Start Date"
                  type={"date"}
                  hasErrors={formErrors.startsAt}
                  onChange={(e) =>
                    updateBasicInformation(
                      "startsAt",
                      new Date(e?.target?.value)?.toISOString()
                    )
                  }
                />
                <FormInput
                  label="End Date"
                  type={"date"}
                  hasErrors={formErrors.endsAt}
                  onChange={(e) =>
                    updateBasicInformation(
                      "endsAt",
                      new Date(e?.target?.value)?.toISOString()
                    )
                  }
                />
              </div>
            )}

            {/* Questions */}
            {currentOption === Options[1] && (
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
                      setNumQuestions((prev) => (prev += 5));

                      setQuestions(
                        defaultValues?.questions ??
                          Array.from(Array(numQuestions).keys())?.map(
                            (val, ind) => {
                              return {
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
                      setNumQuestions((prev) => (prev += 1));

                      setQuestions(
                        defaultValues?.questions ??
                          Array.from(Array(numQuestions).keys())?.map(
                            (val, ind) => {
                              return {
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
            )}

            {/* submit button */}
            {(isCreating || isEditing) && <Spinner />}
            <button type="submit" className="btn btn-lg  btn-blue-800">
              {!!defaultValues ? "Modify Quiz" : "Create Quiz"}
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
