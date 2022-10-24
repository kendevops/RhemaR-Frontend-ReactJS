import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Input } from "reactstrap";
import { useForm, Controller } from "react-hook-form";

interface defaultValues {
  academicSession: string;
  startDate: string;
  endDate: string;
}

type NewSessionProps = {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: defaultValues;
};

export default function NewSession({
  toggle,
  visibility,
  defaultValues: defValues,
}: NewSessionProps) {
  const defaultValues = defValues ?? {
    academicSession: "",
    startDate: "",
    endDate: "",
  };

  const { control, setError, handleSubmit, formState } = useForm({
    defaultValues,
    mode: "onChange",
  });

  function onSubmit() {}

  return (
    <div>
      <Modal centered isOpen={visibility} toggle={toggle} id="newSessionModal">
        <ModalHeader toggle={toggle}>New Academic Session</ModalHeader>
        <ModalBody>
          <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="academicSession">Academic Session</label>
              <Controller
                control={control}
                name="academicSession"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    autoFocus
                    type="text"
                    placeholder="Academic Session"
                    className="form-control"
                    invalid={formState.errors.academicSession && true}
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <Controller
                control={control}
                name="startDate"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    autoFocus
                    type="date"
                    placeholder="Start Date"
                    className="form-control"
                    invalid={formState.errors.startDate && true}
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <Controller
                control={control}
                name="endDate"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    autoFocus
                    type="date"
                    placeholder="end Date"
                    className="form-control"
                    invalid={formState.errors.endDate && true}
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
              Add Session
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
