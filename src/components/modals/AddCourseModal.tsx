import { FormEvent } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import useCreateCampusTuition from "../../hooks/mutations/classes/useCreateCampusTuition";
import useUpdateCampusTuition from "../../hooks/mutations/classes/useUpdateCampusTuition";
import FormDropdown from "../molecules/FormDropdown";
import FormInput from "../molecules/FormInput";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import FormDropdownSelectMultiple from "../molecules/FormDropdownSelectMultiple";
import { states } from "../../data/States";
import { InstructorsData } from "../../data/InstructorsData";

interface AddCoreCoursesModalProps {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: any;
  onCreate?: VoidFunction;
}

export default function AddCoreCourseModal({
  toggle,
  defaultValues,
  visibility,
  onCreate,
}: AddCoreCoursesModalProps) {
  const isCreating = !defaultValues;

  const { isLoading: campusesLoading, data } = useAllCampuses();
  const campusesData = data?.nodes;
  const createTuition = useCreateCampusTuition();
  // const updateTuition = useUpdateCampusTuition(id ?? "");

  const isLoading = createTuition.isLoading || campusesLoading;

  const initialState = {
    level: "",
    name: "",
    option: "",
    hours: "",
  };

  const { formData, formIsValid, updateForm, formErrors } = useForm<
    typeof initialState
  >({
    initialState: defaultValues ?? initialState,
    // optionalFields: ["discount"],
  });

  const campusOptions = campusesData?.map((d: any) => ({
    children: d?.name,
  }));

  // function handleSubmit(e: FormEvent) {
  //   e.preventDefault();

  //   const { level, campus, ...otherData } = formData;

  //   if (formIsValid) {
  //     isCreating
  //       ? createTuition.mutate(formData, {
  //           onSuccess: () => {
  //             toast.success(
  //               <ToastContent
  //                 type={"success"}
  //                 heading={"Success"}
  //                 message={`Successfully created campus tuition`}
  //               />,
  //               ToastContent.Config
  //             );
  //             !!onCreate && onCreate();
  //             toggle();
  //           },
  //           onError: (e: any) => {
  //             handleError(e, formData);
  //           },
  //         })
  //       : updateTuition.mutate(otherData, {
  //           onSuccess: () => {
  //             toast.success(
  //               <ToastContent
  //                 type={"success"}
  //                 heading={"Success"}
  //                 message={`Successfully updated campus tuition`}
  //               />,
  //               ToastContent.Config
  //             );
  //             toggle();
  //           },
  //           onError: (e: any) => {
  //             handleError(e, formData);
  //           },
  //         });
  //   } else {
  //     alert("Please fill in all fields");
  //     console.log(formData);
  //   }
  // }

  return (
    <Modal centered isOpen={visibility} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Course</ModalHeader>
      <ModalBody>
        <form onSubmit={() => {}}>
          <FormInput
            label="Name Course Course"
            placeholder="Course Name"
            onChange={(e) => updateForm("name", e?.target?.value)}
            value={formData?.name}
          />

          <FormDropdown
            title="Level"
            value={formData?.level}
            // options={levels?.map((d: any) => ({ children: d }))}
            options={["Level 1", "Level 2"].map((d: any) => ({ children: d }))}
            onChange={(e) => updateForm("level", e?.target?.value)}
            disabled={!isCreating}
          />

          <FormDropdown
            title="Course Elective"
            value={formData?.option}
            options={["Core", "Eletive"].map((d: any) => ({ children: d }))}
            onChange={(e) => updateForm("option", e?.target?.value)}
            disabled={!isCreating}
          />

          <FormInput
            label="Course Hours"
            placeholder="Course Hours"
            onChange={(e) => updateForm("hours", e?.target?.value)}
            value={formData?.hours}
          />
          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              {"Add Course"}
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
