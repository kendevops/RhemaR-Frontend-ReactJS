import { FormEvent } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import useCreateCampusTuition from "../../hooks/mutations/classes/useCreateCampusTuition";
import useUpdateCampusTuition from "../../hooks/mutations/classes/useUpdateCampusTuition";
import FormDropdown from "../molecules/FormDropdown";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import FormDropdownSelectMultiple from "../molecules/FormDropdownSelectMultiple";
import { states } from "../../data/States";
import { InstructorsData } from "../../data/InstructorsData";
import { Autocomplete, TextField } from "@mui/material";
import useAllIntakes from "../../hooks/queries/classes/useAllIntakes";
import useClearanceApplication from "../../hooks/mutations/classes/useClearanceApplication";
import handleError from "../../utils/handleError";
import ToastContent from "../molecules/ToastContent";
import { toast } from "react-toastify";
import useUpdateClearanceApplication from "../../hooks/mutations/classes/useUpadateClearanceApplication";
import FormRadioGroup from "../molecules/FormRadioGroup";

interface LevelClearanceModalModalProps {
  toggle: VoidFunction;
  visibility: boolean;
  level?: string;
  onCreate?: VoidFunction;
  defaultValues?: any;
}

export default function LevelClearanceModal({
  toggle,
  visibility,
  onCreate,
  defaultValues,
  level,
}: LevelClearanceModalModalProps) {
  const mainLevel = level === "Level 1" ? "LEVEL_1" : "LEVEL_2";
  const createClearanceApplication = useClearanceApplication(mainLevel);
  const updateClearanceApplication = useUpdateClearanceApplication(
    mainLevel,
    defaultValues?.id
  );

  console.log(level, mainLevel);

  const isLoading =
    createClearanceApplication.isLoading ||
    updateClearanceApplication.isLoading;

  const initialState = {
    intakeId: "",
    intakeName: "",
    hasPaidFees: "",
    hasCompletedPMR: "",
    hasTakenAllCourses: "",
    hasTakenAllQuizzes: "",
  };

  const { formData, formIsValid, updateForm, formErrors } = useForm<
    typeof initialState
  >({
    initialState: defaultValues ?? initialState,
  });

  const { data: intakeData, isLoading: intakeLoading } = useAllIntakes();

  const intakeOptions = intakeData?.nodes?.map((session: any) => ({
    label: session?.name,
    id: session?.id,
  }));

  console.log(intakeData, intakeOptions);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (formIsValid) {
      !defaultValues
        ? createClearanceApplication.mutate(formData, {
            onSuccess: () => {
              toast.success(
                <ToastContent
                  type={"success"}
                  heading={"Success"}
                  message={`Clearance Application was Successfully`}
                />,
                ToastContent.Config
              );
              !!onCreate && onCreate();
              toggle();
            },
            onError: (e: any) => {
              handleError(e, formData);
            },
          })
        : updateClearanceApplication.mutate(formData, {
            onSuccess: () => {
              toast.success(
                <ToastContent
                  type={"success"}
                  heading={"Success"}
                  message={`Clearance Upadate was Successfully`}
                />,
                ToastContent.Config
              );
              toggle();
            },
            onError: (e: any) => {
              handleError(e, formData);
            },
          });
    } else {
      alert("Please fill in all fields");
      console.log(formData);
    }
  }

  return (
    <Modal centered isOpen={visibility} toggle={toggle}>
      <ModalHeader
        toggle={toggle}
        //   className="bg-blue-800 text-white"
      >
        {level === "Level 1"
          ? `${
              defaultValues
                ? "Updating Level 1 Application"
                : "Application For Level 1 Clearance"
            }`
          : `${
              defaultValues
                ? "Updating Level 2 Application"
                : "Application For Level 2 Clearance"
            }`}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Search Intake">Intake ID</label>
            <Autocomplete
              fullWidth
              disablePortal
              id="Search Intake"
              loading={intakeLoading}
              value={formData?.intakeName}
              options={intakeOptions}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    placeholder="Search Intake"
                    className="form-control "
                  />
                );
              }}
              onChange={(e, value: any) => {
                updateForm("intakeName", value?.label);
                updateForm("intakeId", value?.id);
              }}
            />
          </div>

          <FormRadioGroup
            label="Have You Taken All Courses?"
            options={["Yes", "No"]}
            onChange={(e) => {
              updateForm("hasTakenAllCourses", !!(e.target.value === "Yes"));
            }}
            hasErrors={formErrors?.hasTakenAllCourses}
          />

          <FormRadioGroup
            label="Have You Taken All Quizes?"
            options={["Yes", "No"]}
            onChange={(e) => {
              updateForm("hasTakenAllQuizzes", !!(e.target.value === "Yes"));
            }}
            hasErrors={formErrors?.hasTakenAllQuizzes}
          />

          <FormRadioGroup
            label="Have You Paid-up Your Fees?"
            options={["Yes", "No"]}
            onChange={(e) => {
              updateForm("hasPaidFees", !!(e.target.value === "Yes"));
            }}
            hasErrors={formErrors?.hasPaidFees}
          />

          <FormRadioGroup
            label="Have You Completed your PMR?"
            options={["Yes", "No"]}
            onChange={(e) => {
              updateForm("hasCompletedPMR", !!(e.target.value === "Yes"));
            }}
            hasErrors={formErrors?.hasCompletedPMR}
          />
          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              {"Submit"}
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
