import useToggle from "../../utility/hooks/useToggle";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Input } from "reactstrap";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import useForm from "../../utility/hooks/useForm";
import FormInput from "../molecules/FormInput";

interface ViewStaffProps {
  data: any;
}

export default function ViewStaff({ data }: ViewStaffProps) {
  const [visibility, toggle] = useToggle();

  const initialState = {
    name: data?.name,
    email: data?.email,
    phone: data?.phone,
    gender: data?.gender,
    role: data?.role,
    privilege: data?.privilege,
    birthDate: data?.birthDate,
    state: data?.state,
    city: data?.city,
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
            {/* <FormInput label="Birth Date" value={new Date(formData.birthDate)?.toDateString()} disabled /> */}

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
