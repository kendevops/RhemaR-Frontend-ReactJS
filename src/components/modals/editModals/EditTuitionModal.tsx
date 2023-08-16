import useToggle from "../../../utility/hooks/useToggle";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import { levels } from "../../../data/Levels";
import useForm from "../../../utility/hooks/useForm";
import FormInput from "../../molecules/FormInput";
import FormDropdown from "../../molecules/FormDropdown";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import ToastContent from "../../molecules/ToastContent";
import useAllCampuses from "../../../hooks/queries/classes/useAllCampuses";
import useUpdateCampusTuition from "../../../hooks/mutations/classes/useUpdateCampusTuition";

interface EditTuitionModalProps {
  data: any;
}

export default function EditTuitionModal({ data }: EditTuitionModalProps) {
  const [visibility, toggle] = useToggle();

  console.log(data);

  const initialState = {
    level: data?.level,
    campus: data?.campus,
    total: data?.total,
    discount: data?.discount,
    feePayment: data?.installmentMinimum,
    initialPayment: data?.installmentMinimum,
    installmentMinimum: data?.installmentMinimum,
  };

  const editTuition = useUpdateCampusTuition(data?.id);
  const isLoading = editTuition.isLoading;
  const { isLoading: campusesLoading, data: dataCampuses } = useAllCampuses();
  const campusesData = dataCampuses?.nodes;

  const { formData, updateForm, formIsValid, formErrors } = useForm({
    initialState,
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
      editTuition?.mutate(formData, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Successful"}
              message={"Tuition Updated successfully"}
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
      <p onClick={toggle} className=" click d-flex">
        Edit
      </p>

      {/* Modal */}
      <Modal centered isOpen={visibility} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Tuition</ModalHeader>
        <ModalBody>
          <form onSubmit={onSubmit}>
            <FormDropdown
              options={campusOptions}
              title="Select campus"
              hasErrors={formErrors?.campus}
            />

            <FormDropdown
              title="Select Level"
              value={formData?.level}
              options={levels?.map((d: any) => ({ children: d }))}
              onChange={(e) => updateForm("level", e?.target?.value)}
            />

            <FormInput
              label="Application Payment"
              placeholder="Application Payment"
              onChange={(e) => updateForm("feePayment", e?.target?.value)}
              value={formData?.feePayment}
            />

            <FormInput
              label="Discount"
              placeholder="Discount"
              onChange={(e) => updateForm("discount", e?.target?.value)}
              value={formData?.discount}
            />

            <FormInput
              label="Initial Payment"
              placeholder="Initial Payment"
              onChange={(e) => updateForm("initialPayment", e?.target?.value)}
              value={formData?.initialPayment}
            />

            <FormInput
              label="Installment Minimum"
              placeholder="Installment Minimum"
              onChange={(e) =>
                updateForm("installmentMinimum", e?.target?.value)
              }
              value={formData?.installmentMinimum}
            />

            <FormInput
              label="Total"
              placeholder="Total"
              onChange={(e) => updateForm("total", e?.target?.value)}
              value={formData?.feePayment - formData?.discount}
            />

            {isLoading ? (
              <Spinner />
            ) : (
              <button
                className="btn btn-blue-800 btn-lg w-100 my-5"
                type="submit"
              >
                {"Edit Tuition"}
              </button>
            )}
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
