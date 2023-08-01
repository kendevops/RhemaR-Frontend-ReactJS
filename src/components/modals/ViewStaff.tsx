import useToggle from "../../utility/hooks/useToggle";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Input } from "reactstrap";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import useForm from "../../utility/hooks/useForm";
import FormInput from "../molecules/FormInput";

interface ViewStaffProps {
  data: any;
  isStudent?: boolean;
}

export default function ViewStaff({ data, isStudent }: ViewStaffProps) {
  const [visibility, toggle] = useToggle();

  const initialState = {
    name: data?.name,
    email: data?.email,
    phone: data?.phone,
    gender: data?.gender ?? "Not provided",
    role: data?.role,
    privilege: data?.privilege,
    birthDate: data?.birthDate ?? "Not provided",
    state: data?.state ?? "Not provided",
    city: data?.city ?? "Not provided",
  };

  const { formData, updateForm } = useForm({ initialState });

  function onSubmit() {}

  return (
    <div>
      <u
        onClick={toggle}
        className="text-info click"
        data-bs-toggle="modal"
        data-bs-target="#studentModal"
      >
        View
      </u>

      {/* Modal */}
      <Modal centered isOpen={visibility} toggle={toggle} id="studentModal">
        <ModalHeader toggle={toggle}>Staff Details</ModalHeader>
        <ModalBody>
          <form className="mt-3" onSubmit={onSubmit}>
            <FormInput label="Name" value={formData.name} disabled />
            <FormInput label="Email" value={formData.email} disabled />
            {isStudent && (
              <>
                <FormInput
                  label="Phone number"
                  value={formData.phone}
                  disabled
                />
                <FormInput
                  label="Birth Date"
                  value={new Date(formData.birthDate)?.toDateString()}
                  disabled
                />
                <FormInput label="Gender" value={formData.gender} disabled />
                <FormInput label="State" value={formData.state} disabled />
                <FormInput label="City" value={formData.city} disabled />
              </>
            )}

            {/* 
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
              disabled={!formState.isValid}
            >
              Update Staff Details
            </button> */}
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
