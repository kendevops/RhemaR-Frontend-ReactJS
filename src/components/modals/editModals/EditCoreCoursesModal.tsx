import { FormEvent } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../../utility/hooks/useForm";
import FormDropdown from "../../molecules/FormDropdown";
import { levels } from "../../../data/Levels";
import FormInput from "../../molecules/FormInput";
import { toast } from "react-toastify";
import ToastContent from "../../molecules/ToastContent";
import useAllCampuses from "../../../hooks/queries/classes/useAllCampuses";
import useEditCampus from "../../../hooks/mutations/classes/useEditCampus";
import useToggle from "../../../utility/hooks/useToggle";

interface EditCoreCoursesModalProps {
  data: any;
}

export default function EditCoreCoursesModal({
  data,
}: EditCoreCoursesModalProps) {
  const [visibility, toggle] = useToggle();

  //   const isCreating = !defaultValues;

  const { isLoading: campusesLoading, data: dataCampus } = useAllCampuses();
  const campusesData = dataCampus?.nodes;

  const initialState = {
    level: data?.level,
    name: data?.name,
    option: data?.option,
    hours: data?.hours,
    hasListeningAssignment: data?.hasListeningAssignment,
    hasQuiz: data?.hasQuiz,
  };

  const editCampus = useEditCampus(data?.id);
  const isLoading = editCampus.isLoading;

  const { formData, formIsValid, updateForm, formErrors } = useForm<
    typeof initialState
  >({
    initialState,
    // optionalFields: ["discount"],
  });

  const campusOptions = campusesData?.map((d: any) => ({
    children: d?.name,
  }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formIsValid) {
      alert("Please fill in all fields");
      return;
    }
    if (data) {
      editCampus?.mutate(formData, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Successful"}
              message={"Campus Updated successfully"}
            />,
            ToastContent.Config
          );
        },

        onError: (e: any) => {
          console.log(e);
          toast.error(
            <ToastContent
              type={"error"}
              heading={"Error"}
              message={e?.response?.data?.error?.message?.toString()}
            />,
            ToastContent.Config
          );
        },
      });

      toggle();
      return;
    }
  };

  return (
    <div>
      <p
        onClick={toggle}
        className=" click d-flex"
        // data-bs-toggle="modal"
        // data-bs-target="#studentModal"
      >
        Edit
      </p>
      <Modal centered isOpen={visibility} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Core Campus</ModalHeader>
        <ModalBody>
          <form onSubmit={() => {}}>
            <FormInput
              label="Course Name"
              placeholder="Course Name"
              onChange={(e) => updateForm("name", e?.target?.value)}
              value={formData?.name}
            />

            <FormDropdown
              title="Course Level"
              value={formData?.level}
              options={levels?.map((d: any) => ({ children: d }))}
              onChange={(e) => updateForm("level", e?.target?.value)}
              // disabled={!isCreating}
            />

            <FormDropdown
              title="Course Option"
              value={formData?.option}
              options={["Core", "Eletive"].map((d: any) => ({ children: d }))}
              onChange={(e) => updateForm("option", e?.target?.value)}
              // disabled={!isCreating}
            />

            <FormInput
              label="Course Hour"
              placeholder="Course Hour"
              onChange={(e) => updateForm("hours", e?.target?.value)}
              value={formData?.hours}
            />

            <FormDropdown
              title="Has Listening Assignment"
              value={formData?.hasListeningAssignment}
              options={["Yes", "No"].map((d: any) => ({ children: d }))}
              onChange={(e) => updateForm("option", e?.target?.value)}
              // disabled={!isCreating}
            />

            <FormDropdown
              title="Has Quiz"
              value={formData?.hasQuiz}
              options={["Yes", "No"].map((d: any) => ({ children: d }))}
              onChange={(e) => updateForm("option", e?.target?.value)}
              // disabled={!isCreating}
            />
            {isLoading ? (
              <Spinner />
            ) : (
              <button
                className="btn btn-blue-800 btn-lg w-100 my-5"
                type="submit"
              >
                {"Create Core Course"}
              </button>
            )}
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
