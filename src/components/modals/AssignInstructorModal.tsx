import useForm from "../../utility/hooks/useForm";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { FormEvent } from "react";
import FormInput from "../molecules/FormInput";
import FormDropdown from "../molecules/FormDropdown";

type AssignInstructorModalProps = {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: {
    name: string;
    email: string;
    phone: string;
    course?: string;
  };
};

const options = ["Option 1", "Option 2"];

export default function AssignInstructorModal({
  toggle,
  visibility,
  defaultValues,
}: AssignInstructorModalProps) {
  const { formData, formIsValid, updateForm } = useForm({
    initialState: defaultValues ?? {
      name: "",
      email: "",
      phone: "",
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <Modal
        centered
        isOpen={visibility}
        toggle={toggle}
        id="assignInstructorModal"
      >
        <ModalHeader toggle={toggle}>Assign Instructor</ModalHeader>
        <ModalBody>
          <form className="mt-3" onSubmit={handleSubmit}>
            <FormInput
              label="Name"
              value={formData["name"]}
              onChange={(e) => updateForm("name", e.target.value)}
            />
            <FormInput
              label="Email"
              type={"email"}
              value={formData["email"]}
              onChange={(e) => updateForm("email", e.target.value)}
            />
            <FormInput
              label="Phone"
              value={formData["phone"]}
              onChange={(e) => updateForm("phone", e.target.value)}
              type={"number"}
            />
            <FormDropdown
              title="Course(Optional)"
              options={options?.map((o) => ({
                children: o,
                onClick: () => updateForm("course", o),
              }))}
            />
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              Assign Instructor
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
