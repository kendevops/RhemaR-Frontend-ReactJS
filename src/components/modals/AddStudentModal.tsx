import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import useAllUsers from "../../hooks/queries/useAllUsers";
import { UserDto } from "../../types/dto";
import useRoles from "../../hooks/queries/useRoles";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import useForm from "../../utility/hooks/useForm";
import FormDropdown from "../molecules/FormDropdown";
import { FormEvent } from "react";
import useAssignRole from "../../hooks/mutations/roles/useAssignRole";
import { Autocomplete, TextField } from "@mui/material";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";

type AddAdminModalProps = {
  isOpen: boolean;
  toggle: VoidFunction;
};

export default function AddStudentModal({
  isOpen,
  toggle,
}: AddAdminModalProps) {
  const { data, isLoading: usersLoading } = useAllUsers();
  const { data: campusesData } = useAllCampuses();
  const { data: rolesData } = useRoles();
  const { mutate, isLoading } = useAssignRole();

  const { formData, formErrors, formIsValid, toggleError, updateForm } =
    useForm({
      initialState: {},
    });

  const roleOptions = rolesData?.roles
    ?.filter((r: any) => r.name?.includes("ADMIN"))
    .map((d: any) => ({
      children: d?.name,
    }));

  const campusOptions = campusesData?.nodes?.map((d: any) => ({
    children: d?.name,
  }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!formIsValid) {
      alert("Please fill in all fields");
      return;
    }
  }

  return (
    <Modal centered {...{ isOpen, toggle }}>
      <ModalHeader toggle={toggle}>Add Student</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormDropdown
            options={campusOptions}
            title="Select campus"
            // hasErrors={formErrors?.campus}
          />
          <FormDropdown
            options={roleOptions}
            title="Select role"
            // onChange={(e) => updateForm("", e.target.value)}
            // hasErrors={formErrors?.role}
          />
          {isLoading ? (
            <Spinner />
          ) : (
            <button className="btn btn-blue-800 btn-lg w-100" type="submit">
              Add student
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
