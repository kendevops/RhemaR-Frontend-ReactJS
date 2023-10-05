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
  refetch?: any;
}

export default function EditTuitionModal({
  data,
  refetch,
}: EditTuitionModalProps) {
  const [visibility, toggle] = useToggle();

  console.log("data", data);

  const initialState = {
    level: data?.level?.name,
    campus: data?.campus?.name,
    total: data?.total,
    discount: data?.discount,
    feePayment: data?.installmentMinimum,
    initialPayment: data?.installmentMinimum,
    installmentMinimum: data?.installmentMinimum,
    installmentMinimumDurationInMonths:
      data?.installmentMinimumDurationInMonths,
    dueDate: data?.dueDate,
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

    const body = {
      ...formData,
      total: +formData.total,
      discount: +formData.discount,
      feePayment: +formData.feePayment,
      initialPayment: +formData.initialPayment,
      installmentMinimum: +formData.installmentMinimum,
      installmentMinimumDurationInMonths:
        +formData.installmentMinimumDurationInMonths,
    };
    if (data) {
      editTuition?.mutate(body, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Successful"}
              message={"Tuition Updated successfully"}
            />,
            ToastContent.Config
          );
          refetch();
          toggle();
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
          toggle();
        },
      });

      return;
    }
  };

  return (
    <div>
      <p onClick={toggle} className=" click d-flex">
        Edit
      </p>

      {/* Modal */}
      <Modal centered isOpen={visibility} toggle={toggle} scrollable>
        <ModalHeader toggle={toggle}>Edit Tuition</ModalHeader>
        <ModalBody>
          <form onSubmit={onSubmit}>
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
              onChange={(e) =>
                updateForm("installmentMinimum", e?.target?.value)
              }
              value={formData?.installmentMinimum}
            />

            <FormInput
              label="Minimum Installment Duration"
              placeholder="Installment Minimum Duration"
              onChange={(e) =>
                updateForm(
                  "installmentMinimumDurationInMonths",
                  e?.target?.value
                )
              }
              value={formData?.installmentMinimumDurationInMonths}
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
                {"Edit Tuition"}
              </button>
            )}
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
