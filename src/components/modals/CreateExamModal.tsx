import { useState } from "react";
import QuestionInput from "../molecules/QuestionInput";
import Tab from "../atoms/Tab";
import FormInput from "../molecules/FormInput";
import useForm from "../../utility/hooks/useForm";
import { Autocomplete, TextField } from "@mui/material";
import useAllCourses from "../../hooks/queries/classes/useAllCourses";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

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

  const initialState = defaultValues ?? {
    name: "",
    course: "",
    duration: 0,
    questions: [],
  };

  const { formData: basicInformation, updateForm: updateBasicInformation } =
    useForm({
      initialState: {
        name: initialState?.name,
        course: initialState?.course,
        duration: initialState?.duration,
      },
    });
  const [questions, setQuestions] = useState({});

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

          <form>
            {/* Basic Information */}
            {currentOption === Options[0] && (
              <div>
                <FormInput
                  label="Name"
                  placeholder="Name of this exam"
                  value={basicInformation?.name}
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
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          placeholder="Search courses"
                          className="form-control "
                        />
                      );
                    }}
                    onChange={(e, value) => {
                      console.log(value);
                    }}
                  />
                </div>
                <FormInput
                  label="Duration (minutes)"
                  placeholder="Duration in minutes e.g. 60"
                  value={basicInformation?.duration}
                  type={"number"}
                  onChange={(e) =>
                    updateBasicInformation("name", e?.target?.valueAsNumber)
                  }
                />
              </div>
            )}

            {/* Questions */}
            {currentOption === Options[1] && (
              <div>
                {Array.from(Array(26).keys())?.map((v) => {
                  return (
                    <QuestionInput
                      serialNumber={v + 1}
                      onChangeQuestion={(e) => console.log(e?.target?.value)}
                      onChangeOption={(opt, val) => console.log(opt, val)}
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
