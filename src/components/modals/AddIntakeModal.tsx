import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import { FormEvent } from "react";
import FormInput from "../molecules/FormInput";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import useAcademicSessions from "../../hooks/queries/classes/useAcademicSessions";
import FormDropdown from "../molecules/FormDropdown";
import useCreateIntake from "../../hooks/mutations/classes/useCreateIntake";
import useEditIntake from "../../hooks/mutations/classes/useEditeIntake";
import useAllIntakes from "../../hooks/queries/classes/useAllIntakes";

interface defaultValues {
  name: string;
  session: string;
  startDate: string;
  endDate: string;
  isActive: string;
  id: string;
}

type AddIntakeModalProps = {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: defaultValues;
  onCreate?: VoidFunction;
};

export default function AddIntakeModal({
  toggle,
  visibility,
  defaultValues: defValues,
  onCreate,
}: AddIntakeModalProps) {
  const defaultValues = defValues ?? {
    name: "",
    startDate: "",
    endDate: "",
    session: "",
    isActive: "",
  };

  console.log(defValues);
  console.log(defaultValues);

  const { formData, updateForm, formIsValid } = useForm({
    initialState: defaultValues,
  });

  const { data: intakeData, refetch } = useAllIntakes();

  const createIntake = useCreateIntake();
  const isLoading = createIntake?.isLoading;

  const editIntake = useEditIntake(defValues?.id as string);

  const editIsLoading = editIntake?.isLoading;

  const { data: sessionsData } = useAcademicSessions();

  const sessionOptions = sessionsData?.nodes?.map((sess: any) => sess?.name);

  function onSubmit(e: FormEvent) {
    e?.preventDefault();
    console.log(formData);

    formData.isActive = formData.isActive === "false" ? false : (true as any);

    console.log(formData);

    /// Creating
    if (!defValues) {
      createIntake?.mutate(formData, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Successful"}
              message={"Intake created successfully"}
            />,
            ToastContent.Config
          );
          toggle();
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
          toggle();
        },
      });

      return;
    }

    // Modifying

    if (defValues) {
      editIntake?.mutate(formData, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Successful"}
              message={"Intake Edited successfully"}
            />,
            ToastContent.Config
          );
          toggle();
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
          toggle();
        },
      });
      return;
    }
    // if (!!defValues) return;
  }

  return (
    <div>
      <Modal centered isOpen={visibility} toggle={toggle} id="newSessionModal">
        <ModalHeader toggle={toggle}>
          {defValues ? "Modify Intake" : "New Intake"}
        </ModalHeader>
        <ModalBody>
          {isLoading && <Spinner />}
          {editIsLoading && <Spinner />}

          <form className="mt-3" onSubmit={onSubmit}>
            <FormDropdown
              onChange={(e) => updateForm("name", e?.target?.value)}
              //   options={sessionOptions?.map((o: string) => ({
              options={["October", "April", "January"]?.map((o) => ({
                children: o,
              }))}
              title={"Intake"}
            />

            <FormDropdown
              onChange={(e) => updateForm("session", e?.target?.value)}
              options={sessionOptions?.map((o: string) => {
                console.log(o);

                return {
                  //   options={["October", "April", "January"]?.map((o) => ({
                  children: o,
                };
              })}
              title={"Session"}
            />

            {/* <FormInput
              label="Session"
              onChange={(e) => updateForm("session", e?.target?.value)}
              value={formData?.session}
            /> */}

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
              title={"Is This The Current Intake?"}
            />

            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
              disabled={!formIsValid || isLoading}
            >
              {defValues ? "Modify Intake" : "Add Intake"}
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
