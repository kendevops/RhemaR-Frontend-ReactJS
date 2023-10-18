import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import { FormEvent } from "react";
import FormInput from "../molecules/FormInput";
import useCreateSession from "../../hooks/mutations/classes/useCreateSession";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import useEditSession from "../../hooks/mutations/classes/useEditSession";
import FormDropdown from "../molecules/FormDropdown";
import useAcademicSessions from "../../hooks/queries/classes/useAcademicSessions";

interface defaultValues {
  name: string;
  startDate: string;
  endDate: string;
  isActive: string;
  id: string;
}

type NewSessionProps = {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: defaultValues;
  onCreate?: any;
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
    isActive: "",
  };

  console.log(defValues);
  console.log(defaultValues);

  const { formData, updateForm, formIsValid } = useForm({
    initialState: defaultValues,
  });

  const { data: sessionsData, refetch } = useAcademicSessions();

  const createSession = useCreateSession();

  const isLoading = createSession?.isLoading;

  const editSession = useEditSession(defValues?.id as string);

  const editIsLoading = editSession?.isLoading;

  function onSubmit(e: FormEvent) {
    e?.preventDefault();
    console.log({ formData });

    formData.isActive = formData.isActive === "No" ? false : (true as any);

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
          refetch();
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
      !isLoading && toggle();
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
              message={"Session edited successfully"}
            />,
            ToastContent.Config
          );
          onCreate();
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

      !editIsLoading && toggle();
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

            <FormDropdown
              onChange={(e) => updateForm("isActive", e?.target?.value)}
              //   options={sessionOptions?.map((o: string) => ({
              options={["Yes", "No"]?.map((o) => ({
                children: o,
              }))}
              title={"Is this the current active session?"}
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
