import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import useAllUsers from "../../../hooks/queries/useAllUsers";
import { UserDto } from "../../../types/dto";
import useRoles from "../../../hooks/queries/useRoles";
import useAllCampuses from "../../../hooks/queries/classes/useAllCampuses";
import useForm from "../../../utility/hooks/useForm";
import FormDropdown from "../../molecules/FormDropdown";
import { FormEvent } from "react";
import useAssignRole from "../../../hooks/mutations/roles/useAssignRole";
import { Autocomplete, TextField } from "@mui/material";
import { toast } from "react-toastify";
import ToastContent from "../../molecules/ToastContent";
import handleError from "../../../utils/handleError";
import useRetractRole from "../../../hooks/mutations/roles/useRetractRole";
import FormInput from "../../molecules/FormInput";

type AddAdminModalProps = {
  isOpen: boolean;
  toggle: VoidFunction;
  data?: any;
};

export default function EditAdminModal({
  isOpen,
  toggle,
  data: editData,
}: AddAdminModalProps) {
  const { mutate, isLoading } = useRetractRole();

  console.log(editData);

  const { formData, formErrors, formIsValid, toggleError, updateForm } =
    useForm({
      initialState: {
        email: editData?.email,
        emailName: `${editData?.firstName} ${editData?.lastName}`,
        role: "",
      },
    });

  const roleOptions = editData?.roles?.map((d: any) => ({
    children: d?.name,
  }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!formIsValid) {
      alert("Please fill in all fields");
      return;
    }

    mutate([formData], {
      onSuccess: (d) => {
        toast.success(
          <ToastContent
            type={"success"}
            heading={"Success"}
            message={`Successfully assigned ${formData.role} to ${formData.email}`}
          />,
          ToastContent.Config
        );
        toggle();
      },
      onError: (e: any) => handleError(e, formData, toggleError),
    });
  }

  return (
    <Modal centered {...{ isOpen, toggle }}>
      <ModalHeader toggle={toggle}>Edit Admin</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            placeholder="Name"
            onChange={(e) => updateForm("emailName", e?.target?.value)}
            value={formData?.emailName}
            disabled
          />
          <FormInput
            label="Email"
            placeholder="Email"
            onChange={(e) => updateForm("email", e?.target?.value)}
            value={formData?.email}
            disabled
          />

          <FormDropdown
            options={roleOptions}
            title="Select role"
            onChange={(e) => updateForm("role", e.target.value)}
            hasErrors={formErrors?.role}
          />
          {isLoading ? (
            <Spinner />
          ) : (
            <button className="btn btn-blue-800 btn-lg w-100" type="submit">
              Edit role
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
