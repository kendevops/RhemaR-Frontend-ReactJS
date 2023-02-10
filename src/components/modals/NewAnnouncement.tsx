import { FormEvent } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import usePublishNotification from "../../hooks/mutations/notifications/usePublishNotification";
import useForm from "../../utility/hooks/useForm";
import FormInput from "../molecules/FormInput";
import FormInputWrapper from "../molecules/FormInputWrapper";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";

type NewAnnouncementProps = {
  toggle: VoidFunction;
  visibility: boolean;
};

export default function NewAnnouncementModal({
  toggle,
  visibility,
}: NewAnnouncementProps) {
  const { formData, formIsValid, updateForm } = useForm({
    initialState: { type: "important", title: "", content: "" },
  });
  const { mutate, isLoading } = usePublishNotification();

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (formIsValid) {
      mutate(formData, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Success"}
              message={`Announcement successful!`}
            />,
            ToastContent.Config
          );
          toggle();
        },

        onError: (e: any) => {
          toast.error(
            <ToastContent
              type={"error"}
              heading={"An Error Occurred"}
              message={e?.response?.data?.error?.message?.toString()}
            />,
            ToastContent.Config
          );

          console.log({ e, formData });
        },
      });
    } else alert("Please fill in all fields");
  }

  return (
    <div>
      <Modal
        centered
        isOpen={visibility}
        toggle={toggle}
        id="newAnnouncementModal"
      >
        <ModalHeader toggle={toggle}>New Announcement</ModalHeader>
        <ModalBody>
          <form className="mt-3" onSubmit={onSubmit}>
            <FormInput
              label="Title"
              onChange={(e) => updateForm("title", e.target.value)}
            />

            <FormInputWrapper>
              <label htmlFor={"content"}>Message</label>
              <textarea
                className="form-control"
                placeholder="Enter message"
                onChange={(e) => updateForm("content", e.target.value)}
              />
            </FormInputWrapper>

            {isLoading ? (
              <Spinner />
            ) : (
              <button
                className="btn btn-blue-800 btn-lg w-100 my-5"
                type="submit"
                disabled={!formIsValid}
              >
                Publish Announcement
              </button>
            )}
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
