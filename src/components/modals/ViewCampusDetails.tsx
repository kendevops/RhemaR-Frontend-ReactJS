import useToggle from "../../utility/hooks/useToggle";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Input } from "reactstrap";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import useForm from "../../utility/hooks/useForm";
import FormInput from "../molecules/FormInput";
import parseRole from "../../utils/parseRole";

interface ViewCampusProps {
  data: any;
}

export default function ViewCampus({ data }: ViewCampusProps) {
  const [visibility, toggle] = useToggle();

  console.log(data);

  const initialState = {
    name: data?.name,
    campusShortName: data?.campusShortName,
    campusAbbreviation: data?.campusAbbreviation,
    startDate: data?.startDate ?? "Not provided",
    address: data?.address ?? "Not provided",
    level: data?.levels,
    coordinator: data?.coordinator ?? "Not provided",
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
        <ModalHeader toggle={toggle}>Campus Details</ModalHeader>
        <ModalBody>
          <form className="mt-3" onSubmit={onSubmit}>
            <FormInput
              label="Camous Full Name"
              value={formData.name}
              disabled
            />
            <FormInput
              label="Campus Short Name"
              value={formData.campusAbbreviation}
              disabled
            />
            {
              <>
                <FormInput
                  label="Campus Abbreviation"
                  value={formData.campusAbbreviation}
                  disabled
                />
                <FormInput
                  label="Campus Start Date"
                  value={new Date(formData.startDate)?.toDateString()}
                  disabled
                />
                <FormInput
                  label="Level"
                  value={formData?.level?.map(
                    (r: any, i: number) => ` ${parseRole(r?.name)}`
                  )}
                  disabled
                />
                <FormInput
                  label="Campus Cordinator"
                  value={formData.coordinator}
                  disabled
                />
                <FormInput
                  label="Campus Address"
                  value={formData.address}
                  disabled
                />
              </>
            }
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
