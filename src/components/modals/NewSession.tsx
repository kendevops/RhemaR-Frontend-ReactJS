import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import { FormEvent } from "react";
import FormInput from "../molecules/FormInput";
import useCreateSession from "../../hooks/mutations/classes/useCreateSession";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import useEditSession from "../../hooks/mutations/classes/useEditSession";

interface defaultValues {
  name: string;
  startDate: string;
  endDate: string;
  id: string;
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

  console.log(defValues);
  console.log(defaultValues);

  const { formData, updateForm, formIsValid } = useForm({
    initialState: defaultValues,
  });
  const createSession = useCreateSession();
  const isLoading = createSession?.isLoading;

  const editSession = useEditSession(defValues?.id as string);

  const editIsLoading = editSession?.isLoading;

  function onSubmit(e: FormEvent) {
    e?.preventDefault();
    console.log({ formData });

    /// Creating
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

    // Modifying

    if (defValues) {
      editSession?.mutate(formData, {
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
    // if (!!defValues) return;
  }

  return (
    <div>
      <Modal centered isOpen={visibility} toggle={toggle} id="newSessionModal">
        <ModalHeader toggle={toggle}>
          {defValues ? "Modify Academic Session" : "New Academic Session"}
        </ModalHeader>
        <ModalBody>
          {isLoading && <Spinner />}
          {editIsLoading && <Spinner />}

          <form className="mt-3" onSubmit={onSubmit}>
            <FormInput
              label="Session"
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
              disabled={!formIsValid || isLoading}
            >
              {defValues ? "Modify Session" : "Add Session"}
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
