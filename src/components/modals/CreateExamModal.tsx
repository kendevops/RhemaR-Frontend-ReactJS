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
  const Options = ["Basic Information", "Questions"];
  const [option, setOption] = useState(0);
  const currentOption = Options[option];

  const { data: coursesData, isLoading } = useAllCourses();
  const coursesOptions = coursesData?.nodes?.map((cours: any) => ({
    label: cours?.title,
    id: cours?.title,
  }));

  const { mutate, isLoading: isCreating } = useCreateExam();

  const initialState = defaultValues ?? {
    name: "",
    course: "",
    duration: 0,
    endsAt: "",
    startsAt: "",
    score: 100,
  };

  const {
    formData: basicInformation,
    updateForm: updateBasicInformation,
    toggleError,
    formErrors,
  } = useForm({
    initialState: {
      name: initialState?.name,
      course: initialState?.course,
      duration: initialState?.duration,
      endsAt: initialState?.endsAt,
      startsAt: initialState?.startsAt,
      score: initialState?.score,
    },
  });

  const [questions, setQuestions] = useState(
    defaultValues?.questions ??
      Array.from(Array(26).keys())?.map((val, ind) => {
        return {
          text: "question" + Date.now + `${ind}`,
          score: 1,
          isActive: true,
          answer: "a",
          options: ["a", "b", "c", "d"],
        };
      })
  );

  function handleSubmit(e: FormEvent) {
    e?.preventDefault();

    const examData = {
      ...basicInformation,
      questions,
    };

    // Creating
    if (!defaultValues) {
      mutate(examData, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              heading={"Successful"}
              message={"Exam created successfully"}
              type={"success"}
            />,
            ToastContent.Config
          );
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
                <Tab tabColor="#289483" key={o} {...{ onClick, isSelected }}>
                  {o}
                </Tab>
              );
            })}
          </Tab.Wrapper>

          <form onSubmit={handleSubmit}>
            {isCreating && <Spinner />}
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
                <div className="form-group">
                  <label htmlFor="Search courses">Course</label>
                  <Autocomplete
                    fullWidth
                    disablePortal
                    id="Search courses"
                    loading={isLoading}
                    options={coursesOptions}
                    value={basicInformation?.course}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          placeholder="Search courses"
                          className="form-control "
                          error={formErrors?.course}
                        />
                      );
                    }}
                    onChange={(e, value: any) => {
                      updateBasicInformation("course", value?.id);
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
                    type: "question" | "answer"
                  ) {
                    setQuestions((prev: any) => {
                      if (type === "question") prev[i].text = e?.target?.value;
                      if (type === "answer") prev[i].answer = e?.target?.value;

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
                      serialNumber={i + 1}
                      onChangeQuestion={(e) =>
                        handleQuestionChange(e, "question")
                      }
                      onChangeOption={handleOptionChange}
                      onChangeAnswer={(e) => handleQuestionChange(e, "answer")}
                    />
                  );
                })}
              </div>
            )}

            {/* submit button */}
            <button type="submit" className="btn btn-lg  btn-blue-800">
              {!!defaultValues ? "Modify Exam" : "Create Exam"}
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
