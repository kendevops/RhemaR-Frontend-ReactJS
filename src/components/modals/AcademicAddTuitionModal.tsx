import { FormEvent } from "react";
import { Modal, ModalHeader, ModalBody, Spinner, Input } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import useCreateCampusTuition from "../../hooks/mutations/classes/useCreateCampusTuition";
import useUpdateCampusTuition from "../../hooks/mutations/classes/useUpdateCampusTuition";
import FormDropdown from "../molecules/FormDropdown";
// import { levels } from "../../data/Levels";
import FormInput from "../molecules/FormInput";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import FormDropdownSelectMultiple from "../molecules/FormDropdownSelectMultiple";
import { states } from "../../data/States";
import { InstructorsData } from "../../data/InstructorsData";
import { Controller } from "react-hook-form";
import useCampusLevel from "../../hooks/queries/classes/useCampusLevel";

interface AcademicAddTuitionModalProps {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: any;
  onCreate?: VoidFunction;
}

export default function AcademicAddTuitionModal({
  toggle,
  defaultValues,
  visibility,
  onCreate,
}: AcademicAddTuitionModalProps) {
  const isCreating = !defaultValues;

  const { isLoading: campusesLoading, data } = useAllCampuses();
  const campusesData = data?.nodes;
  const createTuition = useCreateCampusTuition();
  const { data: levelData } = useCampusLevel();

  const levels = levelData?.map((v: any) => v.name);

  console.log(levelData, levels);

  // const updateTuition = useUpdateCampusTuition(id ?? "");

  const isLoading = createTuition.isLoading || campusesLoading;

  const initialState = {
    level: "",
    campus: "",
    total: 0,
    discount: 0,
    feePayment: 0,
    initialPayment: 0,
    installmentMinimum: 0,
    installmentDuration: 0,
    dueDate: "",
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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(formData);

    const body = {
      ...formData,
      total: +formData.total,
      discount: +formData.discount,
      feePayment: +formData.feePayment,
      initialPayment: +formData.initialPayment,
      installmentMinimum: +formData.installmentMinimum,
      installmentDuration: +formData.installmentDuration,
    };

    if (formIsValid) {
      createTuition.mutate(body, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Success"}
              message={`Successfully created campus tuition`}
            />,
            ToastContent.Config
          );
          !!onCreate && onCreate();
          toggle();
        },
        onError: (e: any) => {
          handleError(e, formData);
        },
      });
      //  updateTuition.mutate(otherData, {
      //     onSuccess: () => {
      //       toast.success(
      //         <ToastContent
      //           type={"success"}
      //           heading={"Success"}
      //           message={`Successfully updated campus tuition`}
      //         />,
      //         ToastContent.Config
      //       );
      //       toggle();
      //     },
      //     onError: (e: any) => {
      //       handleError(e, formData);
      //     },
      //   });
    } else {
      alert("Please fill in all fields");
      console.log(formData);
    }
  }

  return (
    <Modal centered isOpen={visibility} toggle={toggle} scrollable>
      <ModalHeader toggle={toggle}>Add Tuition</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormDropdown
            options={campusOptions}
            title="Select campus"
            onChange={(e) => updateForm("campus", e?.target?.value)}
            hasErrors={formErrors?.campus}
          />

          <FormDropdown
            title="Select Level"
            value={formData?.level}
            options={levels?.map((d: any) => ({ children: d }))}
            onChange={(e) => updateForm("level", e?.target?.value)}
            disabled={!isCreating}
          />

          <FormInput
            label="Application Fee"
            placeholder="Application Fee"
            onChange={(e) => updateForm("feePayment", e?.target?.value)}
            value={formData?.feePayment}
          />

          <FormInput
            label="Initial Payment"
            placeholder="Initial Payment"
            onChange={(e) => updateForm("initialPayment", e?.target?.value)}
            value={formData?.initialPayment}
          />

          <FormInput
            label="Minimum Installment fee"
            placeholder="Installment Minimum"
            onChange={(e) => updateForm("installmentMinimum", e?.target?.value)}
            value={formData?.installmentMinimum}
          />

          <FormInput
            label="Minimum Installment Duration"
            placeholder="Installment Minimum Duration"
            onChange={(e) =>
              updateForm("installmentDuration", e?.target?.value)
            }
            value={formData?.installmentDuration}
          />

          <FormInput
            label="Total"
            placeholder="Total"
            onChange={(e) => updateForm("total", e?.target?.value)}
            value={formData?.total}
          />
          <FormInput
            label="Discount"
            placeholder="Discount"
            onChange={(e) => updateForm("discount", e?.target?.value)}
            value={formData?.discount}
          />

          <FormInput
            label="Due Date"
            type={"date"}
            onChange={(e) =>
              updateForm("dueDate", new Date(e?.target?.value)?.toISOString())
            }
          />

          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              {"Create Tuition"}
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
