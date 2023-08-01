import { Controller, useForm } from "react-hook-form";
import { Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import useToggle from "../../utility/hooks/useToggle";

interface UpdatePrivilegeProps {
  data: string;
}

export default function UpdatePrivilege({ data }: UpdatePrivilegeProps) {
  const defaultValues = {
    name: data,
  };

  const [visibility, toggle] = useToggle();

  const { control, setError, handleSubmit, formState } = useForm({
    defaultValues,
    mode: "onChange",
  });

  function onSubmit() {}

  return (
    <div>
      <u
        onClick={toggle}
        className="text-info click"
        data-bs-toggle="modal"
        data-bs-target="#studentModal"
      >
        Update
      </u>

      {/* Modal */}
      <Modal centered isOpen={visibility} toggle={toggle} id="studentModal">
        <ModalHeader toggle={toggle}>Update Priviledge</ModalHeader>
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
                    placeholder="First Name"
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
              Updaye Privilege
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
