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

export default function AddAdminModal({ isOpen, toggle }: AddAdminModalProps) {
  const { data, isLoading: usersLoading } = useAllUsers();
  const { data: campusesData } = useAllCampuses();
  const { data: rolesData } = useRoles();
  const { mutate, isLoading } = useAssignRole();

  const { formData, formErrors, formIsValid, toggleError, updateForm } =
    useForm({
      initialState: {
        email: "",
        role: "ICT_ADMIN",
      },
    });

  const users: UserDto[] = data?.users?.nodes?.filter((u: any) => {
    return u?.roles
      ?.map((r: any) => r?.name)
      .some((n: any) => n?.includes("STUDENT"));
  });

  const userOptions = users?.map((u) => ({
    label: `${u?.firstName} ${u?.lastName}`,
    id: u?.email,
  }));

  console.log(userOptions);

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
      <ModalHeader toggle={toggle}>Add Admin</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Search Staff">Search Users</label>
            <Autocomplete
              fullWidth
              disablePortal
              id="Search Staff"
              loading={usersLoading}
              options={userOptions}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    placeholder="Search Users"
                    className="form-control "
                  />
                );
              }}
              onChange={(e, value) => {
                updateForm("email", value?.id);
              }}
            />
          </div>
          <FormDropdown
            options={campusOptions}
            title="Select campus"
            hasErrors={formErrors?.campus}
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
              Assign role
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
