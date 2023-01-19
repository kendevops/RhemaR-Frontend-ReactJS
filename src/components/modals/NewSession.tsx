import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import { FormEvent } from "react";
import FormInput from "../molecules/FormInput";
import useCreateSession from "../../hooks/mutations/classes/useCreateSession";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";

interface defaultValues {
  name: string;
  startDate: string;
  endDate: string;
}

type NewSessionProps = {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: defaultValues;
  onCreate?: VoidFunction;
};

export default function NewSession({
  toggle,
  visibility,
  defaultValues: defValues,
  onCreate,
}: NewSessionProps) {
  const defaultValues = defValues ?? {
    name: "",
    startDate: "",
    endDate: "",
  };

  const { formData, updateForm, formIsValid } = useForm({
    initialState: defaultValues,
  });
  const createSession = useCreateSession();
  const isLoading = createSession?.isLoading;

  function onSubmit(e: FormEvent) {
    e?.preventDefault();
    console.log({ formData });

    // Creating
    if (!defValues) {
      createSession?.mutate(formData, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Successful"}
              message={"Session created successfully"}
            />,
            ToastContent.Config
          );
          !!onCreate && onCreate();
        },

        onError: (e) => {
          console.log(e);
          toast.error(
            <ToastContent
              type={"error"}
              heading={"Error"}
              message={"An error occurred"}
            />,
            ToastContent.Config
          );
        },
      });
      return;
    }

    // Modifying
    if (!!defValues) return;
  }

  return (
    <div>
      <Modal centered isOpen={visibility} toggle={toggle} id="newSessionModal">
        <ModalHeader toggle={toggle}>
          {defValues ? "Modify Academic Session" : "New Academic Session"}
        </ModalHeader>
        <ModalBody>
          {isLoading && <Spinner />}
          <form className="mt-3" onSubmit={onSubmit}>
            <FormInput
              label="Name"
              onChange={(e) => updateForm("name", e?.target?.value)}
              value={formData?.name}
            />
            <FormInput
              label="Start Date"
              type={"date"}
              onChange={(e) =>
                updateForm(
                  "startDate",
                  new Date(e?.target?.value)?.toISOString()
                )
              }
            />
            <FormInput
              label="End Date"
              type={"date"}
              onChange={(e) =>
                updateForm("endDate", new Date(e?.target?.value)?.toISOString())
              }
            />

            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
              // disabled={!formIsValid || isLoading}
            >
              {defValues ? "Modify Session" : "Add Session"}
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
