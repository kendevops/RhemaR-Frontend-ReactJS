import { FormEvent } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import useCreateCampusTuition from "../../hooks/mutations/classes/useCreateCampusTuition";
import useUpdateCampusTuition from "../../hooks/mutations/classes/useUpdateCampusTuition";
import FormDropdown from "../molecules/FormDropdown";
import { levels } from "../../data/Levels";
import FormInput from "../molecules/FormInput";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import FormDropdownSelectMultiple from "../molecules/FormDropdownSelectMultiple";
import { states } from "../../data/States";
import { InstructorsData } from "../../data/InstructorsData";

interface AddCampusModalProps {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: any;
  onCreate?: VoidFunction;
}

export default function AddCampusModal({
  toggle,
  defaultValues,
  visibility,
  onCreate,
}: AddCampusModalProps) {
  const isCreating = !defaultValues;

  const { isLoading: campusesLoading, data } = useAllCampuses();
  const campusesData = data?.nodes;
  const createTuition = useCreateCampusTuition();
  // const updateTuition = useUpdateCampusTuition(id ?? "");

  const isLoading = createTuition.isLoading || campusesLoading;

  const initialState = {
    level: [levels[0]],
    fullName: "",
    shortName: "",
    addressStreet: "",
    addressLGA: "",
    addressState: states[0],
    cordinator: "",
    phoneNumber1: "",
    phoneNumber2: "",
  };

  const { formData, formIsValid, updateForm } = useForm<typeof initialState>({
    initialState: defaultValues ?? initialState,
    // optionalFields: ["discount"],
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
      <ModalHeader toggle={toggle}>Create Campus</ModalHeader>
      <ModalBody>
        <form onSubmit={() => {}}>
          <FormInput
            label="Campus Full Name"
            placeholder="Enter Campus Full Name"
            onChange={(e) => updateForm("fullName", e?.target?.value)}
            value={formData?.fullName}
          />

          <FormInput
            label="Campus Short Name"
            placeholder="Enter Campus Short Name"
            onChange={(e) => updateForm("shortName", e?.target?.value)}
            value={formData?.shortName}
          />

          <FormDropdownSelectMultiple
            title="Campus Level"
            onChange={(e) => updateForm("level", e.target.value)}
            options={levels.map((v) => ({ children: v }))}
            value={formData?.level}
            disabled={!isCreating}
          />

          <FormInput
            label="Campus Address (Street)"
            placeholder="Enter Campus Street Address"
            onChange={(e) => updateForm("addressStreet", e?.target?.value)}
            value={formData?.addressStreet}
          />

          <FormInput
            label="Campus Address (LGA)"
            placeholder="Enter Campus LGA"
            onChange={(e) => updateForm("addressLGA", e?.target?.value)}
            value={formData?.addressLGA}
          />

          <FormDropdown
            title="Campus Address (State)"
            value={formData?.addressState}
            options={states?.map((d: any) => ({ children: d }))}
            onChange={(e) => updateForm("addressState", e?.target?.value)}
            disabled={!isCreating}
          />

          <FormDropdown
            title="Campus Cordinator"
            value={formData?.cordinator}
            options={InstructorsData?.map((d: any) => ({ children: d?.name }))}
            onChange={(e) => updateForm("cordinator", e?.target?.value)}
            disabled={!isCreating}
          />

          <FormInput
            label="Phone Number 1"
            placeholder="Enter Phone Number"
            onChange={(e) => updateForm("phoneNumber1", e?.target?.value)}
            value={formData?.phoneNumber1}
          />

          <FormInput
            label="Phone Number 2"
            placeholder="Enter Optional 2nd number"
            onChange={(e) => updateForm("phoneNumber2", e?.target?.value)}
            value={formData?.phoneNumber2}
          />

          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              {"Create Campus"}
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
