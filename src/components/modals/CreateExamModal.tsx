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
import useAllExams from "../../hooks/queries/classes/useAllExams";
import useEditExam from "../../hooks/mutations/classes/useEditExam";
import { RiDeleteBin6Line } from "react-icons/ri";

type CreateExamModalProps = {
  defaultValues?: any;
  toggle: VoidFunction;
  isOpen: boolean;
};

export default function CreateExamModal({
  defaultValues,
  toggle,
  isOpen,
}: CreateExamModalProps) {
  const { refetch } = useAllExams();

  const Options = ["Basic Information", "Questions"];
  const [option, setOption] = useState(0);
  const currentOption = Options[option];

  const { data: coursesData, isLoading } = useAllCourses();
  const coursesOptions = coursesData?.nodes?.map((cours: any) => ({
    label: cours?.name,
    id: cours?.id,
  }));

  console.log(defaultValues);

  const { mutate, isLoading: isCreating } = useCreateExam();
  const { mutate: mutateEdit, isLoading: isEditing } = useEditExam(
    defaultValues?.id
  );

  const initialState = defaultValues ?? {
    name: "",
    courseId: "",
    courseName: "",
    sessionId: "",
    sessionName: "",
    duration: 0,
    endsAt: "",
    startsAt: "",
    score: 100,
  };

  const initialQuestion = {
    text: "No Question",
    score: "",
    isActive: true,
    answer: "",
    options: [],
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
      courseName: initialState?.courseName,
      duration: initialState?.duration,
      endsAt: initialState?.endsAt,
      startsAt: initialState?.startsAt,
      score: initialState?.score,
      sessionId: initialState?.sessionId,
      sessionName: initialState?.sessionName,
    },
  });

  const [questions, setQuestions] = useState(
    defaultValues?.questions ?? [initialQuestion]
  );

  const { data: sessionsData, isLoading: sessionsLoading } =
    useAcademicSessions();

  const sessionOptions = sessionsData?.nodes?.map((session: any) => ({
    label: session?.name,
    id: session?.id,
  }));

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
              message={"Exam created successfully"}
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
              message={"Exam Updated successfully"}
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
          {!!defaultValues ? "Modify Exam" : "Create Exam"}
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
                  value={basicInformation?.score}
                  hasErrors={formErrors.score}
                  onChange={(e) =>
                    updateBasicInformation("score", e?.target?.value)
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
                    value={basicInformation?.courseName}
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
                      updateBasicInformation("courseName", value?.label);
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
                    value={basicInformation?.sessionName}
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
                      updateBasicInformation("sessionName", value?.label);
                      updateBasicInformation("sessionId", value?.id);
                    }}
                  />
                </div>

                <FormInput
                  label="Duration (minutes)"
                  placeholder="Duration in minutes e.g. 60"
                  value={basicInformation?.duration}
                  hasErrors={formErrors.duration}
                  type={"number"}
                  onChange={(e) =>
                    updateBasicInformation("duration", e?.target?.valueAsNumber)
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
                    <>
                      <QuestionInput
                        key={i + 1}
                        serialNumber={i + 1}
                        onChangeQuestion={(e) =>
                          handleQuestionChange(e, "question")
                        }
                        onChangeOption={handleOptionChange}
                        onChangeAnswer={(e) =>
                          handleQuestionChange(e, "answer")
                        }
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
            )}

            {/* submit button */}
            {(isCreating || isEditing) && <Spinner />}
            <button type="submit" className="btn btn-lg  btn-blue-800">
              {!!defaultValues ? "Modify Exam" : "Create Exam"}
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
