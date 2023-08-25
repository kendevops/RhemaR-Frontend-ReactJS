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

interface LevelClearanceModalModalProps {
  toggle: VoidFunction;
  visibility: boolean;
  level?: string;
  onCreate?: VoidFunction;
}

export default function LevelClearanceModal({
  toggle,
  visibility,
  onCreate,
  level,
}: LevelClearanceModalModalProps) {
  const { isLoading: campusesLoading, data } = useAllCampuses();
  const createTuition = useCreateCampusTuition();
  // const updateTuition = useUpdateCampusTuition(id ?? "");

  const isLoading = createTuition.isLoading || campusesLoading;

  const initialState = {
    isIntake: "",
    takenQuizes: "",
    takenCourses: "",
    paidFees: "",
    PMR: "",
  };

  const { formData, formIsValid, updateForm, formErrors } = useForm<
    typeof initialState
  >({
    initialState: initialState,
  });

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
      <ModalHeader
        toggle={toggle}
        //   className="bg-blue-800 text-white"
      >
        {level === "Level 1"
          ? "Application For Level 1 Clearance"
          : "Application For Level 2 Clearance"}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={() => {}}>
          <FormDropdown
            title="Intake"
            value={formData?.isIntake}
            options={["No", "Yes"].map((d: any) => ({ children: d }))}
            onChange={(e) => updateForm("isIntake", e?.target?.value)}
          />

          <FormDropdown
            title="Have You Taken All Courses?"
            value={formData?.takenCourses}
            options={["No", "Yes"].map((d: any) => ({ children: d }))}
            onChange={(e) => updateForm("takenCourses", e?.target?.value)}
          />
          <FormDropdown
            title="Have You Taken All Quizes?"
            value={formData?.takenQuizes}
            options={["No", "Yes"].map((d: any) => ({ children: d }))}
            onChange={(e) => updateForm("takenQuizes", e?.target?.value)}
          />

          <FormDropdown
            title="Have You Paid-up Your Fees?"
            value={formData?.paidFees}
            options={["No", "Yes"].map((d: any) => ({ children: d }))}
            onChange={(e) => updateForm("takenCourses", e?.target?.value)}
          />

          <FormDropdown
            title="Have You Completed your PMR?"
            value={formData?.PMR}
            options={["No", "Yes"].map((d: any) => ({ children: d }))}
            onChange={(e) => updateForm("PMR", e?.target?.value)}
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
