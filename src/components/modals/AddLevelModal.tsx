import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import { FormEvent } from "react";
import FormInput from "../molecules/FormInput";
import useCreateSession from "../../hooks/mutations/classes/useCreateSession";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";

interface defaultValues {
  levelNo: number;
}

type AddLevelModal = {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: defaultValues;
  onCreate?: VoidFunction;
};

export default function AddLevelModal({
  toggle,
  visibility,
  defaultValues: defValues,
  onCreate,
}: AddLevelModal) {
  const defaultValues = defValues ?? {
    levelNo: 0,
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
      createSession?.mutate(formData as any, {
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
      return;
    }

    // Modifying
    if (!!defValues) return;
  }

  return (
    <div>
      <Modal centered isOpen={visibility} toggle={toggle} id="newSessionModal">
        <ModalHeader toggle={toggle}>{"Add New Level"}</ModalHeader>
        <ModalBody>
          {isLoading && <Spinner />}
          <form className="mt-3" onSubmit={onSubmit}>
            <FormInput
              label="Level"
              type={"number"}
              value={formData.levelNo}
              onChange={(e) => updateForm("levelNo", e?.target?.value)}
            />

            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
              // disabled={!formIsValid || isLoading}
            >
              Add Level
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
