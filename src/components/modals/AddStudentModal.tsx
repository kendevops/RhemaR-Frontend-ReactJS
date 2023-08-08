import { Modal, ModalBody, ModalHeader, Spinner, Toast } from "reactstrap";
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
import FormInput from "../molecules/FormInput";
import { genders } from "../../data/Levels";
import useAcademicSessions from "../../hooks/queries/classes/useAcademicSessions";
import countries from "../../data/Countries";
import useUploadUsers from "../../hooks/mutations/users/useUploadUsers";

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
  const { data: sessionsData } = useAcademicSessions();
  const uploadUsers = useUploadUsers();
  const isLoading = uploadUsers.isLoading;

  const { formData, formErrors, formIsValid, toggleError, updateForm } =
    useForm({
      initialState: {
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        campus: "Abuja",
        session: "2022/2023",
        address: "",
        state: "",
        country: "Afghanistan",
        role: "STUDENT",
      },
    });

  const campusOptions = campusesData?.nodes?.map((d: any) => ({
    children: d?.name,
  }));

  const genderOptions = genders.map((d: any) => ({
    children: d,
  }));

  const sessionOptions = sessionsData?.nodes?.map((d: any) => ({
    children: d?.name,
  }));

  const countriesOptions = countries?.map((c) => c?.en_short_name);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!formIsValid) {
      alert("Please fill in all fields");
      console.log(formData);
      return;
    }

    const data = { users: [formData] };
    uploadUsers.mutate(data, {
      onSuccess: (e) => {
        toast.success(
          <ToastContent
            type={"success"}
            heading={"Student added"}
            message={"The student has been added successfully"}
          />
        );

        toggle();
      },
      onError: (e: any) => handleError(e, formData, toggleError),
    });
  }

  return (
    <Modal centered {...{ isOpen, toggle }}>
      <ModalHeader toggle={toggle}>Add Student</ModalHeader>
      <ModalBody>
        <form className="row" onSubmit={handleSubmit}>
          <FormInput
            label="First name"
            onChange={(e) => updateForm("firstName", e.target.value)}
            hasErrors={formErrors.firstName}
          />
          <FormInput
            label="middle name"
            onChange={(e) => updateForm("middleName", e.target.value)}
            hasErrors={formErrors.middleName}
          />
          <FormInput
            label="Last name"
            onChange={(e) => updateForm("lastName", e.target.value)}
            hasErrors={formErrors.lastName}
          />
          <FormInput
            label="Email"
            type="email"
            onChange={(e) => updateForm("email", e.target.value)}
            hasErrors={formErrors.email}
            lg="6"
          />
          <FormInput
            label="Phone number"
            type="tel"
            onChange={(e) => updateForm("phoneNumber", e.target.value)}
            hasErrors={formErrors.phoneNumber}
            lg="6"
          />

          <FormDropdown
            options={genderOptions}
            title="Gender"
            hasErrors={formErrors?.gender}
            lg="6"
          />

          <FormDropdown
            options={campusOptions}
            title="Select campus"
            onChange={(e) => updateForm("campus", e.target.value)}
            hasErrors={formErrors?.campus}
            lg="6"
          />

          {sessionOptions?.length && (
            <FormDropdown
              options={sessionOptions}
              title="Session"
              onChange={(e) => updateForm("session", e.target.value)}
              hasErrors={formErrors?.session}
            />
          )}

          <FormInput
            label="Address"
            placeholder="Enter Contact Address"
            onChange={(e) => updateForm("address", e.target.value)}
            hasErrors={formErrors?.address}
          />

          <FormInput
            label="State"
            placeholder="Enter State"
            onChange={(e) => updateForm("state", e.target.value)}
            hasErrors={formErrors?.state}
            lg="6"
          />

          <FormDropdown
            title="Country"
            onChange={(e) => updateForm("country", e.target.value)}
            options={countriesOptions.map((o) => ({
              children: o,
            }))}
            lg="6"
            hasErrors={formErrors?.country}
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
