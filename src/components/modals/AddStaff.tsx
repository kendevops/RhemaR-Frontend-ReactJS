import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import FormDropdown from "../molecules/FormDropdown";
import useRoles from "../../hooks/queries/useRoles";
import { FormEvent } from "react";
import useForm from "../../utility/hooks/useForm";
import { Autocomplete, TextField } from "@mui/material";
import { UserDto } from "../../types/dto";
import useAllUsers from "../../hooks/queries/useAllUsers";

interface AddStaffProps {
  toggle: VoidFunction;
  visibility: boolean;
}

export default function AddStaff({ toggle, visibility }: AddStaffProps) {
  const initialState = {
    userId: "",
    name: "",
    priviledge: "",
  };

  const { formData, updateForm } = useForm({ initialState });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(formData);
  }

  const { data, isLoading } = useRoles();
  const roleOptions = data?.roles?.map((d: any) => ({ children: d?.name }));

  const { data: userData, isLoading: usersLoading } = useAllUsers();
  const users = userData?.users?.nodes as UserDto[];
  const userOptions = users?.map((u) => ({
    label: `${u?.email}`,
    id: u?.id,
  }));

  const loading = isLoading || usersLoading;

  return (
    <div>
      {/* Modal */}
      <Modal centered isOpen={visibility} toggle={toggle} id="studentModal">
        <ModalHeader toggle={toggle}>Staff Details</ModalHeader>
        <ModalBody>
          {loading && <Spinner />}
          <form className="mt-3" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="Search Staff">Search Staff</label>
              <Autocomplete
                fullWidth
                disablePortal
                id="Search Staff"
                loading={loading}
                options={userOptions}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder="Search Staff"
                      className="form-control "
                    />
                  );
                }}
                onChange={(e, value) => {
                  console.log(value);
                }}
              />
            </div>

            <div className="form-group d-flex gap-4">
              {/* <div style={{ width: "100%" }}>
                <FormDropdown title="Role" options={[{ children: "Haha" }]} />
              </div> */}
              <div style={{ width: "100%" }}>
                <FormDropdown
                  onChange={(e) => updateForm("priviledge", e.target.value)}
                  title="Privilege"
                  options={roleOptions}
                />
              </div>
            </div>

            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              Add Staff
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
