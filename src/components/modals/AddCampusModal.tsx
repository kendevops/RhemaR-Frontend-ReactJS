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

interface AddCampusModalProps {
  isOpen: boolean;
  toggle: VoidFunction;
  id?: string;
  defaultValues?: any;
  onCreate?: VoidFunction;
}

export default function AddCampusModal({
  isOpen,
  toggle,
  defaultValues,
  id,
  onCreate,
}: AddCampusModalProps) {
  const isCreating = !defaultValues;

  const { isLoading: campusesLoading, data } = useAllCampuses();
  const campusesData = data?.nodes;
  const createTuition = useCreateCampusTuition();
  const updateTuition = useUpdateCampusTuition(id ?? "");

  const isLoading =
    createTuition.isLoading || updateTuition.isLoading || campusesLoading;

  const initialState = {
    level: levels[0],
    campus: "",
    total: 0,
    dueDate: "",
    discount: 0,
    feePayment: 0,
    initialPayment: 0,
    installmentMinimum: 0,
  };

  const { formData, formIsValid, updateForm } = useForm<typeof initialState>({
    initialState: defaultValues ?? initialState,
    optionalFields: ["discount"],
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { level, campus, ...otherData } = formData;

    if (formIsValid) {
      isCreating
        ? createTuition.mutate(formData, {
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
          })
        : updateTuition.mutate(otherData, {
            onSuccess: () => {
              toast.success(
                <ToastContent
                  type={"success"}
                  heading={"Success"}
                  message={`Successfully updated campus tuition`}
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
    <Modal centered {...{ isOpen, toggle }}>
      <ModalHeader toggle={toggle}>
        {isCreating ? "Create" : "Edit"} Campus Tuition
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          {campusesData && (
            <FormDropdown
              title="Campus"
              value={formData?.campus}
              options={campusesData?.map((d: any) => ({ children: d?.name }))}
              onChange={(e) => updateForm("campus", e?.target?.value)}
              disabled={!isCreating}
            />
          )}
          <FormDropdown
            title="Level"
            onChange={(e) => updateForm("level", e.target.value)}
            options={levels.map((v) => ({ children: v }))}
            value={formData?.level}
            disabled={!isCreating}
          />

          <FormInput
            label="Initial Payement"
            type="number"
            value={formData?.initialPayment?.toString()}
            onChange={(e) =>
              updateForm("initialPayment", parseInt(e?.target?.value))
            }
          />

          <FormInput
            label="Fee Payement"
            type="number"
            value={formData?.feePayment?.toString()}
            onChange={(e) =>
              updateForm("feePayment", parseInt(e?.target?.value))
            }
          />

          <FormInput
            label="Total Fee Payment"
            type="number"
            value={formData?.total?.toString()}
            onChange={(e) => updateForm("total", parseInt(e?.target?.value))}
          />

          <FormInput
            label="Minimum Installment"
            type="number"
            value={formData?.installmentMinimum?.toString()}
            onChange={(e) =>
              updateForm("installmentMinimum", parseInt(e?.target?.value))
            }
          />

          <FormInput
            label="Discount (%)"
            type="number"
            value={formData?.discount?.toString()}
            onChange={(e) => updateForm("discount", parseInt(e?.target?.value))}
          />
          <FormInput
            label="Due Date"
            type="date"
            onChange={(e) =>
              updateForm("dueDate", new Date(e?.target?.value).toISOString())
            }
          />

          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              {isCreating ? "Create Tuition" : "Save Tuition Changes"}
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
