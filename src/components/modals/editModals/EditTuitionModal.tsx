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
    amount: data?.amount,
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
      <p
        onClick={toggle}
        className=" click d-flex"
        // data-bs-toggle="modal"
        // data-bs-target="#studentModal"
      >
        Edit
      </p>

      {/* Modal */}
      <Modal centered isOpen={visibility} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Tuition</ModalHeader>
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
              // disabled={!isCreating}
            />

            <FormInput
              label="Tuition Amount"
              placeholder="Tuition Amount"
              onChange={(e) => updateForm("amount", e?.target?.value)}
              value={formData?.amount}
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
    </div>
  );
}
