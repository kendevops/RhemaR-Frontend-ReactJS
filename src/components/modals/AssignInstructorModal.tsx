import useForm from "../../utility/hooks/useForm";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import { FormEvent } from "react";
import FormInput from "../molecules/FormInput";
import FormDropdown from "../molecules/FormDropdown";
import { Autocomplete, TextField } from "@mui/material";
import useAllUsers from "../../hooks/queries/useAllUsers";
import { UserDto } from "../../types/dto";
import useAssignRole from "../../hooks/mutations/roles/useAssignRole";
import userRoles from "../../utility/userRoles";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";

type AssignInstructorModalProps = {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: {
    email: string;
  };
};

export default function AssignInstructorModal({
  toggle,
  visibility,
  defaultValues,
}: AssignInstructorModalProps) {
  const { formData, formIsValid, updateForm } = useForm({
    initialState: defaultValues ?? {
      email: "",
    },
  });
  const { isLoading, mutate } = useAssignRole();

  const { data: userData, isLoading: usersLoading } = useAllUsers();
  const users = userData?.users?.nodes as UserDto[];
  const userOptions = users?.map((u) => ({
    label: `${u?.firstName} ${u?.lastName}`,
    id: u?.email,
  }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    formIsValid
      ? mutate([{ email: formData?.email, role: userRoles.INSTRUCTOR }], {
          onSuccess: () => {
            toast.success(
              <ToastContent
                type={"success"}
                heading={"Success"}
                message={`Successfully assigned ${formData?.email} as instructor`}
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
        })
      : alert("Please fill in all fields befor submitting");
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

            {isLoading ? (
              <Spinner />
            ) : (
              <button
                className="btn btn-blue-800 btn-lg w-100 my-5"
                type="submit"
              >
                {defaultValues ? "Remove Instructor" : "Assign Instructor"}
              </button>
            )}
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
