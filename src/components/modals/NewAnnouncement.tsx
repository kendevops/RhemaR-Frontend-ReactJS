import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Input } from "reactstrap";
import { useForm, Controller } from "react-hook-form";

type NewAnnouncementProps = {
  toggle: VoidFunction;
  visibility: boolean;
};

export default function NewAnnouncementModal({
  toggle,
  visibility,
}: NewAnnouncementProps) {
  const defaultValues = {
    subject: "",
    date: new Date().toDateString(),
    message: "",
  };

  const { control, handleSubmit, formState } = useForm({
    defaultValues,
    mode: "onChange",
  });

  function onSubmit() {}

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
          <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <Controller
                control={control}
                name="subject"
                render={({ field }) => (
                  <Input
                    autoFocus
                    type="text"
                    placeholder="Academic Session"
                    className="form-control"
                    invalid={formState.errors.subject && true}
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <Input
                    autoFocus
                    type="date"
                    placeholder="Date"
                    className="form-control"
                    invalid={formState.errors.date && true}
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <Controller
                control={control}
                name="message"
                render={({ field }) => (
                  <Input
                    autoFocus
                    type="textarea"
                    placeholder="Enter message"
                    className="form-control"
                    invalid={formState.errors.message && true}
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
              disabled={!formState.isValid}
            >
              Publish Announcement
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
