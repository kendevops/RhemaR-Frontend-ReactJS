import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Input } from "reactstrap";
import { useForm, Controller } from "react-hook-form";

interface AddPrivilegeProps {
  toggle: VoidFunction;
  visibility: boolean;
}

const defaultValues = {
  name: "",
};

export default function AddPrivilege({
  toggle,
  visibility,
}: AddPrivilegeProps) {
  const { control, setError, handleSubmit, formState } = useForm({
    defaultValues,
    mode: "onChange",
  });

  function onSubmit() {}

  return (
    <Modal centered isOpen={visibility} toggle={toggle} id="studentModal">
      <ModalHeader toggle={toggle}>Add Priviledge</ModalHeader>
      <ModalBody>
        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Controller
              control={control}
              name="name"
              defaultValue=""
              render={({ field }) => (
                <Input
                  autoFocus
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  invalid={formState.errors.name && true}
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
            Add Privilege
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}
